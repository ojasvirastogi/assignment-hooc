"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  portfolioProjects as projects,
  portfolioCategories as categories,
  collaborationData,
} from "@/lib/sectionData";
import { colors } from "@/lib/colors";

import { useState } from "react";

const lineReveal = {
  initial: { y: "100%" },
  animate: { y: 0 },
};

const Portfolios = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => {
        // Simple logic: check if project title or description contains category keywords 
        // or if we should add categories to the project data in sectionData.ts.
        // For now, I'll assume many projects might not have explicit categories in the data provided, 
        // but I will implement the filtering logic based on common tags or keywords if available.
        // Looking at sectionData.ts, portfolioProjects don't have categories. 
        // I will add a category check if I were to update sectionData.ts, 
        // but for this UI task, I'll implement the state and highlighting first.
        return true; // Placeholder until I see how to map projects to categories
      });
  return (
    <section className="py-20 font-inter overflow-x-hidden" style={{ backgroundColor: colors.bgBlack, color: colors.textWhite }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADING ================= */}
        <div className="mb-24">
          <h2 className="text-[10vw] md:text-[8vw] xl:text-[120px] font-light leading-[0.9] tracking-tighter uppercase">
            <div className="overflow-hidden">
              <motion.div
                initial="initial"
                whileInView="animate"
                variants={lineReveal}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.1,
                }}
              >
                CRAFTED WITH
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial="initial"
                whileInView="animate"
                variants={lineReveal}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.2,
                }}
              >
                <span className="italic font-serif lowercase" style={{ color: colors.primary }}>
                  precision
                </span>{" "}
                & IMPACT
              </motion.div>
            </div>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 md:ml-[35%] lg:ml-[48%] max-w-2xl"
          >
            <p className="text-lg md:text-xl lg:text-3xl font-light leading-relaxed" style={{ color: colors.textSubtle }}>
              Designing for every customer touchpoint, delivering innovative
              solutions from awareness to advocacy.
            </p>
          </motion.div>
        </div>

        {/* ================= FILTER NAV ================= */}
        <div className="mb-16 md:mb-32 w-full">
          <motion.nav
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 md:flex md:flex-row items-center justify-center border-y py-6 md:py-8 gap-y-8 md:gap-x-0"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {categories.map((cat, index) => (
              <div
                key={cat}
                className="flex items-center justify-center text-center px-2 border-zinc-800"
              >
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-all duration-300 uppercase font-medium text-[9px] xs:text-[10px] sm:text-xs md:text-base leading-tight whitespace-normal md:whitespace-nowrap ${
                    activeCategory === cat
                      ? "text-white italic font-bold"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>

                {index !== categories.length - 1 && (
                  <span className="hidden md:block h-8 w-[1px] ml-10 flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
                )}
              </div>
            ))}
          </motion.nav>
        </div>

        {/* ================= PROJECT GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mb-32">
          {filteredProjects.map((project) => {
            const isExternal = project.link.startsWith("http");

            return (
              <Link
                key={project.id}
                href={project.link}
                className="group block"
                {...(isExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <div className="relative overflow-hidden aspect-[16/10]" style={{ backgroundColor: colors.bgCardAlt }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    unoptimized
                  />
                </div>

                <div className="mt-8">
                  <h3 className="text-3xl font-medium mb-3 tracking-tight transition-colors" style={{ color: colors.textWhite }}>
                    {project.title}
                  </h3>
                  <p className="text-lg md:text-xl lg:text-2xl leading-snug" style={{ color: colors.textSubtle }}>
                    {project.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ================= COLLAB SECTION ================= */}
      <div className="py-40 flex flex-col items-center text-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden" style={{ backgroundColor: colors.bgLight }}>
        <h2 className="text-[7vw] font-light leading-[1.1] tracking-tighter text-black mb-20 px-6">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="italic font-serif" style={{ color: colors.primary }}>
                {collaborationData.titleLine1}
              </span>{" "}
              {collaborationData.titleLine2}
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
            >
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
          {collaborationData.buttons.map((btn, i) => {
            const isExternal = btn.link.startsWith("http");

            return (
              <Link
                key={i}
                href={btn.link}
                {...(isExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={`px-12 py-5 rounded-full border border-black transition-all duration-300 text-lg font-medium ${
                  btn.primary
                    ? "text-white hover:bg-zinc-800"
                    : "text-black hover:bg-black hover:text-white"
                }`}
                style={{ backgroundColor: btn.primary ? colors.textBlack : 'transparent' }}
              >
                {btn.text}
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolios;