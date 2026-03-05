"use client";

import React, { useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookFreeConsultationButton } from '@/components/ui/BookFreeConsultation';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { fadeInUp, staggerContainer, bubbleAnimation } from '@/lib/animations';
import {
  seoCaseStudies as caseStudies,
  seoTools,
  seoSteps as steps,
  seoWayOfWorkingCards,
  seoStats,
} from '@/lib/services/seoConfig';



// Data is imported from @/lib/services/seoConfig

export default function UiUxDesign() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30 font-sans overflow-x-hidden scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="pt-32 pb-20 px-6 text-center relative"
      >
        <span className="inline-block border border-white/10 bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-red-500 mb-6 uppercase tracking-[0.2em]">
          Services
        </span>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4">SEO</h1>
        <p className="text-gray-400 text-sm md:text-base mb-16 tracking-wide">Dominating Search Results to Grow Your Business</p>

        <div className="max-w-6xl mx-auto p-12 md:p-20 rounded-[40px] bg-[#0a0a0a] border border-red-900/20 backdrop-blur-xl relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
             <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
               <LayoutGrid size={28} />
             </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight mt-4 text-white">Visibility That Converts Into Revenue</h2>
          <p className="max-w-4xl mx-auto text-gray-400 leading-relaxed text-sm md:text-base mb-10">
