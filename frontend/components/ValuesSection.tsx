"use client";

import React from "react";
import { motion } from "framer-motion";
import { colors } from "@/lib/colors";
import { values } from "@/lib/sectionData";



export default function ValuesSection() {
  return (
    <section className="relative w-full text-white py-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: colors.bgDark, '--tw-bg-opacity': '1' } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto">

        {/* --- ANIMATED SECTION HEADER --- */}
        <div className="mb-24 text-center md:text-left overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1], // Smooth professional cubic-bezier
            }}
            className="text-4xl md:text-6xl font-normal tracking-tight"
          >
            <span className="italic font-serif" style={{ color: colors.primary }}>What</span> MAKES US, ONE?
          </motion.h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-12">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left px-6 
                ${index !== values.length - 1 ? "lg:border-r lg:border-white/10" : ""}
              `}
            >
              {/* Image Container with Floating Animation */}
              <div className="h-48 w-48 mb-10 flex items-center justify-center">
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain"
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 4, -4, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Card Title with upward reveal */}
              <div className="overflow-hidden">
                <motion.h3 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: (index * 0.1) + 0.5, // Appears after header
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-xl md:text-2xl font-medium max-w-[220px] leading-tight opacity-90"
                >
                  {item.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
    </section>
  );
}