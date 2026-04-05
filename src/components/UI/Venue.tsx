'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Venue() {
  return (
    <div className="w-full max-w-lg mx-auto px-2 md:px-0">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden group">
        {/* Map Header */}
        <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden bg-sage/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3238.8015267841374!2d-5.7915534!3d35.7310994!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sfr!2sma!4v1775408079062!5m2!1sfr!2sma"
            className="absolute inset-0 w-full h-full grayscale sepia hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-100"
            style={{ border: 0, filter: 'sepia(1) hue-rotate(60deg) saturate(50%) brightness(0.8)' }} 
            allowFullScreen
            loading="lazy"
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
        </div>
        
        {/* Venue Info */}
        <div className="p-5 md:p-8 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="elegant-font text-2xl md:text-3xl text-beige mb-1 leading-tight uppercase tracking-widest">Salle Zouhra</h3>
              <p className="text-[9px] md:text-[10px] text-ivory/40 tracking-[0.3em] uppercase">Hay Al Mourabit, Tanger</p>
            </div>
            <div className="bg-beige/10 p-2 md:p-3 rounded-full border border-beige/20">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-beige" />
            </div>
          </div>
          
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-beige/30 to-transparent" />
          
          <p className="text-[10px] md:text-xs font-light leading-relaxed text-ivory/60 italic text-center px-4">
            "Where family, friends, and happy memories come together."
          </p>
          
          <motion.a
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(216, 193, 195, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            href="https://www.google.com/maps/place//data=!4m2!3m1!1s0xd0b819c8b2c6ffb:0xf7fe5ff05e0defe?entry=s&sa=X&ved=2ahUKEwjnlMCCgNeTAxVGnf0HHQolKl4Q4kB6BAgREAA&hl=fr&g_ep=Eg1tbF8yMDI2MDIyNV8wIOC7DCoASAJQAg%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-beige/20 border border-beige/30 text-beige py-3 md:py-4 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] block text-center backdrop-blur-sm transition-all duration-300 mt-4 md:mt-6"
          >
            Locate Ceremony
          </motion.a>
        </div>
      </div>
    </div>
  );
}
