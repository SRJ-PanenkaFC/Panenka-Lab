"use client";

import { motion } from "framer-motion";
import { Gamepad2, Wand2, Bot, ExternalLink } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/magnetic";
import { SpotlightCard } from "@/components/spotlight-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    icon: <Gamepad2 className="w-8 h-8 text-purple-400" />,
    title: "PanenkaFC",
    link: "https://panenkafc.gg",
    description: "The ultimate platform for modern fantasy sports, blending real-world stats with digital collectibles.",
  },
  {
    icon: <Wand2 className="w-8 h-8 text-blue-400" />,
    title: "Creator Lab",
    link: "#",
    description: "A suite of powerful tools designed to help creators build, monetize, and scale their audience.",
  },
  {
    icon: <Bot className="w-8 h-8 text-teal-400" />,
    title: "Business Automation",
    link: "#",
    description: "Intelligent AI-driven workflows that streamline your operations and boost productivity.",
  },
];

export function Products() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background
    gsap.to(".product-bg-1", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".product-bg-2", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Staggered cards
    gsap.utils.toArray(".product-card-wrapper").forEach((card: any, index: number) => {
      const yValue = 30 + (index % 3) * 20;
      
      gsap.fromTo(card, 
        { y: yValue },
        {
          y: -yValue,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="products" ref={containerRef} className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="product-bg-1 absolute top-20 left-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />
      <div className="product-bg-2 absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-10 mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Products</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Innovative platforms and tools engineered in-house to solve real-world challenges.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
             <div key={index} className="product-card-wrapper w-full">
               <Magnetic>
                 <a href={product.link} target={product.link.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="block w-full h-full cursor-none group">
                   <SpotlightCard className="w-full h-full p-10 flex flex-col">
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          {product.icon}
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-purple-400 transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed relative z-10 flex-grow">
                        {product.description}
                      </p>
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
