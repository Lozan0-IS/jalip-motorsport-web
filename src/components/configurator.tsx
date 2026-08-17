"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { wa } from "@/data/site";

const equipment = [
  {
    id: "light",
    category: "ILUMINACIÓN",
    name: "Barra LED 50 pulgadas",
    description: "Haz largo alcance para ruta nocturna.",
  },
  {
    id: "bumper",
    category: "PROTECCIÓN",
    name: "Bumper Trail Armor",
    description: "Frente reforzado de alta separación.",
  },
  {
    id: "tires",
    category: "TRACCIÓN",
    name: "Gomas Mud Claw 35",
    description: "Mordida profunda en barro y roca.",
  },
  {
    id: "lift",
    category: "SUSPENSIÓN",
    name: "Lift Kit Mountain +4",
    description: "Altura y recorrido para terreno roto.",
  },
  {
    id: "snorkel",
    category: "ADMISIÓN",
    name: "Snorkel High Flow",
    description: "Toma elevada para cruces exigentes.",
  },
  {
    id: "exhaust",
    category: "RENDIMIENTO",
    name: "Escape Dual Savage",
    description: "Flujo optimizado y salida doble.",
  },
];

function ConceptUTV({
  color,
  metal,
  lights,
  selected,
  before,
}: {
  color: string;
  metal: boolean;
  lights: boolean;
  selected: string[];
  before: boolean;
}) {
  const lift = before ? 0 : selected.includes("lift") ? 0.18 : 0;
  const wheel = selected.includes("tires") ? 0.49 : 0.4;
  return (
    <group position={[0, lift, 0]} rotation={[0, -0.32, 0]}>
      <mesh position={[0, 0.67, 0]} castShadow>
        <boxGeometry args={[2.8, 0.62, 1.36]} />
        <meshStandardMaterial
          color={color}
          metalness={metal ? 0.82 : 0.18}
          roughness={metal ? 0.24 : 0.78}
        />
      </mesh>
      <mesh position={[-0.1, 1.18, 0]}>
        <boxGeometry args={[1.9, 0.78, 1.15]} />
        <meshStandardMaterial color="#111410" wireframe />
      </mesh>
      {[
        [-1, 0.31, -0.75],
        [1, 0.31, -0.75],
        [-1, 0.31, 0.75],
        [1, 0.31, 0.75],
      ].map((p, i) => (
        <mesh
          key={i}
          position={p as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[wheel, wheel, 0.3, 28]} />
          <meshStandardMaterial color="#0a0b09" roughness={0.94} />
        </mesh>
      ))}
      {!before && selected.includes("light") && (
        <mesh position={[-0.15, 1.67, 0]}>
          <boxGeometry args={[1.55, 0.11, 0.13]} />
          <meshStandardMaterial
            color={lights ? "#e7e0d1" : "#333"}
            emissive={lights ? "#fff4d4" : "#000"}
            emissiveIntensity={lights ? 7 : 0}
          />
        </mesh>
      )}
      {!before && selected.includes("bumper") && (
        <mesh position={[-1.58, 0.57, 0]}>
          <boxGeometry args={[0.18, 0.3, 1.48]} />
          <meshStandardMaterial color="#292c27" metalness={1} />
        </mesh>
      )}
      {!before && selected.includes("snorkel") && (
        <mesh position={[0.58, 1.55, 0.58]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 12]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      )}
      {!before && selected.includes("exhaust") && (
        <>
          <mesh position={[1.48, 0.55, -0.38]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.45, 12]} />
            <meshStandardMaterial color="#8f918b" metalness={1} />
          </mesh>
          <mesh position={[1.48, 0.55, 0.38]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.45, 12]} />
            <meshStandardMaterial color="#8f918b" metalness={1} />
          </mesh>
        </>
      )}
    </group>
  );
}

