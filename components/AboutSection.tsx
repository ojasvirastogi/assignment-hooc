"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Images for the left-side slider
const leftSlidingImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop"
];

// Images for the right-side slider
const rightSlidingImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071823991-b5182046d383?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop"
];

const clientLogos = [
  { name: "boAt", src: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Boat_logo.svg" },
  { name: "Airtel", src: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Airtel_logo-en.svg" },
  { name: "Noise", src: "https://upload.wikimedia.org/wikipedia/commons/2/23/Noise_Logo.png" },
  { name: "Coca-Cola", src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" },
];

const teamAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
];

const AboutSection = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % leftSlidingImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#E32C21] text-white py-24 px-6 md:px-12 overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Main Heading Section */}
        <div className="flex flex-col items-end text-right mb-24">
          <h2 className="text-[4vw] md:text-[5vw] font-bold leading-[0.85] tracking-tighter uppercase">
            <span className="block">What Matters</span>
            <span className="flex items-center justify-end gap-4 italic font-serif lowercase">
              Tomorrow, <span className="uppercase font-sans not-italic">We</span>
            </span>
            <span className="flex items-center justify-end">
              DESIGN
              
              <div className="flex items-center">
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "auto", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 2.0, 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="overflow-hidden rounded-md inline-block align-middle border border-white/30 shadow-2xl mx-3"
                >
                  <img 
                    src="https://cdn.prod.website-files.com/66ed38704ebf5640bb5c7765/66ed38704ebf5640bb5c77f1_23PP%201.gif" 
                    alt="Meme Animation" 
                    className="h-[1.2em] w-auto object-cover grayscale brightness-110" 
                  />
                </motion.div>
                
                <motion.span className="inline-block ml-1">
                  TODAY
                </motion.span>
              </div>
            </span>
          </h2>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* LEFT IMAGE SLIDER (Now with 2s delay and continuous images) */}
          <div className="md:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2.0, duration: 0.8 }} // Applied the 2s delay
              className="relative aspect-[3/4] overflow-hidden bg-zinc-900 rounded-sm shadow-xl"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={`left-${currentImg}`}
                  src={leftSlidingImages[currentImg]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  alt="Workspace Collaboration" 
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-125"
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Main Body Text (2s Delay) */}
          <div className="md:col-span-5 flex flex-col gap-8 py-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2.0, duration: 0.8 }}
            >
              <p className="text-3xl md:text-5xl italic leading-[1.0] tracking-tight">
                Being a One isn&apos;t about where you&apos;re from.
              </p>
              <p className="text-4xl md:text-7xl font-bold leading-[1.0] tracking-tight text-white/60 mt-4">
                It&apos;s about what you do.
              </p>
            </motion.div>
          </div>

          {/* Right Image Slider & Button (2s Delay) */}
          <div className="md:col-span-4 flex flex-col items-end">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2.0, duration: 0.8 }}
              className="relative aspect-square w-full overflow-hidden bg-zinc-900 shadow-2xl rounded-sm"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={`right-${currentImg}`}
                  src={rightSlidingImages[currentImg]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-110"
                />
              </AnimatePresence>
            </motion.div>
            
            {/* Button Revealed with 2s Delay */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2.0, duration: 0.8 }}
              className="mt-10"
            >
              <button className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                Explore Our Work
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
    </section>
  );
};

export default AboutSection;