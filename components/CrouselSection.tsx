"use client";
import { motion } from "framer-motion";

const features = [
  "Flexible Engagement",
  "Competitive Edge",
  "Driven by Result",
  "Faster Go-To Market",
  "Omni-channel Approach",
  "User-Centric Design",
  "Scalable Solutions"
];

export default function CarouselSection() {
  return (
    <section className="bg-[#0A0A0A] py-24 px-10 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Scrolling Columns */}
        <div className="relative h-[600px] flex gap-6 overflow-hidden mask-gradient">
          {/* Column 1 - Moving Up */}
          <ScrollingColumn items={features} duration={20} />
          
          {/* Column 2 - Moving Up (Offset or different speed) */}
          <div className="pt-20">
            <ScrollingColumn items={[...features].reverse()} duration={25} />
          </div>
        </div>

        {/* Right Side: Static Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-6xl md:text-7xl font-light text-white leading-tight uppercase">
            <span className="italic text-red-600 serif font-normal">Your</span> SEARCH <br />
            FOR <br />
            A StartUps &<br />
           Business ENDS <br />
            HERE...
          </h2>
        </div>
      </div>

      {/* CSS for fading edges */}
      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}

function ScrollingColumn({ items, duration }: { items: string[], duration: number }) {
  return (
    <div className="flex flex-col gap-6">
      <motion.div
        animate={{ y: ["0%", "-100%"] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-6"
      >
        {/* Render items twice for a seamless loop */}
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="w-64 h-64 bg-[#111111] border border-white/5 rounded-sm p-8 flex flex-col justify-end relative group hover:border-white/20 transition-colors"
          >
            <div className="absolute top-6 right-6 w-3 h-3 rounded-full border border-white/20 group-hover:bg-red-600 transition-colors" />
            <p className="text-xl text-white font-light leading-tight">
              {item}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}