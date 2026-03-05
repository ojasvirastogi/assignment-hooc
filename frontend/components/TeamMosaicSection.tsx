"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

import { teamMembers } from "@/lib/sectionData";

function TeamCard({
  index,
  scrollYProgress,
  screenConfig,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
  screenConfig: { cols: number; gapX: number; gapY: number; scaleFactor: number; offsetY: string; scatterStart: number; scatterEnd: number };
}) {
  const member = teamMembers[index];
  const { cols, gapX, gapY, scaleFactor, offsetY, scatterStart, scatterEnd } = screenConfig;

  const entryDuration = 0.05; 
  const entryStart = index * 0.03;
  const entryEnd = entryStart + entryDuration;

  const yEnter = useTransform(scrollYProgress, [entryStart, entryEnd], ["100vh", "0vh"]);
  const opacity = useTransform(scrollYProgress, [entryStart, entryStart + 0.02], [0, 1]);

  const row = Math.floor(index / cols);
  const col = index % cols;
  const totalRows = Math.ceil(teamMembers.length / cols);

  const targetX = (col - (cols - 1) / 2) * gapX;
  const targetY = (row - (totalRows - 1) / 2) * gapY;

  const finalX = useTransform(scrollYProgress, [scatterStart, scatterEnd], ["0vw", `${targetX}vw`]);
  const finalY = useTransform(
    scrollYProgress, 
    [scatterStart, scatterEnd], 
    ["0vh", `calc(${targetY}vh + ${offsetY})`]
  );
  
  const scale = useTransform(scrollYProgress, [scatterStart, scatterEnd], [1, scaleFactor]);

  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 3000);
  };

  return (
    <motion.div
      style={{
        y: yEnter,
        x: finalX,
        translateY: finalY,
        opacity,
        scale,
        zIndex: index + 10,
      }}
      onClick={handleTap}
      className={`absolute w-[140px] h-[190px] md:w-[175px] md:h-[240px] lg:w-[220px] lg:h-[300px] group cursor-pointer touch-manipulation ${isTapped ? 'is-tapped' : ''}`}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900 transition-transform duration-300 md:group-hover:scale-105">
        <img
          src={member.img}
          alt={member.name}
          className={`w-full h-full object-cover grayscale transition duration-500 group-hover:grayscale-0 ${isTapped ? 'grayscale-0' : ''}`}
        />
        
        {/* Visible on Hover (Desktop) and Tap (Mobile/Tablet) */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3 md:p-4 transition-opacity duration-300 ${isTapped ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <p className="text-white font-bold text-[11px] md:text-sm leading-tight">
            {member.name}
          </p>
          <p className="text-red-500 text-[8px] md:text-[10px] uppercase font-black tracking-tighter md:tracking-wider">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TheOnesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [screenConfig, setScreenConfig] = useState({ 
    cols: 6, gapX: 16, gapY: 36, scaleFactor: 0.85, offsetY: "0px", scatterStart: 0.6, scatterEnd: 0.9 
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w < 768) {
        setScreenConfig({ 
          cols: 2, 
          gapX: 42, 
          gapY: h < 700 ? 10 : 12, 
          scaleFactor: 0.52,
          offsetY: "75px",
          scatterStart: 0.45, 
          scatterEnd: 0.65 
        }); 
      } else if (w < 1024) {
        setScreenConfig({ 
          cols: 3, 
          gapX: 30, 
          gapY: 20, 
          scaleFactor: 0.65,
          offsetY: "85px",
          scatterStart: 0.50,
          scatterEnd: 0.75
        });
      } else {
        setScreenConfig({ 
          cols: 6, 
          gapX: 16, 
          gapY: 36, 
          scaleFactor: 0.85,
          offsetY: "0px",
          scatterStart: 0.6,
          scatterEnd: 0.9 
        });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const textBlur = useTransform(scrollYProgress, [0.4, 0.6], ["blur(0px)", "blur(12px)"]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${screenConfig.cols <= 3 ? 'h-[400vh]' : 'h-[800vh]'} bg-gradient-to-b from-[#4c0505] via-[#1a0000] to-black`}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        <motion.h2 
          style={{ filter: textBlur, opacity: textOpacity }}
          className="absolute z-0 text-[18vw] md:text-[12vw] font-black uppercase text-red-500/20 text-center select-none"
        >
          THE ONES
        </motion.h2>

        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {teamMembers.map((_, i) => (
            <TeamCard 
              key={i} 
              index={i} 
              scrollYProgress={scrollYProgress} 
              screenConfig={screenConfig}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05)_0%,transparent_80%)] pointer-events-none" />
      </div>
    </section>
  );
}