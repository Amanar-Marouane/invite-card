'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Venue() {
  return (
    <div>
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group">
        <div className="aspect-video relative overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.910243468505!2d-0.12623618423049183!3d51.50072917963421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c329598821%3A0x600c0155b40d421!2sWestminster%20Abbey!5e0!3m2!1sen!2suk!4v1622554474744!5m2!1sen!2suk"
            className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
        
        <div className="p-10 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-light mb-1">St. Royal Cathedral</h3>
              <p className="text-sm opacity-50 tracking-widest uppercase">The Ceremony</p>
            </div>
            <div className="bg-burgundy-bg/10 p-4 rounded-2xl">
              <MapPin className="w-5 h-5 text-burgundy" strokeWidth={1.5} />
            </div>
          </div>
          
          <div className="w-12 h-px bg-gold/50" />
          
          <p className="text-sm italic opacity-60">
            "A timeless setting for a timeless promise."
          </p>
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://maps.app.goo.gl/uXpD1n8U5d8bC4R58"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] block text-center shadow-2xl hover:bg-[#800020] transition-all duration-500 mt-8"
          >
            Get Directions
          </motion.a>
        </div>
      </div>
    </div>
  );
}
