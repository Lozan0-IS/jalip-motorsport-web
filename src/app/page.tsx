import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HomeContent } from "@/components/home-content";
import { ConceptShowcase } from "@/components/concept-showcase";

export default function Home() {
  return <main><Header /><Hero /><ConceptShowcase /><HomeContent /></main>;
}
