'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Music, Send, User, Mail } from 'lucide-react';
import { useState } from 'react';

export default function RSVPForm() {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    console.log('Sending RSVP via local proxy...');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        console.error('RSVP API Proxy failure:', response.status);
      }
      reset();
    } catch (error) {
      console.error('Error sending RSVP via Proxy:', error);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory/95 p-6 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-beige/20 max-w-lg mx-auto relative group">
      {/* Subtle Corner Ornament */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-beige/10 rounded-bl-full pointer-events-none" />
      
      <div className="text-center mb-10 relative z-10">
        <h2 className="elegant-font text-3xl md:text-4xl text-sage mb-2 uppercase tracking-widest">Join Our Celebration</h2>
        <p className="text-[10px] tracking-[0.3em] text-sage/60 uppercase">Kindly respond by May 20th</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 relative z-10">
        
        {/* Melody Section - Before RSVP fields as requested */}
        <div className="space-y-4 pb-4 border-b border-sage/10">
          <div className="flex items-center gap-2 mb-2">
            <Music className="w-4 h-4 text-beige" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-sage/80">Request a Melody</span>
          </div>
          <div className="relative group/field">
            <input
              {...register('melody')}
              className="peer w-full bg-transparent border-b border-beige/30 focus:border-sage outline-none py-2 transition-all placeholder:text-sage/20 text-black text-sm"
              placeholder="Song Title & Artist"
            />
          </div>
        </div>

        {/* Name Field */}
        <div className="relative group/field pt-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-beige" />
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-sage/80">Full Name</label>
          </div>
          <input
            {...register('name')}
            required
            className="peer w-full bg-transparent border-b border-beige/30 focus:border-sage outline-none py-2 transition-all placeholder:text-sage/20 text-black text-sm"
            placeholder="e.g. John Doe"
          />
        </div>
        
        {/* Email Field */}
        <div className="relative group/field">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-beige" />
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-sage/80">Email Address</label>
          </div>
          <input
            {...register('email')}
            type="email"
            required
            className="peer w-full bg-transparent border-b border-beige/30 focus:border-sage outline-none py-2 transition-all placeholder:text-sage/20 text-black text-sm"
            placeholder="e.g. john@example.com"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#7a8a73' }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-sage text-ivory py-4 rounded-xl font-bold uppercase tracking-[0.4em] text-[10px] shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Confirming...</span>
          ) : (
            <>
              Confirm Attendance <Send className="w-3 h-3" />
            </>
          )}
        </motion.button>
      </form>

      <p className="text-center text-[9px] md:text-[10px] text-sage/60 mt-8 uppercase tracking-[0.2em] font-medium italic">
        "We are looking forward to <br /> seeing you at Salle Zouhra"
      </p>
    </div>
  );
}