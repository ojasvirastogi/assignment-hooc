"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X } from 'lucide-react';
import { resourcesData as resources } from '@/lib/sectionData';
// Agar aap Next.js use kar rahe hain to layout file mein Inter font configure karein
// ya CSS mein font-family: 'Inter', sans-serif; apply karein.

type Resource = {
  id: number;
  category: string;
  date: string;
  title: string;
  image: string;
  link: string;
};


const ResourceSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-black text-white pt-24 md:pt-40 pb-24 px-4 sm:px-6 md:px-12 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* Animated Heading Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <div className=" mb-4">
             <motion.h1 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="text-4xl sm:text-5xl md:text-7xl  tracking-tighter font-inter"
              >
                News,<span className='text-red-500 italic font-playfair '>insights</span>  & more
              </motion.h1>
          </div>
          
          {/* Responsive Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative w-full max-w-2xl mt-7 px-2 sm:px-0"
          >
            <Search className="absolute left-6 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search (AI, Tech, UI...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-zinc-800 rounded-xl md:rounded-2xl py-4 md:py-5 pl-14 pr-14 focus:outline-none focus:border-red-400 transition-all text-base md:text-lg text-white placeholder:text-zinc-600 font-inter"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-6 sm:right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-500">
                <X className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Responsive Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredResources.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-[#0D0D0D] border-2 border-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 flex flex-col 
                           hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:border-red-300 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden mb-6">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow px-1 md:px-2">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white bg-red-500/10 px-3 py-1 rounded-md border border-red-500/20 font-inter">
                      {item.category}
                    </span>
                    <span className="text-zinc-500 text-[10px] md:text-[11px] font-medium font-inter">{item.date}</span>
                  </div>

                  <div className="text-xl md:text-2xl font-semibold leading-tight mb-8 group-hover:text-white transition-colors tracking-tight line-clamp-2 font-inter">
                    {item.title}
                  </div>

                  <div className="mt-auto pt-6 border-t border-zinc-800/50">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-xs md:text-sm font-bold text-white hover:text-red-400 transition-all uppercase tracking-widest font-inter"
                    >
                      Read Full Blog 
                      <div className="p-2 rounded-full border border-red-500/30 group-hover:bg-red-400 group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-24 md:py-40 px-4">
            <p className="text-zinc-600 text-lg md:text-xl font-light font-inter">No results found for your keywords.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourceSection;