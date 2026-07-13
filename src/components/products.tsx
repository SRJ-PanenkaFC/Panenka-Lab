"use client";

import { motion } from "framer-motion";
import { Gamepad2, Wand2, Bot, ExternalLink } from "lucide-react";
import { Magnetic } from "@/components/magnetic";
import { SpotlightCard } from "@/components/spotlight-card";

function PanenkaCardPreview() {
  return (
    <div className="w-full h-36 bg-gradient-to-tr from-purple-950/20 via-black/40 to-blue-950/20 rounded-2xl border border-purple-500/10 relative overflow-hidden flex items-center justify-center p-3 mt-6">
      {/* 3D Glass collectible card */}
      <div 
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        className="w-20 h-28 bg-[#0a0a1a]/90 border border-white/20 rounded-xl relative flex flex-col justify-between p-2 shadow-2xl overflow-hidden group-hover:border-purple-400/50 transition-colors duration-300"
      >
        {/* Holographic reflection glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        
        <div className="flex justify-between items-center text-[7px] font-mono text-purple-300 font-bold">
          <span>PANENKA FC</span>
          <span className="font-extrabold text-white bg-purple-500/30 px-1 rounded">FW</span>
        </div>
        
        {/* Abstract player graphic */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-purple-500/20 to-blue-500/20 mx-auto flex items-center justify-center border border-white/10 relative">
          <Gamepad2 className="w-5 h-5 text-white/50" />
        </div>
        
        <div className="flex justify-between items-center text-[6px] font-mono text-gray-500 font-semibold">
          <span>SCORE: 98</span>
          <span className="text-emerald-400 font-bold">★ LIVE</span>
        </div>
      </div>
    </div>
  );
}

function CreatorCardPreview() {
  return (
    <div className="w-full h-36 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between p-4 mt-6">
      <div className="flex justify-between items-center text-[8px] text-gray-500 font-mono font-bold">
        <span>CREATOR METRICS</span>
        <span className="text-emerald-400 font-bold">+12.4% WEEKLY</span>
      </div>
      <div className="flex-grow flex items-end gap-1.5 h-12 mt-2">
        {/* Custom miniature bar chart */}
        {[30, 45, 35, 60, 50, 75, 90].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="flex-grow bg-blue-500/10 border-t border-blue-500/40 rounded-t-sm"
          />
        ))}
      </div>
    </div>
  );
}

function AutomationCardPreview() {
  return (
    <div className="w-full h-36 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center p-3 mt-6">
      {/* Node flow diagram */}
      <div className="flex items-center gap-1.5 text-[8px] font-mono text-gray-500 font-semibold">
        <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">DATA_IN</div>
        <div className="w-3 h-[1px] bg-white/10" />
        <div className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-purple-400 font-bold animate-pulse">AI LOGIC</div>
        <div className="w-3 h-[1px] bg-white/10" />
        <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">OUTCOME</div>
      </div>
    </div>
  );
}

const products = [
  {
    icon: <Gamepad2 className="w-8 h-8 text-purple-400" />,
    title: "PanenkaFC",
    link: "https://panenkafc.gg",
    description: "The ultimate platform for modern fantasy sports, blending real-world stats with digital collectibles to drive massive engagement.",
    widget: <PanenkaCardPreview />,
  },
  {
    icon: <Wand2 className="w-8 h-8 text-blue-400" />,
    title: "Creator Lab",
    link: "#",
    description: "A suite of powerful tools designed to help creators build, monetize, and scale their audience streams easily.",
    widget: <CreatorCardPreview />,
  },
  {
    icon: <Bot className="w-8 h-8 text-teal-400" />,
    title: "Business Automation",
    link: "#",
    description: "Intelligent AI-driven flows that automate repetitive tasks and maximize business throughput.",
    widget: <AutomationCardPreview />,
  },
];

export function Products() {
  return (
    <section id="products" className="py-32 bg-[#020205] relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="product-bg-1 absolute top-20 left-10 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] -z-10 mix-blend-screen" />
      <div className="product-bg-2 absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] -z-10 mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 font-display uppercase"
          >
            OUR PROPRIETARY <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">PRODUCTS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed"
          >
            Bespoke platforms engineered in-house to solve operational scaling challenges and consumer experience goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
             <div key={index} className="product-card-wrapper w-full animate-card">
               <Magnetic>
                 <a href={product.link} target={product.link.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="block w-full h-full group">
                    <SpotlightCard className="w-full h-full p-8 flex flex-col justify-between bg-white/[0.02]">
                      <div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                            {product.icon}
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 relative z-10 group-hover:text-purple-400 transition-colors duration-300 font-display uppercase tracking-wide">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed relative z-10 h-16 font-light">
                          {product.description}
                        </p>
                      </div>
                      
                      {/* Product Preview */}
                      <div className="relative z-10">
                        {product.widget}
                      </div>
                    </SpotlightCard>
                  </a>
               </Magnetic>
             </div>
            ))}
        </div>
      </div>
    </section>
  );
}
