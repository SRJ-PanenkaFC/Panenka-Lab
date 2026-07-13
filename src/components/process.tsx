"use client";


import { Magnetic } from "@/components/magnetic";
import { Search, LayoutGrid, Terminal, Globe, Cpu } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Mapping",
    description: "Deep dive into your product and business goals. We analyze, map, and strategize the optimal user journey path for your project.",
    icon: <Search className="w-6 h-6 text-purple-400" />,
    graphic: (
      <div className="w-full h-20 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center p-3 mt-6">
        {/* Sonar pulses */}
        <div className="absolute w-12 h-12 rounded-full border border-purple-500/20 animate-ping" />
        <div className="absolute w-8 h-8 rounded-full border border-purple-500/40 animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-purple-500" />
      </div>
    )
  },
  {
    number: "02",
    title: "Experience Blueprint",
    description: "Designing the blueprint. We construct seamless user flows, logical navigation patterns, and scale-ready product plans.",
    icon: <LayoutGrid className="w-6 h-6 text-blue-400" />,
    graphic: (
      <div className="w-full h-20 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden p-3 mt-6 flex items-center justify-center">
        {/* Blueprint mesh */}
        <div className="w-12 h-12 border border-dashed border-blue-500/20 rounded flex items-center justify-center relative">
          <div className="absolute inset-x-0 h-[1px] bg-blue-500/30 top-1/2" />
          <div className="absolute inset-y-0 w-[1px] bg-blue-500/30 left-1/2" />
          <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-400" />
        </div>
      </div>
    )
  },
  {
    number: "03",
    title: "Product Engineering",
    description: "The execution phase. Crafting robust, high-performance web systems to translate designs into flawless, interactive reality.",
    icon: <Terminal className="w-6 h-6 text-teal-400" />,
    graphic: (
      <div className="w-full h-20 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden p-3 mt-6 font-mono text-[9px] text-teal-400 flex flex-col justify-center gap-1">
        <div className="flex gap-1.5 items-center text-gray-500">
          <Cpu className="w-3 h-3 text-teal-400" />
          <span>INITIATING USER INTERFACE...</span>
        </div>
        <div className="text-white">&gt; RENDERING LAYOUT: FLUID</div>
        <div className="text-gray-500">All user flows: Verified [OK]</div>
      </div>
    )
  },
  {
    number: "04",
    title: "Launch & Scale",
    description: "Launch and grow. We deploy your platform live, monitoring user engagement metrics and tuning performance for consistent growth.",
    icon: <Globe className="w-6 h-6 text-orange-400" />,
    graphic: (
      <div className="w-full h-20 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden p-3 mt-6 flex items-center justify-center">
        {/* Glowing connected node network */}
        <div className="relative flex items-center gap-4">
          <div className="w-4 h-4 rounded-full bg-orange-500/20 border border-orange-400 flex items-center justify-center" />
          <div className="w-8 h-[1px] border-t border-dashed border-white/20" />
          <div className="w-4 h-4 rounded-full bg-orange-500/20 border border-orange-400 flex items-center justify-center" />
        </div>
      </div>
    )
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-[#020205] overflow-hidden h-screen flex flex-col justify-center relative">
      {/* Glowing Horizontal Pipeline Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 z-0" />
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 -translate-y-1/2 z-0 origin-left scale-x-0 pipeline-progress shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
      
      <div className="absolute top-20 left-10 md:left-24 z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 font-display uppercase">
          HOW WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">OPERATE</span>
        </h2>
      </div>

      <div className="flex h-full items-center w-full overflow-hidden">
        <div className="process-scroll-container flex h-full items-center gap-10 md:gap-16 px-[10vw] lg:px-[15vw] w-max">
          {steps.map((step, index) => (
            <div key={index} className="process-panel w-[85vw] md:w-[500px] flex-shrink-0 relative z-10">
              <div className="w-full bg-[#050510]/80 backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-[40px] relative overflow-hidden group hover:bg-[#080816]/95 transition-colors duration-500 glow-border">
                
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-700" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <Magnetic>
                      <div className="text-6xl md:text-7xl font-black text-stroke opacity-30 select-none font-display">
                        {step.number}
                      </div>
                    </Magnetic>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 font-display uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
                    {step.description}
                  </p>

                  {/* Telemetry Visualizer */}
                  {step.graphic}
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
