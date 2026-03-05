"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MoveLeft } from 'lucide-react';
import { motion, useMotionValue, animate, useMotionValueEvent } from 'framer-motion';
import { industryPageData as industries, collaborationData } from '@/lib/sectionData';

// --- Types & Data ---
interface Industry {
  id: string; title: string; description: string;
  projects: number; clients: number; rating: number;
}



// Refined reveal animation for lines
const lineReveal = {
  initial: { y: "100%" },
  animate: { y: 0 },
  transition: { duration: 1, ease: [0.33, 1, 0.68, 1] }
};

const Counter = ({ value, duration = 2, isDecimal = false }: { value: number, duration?: number, isDecimal?: boolean }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(isDecimal ? "0.0" : "0");

  useEffect(() => {
    const controls = animate(count, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [count, value, duration]);

  useMotionValueEvent(count, "change", (latest) => {
    setDisplayValue(isDecimal ? latest.toFixed(1) : Math.round(latest).toString());
  });

  return <span>{displayValue}</span>;
};

const IndustryRow = ({ industry, index }: { industry: Industry, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="group border-t border-zinc-800 py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-all duration-300 hover:bg-zinc-900/40 px-4 md:px-0 font-inter"
  >
    <div className="md:col-span-5">
      <h3 className="text-xl md:text-2xl font-medium text-white mb-3 tracking-tight group-hover:text-red-500 transition-colors uppercase">{industry.title}</h3>
      <p className="text-zinc-500 text-sm md:text-base max-w-sm leading-relaxed">{industry.description}</p>
    </div>
    <div className="md:col-span-4 grid grid-cols-3 gap-2 text-center md:text-left">
      <div><div className="text-2xl md:text-4xl text-white font-light"><Counter value={industry.projects} /></div><div className="text-[10px] uppercase tracking-widest text-zinc-600 mt-1 font-medium">Projects</div></div>
      <div><div className="text-2xl md:text-4xl text-white font-light"><Counter value={industry.clients} /></div><div className="text-[10px] uppercase tracking-widest text-zinc-600 mt-1 font-medium">Clients</div></div>
      <div><div className="text-2xl md:text-4xl text-white font-light"><Counter value={industry.rating} isDecimal={true} /></div><div className="text-[10px] uppercase tracking-widest text-zinc-600 mt-1 font-medium">Clutch Rating</div></div>
    </div>
    <div className="md:col-span-3 flex md:justify-end">
      <Link href="/portfolios" className="flex items-center gap-2 text-red-600 font-medium text-sm group/btn">
        <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-red-600 after:transition-all group-hover/btn:after:w-full uppercase tracking-wider">Know more</span>
        <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
      </Link>
    </div>
  </motion.div>
);

export default function IndustryPage() {
  return (
    <section className="bg-black text-white pt-20 pb-0 selection:bg-red-500/30 font-inter overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <nav className="flex items-center gap-2 text-zinc-500 text-xs md:text-sm mb-16 uppercase tracking-widest font-medium">
          <Link href="/" className="hover:text-white flex items-center gap-2 transition-colors"><MoveLeft size={14} /> Home</Link>
          <span>/</span> <span className="text-red-500 italic font-serif lowercase">Industries</span>
        </nav>

        <div className=" md:flex-row justify-between items-start md:items-end mb-20 gap-10">
          <h2 className="text-[10vw] md:text-[8vw] xl:text-[120px] font-light leading-[0.9] tracking-tighter uppercase font-inter">
  {/* First Line: OUR EXPERTISE */}
  <div className="overflow-hidden">
    <motion.div 
      initial="initial" 
      animate="animate" 
      variants={lineReveal} 
      transition={{ delay: 0.1, duration: 1 }}
    >
      OUR EXPERTISE
    </motion.div>
  </div>

  {/* Second Line: BEYOND boundaries */}
  <div className="overflow-hidden">
    <motion.div 
      initial="initial" 
      animate="animate" 
      variants={lineReveal} 
      transition={{ delay: 0.2, duration: 1 }}
    >
      BEYOND <span className="italic font-serif lowercase text-red-500">boundaries</span>
    </motion.div>
  </div>
</h2>
          
     <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
       
        className="mt-6 md:ml-[35%] lg:ml-[48%] max-w-3xl" 
      >
        <p className="text-zinc-400 text-medium md:text-xl lg:text-3xl font-light leading-relaxed font-inter">
          Discover our versatile expertise, delivering <br className="hidden md:block" />
          innovative design solutions for every <br className="hidden md:block" /> 
          business need.
        </p>
      </motion.div>
        </div>

        <div className="flex flex-col mb-0">
          {industries.map((item, index) => (
            <IndustryRow key={item.id} industry={item} index={index} />
          ))}
          <div className="border-t border-zinc-800 w-full" />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 flex flex-col items-center text-center bg-[#F1F1F1] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] font-inter overflow-hidden">
        <h2 className="text-[6.5vw] font-light leading-[1.1] tracking-tighter text-black  mb-20">
          <div className="overflow-hidden">
            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                <span className="italic font-serif text-red-600 ">{collaborationData.titleLine1}</span> {collaborationData.titleLine2}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }}>
              {collaborationData.titleLine3}
            </motion.div>
          </div>
        </h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-8"
        >
          {collaborationData.buttons.map((btn, i) => (
            <Link key={i} href={btn.link} className={`px-10 py-5 rounded-full transition-all duration-300 text-base font-medium border border-black ${btn.primary ? 'bg-black text-white hover:bg-zinc-800' : 'text-black hover:bg-zinc-900 hover:text-white'}`}>
              {btn.text}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}