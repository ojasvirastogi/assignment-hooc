"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { colors } from "@/lib/colors";
import { awardCards } from "@/lib/sectionData";

export default function AwardSection() {
  const containerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, isMedium: false, isSmall: false });

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      setWindowSize({
        width,
        isSmall: width < 768,
        isMedium: width >= 768 && width < 1024
      });
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const { isSmall, isMedium } = windowSize;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Keep text animations synced with the faster card movement
  const awardsX = useTransform(scrollYProgress, [0, 0.15], ["-120%", "0%"]);
  const recognitionsX = useTransform(scrollYProgress, [0, 0.15], ["120%", "0%"]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "-120%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0.2, 1]);

  // --- CHANGED TIMEPOINTS FOR SNAPPIER PHASE 2 -> 3 ---
  // 0: Start, 0.2: Focused in center, 0.5: Finished flying out
  const timePoints = [0, 0.2, 0.5];

  const card1X = useTransform(scrollYProgress, timePoints, [isMedium ? "250px" : "450px", "0px", isMedium ? "-250px" : "-450px"]);
  const card2X = useTransform(scrollYProgress, timePoints, [isMedium ? "80px" : "150px", "0px", isMedium ? "-80px" : "-150px"]);
  const card3X = useTransform(scrollYProgress, timePoints, [isMedium ? "-80px" : "-150px", "0px", isMedium ? "80px" : "150px"]);
  const card4X = useTransform(scrollYProgress, timePoints, [isMedium ? "-250px" : "-450px", "0px", isMedium ? "250px" : "450px"]);

  const card1Y = useTransform(scrollYProgress, timePoints, ["0px", "0px", "0px"]);
  const card2Y = useTransform(scrollYProgress, timePoints, ["0px", "0px", "0px"]);
  const card3Y = useTransform(scrollYProgress, timePoints, ["0px", "0px", "0px"]);
  const card4Y = useTransform(scrollYProgress, timePoints, ["0px", "0px", "0px"]);

  const rot1 = useTransform(scrollYProgress, timePoints, ["10deg", "0deg", "-10deg"]);
  const rot2 = useTransform(scrollYProgress, timePoints, ["4deg", "0deg", "-4deg"]);
  const rot3 = useTransform(scrollYProgress, timePoints, ["-4deg", "0deg", "4deg"]);
  const rot4 = useTransform(scrollYProgress, timePoints, ["-10deg", "0deg", "10deg"]);

  const cardTransforms = [
    { x: card1X, y: card1Y, rotate: rot1 },
    { x: card2X, y: card2Y, rotate: rot2 },
    { x: card3X, y: card3Y, rotate: rot3 },
    { x: card4X, y: card4Y, rotate: rot4 },
  ];

  return (
    <section ref={containerRef} className="relative h-[100vh] md:h-[200vh] font-sans" style={{ backgroundColor: colors.bgDeep, marginBottom: isSmall ? '-180px' : 0 }}>
      <div className={`sticky top-0 h-screen flex flex-col items-center overflow-hidden px-4 ${isSmall ? 'justify-start pt-6' : 'justify-center'}`}>
        
        <motion.div 
          style={{ y: textY, opacity: textOpacity, pointerEvents: "none" }}
          className={`${isSmall ? 'relative mb-12' : 'absolute z-0'} flex flex-col items-center w-full text-white font-light text-[12vw] md:text-[9.5vw] lg:text-[9vw] leading-[0.85] uppercase tracking-tighter`}
        >
          <motion.div style={{ x: isSmall ? 0 : awardsX }} className="flex gap-2 md:gap-8 items-center whitespace-nowrap">
            AWARDS <span className="italic text-red-600 font-serif font-normal lowercase text-[10vw] md:text-[8.5vw] lg:text-[8vw]">and</span>
          </motion.div>
          <motion.div style={{ x: isSmall ? 0 : recognitionsX }} className="whitespace-nowrap">
            RECOGNITIONS
          </motion.div>
        </motion.div>

        <div className={`relative z-10 w-full max-w-6xl mx-auto ${isSmall ? 'grid grid-cols-2 gap-3 pb-20' : 'flex items-center justify-center'}`}>
          {awardCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={isSmall ? { opacity: 0, x: i % 2 === 0 ? -100 : 100 } : false}
              whileInView={isSmall ? { opacity: 1, x: 0 } : {}}
              viewport={isSmall ? { once: true, margin: "-50px" } : {}}
              transition={isSmall ? { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } : {}}
              style={!isSmall ? { 
                x: cardTransforms[i].x, 
                y: cardTransforms[i].y, 
                rotate: cardTransforms[i].rotate,
                zIndex: i,
              } : {}}
              className={`
                ${isSmall ? 'relative w-full aspect-square' : isMedium ? 'absolute w-[280px] h-[280px]' : 'absolute w-[320px] h-[320px] lg:w-[300px] lg:h-[300px]'} 
                bg-gradient-to-br ${card.color} 
                p-4 md:p-8 flex flex-col justify-between shadow-[0_40px_100px_rgba(0,0,0,0.8)] 
                rounded-none border border-white/20 backdrop-blur-xl transition-all duration-300
              `}
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl md:text-8xl font-black select-none pointer-events-none text-white font-inter">
                {card.title[0]}
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 md:w-14 md:h-14 mb-2 md:mb-4 flex items-center justify-center bg-white/10 border border-white/20 rounded-none">
                  <span className="text-lg md:text-2xl font-bold text-white font-inter">{card.title[0]}</span>
                </div>
                <h3 className="text-sm md:text-2xl font-bold text-white leading-tight font-inter">
                  {card.desc}
                </h3>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-2 md:pt-4">
                <p className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase font-inter">
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