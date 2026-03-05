"use client";

import Link from "next/link";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header className="px-6 lg:px-8 h-16 flex items-center border-b border-white/20 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center font-bold text-xl group" href="/">
          <div className="bg-blue-600/10 p-2 rounded-lg mr-2 group-hover:bg-blue-600/20 transition-colors">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">InvoiceSystem</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link 
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-full hover:bg-blue-50" 
            href="/admin/dashboard"
          >
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Decorative background elements can stay out of motion if preferred, or inside */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>

        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative z-10">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center space-y-8 text-center"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/50 backdrop-blur-sm px-3 py-1 text-sm text-blue-600 mb-4 shadow-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>The modern way to manage billing</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6 max-w-4xl">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 drop-shadow-sm pb-2">
                  Effortless Invoice Tracking
                </h1>
                <p className="mx-auto max-w-[700px] text-xl text-slate-600 leading-relaxed font-medium">
                  Automate and streamline your invoicing process. Create, send, and manage your invoices efficiently in one beautifully secure dashboard.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="pt-8">
                <Link
                  className="group inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-3 text-base font-semibold text-white shadow-xl shadow-blue-500/20 transition-all hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
                  href="/admin/dashboard"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
