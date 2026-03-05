"use client";
import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, CheckCircle, 
  Mail, Phone, MessageSquare, Play, Globe 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

// --- MAIN PAGE SECTION ---
export default function TestimonialAndBooking() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Software", "Apps", "Websites", "Solutions"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#020202] text-white py-16 px-6 font-inter overflow-hidden">
      <Toaster position="bottom-right" />
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Trusted By Section (From Image 0) */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Trusted by <span className="text-red-600">business leaders</span></h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Testimonial Card */}
           

            {/* Placeholder for the Form Section shown in Image 0 */}
            <div className="bg-[#0d0d0d] border border-white/10 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 border-2 border-dashed border-red-600/30 rounded-full flex items-center justify-center text-red-600"><Mail size={32}/></div>
              <h3 className="text-2xl font-bold">Schedule A Meeting</h3>
              <p className="text-gray-400 text-sm">Submit your project idea and get a complete roadmap during our discussion.</p>
              <button onClick={() => setIsModalOpen(true)} className="w-full bg-red-600 text-white font-black py-4 rounded-full hover:bg-white hover:text-red-600 transition-all shadow-xl uppercase text-xs tracking-widest">
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>

       

      
      </div>

      {/* --- MULTISTEP BOOKING MODAL --- */}
      {isModalOpen && <BookingModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}

