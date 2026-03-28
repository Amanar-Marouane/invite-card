'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Venue() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden group">
        {/* Map Header */}
        <div className="aspect-[21/9] relative overflow-hidden bg-sage/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.910243468505!2d-0.12623618423049183!3d51.50072917963421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c329598821%3A0x600c0155b40d421!2sWestminster%20Abbey!5e0!3m2!1sen!2suk!4v1622554474744!5m2!1sen!2suk"
            className="absolute inset-0 w-full h-full grayscale sepia hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-100"
            style={{ border: 0, filter: 'sepia(1) hue-rotate(60deg) saturate(50%) brightness(0.8)' }} 
            allowFullScreen
            loading="lazy"
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
        </div>
        
        {/* Venue Info */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="script-font text-3xl text-rose mb-1 leading-tight">Palais des Arts</h3>
              <p className="text-[10px] text-ivory/40 tracking-[0.3em] uppercase">Casablanca, Morocco</p>
            </div>
            <div className="bg-rose/10 p-3 rounded-full border border-rose/20">
              <MapPin className="w-4 h-4 text-rose" />
            </div>
          </div>
          
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-rose/30 to-transparent" />
          
          <p className="text-xs font-light leading-relaxed text-ivory/60 italic text-center px-4">
            "A magnificent garden setting where we will share our first sunset as one."
          </p>
          
          <motion.a
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(216, 193, 195, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            href="https://maps.app.goo.gl/uXpD1n8U5d8bC4R58"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-rose/20 border border-rose/30 text-rose py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.4em] block text-center backdrop-blur-sm transition-all duration-300 mt-6"
          >
            Locate Ceremony
          </motion.a>
        </div>
      </div>
    </div>
  );
}
