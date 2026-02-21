"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What technologies have you worked with in your recent projects?",
    answer: "I have worked with React.js, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, and REST APIs. I’ve also implemented animations using GSAP and handled authentication and API integrations in full-stack applications."
  },
  {
    question: "How would you optimize performance in a React or Next.js application?",
    answer: "I would use techniques like code splitting, dynamic imports, React.memo, useMemo, useCallback, lazy loading images, and proper state management to prevent unnecessary re-renders. I would also analyze performance using Lighthouse and browser dev tools."
  },
  {
    question: "What is hydration in Next.js and why can it cause errors?",
    answer: "Hydration is the process where React attaches event listeners to server-rendered HTML on the client side. Hydration errors occur when the server-rendered HTML does not match the client-rendered output, often due to conditional rendering or browser-only APIs."
  },
  {
    question: "How would you build a scalable frontend for an AI SaaS product?",
    answer: "I would structure the app with reusable components, proper folder architecture, API abstraction layers, centralized state management, and optimized rendering strategies. I would also handle streaming responses efficiently for real-time AI outputs."
  },
  {
    question: "How do you handle tight deadlines in a startup environment?",
    answer: "I prioritize features based on impact, break tasks into smaller deliverables, communicate blockers early, and focus on shipping a functional MVP before refining details. Speed with stability is important in startups."
  },
  {
    question: "Can you explain the difference between useEffect and useLayoutEffect?",
    answer: "useEffect runs asynchronously after the DOM is painted, making it suitable for data fetching and side effects. useLayoutEffect runs synchronously before the browser paints, making it useful for DOM measurements or animations."
  },
  {
    question: "How would you implement a debounced search input?",
    answer: "I would use a debounce function with setTimeout and clearTimeout inside useEffect, or use a utility like lodash debounce. This prevents API calls on every keystroke and improves performance."
  },
  {
    question: "What is the difference between CSR, SSR, and SSG in Next.js?",
    answer: "CSR renders content entirely in the browser, SSR renders content on the server for each request, and SSG generates static pages at build time. SSR improves SEO for dynamic data, while SSG is best for static content."
  },
  {
    question: "How do you ensure code quality in a team environment?",
    answer: "I follow consistent folder structure, use TypeScript for type safety, write reusable components, maintain clean commits, and participate in code reviews. I also test features before merging."
  },
  {
    question: "Why do you want to work at an AI startup?",
    answer: "AI startups provide opportunities to work on cutting-edge technology, take ownership of features, and contribute directly to impactful products. I enjoy fast-paced environments where I can learn and grow quickly."
  }
];

export default function FaqSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0A0A0A] py-32 px-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-light text-white mb-20 text-center uppercase tracking-tight">
          <span className="italic text-red-600 serif font-normal">Any</span> MORE QUESTIONS?
        </h2>

        {/* FAQ List */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-white/10 relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="py-10 flex justify-between items-center cursor-pointer group">
                <h3 className={`text-xl md:text-2xl font-light transition-colors duration-300 ${hoveredIndex === index ? 'text-white' : 'text-gray-400'}`}>
                  {faq.question}
                </h3>
                
                {/* Plus/Minus Icon */}
                <motion.span 
                  animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                  className="text-3xl font-thin text-gray-500 group-hover:text-white"
                >
                  +
                </motion.span>
              </div>

              {/* Collapsible Answer */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-10 text-gray-500 text-lg max-w-3xl leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}