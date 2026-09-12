/* <utv-viewer> — 3D configurator viewer for the Jalip Motorsport Can-Am
 * Maverick X3, built on the REAL scanned model (canam/base.obj, converted
 * to canam/base.glb — see configurator/vehicle-config.js for the full
 * story and confirmed part identification).
 *
 * Architecture (adapted to this project's no-build, plain-<script> setup —
 * plain ES modules loaded with dynamic import(), same pattern this file
 * already used for Three.js itself):
 *   configurator/vehicle-loader.js       -> VehicleLoader   (load + normalize)
 *   configurator/material-controller.js  -> MaterialController (per-mesh materials, role classification)
 *   configurator/wheel-manager.js        -> WheelManager    (4-wheel swap)
 *   configurator/accessory-manager.js    -> AccessoryManager (add/remove parts)
 *   configurator/vehicle-config.js       -> VEHICLE_CONFIG  (wheels/accessories)
 * This file (VehicleViewer + CameraController) owns the scene, renderer,
 * lighting, OrbitControls and the public <utv-viewer> element API.
 *
 * Camera: real THREE.OrbitControls, exterior-only. minDistance is derived
 * from the model's own bounding sphere (never hardcoded) so the camera can
 * never clip into the vehicle from any angle; minPolarAngle/maxPolarAngle
 * keep it from going fully overhead or below the ground. There is no
 * interior/cabin mode.
 *
 * No body-color tinting: the vehicle always shows its real scanned paint,
 * for every part, with no override.
 *
 * Attributes: autorotate, view (exterior | front | rear | side | top)
 * Methods:    resetView(), setView(name), setSpin(bool), snapshot() -> dataURL,
 *             setWheels(id), addAccessory(id), removeAccessory(id), toggleAccessory(id)
 * Events:     ready, error
 */
