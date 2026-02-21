"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Prevent hydration error: Render nothing until the client is ready
  if (!isMounted) return null;

  return (
    <>
      {/* 1. The White Background Screen (Intro Only) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="fixed inset-0 bg-white z-[110] pointer-events-none"
      />

      <nav
        className={cn(
          "fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 py-4",
          scrolled
            ? "bg-white/30 backdrop-blur-xl py-3 shadow-none border-none"
            : "bg-transparent border-none"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* 2. Logo Animation: Center to Top */}
          <motion.div
            initial={{ 
              position: "fixed",
              top: "50vh",
              left: "50vw",
              x: "-50%",
              y: "-50%",
              scale: 2 
            }}
            animate={{ 
              position: "static", // Returns to navbar flow
              top: "0",
              left: "0",
              x: "0",
              y: "0",
              scale: 1 
            }}
            transition={{ 
              delay: 0.4, 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] 
            }}
            className="z-[120]" 
          >
            <Link href="/" className="text-xl font-bold tracking-tight text-black">
              Hooc<span className="text-blue-600">AI</span>
            </Link>
          </motion.div>

          {/* 3. NavLinks & Button: Fade in only after logo moves */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-black/60 hover:text-black transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <button className="group relative h-10 w-32 overflow-hidden bg-black rounded-full transition-transform active:scale-95">
              <div className="relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-10">
                <span className="flex h-10 w-full items-center justify-center text-[11px] font-bold text-white uppercase tracking-widest">
                  Get Started
                </span>
                <span className="flex h-10 w-full items-center justify-center text-[11px] font-bold text-white uppercase tracking-widest">
                  Get Started
                </span>
              </div>
            </button>
          </motion.div>

          {/* Mobile Toggle Toggle */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="md:hidden text-black" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-white flex flex-col p-6 gap-6 md:hidden h-screen border-none"
            >
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-2xl font-semibold pb-2" onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navigation;