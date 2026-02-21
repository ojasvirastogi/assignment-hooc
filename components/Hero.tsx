"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const setVideoToPlaceholder = () => {
    if (!videoWrapperRef.current || !placeholderRef.current) return;
    const rect = placeholderRef.current.getBoundingClientRect();
    
    gsap.set(videoWrapperRef.current, {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      borderRadius: "12px",
    });
  };

  useGSAP(() => {
    if (!videoWrapperRef.current || !placeholderRef.current) return;

    setVideoToPlaceholder();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", 
        scrub: 1.2,
        pin: true,
        invalidateOnRefresh: true,
        onRefresh: setVideoToPlaceholder,
      }
    });

    tl.to(videoWrapperRef.current, {
      width: "100vw",
      height: "100vh",
      top: 0,
      left: 0,
      borderRadius: 0,
      ease: "power2.inOut"
    })
    .to(contentRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5
    }, 0); 

    window.addEventListener("resize", setVideoToPlaceholder);
    return () => {
      window.removeEventListener("resize", setVideoToPlaceholder);
    };
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
      
      {/* Background/Text Section */}
      <section ref={contentRef} className="flex h-full flex-col items-center justify-center px-4 md:px-10">
        {/* Added z-0 to text to keep it behind the floating asset */}
        <h1 className="relative z-0 text-center text-[10vw] md:text-[7vw] font-bold leading-[0.9] md:leading-[0.85] uppercase text-black select-none">
          Need a<br />
          <span className="flex flex-wrap items-center justify-center gap-3 md:gap-6 italic font-serif lowercase tracking-tighter">
            Digital 
            <div 
              ref={placeholderRef} 
              className="inline-block w-[20vw] h-[12vw] md:w-[15vw] md:h-[10vw] bg-transparent rounded-lg" 
            />
            Presence for 
          </span>
          <span className="block italic font-serif capitalize text-[8vw] md:text-[6vw] mt-2 md:mt-0">
            Startups & Business
          </span>
        </h1>
        
        {/* CHANGED: z-index increased to z-10 to put image IN FRONT of text */}
        <div className="absolute top-[10%] right-[10%] md:top-[15%] md:right-[25%] w-24 h-24 md:w-40 md:h-40 pointer-events-none z-10">
            <img 
              src="https://cdn.prod.website-files.com/6729ec93314d1a742cfeb184/6729ec93314d1a742cfeb21e_glass2.3%201.avif" 
              alt="float" 
              className="w-full h-full object-contain animate-pulse" 
            />
        </div>
      </section>

      {/* The Video Layer - z-20 keeps it above everything during expansion */}
      <div
        ref={videoWrapperRef}
        className="fixed pointer-events-none rounded-xl overflow-hidden z-20 bg-black shadow-2xl"
        style={{ willChange: "transform, top, left, width, height" }}
      >
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90">
          <source src="/showcase.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-1 opacity-0 hover:opacity-100 transition-opacity duration-700 bg-black/40 p-1">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-zinc-900 w-full h-full border border-white/5 shadow-inner" />
            ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:right-10 md:left-auto max-w-[280px] text-center md:text-right text-[8px] md:text-[10px] uppercase tracking-widest text-gray-400">
        <p>Helping brands and startups drive value through creatively functional design</p>
      </div>
    </main>
  );
}