"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform,Variants } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { colors } from "@/lib/colors";
import { industries } from "@/lib/sectionData";
import { logoRow1 as row1 , logoRow2 as row2,logoRow3 as row3} from "@/lib/sectionData";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}





const MarqueeRow = ({ images, direction = "left", duration = 30 }: { images: string[], direction?: "left" | "right", duration?: number }) => {
  const moveLeft = direction === "left";
  return (
    <div className="flex overflow-hidden py-6 select-none">
      <motion.div
        initial={{ x: moveLeft ? "0%" : "-100%" }}
        animate={{ x: moveLeft ? "-100%" : "0%" }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex flex-nowrap gap-20 items-center shrink-0 pr-20"
      >
        {[...images, ...images, ...images].map((logo, i) => (
          <div key={i} className="w-32 md:w-44 flex items-center justify-center grayscale transition-all duration-500 cursor-pointer">
            <img 
              src={`/logos/${logo}.png`} 
              alt={logo} 
              className="logo-img max-h-12 w-auto object-contain opacity-30 transition-all duration-300" 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function BrandExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation Variants for Word Reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",   
        end: "top 40%",     
        scrub: 1,           
        toggleActions: "play reverse play reverse",
      }
    });

    tl.to(containerRef.current, { backgroundColor: colors.bgBlack, ease: "none" })
      .to(".logo-img", { filter: "invert(1) brightness(2)", opacity: 0.6, ease: "none" }, 0)
      .to(".dynamic-text", { color: colors.textWhite, ease: "none" }, 0)
      .to(".border-line", { borderColor: "rgba(255, 255, 255, 0.1)", ease: "none" }, 0);

  }, { scope: containerRef });

  const getSlug = (text: string) => text.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

  return (
    <section 
      ref={containerRef} 
      className="py-16 md:py-32 overflow-hidden relative"
      style={{ backgroundColor: colors.textWhite }}
    >
      <div className="flex flex-col gap-4 mb-16 md:mb-32">
        <MarqueeRow images={row1} direction="left" duration={40} />
        <MarqueeRow images={row2} direction="right" duration={50} />
        <MarqueeRow images={row3} direction="left" duration={35} />
      </div>

      <div className="max-w-6xl mx-auto px-10">
        {/* Animated Heading Section */}
        <div className="overflow-hidden mb-8 md:mb-16">
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="dynamic-text text-5xl md:text-6xl font-light leading-tight font-inter tracking-tighter"
          >
            <div className="flex flex-wrap items-center">
              <span className=" inline-block mr-3">
                <motion.span 
                  variants={wordVariants} 
                  className="italic font-normal font-playfair inline"
                  style={{ color: colors.primary }}
                >
                  Designed
                </motion.span>
              </span>
              
              {["WITH", "INDUSTRY", "EXPERTISE"].map((word, i) => (
                <span key={i} className="overflow-hidden inline-block mr-3">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
          {industries.map((item, index) => (
            <Link href="/portfolios" key={index} className="block group">
              <div className="dynamic-text border-line flex justify-between items-center py-6 border-b border-gray-400/30 cursor-pointer font-inter transition-colors">
                <span className="text-lg tracking-widest font-medium transition-colors uppercase">
                  {item}
                </span>
                <span className="text-2xl transition-transform group-hover:translate-x-2">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-end">
          <Link href="/industries" className="flex items-center gap-2 text-xl hover:underline font-inter group" style={{ color: colors.primary }}>
            View all Industries 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}