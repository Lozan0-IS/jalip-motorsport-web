import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jalipmotorsport.com"),
  title: "Jalip Motorsport | Construcciones off-road en República Dominicana",
  description: "Venta, modificación, reparación y personalización de UTV. Una experiencia off-road creada en República Dominicana.",
  openGraph: { title:"Jalip Motorsport", description:"Construimos máquinas para llegar más lejos.", type:"website", locale:"es_DO" }
};

export default function RootLayout({ children }: Readonly<{children:React.ReactNode}>) {
  return <html lang="es"><body>{children}</body></html>;
}
