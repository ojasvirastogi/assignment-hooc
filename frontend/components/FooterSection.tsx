"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "@/lib/colors";
import { X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { socialMediaLinks } from "./ui/socialMediaConfig";

const NoiseOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      zIndex: 1,
      opacity: 0.64,
      mixBlendMode: "hard-light",
      backgroundImage: "url('/noiseimg.png')",
      backgroundSize: "auto",
      backgroundRepeat: "repeat",
      backgroundPosition: "50% center",
      inset: "0%",
    }}
  />
);

export default function Footer() {
  const router = useRouter();
  const [activeOverlay, setActiveOverlay] = useState<"terms" | "privacy" | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const closeOverlay = () => setActiveOverlay(null);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter your email", { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      return;
    }

    setIsSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to subscribe');
      }

      toast.success('Successfully subscribed to HoocAi!', { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      setEmail(""); // clear input

    } catch (error: any) {
      toast.error(error.message || 'Something went wrong', { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="relative">
      {/* --- Newsletter Section --- */}
      <div className="text-white px-6 md:px-12 lg:px-20 py-8 md:py-4 min-h-[140px] md:min-h-[160px] flex items-center relative overflow-hidden" style={{ backgroundColor: colors.primaryDark }}>
        <NoiseOverlay />
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 relative z-10">
            <h3 className="text-2xl lg:text-4xl font-light tracking-tight text-white mb-4 md:mb-0 text-center md:text-left">Subscribe to our newsletter</h3>
            <div className="flex flex-col sm:flex-row w-full md:w-auto border border-white/40 rounded-[2rem] sm:rounded-full overflow-hidden max-w-md bg-white/5 backdrop-blur-sm">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address" 
                className="bg-transparent px-6 py-4 sm:py-3 flex-grow outline-none text-sm text-white text-center sm:text-left" 
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                disabled={isSubscribing}
              />
              <button 
                onClick={handleSubscribe}
                disabled={isSubscribing || !email}
                className="bg-white px-8 py-4 sm:py-3 text-sm font-medium hover:bg-opacity-90 transition-all uppercase tracking-wider flex items-center justify-center min-w-[140px] disabled:opacity-70 disabled:cursor-not-allowed" 
                style={{ color: colors.primaryGlow }}
              >
                {isSubscribing ? <Loader2 size={18} className="animate-spin" /> : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Footer Section --- */}
      <footer className="text-white pt-20 pb-10 px-6 md:px-12 lg:px-20 relative overflow-hidden font-inter" style={{ backgroundColor: colors.primaryDeep }}>
        <NoiseOverlay />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[14vw] md:text-[8vw] font-light leading-[0.9] tracking-tighter uppercase mb-10">
              SAY HELLO<span className="ml-3 font-normal text-white">!</span>
            </h1>
            
            {/* --- Schedule a Call Button --- */}
            <motion.button
              onClick={() => router.push("/contact-us")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 border border-white/40 px-8 py-4 rounded-full text-lg font-light transition-all bg-white/5 hover:bg-white hover:text-black"
            >
              Schedule a Call <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
             <div className="col-span-2 space-y-8">
                <h4 className="text-xs font-bold tracking-widest opacity-80 uppercase">Write to us</h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">for business</p>
                    <a href="mailto:sayhello@hoocai.design" className="text-2xl font-light hover:underline block">sayhello@hoocai.design</a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">for jobs</p>
                    <a href="mailto:people@hoocai.design" className="text-2xl font-light hover:underline block">people@hoocai.design</a>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold tracking-widest uppercase opacity-70 relative z-10">
          <div className="flex gap-8">
            {socialMediaLinks.map((social) => (
              <a 
                key={social.id}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-100 transition-opacity"
              >
                {social.name}
              </a>
            ))}
          </div>

          <div className="flex gap-8">
            <button onClick={() => setActiveOverlay("privacy")} className="hover:opacity-100 transition-opacity uppercase font-bold">Privacy Policy</button>
            <button onClick={() => setActiveOverlay("terms")} className="hover:opacity-100 transition-opacity uppercase font-bold">Terms</button>
          </div>
          <p>©2026 HoocAi. ALL RIGHTS RESERVED</p>
        </div>
      </footer>

      {/* --- Overlays --- */}
      <AnimatePresence>
        {activeOverlay && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[500] bg-[#020202] text-white overflow-y-auto font-inter"
          >
            <NoiseOverlay />
            <div className="sticky top-0 z-20 bg-[#020202]/90 backdrop-blur-md border-b border-white/10 px-6 md:px-20 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-light tracking-tighter uppercase">
                {activeOverlay === "terms" ? "Terms & " : "Privacy "} 
                <span style={{ color: colors.primaryGlow }}>{activeOverlay === "terms" ? "Conditions" : "Policy"}</span>
              </h2>
              <button onClick={closeOverlay} className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"><X size={24} /></button>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-12">
              {activeOverlay === "terms" ? (
                <section className="space-y-4">
                  <h3 className="text-xl font-bold uppercase tracking-widest border-l-4 border-red-600 pl-4">1. Agreement</h3>
                  <p className="text-white/70 leading-relaxed">By using our platform, you agree to these terms...</p>
                </section>
              ) : (
                <>
                  <section className="space-y-4">
                    <h3 className="text-xl font-bold uppercase tracking-widest border-l-4 border-red-600 pl-4">Data Protection</h3>
                    <p className="text-white/70 leading-relaxed">Your data security is our priority. We use industry-standard encryption to protect your project details.</p>
                  </section>
                  <section className="space-y-4">
                    <h3 className="text-xl font-bold uppercase tracking-widest border-l-4 border-red-600 pl-4">Information We Collect</h3>
                    <p className="text-white/70 leading-relaxed">We collect names and emails for scheduling consultations.</p>
                  </section>
                </>
              )}
              <button onClick={closeOverlay} className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all">Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}