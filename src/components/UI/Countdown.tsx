'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { motion } from 'framer-motion';

interface CountdownProps {
  eventDate: string;
}

export default function Countdown({ eventDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(eventDate);

  if (isExpired) {
    return (
      <div className="text-center py-8">
        <h2 className="elegant-font text-4xl md:text-6xl text-beige animate-pulse uppercase tracking-widest">Our Journey Begins</h2>
      </div>
    );
  }

  const items = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className="grid grid-cols-2 md:flex items-center justify-center gap-3 md:gap-8 max-w-4xl w-full px-2">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="flex flex-col items-center group relative mx-auto"
        >
          {/* Card - Beige themed glassmorphism */}
          <div className="relative bg-white/5 border border-beige/20 rounded-full w-20 h-20 md:w-32 lg:w-36 md:h-32 lg:h-36 flex flex-col items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-500 group-hover:border-beige/50 group-hover:-translate-y-1">

            {/* Value */}
            <span className="text-xl md:text-4xl lg:text-5xl font-light text-beige block leading-none mb-1">
              {String(item.value).padStart(2, '0')}
            </span>

            {/* Label */}
            <span className="text-[6px] md:text-[8px] lg:text-[9px] uppercase tracking-[0.2em] font-medium text-ivory/60 group-hover:text-beige/80 transition-colors">
              {item.label}
            </span>

            {/* Subtle Inner Ring */}
            <div className="absolute inset-1 border border-white/5 rounded-full pointer-events-none" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}