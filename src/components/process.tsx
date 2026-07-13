"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/magnetic";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery & Mapping",
    description: "Deep dive into your neural networks. We analyze, map, and strategize the optimal path for your digital infrastructure.",
  },
  {
    number: "02",
    title: "System Design",
    description: "Architecting the blueprint. We construct scalable, highly-available models tailored to your specific ecosystem.",
  },
  {
    number: "03",
    title: "Core Engineering",
    description: "The build phase. Writing high-performance, fault-tolerant code that powers your next-generation platform.",
  },
  {
    number: "04",
    title: "Deployment & Scale",
    description: "Lift off. We launch your product into the wild, continuously monitoring and optimizing for maximum impact.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const getScrollAmount = () => {
      const scrollWidth = scrollContainerRef.current?.scrollWidth || 0;
      return -(scrollWidth - window.innerWidth);
    };

    gsap.to(scrollContainerRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollContainerRef.current?.scrollWidth || window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="py-24 bg-[#050505] overflow-hidden h-screen flex flex-col justify-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-white/10" />
      
      <div className="absolute top-20 left-10 md:left-24 z-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
          How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Operate</span>
        </h2>
      </div>

      <div className="flex h-full items-center w-full overflow-hidden">
        <div ref={scrollContainerRef} className="flex h-full items-center gap-10 md:gap-16 px-[10vw] lg:px-[15vw] w-max">
          {steps.map((step, index) => (
            <div key={index} className="process-panel w-[85vw] md:w-[600px] flex-shrink-0 relative">
              <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[40px] relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
                
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-colors duration-700" />
                
                <div className="relative z-10">
                  <Magnetic>
                    <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-white/10 stroke-white mb-8 select-none">
                      {step.number}
                    </div>
                  </Magnetic>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
