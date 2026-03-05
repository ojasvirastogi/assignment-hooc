"use client";
import { motion, AnimatePresence,Variants } from "framer-motion";
import { useState } from "react";
import { faqs } from "@/lib/sectionData";

// gfgggggggggggggggggggg

export default function FaqSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- Animation Variants for Words ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Har word ke beech delay
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants:Variants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier ease
      },
    },
  };
 

  return (
    <section className="bg-black py-10 md:py-32 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading with Upward Word Animation */}
        <motion.h2 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-6xl font-light text-white mb-8 md:mb-20 text-center px-1 tracking-tight"
        >
          <div className="flex flex-wrap justify-center gap-x-[0.3em] ">
            <span className=" inline-block">
              <motion.span 
                variants={wordVariants} 
                className="italic text-red-600 serif font-normal inline-block"
              >
                Any
              </motion.span>
            </span>

            {["MORE", "QUESTIONS?"].map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </motion.h2>

        {/* FAQ List */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-white/10 relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="py-10 flex justify-between items-center cursor-pointer group">
                <h3 className={`text-xl md:text-2xl font-light transition-colors duration-300 ${hoveredIndex === index ? 'text-white' : 'text-gray-400'}`}>
                  {faq.question}
                </h3>
                
                <motion.span 
                  animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                  className="text-3xl font-thin text-gray-500 group-hover:text-white"
                >
                  +
                </motion.span>
              </div>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-10 text-gray-500 text-lg max-w-3xl leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}