// --- MODAL COMPONENT ---
function BookingModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    organization: '',
    firstName: '',
    workEmail: '',
    budget: 'Project Budget',
    timeline: 'Project Timeline',
    projectInfo: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const bookingSchema = z.object({
    organization: z.string().optional(),
    firstName: z.string().min(1, 'First Name is required'),
    workEmail: z.string().email('Invalid email address'),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    projectInfo: z.string().optional(),
    phone: z.string().min(5, 'Phone number is required'),
  });

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const validatedData = bookingSchema.parse(formData);
      
      const payload = {
        name: validatedData.firstName,
        email: validatedData.workEmail,
        message: validatedData.projectInfo,
        date: selectedDate,
        time: selectedTime,
        phone: validatedData.phone,
        organization: validatedData.organization,
        budget: validatedData.budget,
        timeline: validatedData.timeline
      };

      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to confirm booking');
      }

      toast.success("Awesome! Your consultation is scheduled. You'll receive a confirmation email shortly.", { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      onClose();

    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message, { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      } else {
        toast.error(error.message || 'Something went wrong', { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10 animate-in fade-in zoom-in duration-300">
      <div className="bg-[#0d0d0d] border border-white/10 w-full max-w-5xl h-full md:h-[600px] rounded-[2rem] flex flex-col relative overflow-hidden shadow-[0_0_100px_rgba(255,0,0,0.2)]">
        
        {/* Navigation Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && <button onClick={() => setStep(step - 1)} className="p-2 border border-white/10 rounded-full hover:bg-white/5"><ChevronLeft size={20}/></button>}
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Step {step} of 4</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-600 transition-colors"><X size={24}/></button>
        </div>

        {/* Steps Content */}
        <div className="flex-grow overflow-y-auto p-8 md:p-12">
          
          {/* STEP 1: INITIAL INQUIRY (Image 0 style) */}
          {step === 1 && (
            <div className="space-y-8 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Project <span className="text-red-600">Details</span></h2>
                <p className="text-gray-400 text-xs italic">Submit your idea and let&apos;ts start the zero-to-one journey.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization" className="w-full md:col-span-2 bg-[#151515] border border-white/5 p-4 rounded-xl text-xs outline-none focus:border-red-600" />
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" className="w-full bg-[#151515] border border-white/5 p-4 rounded-xl text-xs outline-none focus:border-red-600" />
                <input name="workEmail" value={formData.workEmail} onChange={handleChange} type="email" placeholder="Work Email *" className="w-full bg-[#151515] border border-white/5 p-4 rounded-xl text-xs outline-none focus:border-red-600" />
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-[#151515] border border-white/5 p-4 rounded-xl text-xs outline-none text-gray-400 focus:border-red-600">
                  <option disabled>Project Budget</option>
                  <option value="Less than 5K">Less than 5K</option>
                  <option value="5K - 10K">5K - 10K</option>
                  <option value="10K - 50K">10K - 50K</option>
                  <option value="50K+">50K+</option>
                </select>
                <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-[#151515] border border-white/5 p-4 rounded-xl text-xs outline-none text-gray-400 focus:border-red-600">
                  <option disabled>Project Timeline</option>
                  <option value="Less than 1 month">Less than 1 month</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
                <textarea name="projectInfo" value={formData.projectInfo} onChange={handleChange} placeholder="Tell us about your project..." className="w-full md:col-span-2 bg-[#151515] border border-white/5 p-4 rounded-xl text-xs outline-none focus:border-red-600 h-24 resize-none" />
                <button onClick={() => {
                  // Basic validation before going to next step
                  if(!formData.firstName || !formData.workEmail) {
                    toast.error('First Name and Work Email are required to proceed', { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
                    return;
                  }
                  setStep(2);
                }} className="w-full md:col-span-2 bg-red-600 text-white py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all shadow-lg">Next: Select Date</button>
              </div>
            </div>
          )}

          {/* STEP 2: CALENDAR (Image 1 style) */}
          {step === 2 && (
            <div className="flex flex-col md:flex-row gap-12 h-full">
              <div className="md:w-1/3 border-r border-white/5 pr-8 space-y-6">
                <h3 className="text-red-600 font-black text-[10px] tracking-widest uppercase">HoocAi Solution</h3>
                <h2 className="text-3xl font-bold italic">Let&apos;ts Grow Together.</h2>
                <div className="space-y-4 text-xs text-gray-400">
                  <p>✓ Strategy & Discovery Call</p>
                  <p>✓ Feedback on app idea</p>
                  <p>✓ Clear clarity on next steps</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Select Date — <span className="text-gray-500">Feb 2026</span></h3>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-600 mb-4">
                  {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d=><div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({length: 28}, (_, i) => (
                    <button key={i} onClick={() => { setSelectedDate(i+1); setStep(3); }} className={`aspect-square flex items-center justify-center rounded-xl text-xs transition-all ${selectedDate === i+1 ? 'bg-red-600 text-white font-bold shadow-[0_0_15px_rgba(255,0,0,0.3)]' : 'hover:bg-white/5 text-gray-400'}`}>
                      {i+1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TIME SLOTS (Image 2 style) */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center">Available slots for <span className="text-red-600">Feb 27, 2026</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                {['1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM'].map(time => (
                  <button key={time} onClick={() => { setSelectedTime(time); setStep(4); }} className="border border-white/10 p-4 rounded-xl text-xs font-bold hover:bg-red-600 hover:border-red-600 transition-all hover:shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: FINAL DETAILS (Image 3 style) */}
          {step === 4 && (
            <div className="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto">
              <div className="md:w-1/2 space-y-6">
                <div className="bg-red-600/5 border border-red-600/20 p-6 rounded-2xl">
                  <h3 className="text-red-500 font-bold text-sm mb-4 tracking-tight">Booking Summary</h3>
                  <div className="space-y-3 text-xs text-gray-300">
                    <p>📅 Friday, Feb 27, 2026</p>
                    <p>⏰ {selectedTime} (30 mins)</p>
                    <p>📍 Video Conferencing (Google Meet)</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 italic">No pressure. No sales pitch. Just a focused conversation to help you see the clear next steps.</p>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-xl font-bold">Enter Details</h3>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" className="w-full bg-[#151515] border border-white/5 p-4 rounded-xl text-xs text-white" />
                <input name="workEmail" value={formData.workEmail} onChange={handleChange} placeholder="Email *" className="w-full bg-[#151515] border border-white/5 p-4 rounded-xl text-xs text-white" />
                <input name="phone" value={formData.phone} onChange={handleChange} type="number" placeholder="Phone / WhatsApp *" className="w-full bg-[#151515] border border-white/5 p-4 rounded-xl text-xs text-white" />
                <button onClick={handleFinish} disabled={isSubmitting} className="w-full bg-red-600 text-white py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl hover:shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Scheduling...' : 'Schedule Event'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}