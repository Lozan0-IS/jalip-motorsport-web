import Image from "next/image";
import { wa } from "@/data/site";
export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/images/jalip-hero-mountain.jpg"
        alt="UTV genérico modificado recorriendo una montaña tropical"
        fill
        priority
        className="object-cover object-[67%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#070908f8_0%,#070908d9_34%,#07090845_61%,transparent_78%),linear-gradient(0deg,#070908e8_0%,transparent_42%)]" />
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1320px] items-center px-5 pb-20 pt-[132px] lg:grid-cols-[1fr_230px]">
        <div className="max-w-[610px]">
          <div className="flex items-center gap-4">
            <span className="display text-4xl text-[var(--jalip-red)]">01</span>
            <span className="h-px w-10 bg-[var(--jalip-sand)]" />
            <p className="text-[10px] font-bold tracking-[.24em] text-[var(--jalip-sand)]">
              TALLER DE PREPARACIÓN OFF-ROAD
            </p>
          </div>
          <h1 className="display mt-6 text-[clamp(4rem,7.4vw,7.3rem)] leading-[.82] text-[var(--jalip-bone)]">
            NO SALE
            <br />
            IGUAL DE
            <br />
            <span className="text-[var(--jalip-red)]">COMO ENTRÓ.</span>
          </h1>
          <p className="mt-8 max-w-md border-l-2 border-[var(--jalip-sand)] pl-5 text-sm leading-6 text-[var(--jalip-bone)]/72">
            Ingeniería de taller, selección de componentes y preparación de UTV
            para máquinas que tienen un propósito real.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="btn btn-primary" href="#configurador">
              INICIA TU PROYECTO ↗
            </a>
            <a
              className="btn btn-ghost"
              href={wa("hablar con el taller")}
              target="_blank"
              rel="noreferrer"
            >
              HABLA CON UN TÉCNICO ↗
            </a>
          </div>
        </div>
        <aside className="hidden self-end pb-24 lg:block">
          <div className="border-y border-[var(--jalip-line)] py-5">
            <strong className="display text-4xl text-[var(--jalip-bone)]">
              04
            </strong>
            <p className="mt-2 text-[8px] font-bold tracking-[.18em] text-[var(--jalip-metal)]">
              ETAPAS DE PREPARACIÓN
            </p>
          </div>
          <div className="border-b border-[var(--jalip-line)] py-5">
            <strong className="display text-4xl text-[var(--jalip-bone)]">
              01/01
            </strong>
            <p className="mt-2 text-[8px] font-bold tracking-[.18em] text-[var(--jalip-metal)]">
              CONFIGURACIÓN A MEDIDA
            </p>
          </div>
        </aside>
      </div>
      <div className="absolute bottom-8 right-8 z-10 hidden h-28 w-28 items-center justify-center rounded-full border border-[var(--jalip-sand)] text-center md:flex">
        <div className="display text-sm leading-tight">
          JALIP
          <br />
          <span className="text-[10px] text-[var(--jalip-sand)]">
            BUILT FOR
          </span>
          <br />
          <span className="text-[var(--jalip-red)]">THE WILD</span>
        </div>
        <span className="absolute inset-2 rounded-full border border-dashed border-[var(--jalip-line)]" />
      </div>
    </section>
  );
}
