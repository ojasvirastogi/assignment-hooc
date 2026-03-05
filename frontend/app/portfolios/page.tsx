"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  portfolioProjects as projects,
  portfolioCategories as categories,
  collaborationData,
} from "@/lib/sectionData";

const lineReveal = {
  initial: { y: "100%" },
  animate: { y: 0 },
};

const Portfolios = () => {
  return (
    <section className="bg-black text-white py-20 font-inter overflow-x-hidden">
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
                <span className="italic font-serif lowercase text-red-500">
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
            <p className="text-zinc-400 text-lg md:text-xl lg:text-3xl font-light leading-relaxed">
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
            className="grid grid-cols-3 md:flex md:flex-row items-center justify-center text-zinc-500 border-y border-zinc-800/50 py-6 md:py-8 gap-y-8 md:gap-x-0"
          >
            {categories.map((cat, index) => (
              <div
                key={cat}
                className="flex items-center justify-center text-center px-2 border-zinc-800"
              >
                <button
                  className={`transition-colors uppercase font-medium text-[9px] xs:text-[10px] sm:text-xs md:text-base leading-tight whitespace-normal md:whitespace-nowrap ${
                    index === 0
                      ? "text-white italic font-bold"
                      : "hover:text-white"
                  }`}
                >
                  {cat}
                </button>

                {index !== categories.length - 1 && (
                  <span className="hidden md:block h-8 w-[1px] bg-zinc-800 ml-10 flex-shrink-0" />
                )}
              </div>
            ))}
          </motion.nav>
        </div>

        {/* ================= PROJECT GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mb-32">
          {projects.map((project) => {
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
                <div className="relative overflow-hidden bg-zinc-900 aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    unoptimized
                  />
                </div>

                <div className="mt-8">
                  <h3 className="text-3xl font-medium mb-3 tracking-tight group-hover:text-red-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-lg md:text-xl lg:text-2xl leading-snug">
                    {project.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ================= COLLAB SECTION ================= */}
      <div className="py-40 flex flex-col items-center text-center bg-[#F1F1F1] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <h2 className="text-[7vw] font-light leading-[1.1] tracking-tighter text-black mb-20 px-6">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="italic font-serif text-red-600">
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
                    ? "bg-black text-white hover:bg-zinc-800"
                    : "text-black hover:bg-black hover:text-white"
                }`}
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