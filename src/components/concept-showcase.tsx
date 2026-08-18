"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { wa } from "@/data/site";

const concepts = [
  {
    name: "Mountain Predator",
    number: "01",
    image: "/assets/jalip-project-mud.png",
    purpose: "Control y protección en terreno técnico",
    equipment: ["Lift +4", "Trail armor", "Gomas 35", "Barra LED"],
  },
  {
    name: "Mud Savage",
    number: "02",
    image: "/images/concept-mud-savage.png",
    purpose: "Preparación extrema para agua y lodo",
    equipment: ["Snorkel", "Mud tires", "Winch", "Suspensión alta"],
  },
  {
    name: "Night Hunter",
    number: "03",
    image: "/images/concept-night-hunter.png",
    purpose: "Presencia, visibilidad y ruta nocturna",
    equipment: ["Roof lights", "Rock lights", "Audio", "Protección"],
  },
];

export function ConceptShowcase() {
  const [active, setActive] = useState(0);
  const [compare, setCompare] = useState(56);
  const concept = concepts[active];

  return (
    <>
      <section className="section bg-[var(--jalip-black)]">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow">CONSTRUCCIONES CONCEPTUALES</p>
            <h2 className="display section-title mt-5">
              TRES FORMAS DE <span className="text-[var(--jalip-red)]">DOMINAR.</span>
            </h2>
          </div>
          <div className="border-l border-[var(--jalip-line)] pl-6">
            <p className="text-sm leading-6 text-[var(--jalip-metal)]">
              Demostraciones visuales creadas para presentar la dirección futura de Jalip. No representan proyectos ya realizados ni modelos oficiales.
            </p>
          </div>
        </div>

        <div className="relative mt-12 min-h-[690px] overflow-hidden border border-[var(--jalip-line)]">
          <Image src={concept.image} alt={`Construcción conceptual ${concept.name}`} fill className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#070908e8_0%,transparent_52%),linear-gradient(0deg,#070908ed_0%,transparent_55%)]" />
          <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap border-b border-[var(--jalip-line)] bg-[#070908]/55">
            {concepts.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActive(index)}
                className={`border-r border-[var(--jalip-line)] px-5 py-4 text-[9px] font-bold tracking-[.15em] ${active === index ? "bg-[var(--jalip-red)] text-[var(--jalip-bone)]" : "text-[var(--jalip-metal)] hover:text-[var(--jalip-bone)]"}`}
              >
                {item.number} · {item.name.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 grid gap-7 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-10">
            <div>
              <span className="text-[9px] font-bold tracking-[.2em] text-[var(--jalip-sand)]">CONCEPTO DEMOSTRATIVO / {concept.number}</span>
              <h3 className="display mt-4 text-5xl md:text-7xl">{concept.name}</h3>
              <p className="mt-3 text-sm text-[var(--jalip-bone)]/65">{concept.purpose}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {concept.equipment.map((item) => <span key={item} className="text-[9px] font-bold tracking-[.15em] text-[var(--jalip-metal)]">+ {item}</span>)}
              </div>
            </div>
            <a className="btn btn-primary" href={wa(`una construcción inspirada en el concepto ${concept.name}`)} target="_blank" rel="noreferrer">
              QUIERO ALGO ASÍ <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--jalip-surface)]">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-end">
          <div>
            <p className="eyebrow">VISUALIZA EL CAMBIO</p>
            <h2 className="display mt-5 text-5xl leading-[.9] md:text-6xl">DE MÁQUINA BASE A <span className="text-[var(--jalip-red)]">CONSTRUCCIÓN JALIP.</span></h2>
            <p className="mt-6 text-sm leading-6 text-[var(--jalip-metal)]">Comparador conceptual. En la versión final se reemplazará por fotografías reales del mismo vehículo antes y después.</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden border border-[var(--jalip-line)]">
            <Image src="/images/jalip-hero-mountain.jpg" alt="Concepto de máquina base" fill className="object-cover grayscale" />
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${compare}%` }}>
              <div className="relative h-full" style={{ width: `${10000 / compare}%` }}>
                <Image src="/assets/jalip-project-mud.png" alt="Concepto de máquina preparada" fill className="object-cover" />
              </div>
            </div>
            <div className="absolute inset-y-0 z-10 w-px bg-[var(--jalip-bone)]" style={{ left: `${compare}%` }}><span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[var(--jalip-bone)] bg-[var(--jalip-black)] text-xs">↔</span></div>
            <span className="absolute left-4 top-4 z-10 bg-[var(--jalip-black)] px-3 py-2 text-[8px] font-bold tracking-widest">PREPARADA</span>
            <span className="absolute right-4 top-4 z-10 bg-[var(--jalip-black)] px-3 py-2 text-[8px] font-bold tracking-widest">BASE</span>
            <input aria-label="Comparar máquina base y preparada" type="range" min="10" max="90" value={compare} onChange={(event) => setCompare(Number(event.target.value))} className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0" />
          </div>
        </div>
      </section>
    </>
  );
}
