import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
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
    <main className="relative bg-[#020205] text-white">
      <ScrollEffects />
      <Navbar />
      
      {/* 3D Z-Scroll Viewport */}
      <div className="z-scroll-container">
        <div className="z-slide">
          <Hero />
        </div>
        <div className="z-slide">
          <Services />
        </div>
        <div className="z-slide">
          <Projects />
        </div>
        <div className="z-slide">
          <Process />
        </div>
        <div className="z-slide">
          <Trust />
        </div>
        <div className="z-slide">
          <Products />
        </div>
        <div className="z-slide">
          <CTA />
          <Footer />
        </div>
      </div>
    </main>
  );
}

