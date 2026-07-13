"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Layout, Rocket, LineChart, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Magnetic } from "@/components/magnetic";
import { SpotlightCard } from "@/components/spotlight-card";
import { TextReveal } from "@/components/text-reveal";

function UXWidget() {
  return (
    <div className="w-full h-24 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center p-3 mt-6">
      <div className="w-full h-full border border-dashed border-white/10 rounded flex flex-col justify-between p-2 relative">
        <div className="flex gap-2">
          <div className="w-1/3 h-2 bg-purple-500/20 rounded" />
          <div className="w-1/2 h-2 bg-white/10 rounded" />
        </div>
        <div className="w-full h-8 border border-dashed border-purple-500/20 rounded-md bg-purple-500/5 relative overflow-hidden flex items-center px-2">
          <span className="text-[8px] text-purple-400 font-mono tracking-widest uppercase">Experience.tsx</span>
          <div className="absolute right-4 bottom-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
}

function WebWidget() {
  const [line, setLine] = useState("GET /home");
  useEffect(() => {
    const outputs = [
      "PAGE SPEED: 100/100 (FASTEST)",
      "USER SATISFACTION: 99.8%",
      "ENGAGEMENT RATIO: EXCELLENT",
      "LOAD TIME: 120ms (INSTANT)",
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setLine(outputs[idx]);
      idx = (idx + 1) % outputs.length;
    }, 2200);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full h-24 bg-[#020205] border border-white/5 rounded-xl p-3 flex flex-col justify-between font-mono text-[9px] text-emerald-400 mt-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1 text-gray-500">
        <span>experience indicators</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <div className="flex-grow flex flex-col justify-center gap-1 font-semibold">
        <div className="text-gray-500 font-normal">system check: active</div>
        <div className="truncate">&gt; {line}</div>
      </div>
    </div>
  );
}

function MobileWidget() {
  return (
    <div className="w-full h-24 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center p-3 mt-6">
      <div className="w-16 h-full border border-white/20 rounded-lg bg-black/60 relative p-1 flex flex-col gap-1 justify-between">
        <div className="w-6 h-1 bg-white/20 rounded-full mx-auto" />
        <div className="flex-grow rounded bg-white/5 p-1 flex flex-col gap-1">
          <div className="w-full h-3 bg-teal-500/20 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" />
          </div>
          <div className="w-full h-1 bg-white/10 rounded" />
          <div className="w-1/2 h-1 bg-white/10 rounded" />
        </div>
        <div className="w-3 h-1 bg-white/30 rounded-full mx-auto" />
      </div>
    </div>
  );
}

function DataWidget() {
  return (
    <div className="w-full h-24 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center p-3 mt-6">
      <svg className="w-full h-12" viewBox="0 0 200 50">
        <path
          d="M 0 25 Q 25 5, 50 25 T 100 25 T 150 25 T 200 25"
          fill="none"
          stroke="url(#gradient-data)"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        <defs>
          <linearGradient id="gradient-data" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function SecurityWidget() {
  return (
    <div className="w-full h-24 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center p-3 mt-6">
      <div className="relative w-12 h-12 rounded-full border border-rose-500/20 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-dashed border-rose-500/40 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-rose-500/20" />
        </div>
        <div className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-6 bg-gradient-to-t from-rose-500 to-transparent origin-bottom animate-spin duration-[4s]" />
      </div>
    </div>
  );
}

function CloudWidget() {
  return (
    <div className="w-full h-24 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center gap-4 mt-6">
      <div className="relative flex items-center gap-3">
        <div className="w-6 h-6 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
        </div>
        <div className="w-8 h-[1px] border-t border-dashed border-white/20 relative">
          <div className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full -top-[3px] left-0 animate-pulse" />
        </div>
        <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center" />
      </div>
    </div>
  );
}

const services = [
  {
    icon: <Layout className="w-8 h-8 text-purple-400" />,
    title: "UI/UX Design",
    description: "Crafting beautiful, intuitive interfaces that delight users, establish brand trust, and drive engagement.",
    widget: <UXWidget />,
  },
  {
    icon: <Code2 className="w-8 h-8 text-blue-400" />,
    title: "Web Development",
    description: "Building lightning-fast web experiences that perform flawlessly and load instantly for every user.",
    widget: <WebWidget />,
  },
  {
    icon: <Smartphone className="w-8 h-8 text-teal-400" />,
    title: "Mobile Apps",
    description: "Creating tactile mobile products with fluid, custom animation layers on both iOS and Android.",
    widget: <MobileWidget />,
  },
  {
    icon: <LineChart className="w-8 h-8 text-indigo-400" />,
    title: "Data Strategy",
    description: "Translating customer metrics and analytics into clear visual insights to drive business growth.",
    widget: <DataWidget />,
  },
  {
    icon: <Shield className="w-8 h-8 text-rose-400" />,
    title: "Cybersecurity",
    description: "Securing customer data to build platform trust and guarantee worry-free compliance.",
    widget: <SecurityWidget />,
  },
  {
    icon: <Rocket className="w-8 h-8 text-orange-400" />,
    title: "Cloud Architecture",
    description: "Establishing reliable infrastructures that scale smoothly with your growing customer base.",
    widget: <CloudWidget />,
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-32 bg-[#020205] relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="service-bg-1 absolute top-10 left-10 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.06)_0%,transparent_70%)] -z-10 pointer-events-none" />
      <div className="service-bg-2 absolute bottom-10 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 font-display uppercase">
            <TextReveal text="Next-Level Capabilities" />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed"
          >
            We deploy advanced software engineering disciplines to build next-level systems from inception to scale.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
             <div key={index} className="service-card-wrapper w-full">
               <Magnetic>
                 <div className="w-full h-full">
                   <SpotlightCard className="w-full h-full p-8 bg-white/[0.02]">
                     <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 relative z-10">
                       {service.icon}
                     </div>
                     <h3 className="text-xl font-bold text-white mb-3 relative z-10 font-display uppercase tracking-wide">
                       {service.title}
                     </h3>
                     <p className="text-sm text-gray-400 leading-relaxed relative z-10 h-16 font-light">
                       {service.description}
                     </p>
                     
                     {/* Immersive micro-widget */}
                     <div className="relative z-10">
                       {service.widget}
                     </div>
                   </SpotlightCard>
                 </div>
               </Magnetic>
             </div>
            ))}
        </div>
      </div>
    </section>
  );
}

