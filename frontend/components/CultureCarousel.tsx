"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {cultureCarouselItems as carouselItems} from "@/lib/sectionData";


export default function CultureCarousel() {
  const [index, setIndex] = useState(2);

  const nextStep = () => setIndex((prev) => (prev + 1) % carouselItems.length);
  const prevStep = () => setIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  return (
    <section className="w-full min-h-screen bg-black text-white py-20 flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* --- Heading Section --- */}
      <div className="text-center mb-12 select-none">
        <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
          ONE, <span className="text-red-600 italic font-serif">for a</span>
        </h2>
        <h2 className="text-5xl md:text-7xl font-normal tracking-[0.15em] uppercase">
          World of Change
        </h2>
      </div>

      {/* --- Carousel Container --- */}
      <div className="relative flex items-center justify-center w-full h-[450px] md:h-[550px]">
        
        {/* Navigation Arrows - Precisely positioned relative to center card */}
        <div className="absolute z-[60] flex justify-between items-center w-full max-w-[400px] md:max-w-[600px] px-4 pointer-events-none">
          <button 
            onClick={prevStep}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center pointer-events-auto bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black transition-all"
          >
            <span className="text-xl">←</span>
          </button>
          <button 
            onClick={nextStep}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center pointer-events-auto bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black transition-all"
          >
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* Cards Row */}
        <div className="relative flex items-center justify-center w-full">
          {carouselItems.map((item, i) => {
            const distance = i - index;
            const isActive = i === index;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: distance * 320, // Spacing between cards
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.4,
                  filter: isActive ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(4px)",
                  zIndex: isActive ? 50 : 30 - Math.abs(distance),
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-[280px] h-[380px] md:w-[350px] md:h-[480px] overflow-hidden rounded-sm"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale" 
                />
                
                {/* Title Overlay for Active Card */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end items-center pb-10">
                    <p className="text-white text-xl md:text-2xl font-semibold tracking-wide">
                      {item.title}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- Bottom Caption --- */}
      <div className="mt-12 max-w-xl text-center px-6">
        <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
          More than being a UI UX design agency, our teams frequently connect outside <br className="hidden md:block"/> office for activities, and days out.
        </p>
      </div>
    </section>
  );
}