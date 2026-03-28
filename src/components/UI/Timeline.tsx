'use client';

import { motion } from 'framer-motion';
import { Church, Camera, Utensils, PartyPopper } from 'lucide-react';

const events = [
  { time: '2:00 PM', title: 'Ceremony', desc: 'St. Royal Cathedral', icon: Church },
  { time: '4:00 PM', title: 'Photos', desc: 'Palace Gardens', icon: Camera },
  { time: '6:30 PM', title: 'Banquet', desc: 'Crystal Hall', icon: Utensils },
  { time: '9:00 PM', title: 'Party', desc: 'Under the Stars', icon: PartyPopper },
];

export default function Timeline() {
  return (
    <div className="relative w-full max-w-2xl mx-auto py-2">
      {/* Central Decorative Line (High Contrast) */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      
      <div className="space-y-6 md:space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -15 : 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className={`relative flex items-center gap-6 md:gap-12 w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse text-right'}`}
          >
            {/* Icon (Brighter background for visibility) */}
            <div className="z-10 bg-white/10 backdrop-blur-md border border-white/30 p-2.5 rounded-full flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 shadow-xl">
              <event.icon className="w-4 h-4 text-white" strokeWidth={2} />
            </div>

            {/* Content Area (High Contrast Text) */}
            <div className={`flex flex-col flex-1 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
              <div className={`flex items-baseline gap-2 mb-1 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">
                  {event.time}
                </span>
                <div className="h-px w-6 bg-white/20 hidden md:block" />
                <h3 className="text-lg md:text-2xl font-light tracking-wide text-white drop-shadow-sm">
                  {event.title}
                </h3>
              </div>
              <p className="text-[11px] text-white/50 font-light italic">
                {event.desc}
              </p>
            </div>
            
            {/* Filler for the other side in desktop */}
            <div className="hidden md:block flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}