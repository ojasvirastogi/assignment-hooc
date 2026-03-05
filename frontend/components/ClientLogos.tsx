"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { logoRow1 as row1, logoRow2 as row2, logoRow3 as row3 } from "@/lib/sectionData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MarqueeRowProps {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}

const MarqueeRow = ({ images, direction = "left", duration = 30 }: MarqueeRowProps) => {
  const moveLeft = direction === "left";

  return (
    <div className="flex overflow-hidden py-6 select-none">
      <motion.div
        initial={{ x: moveLeft ? "0%" : "-100%" }}
        animate={{ x: moveLeft ? "-100%" : "0%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-nowrap gap-20 items-center shrink-0 pr-20"
      >
        {[...images, ...images, ...images].map((logo, i) => (
          <div
            key={i}
            className="w-32 md:w-44 flex items-center justify-center grayscale opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer"
          >
            <img
              src={`/logos/${logo}.png`}
              alt={logo}
              className="logo-img max-h-12 w-auto object-contain transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function ClientLogos() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top", // Change happens exactly when section hits the top
      end: "bottom top",
      onEnter: () => {
        // Instant Black
        gsap.set(sectionRef.current, { backgroundColor: "#000000" });
        gsap.set(".logo-img", { filter: "invert(1) brightness(2)", opacity: 0.6 });
        gsap.set(".gradient-overlay", { opacity: 0 });
      },
      onLeaveBack: () => {
        // Instant White
        gsap.set(sectionRef.current, { backgroundColor: "#ffffff" });
        gsap.set(".logo-img", { filter: "invert(0) brightness(1)", opacity: 0.3 });
        gsap.set(".gradient-overlay", { opacity: 1 });
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-white py-40 overflow-hidden relative transition-colors"
    >
      <div className="flex flex-col gap-4">
        <MarqueeRow images={row1} direction="left" duration={40} />
        <MarqueeRow images={row2} direction="right" duration={50} />
        <MarqueeRow images={row3} direction="left" duration={35} />
      </div>

      {/* Gradient Fades */}
      <div className="gradient-overlay absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300" />
      <div className="gradient-overlay absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300" />
    </section>
  );
}