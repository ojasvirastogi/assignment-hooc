"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { BookFreeConsultationButton } from "@/components/ui/BookFreeConsultation";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeInUp, staggerContainer, bubbleAnimation } from "@/lib/animations";
import {
  aiCaseStudies as caseStudies,
  aiTools,
  aiSteps as steps,
  aiExpertiseCards,
  aiStats,
} from "@/lib/services/aiDevelopmentConfig";



// Data is imported from @/lib/services/aiDevelopmentConfig

export default function AiDevelopment() {
  
  // --- EFFECT: Reset scroll to top on mount ---
  useEffect(() => {
    window.scrollTo(0, 0);
    // Disable automatic browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30 font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <motion.section 
        initial="hidden" 
        animate="visible" 
        variants={fadeInUp}
        className="pt-24 md:pt-32 pb-16 md:pb-20 px-6 text-center relative"
      >
        <span className="inline-block border border-white/10 bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-red-500 mb-6 uppercase tracking-[0.2em]">
          Services
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4">AI Development</h1>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-12 md:mb-16 tracking-wide">Transforming Raw Data into Predictive Intelligence</p>

        <div className="max-w-6xl mx-auto p-8 md:p-20 rounded-[30px] md:rounded-[40px] bg-[#0a0a0a] border border-red-900/20 backdrop-blur-xl relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
             <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
               <LayoutGrid size={28} />
             </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight mt-4 text-white">Advanced Solutions for the Modern Enterprise</h2>
          <p className="max-w-4xl mx-auto text-gray-400 leading-relaxed text-sm md:text-base mb-10">
            At HoocAI Solution, our AI services focus on building practical, scalable intelligence. We don’t just implement chatbots — we engineer deep-learning systems that automate complex tasks and drive exponential growth.
          </p>
          <BookFreeConsultationButton className="bg-white text-black px-8 md:px-10 py-3 rounded-full font-bold text-xs md:text-sm hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105" />
        </div>
      </motion.section>

      {/* 2. OUR AI EXPERTISE */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        className="py-16 md:py-24 px-6 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block border border-white/10 bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-red-500 mb-4 uppercase tracking-[0.2em]">
            Our AI Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">How We Deploy AI?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {aiExpertiseCards.map((card, i) => (
            <motion.div 
              variants={fadeInUp}
              key={i} className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-[#0a0a0a] border border-white/10 hover:border-red-500/40 transition-all duration-500 flex flex-col items-center text-center group"
            >
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 tracking-tight leading-tight text-white">{card.t}</h3>
              <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">{card.d}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. PROCESS STEPS */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="py-16 md:py-24 px-6 max-w-4xl mx-auto relative"
      >
        <div className="relative">
          <div className="absolute left-[24px] md:left-[39px] top-[40px] bottom-[40px] w-[1px] bg-red-500/40" />
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <motion.div 
                whileHover={{ x: 10 }}
                key={idx} className="flex gap-4 md:gap-8 items-center p-4 md:p-6 rounded-[20px] md:rounded-[24px] bg-[#0a1619] border border-cyan-900/30 group relative z-10"
              >
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-red-500 bg-[#0a1619] flex items-center justify-center text-white font-bold text-base md:text-lg">
                  {step.id}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold mb-1 text-sm md:text-lg text-white group-hover:text-red-300 transition-colors">{step.t}</h4>
                  <p className="text-[10px] md:text-sm text-gray-400 leading-relaxed">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. CASE STUDIES GRID */}
      <motion.section 
        id="portfolio"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        className="py-16 md:py-24 px-6 bg-black relative"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block border border-white/10 bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-red-500 mb-4 uppercase tracking-[0.2em]">Deployments</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">AI Case Studies</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            {caseStudies.map((project, i) => (
              <Link href="/portfolios" key={i} className="block">
                <motion.div 
                  variants={fadeInUp}
                  className="bg-[#0a0a0a] rounded-[30px] md:rounded-[40px] p-3 md:p-4 border border-white/5 group hover:border-red-500/30 transition-all duration-700 cursor-pointer"
                >
                  <div className="relative aspect-[16/10] rounded-[24px] md:rounded-[30px] overflow-hidden mb-6 bg-zinc-900">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      src={project.image} alt={project.title} className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="px-2 md:px-4 pb-4 text-left">
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[8px] md:text-[9px] font-bold border border-white/10 bg-white/5 text-gray-300 px-2 md:px-3 py-1 rounded-md uppercase">
                        {project.tag}
                      </span>
                    </div>
                    <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed line-clamp-2">{project.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <Link href="/portfolios" className="inline-flex bg-white text-black px-8 md:px-10 py-3 rounded-full text-[10px] md:text-xs font-bold items-center gap-2 hover:bg-red-600 hover:text-white transition-all group tracking-widest">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 5. AI TOOLS SECTION */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="py-12 md:py-20 flex flex-col items-center overflow-hidden"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 px-6 max-w-5xl">
          {aiTools.map((tool, idx) => (
            <motion.div 
              key={idx} 
              variants={bubbleAnimation}
              animate="animate"
              className="w-14 h-14 md:w-20 md:h-20 bg-[#111] rounded-xl md:rounded-2xl border border-white/5 flex items-center justify-center p-3 md:p-4 group cursor-pointer"
            >
              <img src={tool.img} alt={tool.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 6. STATS SECTION */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="py-16 md:py-24 px-6 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {aiStats.map((stat, i) => (
              <div key={i} className="p-6 md:p-10 rounded-[24px] md:rounded-[32px] bg-[#0a0a0a] border border-white/10 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 tracking-tighter text-white">
                    <AnimatedCounter end={stat.v} />+
                </div>
                <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.l}</div>
              </div>
            ))}
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-tight text-white">Engineering The Future<br/>With Neural Intelligence</h2>
          </div>
        </div>
      </motion.section>
      {/* CTA */}
       <motion.section className="py-24 px-6 max-w-6xl mx-auto">
              <div className="rounded-[40px] bg-gradient-to-b from-[#1a0a0a] to-black border border-red-900/30 p-16 md:p-24 text-center relative overflow-hidden">
                 <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">Lets Build Together.</h2>
                    <p className="max-w-2xl text-gray-400 mb-12 text-sm">We partner with ambitious teams to design and develop custom digital solutions that perform.</p>
                    <BookFreeConsultationButton className="bg-white text-black px-12 py-4 rounded-full font-bold text-sm hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-xl" />
                 </div>
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.1)_0,transparent_60%)] pointer-events-none" />
              </div>
            </motion.section>

    </main>
  );
}