(() => {
  const THREE_URL = 'https://esm.sh/three@0.169.0';
  const ORBIT_CONTROLS_URL = 'https://esm.sh/three@0.169.0/examples/jsm/controls/OrbitControls.js';
  const ROOM_ENV_URL = 'https://esm.sh/three@0.169.0/examples/jsm/environments/RoomEnvironment.js';
  const TARGET_LENGTH = 3.9; // normalize the loaded model to roughly this real-world footprint (m)

  // camera framing per quick-view preset — { azimuth, polar } in radians
  // (polar measured from +Y, matching THREE.Spherical/OrbitControls), plus
  // a distance FACTOR relative to the computed frame-fit distance.
  const VIEWS = {
    exterior: { az: 2.7, polar: 1.15, distFactor: 1.18 },
    front: { az: Math.PI, polar: 1.25, distFactor: 1.05 },
    rear: { az: 0, polar: 1.25, distFactor: 1.05 },
    side: { az: Math.PI / 2, polar: 1.3, distFactor: 1.0 },
    top: { az: 2.7, polar: 0.42, distFactor: 1.35 },
  };

  class UTVViewer extends HTMLElement {
    static get observedAttributes() {
      return ['autorotate', 'view'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host{display:block;position:relative;width:100%;height:100%;overflow:hidden;background:#1a1a1c}
          canvas{display:block;width:100%;height:100%;touch-action:none;cursor:grab}
          canvas:active{cursor:grabbing}
          .msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
               padding:32px;text-align:center;font:500 14px/1.6 Barlow,system-ui,sans-serif;
               color:#A1A1AA;letter-spacing:.01em}
          .hint{position:absolute;left:16px;bottom:14px;font:600 11px/1 Barlow,system-ui,sans-serif;
                letter-spacing:.16em;text-transform:uppercase;color:#A1A1AA;pointer-events:none;
                transition:opacity .4s}
        </style>
        <div class="msg" part="msg">Cargando visor 3D…</div>
        <div class="hint" part="hint">arrastra para rotar · rueda para zoom</div>`;
      this._msg = this.shadowRoot.querySelector('.msg');
      this._hint = this.shadowRoot.querySelector('.hint');
      this._parts = {}; // reserved for AccessoryManager mount debugging
      this._tween = null; // active preset-view transition, if any
    }

    connectedCallback() {
      if (this._booted) return;
      this._booted = true;
      // Cargar y compilar un modelo 3D real + shaders PBR puede tardar bastante
      // en equipos sin aceleración gráfica dedicada (gráficos integrados
      // antiguos, algunas máquinas virtuales) — se avisa en vez de dejar
      // "Cargando…" sin contexto. La carga sigue en curso igual; esto no la
      // cancela ni la reinicia.
      const slowHint = setTimeout(() => {
        if (this._msg && this._msg.isConnected) {
          this._msg.textContent = 'Esto está tomando más de lo normal — puede deberse a una conexión lenta o a un equipo sin aceleración gráfica dedicada. Sigue cargando…';
        }
      }, 9000);
      this._boot().then(() => clearTimeout(slowHint)).catch((e) => {
        clearTimeout(slowHint);
        console.error('[utv-viewer] boot failed:', e);
        this._msg.textContent = 'Este dispositivo no pudo iniciar el visor 3D. Usa la vista en imágenes.';
        this._hint.style.display = 'none';
        this.dispatchEvent(new CustomEvent('error', { detail: String(e) }));
      });
    }

    async _boot() {
      if (!window.WebGLRenderingContext) throw new Error('no webgl');
      const [THREE, { OrbitControls }, { VehicleLoader }, { MaterialController }, { WheelManager }, { AccessoryManager }, { VEHICLE_CONFIG, MESH_ROLES }] = await Promise.all([
        import(/* @vite-ignore */ THREE_URL),
        import(/* @vite-ignore */ ORBIT_CONTROLS_URL),
        import(/* @vite-ignore */ new URL('./configurator/vehicle-loader.js', this.baseURI || document.baseURI).href),
        import(/* @vite-ignore */ new URL('./configurator/material-controller.js', this.baseURI || document.baseURI).href),
        import(/* @vite-ignore */ new URL('./configurator/wheel-manager.js', this.baseURI || document.baseURI).href),
        import(/* @vite-ignore */ new URL('./configurator/accessory-manager.js', this.baseURI || document.baseURI).href),
        import(/* @vite-ignore */ new URL('./configurator/vehicle-config.js', this.baseURI || document.baseURI).href),
      ]);
      this.T = THREE;
      const mobile = Math.min(innerWidth, innerHeight) < 640;
      this._mobile = mobile;

      const renderer = new THREE.WebGLRenderer({
        antialias: !mobile, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.shadowMap.enabled = !mobile;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer = renderer;
      this.shadowRoot.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = this._makeStudioBackground(THREE); // neutral studio cyclorama, not flat black
      scene.fog = new THREE.Fog(0x232326, 20, 62);
      this.scene = scene;
      this.camera = new THREE.PerspectiveCamera(38, 1, 0.06, 220);

      // lighting: neutral key from above-front, a cool rim from behind for edge
      // separation, and a soft neutral fill — bright enough to read the cage/
      // suspension/wheel detail without blowing out the paint.
      const hemi = new THREE.HemisphereLight(0xf3f0ec, 0x232326, 0.65);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xfff6ec, 2.3);
      key.position.set(4.5, 8, 4.5);
      key.castShadow = !mobile;
      if (key.shadow) {
        // 1024 en escritorio (antes 2048): mismo resultado visual perceptible
        // en el tamaño real del visor, con una cuarta parte del costo de
        // renderizar el mapa de sombras — más robusto en equipos sin GPU
        // dedicada (gráficos integrados/software), no solo un ideal de laboratorio.
        key.shadow.mapSize.set(mobile ? 512 : 1024, mobile ? 512 : 1024);
        const c = key.shadow.camera; c.left = -6.5; c.right = 6.5; c.top = 6.5; c.bottom = -6.5; c.near = 2; c.far = 26;
        key.shadow.bias = -0.0006;
        key.shadow.radius = 4; // soft contact-shadow edge under the wheels
      }
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xd8dcff, 0.55);
      fill.position.set(-4, 6, -2);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0x8fb4ff, 1.4);
      rim.position.set(-4.2, 3.4, -4.6);
      scene.add(rim);

      const floor = new THREE.Mesh(
        new THREE.CircleGeometry(14, 72),
        new THREE.MeshStandardMaterial({ map: this._makeFloorTexture(THREE), roughness: 0.9, metalness: 0.04 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      const envReady = this._loadEnvironment(THREE, renderer, scene);

      const loader = new VehicleLoader(THREE, this.baseURI || document.baseURI);
      const loaded = await loader.load(VEHICLE_CONFIG.modelUrl, { targetLength: TARGET_LENGTH, mobile });
      this.utv = loaded.root;
      this._vehicleHeight = loaded.height;
      this._boundingSphere = loaded.boundingSphere; // in world space, model already centered/grounded
      scene.add(this.utv);
      this.utv.updateMatrixWorld(true); // ensure matrixWorld is current before any bounding-box/world-space math below

      this.materials = new MaterialController(THREE, this.utv, loaded.meshesByName, MESH_ROLES);
      this.wheels = new WheelManager(THREE, this.utv, this.materials.meshesByRole.wheel, VEHICLE_CONFIG.wheels);
      this.accessories = new AccessoryManager(THREE, this.utv, VEHICLE_CONFIG.accessories, {});

      await envReady;
      this._msg.remove();

      this._setupControls(THREE, OrbitControls);
      this.setView(this._viewName || this._a('view', 'exterior'), true);

      this._resize();
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this);
      this._applyAll();
      this._loop();
      this.dispatchEvent(new CustomEvent('ready'));
    }

    /* ---------- camera: real OrbitControls, exterior-only ---------- */
    _setupControls(THREE, OrbitControls) {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      const targetY = this._vehicleHeight * 0.42;
      controls.target.set(0, targetY, 0);

      // minDistance is derived from the REAL bounding sphere so the camera
      // can never clip through the hull from any azimuth/polar angle: any
      // point on/inside the vehicle is within `sphere.radius` of
      // `sphere.center`, so keeping camera-to-target distance beyond
      // (offset-to-sphere-center + radius*margin) keeps it outside the
      // sphere — hence outside the mesh — everywhere on the orbit.
      const sphere = this._boundingSphere;
      const offset = sphere.center.distanceTo(controls.target);
      const minDist = offset + sphere.radius * 1.18;
      this._minDist = minDist;
      // maxDistance needs enough headroom to comfortably fit the widest quick-view
      // preset (top, distFactor 1.35) plus room for the user to pull back further —
      // derived from the same frame-fit math as the presets, not a fixed multiple
      // of minDist (which could clip the initial framing on a wide/flat vehicle).
      this._maxDist = Math.max(minDist * 1.6, this._frameDistance(1.9));
      controls.minDistance = minDist;
      controls.maxDistance = this._maxDist;

      // vertical clamp: never fully overhead (min ~16°), never dips to/below
      // the ground plane behind the car (max ~85°) — exterior "walk-around"
      // only, no way to tilt under the vehicle or through the floor.
      controls.minPolarAngle = 0.28;
      controls.maxPolarAngle = 1.48;

      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.rotateSpeed = 0.75;
      controls.zoomSpeed = 0.85;
      controls.autoRotateSpeed = 1.1;

      controls.addEventListener('start', () => { this._tween = null; this._hint.style.opacity = '0'; controls.autoRotate = false; this._userSpinning = true; });

      this.controls = controls;
    }

    /* frame-fit distance for a given radius/fov so the vehicle reads well
     * in frame — not too close, not too far — used for both the initial
     * load and every quick-view preset. */
    _frameDistance(radiusFactor) {
      const fov = this.camera.fov * (Math.PI / 180);
      const r = this._boundingSphere.radius;
      return (r / Math.sin(fov / 2)) * radiusFactor;
    }

    /* neutral studio "cyclorama" backdrop — a soft radial gradient, not a
     * flat empty black void, so the car reads like it's in a photo studio
     * while still sitting comfortably on this site's dark theme. */
    _makeStudioBackground(T) {
      const size = 1024;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');
      const g = ctx.createRadialGradient(size / 2, size * 0.46, size * 0.05, size / 2, size * 0.46, size * 0.75);
      g.addColorStop(0, '#3a383e');
      g.addColorStop(0.55, '#232226');
      g.addColorStop(1, '#111113');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      const tex = new T.CanvasTexture(canvas);
      tex.colorSpace = T.SRGBColorSpace;
      return tex;
    }

    /* PBR reflections via a procedural room environment — real (Three.js's
     * own RoomEnvironment, not a stand-in), generated locally with no
     * network fetch and a much cheaper PMREM pass than prefiltering a full
     * real equirectangular photo would be. An earlier version of this file
     * fetched a real studio HDRI from an external host for slightly nicer
     * reflections; testing showed that added a long, unpredictable delay
     * before the viewer became interactive, so it was dropped in favor of
     * this always-fast local alternative. Direct lighting alone is already
     * tuned to read correctly (see the comment above the key/fill/rim
     * lights), so this only ever adds polish — if it ever fails, that's fine too. */
    async _loadEnvironment(THREE, renderer, scene) {
      const pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      try {
        const { RoomEnvironment } = await import(/* @vite-ignore */ ROOM_ENV_URL);
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environmentIntensity = 0.65;
      } catch (e2) {
        console.warn('[utv-viewer] procedural room environment failed — continuing with direct lighting only:', e2);
      } finally {
        pmrem.dispose();
      }
    }

    /* simple dark studio floor with a soft radial vignette */
    _makeFloorTexture(T) {
      const size = 512;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');
      const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.62);
      g.addColorStop(0, '#232226');
      g.addColorStop(1, '#0f0f11');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      const tex = new T.CanvasTexture(canvas);
      return tex;
    }

    /* ---------- personalización: gomas (las 4 juntas) ---------- */
    async setWheels(id) {
      if (!this.wheels) return;
      await this.wheels.setWheel(id);
    }

    /* ---------- personalización: accesorios ---------- */
    async addAccessory(id) { if (this.accessories) await this.accessories.add(id); }
    removeAccessory(id) { this.accessories?.remove(id); }
    async toggleAccessory(id) { if (this.accessories) await this.accessories.toggle(id); }

    /* ---------- attributes ---------- */
    attributeChangedCallback(n, o, v) {
      if (!this.scene) return;
      if (n === 'view') this.setView(v);
      else this._applyAll();
    }

    _a(n, d) { const v = this.getAttribute(n); return v === null || v === '' ? d : v; }

    _applyAll() {
      const spin = this._a('autorotate', 'off') === 'on' && !this._reducedMotion();
      if (this.controls) this.controls.autoRotate = spin && !this._userSpinning;
    }

    _reducedMotion() {
      return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    _resize() {
      const w = this.clientWidth || 1, h = this.clientHeight || 1;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }

    _loop() {
      const tick = () => {
        this._raf = requestAnimationFrame(tick);
        if (this._tween) this._stepTween();
        this.controls.update(); // required for damping + autoRotate
        this.renderer.render(this.scene, this.camera);
      };
      tick();
    }

    _stepTween() {
      const t = this._tween;
      t.t = Math.min(1, t.t + 0.035);
      const e = 1 - Math.pow(1 - t.t, 3); // ease-out cubic
      const az = t.fromAz + (t.toAz - t.fromAz) * e;
      const polar = t.fromPolar + (t.toPolar - t.fromPolar) * e;
      const dist = t.fromDist + (t.toDist - t.fromDist) * e;
      this._setSpherical(az, polar, dist);
      if (t.t >= 1) this._tween = null;
    }

    _setSpherical(az, polar, dist) {
      const s = new this.T.Spherical(dist, polar, az);
      const pos = new this.T.Vector3().setFromSpherical(s).add(this.controls.target);
      this.camera.position.copy(pos);
    }

    _currentSpherical() {
      const s = new this.T.Spherical().setFromVector3(this.camera.position.clone().sub(this.controls.target));
      return s;
    }

    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      this._ro?.disconnect();
      this.controls?.dispose();
      this.renderer?.dispose();
      this._booted = false;
    }

    /* ---------- API ---------- */
    setView(name, snap) {
      this._viewName = name;
      this._userSpinning = false;
      this._hint.textContent = 'arrastra para rotar · rueda para zoom';
      this._hint.style.opacity = '1';
      const v = VIEWS[name] || VIEWS.exterior;
      const dist = Math.min(Math.max(this._frameDistance(v.distFactor), this._minDist), this._maxDist);
      if (snap) {
        this._setSpherical(v.az, v.polar, dist);
      } else {
        const cur = this._currentSpherical();
        this._tween = { t: 0, fromAz: cur.theta, fromPolar: cur.phi, fromDist: cur.radius, toAz: v.az, toPolar: v.polar, toDist: dist };
      }
      this.controls.autoRotate = name === 'exterior' && this._a('autorotate', 'off') === 'on' && !this._reducedMotion();
    }
    resetView() { this.setView('exterior'); }
    setSpin(v) { this._userSpinning = !v; if (this.controls) this.controls.autoRotate = !!v; }
    snapshot() {
      if (!this.renderer) return null;
      this.renderer.render(this.scene, this.camera);
      return this.renderer.domElement.toDataURL('image/png');
    }
  }

  if (!customElements.get('utv-viewer')) customElements.define('utv-viewer', UTVViewer);
})();
