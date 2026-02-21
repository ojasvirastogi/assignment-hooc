"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const awardCards = [
  { id: 1, color: "from-purple-900 to-indigo-950", title: "DNA", desc: "Best Design Studio.", sub: "DNA.Paris" },
  { id: 2, color: "from-blue-800 to-blue-950", title: "K", desc: "Best Design Project.", sub: "Kyoorius" },
  { id: 3, color: "from-teal-600 to-emerald-900", title: "INDIGO", desc: "Gold Winner In UX, Interface & Navigation", sub: "indigoaward.com" },
  { id: 4, color: "from-amber-500 to-yellow-700", title: "C", desc: "4.9★ Top Rated On Clutch", sub: "Clutch" },
];

export default function AwardSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- TEXT ANIMATIONS ---
  const awardsX = useTransform(scrollYProgress, [0, 0.4], ["-60%", "0%"]);
  const recognitionsX = useTransform(scrollYProgress, [0, 0.4], ["60%", "0%"]);
  
  // Adjusted timing to match the shorter scroll height
  const textY = useTransform(scrollYProgress, [0.45, 1], ["0%", "-120%"]);
  const textSize = useTransform(scrollYProgress, [0.45, 1], [1, 1.2]); 
  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0, 1]);

  // --- CARD ANIMATIONS ---
  const cardY = useTransform(scrollYProgress, [0, 0.45, 1], ["0px", "0px", "60px"]);
  
  const card1X = useTransform(scrollYProgress, [0, 0.45, 1], ["-300px", "-250px", "-420px"]);
  const card2X = useTransform(scrollYProgress, [0, 0.45, 1], ["-100px", "-80px", "-140px"]);
  const card3X = useTransform(scrollYProgress, [0, 0.45, 1], ["100px", "80px", "140px"]);
  const card4X = useTransform(scrollYProgress, [0, 0.45, 1], ["300px", "250px", "420px"]);

  const rot1 = useTransform(scrollYProgress, [0, 0.45, 1], ["-15deg", "-10deg", "-12deg"]);
  const rot2 = useTransform(scrollYProgress, [0, 0.45, 1], ["-7deg", "-4deg", "-5deg"]);
  const rot3 = useTransform(scrollYProgress, [0, 0.45, 1], ["7deg", "4deg", "5deg"]);
  const rot4 = useTransform(scrollYProgress, [0, 0.45, 1], ["15deg", "10deg", "12deg"]);

  const cardTransforms = [
    { x: card1X, rotate: rot1 },
    { x: card2X, rotate: rot2 },
    { x: card3X, rotate: rot3 },
    { x: card4X, rotate: rot4 },
  ];

  return (
    /* HEIGHT DECREASED FROM 400vh TO 250vh */
    <section ref={containerRef} className="relative h-[250vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Main Heading */}
        <motion.div 
          style={{ y: textY, scale: textSize, opacity: textOpacity }}
          className="absolute z-0 flex flex-col items-center text-white font-light text-[9vw] leading-[0.85] uppercase tracking-tighter"
        >
          <motion.div style={{ x: awardsX }} className="flex gap-6">
            AWARDS <span className="italic text-red-600 serif font-normal">and</span>
          </motion.div>
          <motion.div style={{ x: recognitionsX }}>
            RECOGNITIONS
          </motion.div>
        </motion.div>

        {/* Cards Layout */}
        <div className="relative z-10 flex items-center justify-center w-full">
          {awardCards.map((card, i) => (
            <motion.div
              key={card.id}
              style={{ 
                x: cardTransforms[i].x, 
                rotate: cardTransforms[i].rotate,
                y: cardY,
              }}
              className={`absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] bg-gradient-to-br ${card.color} 
                         p-6 flex flex-col justify-between shadow-[0_30px_80px_rgba(0,0,0,0.9)] 
                         rounded-none border border-white/10 backdrop-blur-xl`}
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 text-7xl font-black select-none pointer-events-none text-white">
                {card.title[0]}
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-white/10 border border-white/20">
                  <span className="text-xl font-bold text-white">{card.title[0]}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                  {card.desc}
                </h3>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-4">
                <p className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">
                  {card.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}