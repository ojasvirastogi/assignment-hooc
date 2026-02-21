"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    title: "INDIai",
    description: "Translating the user experience of a reputed financial-service provider.",
    color: "bg-[#D6B3FF]",
    tags: ["Web Design", "Responsive"],
    image: "/project1.png",
  },
  {
    title: "RUMBLE",
    description: "Social gaming platform for one of the largest gaming communities.",
    color: "bg-[#4c3592]",
    tags: ["App Design", "UI UX"],
    image: "/project2.png",
  },
  {
    title: "PLAYVERSE",
    description: "Gaming ecosystem focused on the next digital era.",
    color: "bg-[#2A2A2A]",
    tags: ["Branding", "Web3"],
    image: "/project3.png",
  },
  {
    title: "PUBG",
    description: "Gaming ecosystem focused on the next digital era.",
    color: "bg-[#2A2A2A]",
    tags: ["Branding", "Web3"],
    image: "/project3.png",
  },
];

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
          start: "top 60%", // Starts transition when section is 60% in view
          end: "top 20%",   // Ends when header reaches near top
          scrub: true,
        },
      });

      // --- 2. Text Color Transition ---
      gsap.to([".reveal-line", ".desc-text"], {
        color: "#ffffff",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
        },
      });

      // --- 3. Heading Upward Animation ---
      const lines = gsap.utils.toArray<HTMLElement>(".reveal-line");
      gsap.from(lines, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // --- 4. Project Stacking Logic ---
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
        });

        if (index !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 80%",
              end: "top 10%",
              scrub: true,
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
          <h2 className="reveal-line text-4xl md:text-5xl font-bold text-center italic tracking-tight mb-2">
            <span className="text-red-600">You have</span> USED IT,
          </h2>
        </div>
        <div className="overflow-hidden">
          <h2 className="reveal-line text-5xl md:text-7xl font-bold text-center uppercase tracking-tighter">
            You just <span className="font-light italic">DONT KNOW IT</span>
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-end justify-between mt-12 border-t border-black/10 pt-8">
            <p className="desc-text text-gray-600 max-w-sm text-sm md:text-base leading-relaxed">
              From a childs first smartwatch, to high-precision defence systems,
              we are a UI UX design company focused on the next digital era.
            </p>
            <button className="hidden md:block border border-black/30 px-8 py-3 rounded-md hover:bg-black hover:text-white transition-all text-sm font-medium">
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