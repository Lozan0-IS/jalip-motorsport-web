export const site = {
  name:"Jalip Motorsport", whatsapp:"18297653173",
  whatsappText:(context:string)=>`Hola Jalip Motorsport, me interesa ${context}. ¿Podrían orientarme?`,
  address:"Pendiente de confirmar", hours:"Pendiente de confirmar", instagram:"Pendiente de confirmar",
};
export const wa = (context:string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappText(context))}`;
export const vehicles = [
  {name:"Adventure X4",year:"2024",condition:"Seminuevo",status:"Disponible",spec:"4 plazas · 976 cc",mods:"Suspensión alta, aros beadlock, iluminación trail"},
  {name:"Trail RS",year:"2023",condition:"Usado certificado",status:"Reservado",spec:"2 plazas · Turbo",mods:"Protección completa, techo, audio marino"},
  {name:"Mud Edition",year:"2022",condition:"Proyecto demo",status:"Vendido",spec:"4x4 · Snorkel",mods:"Neumáticos de lodo, winch, clutch tune"},
];
export const parts = [
  {name:"Barra LED Trail 40\"",category:"Iluminación",compat:"UTV universales",install:true},
  {name:"Kit suspensión Mountain",category:"Suspensión",compat:"Validar por modelo",install:true},
  {name:"Aros Beadlock 15\"",category:"Aros",compat:"Patrones seleccionados",install:false},
  {name:"Bumper High-Clearance",category:"Protección",compat:"Validar por modelo",install:true},
];
export const packages = [
  {name:"Trail Starter",for:"Para comenzar a explorar",items:["Protección esencial","Iluminación trail","Inspección completa"]},
  {name:"Mountain Pro",for:"Control y altura en terreno técnico",items:["Suspensión","Neumáticos all-terrain","Skid plates"]},
  {name:"Mud Beast",for:"Preparado para agua y lodo",items:["Snorkel","Neumáticos mud","Protección de radiador"]},
  {name:"Night Runner",for:"Visibilidad y presencia nocturna",items:["Barra LED","Rock lights","Sistema eléctrico"]},
  {name:"Full Jalip Build",for:"Construcción integral a la medida",items:["Diseño personalizado","Performance","Acabado exclusivo"]},
];
