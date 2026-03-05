"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { colors } from "@/lib/colors";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { stats } from "@/lib/sectionData";

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const splashImageRef = useRef<HTMLDivElement>(null);
  const splashTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Background Transition Timeline
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    mainTl
      .to(containerRef.current, { backgroundColor: colors.bgLight, duration: 0.2 }, 0)
      .to(".stat-text", { color: colors.textBlack, duration: 0.2 }, 0)
      .to(".stat-label", { color: colors.textMuted, duration: 0.2 }, 0)
      .to(".stat-border", { borderColor: "rgba(0,0,0,0.1)", duration: 0.2 }, 0)
      .to(containerRef.current, { backgroundColor: colors.bgBlack, duration: 0.2 }, 0.8)
      .to(".stat-text", { color: colors.textWhite, duration: 0.2 }, 0.8)
      .to(".stat-label", { color: colors.textSubtle, duration: 0.2 }, 0.8)
      .to(".stat-border", {
        borderColor: "rgba(255,255,255,0.1)",
        duration: 0.2,
      }, 0.8);

    // Heading Animation
    gsap.from(".heading-reveal", {
      y: 100,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Coffee Collision
    const splashTl = gsap.timeline({
      scrollTrigger: {
        trigger: splashImageRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    splashTl
      .fromTo(
        splashImageRef.current,
        { x: -1000, opacity: 0 },
        { x: 40, opacity: 1, duration: 0.4, ease: "power4.in" }
      )
      .fromTo(
        splashTextRef.current,
        { x: 1000, opacity: 0 },
        { x: -40, opacity: 1, duration: 0.4, ease: "power4.in" },
        0
      )
      .to(splashImageRef.current, { x: 60, duration: 0.1 })
      .to(splashTextRef.current, { x: -60, duration: 0.1 }, "<")
      .to([splashImageRef.current, splashTextRef.current], {
        x: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });

    // Digit Reel Animation
    const statItems = gsap.utils.toArray<HTMLElement>(".stat-item");

    statItems.forEach((item) => {
      const digitColumns = item.querySelectorAll(".digit-col");

      const numberTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      digitColumns.forEach((col, i) => {
        const finalDigit = parseInt(col.getAttribute("data-final") || "0");
        const singleDigitPercent = 100 / 30;
        const targetMove = (20 + finalDigit) * singleDigitPercent;

        numberTl.to(
          col,
          {
            yPercent: -targetMove,
            duration: 2.5,
            ease: "expo.inOut",
            delay: i * 0.1,
          },
          0
        );
      });
    });
  }, { scope: containerRef });

  const DigitReel = ({
    digit,
    heightClass,
  }: {
    digit: string;
    heightClass: string;
  }) => (
    <div className={`relative ${heightClass} overflow-hidden font-inter`}>
      <div
        className="digit-col flex flex-col"
        data-final={digit}
        style={{ willChange: "transform" }}
      >
        {[...Array(3)].map((_, setIdx) => (
          <div key={setIdx} className="flex flex-col">
            {[0,1,2,3,4,5,6,7,8,9].map((n) => (
              <span
                key={n}
                className={`flex ${heightClass} items-center justify-center leading-none font-light`}
              >
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
      className="bg-black 
                 py-20 sm:py-28 md:py-36 lg:py-44 
                 px-5 sm:px-8 md:px-12 
                 transition-colors duration-500 
                 overflow-hidden font-inter"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 overflow-hidden">
        <h2
          ref={headingRef}
          className="stat-text 
                     text-3xl sm:text-4xl md:text-[5vw] lg:text-[4vw] 
                     font-light tracking-tight text-white"
        >
          <div className="heading-reveal inline-block">
            <span className="italic font-serif 
                             text-4xl sm:text-5xl md:text-[6vw]" style={{ color: colors.primaryStats }}>
              Our
            </span>
          </div>
          <div className="heading-reveal inline-block uppercase ml-2">
            Story, By Numbers
          </div>
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="max-w-[1400px] mx-auto 
                      grid grid-cols-2 
                      sm:grid-cols-3 
                      md:grid-cols-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="stat-item stat-border 
                       flex flex-col items-center 
                       py-8 sm:py-10 md:py-12
                       border-white/10
                       border-b md:border-b-0
                       md:border-r last:border-r-0"
          >
            <div
              className="stat-text 
                         flex items-baseline gap-0 overflow-hidden 
                         h-[60px] sm:h-[80px] md:h-[110px] lg:h-[130px]
                         text-4xl sm:text-6xl md:text-[70px] lg:text-[100px]
                         font-light tracking-tight leading-none"
            >
              {stat.value.split("").map((digit, idx) => (
                <DigitReel
                  key={idx}
                  digit={digit}
                  heightClass="h-[60px] sm:h-[80px] md:h-[110px] lg:h-[130px]"
                />
              ))}
              <span className="text-2xl sm:text-3xl md:text-5xl text-red-600 ml-1">
                +
              </span>
            </div>

            <p className="stat-label 
                          text-gray-400 uppercase 
                          tracking-widest 
                          text-[10px] sm:text-xs md:text-sm
                          mt-3 sm:mt-4 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Coffee Section */}
      <div className="stat-item 
                      max-w-7xl mx-auto 
                      mt-20 sm:mt-28 md:mt-36 lg:mt-44
                      flex flex-col md:flex-row 
                      items-center justify-center 
                      gap-8 sm:gap-12">
        <div
          ref={splashImageRef}
          className="w-32 sm:w-40 md:w-36 lg:w-48 flex justify-center"
        >
          <img
            src="https://cdn.prod.website-files.com/6729ec93314d1a742cfeb184/6729ec93314d1a742cfeb219_7a858f33fc7b1c216854d699e0e596e7.gif"
            alt="coffee animation"
            className="w-full h-auto object-contain grayscale brightness-90 contrast-125"
          />
        </div>

        <div
          ref={splashTextRef}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div
            className="stat-text 
                       flex items-baseline gap-0 overflow-hidden
                       h-[60px] sm:h-[80px] md:h-[110px] lg:h-[130px]
                       text-4xl sm:text-6xl md:text-[70px] lg:text-[100px]
                       font-light tracking-tight leading-none"
          >
            {"32628".split("").map((digit, idx) => (
              <DigitReel
                key={idx}
                digit={digit}
                heightClass="h-[60px] sm:h-[80px] md:h-[110px] lg:h-[130px]"
              />
            ))}
            <span className="text-2xl sm:text-3xl md:text-5xl text-red-600 ml-1">
              +
            </span>
          </div>

          <p className="stat-label 
                        text-gray-400 uppercase 
                        tracking-[0.3em] 
                        text-[9px] sm:text-xs md:text-sm
                        mt-3 sm:mt-4 font-medium">
            Coffees Consumed
          </p>
        </div>
      </div>
    </section>
  );
}