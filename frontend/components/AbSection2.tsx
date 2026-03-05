"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { colors } from "@/lib/colors";
import { teamAvatars,clientLogos } from "@/lib/sectionData";


// Reusable Counter Component
function Counter({ value, direction = "up" }: { value: number; direction?: "up" | "down" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const displayText = useTransform(springValue, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  return <motion.span ref={ref}>{displayText}</motion.span>;
}

export default function AbSection2() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [colors.primary, colors.bgBlack, colors.bgBlack, colors.primary]
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor }}
      className="relative w-full min-h-screen py-32 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <h2 className="text-4xl md:text-6xl italic font-serif tracking-tight text-center" style={{ color: colors.primary }}>
            A Decade of Hooc Ai
          </h2>
          <motion.img 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="https://cdn.prod.website-files.com/66ed38704ebf5640bb5c7765/66f2954a36b8f1e160e608e6_holo-rec%20(1).png"
            className="w-16 h-16 object-contain grayscale brightness-125"
            alt="Holo Rec"
          />
        </div>

        {/* Team Avatars & Count */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-24">
          <div className="flex -space-x-4">
            {teamAvatars.map((url, i) => (
              <img 
                key={i} 
                src={url} 
                className="w-12 h-12 rounded-full border-2 border-black object-cover" 
                alt="team member" 
              />
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
              +<Counter value={70} />
            </div>
          </div>
          <p className="text-4xl md:text-6xl italic font-serif text-center" style={{ color: colors.primary }}>
            Where <Counter value={70} />+ of Us
          </p>
        </div>

        {/* Marquee-style Client Logos */}
        <div className="relative w-full overflow-hidden mb-32">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            }}
            className="flex w-max"
          >
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center mx-10 md:mx-16 opacity-60"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 md:h-10 grayscale invert brightness-0"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Project Delivery Section */}
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <h3 className="text-4xl md:text-7xl font-light text-white uppercase tracking-tighter text-center">
              Delivered <span className="italic font-serif lowercase" style={{ color: colors.primary }}><Counter value={200} />+</span> LEADING PROJECTS
            </h3>
            <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-24 h-16 rounded-lg overflow-hidden border border-white/20"
            >
              <img 
                src="https://cdn.prod.website-files.com/66ed38704ebf5640bb5c7765/66ed38704ebf5640bb5c77f9_3D%20Watchfaces.png" 
                alt="Watchfaces" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <h3 className="text-4xl md:text-7xl font-light text-white uppercase tracking-tighter text-center">
            ACROSS <span className="italic font-serif lowercase" style={{ color: colors.primary }}><Counter value={20} />+</span> INDUSTRIES
          </h3>
        </div>

        {/* Floating Background 3D Asset */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -left-20 bottom-10 w-48 h-48 opacity-40 pointer-events-none"
        >
          <img 
            src="https://cdn.prod.website-files.com/66ed38704ebf5640bb5c7765/66f2954a36b8f1e160e608e6_holo-rec%20(1).png" 
            alt="deco" 
            className="w-full h-full object-contain grayscale"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
    </motion.section>
  );
}