'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { motion } from 'framer-motion';

interface CountdownProps {
  weddingDate: string;
}

export default function Countdown({ weddingDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(weddingDate);

  if (isExpired) {
    return (
      <div className="text-center py-8">
        <h2 className="script-font text-6xl text-rose animate-pulse">Our Journey Begins</h2>
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
    <div className="flex items-center justify-center flex-wrap px-4 w-full max-w-4xl gap-6 md:gap-8">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="flex flex-col items-center group relative"
        >
          {/* Card - Rose themed glassmorphism */}
          <div className="relative bg-white/5 border border-rose/20 rounded-full w-32 h-32 md:w-36 md:h-36 flex flex-col items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-500 group-hover:border-rose/50 group-hover:-translate-y-1">

            {/* Value */}
            <span className="text-4xl md:text-5xl font-light text-rose block leading-none mb-1">
              {String(item.value).padStart(2, '0')}
            </span>

            {/* Label */}
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-medium text-ivory/60 group-hover:text-rose/80 transition-colors">
              {item.label}
            </span>

            {/* Subtle Inner Ring */}
            <div className="absolute inset-2 border border-white/5 rounded-full pointer-events-none" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}