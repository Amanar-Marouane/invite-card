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
    <div className="bg-ivory p-8 md:p-12 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-rose/10 max-w-lg mx-auto relative group">
      {/* Subtle Corner Ornament */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose/5 rounded-bl-full pointer-events-none" />
      
      <div className="text-center mb-4 relative z-10">
        <h2 className="script-font text-5xl md:text-6xl text-rose/100 mb-6">Guest Response</h2>
        <div className="h-[1px] w-20 bg-rose/20 mx-auto" />
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
        {/* Name Field */}
        <div className="relative group/field">
          <input
            {...register('name')}
            required
            className="peer w-full bg-transparent border-b-2 border-rose/10 focus:border-rose/60 outline-none py-3 transition-all placeholder-transparent text-black font-medium"
            placeholder="Full Name"
          />
          <label className="absolute left-0 -top-5 text-rose/60 text-[10px] uppercase tracking-[0.3em] font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-sage/40 peer-focus:-top-5 peer-focus:text-rose/80">
            Full Name
          </label>
        </div>
        
        {/* Email Field */}
        <div className="relative group/field">
          <input
            {...register('email')}
            type="email"
            required
            className="peer w-full bg-transparent border-b-2 border-rose/10 focus:border-rose/60 outline-none py-3 transition-all placeholder-transparent text-black font-medium"
            placeholder="Email Address"
          />
          <label className="absolute left-0 -top-5 text-rose/60 text-[10px] uppercase tracking-[0.3em] font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-sage/40 peer-focus:-top-5 peer-focus:text-rose/80">
            Email Address
          </label>
        </div>
        
        <div className="grid grid-cols-2 gap-10">
          {/* Guest Count */}
          {/* <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-[0.3em] text-rose/40 font-bold mb-2">Total Guests</label>
            <select
              {...register('guests')}
              className="bg-transparent border-b-2 border-rose/10 focus:border-rose/60 outline-none py-2 text-sage cursor-pointer custom-select"
            >
              {[1, 2, 3, 4, '5+'].map((num) => (
                <option key={num.toString()} value={num.toString()}>{num}</option>
              ))}
            </select>
          </div> */}
          
          {/* Attending Toggle */}
          <div className="flex flex-col grid-cols-2">
            <label className="text-[10px] uppercase tracking-[0.3em] text-rose/40 font-bold mb-2">Attending?</label>
            <div className="flex gap-4 py-2">
              <label className="flex items-center gap-2 cursor-pointer group/radio">
                <input type="radio" {...register('attending')} value="yes" defaultChecked className="accent-rose w-4 h-4" />
                <span className="text-xs font-bold text-sage/70 uppercase">YES</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group/radio">
                <input type="radio" {...register('attending')} value="no" className="accent-sage/30 w-4 h-4" />
                <span className="text-xs font-bold text-sage/50 uppercase">NO</span>
              </label>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ y: -3, backgroundColor: '#8a9a83' }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-rose text-ivory py-5 rounded-2xl font-bold uppercase tracking-[0.5em] text-[11px] shadow-xl transition-all"
        >
          Confirm
        </motion.button>
      </form>

      <p className="text-center text-[10px] text-black mt-4 uppercase tracking-[0.2em] font-medium italic">
        "We are looking forward to <br /> seeing you at the Palace jardins"
      </p>
    </div>
  );
}