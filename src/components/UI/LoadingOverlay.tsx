'use client';

import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-sage">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            opacity: 1,
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative inline-block"
        >
          {/* Decorative Ring */}
          <div className="absolute inset-0 border-2 border-beige/20 rounded-full -m-6 animate-spin-slow" />
          
          {/* Invitation Icon */}
          <div className="bg-ivory/10 p-8 rounded-full backdrop-blur-xl border border-white/20 shadow-2xl">
            <MailOpen className="w-12 h-12 text-beige" />
          </div>
        </motion.div>

        <div className="space-y-3">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="elegant-font text-2xl md:text-3xl text-ivory uppercase tracking-[0.3em]"
          >
            Unveiling your invitation
          </motion.h2>
          
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-1.5 h-1.5 bg-beige rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
