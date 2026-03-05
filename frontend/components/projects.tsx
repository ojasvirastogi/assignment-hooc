"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projectCards as projects } from "@/lib/sectionData";



export default function Projects() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // --- 1. Background Color Transition (White -> Black) ---
      gsap.to(sectionRef.current, {
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // --- 2. Text Color Transition ---
      gsap.to([".reveal-line", ".desc-text"], {
        color: "#ffffff",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: 2,
        },
      });

      // --- 3. Heading Upward Animation ---
      const lines = gsap.utils.toArray<HTMLElement>(".reveal-line");
      gsap.from(lines, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

    
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 8%",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: 1,
        });

        if (index !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.8,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 85%",
              end: "top 8%",
              scrub: 0.5,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    // Changed initial class to bg-white and text-black
    <section ref={sectionRef} className="bg-white text-black py-32 transition-colors duration-300">
   {/* Header Section */}
<div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-24">
  
  <div className="overflow-hidden">
    <h2 className="reveal-line text-4xl md:text-5xl text-center tracking-tight mb-4 font-inter font-light">
      
      <span className="font-playfair italic text-red-600 font-normal">
        You&apos;ve
      </span>{" "}
      USED IT,
    </h2>
  </div>

  <div className="overflow-hidden">
    <h2 className="reveal-line text-4xl md:text-5xl text-center  tracking-tight font-inter font-light">
      
      <span className="font-playfair italic text-red-600 font-normal">
        You just
      </span>{" "}
      DON&apos;T KNOW IT
    </h2>
  </div>

  <div className="flex flex-col md:flex-row items-end justify-between mt-12 border-t border-black/10 pt-8">
    <p className="desc-text font-inter font-light text-gray-600 max-w-sm text-sm md:text-base leading-relaxed">
     From just an idea, to a high-precision system
    We design, build, and scale intelligent systems that turn data into decisions, automation into advantage, and complexity into clarity.
 </p>

    <button className="hidden md:block font-inter font-medium border border-black/30 px-8 py-3 rounded-md hover:bg-black hover:text-white transition-all text-sm">
      View All Work →
    </button>

  </div>
</div>

      {/* Cards Container */}
      <div ref={containerRef} className="relative flex flex-col items-center px-4 md:px-10">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`project-card w-full max-w-7xl h-[80vh] ${project.color} flex flex-col overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.3)] mb-[5vh]`}
          >
            <div className="w-full p-8 md:p-12 flex justify-between items-start border-b border-black/5">
              <div className="flex flex-col gap-2 text-black">
                 <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                   {project.title}
                 </h3>
                 <p className="font-medium max-w-md opacity-70">
                   {project.description}
                 </p>
              </div>
              <button className="text-black font-bold text-lg flex items-center gap-2 hover:translate-x-2 transition-transform">
                View Project <span>→</span>
              </button>
            </div>

            <div className="relative flex-1 w-full p-6 md:p-12 flex items-center justify-center">
               <div className="relative w-full h-full max-w-5xl bg-white/20 rounded-xl backdrop-blur-md border border-white/30 overflow-hidden flex items-center justify-center">
                  <span className="text-black/10 text-9xl font-bold uppercase select-none">
                    {project.title}
                  </span>
                  <div className="absolute bottom-6 right-6 flex gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-1 bg-black/5 rounded-full text-xs font-bold text-black/70 backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}