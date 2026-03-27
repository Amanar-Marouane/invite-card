'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SealCanvas({ onStartReveal, onComplete }: { onStartReveal: () => void, onComplete?: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'middle' | 'opened' | 'expanding' | 'done'>('closed');

  const handleTap = () => {
    if (phase !== 'closed') return;
    
    // 1. Unveil the middle frame
    setPhase('middle');

    // 2. Smoothly complete the opening flip
    setTimeout(() => setPhase('opened'), 200);

    // 3. Zoom into the envelope, AND simultaneously begin mounting the hero application site
    setTimeout(() => {
      setPhase('expanding');
      onStartReveal(); // Parallel mounting! The text soars up underneath the zooming envelope.
    }, 1000);

    // 4. Safely unmount SealCanvas entirely from React
    setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 2800);
  };

  return (
    // Outer Wrapper
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* 
        ELEGANT GLASSMORPHISM BACKGROUND 
        Uses the actual live background video from the hero section, but deeply blurred.
        As the sequence finishes, the blur lifts, perfectly connecting the scenes!
      */}
      <motion.div 
         className="absolute inset-0 z-0 pointer-events-none"
         initial={{ backdropFilter: 'blur(60px)', backgroundColor: 'rgba(5, 5, 5, 0.75)' }}
         animate={{ 
           backdropFilter: (phase === 'expanding' || phase === 'done') ? 'blur(0px)' : 'blur(60px)',
           backgroundColor: (phase === 'expanding' || phase === 'done') ? 'rgba(0,0,0,0)' : 'rgba(5, 5, 5, 0.75)'
         }}
         transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ perspective: 1200 }}
          >
            {/* ENVELOPE CONTAINER: Seamless animated transitions & Camera Lens blur on approach */}
            <motion.div 
              className="relative w-[100vw] sm:w-[90vw] max-w-[800px] aspect-[1.4/1] cursor-pointer drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] flex items-center justify-center z-10"
              onClick={handleTap}
              initial={{ scale: 1.8, rotateZ: 0, filter: 'blur(0px)', y: 0 }}
              animate={
                phase === 'closed'
                  ? { y: [0, -8, 0], scale: 1.8, rotateZ: 0, filter: 'blur(0px)' } // Floating breathe effect
                  : phase === 'middle'
                  ? { y: '-3vh', scale: 1.85, rotateZ: -1.5, filter: 'blur(0px)' } // Physical snap up
                  : phase === 'expanding' 
                  ? { y: '25vh', opacity: 0, scale: 6, rotateZ: 0, filter: 'blur(40px)' } // Depth of Field Lens Blur
                  : { y: 0, opacity: 1, scale: 1.8, rotateZ: 0, filter: 'blur(0px)' } // Settled opened
              }
              transition={{ 
                y: phase === 'closed' ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: phase === 'expanding' ? 1.6 : 1.4, ease: [0.22, 1, 0.36, 1] },
                filter: { duration: phase === 'expanding' ? 1.2 : 0 },
                rotateZ: { duration: 0.3, ease: "easeOut" }
              }}
            >

              {/* LAYER 1: FULLY OPENED ENVELOPE */}
              <motion.div 
                className="absolute inset-0 z-[1] rounded-md overflow-hidden scale-130"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'opened' || phase === 'expanding' ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeIn" }}
              >
                 <Image
                    src="/textures/envelope_opened.png"
                    alt="Opened Envelope"
                    fill
                    className="object-contain"
                    priority
                 />
              </motion.div>

              {/* LAYER 2: MIDDLE OPENED ENVELOPE (The midway flip frame) */}
              <motion.div 
                className="absolute inset-0 z-[2] rounded-md overflow-hidden scale-120"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'middle' ? 1 : 0 }}
                transition={{ duration: 0.15 }}
              >
                 <Image
                    src="/textures/envelope_middle_opened.png"
                    alt="Half Opened Envelope"
                    fill
                    className="object-contain"
                    priority
                 />
              </motion.div>

              {/* LAYER 3: CLOSED ENVELOPE */}
              <motion.div
                 className="absolute inset-0 z-[3] rounded-md overflow-hidden"
                 initial={{ opacity: 1 }}
                 animate={{ opacity: phase === 'closed' ? 1 : 0 }}
                 transition={{ duration: 0.15 }}
              >
                 <Image
                    src="/textures/envelope_closed.png"
                    alt="Closed Envelope"
                    fill
                    className="object-contain"
                    priority
                 />
              </motion.div>

            </motion.div>

            {/* HINT TEXT */}
            <AnimatePresence>
              {phase === 'closed' && (
                <motion.div
                  className="absolute z-[5] inset-x-0 bottom-[5%] md:bottom-[10%] text-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <p className="script-font text-5xl md:text-6xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight">
                      Asmae & Yassine
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] font-medium">
                      01.02.2030
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
