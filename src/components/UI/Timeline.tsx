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
    <div className="relative h-full w-full flex flex-col justify-between py-4">
      {/* Central Decorative Line */}
      <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex items-center gap-6 md:gap-12 w-full flex-grow"
        >
          {/* Icon - Constant positioning for mobile readability */}
          <div className="z-10 bg-white border-gold/30 border p-2.5 rounded-full shadow-sm flex-shrink-0 group-hover:border-gold transition-colors">
            <event.icon className="w-5 h-5 gold-text" strokeWidth={1.2} />
          </div>

          {/* Content Area */}
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] font-bold gold-text tracking-widest whitespace-nowrap">
                {event.time}
              </span>
              <div className="h-px w-8 bg-gold/20 hidden md:block" />
              <h3 className="text-xl font-light tracking-wide text-stone-800">
                {event.title}
              </h3>
            </div>
            <p className="text-[12px] opacity-40 font-light mt-0.5 italic">
              {event.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}