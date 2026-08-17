"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { wa } from "@/data/site";
const links = [
  ["MÁQUINAS", "#vehiculos"],
  ["CONSTRUYE LA TUYA", "#configurador"],
  ["PROYECTOS", "#proyectos"],
  ["TALLER", "#taller"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-[var(--jalip-line)] bg-[#070908]/35">
      <div className="mx-auto grid h-[92px] max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center px-5">
        <a
          href="#inicio"
          aria-label="Jalip Motorsport, inicio"
          className="flex items-center gap-3 justify-self-start"
        >
          <span className="display border-l-4 border-[var(--jalip-red)] pl-3 text-[1.55rem] leading-none">
            JALIP
          </span>
          <small className="hidden text-[8px] font-bold tracking-[.32em] text-[var(--jalip-sand)] sm:block">
            MOTORSPORT
          </small>
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {links.map(([l, h]) => (
            <a
              className="text-[10px] font-bold tracking-[.18em] text-[var(--jalip-bone)]/75 hover:text-[var(--jalip-red-bright)]"
              href={h}
              key={h}
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href={wa("hablar con Jalip Motorsport")}
          target="_blank"
          rel="noreferrer"
          className="hidden justify-self-end border border-[var(--jalip-line)] px-4 py-3 text-[9px] font-bold tracking-[.13em] hover:border-[var(--jalip-red)] hover:text-[var(--jalip-red-bright)] lg:block"
        >
          WHATSAPP 829-765-3173 ↗
        </a>
        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          className="col-start-3 justify-self-end lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="grid border-t border-[var(--jalip-line)] bg-[var(--jalip-black)] px-5 py-4 lg:hidden">
          {links.map(([l, h]) => (
            <a
              className="border-b border-[var(--jalip-line)] py-4 text-xs font-bold tracking-[.15em]"
              href={h}
              onClick={() => setOpen(false)}
              key={h}
            >
              {l}
            </a>
          ))}
          <a
            className="mt-4 bg-[var(--jalip-red)] px-4 py-4 text-center text-xs font-bold"
            href={wa("hablar con Jalip Motorsport")}
            target="_blank"
            rel="noreferrer"
          >
            WHATSAPP 829-765-3173 ↗
          </a>
        </nav>
      )}
    </header>
  );
}