export function Configurator() {
  const saved = () => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem("jalip-config") || "null");
    } catch {
      return null;
    }
  };
  const initial = saved();
  const [color, setColor] = useState<string>(initial?.color || "#c6b99f"),
    [metal, setMetal] = useState<boolean>(initial?.metal ?? false),
    [lights, setLights] = useState<boolean>(initial?.lights ?? true),
    [before, setBefore] = useState(false),
    [selected, setSelected] = useState<string[]>(
      initial?.selected || ["light", "bumper"],
    ),
    [cameraKey, setCameraKey] = useState(0);
  const toggle = (id: string) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  const summary = `configurar un UTV color ${color}, acabado ${metal ? "metal" : "mate"}, ${selected.length} mejoras: ${
    equipment
      .filter((x) => selected.includes(x.id))
      .map((x) => x.name)
      .join(", ") || "base"
  }`;
  const save = () =>
    localStorage.setItem(
      "jalip-config",
      JSON.stringify({ color, metal, lights, selected }),
    );
  return (
    <div className="mt-12 overflow-hidden border border-[var(--jalip-line)] lg:grid lg:grid-cols-[68%_32%]">
      <div className="relative min-h-[500px] bg-[#0b0d0b] lg:min-h-[610px]">
        <div className="absolute inset-x-0 top-0 z-10 flex justify-between border-b border-[var(--jalip-line)] p-4 text-[8px] font-bold tracking-[.18em] text-[var(--jalip-metal)]">
          <span>MODELO 3D / UTV CONCEPT</span>
          <span className="text-[var(--jalip-red-bright)]">
            DEMO PROCEDURAL · NO OFICIAL
          </span>
        </div>
        <Canvas
          key={cameraKey}
          camera={{ position: [4.6, 2.8, 4.8], fov: 39 }}
          shadows
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 7, 5]} intensity={2.8} castShadow />
            <ConceptUTV
              color={color}
              metal={metal}
              lights={lights}
              selected={selected}
              before={before}
            />
            <mesh
              position={[0, -0.15, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
            >
              <circleGeometry args={[5, 64]} />
              <meshStandardMaterial color="#29251e" roughness={1} />
            </mesh>
            {[
              [-2, 0.05, -1.8],
              [2.1, 0.03, -1.4],
              [1.8, 0.04, 1.8],
            ].map((p, i) => (
              <mesh
                key={i}
                position={p as [number, number, number]}
                rotation={[i, 0.3, i]}
              >
                <dodecahedronGeometry args={[0.3 + i * 0.08, 0]} />
                <meshStandardMaterial color="#46443d" roughness={1} />
              </mesh>
            ))}
            <ContactShadows
              position={[0, -0.13, 0]}
              opacity={0.72}
              scale={9}
              blur={2}
            />
            <Environment preset="warehouse" />
            <OrbitControls
              enablePan={false}
              minDistance={3.7}
              maxDistance={8}
            />
          </Suspense>
        </Canvas>
        <button
          aria-label="Restablecer cámara"
          onClick={() => setCameraKey((k) => k + 1)}
          className="absolute right-4 top-14 z-10 flex items-center gap-2 border border-[var(--jalip-line)] bg-[#070908]/75 px-3 py-2 text-[8px] font-bold tracking-widest"
        >
          <RotateCcw size={13} /> RESET
        </button>
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-[var(--jalip-line)] bg-[#070908]/92">
          <div className="grid grid-cols-2 gap-px border-b border-[var(--jalip-line)] md:grid-cols-[1fr_1fr_1.6fr_1fr_1fr_1fr]">
            {[
              ["BASE", () => setBefore(true), before],
              ["PREPARADO", () => setBefore(false), !before],
            ].map(([l, fn, on]) => (
              <button
                key={String(l)}
                onClick={fn as () => void}
                className={`min-h-12 text-[9px] font-bold tracking-widest ${on ? "bg-[var(--jalip-red)]" : ""}`}
              >
                {String(l)}
              </button>
            ))}
            <div className="flex items-center justify-center gap-3">
              {["#c6b99f", "#d93628", "#30332e"].map((c) => (
                <button
                  aria-label={`Color ${c}`}
                  key={c}
                  onClick={() => setColor(c)}
                  className={`h-5 w-5 border ${color === c ? "border-[var(--jalip-bone)]" : "border-transparent"}`}
                  style={{ background: c }}
                />
              ))}
            </div>
            <button
              onClick={() => setMetal(false)}
              className={`text-[9px] font-bold tracking-widest ${!metal ? "text-[var(--jalip-red-bright)]" : ""}`}
            >
              MATE
            </button>
            <button
              onClick={() => setMetal(true)}
              className={`text-[9px] font-bold tracking-widest ${metal ? "text-[var(--jalip-red-bright)]" : ""}`}
            >
              METAL
            </button>
            <button
              onClick={() => setLights((v) => !v)}
              className={`text-[9px] font-bold tracking-widest ${lights ? "text-[var(--jalip-red-bright)]" : ""}`}
            >
              LUCES {lights ? "ON" : "OFF"}
            </button>
          </div>
          <div className="flex items-center gap-4 px-5 py-3">
            <span className="text-[8px] font-bold tracking-widest text-[var(--jalip-metal)]">
              CAPACIDAD DE TERRENO
            </span>
            <div className="h-1 flex-1 bg-white/10">
              <div
                className="h-full bg-[var(--jalip-red)]"
                style={{ width: `${35 + selected.length * 10}%` }}
              />
            </div>
            <strong className="text-[10px] text-[var(--jalip-bone)]">
              {35 + selected.length * 10}%
            </strong>
          </div>
        </div>
      </div>
      <aside className="flex min-h-[610px] flex-col bg-[var(--jalip-bone)] text-[var(--jalip-black)]">
        <div className="flex items-end justify-between border-b border-black/20 p-6">
          <div>
            <p className="text-[8px] font-bold tracking-[.2em] text-black/50">
              CONFIGURACIÓN 02
            </p>
            <h3 className="display mt-2 text-3xl">ELIGE TU EQUIPO</h3>
          </div>
          <strong className="display text-2xl text-[var(--jalip-red)]">
            {String(selected.length).padStart(2, "0")}
          </strong>
        </div>
        <div className="flex-1">
          {equipment.map((item, i) => {
            const on = selected.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`grid w-full grid-cols-[34px_1fr_26px] gap-3 border-b border-black/20 px-5 py-4 text-left ${on ? "bg-[var(--jalip-sand)]" : "hover:bg-black/5"}`}
              >
                <span
                  className={`display text-lg ${on ? "text-[var(--jalip-red)]" : "text-black/30"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <small className="block text-[7px] font-bold tracking-[.16em] text-black/45">
                    {item.category}
                  </small>
                  <strong className="mt-1 block text-sm">{item.name}</strong>
                  <span className="mt-1 block text-[10px] leading-4 text-black/55">
                    {item.description}
                  </span>
                </span>
                <span
                  className={`mt-3 flex h-6 w-6 items-center justify-center border ${on ? "border-[var(--jalip-red)] text-[var(--jalip-red)]" : "border-black/25"}`}
                >
                  {on ? <Check size={14} /> : "+"}
                </span>
              </button>
            );
          })}
        </div>
        <div className="border-t border-black/20 p-6">
          <div className="flex justify-between text-[9px] font-bold tracking-widest">
            <span>RESUMEN DE PREPARACIÓN</span>
            <span className="text-[var(--jalip-red)]">
              {selected.length} MEJORAS ACTIVAS
            </span>
          </div>
          <button
            onClick={save}
            className="mt-4 w-full bg-[var(--jalip-red)] px-4 py-4 text-[10px] font-bold tracking-[.12em] text-[var(--jalip-bone)] hover:bg-[var(--jalip-red-bright)]"
          >
            GUARDAR CONFIGURACIÓN
          </button>
          <a
            href={wa(summary)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block w-full bg-[var(--jalip-black)] px-4 py-4 text-center text-[10px] font-bold tracking-[.12em] text-[var(--jalip-bone)] hover:bg-[var(--jalip-red)]"
          >
            COTIZAR ESTA MÁQUINA ↗
          </a>
        </div>
      </aside>
    </div>
  );
}
