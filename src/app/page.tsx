import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowUpRight } from "lucide-react";
import { wa } from "@/data/site";

const services = [
  ["01", "SUSPENSIÓN", "Control y respuesta"],
  ["02", "PROTECCIÓN", "Resistencia donde importa"],
  ["03", "ILUMINACIÓN", "Visibilidad para continuar"],
  ["04", "ACCESORIOS", "Función antes que apariencia"],
];

export default function Home() {
  const heroReady = existsSync(
    join(process.cwd(), "public/images/canam-maverick-x3-hero.webp"),
  );
  const logoReady = existsSync(
    join(process.cwd(), "public/images/jalip-motorsport-logo.png"),
  );

  return (
    <main className="bg-[var(--jalip-black)] text-[var(--jalip-bone)]">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/15">
        <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-5">
          <a
            href="#inicio"
            className="relative flex h-11 w-40 items-center bg-white px-3 sm:h-12 sm:w-48"
            aria-label="Jalip Motorsport, inicio"
          >
            {logoReady ? (
              <Image
                src="/images/jalip-motorsport-logo.png"
                alt="Jalip Motorsport"
                fill
                priority
                className="object-contain px-3 py-2"
              />
            ) : (
              <span className="border border-dashed border-white/30 px-3 py-2 text-[7px] font-black tracking-[.16em] text-white/50">
                LOGOTIPO REAL PENDIENTE
              </span>
            )}
          </a>
          <a
            href={wa("iniciar un proyecto")}
            target="_blank"
            rel="noreferrer"
            className="text-[9px] font-black tracking-[.16em] hover:text-[var(--jalip-red)]"
          >
            INICIAR PROYECTO ↗
          </a>
        </div>
      </header>

      <section
        id="inicio"
        className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-white/15 px-5 pb-12 pt-32 lg:pb-16"
      >
        {heroReady ? (
          <Image
            src="/images/canam-maverick-x3-hero.webp"
            alt="Can-Am Maverick X3 modificado para montaña por Jalip Motorsport"
            fill
            priority
            className="object-cover object-[58%_center]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[#0a0c0b]">
            <div className="max-w-md border border-dashed border-white/20 px-7 py-6 text-center">
              <p className="text-[9px] font-black tracking-[.2em] text-[var(--jalip-red)]">
                FOTOGRAFÍA REAL PENDIENTE
              </p>
              <p className="mt-3 text-xs leading-5 text-white/45">
                public/images/canam-maverick-x3-hero.webp
              </p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#070908fa_0%,#070908e8_43%,#07090855_67%,transparent_88%),linear-gradient(0deg,#070908c9_0%,transparent_48%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[34%] border-l border-white/10 lg:block" />
        <div className="relative mx-auto grid w-full max-w-[1320px] gap-14 lg:grid-cols-[1fr_31%] lg:items-end">
          <div>
            <p className="mb-7 text-[9px] font-black tracking-[.28em] text-[var(--jalip-red)]">
              PREPARACIÓN OFF-ROAD · REPÚBLICA DOMINICANA
            </p>
            <h1 className="display max-w-[980px] text-[clamp(4.7rem,10.5vw,10.5rem)] leading-[.76]">
              HECHA
              <br />
              PARA <span className="text-[var(--jalip-red)]">MÁS.</span>
            </h1>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={wa("preparar mi UTV")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-3 bg-[var(--jalip-red)] px-7 text-[10px] font-black tracking-[.14em] hover:bg-[var(--jalip-red-bright)]"
              >
                PREPARAR MI UTV <ArrowUpRight size={15} />
              </a>
              <a
                href="#especialidad"
                className="inline-flex min-h-14 items-center justify-center border border-white/20 px-7 text-[10px] font-black tracking-[.14em] hover:border-white"
              >
                CONOCER JALIP
              </a>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="max-w-xs text-base leading-7 text-white/58">
              Una máquina preparada con intención. Sin piezas al azar. Sin ruido
              innecesario.
            </p>
            <div className="mt-9 flex items-center gap-4 text-[8px] font-black tracking-[.2em] text-white/35">
              <span className="h-px w-12 bg-[var(--jalip-red)]" /> JLP / BUILD
              001
            </div>
          </div>
        </div>
      </section>

      <section
        id="especialidad"
        className="bg-[var(--jalip-bone)] px-5 py-24 text-[var(--jalip-black)] lg:py-32"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-10 lg:grid-cols-[.55fr_1fr]">
            <p className="text-[9px] font-black tracking-[.25em] text-[var(--jalip-red)]">
              LO QUE HACEMOS
            </p>
            <h2 className="display text-[clamp(3.5rem,7vw,7.5rem)] leading-[.84]">
              PREPARAMOS LA MÁQUINA PARA EL TERRENO QUE TIENE ENFRENTE.
            </h2>
          </div>
          <div className="mt-20 grid border-t border-black/30 md:grid-cols-2 lg:grid-cols-4">
            {services.map(([number, title, copy]) => (
              <article
                key={number}
                className="border-b border-black/25 py-8 md:border-r md:px-6 md:first:pl-0 lg:border-b-0"
              >
                <span className="display text-3xl text-[var(--jalip-red)]">
                  {number}
                </span>
                <h3 className="mt-12 text-[11px] font-black tracking-[.18em]">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-black/50">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 lg:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[9px] font-black tracking-[.25em] text-[var(--jalip-red)]">
              EL CRITERIO JALIP
            </p>
            <h2 className="display mt-6 text-[clamp(4rem,8vw,8rem)] leading-[.8]">
              MENOS
              <br />
              ADORNO.
              <br />
              <span className="text-[var(--jalip-red)]">
                MÁS
                <br />
                MÁQUINA.
              </span>
            </h2>
          </div>
          <div className="flex flex-col justify-end border-l border-white/15 pl-7 lg:pl-12">
            {[
              ["01", "ENTENDER"],
              ["02", "DEFINIR"],
              ["03", "PREPARAR"],
              ["04", "PROBAR"],
            ].map(([n, label]) => (
              <div
                key={n}
                className="flex items-center justify-between border-t border-white/15 py-6"
              >
                <span className="text-[9px] font-black tracking-[.2em] text-white/35">
                  {n}
                </span>
                <strong className="display text-3xl">{label}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/15 bg-[var(--jalip-red)] px-5 py-20">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] font-black tracking-[.25em] text-white/65">
              TU MÁQUINA. TU TERRENO.
            </p>
            <h2 className="display mt-4 text-[clamp(3.7rem,8vw,8rem)] leading-[.8]">
              HABLEMOS
              <br />
              DEL PROYECTO.
            </h2>
          </div>
          <a
            href={wa("hablar de mi proyecto")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-16 items-center gap-4 bg-black px-8 text-[10px] font-black tracking-[.16em] hover:bg-white hover:text-black"
          >
            WHATSAPP 829-765-3173 <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-4 px-5 py-7 text-[8px] font-bold tracking-[.16em] text-white/35 sm:flex-row">
        <span>JALIP MOTORSPORT</span>
        <span>PREPARACIÓN OFF-ROAD · REPÚBLICA DOMINICANA</span>
      </footer>
    </main>
  );
}
