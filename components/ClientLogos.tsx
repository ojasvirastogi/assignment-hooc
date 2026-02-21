"use client";

import { motion } from "framer-motion";

const row1 = ["kotak", "noise", "cocacola", "boat", "hero", "decathlon", "mamaearth"];
const row2 = ["royal-enfield", "itc", "rbl", "greyorange", "apollo", "mamaearth", "noise"];
const row3 = ["ht-media", "healthkart", "hdfc", "swvl", "thermax", "yatra", "tvs"];

interface MarqueeRowProps {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}

const MarqueeRow = ({ images, direction = "left", duration = 30 }: MarqueeRowProps) => {
  const moveLeft = direction === "left";
  
  return (
    <div className="flex overflow-hidden py-4 select-none">
      <motion.div
        initial={{ x: moveLeft ? "0%" : "-100%" }}
        animate={{ x: moveLeft ? "-100%" : "0%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-nowrap gap-16 items-center shrink-0 pr-16"
      >
        {/* Render logos multiple times for seamless looping */}
        {[...images, ...images, ...images].map((logo, i) => (
          <div key={i} className="w-32 md:w-44 flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
            <img 
              src={`/logos/${logo}.png`} 
              alt={logo} 
              className="max-h-10 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function ClientLogos() {
  return (
    <section className="bg-[#f6f1f1] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 mb-16">
         <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
            Trusted by the worlds leading brands
         </p>
      </div>

      <div className="relative flex flex-col gap-4">
        {/* Row 1 - Moves Left */}
        <MarqueeRow images={row1} direction="left" duration={40} />
        
        {/* Row 2 - Moves Right */}
        <MarqueeRow images={row2} direction="right" duration={50} />
        
        {/* Row 3 - Moves Left */}
        <MarqueeRow images={row3} direction="left" duration={35} />

        {/* Gradient Fades for the edges to make it look premium */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#F8F8F8] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#F8F8F8] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}