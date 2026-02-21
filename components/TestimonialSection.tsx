"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    company: "Amazon",
    quote: "Onething navigated customer pathways and resonated with the core ethos of Royal Enfield. The team built experiences across touchpoints, united by a design system, ensuring brand consistency all channels",
    author: "Jatin Chhikara",
    role: "Global Head - Marketing, Royal Enfield",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    company: "Myntra",
    quote: "The strategic approach to our digital transformation was exceptional. They understood our global scale and delivered a solution that felt local and personal to every user.",
    author: "Sarah Jenkins",
    role: "VP of Digital Experience",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    company: "Flipkart",
    quote: "Modernizing a banking interface is no small feat. The team simplified complex financial data into a clean, intuitive dashboard that our customers absolutely love using daily.",
    author: "Amit Sharma",
    role: "Chief Product Officer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    company: "Google",
    quote: "They captured the essence of our brand perfectly. The new e-commerce flow saw an immediate 25% increase in conversion rates thanks to the improved UX.",
    author: "Riya Kapoor",
    role: "Head of E-commerce",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    company: "DECATHLON",
    quote: "A perfect blend of sports passion and technical expertise. They helped us bridge the gap between our physical stores and our online shopping experience seamlessly.",
    author: "Marc Dupont",
    role: "Director of Innovation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    company: "NOISE",
    quote: "Their design language for our wearable app was futuristic yet accessible. It completely changed how our users interact with their health data.",
    author: "Vikram Mehta",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    company: "HERO",
    quote: "The dedication to detail and brand heritage was evident in every sprint. They didn't just design an app; they designed a new way for riders to connect with their bikes.",
    author: "Sanjay Verma",
    role: "Tech Strategy Lead",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
  }
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  const current = testimonials[index];

  return (
    <section className="bg-[#0A0A0A] py-32 px-10 min-h-[700px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading */}
        <h2 className="text-6xl font-light text-white mb-20 leading-tight uppercase">
          <span className="italic text-red-600 serif font-normal">What</span> OUR CLIENTS <br />
          ARE SAYING...
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content Area */}
          <div className="relative min-h-[350px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                <p className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                  {current.company}
                </p>
                <blockquote className="text-3xl md:text-4xl text-white font-light leading-snug">
                  {current.quote}
                </blockquote>
                <div>
                  <h4 className="text-xl text-white font-medium">{current.author}</h4>
                  <p className="text-gray-500 italic text-sm mt-1">{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-12">
              <button 
                onClick={prevStep}
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                ←
              </button>
              <button 
                onClick={nextStep}
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                →
              </button>
            </div>
          </div>

          {/* Image Area */}
          <div className="relative aspect-square max-w-md ml-auto overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={index}
                src={current.image}
                alt={current.author}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}