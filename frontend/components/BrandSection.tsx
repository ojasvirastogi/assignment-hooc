"use client";

import { motion, useTransform, useScroll, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { colors } from "@/lib/colors";
import { brandCards as cards } from "@/lib/sectionData";

// ─── Mobile Swipe Carousel ────────────────────────────────────────────────────
function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const dragStartX = useRef(0);

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, cards.length - 1));

  return (
    <div className="w-full px-6 pb-10">
      {/* Cards */}
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex"
          animate={{ x: `${-current * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={(_, info) => { dragStartX.current = info.point.x; }}
          onDragEnd={(_, info) => {
            const diff = dragStartX.current - info.point.x;
            if (diff > 40) next();
            else if (diff < -40) prev();
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="min-w-full border border-white/10 p-6 flex flex-col justify-between"
              style={{ backgroundColor: colors.bgCardAlt, minHeight: "200px" }}
            >
              <div>
                <h3 className="font-inter font-normal text-lg text-white mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="font-inter font-light text-gray-400 text-xs leading-relaxed opacity-80">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-4" : "bg-white/20"
            }`}
            style={{ backgroundColor: i === current ? colors.primary : undefined }}
          />
        ))}
      </div>

      {/* Prev / Next buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prev}
          disabled={current === 0}
          className="text-xs text-white/40 disabled:opacity-20 hover:text-white transition-colors px-2 py-1"
        >
          ← Prev
        </button>
        <button
          onClick={next}
          disabled={current === cards.length - 1}
          className="text-xs text-white/40 disabled:opacity-20 hover:text-white transition-colors px-2 py-1"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BrandSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const calculateRange = () => {
      if (scrollRef.current) {
        const totalWidth = scrollRef.current.scrollWidth;
        const viewportWidth = scrollRef.current.clientWidth;
        setScrollRange(totalWidth - viewportWidth);
      }
    };
    calculateRange();
    window.addEventListener("resize", calculateRange);
    return () => window.removeEventListener("resize", calculateRange);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 0.9, 1], [0, -scrollRange, -scrollRange]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const wordVariants: Variants = {
    hidden: { y: "100%" },
    visible: { y: 0, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } },
  };

  // ── Mobile layout (carousel, no sticky scroll) ─────────────────────────────
  if (isMobile) {
    return (
      <section className="bg-black py-10">
        <div className="px-6 mb-6">
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl text-white leading-tight tracking-tighter font-medium"
          >
            <div className="flex flex-wrap gap-x-[0.3em]">
              <span className="inline-block overflow-hidden">
                <motion.span variants={wordVariants} className="italic font-serif inline-block" style={{ color: colors.primaryAlt }}>
                  We
                </motion.span>
              </span>
              {["MAKE", "PRODUCT,", "TECH", "INTERSECT"].map((word, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <motion.span variants={wordVariants} className="inline-block">{word}</motion.span>
                </span>
              ))}
            </div>
          </motion.h2>
        </div>
        <MobileCarousel />
      </section>
    );
  }

  // ── Desktop layout (original scroll animation) ─────────────────────────────
  return (
    <section ref={targetRef} className="relative md:h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 mb-12 w-full">
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-6xl lg:text-[4.5vw] text-white leading-tight tracking-tighter font-medium"
          >
            <div className="flex flex-wrap gap-x-[0.3em]">
              <span className="inline-block overflow-hidden">
                <motion.span variants={wordVariants} className="italic font-serif inline-block" style={{ color: colors.primaryAlt }}>
                  We
                </motion.span>
              </span>
              {["MAKE", "PRODUCT,", "TECH", "INTERSECT"].map((word, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <motion.span variants={wordVariants} className="inline-block">{word}</motion.span>
                </span>
              ))}
            </div>
          </motion.h2>
        </div>

        <div className="w-full">
          <div className="overflow-visible px-10">
            <motion.div ref={scrollRef} style={{ x }} className="flex gap-12">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group relative h-[450px] lg:h-[550px] w-[420px] lg:w-[500px] flex-shrink-0 border border-white/10 p-10 flex flex-col justify-between overflow-hidden"
                  style={{ backgroundColor: colors.bgCardAlt }}
                >
                  <div>
                    <h3 className="font-inter font-normal text-4xl text-white mb-2 leading-tight">
                      {card.title}
                    </h3>
                    <p className="font-inter font-light text-gray-400 text-lg leading-relaxed opacity-80 line-clamp-3">
                      {card.description}
                    </p>
                  </div>

                  <div className="flex mt-auto relative h-56 items-center justify-center">
                    <div className="absolute w-60 h-60 bg-purple-600/5 rounded-full blur-[90px]" />
                    <motion.img
                      src={card.image}
                      alt={card.title}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="relative z-10 max-h-52 w-auto object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}