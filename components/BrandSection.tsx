"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    title: "Digital Products & Websites",
    description: "User Experience of your product is the only key differentiator that cannot be replicated...",
    image: "/logos/digital-prod.png" 
  },
  {
    title: "Branding",
    description: "We build new age digital first brands that makes you stand out by invoking purpose...",
    image: "/logos/branding.png"
  },
  {
    title: "Research & Strategy",
    description: "Data and Insights are backbone of building successful products...",
    image: "/logos/research.png"
  },
  {
    title: "Innovation & Tech", // Added 4th card
    description: "Scaling robust solutions with future-ready tech stacks for business growth.",
    image: "/logos/innovation.png"
  },{
    title: "Digital Products & Websites",
    description: "User Experience of your product is the only key differentiator that cannot be replicated...",
    image: "/logos/digital-prod.png" 
  },
  {
    title: "Branding",
    description: "We build new age digital first brands that makes you stand out by invoking purpose...",
    image: "/logos/branding.png"
  },
  {
    title: "Research & Strategy",
    description: "Data and Insights are backbone of building successful products...",
    image: "/logos/research.png"
  },
  {
    title: "Innovation & Tech", // Added 4th card
    description: "Scaling robust solutions with future-ready tech stacks for business growth.",
    image: "/logos/innovation.png"
  }
];

export default function BrandSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  /**
   * For 4 cards:
   * 1. We map movement from 0 to 0.9. This ensures the cards STOP moving
   * just before the page starts scrolling to the next section.
   * 2. "-55%" is usually the sweet spot for 4 cards (450px wide) to 
   * ensure the last card is fully centered/visible on screen.
   */
  const x = useTransform(scrollYProgress, [0, 0.9], ["0%", "-55%"]);

  return (
    // Lowered h-[250vh] for a tighter, more responsive feel
    <section ref={targetRef} className="relative h-[250vh] bg-[#0A0A0A]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Section Heading */}
        <div className="max-w-7xl mx-auto px-10 mb-12 w-full">
           <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-white leading-tight uppercase"
           >
            <span className="italic text-red-600 serif font-normal">We</span> MAKE BRAND, <br />
            PRODUCT, AND <br />
            TECH INTERSECT
          </motion.h2>
        </div>

        {/* Horizontal Container */}
        <motion.div style={{ x }} className="flex gap-8 px-10">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[450px] w-[350px] md:w-[450px] flex-shrink-0 bg-[#111111] border border-white/5 p-10 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-colors"
            >
              <div>
                <h3 className="text-3xl text-white font-medium mb-6 leading-tight">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
              
              <div className="mt-auto relative h-40 flex items-center justify-center">
                 <div className="absolute w-32 h-32 bg-purple-600/10 rounded-full blur-[60px] group-hover:bg-purple-600/20 transition-all duration-700" />
                 <img src={card.image} alt={card.title} className="relative z-10 max-h-32 object-contain" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}