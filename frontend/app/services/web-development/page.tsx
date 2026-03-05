"use client";

import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookFreeConsultationButton } from '@/components/ui/BookFreeConsultation';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { fadeInUp, staggerContainer, bubbleAnimation } from '@/lib/animations';
import {
  webCaseStudies as caseStudies,
  webDesignTools as designTools,
  webSteps as steps,
  webWayOfWorkingCards,
  webStats,
} from '@/lib/services/webDevelopmentConfig';



// Data is imported from @/lib/services/webDevelopmentConfig


// --- MAIN WEB DEVELOPMENT PAGE ---
export default function WebDevelopment() {

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30 font-sans overflow-x-hidden scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="pt-32 pb-20 px-6 text-center">
        <span className="inline-block border border-white/10 bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-red-500 mb-6 uppercase tracking-[0.2em]">Services</span>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4">Web Development</h1>
        <p className="text-gray-400 text-sm md:text-base mb-16 tracking-wide">Building High-Performance Websites for the Modern Web</p>

        <div className="max-w-6xl mx-auto p-12 md:p-20 rounded-[40px] bg-[#0a0a0a] border border-red-900/20 backdrop-blur-xl relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
             <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]"><LayoutGrid size={28} /></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-4">Scalable Code, Reliable Solutions</h2>
          <p className="max-w-4xl mx-auto text-gray-400 leading-relaxed text-sm md:text-base mb-10">
            At HoocAi Solution, we don&apos;t just write code; we build digital foundations. Our development team focuses on creating high-speed websites that can handle growth while ensuring security and speed.
          </p>
          <BookFreeConsultationButton />
        </div>
      </motion.section>

      {/* 2. HOW WE HELP (Service Cards from UI-UX) */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block border border-white/10 bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-red-500 mb-4 uppercase tracking-[0.2em]">Our Way of Working</span>
          <h2 className="text-5xl font-bold tracking-tight mb-4">How We Help Clients?</h2>
          <p className="text-gray-400 text-sm">Our designs focus on results, not just visuals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {webWayOfWorkingCards.map((card, i) => (
            <motion.div variants={fadeInUp} key={i} className="p-8 rounded-[32px] bg-[#0a0a0a] border border-white/10 hover:border-red-500/40 transition-all duration-500 flex flex-col items-center text-center group hover:shadow-[0_0_25px_rgba(239,68,68,0.1)]">
              <h3 className="text-lg font-bold mb-4 text-white tracking-tight">{card.t}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{card.d}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. PROCESS STEPS (With Connecting Line) */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-24 px-6 max-w-4xl mx-auto relative">
        <div className="relative">
          <div className="absolute left-[39px] top-[40px] bottom-[40px] w-[1px] bg-red-500/40 hidden md:block" />
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <motion.div whileHover={{ x: 10 }} key={idx} className="flex gap-8 items-center p-6 rounded-[24px] bg-[#0a1619] border border-red-900/20 group relative z-10 transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-red-500 bg-[#0a1619] flex items-center justify-center font-bold text-white transition-transform group-hover:scale-110">{step.id}</div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">{step.t}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. CASE STUDIES */}
      <motion.section id="portfolio" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block border border-white/10 bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-red-500 mb-4 uppercase tracking-[0.2em]">Case Studies</span>
          <h2 className="text-5xl font-bold tracking-tight mb-16">Explore Our Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            {caseStudies.map((project, i) => (
              <motion.div key={i} whileHover={{y: -10}} className="bg-[#0a0a0a] rounded-[40px] p-4 border border-white/5 group hover:border-red-500/30 transition-all">
                <div className="relative aspect-[1.5/1] rounded-[30px] overflow-hidden mb-8">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="px-4 pb-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">{project.title} — {project.category}</h3>
                    <p className="text-gray-500 text-xs mt-2">{project.desc}</p>
                  </div>
                  <span className="text-[9px] font-bold border border-white/10 bg-white/5 px-3 py-1 rounded uppercase tracking-widest">{project.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. DESIGN TOOLS */}
      <section className="py-20 flex flex-col items-center">
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-14">
          <ChevronLeft className="text-red-500" size={12} /> Tools we use <ChevronRight className="text-red-500" size={12} />
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-6 max-w-5xl">
          {designTools.map((tool, idx) => (
            <motion.div key={idx} variants={bubbleAnimation} animate="animate" className="w-16 h-16 md:w-20 md:h-20 bg-[#111] rounded-2xl border border-white/5 flex items-center justify-center p-4 shadow-2xl hover:border-red-500/50 transition-all group cursor-pointer">
              <img src={tool.img} alt={tool.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. STATS */}
      <motion.section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            {webStats.map((stat, i) => (
              <div key={i} className="p-10 rounded-[32px] bg-[#0a0a0a] border border-white/10 text-center hover:border-red-500/30 transition-all">
                <div className="text-4xl font-bold mb-2 text-white"><AnimatedCounter end={stat.v} />+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.l}</div>
              </div>
            ))}
          </div>
          <div className="text-left">
            <span className="inline-block border border-red-900/50 bg-red-950/20 text-red-500 px-3 py-1 rounded-md text-[9px] font-bold uppercase mb-6 tracking-widest">Success Rate</span>
            <h2 className="text-5xl font-bold tracking-tighter text-white">Delivering Measurable Success for Our Clients.</h2>
          </div>
        </div>
      </motion.section>

      {/* 7. FINAL CTA */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-24 px-6 max-w-6xl mx-auto">
        <div className="rounded-[40px] bg-gradient-to-b from-[#1a0a0a] to-black border border-red-900/30 p-16 md:p-24 text-center relative overflow-hidden">
           <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">Let&apos;s Build Together.</h2>
              <p className="max-w-2xl text-gray-400 mb-12 text-sm leading-relaxed leading-relaxed">We partner with ambitious teams to design and develop custom digital solutions that perform.</p>
              <BookFreeConsultationButton className="bg-white text-black px-12 py-4 rounded-full font-bold text-sm hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-xl tracking-widest uppercase" />
           </div>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.1)_0,transparent_60%)] pointer-events-none" />
        </div>
      </motion.section>


    </main>
  );
}