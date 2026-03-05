"use client";

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar as CalIcon,
  Clock,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface BookingModalProps {
  onClose: () => void;
}

export function BookingModal({ onClose }: BookingModalProps) {
  const [modalStep, setModalStep] = useState<'calendar' | 'time' | 'details'>('calendar');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const bookingSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().optional()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const validatedData = bookingSchema.parse(formData);
      
      const payload = {
        ...validatedData,
        date: selectedDate,
        time: selectedTime,
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

      toast.success('Booking confirmed!', { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      onClose();

    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message, { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      } else {
        toast.error(error.message || 'Something went wrong', { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const displayMonths = [
    { name: `${monthNames[today.getMonth()]} ${today.getFullYear()}`, month: today.getMonth(), year: today.getFullYear() },
    { 
      name: `${monthNames[(today.getMonth() + 1) % 12]} ${today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear()}`, 
      month: (today.getMonth() + 1) % 12, 
      year: today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear() 
    }
  ];

  const timeSlots: string[] = [];
  for (let hour = 8; hour <= 21; hour++) {
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    timeSlots.push(`${displayHour}:00${period}`, `${displayHour}:30${period}`);
  }

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-white text-[#1A1A1A] w-full max-w-[1000px] h-[95vh] sm:h-auto sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl"
      >
        {/* LEFT PANEL: Branding & Info */}
        <div className="w-full md:w-[35%] p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/80 shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-600 font-bold text-xs mb-1 uppercase tracking-widest">Romil</p>
              <h2 className="text-xl md:text-2xl font-bold leading-tight text-gray-900">
                Free Consultation
              </h2>
            </div>
            <button onClick={onClose} className="md:hidden p-2 text-gray-400 hover:bg-gray-200 rounded-full">
                <X size={24} />
            </button>
          </div>

          <div className="mt-6 space-y-4 text-gray-600 text-sm font-medium">
            <div className="flex items-center gap-3"><Clock size={18} className="text-red-500" /> 30 min</div>
            <div className="flex items-center gap-3"><Globe size={18} className="text-red-500" /> Video Call</div>
            {selectedDate && (
              <div className="flex items-start gap-3 text-red-600 font-bold animate-in fade-in slide-in-from-left-2">
                <CalIcon size={18} className="mt-0.5" />
                <span>
                   {selectedTime ? `${selectedTime}, ` : ''}{selectedDate} {displayMonths[currentMonthIndex].name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Content Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-white relative">
          {/* Header for Desktop */}
          <div className="hidden md:flex justify-between items-center p-8 pb-0">
            <h3 className="text-xl font-bold text-gray-900">
              {modalStep === 'details' ? 'Enter Details' : 'Select Date & Time'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            
            {/* Step: Calendar */}
            {modalStep === 'calendar' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={() => setCurrentMonthIndex(0)} 
                    className={`p-2 rounded-full border ${currentMonthIndex === 0 ? 'opacity-0' : 'hover:bg-gray-50'}`}
                  >
                    <ChevronLeft className="text-red-600" size={20} />
                  </button>
                  <span className="text-lg font-bold text-gray-800">{displayMonths[currentMonthIndex].name}</span>
                  <button 
                    onClick={() => setCurrentMonthIndex(1)} 
                    className={`p-2 rounded-full border ${currentMonthIndex === 1 ? 'opacity-0' : 'hover:bg-gray-50'}`}
                  >
                    <ChevronRight className="text-red-600" size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: daysInMonth(displayMonths[currentMonthIndex].month, displayMonths[currentMonthIndex].year) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedDate(i + 1); setModalStep('time'); }}
                      className={`aspect-square flex items-center justify-center rounded-full text-sm font-bold transition-all
                        ${selectedDate === i + 1 ? 'bg-red-600 text-white' : 'hover:bg-red-50 text-gray-700'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step: Time */}
            {modalStep === 'time' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <button onClick={() => setModalStep('calendar')} className="flex items-center gap-2 text-red-600 font-bold mb-6 hover:underline">
                    <ChevronLeft size={18} /> Back to Calendar
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-10">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => { setSelectedTime(time); setModalStep('details'); }}
                      className="py-4 px-4 border-2 border-red-50 text-red-600 text-sm font-bold rounded-xl hover:border-red-500 hover:bg-red-50 transition-all"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step: Details Form */}
            {modalStep === 'details' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-10">
                <button onClick={() => setModalStep('time')} className="flex items-center gap-2 text-red-600 font-bold mb-2 hover:underline">
                    <ChevronLeft size={18} /> Back to Time Slots
                </button>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name *" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-red-500 transition-colors bg-gray-50 text-black" />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email *" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-red-500 transition-colors bg-gray-50 text-black" />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." className="w-full p-4 border border-gray-200 rounded-xl h-32 outline-none focus:border-red-500 transition-colors resize-none bg-gray-50 text-black" />
                <button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 shadow-xl shadow-red-100 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fee2e2; border-radius: 10px; }
      `}</style>
    </div>
  );
}

export function BookFreeConsultationButton({
  label = "Book Free Consultation",
  className = "bg-red-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-red-700 transition-all z-[100] relative shadow-lg",
}: { label?: string; className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={className}>
        {label}
      </button>
      <AnimatePresence>
        {isModalOpen && <BookingModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}