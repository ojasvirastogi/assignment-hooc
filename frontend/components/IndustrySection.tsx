"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { colors } from "@/lib/colors";

import { industries } from "@/lib/sectionData";

export default function IndustrySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], 
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.49, 0.5, 1],
    [colors.textWhite, colors.textWhite, colors.bgBlack, colors.bgBlack]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.49, 0.5, 1],
    [colors.textBlack, colors.textBlack, colors.textWhite, colors.textWhite]
  );

  const headerY = useTransform(scrollYProgress, [0, 0.2], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const getSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/\s+/g, "-");
  };

  return (
    <motion.section
      id="industry-section"
      ref={containerRef}
      style={{ backgroundColor }}
      className="min-h-screen py-24 px-10 transition-colors duration-0"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Animated Header */}
        <motion.h2
          style={{
            color: textColor,
            y: headerY,
            opacity: headerOpacity,
          }}
          // Added 'overflow-visible' just in case parent was clipping
          className="text-6xl font-light mb-16 leading-tight uppercase overflow-visible"
        >
          {/* FIX: Added 'inline-block' and 'px-2' 
            Italic fonts need extra breathing room so they don't get clipped.
          */}
          <span className="italic text-red-600 font-normal inline-block px-2">
            Designed
          </span>{" "}
          WITH INDUSTRY <br />
          EXPERTISE
        </motion.h2>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
          {industries.map((item, index) => (
            <Link
              href={`/industries/${getSlug(item)}`}
              key={index}
              className="block"
            >
              <motion.div
                style={{ color: textColor }}
                className="flex justify-between items-center py-6 border-b border-gray-400/30 group cursor-pointer"
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

        {/* Footer Link */}
        <div className="mt-16 flex justify-end">
          <Link
            href="/industries"
            className="text-red-600 flex items-center gap-2 text-xl hover:underline"
          >
            View all Industries →
          </Link>
        </div>

      </div>
    </motion.section>
  );
}