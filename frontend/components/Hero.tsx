"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { colors } from "@/lib/colors";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  
  // Sync video position with the placeholder
  const setVideoPosition = () => {
    if (!videoWrapperRef.current || !placeholderRef.current) return;
    const rect = placeholderRef.current.getBoundingClientRect();
    
    gsap.set(videoWrapperRef.current, {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
    });
  };





// test add

// trsfvgggggggggggggggggg








  useGSAP(() => {
    if (!videoWrapperRef.current || !placeholderRef.current) return;

    // --- 1. INITIAL SETUP ---
    gsap.set(videoWrapperRef.current, { 
      opacity: 0,
      scaleX: 0,
      transformOrigin: "center" 
    });

    const introTl = gsap.timeline({
      onComplete: () => {
        setVideoPosition();
        ScrollTrigger.refresh();
      }
    });

    introTl.to(videoWrapperRef.current, {
      opacity: 1,
      scaleX: 1, 
      duration: 0.8,
      delay: 0.5,
      ease: "expo.out", 
      onUpdate: setVideoPosition 
    });




    // test added

    
    // --- 2. SCROLL ANIMATION ---
    const isMobile = window.innerWidth < 768;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "+=70%" : "+=100%", 
        scrub: isMobile ? 0.5 : 1,
        pin: true,
        invalidateOnRefresh: true,
      }
    });

    scrollTl
      .fromTo(videoWrapperRef.current, 
        {
          top: () => placeholderRef.current?.getBoundingClientRect().top || 0,
          left: () => placeholderRef.current?.getBoundingClientRect().left || 0,
          width: () => placeholderRef.current?.getBoundingClientRect().width || 0,
          height: () => placeholderRef.current?.getBoundingClientRect().height || 0,
        },
        {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          ease: "none",
        }, 0)
      .to(contentRef.current, {
        y: -30, 
        opacity: 0,
        ease: "power1.inOut",
      }, 0);

    window.addEventListener("resize", setVideoPosition);
    return () => window.removeEventListener("resize", setVideoPosition);
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: colors.bgHero }}>
      
      <section ref={contentRef} className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center" style={{ color: colors.textBody }}>
        
        <h1 className="text-[16vw] md:text-[6.5vw] font-light leading-[0.85] tracking-tighter uppercase">
          Beyond
        </h1>

        <div className="flex items-center leading-[0.85] flex-wrap justify-center w-full">
          <h2 className="text-[16vw] md:text-[6.5vw] font-light italic font-serif">The</h2>
          
          <div 
            ref={placeholderRef} 
            className="inline-block h-[10vw] w-[18vw] md:h-[4.2vw] md:w-[7.5vw] bg-transparent rounded-sm mx-2 md:mx-4 self-center translate-y-[1vw] md:translate-y-[0.5vw]" 
          />
          
          <h2 className="text-[16vw] md:text-[6.5vw] font-light tracking-tighter uppercase">Algorithm</h2>
        </div>

        <div className="flex flex-col items-center -mt-6 md:mt-0">
          <h2 className="text-[11vw] md:text-[6.5vw] italic font-light leading-[0.85] font-serif mt-6 md:mt-0 uppercase">
            AI Strategy & 
          </h2>
          <h1 className="text-[11vw] md:text-[6.5vw] font-light leading-[0.85] tracking-tighter uppercase">
            Intelligent Systems
          </h1>
        </div>
      </section>

      <div
        ref={videoWrapperRef}
        className="fixed pointer-events-none overflow-hidden z-20 bg-black"
        style={{ willChange: "top, left, width, height" }}
      >
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/showcase.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Moved bottom-8 to bottom-20 for mobile to avoid cutoff */}
      <div className="absolute bottom-40 left-0 right-0 px-6 md:left-auto md:right-10 md:bottom-10 z-30 text-center md:text-right">
        <p className="text-[10px] sm:text-xs md:text-[15px] text-gray-500 uppercase font-medium max-w-[500px] mx-auto md:mr-0 leading-relaxed">
          Enterprise AI systems designed to scale operations, 
          <span className="hidden md:inline"><br /></span>
          {" "}sharpen decision-making, and deliver measurable outcomes.
        </p>
      </div>
    </main>
  );
}