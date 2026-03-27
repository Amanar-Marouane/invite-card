'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export default function RSVPForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data);
    alert('Thank you! Your RSVP has been received.');
  };

  return (
    <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-md mx-auto relative group">
      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-bl-[100px] transition-all group-hover:bg-gold/10" />
      
      <div className="text-center mb-10">
        <h2 className="script-font text-5xl text-stone-800 mb-2">RSVP</h2>
        <div className="h-[1px] w-12 bg-gold/40 mx-auto" />
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Name Field */}
        <div className="relative">
          <input
            {...register('name')}
            required
            className="peer w-full bg-transparent border-b-2 border-stone-100 focus:border-gold outline-none py-3 transition-all placeholder-transparent text-stone-800"
            placeholder="Full Name"
          />
          <label className="absolute left-0 -top-3.5 text-stone-400 text-xs uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-gold peer-focus:text-xs">
            Full Name
          </label>
        </div>
        
        {/* Email Field */}
        <div className="relative">
          <input
            {...register('email')}
            type="email"
            required
            className="peer w-full bg-transparent border-b-2 border-stone-100 focus:border-gold outline-none py-3 transition-all placeholder-transparent text-stone-800"
            placeholder="Email Address"
          />
          <label className="absolute left-0 -top-3.5 text-stone-400 text-xs uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-gold peer-focus:text-xs">
            Email Address
          </label>
        </div>
        
        <div className="grid grid-cols-2 gap-10">
          {/* Guest Count */}
          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">Guests</label>
            <select
              {...register('guests')}
              className="bg-transparent border-b-2 border-stone-100 focus:border-gold outline-none py-2 text-stone-800 cursor-pointer"
            >
              {[1, 2, 3, 4, '5+'].map((num) => (
                <option key={num.toString()} value={num.toString()}>{num}</option>
              ))}
            </select>
          </div>
          
          {/* Attending Toggle */}
          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">Attending?</label>
            <div className="flex gap-4 py-2">
              <label className="flex items-center gap-2 cursor-pointer group/radio">
                <input type="radio" {...register('attending')} value="yes" defaultChecked className="accent-gold w-4 h-4" />
                <span className="text-xs font-medium text-stone-600">YES</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group/radio">
                <input type="radio" {...register('attending')} value="no" className="accent-stone-300 w-4 h-4" />
                <span className="text-xs font-medium text-stone-600">NO</span>
              </label>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-stone-900 text-white py-5 rounded-full font-semibold uppercase tracking-[0.3em] text-[11px] mt-6 shadow-xl hover:bg-black transition-all"
        >
          Confirm Attendance
        </motion.button>
      </form>

      <p className="text-center text-[10px] text-stone-300 mt-8 uppercase tracking-widest">
        Please respond by May 20, 2026
      </p>
    </div>
  );
}