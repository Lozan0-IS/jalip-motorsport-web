import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HomeContent } from "@/components/home-content";
import { WorkshopIdentity } from "@/components/workshop-identity";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WorkshopIdentity />
      <HomeContent />
    </main>
  );
}
