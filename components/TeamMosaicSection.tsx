"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

/* ================= TEAM DATA ================= */

type TeamMember = {
  id: number;
  name: string;
  role: string;
  img: string;
  x: string;
  y: string;
};

const teamMembers: TeamMember[] = [
  { id: 1, name: "Arjun", role: "CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", x: "-25%", y: "-30%" },
  { id: 2, name: "Sarah", role: "Design Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", x: "20%", y: "-35%" },
  { id: 3, name: "Vikram", role: "Dev Ops", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", x: "-35%", y: "10%" },
  { id: 4, name: "Elena", role: "UX Researcher", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", x: "30%", y: "20%" },
  { id: 5, name: "Rahul", role: "Product Manager", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400", x: "0%", y: "-40%" },
  { id: 6, name: "Maya", role: "UI Designer", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400", x: "-15%", y: "35%" },
  { id: 7, name: "Chris", role: "Frontend Developer", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400", x: "40%", y: "-10%" },
  { id: 8, name: "Sana", role: "Motion Designer", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400", x: "10%", y: "40%" },
];

/* ================= TEAM CARD COMPONENT ================= */

type TeamCardProps = {
  member: TeamMember;
  index: number;
  scrollYProgress: MotionValue<number>;
};

function TeamCard({ member, index, scrollYProgress }: TeamCardProps) {
  const xPos = useTransform(scrollYProgress, [0.1, 0.4, 0.7], ["0%", "0%", member.x]);
  const yPos = useTransform(scrollYProgress, [0.1, 0.4, 0.7], ["100%", "0%", member.y]);
  const scale = useTransform(scrollYProgress, [0.4, 0.7], [0.5, 1.2]);
  const rotate = useTransform(scrollYProgress, [0.4, 0.7], [0, index % 2 === 0 ? 5 : -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        x: xPos,
        y: yPos,
        scale,
        rotate,
        opacity,
        zIndex: index,
      }}
      className="absolute w-40 h-52 md:w-64 md:h-80 pointer-events-auto group cursor-crosshair"
    >
      <div className="relative w-full h-full overflow-hidden rounded-lg border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-[#E32C21] group-hover:scale-110">
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-[#E32C21] font-serif italic text-lg">{member.name}</p>
          <p className="text-white text-[10px] uppercase tracking-widest">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= MAIN SECTION ================= */

export default function TeamMosaicSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const x = (clientX / innerWidth - 0.5) * 40;
    const y = (clientY / innerHeight - 0.5) * 40;

    setMousePos({ x, y });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springX = useSpring(mousePos.x, { stiffness: 50, damping: 20 });
  const springY = useSpring(mousePos.y, { stiffness: 50, damping: 20 });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[200vh] bg-black overflow-hidden flex flex-col items-center"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">

        {/* Background Text */}
        <h2 className="relative z-50 text-[12vw] font-bold text-white/10 uppercase pointer-events-none tracking-tighter">
          The{" "}
          <span className="text-[#E32C21] italic font-serif lowercase">
            Ones
          </span>
        </h2>

        {/* Floating Cards */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {teamMembers.map((member, i) => (
            <TeamCard
              key={member.id}
              member={member}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,44,33,0.15)_0%,transparent_70%)]" />
      </div>
    </section>
  );
}