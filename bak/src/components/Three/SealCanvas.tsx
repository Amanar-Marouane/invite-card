'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SealCanvas({ onStartReveal }: { onStartReveal: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'sliding' | 'expanding' | 'done'>('closed');

  /* 
   * ============================================================================
   * IMAGE GENERATION PROMPTS (As requested by user to generate independently):
   * ============================================================================
   * 
   * 1. /textures/envelope_closed.png
   *    Prompt: "Deep burgundy red rectangular envelope, closed, horizontal orientation. 
   *    It features an elegant white 'SC' cursive monogram at the top. The flap points 
   *    downwards to the center. Photorealistic, soft studio lighting, isolated on a 
   *    transparent or pure white background."
   * 
   * 2. /textures/envelope_opened.png
   *    Prompt: "Deep burgundy red rectangular envelope, OPENED, horizontal orientation. 
   *    The top flap is flipped upwards, revealing the darker inside pocket of the envelope. 
   *    The bottom pocket forms a straight line or subtle V-shape across the middle. 
   *    Photorealistic, exact same dimension and lighting as the closed envelope, 
   *    isolated on transparent or pure white background."
   * 
   * 3. /textures/envelope_paper.png
   *    Prompt: "A luxurious ivory white wedding invitation paper card, portrait orientation. 
   *    Subtle natural paper texture, completely blank without text, soft even lighting. 
   *    Isolated on transparent or pure white background."
   * ============================================================================
   */

  const handleTap = () => {
    if (phase !== 'closed') return;
    
    // 1. The opening swap is perfectly snappy
    setPhase('opening');

    // 2. Smoothly start sliding the paper out of the pocket
    setTimeout(() => setPhase('sliding'), 400);

    // 3. Luxurious, slow expansion towards the camera
    setTimeout(() => setPhase('expanding'), 1600);

    // 4. Silky fade out to reveal the actual main app content
    setTimeout(() => {
      setPhase('done');
      onStartReveal();
    }, 3200);
  };

  return (
    // Outer Wrapper
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* Animated Deep Red "Night Sky" Background */}
      <motion.div 
         className="absolute inset-0 z-0 bg-black pointer-events-none"
         animate={{ opacity: (phase === 'expanding' || phase === 'done') ? 0 : 1 }}
         transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Soft pulsing nebulas */}
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#8b0018] blur-[120px] opacity-50"
          animate={{ scale: [1, 1.2, 1], x: ['0%', '10%', '0%'], y: ['0%', '5%', '0%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#5c0011] blur-[100px] opacity-60"
          animate={{ scale: [1, 1.15, 1], x: ['0%', '-8%', '0%'], y: ['0%', '-5%', '0%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[30%] left-[60%] w-[50vw] h-[50vw] rounded-full bg-[#3a0008] blur-[90px] opacity-80"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Twinkling star map overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen bg-repeat" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%23fff' opacity='0.7'/%3E%3Ccircle cx='120' cy='50' r='1' fill='%23fff' opacity='0.5'/%3E%3Ccircle cx='80' cy='120' r='2' fill='%23fff' opacity='0.2'/%3E%3Ccircle cx='140' cy='130' r='1' fill='%23fff' opacity='0.6'/%3E%3Ccircle cx='40' cy='100' r='1.5' fill='%23fff' opacity='0.4'/%3E%3C/svg%3E")` }} 
        />
      </motion.div>

      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {/* ENVELOPE CONTAINER: Bleeding off edges on mobile for maximum scale */}
            <motion.div 
              className="relative w-[115vw] sm:w-[95vw] max-w-[1000px] aspect-[1.4/1] cursor-pointer drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] flex items-center justify-center z-10"
              onClick={handleTap}
              animate={
                phase === 'expanding' 
                  ? { y: '100vh', opacity: 0, scale: 0.9 } // Gently shrink and drop away
                  : { y: 0, opacity: 1, scale: 1 }
              }
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* LAYER 1: OPENED ENVELOPE */}
              <div 
                className="absolute inset-0 z-[1] rounded-md overflow-hidden scale-400"
                style={{ opacity: phase === 'closed' ? 0 : 1 }}
              >
                 <Image
                    src="/textures/envelope_opened.png"
                    alt="Opened Envelope"
                    fill
                    className="object-contain"
                 />
              </div>

              {/* LAYER 2: THE PAPER (Ultra-smooth slide up and scale) */}
              <div 
                className="absolute inset-0 z-[2]" 
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 100% 55%, 0 55%)',
                  opacity: phase === 'closed' ? 0 : 1 
                }}
              >
                <motion.div
                  className="absolute left-[8%] right-[8%] bottom-[45%] top-[8%] rounded-sm shadow-2xl flex items-center justify-center overflow-hidden"
                  initial={{ y: '30%', opacity: 0 }}
                  animate={
                    phase === 'sliding'
                      ? { y: '-60%', opacity: 1, scale: 1 } 
                      : phase === 'expanding'
                      ? { y: '-60%', opacity: 0, scale: 6 } // Massive smooth zoom
                      : { y: '30%', opacity: 0 }
                  }
                  transition={{ 
                    duration: phase === 'expanding' ? 1.8 : 1.4, 
                    ease: phase === 'expanding' ? [0.64, 0, 0.78, 0] : [0.22, 1, 0.36, 1] 
                  }}
                >
                   <Image
                      src="/textures/envelope_paper.png"
                      alt="Paper Textures"
                      fill
                      className="object-cover"
                   />
                </motion.div>
              </div>

              {/* LAYER 3: CLOSED ENVELOPE */}
              <div
                 className="absolute inset-0 z-[3] rounded-md overflow-hidden scale-400"
                 style={{ opacity: phase === 'closed' ? 1 : 0 }}
              >
                 <Image
                    src="/textures/envelope_closed.png"
                    alt="Closed Envelope"
                    fill
                    className="object-contain"
                 />
              </div>

              {/* LAYER 4: WAX SEAL */}
              <motion.div
                className="absolute top-[70%] scale-300 left-1/2 -translate-x-[20%] -translate-y-[20%] w-[16%] aspect-square z-[4] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                animate={phase === 'closed' ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0, y: 30 }}
                transition={{ duration: 0.5, ease: "backIn" }}
              >
                <Image
                  src="/textures/wax_seal.png"
                  alt="Wax Seal"
                  fill
                  className="object-contain"
                />
              </motion.div>

            </motion.div>

            {/* HINT TEXT */}
            <AnimatePresence>
              {phase === 'closed' && (
                <motion.div
                  className="absolute z-[5] inset-x-0 bottom-12 md:bottom-20 text-center px-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <p className="script-font text-5xl md:text-6xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                      Asmae & Yassine
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/90 drop-shadow-md font-medium">
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
