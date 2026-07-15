"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Activity, Globe } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Magnetic } from "@/components/magnetic";
import { TextReveal } from "@/components/text-reveal";

const projects = [
  {
    number: "01",
    title: "Quantum Ledger",
    category: "DeFi Platform",
    description: "A next-generation trading ecosystem processing over $2B in transaction volume through frictionless payment routing, instant execution, and clean user interfaces.",
    imageClass: "bg-gradient-to-br from-indigo-600 to-purple-800",
    tags: ["Product Design", "DeFi Core", "Optimized Pipelines", "Real-Time Feeds"],
    metrics: [
      { name: "EXECUTION SPEED", value: "1.4ms" },
      { name: "FLOW HANDLED", value: "$2B+" },
      { name: "SYSTEM UPTIME", value: "99.999%" }
    ]
  },
  {
    number: "02",
    title: "Neuro-Sync OS",
    category: "HealthTech AI",
    description: "Intelligent brain mapping software and research workspace helping medical centers accelerate cognitive diagnostics. Fully secure and compliant, designed for friction-free data management.",
    imageClass: "bg-gradient-to-br from-teal-500 to-emerald-700",
    tags: ["UX Blueprint", "Insight Models", "Secure Storage", "Medical Tech"],
    metrics: [
      { name: "DIAGNOSTIC SPEED", value: "-80% Time" },
      { name: "CLINICAL CENTERS", value: "120+" },
      { name: "DATA CONFIDENCE", value: "99.8%" }
    ]
  },
  {
    number: "03",
    title: "Synapse Studio",
    category: "Generative SaaS",
    description: "A collaborative creative suite empowering designers to generate visual assets in seconds, scaling smoothly to support millions of active creators globally.",
    imageClass: "bg-gradient-to-br from-orange-500 to-rose-600",
    tags: ["SaaS Interface", "Web Tools", "Asset Library", "Cloud Scaling"],
    metrics: [
      { name: "CREATION TIME", value: "<0.2s" },
      { name: "ACTIVE CREATORS", value: "1.4M" },
      { name: "USER GROWTH", value: "+250%" }
    ]
  },
];

interface Metric {
  name: string;
  value: string;
}

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  imageClass: string;
  tags: string[];
  metrics: Metric[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const defaultRotateX = 2;
  const defaultRotateY = index % 2 === 0 ? 4 : -4;
  const defaultRotateZ = 0;

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${defaultRotateX + 8}deg`, `${defaultRotateX - 8}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${defaultRotateY - 8}deg`, `${defaultRotateY + 8}deg`]);
  const rotateZ = useMotionValue(defaultRotateZ);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    
    const normX = (localX / rect.width) - 0.5;
    const normY = (localY / rect.height) - 0.5;
    
    x.set(normX);
    y.set(normY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  return (
    <div
      style={{ top: `${80 + index * 20}px` }}
      className="sticky w-full bg-[#05050e]/95 backdrop-blur-3xl border border-white/5 rounded-[28px] md:rounded-[40px] p-6 md:p-10 lg:p-14 shadow-[0_-15px_40px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row gap-8 lg:gap-20 items-center mb-10 md:mb-16 glow-border"
    >
      {/* Background outlined index number */}
      <div className="absolute right-12 bottom-4 select-none pointer-events-none text-[8rem] md:text-[12rem] font-black text-stroke opacity-[0.03] font-display">
        {project.number}
      </div>

      {/* Project Visual Display Mockup */}
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
        }}
        className="w-full lg:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group border border-white/10 p-2 bg-white/5"
      >
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full relative overflow-hidden rounded-2xl">
          <div className={`project-img-${index} absolute inset-0 ${project.imageClass} transition-transform duration-750 group-hover:scale-[1.12]`} />
          <div className="absolute inset-x-6 -bottom-8 top-16 bg-[#020205]/90 backdrop-blur-xl rounded-t-xl border border-white/10 shadow-2xl overflow-hidden transition-transform duration-700 group-hover:-translate-y-4">
             <div className="w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
               <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                 <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                 <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
               </div>
               <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1 font-bold">
                 <Activity className="w-2.5 h-2.5 text-emerald-400" />
                 PROJECT_DASHBOARD
               </span>
             </div>
             
             {/* Mock visual code dashboard representation */}
             <div className="p-5 h-full flex flex-col gap-4 font-mono text-[9px]">
               <div className="flex justify-between items-center text-gray-400">
                 <span>PROJECT: {project.title.toUpperCase()}</span>
                 <span className="text-purple-400">LAUNCHED</span>
               </div>
               <div className="h-[2px] bg-white/10 w-full" />
               
               <div className="grid grid-cols-2 gap-4 mt-2">
                 <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex flex-col gap-1.5">
                   <span className="text-gray-500">EXPERIENCE_TAGS</span>
                   <div className="flex flex-wrap gap-1">
                     {project.tags.slice(0, 3).map((tag: string, i: number) => (
                       <span key={i} className="text-[8px] bg-purple-500/10 text-purple-300 px-1 rounded">{tag}</span>
                     ))}
                   </div>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex flex-col gap-1.5 justify-between">
                   <span className="text-gray-500">OPERATIONAL_MODE</span>
                   <span className="text-emerald-400 font-bold flex items-center gap-1">
                     <Globe className="w-3 h-3 text-emerald-400" />
                     GLOBAL
                   </span>
                 </div>
               </div>

               <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex-grow flex flex-col gap-1 justify-center">
                 <span className="text-gray-500">CUSTOMER_GROWTH_METRICS</span>
                 <div className="flex justify-between text-white font-bold mt-1 text-[10px]">
                   {project.metrics.slice(0, 2).map((m: Metric, i: number) => (
                     <div key={i} className="flex gap-2">
                       <span className="text-gray-500 font-normal">{m.name}:</span>
                       <span>{m.value}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Project Details */}
      <div className="w-full lg:w-1/2 space-y-6 relative z-10">
        <div className="text-xs font-bold tracking-widest text-purple-400 uppercase flex items-center gap-4">
          <span className="w-8 h-[1px] bg-purple-500"></span>
          {project.category}
        </div>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight font-display uppercase">
          {project.title}
        </h3>
        <p className="text-base text-gray-400 leading-relaxed font-light">
          {project.description}
        </p>

        {/* Detailed Metrics Panel */}
        <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6 my-4 bg-white/[0.01] px-4 rounded-xl">
          {project.metrics.map((metric: Metric, i: number) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{metric.name}</span>
              <span className="text-lg md:text-xl font-extrabold text-white font-display tracking-tight">{metric.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {project.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="py-16 md:py-32 bg-[#020205] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6 border-b border-white/5 pb-12">
          <div className="max-w-3xl">
            <div className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 font-display uppercase">
              <TextReveal text="Next-Level Implementations" />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400 text-lg md:text-xl font-light leading-relaxed"
            >
              We partner with visionary companies to deliver high-performance production systems and flawless interactive engineering.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Magnetic>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition-colors uppercase tracking-widest text-xs"
              >
                Explore Repository
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Card deck vertical container */}
        <div className="projects-scroll-container relative pt-8 pb-32">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
