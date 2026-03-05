"use client";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { testimonials } from "@/lib/sectionData";

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const current = testimonials[index];
  const line1 = ["What", "OUR", "CLIENTS"];
  const line2 = ["ARE", "SAYING..."];

  return (
    <section className="bg-black py-8 md:py-32 px-6 md:px-10 md:min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Responsive Heading */}
        <motion.h2 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 md:mb-20 leading-tight"
        >
          <div className="flex flex-wrap gap-x-2 md:gap-x-4 overflow-hidden">
            {line1.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  variants={wordVariants}
                  className={`inline-block ${word === "What" ? "italic text-red-600 font-serif" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-2 md:gap-x-4 overflow-hidden">
            {line2.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </motion.h2>

        {/* Responsive Grid: Column on small, Row on large */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Area */}
          <div className="relative order-2 lg:order-1">
            <div className="min-h-[300px] md:min-h-[350px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={{
                    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (direction) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-4 md:gap-6"
                >
                  <p className="text-red-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                    {current.company}
                  </p>
                  <blockquote className="text-2xl md:text-4xl text-white font-light leading-snug">
                    {current.quote}
                  </blockquote>
                  <div>
                    <h4 className="text-lg md:text-xl text-white font-medium">{current.author}</h4>
                    <p className="text-gray-500 italic text-xs md:text-sm mt-1">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation - Centered on mobile, Left on desktop */}
            <div className="flex gap-4 mt-8 justify-start">
              <button onClick={prevStep} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"> ← </button>
              <button onClick={nextStep} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"> → </button>
            </div>
          </div>

          {/* Image Area - Becomes smaller on mobile */}
          <div className="relative aspect-square w-full max-w-[250px] md:max-w-md mx-auto lg:ml-auto order-1 lg:order-2 overflow-hidden rounded-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={index}
                src={current.image}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}