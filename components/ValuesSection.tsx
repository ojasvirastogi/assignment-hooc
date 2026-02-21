"use client";

import React from "react";
import { motion } from "framer-motion";

const values = [
  {
    title: "Respect > Everything",
    img: "https://cdn.prod.website-files.com/6729ec93314d1a742cfeb184/6729ec93314d1a742cfeb37f_3D%20Image%20-%2040.webp",
  },
  {
    title: "Make Bigger Mistakes",
    img: "https://cdn.prod.website-files.com/6729ec93314d1a742cfeb184/6729ec93314d1a742cfeb382_Frame%201597882397-2.webp",
  },
  {
    title: "Be There for Each Other",
    img: "https://cdn.prod.website-files.com/6729ec93314d1a742cfeb184/6729ec93314d1a742cfeb381_Frame%201597882397-1.webp",
  },
  {
    title: "Truth, Always",
    img: "https://cdn.prod.website-files.com/6729ec93314d1a742cfeb184/6729ec93314d1a742cfeb380_Frame%201597882397.webp",
  },
];

export default function ValuesSection() {
  return (
    <section className="relative w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-12 overflow-hidden selection:bg-[#E32C21]">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-24 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-normal tracking-tight">
            <span className="text-[#E32C21] italic font-serif">What</span> MAKES US, ONE?
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-12">

          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left px-6 
                ${index !== values.length - 1 ? "lg:border-r lg:border-white/10" : ""}
              `}
            >
              {/* Image Container */}
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

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-medium max-w-[220px] leading-tight opacity-90 group-hover:opacity-100 transition-opacity">
                {item.title}
              </h3>
            </motion.div>
          ))}

        </div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
    </section>
  );
}