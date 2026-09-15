# Jalip Motorsport — Project Notes

Self-contained Claude Design Canvas (`.dc.html`) site for Jalip Motorsport (UTV dealer/shop, Tamboril, Santiago, DR). No build step. Public pages: `Jalip Motorsport.dc.html`, `Vehiculos.dc.html`, `Accesorios.dc.html`. Backend/admin: `Panel Admin.dc.html`. Deployed via GitHub Pages from `Lozan0-IS/jalip-motorsport-web`.

This is a **client-only prototype**: no real backend, no real payment processing, no real auth security. Say so plainly whenever it's relevant instead of implying otherwise.

## Website Reference Workflow

Whenever a task involves looking at a reference/competitor/inspiration site to inform how this site (or any future web project) is organized, use the **`website-reference`** skill (`.claude/skills/website-reference/SKILL.md`) rather than improvising. Its governing principle, which applies to every reference-site task regardless of how the request is phrased:

> **COPY THE LOGIC, NOT THE LOOK.**
> **STUDY THE EXPERIENCE, DON'T DUPLICATE THE IDENTITY.**

The workflow is always:

**DISCOVER → ANALYZE → EXTRACT STRUCTURAL DNA → ADAPT → DESIGN → IMPLEMENT → AUDIT → REFINE**

- **Discover** — get the reference URL, the target project/brand, and the actual goal (whole-site structure, or one flow).
- **Analyze** — study the reference's Information Architecture, page flow, user journey, content hierarchy, layout structure, interaction design, scroll experience, responsive architecture, and conversion architecture. Structure and behavior only — never describe or extract its colors, fonts, logos, photography, or written copy.
- **Extract Structural DNA** — classify every finding as REUSABLE STRUCTURE (architecture/flow/patterns — ok to reuse), VISUAL IDENTITY (colors/fonts/logos/photos/copy/branding — never copy), or BRAND-SPECIFIC ELEMENTS (the reference's own products/content — must be substituted with this brand's own).
- **Adapt** — map the reusable structure onto the target brand, reasoning about what genuinely improves it rather than copying wholesale.
- **Design** — build the target's own original visual execution (palette, type, imagery, layout skinning) independent from the reference, using this project's established identity (red accent `#E11623`/`#C81120`, never the reference's colors — e.g. never copy competitor lime-green).
- **Implement** — build it in the target project's actual codebase/format.
- **Audit** — check structure/UX/responsive/functional fidelity to the *adaptation*, and explicitly verify visual independence from the reference.
- **Refine** — fix whatever the audit finds before calling it done.

**Reference sites are structural-only, always.** This applies to every current and future web project in this workspace, not just Jalip. If an instruction like "hazla exactamente igual" would mean visually cloning a reference, reinterpret it per the skill's guardrail: keep the architecture and experience, build an original implementation — and say explicitly that's what's happening rather than silently complying with a literal clone or silently ignoring the request.

## Standing rules for this project

- Never fabricate business facts (shipping costs, payment integrations, discounts, capabilities) without the user's explicit confirmation.
- Never literally copy a competitor's visual design (e.g. utvunlimited.com) — keep Jalip's own identity.
- Never claim something works without verifying it (real headless-browser testing, or reading the actual file/output) first.
- `{{ }}` template bindings in `.dc.html` files only resolve simple dotted property paths — no ternaries, math, or concatenation inline. Precompute any conditional/derived value as a flat JS property before binding.
