"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Layout, Rocket, LineChart, Shield } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/magnetic";
import { SpotlightCard } from "@/components/spotlight-card";

const services = [
  {
    icon: <Layout className="w-8 h-8 text-purple-400" />,
    title: "UI/UX Design",
    description: "Crafting intuitive and engaging user experiences that delight and convert.",
  },
  {
    icon: <Code2 className="w-8 h-8 text-blue-400" />,
    title: "Web Development",
    description: "Building scalable, high-performance web applications using modern tech stacks.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-teal-400" />,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions for iOS and Android.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-indigo-400" />,
    title: "Data Strategy",
    description: "Leveraging analytics and data science to drive informed business decisions.",
  },
  {
    icon: <Shield className="w-8 h-8 text-rose-400" />,
    title: "Cybersecurity",
    description: "Ensuring your digital assets are protected with state-of-the-art security.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-orange-400" />,
    title: "Cloud Architecture",
    description: "Designing robust and scalable cloud infrastructure for global reach.",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".service-bg-1", {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".service-bg-2", {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Staggered parallax for cards
    gsap.utils.toArray(".service-card-wrapper").forEach((card: any, index: number) => {
      const yValue = 50 + (index % 3) * 30;
      
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
    <section id="services" ref={containerRef} className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="service-bg-1 absolute top-10 left-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />
      <div className="service-bg-2 absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Capabilities</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            From concept to launch, we provide comprehensive software development services tailored to your business goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
             <div key={index} className="service-card-wrapper w-full">
               <Magnetic>
                 <SpotlightCard className="w-full h-full p-10 cursor-none">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 relative z-10">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed relative z-10">
                      {service.description}
                    </p>
                  </SpotlightCard>
               </Magnetic>
             </div>
            ))}
        </div>
      </div>
    </section>
  );
}
