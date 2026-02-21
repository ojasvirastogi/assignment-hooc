"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { label: "Team", value: "80" },
  { label: "Projects", value: "230" },
  { label: "Years", value: "09" },
  { label: "Industries", value: "25" },
  { label: "Awards", value: "10" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // --- 1. Background & Text Color Sync ---
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "top 20%",
        scrub: true,
      }
    });

    mainTl
      .to(containerRef.current, { backgroundColor: "#FFFFFF" }, 0)
      .to(".stat-text", { color: "#000000" }, 0)
      .to(".stat-label", { color: "#444444" }, 0)
      .to(".stat-border", { borderColor: "rgba(0,0,0,0.1)" }, 0);

    // --- 2. Heading Upward Animation ---
    // Animates the words up from below the baseline
    gsap.from(".heading-reveal", {
      y: 100,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    // --- 3. Rolling Number Logic ---
    const statItems = gsap.utils.toArray<HTMLElement>(".stat-item");

    statItems.forEach((item) => {
      const digitColumns = item.querySelectorAll(".digit-col");

      const numberTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      digitColumns.forEach((col, i) => {
        const finalDigit = parseInt(col.getAttribute("data-final") || "0");
        const singleDigitPercent = 100 / 30;
        const targetMove = (20 + finalDigit) * singleDigitPercent;

        numberTl.to(col, {
          yPercent: -targetMove,
          duration: 3,
          ease: "expo.inOut",
          delay: i * 0.1,
        }, 0);
      });
    });
  }, { scope: containerRef });

  const DigitReel = ({ digit, heightClass }: { digit: string, heightClass: string }) => (
    <div className={`relative ${heightClass} overflow-hidden`}>
      <div 
        className="digit-col flex flex-col" 
        data-final={digit}
        style={{ willChange: "transform" }}
      >
        {[...Array(3)].map((_, setIdx) => (
          <div key={setIdx} className="flex flex-col">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <span key={n} className={`flex ${heightClass} items-center justify-center leading-none font-light`}>
                {n}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section 
      ref={containerRef} 
      className="bg-black py-40 px-10 transition-colors duration-500 overflow-hidden"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-32 overflow-hidden">
        <h2 ref={headingRef} className="stat-text text-6xl md:text-[5vw] font-light uppercase tracking-tighter text-white">
          <div className="heading-reveal inline-block">
            <span className="text-red-600 italic font-serif lowercase mr-4 text-7xl md:text-[6vw]">Our</span>
          </div>
          <div className="heading-reveal inline-block">
            Story, By Numbers
          </div>
        </h2>
      </div>

      {/* Main Stats Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="stat-item stat-border flex flex-col items-center py-10 border-r last:border-0 border-white/10"
          >
            <div className="stat-text flex items-baseline gap-0 overflow-hidden h-[80px] md:h-[130px] text-7xl md:text-[100px] font-light tracking-tighter leading-none text-white">
              {stat.value.split("").map((digit, idx) => (
                <DigitReel key={idx} digit={digit} heightClass="h-[80px] md:h-[130px]" />
              ))}
              <span className="text-4xl md:text-6xl text-red-600 font-extralight ml-1">+</span>
            </div>
            <p className="stat-label text-gray-400 uppercase tracking-widest text-xs md:text-sm mt-4 font-normal">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Showcase Section */}
      <div className="stat-item max-w-6xl mx-auto mt-20 flex flex-col lg:flex-row items-center justify-center gap-10">
        <div className="w-64 md:w-80">
            <img 
                src="https://cdn.prod.website-files.com/6729ec93314d1a742cfeb184/6729ec93314d1a742cfeb219_7a858f33fc7b1c216854d699e0e596e7.gif" 
                alt="coffee animation"
                className="w-full h-auto object-contain grayscale brightness-90 contrast-125 transition-all duration-500"
            />
        </div>

        <div className="flex flex-col items-start">
          <div className="stat-text flex items-baseline gap-0 overflow-hidden h-[100px] md:h-[180px] text-8xl md:text-[11rem] font-light tracking-tighter leading-none text-white">
            {"32628".split("").map((digit, idx) => (
               <DigitReel key={idx} digit={digit} heightClass="h-[100px] md:h-[180px]" />
            ))}
            <span className="text-6xl md:text-9xl text-red-600 font-extralight ml-4">+</span>
          </div>

          <p className="stat-label text-gray-400 uppercase tracking-[0.3em] text-xs md:text-sm mt-2 font-normal">
            Coffees Consumed
          </p>
        </div>
      </div>
    </section>
  );
}