At HoocAI Solution, we view SEO as a long-term investment rather than a quick fix. We focus on White Hat SEO techniques that protect your site from algorithm updates while consistently improving your rankings. By understanding user intent and search behavior, we bridge the gap between your brand and the people searching for your solutions.          </p>
          <BookFreeConsultationButton className="bg-white text-black px-10 py-3 rounded-full font-bold text-sm hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105" />
        </div>
      </motion.section>

      {/* 2. HOW WE HELP CLIENTS */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        className="py-24 px-6 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="inline-block border border-white/10 bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-red-500 mb-4 uppercase tracking-[0.2em]">
            Our Way of Working
          </span>
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-white">How We Help Clients?</h2>
          <p className="text-gray-400 text-sm">Our designs focus on results, not just visuals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {seoWayOfWorkingCards.map((card, i) => (
            <motion.div 
              variants={fadeInUp}
              key={i} className="p-8 rounded-[32px] bg-[#0a0a0a] border border-white/10 hover:border-red-500/40 transition-all duration-500 flex flex-col items-center text-center group hover:shadow-[0_0_25px_rgba(239,68,68,0.1)]"
            >
              <h3 className="text-lg font-bold mb-4 tracking-tight leading-tight text-white">{card.t}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{card.d}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. PROCESS STEPS - UPDATED TO MATCH REFERENCE IMAGE CONNECTION */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="py-24 px-6 max-w-4xl mx-auto relative"
      >
        <div className="relative">
          {/* THE VERTICAL CONNECTING LINE */}
          <div 
            className="absolute left-[39px] top-[40px] bottom-[40px] w-[1px] bg-red-500/40 hidden md:block" 
            style={{ zIndex: 0 }}
          />

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <motion.div 
                whileHover={{ x: 10 }}
                key={idx} className="flex gap-8 items-center p-6 rounded-[24px] bg-[#0a1619] border border-cyan-900/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 group relative z-10"
              >
                {/* Number Circle Badge with glow */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-red-500 bg-[#0a1619] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-transform group-hover:scale-110">
                  {step.id}
                </div>

                <div className="flex-1 text-left">
                  <h4 className="font-bold mb-1 text-lg text-white group-hover:text-red-300 transition-colors">{step.t}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. CASE STUDIES GRID SECTION */}
      <motion.section 
        id="portfolio"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        className="py-24 px-6 bg-black relative"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block border border-white/10 bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-red-500 mb-4 uppercase tracking-[0.2em]">Case Studies</span>
            <h2 className="text-5xl font-bold tracking-tight mb-4 text-white text-center">Explore Our Case Studies</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed text-center">Browse through our portfolio showcasing innovative web design projects.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {caseStudies.map((project, i) => (
              <motion.div 
                variants={fadeInUp}
                key={i} className="bg-[#0a0a0a] rounded-[40px] p-4 border border-white/5 group hover:border-red-500/30 transition-all duration-700"
              >
                <div className="relative aspect-[1.5/1] rounded-[30px] overflow-hidden mb-8 bg-zinc-900">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={project.image} alt={project.title} className="w-full h-full object-cover" 
                  />
                </div>
                <div className="px-4 pb-6 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
                      {project.title} — {project.category}
                    </h3>
                    <span className="text-[9px] font-bold border border-white/10 bg-white/5 text-gray-300 px-3 py-1 rounded-md uppercase tracking-widest">
                      {project.tag}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            {/* Redirects to Portfolio Anchor Above */}
            <a href="/portfolios" className="inline-flex bg-white text-black px-10 py-3 rounded-full text-xs font-bold items-center gap-2 hover:bg-red-600 hover:text-white transition-all group tracking-widest transform hover:scale-105">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* 5. DESIGN TOOLS BUBBLE ANIMATION */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="py-20 flex flex-col items-center overflow-hidden"
      >
        <div className="flex items-center gap-4 mb-14">
           <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-red-500/30" />
           <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold tracking-[0.3em] uppercase">
             <ChevronLeft className="text-red-500" size={12} /> Tools we use <ChevronRight className="text-red-500" size={12} />
           </div>
           <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-red-500/30" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-6 max-w-5xl">
          {seoTools.map((tool, idx) => (
            <motion.div 
              key={idx} 
              variants={bubbleAnimation}
              animate="animate"
              className="w-16 h-16 md:w-20 md:h-20 bg-[#111] rounded-2xl border border-white/5 flex items-center justify-center p-4 shadow-2xl hover:border-red-500/50 transition-all cursor-pointer group"
            >
              <img src={tool.img} alt={tool.name} className="w-full h-full object-contain filter group-hover:scale-110 transition-transform" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 6. CLIENT SUCCESS STATS */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            {seoStats.map((stat, i) => (
              <div key={i} className="p-10 rounded-[32px] bg-[#0a0a0a] border border-white/10 text-center group hover:border-red-500/30 transition-all">
                <div className="text-4xl font-bold mb-2 tracking-tighter text-white">
                    <AnimatedCounter end={stat.v} />+
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold text-center">{stat.l}</div>
              </div>
            ))}
          </div>
          <div className="text-left">
            <span className="inline-block border border-red-900/50 bg-red-950/20 text-red-500 px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest mb-6">Success Rate</span>
            <h2 className="text-5xl font-bold tracking-tighter mb-8 leading-[1.1] text-white">Delivering Measurable<br/>Success for Our Clients</h2>
          </div>
        </div>
      </motion.section>

      {/* 7. FINAL CTA */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="py-24 px-6 max-w-6xl mx-auto"
      >
        <div className="rounded-[40px] bg-gradient-to-b from-[#1a0a0a] to-black border border-red-900/30 overflow-hidden relative p-16 md:p-24 text-center">
           <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 mb-10 bg-white text-black flex items-center justify-center rounded-2xl font-black text-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">H</div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">Lets Build Together.</h2>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-gray-400 mb-10 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]" /> Software Partner
              </div>
              <p className="max-w-2xl text-gray-400 mb-12 text-sm md:text-base leading-relaxed text-center">
                We partner with ambitious teams to design and develop custom digital solutions that perform. From idea to launch, we ensure speed, clarity, and quality.
              </p>
              <BookFreeConsultationButton className="bg-white text-black px-12 py-4 rounded-full font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-xl tracking-widest transform hover:scale-105" />
           </div>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.1)_0,transparent_60%)] pointer-events-none" />
        </div>
      </motion.section>

    </main>
  );
}