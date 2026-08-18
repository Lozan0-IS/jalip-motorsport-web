import Image from "next/image";
import { ArrowUpRight, Check, Wrench } from "lucide-react";
import { wa } from "@/data/site";

const stages = [
  ["01", "DIAGNÓSTICO", "Terreno, uso y puntos débiles"],
  ["02", "CONFIGURACIÓN", "Componentes que trabajan juntos"],
  ["03", "INSTALACIÓN", "Montaje, torque y verificación"],
  ["04", "PRUEBA", "Ajuste final antes de entregar"],
];

export function WorkshopIdentity() {
  return (
    <section
      id="metodo"
      className="overflow-hidden bg-[var(--jalip-bone)] text-[var(--jalip-black)]"
    >
      <div className="bg-[var(--jalip-red)] px-5 py-3 text-[9px] font-black tracking-[.2em] text-white">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-5 overflow-hidden whitespace-nowrap">
          <span>JALIP BUILD DEPARTMENT</span>
          <span className="hidden opacity-70 md:block">
            DIAGNÓSTICO / FABRICACIÓN / INSTALACIÓN / PRUEBA
          </span>
          <span>REP. DOM. · EST. 2024</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-5 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-0">
          <div className="relative min-h-[520px] overflow-hidden bg-black lg:min-h-[680px]">
            <Image
              src="/assets/jalip-workshop-detail.png"
              alt="Detalle de trabajo mecánico en la suspensión de un UTV"
              fill
              className="object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,#070908e8_100%)]" />
            <div className="absolute left-0 top-0 border-b border-r border-white/25 bg-black/70 px-5 py-4 text-white backdrop-blur-sm">
              <p className="text-[8px] font-black tracking-[.25em] text-[var(--jalip-sand)]">
                ORDEN DE TRABAJO
              </p>
              <p className="display mt-1 text-3xl">JLP—001</p>
            </div>
            <div className="absolute right-6 top-6 grid h-24 w-24 rotate-6 place-items-center rounded-full border-2 border-[var(--jalip-red)] text-center text-[9px] font-black tracking-[.15em] text-white">
              INSPECCIONADO
              <br />
              POR JALIP
            </div>
            <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 border border-white/20 bg-black/75 text-white backdrop-blur-sm">
              {[
                ["TORQUE", "VERIFICADO"],
                ["SETUP", "A MEDIDA"],
                ["STATUS", "TRAIL READY"],
              ].map(([a, b]) => (
                <div
                  key={a}
                  className="border-r border-white/20 p-4 last:border-r-0"
                >
                  <p className="text-[7px] font-bold tracking-[.2em] text-white/45">
                    {a}
                  </p>
                  <p className="mt-2 text-[9px] font-black tracking-[.08em]">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col justify-between border-y border-r border-black/20 p-7 lg:p-12 xl:p-16">
            <span className="absolute -left-px top-10 h-24 w-1 bg-[var(--jalip-red)]" />
            <div>
              <p className="text-[9px] font-black tracking-[.24em] text-[var(--jalip-red)]">
                EL MÉTODO JALIP / 001
              </p>
              <h2 className="display mt-7 text-[clamp(3.5rem,6vw,6.8rem)] leading-[.82]">
                NO CAMBIAMOS
                <br />
                PIEZAS.
                <br />
                <span className="text-[var(--jalip-red)]">
                  CAMBIAMOS
                  <br />
                  CAPACIDAD.
                </span>
              </h2>
              <p className="mt-8 max-w-md border-l border-black/30 pl-5 text-sm leading-6 text-black/65">
                Cada máquina entra con un propósito. Jalip estudia cómo se usa,
                define qué necesita y entrega una preparación que funciona como
                un solo sistema.
              </p>
            </div>

            <div className="mt-12 border-t border-black/20 pt-7">
              <div className="flex items-start gap-4">
                <Wrench className="mt-1 text-[var(--jalip-red)]" size={20} />
                <p className="max-w-sm text-xs font-bold uppercase leading-5 tracking-[.08em]">
                  Menos apariencia vacía. Más control, resistencia y confianza
                  donde importa.
                </p>
              </div>
              <a
                className="mt-8 inline-flex items-center gap-3 bg-black px-6 py-4 text-[10px] font-black tracking-[.15em] text-white hover:bg-[var(--jalip-red)]"
                href={wa("evaluar mi máquina con el método Jalip")}
                target="_blank"
                rel="noreferrer"
              >
                EVALUAR MI MÁQUINA <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid border-x border-b border-black/20 md:grid-cols-4">
          {stages.map(([n, title, copy]) => (
            <div
              key={n}
              className="group relative min-h-44 border-b border-black/20 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="flex items-center justify-between">
                <span className="display text-4xl text-black/15 group-hover:text-[var(--jalip-red)]">
                  {n}
                </span>
                <Check size={14} className="text-[var(--jalip-red)]" />
              </div>
              <h3 className="mt-7 text-[10px] font-black tracking-[.18em]">
                {title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-black/50">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
