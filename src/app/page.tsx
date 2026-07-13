import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Process } from "@/components/process";
import { Trust } from "@/components/trust";
import { Products } from "@/components/products";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { ScrollEffects } from "@/components/scroll-effects";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <ScrollEffects />
      <Navbar />
      <Hero />
      <Marquee text="Design • Engineering • AI Strategy • Web3 • Mobile" speed={30} />
      <Services />
      <Projects />
      <Process />
      <Trust />
      <Products />
      <CTA />
      <Footer />
    </main>
  );
}
