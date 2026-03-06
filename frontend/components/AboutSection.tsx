"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { colors } from "@/lib/colors";
import { aboutLeftImages as leftSlidingImages, aboutRightImages as rightSlidingImages } from "@/lib/sectionData";
import Link from "next/link";

const AboutSection = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.8, 0.81, 1],
    [colors.primary, colors.primary, colors.bgBlack, colors.bgBlack]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % leftSlidingImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ backgroundColor }}
      className="relative w-full min-h-screen text-white pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 md:px-12 overflow-hidden flex flex-col transition-colors duration-100"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        
        {/* --- 1. Top Heading Section --- */}
        <div className="flex flex-col items-end text-right mb-16 md:mb-32">
          <h2 className="text-[9vw] sm:text-[8vw] md:text-[7vw] font-light leading-[0.9] md:leading-[0.8] tracking-tight uppercase">
            <span className="block">What Matters</span>
            <span className="flex items-center justify-end gap-2 md:gap-4 italic font-serif lowercase">
              Tomorrow, <span className="uppercase font-sans not-italic font-light">We</span>
            </span>
            <span className="flex items-center justify-end">
             ENGINEER
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "auto", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center mt-1 md:mt-2 overflow-hidden mx-[0.15em] h-[0.7em] rounded-sm self-center shadow-lg border border-white/10"
              >
                <img 
                  src="https://cdn.prod.website-files.com/66ed38704ebf5640bb5c7765/66ed38704ebf5640bb5c77f1_23PP%201.gif" 
                  alt="Motion Graphic" 
                  className="h-full w-auto object-cover grayscale brightness-110" 
                />
              </motion.div>
              <span className="inline-block">TODAY</span>
            </span>
          </h2>
        </div>

        {/* --- 2. Integrated Content Layout --- */}
        {/* items-end ensures all three columns end on the same horizontal baseline */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 md:gap-8 lg:gap-12 w-full">

          {/* LEFT IMAGE */}
          <div className="w-full xs:w-[85%] sm:w-[70%] md:w-[25%] lg:w-[22%]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-xl"
              style={{ backgroundColor: colors.bgCard }}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={`left-${currentImg}`}
                  src={leftSlidingImages[currentImg]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-125"
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* MIDDLE TEXT */}
          <div className="w-full md:w-[40%] lg:w-[45%] flex flex-col text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="font-inter text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium tracking-tight">
Being exceptional isn&apos;t about where you start.
         </p>
              <div className="h-4 md:h-8" />
              <p className="font-inter text-xl sm:text-2xl lg:text-3xl font-light" style={{ color: colors.textSubtle }}>
                It&apos;s about what you build.
              </p>
            </motion.div>
          </div>

          {/* RIGHT IMAGE ONLY (Aligned to baseline) */}
          <div className="w-full xs:w-[85%] sm:w-[70%] md:w-[30%] lg:w-[25%]">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative aspect-square w-full overflow-hidden rounded-sm shadow-2xl"
              style={{ backgroundColor: colors.bgCard }}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={`right-${currentImg}`}
                  src={rightSlidingImages[currentImg]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-110"
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* --- 3. Explore Button (Below the aligned line) --- */}
        <div className="flex justify-end mt-12">
  <Link href="/portfolios" className="contents"> {/* Use "contents" to avoid layout breakage */}
      <motion.button 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group w-full md:w-[30%] lg:w-[25%] flex items-center justify-center gap-4 py-4 px-6 md:px-8 rounded-full transition-all duration-300 shadow-lg active:opacity-90"
        style={{ backgroundColor: colors.textWhite, color: colors.textBlack }}
      >
      <span className="text-sm sm:text-base font-bold tracking-widest uppercase">
        Explore Our Work
      </span>
      <span className="text-xl md:text-2xl group-hover:translate-x-1 transition-transform duration-300">
        →
      </span>
    </motion.button>
  </Link>
</div>
      </div>

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
    </motion.section>
  );
};

export default AboutSection;