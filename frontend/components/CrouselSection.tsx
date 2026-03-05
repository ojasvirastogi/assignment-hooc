"use client";
import { motion,Variants } from "framer-motion";
import {carouselFeatures as features} from "@/lib/sectionData";

export default function CarouselSection() {
  // Animation variants for the upward reveal
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
    <section className="bg-black py-8 md:py-24 px-6 md:px-10 overflow-hidden md:min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Static Text Side with Upward Animation */}
        <div className="flex flex-col justify-center order-1 lg:order-2 text-center lg:text-left">
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight "
          >
            {/* Split sentences into words for the effect */}
            <div className="overflow-hidden flex flex-wrap justify-center lg:justify-start gap-x-3">
              <span className="overflow-hidden inline-block">
                <motion.span variants={wordVariants} className="italic text-red-600 serif font-normal inline-block">Your</motion.span>
              </span>
              <span className="overflow-hidden inline-block">
                <motion.span variants={wordVariants} className="inline-block">SEARCH</motion.span>
              </span>
            </div>

            <div className="overflow-hidden flex flex-wrap justify-center lg:justify-start gap-x-3">
              <span className="overflow-hidden inline-block">
                <motion.span variants={wordVariants} className="inline-block">FOR</motion.span>
              </span>
              <span className="overflow-hidden inline-block">
                <motion.span variants={wordVariants} className="inline-block">A</motion.span>
              </span>
              <span className="overflow-hidden inline-block">
                <motion.span variants={wordVariants} className="inline-block">SCALABLE </motion.span>
              </span>
              
            </div>

            <div className="overflow-hidden flex flex-wrap justify-center lg:justify-start gap-x-3">
              <span className="overflow-hidden inline-block">
                <motion.span variants={wordVariants} className="inline-block">INTELLIGENCE </motion.span>
              </span>
              <span className="overflow-hidden inline-block">
                <motion.span variants={wordVariants} className="inline-block">ENDS</motion.span>
              </span>
            </div>

            <div className="overflow-hidden flex flex-wrap justify-center lg:justify-start gap-x-3">
              <span className="overflow-hidden inline-block">
                <motion.span variants={wordVariants} className="inline-block">HERE...</motion.span>
              </span>
            </div>
          </motion.h2>
        </div>

        {/* Scrolling Columns Side */}
        <div className="relative h-[260px] md:h-[600px] flex gap-4 md:gap-6 overflow-hidden mask-gradient order-2 lg:order-1 justify-center lg:justify-start">
          <ScrollingColumn items={features} duration={20} />
          <div className="pt-12 md:pt-20">
            <ScrollingColumn items={[...features].reverse()} duration={25} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}

function ScrollingColumn({ items, duration }: { items: string[], duration: number }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <motion.div
        animate={{ y: ["0%", "-100%"] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-4 md:gap-6"
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="w-36 h-36 md:w-52 md:h-52 lg:w-64 lg:h-64 bg-[#1A1A1A] border border-white/10 rounded-sm p-4 md:p-6 lg:p-8 flex flex-col justify-end relative group hover:border-white/30 transition-colors shadow-2xl"
          >
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-2 h-2 md:w-3 md:h-3 rounded-full border border-white/20 group-hover:bg-red-600 transition-colors" />
            <p className="text-sm md:text-lg lg:text-xl text-white font-light leading-tight">
              {item}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}