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
        <h2 className="script-font text-6xl gold-text animate-pulse">A Royal Union Unfolded</h2>
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
    <div className="flex items-center justify-center flex-wrap px-4 w-full max-w-4xl">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center group"
          >
            {/* Card */}
            <div className="relative bg-white border border-gold/35 rounded-full w-36 h-36 md:w-40 md:h-40 flex flex-col items-center justify-center shadow-[0_8px_28px_rgba(185,149,42,0.10)] transition-all duration-500 group-hover:border-gold/65 group-hover:shadow-[0_14px_36px_rgba(185,149,42,0.18)] group-hover:-translate-y-1">

              {/* Number */}
              <span className="text-5xl md:text-[52px] font-light tracking-[-0.03em] text-[#b8952a] block leading-none">
                {String(item.value).padStart(2, '0')}
              </span>

              {/* Label */}
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-[#9e8a6a] mt-2">
                {item.label}
              </span>

              {/* Inner ring */}
              <div className="absolute inset-[6px] border border-gold/8 rounded-full pointer-events-none" />
            </div>
          </motion.div>

          {/* Separator dot between units (not after last) */}
          {index < items.length - 1 && (
            <span className="text-2xl md:text-3xl text-gold/30 font-light mx-1 md:mx-2 pb-7 select-none">
              ·
            </span>
          )}
        </div>
      ))}
    </div>
  );
}