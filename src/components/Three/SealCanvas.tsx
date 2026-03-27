'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SealCanvas({ onStartReveal }: { onStartReveal: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'middle' | 'opened' | 'expanding' | 'done'>('closed');

  const handleTap = () => {
    if (phase !== 'closed') return;
    
    // 1. Instantly show the "middle" opening frame
    setPhase('middle');

    // 2. Quickly transition to the fully "opened" frame for a real flip-book effect
    setTimeout(() => setPhase('opened'), 150);

    // 3. Pause for the user to see the opened envelope, then zoom into the pocket
    setTimeout(() => setPhase('expanding'), 800);

    // 4. Fade into the main application content
    setTimeout(() => {
      setPhase('done');
      onStartReveal();
    }, 2200);
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
            style={{ perspective: 1000 }}
          >
            {/* ENVELOPE CONTAINER: Using base scale 1.6 to make the user's images beautifully massive! */}
            <motion.div 
              className="relative w-[100vw] sm:w-[90vw] max-w-[800px] aspect-[1.4/1] cursor-pointer drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] flex items-center justify-center z-10"
              onClick={handleTap}
              initial={{ scale: 1.8, rotateZ: 0 }}
              animate={
                phase === 'middle'
                  ? { y: '2vh', scale: 1.75, rotateZ: -1 } // Physical "punch" when opening
                  : phase === 'expanding' 
                  ? { y: '20vh', opacity: 0, scale: 5, rotateZ: 0 } // Massive dissolve into the screen
                  : { y: 0, opacity: 1, scale: 1.8, rotateZ: 0 }
              }
              transition={{ 
                duration: phase === 'middle' ? 0.1 : 1.4, 
                ease: phase === 'middle' ? "easeOut" : [0.22, 1, 0.36, 1] 
              }}
            >

              {/* LAYER 1: FULLY OPENED ENVELOPE */}
              <div 
                className="absolute inset-0 z-[1] rounded-md overflow-hidden"
                style={{ opacity: phase === 'opened' || phase === 'expanding' ? 1 : 0 }}
              >
                 <Image
                    src="/textures/envelope_opened.png"
                    alt="Opened Envelope"
                    fill
                    className="object-contain"
                    priority
                 />
              </div>

              {/* LAYER 2: MIDDLE OPENED ENVELOPE (The midway flip frame) */}
              <div 
                className="absolute inset-0 z-[2] rounded-md overflow-hidden"
                style={{ opacity: phase === 'middle' ? 1 : 0 }}
              >
                 <Image
                    src="/textures/envelope_middle_opened.png"
                    alt="Half Opened Envelope"
                    fill
                    className="object-contain"
                    priority
                 />
              </div>

              {/* LAYER 3: CLOSED ENVELOPE */}
              <div
                 className="absolute inset-0 z-[3] rounded-md overflow-hidden"
                 style={{ opacity: phase === 'closed' ? 1 : 0 }}
              >
                 <Image
                    src="/textures/envelope_closed.png"
                    alt="Closed Envelope"
                    fill
                    className="object-contain"
                    priority
                 />
              </div>

            </motion.div>

            {/* HINT TEXT */}
            <AnimatePresence>
              {phase === 'closed' && (
                <motion.div
                  className="absolute z-[5] inset-x-0 bottom-[5%] md:bottom-[10%] text-center px-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <p className="script-font text-5xl md:text-6xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
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
