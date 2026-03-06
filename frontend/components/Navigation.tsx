"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/colors";
import { navLinks } from "@/lib/sectionData";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const isWhiteText = scrolled || pathname !== "/";
  const textColor = isWhiteText ? "text-white" : "text-black";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 py-4",
          scrolled
            ? "bg-black/20 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              "text-2xl font-bold transition-colors duration-500 font-inter",
              textColor
            )}
          >
            Hooc<span className="text-red-600 px-1">AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.dropdown && pathname.startsWith(link.href));

              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => link.dropdown && setShowServices(true)}
                  onMouseLeave={() => link.dropdown && setShowServices(false)}
                >

                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault();
                      }
                    }}
                    className={cn(
                      "text-sm font-medium transition-colors duration-500 font-inter flex items-center gap-1",
                      textColor,
                      isActive
                        ? "opacity-100"
                        : "opacity-70 hover:opacity-100"
                    )}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          showServices && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5",
                        isWhiteText ? "bg-white" : "bg-black"
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Dropdown */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {showServices && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-52 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2"
                        >
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-inter"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}

            <Link href="/contact-us">
              <button
                className={cn(
                  "h-10 w-36 rounded-full transition-all duration-500 text-[10px] font-bold uppercase tracking-widest font-inter",
                  isWhiteText
                    ? "bg-white text-red-600"
                    : "bg-red-600 text-white"
                )}
              >
                Get in Touch
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "md:hidden transition-colors z-[110] relative",
              textColor
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={`fixed inset-0 z-[95] flex flex-col p-8 pt-32 overflow-y-auto bg-gradient-to-br via-black to-black`}
            style={{ backgroundImage: `linear-gradient(to bottom right, ${colors.primaryGlow}, black, black)` }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-4">
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault();
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className={cn(
                      "text-4xl font-bold font-inter",
                      pathname === link.href || (link.dropdown && pathname.startsWith("/services"))
                        ? "text-white"
                        : "text-white/60"
                    )}
                  >
                    {link.name}
                  </Link>

                  {link.dropdown && (
                    <div className="flex flex-col gap-3 pl-4 border-l border-white/20">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "text-lg font-medium font-inter",
                            pathname === sub.href
                              ? "text-red-400"
                              : "text-white/40"
                          )}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;