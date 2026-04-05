'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from '@/components/UI/Countdown';
import Venue from '@/components/UI/Venue';
import RSVPForm from '@/components/UI/RSVPForm';
import { Heart, Music, Sparkles, ChevronDown } from 'lucide-react';

export default function Home() {
  const [phase, setPhase] = useState<'initial' | 'playing' | 'ended'>('initial');
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const eventDate = '2026-05-04T00:00:00';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleStart = () => {
    if (phase === 'initial') {
      setPhase('playing');
      if (videoRef.current) {
        videoRef.current.play().catch(err => console.error("Video play failed:", err));
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && phase === 'playing') {
      if (videoRef.current.currentTime >= 3) {
        setPhase('ended');
        window.dispatchEvent(new CustomEvent('start-music'));
      }
    }
  };

  const handleVideoEnd = () => {
    setPhase('ended');
    window.dispatchEvent(new CustomEvent('start-music'));
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <main className="bg-sage text-ivory min-h-screen w-full overflow-hidden">
      
      {/* ===== INITIAL VIDEO OVERLAY ===== */}
      <AnimatePresence>
        {phase !== 'ended' && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            onClick={handleStart}
          >
            <video
              ref={videoRef}
              src="/videos/opening.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
              playsInline
              preload="auto"
              muted={false}
            />
            {phase === 'initial' && (
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="relative z-10 pointer-events-none"
              >
                <div className="w-16 h-16 border border-ivory/20 rounded-full flex items-center justify-center animate-ping">
                  <div className="w-2 h-2 bg-ivory/40 rounded-full" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== SCROLLABLE SNAP CONTAINER ===== */}
      <div 
        ref={containerRef}
        className={`h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth transition-opacity duration-1000 ${phase === 'ended' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        
        {/* SECTION 1: HERO */}
        <section className="relative h-screen w-full snap-start flex items-center justify-center bg-black overflow-hidden">
          <video
            ref={heroVideoRef}
            src="/videos/walking_sceen.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onTimeUpdate={(e) => {
              if (e.currentTarget.currentTime >= 10) {
                e.currentTarget.currentTime = 0;
              }
            }}
          />
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="relative z-10 w-full max-w-5xl px-4 md:px-6"
          >
            <div className="bg-sage/10 backdrop-blur-md border border-white/10 px-6 py-12 md:px-24 md:py-20 text-center relative overflow-hidden rounded-sm">
              <div className="flex flex-col items-center relative z-10">
                <span className="text-[9px] md:text-xs uppercase tracking-[0.8em] text-ivory/60 font-medium mb-6 md:mb-8 block">
                  The Celebration for
                </span>
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="elegant-font text-5xl md:text-7xl lg:text-8xl text-ivory drop-shadow-2xl leading-tight tracking-[0.1em] mb-6 md:mb-8 uppercase"
                >
                  Nada & Bilal
                </motion.h1>
                <div className="h-[1px] w-12 bg-beige/30 mb-6 md:mb-8" />
                <p className="text-lg md:text-2xl font-light tracking-[0.4em] text-ivory/90 uppercase">
                  May 04 <span className="mx-2 md:mx-4 text-beige">•</span> 2026
                </p>
              </div>
              
              {/* Subtle decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-beige/30" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-beige/30" />
              </div>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.4em] text-ivory/30 uppercase text-center">Slide Up</span>
            <ChevronDown className="w-3 h-3 text-beige/50" />
          </motion.div>
        </section>

        {/* SECTION 2: COUNTDOWN */}
        <section className="relative h-screen w-full snap-start flex flex-col bg-sage overflow-hidden px-4 py-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="flex flex-col items-center text-center relative z-10 my-auto"
          >
            <div className="mb-12 md:mb-16">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-ivory/60 font-medium">
                Counting the Days
              </span>
              <div className="h-[1px] w-10 bg-beige/30 mx-auto mt-4" />
            </div>
            <Countdown eventDate={eventDate} />
            <p className="mt-16 md:mt-20 text-[10px] md:text-xs uppercase tracking-[0.8em] text-ivory/30 italic">
              Tanger • Morocco
            </p>
          </motion.div>
        </section>

        {/* SECTION 3: VENUE */}
        <section className="relative h-screen w-full snap-start flex flex-col bg-sage overflow-hidden px-4 py-8 md:py-24">
          <div className="max-w-6xl w-full mx-auto my-auto grid md:grid-cols-2 gap-8 md:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              className="space-y-4 md:space-y-8 text-center md:text-left"
            >
              <h2 className="elegant-font text-4xl md:text-6xl text-beige uppercase tracking-[0.2em]">The Venue</h2>
              <div className="w-12 h-[1px] bg-beige/30 mx-auto md:mx-0" />
              <p className="text-sm md:text-lg font-light leading-relaxed text-ivory/70 max-w-md mx-auto md:mx-0">
                A setting of timeless elegance awaits as we celebrate this engagement. We await your presence at Salle Zouhra.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <Sparkles className="w-4 h-4 text-beige" />
                <span className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-ivory/50 font-medium">Grand Celebration Hall</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="rounded-sm overflow-hidden shadow-2xl border border-white/5">
              <Venue />
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: IMPORTANT INFO */}
        <section className="relative h-screen w-full snap-start flex flex-col bg-[#2d362a] text-ivory overflow-hidden px-4 py-12 md:py-24 border-y border-white/5">
           <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="max-w-4xl w-full mx-auto my-auto space-y-12 md:space-y-16"
          >
            <div className="text-center mb-4">
               <h2 className="elegant-font text-3xl md:text-5xl text-beige uppercase tracking-[0.3em] mb-4">Important Info</h2>
               <div className="h-[1px] w-16 bg-beige/30 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
               {/* Children Policy */}
               <div className="bg-white/5 p-8 rounded-sm border border-white/10 backdrop-blur-sm space-y-4 transition-all hover:bg-white/10">
                  <div className="flex items-center gap-4 text-beige">
                     <Heart className="w-5 h-5" />
                     <span className="text-[10px] uppercase tracking-[0.3em] font-bold">A Note on Little Ones</span>
                  </div>
                  <p className="text-sm md:text-base font-light text-ivory/70 leading-relaxed italic">
                    "With love, we leave the little ones at home for this celebration" 🥰
                  </p>
               </div>

               {/* Timing & Seating */}
               <div className="bg-white/5 p-8 rounded-sm border border-white/10 backdrop-blur-sm space-y-6 transition-all hover:bg-white/10">
                  <div className="flex items-center gap-4 text-beige">
                     <Sparkles className="w-5 h-5" />
                     <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Timing & Seating</span>
                  </div>
                  <div className="space-y-4">
                     <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-beige/60 mb-1">Arrival At</span>
                        <span className="text-3xl md:text-4xl elegant-font text-ivory tracking-widest">7:00 PM</span>
                     </div>
                     <p className="text-xs md:text-sm font-light text-ivory/60 leading-relaxed">
                        Kindly arrive on time, as the celebration will conclude early. Please be seated accordingly.
                     </p>
                  </div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 5: RSVP & MELODY */}
        <section id="rsvp" className="relative min-h-screen h-screen w-full snap-start flex flex-col bg-beige overflow-y-auto px-4 py-6 md:py-12 custom-scrollbar">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="max-w-2xl w-full mx-auto my-auto"
          >
            {/* <div className="text-center mb-10 md:mb-16">
               <h2 className="elegant-font text-4xl md:text-5xl text-sage mb-4 uppercase tracking-[0.1em]">Registration</h2>
               <div className="h-[1px] w-12 bg-sage/20 mx-auto mb-4" />
               <p className="text-[9px] md:text-xs tracking-[0.4em] text-sage/40 uppercase">Presence & Preferences</p>
            </div> */}
            <RSVPForm />
          </motion.div>
          
          {/* <footer className="w-full py-12 md:py-20 text-center mt-auto">
            <h2 className="elegant-font text-3xl md:text-4xl text-sage/80 mb-6 uppercase tracking-[0.4em]">Nada & Bilal</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-sage/40">
              <span className="flex items-center gap-2"><Heart className="w-2 h-2" /> Tanger</span>
              <span>•</span>
              <span>May 2026</span>
              <span>•</span>
              <span>Morocco</span>
            </div>
          </footer> */}
        </section>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(150, 165, 143, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
