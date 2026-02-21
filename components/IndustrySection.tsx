"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link"; // Import Link

const industries = [
  "WEB DEVELOPMENT", "BFSI",
  "APP DEVELOPMENT", "CONSUMER ELECTRONICS",
  "MACHINE LEARNING", "GAMING",
  "EDUCATION"
];

export default function IndustrySection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(scrollYProgress, [0, 0.25], ["#FFFFFF", "#000000"]);
  const textColor = useTransform(scrollYProgress, [0, 0.25], ["#000000", "#FFFFFF"]);

  // Helper function to create a URL-friendly slug
  const getSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ & /g, "-") // Replace " & " with "-"
      .replace(/\s+/g, "-"); // Replace spaces with "-"
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="min-h-screen py-20 px-10 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 style={{ color: textColor }} className="text-6xl font-light mb-16 leading-tight uppercase">
          <span className="italic text-red-600 serif font-normal">Designed</span> WITH INDUSTRY <br />
          EXPERTISE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
          {industries.map((item, index) => (
            // Wrap the motion.div with Link
            <Link href={`/industries/${getSlug(item)}`} key={index} className="block">
              <motion.div
                style={{ 
                  color: textColor, 
                  borderBottomColor: "rgba(128,128,128,0.3)" 
                }}
                className="flex justify-between items-center py-6 border-b group cursor-pointer"
              >
                <span className="text-lg tracking-widest font-medium transition-colors group-hover:text-red-600">
                  {item}
                </span>
                <span className="text-2xl transition-transform group-hover:translate-x-2 group-hover:text-red-600">
                  →
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-end">
          <Link href="/industries" className="text-red-600 flex items-center gap-2 text-xl hover:underline">
            View all Industries <span>→</span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}