"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MessageSquare, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { BookingModal, BookFreeConsultationButton } from '@/components/ui/BookFreeConsultation';
import { AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';
import {
  contactPageTestimonials,
  contactRotatingWords,
  officeLocations,
} from '@/lib/sectionData';

const ContactAndPresence = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // --- ADDED: Scroll to top on mount ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % contactRotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    budget: 'Project Budget',
    timeline: 'Project Timeline',
    message: '',
    phone: '',
    source: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    budget: z.string(),
    timeline: z.string(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    phone: z.string().min(5, 'Phone number is required'),
    source: z.string()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to send message');
      }

      toast.success('Message sent successfully! We will get back to you soon.', {
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      
      setFormData({
        firstName: '', lastName: '', email: '', 
        budget: 'Project Budget', timeline: 'Project Timeline', 
        message: '', phone: '', source: ''
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message, { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      } else {
        toast.error(error.message || 'Something went wrong. Please try again.', { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentItem = contactPageTestimonials[currentIndex];
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % contactPageTestimonials.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + contactPageTestimonials.length) % contactPageTestimonials.length);
  const toggleVideo = () => setIsPlaying(!isPlaying);

  return (
    <section className="bg-[#020202] text-white py-16 px-6 font-inter overflow-hidden">
      <Toaster position="bottom-right" />
      {isPlaying && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-md p-4">
          <button onClick={toggleVideo} className="absolute top-10 right-10 text-white/50 hover:text-red-600 transition-colors"><X size={32} /></button>
          <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-[0_0_60px_rgba(255,0,0,0.3)] border border-red-600/40">
            <video className="w-full h-full object-cover" controls autoPlay src={currentItem.videoUrl} />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-24 relative">
        
        {/* --- PART 1: TOP CONTACT CARDS --- */}
        <div className="text-center space-y-3 relative z-10">
          <span className="text-[9px] font-bold px-3 py-1 border border-red-600/30 bg-red-600/10 rounded-full text-red-500 uppercase tracking-widest">Contact Us</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">We Are Just A <span className="text-red-600">Call Away</span></h2>
          <p className="text-gray-400 max-w-lg mx-auto text-xs md:text-sm">Reach out to us for inquiries, collaborations, or to discuss your project needs.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { icon: <Phone size={20}/>, title: "Call Us Directly", sub: "Mon-Fri from 9am to 6pm IST", val: "+91 8799302123" },
              { icon: <Mail size={20}/>, title: "Email Support", sub: "For general inquiries and support", val: "info@HoocAisolution.com" },
              { icon: <MessageSquare size={20}/>, title: "Book Consultation", sub: "Instant response from our team", val: "Schedule Now", action: () => setIsModalOpen(true) }
            ].map((card, i) => (
              <div 
                key={i} 
                onClick={card.action}
                className={`bg-[#0d0d0d] border border-white/10 rounded-[1.5rem] p-8 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(255,0,0,0.1)] transition-all duration-500 group relative overflow-hidden ${card.action ? 'cursor-pointer' : ''}`}
              >
                <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mb-6 mx-auto text-red-600 border border-red-600/20 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">{card.icon}</div>
                <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                <p className="text-gray-500 text-[11px] mb-6">{card.sub}</p>
                <div className="bg-[#151515] py-3 rounded-xl border border-white/10 text-white text-[12px] font-semibold tracking-wide group-hover:border-red-600/30 transition-all">
                  {card.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PART 2: TESTIMONIAL & FORM --- */}
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Trusted by <span className="text-red-600">business leaders</span></h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            <div className="bg-[#0d0d0d] border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-2xl hover:border-red-600/30 transition-colors">
              <div>
                <div onClick={toggleVideo} className="relative aspect-video rounded-2xl overflow-hidden mb-6 group cursor-pointer border border-white/10">
                  <img src={currentItem.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" alt="Video" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all">
                      <Play className="text-white fill-white ml-0.5" size={24} />
                    </div>
                  </div>
                </div>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed italic font-medium mb-8">{currentItem.text}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-600">
                     <img src={currentItem.avatar} alt={currentItem.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base text-white leading-none">{currentItem.name}</p>
                    <p className="text-red-600 text-[10px] font-black tracking-widest uppercase mt-1">{currentItem.company}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={handlePrev} className="w-9 h-9 flex items-center justify-center bg-white rounded-full text-black hover:bg-red-600 hover:text-white transition-all"><ChevronLeft size={18}/></button>
                    <button onClick={handleNext} className="w-9 h-9 flex items-center justify-center bg-white rounded-full text-black hover:bg-red-600 hover:text-white transition-all"><ChevronRight size={18}/></button>
                </div>
              </div>
            </div>

            <div className="bg-[#0d0d0d] border border-white/10 rounded-[2rem] p-6 md:p-10 relative shadow-2xl hover:border-red-600/30 transition-colors">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-1">Schedule A Meeting</h3>
                <p className="text-gray-400 text-xs">Leave us a little info and we&apos;ll get in touch!</p>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="First Name *" className="w-full bg-[#151515] border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-red-600 transition-colors" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Last Name *" className="w-full bg-[#151515] border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-red-600 transition-colors" />
                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address *" className="w-full md:col-span-2 bg-[#151515] border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-red-600 transition-colors" />
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-[#151515] border border-white/10 rounded-xl p-4 text-xs text-gray-400 outline-none focus:border-red-600">
                  <option disabled>Project Budget</option>
                  <option value="Less than 5K">Less than 5K</option>
                  <option value="5K - 10K">5K - 10K</option>
                  <option value="10K - 50K">10K - 50K</option>
                  <option value="50K+">50K+</option>
                </select>
                <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-[#151515] border border-white/10 rounded-xl p-4 text-xs text-gray-400 outline-none focus:border-red-600">
                  <option disabled>Project Timeline</option>
                  <option value="Less than 1 month">Less than 1 month</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Message *" className="w-full md:col-span-2 bg-[#151515] border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-red-600 transition-colors resize-none" />
                <div className="md:col-span-2 flex bg-[#151515] border border-white/10 rounded-xl overflow-hidden focus-within:border-red-600 transition-colors">
                  <span className="flex items-center justify-center px-4 border-r border-white/10 text-white/50 text-xs">
                    +91
                  </span>
                  <input 
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange} 
                    placeholder="Phone Number *" 
                    className="w-full bg-transparent p-4 text-xs text-white outline-none" 
                  />
                </div>
                <input name="source" value={formData.source} onChange={handleChange} type="text" placeholder="How do you hear about us?" className="w-full md:col-span-2 bg-[#151515] border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-red-600 transition-colors" />
                <div className="md:col-span-2">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-red-900 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* --- PART 3: GLOBAL PRESENCE --- */}
        <div className="text-center space-y-12">
          <h2 className="text-3xl font-bold">Our <span className="text-red-600">Global</span> Presence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {officeLocations.map((loc, i) => (
              <div
                key={i}
                className="bg-[#0d0d0d] border border-white/10 rounded-[1.5rem] overflow-hidden group shadow-xl hover:border-red-600/40 transition-all duration-500"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={loc.img}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    alt={loc.city}
                  />
                  <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-all duration-500"></div>
                </div>
                <div className="p-6 relative">
                  <span className="text-[8px] font-black px-3 py-1 bg-red-600 text-white rounded-full uppercase mb-3 inline-block tracking-widest shadow-lg shadow-red-600/20">
                    {loc.type}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                    {loc.city}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PART 4: CTA --- */}
        <div className="relative group rounded-[2.5rem] overflow-hidden border border-red-600/30 shadow-[0_0_80px_rgba(255,0,0,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/60 to-black z-10" />
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1500" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Cyber"/>
            <div className="relative z-20 py-20 px-6 text-center space-y-8">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                    Let&apos;s Build <span className="text-red-600">{contactRotatingWords[wordIndex]}</span> <br/> Together.
                </h2>
                <p className="text-gray-300 max-w-lg mx-auto text-sm md:text-lg">We partner with ambitious teams to design and develop custom digital solutions that perform.</p>
                <button onClick={() => setIsModalOpen(true)} className="bg-red-600 text-white px-10 py-5 rounded-full font-black text-xs md:text-base hover:bg-white hover:text-red-600 transition-all shadow-2xl active:scale-95">Book Free Consultation</button>
            </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && <BookingModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default ContactAndPresence;