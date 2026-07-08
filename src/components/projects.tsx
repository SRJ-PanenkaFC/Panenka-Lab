"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/magnetic";

const projects = [
  {
    title: "Quantum Ledger",
    category: "DeFi Platform",
    description: "A next-generation trading ecosystem that processed over $2B in transaction volume through intelligent routing and ultra-low latency.",
    imageClass: "bg-gradient-to-br from-indigo-500 to-purple-600",
    tags: ["Web3", "Node.js", "AI Routing", "WebSockets"],
  },
  {
    title: "Neuro-Sync OS",
    category: "HealthTech AI",
    description: "Streamlining cognitive care and neural mapping for next-level medical research facilities. Fully compliant and highly scalable.",
    imageClass: "bg-gradient-to-br from-teal-400 to-emerald-600",
    tags: ["Next.js", "Python", "Neural Networks", "Docker"],
  },
  {
    title: "Synapse Studio",
    category: "Generative SaaS",
    description: "A futuristic AI creative suite empowering creators to generate multi-modal assets in seconds, scaling to 1M+ active users.",
    imageClass: "bg-gradient-to-br from-orange-400 to-rose-500",
    tags: ["PyTorch", "Rust", "React", "GCP"],
  },
];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.fromTo(".project-img-" + index,
      { y: -50, scale: 1.1 },
      {
        y: 50,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
    gsap.fromTo(".project-details-" + index,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        }
      }
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${
        index % 2 !== 0 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Project Image Mockup with Parallax */}
      <div className="w-full lg:w-1/2 aspect-[4/3] rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.1)] relative group border border-white/10 p-2 bg-white/5">
        <div className="w-full h-full relative overflow-hidden rounded-[32px]">
          <div className={`project-img-${index} absolute inset-0 ${project.imageClass} transition-transform duration-700 group-hover:scale-[1.15]`} />
          <div className="absolute inset-x-8 -bottom-8 top-16 bg-[#0a0a0a]/80 backdrop-blur-md rounded-t-2xl border border-white/10 shadow-2xl overflow-hidden">
             <div className="w-full h-8 bg-white/5 backdrop-blur-sm border-b border-white/10 flex items-center px-4 gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
               <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
               <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
             </div>
             <div className="p-6 h-full flex flex-col gap-4">
               <div className="h-6 w-1/3 bg-white/10 rounded-md" />
               <div className="h-32 w-full bg-white/5 rounded-xl" />
               <div className="flex gap-4">
                 <div className="h-24 w-1/2 bg-white/5 rounded-xl" />
                 <div className="h-24 w-1/2 bg-white/5 rounded-xl" />
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className={`project-details-${index} w-full lg:w-1/2 space-y-8`}>
        <div className="text-sm font-semibold tracking-wider text-purple-400 uppercase flex items-center gap-4">
          <span className="w-12 h-[1px] bg-purple-500"></span>
          {project.category}
        </div>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          {project.title}
        </h3>
        <p className="text-xl text-gray-400 leading-relaxed font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {project.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium"
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
    <section id="work" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6 border-b border-white/10 pb-12">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
            >
              Future-Ready <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Creations</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400 text-xl font-light"
            >
              We've partnered with visionary startups and pioneering enterprises to build software that accelerates the future.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Magnetic>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-purple-400 font-medium hover:text-purple-300 transition-colors uppercase tracking-wider text-sm"
              >
                View All Implementations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <div className="space-y-40">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
