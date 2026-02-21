"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, MessageSquare } from "lucide-react";

const FooterSection = () => {
  const currentYear = 2026; // Set as per the reference image

  return (
    <footer className="w-full bg-[#E32C21] text-white px-6 md:px-12 py-10 font-sans selection:bg-white selection:text-[#E32C21]">
      <div className="max-w-7xl mx-auto">
        
        {/* Newsletter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/20 pb-10 mb-20 gap-6">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight">
            Subscribe to our newsletter
          </h3>
          <div className="relative w-full md:w-[480px] group">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full bg-transparent border border-white/40 rounded-full px-6 py-4 outline-none focus:border-white transition-colors placeholder:text-white/60"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#E32C21] transition-all">
              Subscribe
            </button>
          </div>
        </div>

        {/* Hero Section: SAY HELLO */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-24 gap-12 lg:gap-0">
          <div className="flex flex-col gap-10 w-full lg:w-1/2">
            <h2 className="text-[12vw] md:text-[9vw] font-bold leading-[0.85] tracking-tighter flex items-center flex-wrap gap-x-4">
              SAY HELLO
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[0.9em] h-[0.9em] align-middle"
              >
                {/* Image 1: Glassy Donut Asset */}
                <img 
                  src="https://cdn.prod.website-files.com/6729ec93314d1a742cfeb184/6729ec93314d1a742cfeb21e_glass2.3%201.avif" 
                  alt="Animated O" 
                  className="w-full h-full object-contain"
                />
              </motion.span>
              !
            </h2>
            <button className="group flex items-center justify-center border border-white rounded-full w-fit px-10 py-5 text-xl font-medium hover:bg-white hover:text-[#E32C21] transition-all duration-300">
              Schedule a Call
              <span className="ml-4 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>

          {/* Image 2: Isometric Office Illustration */}
          
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-t border-white/10 pt-16">
          {/* Write to us */}
          <div className="flex flex-col gap-8">
            <h4 className="text-2xl font-bold">Write to us</h4>
            <div className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 mb-2">for business</p>
                <a href="mailto:sayhello@onething.design" className="text-xl hover:opacity-70 transition-opacity">sayhello@onething.design</a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 mb-2">for jobs</p>
                <a href="mailto:people@onething.design" className="text-xl hover:opacity-70 transition-opacity">people@onething.design</a>
              </div>
            </div>
          </div>

          {/* Join us at Locations */}
          <div className="flex flex-col gap-8 lg:col-span-3">
            <h4 className="text-2xl font-bold">Join us at</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <p className="font-black text-lg mb-3">Gurugram</p>
                <p className="text-base opacity-80 leading-relaxed font-medium">
                  Unit No. 7089 seventh floor, Good<br />earth business bay, sector 58,<br />Gurugram, Haryana - 122101
                </p>
              </div>
              <div>
                <p className="font-black text-lg mb-3">Bangalore</p>
                <p className="text-base opacity-80 leading-relaxed font-medium">
                  Padmavati Complex, #2, 3rd Floor,<br />Office no. 2280 Feet Road,<br />Koramangala, 8th Block, Bengaluru,<br />Karnataka - 560095
                </p>
              </div>
              <div>
                <p className="font-black text-lg mb-3">USA</p>
                <p className="text-base opacity-80 leading-relaxed font-medium">
                  447 Sutter St Ste 405, PMB1100 San<br />Francisco,<br />CA 94108
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-10 gap-8 text-[11px] uppercase tracking-[0.15em] font-bold">
          <div className="flex gap-8 items-center">
            <Instagram size={20} className="cursor-pointer hover:opacity-70 transition-opacity" />
            <Linkedin size={20} className="cursor-pointer hover:opacity-70 transition-opacity" />
            <MessageSquare size={20} className="cursor-pointer hover:opacity-70 transition-opacity" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 opacity-100">
            <a href="#" className="hover:opacity-60 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Terms and Conditions</a>
            <span className="italic">©{currentYear} ONETHING. ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;