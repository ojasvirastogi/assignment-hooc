"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const carouselItems = [
  { id: 1, title: "Team Building", img: "https://images.unsplash.com/photo-1522071823991-b5182046d383?q=80&w=2070" },
  { id: 2, title: "Design Offsite", img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974" },
  { id: 3, title: "Workshop Days", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070" },
  { id: 4, title: "Friday Socials", img: "https://images.unsplash.com/photo-1528605248644-14dd04322a11?q=80&w=2070" },
  { id: 5, title: "Innovation Lab", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070" },
];

export default function CultureCarousel() {
  const [index, setIndex] = useState(2); // Start with the middle item active

  const nextStep = () => setIndex((prev) => (prev + 1) % carouselItems.length);
  const prevStep = () => setIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-[#0a0a0a] text-white py-24 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Heading */}
      <div className="text-center mb-16 select-none">
        <h2 className="text-4xl md:text-6xl font-light tracking-tight">
          ONE, <span className="text-[#E32C21] italic font-serif lowercase">for a</span>
        </h2>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
          World of Change
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative flex items-center justify-center w-full h-[400px] md:h-[550px]">
        <div className="relative flex items-center justify-center w-full">
          {carouselItems.map((item, i) => {
            const isActive = i === index;
            // Calculate distance from center for the "Dome" effect
            const distance = i - index;
            const isVisible = Math.abs(distance) <= 2; // Show active + 2 neighbors

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 0.8,
                  opacity: isActive ? 1 : isVisible ? 0.3 : 0,
                  filter: isActive ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(4px)",
                  zIndex: isActive ? 30 : 20 - Math.abs(distance),
                  x: distance * 280, // Adjust spacing between cards
                  rotateY: distance * -15, // Adds a slight curved/dome perspective
                }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="absolute shrink-0 w-[260px] h-[320px] md:w-[400px] md:h-[500px] rounded-sm overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover pointer-events-none" 
                />
                
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end justify-center pb-10"
                  >
                    <p className="text-white text-xl md:text-2xl font-medium tracking-wide">
                      {item.title}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-20 z-50 pointer-events-none">
          <button 
            onClick={prevStep}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center pointer-events-auto bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 group"
          >
            <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform">←</span>
          </button>
          <button 
            onClick={nextStep}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center pointer-events-auto bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 group"
          >
            <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-20 max-w-xl text-center px-6">
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          More than being a UI UX design agency, our teams frequently connect outside office for activities, and days out.
        </p>
      </div>
    </motion.section>
  );
}