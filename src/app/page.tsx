'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from '@/components/UI/Countdown';
import Timeline from '@/components/UI/Timeline';
import Venue from '@/components/UI/Venue';
import RSVPForm from '@/components/UI/RSVPForm';
import { Heart, Music, Sparkles, ChevronDown } from 'lucide-react';

export default function Home() {
  const [phase, setPhase] = useState<'initial' | 'playing' | 'ended'>('initial');
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const weddingDate = '2026-06-20T14:00:00';

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
      }
    }
  };

  const handleVideoEnd = () => {
    setPhase('ended');
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <main className="bg-sage text-ivory h-screen w-full overflow-hidden">
      
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
                <p className="text-white/20 text-[10px] tracking-[1em] uppercase font-light">
                  Tap to Enter
                </p>
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
            src="/videos/walking_sceen.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
          />
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="relative z-10 w-full max-w-5xl px-6"
          >
            <div className="bg-sage/20 backdrop-blur-xl border border-white/10 p-12 md:p-24 text-center">
              <div className="flex flex-col items-center">
                <motion.h1 className="script-font text-7xl md:text-9xl text-ivory drop-shadow-2xl mb-2 leading-tight">
                  Asmae & Yassine
                </motion.h1>
                <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-rose/50 to-transparent my-12" />
                <p className="text-xl md:text-2xl font-light tracking-[0.5em] text-ivory/90 uppercase mb-4">
                  June 20 <span className="mx-4 text-rose">•</span> 2026
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.4em] text-ivory/30 uppercase text-center">Confirm your attendance</span>
            <ChevronDown className="w-4 h-4 text-rose/50" />
          </motion.div>
        </section>

        {/* SECTION 2: COUNTDOWN (Sage Theme) */}
        <section className="relative h-screen w-full snap-start flex flex-col bg-sage overflow-hidden px-6 py-12 md:py-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="flex flex-col items-center text-center relative z-10 my-auto"
          >
            <div className="mb-16">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-ivory/60 font-medium">
                The Celebration Begins In
              </span>
              <div className="h-[1px] w-12 bg-rose/30 mx-auto mt-4" />
            </div>
            <Countdown weddingDate={weddingDate} />
            <p className="mt-20 text-xs uppercase tracking-[1em] text-ivory/30 italic">
              Casablanca • Morocco
            </p>
          </motion.div>
        </section>

        {/* SECTION 3: TIMELINE (Rose Theme) */}
        <section className="relative h-screen w-full snap-start flex flex-col bg-rose text-sage-900 overflow-y-auto px-6 py-12 md:py-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="max-w-4xl w-full mx-auto my-auto"
          >
            <div className="text-center mb-16">
               <Heart className="w-6 h-6 text-sage/60 mx-auto mb-4" />
               <h2 className="script-font text-5xl md:text-6xl text-sage">The Wedding Program</h2>
               <div className="h-px w-24 bg-sage/20 mx-auto mt-6" />
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-4 custom-scrollbar text-sage-900">
              <Timeline />
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: VENUE (Sage Theme) */}
        <section className="relative h-screen w-full snap-start flex flex-col bg-sage overflow-hidden px-6 py-12 md:py-24">
          <div className="max-w-6xl w-full mx-auto my-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="script-font text-6xl md:text-7xl text-rose">The Venue</h2>
              <div className="w-16 h-1 bg-rose/30" />
              <p className="text-lg font-light leading-relaxed text-ivory/80 max-w-md">
                We invite you to share in our joy at the Palais des Arts, Casablanca. A place where tradition meets elegance, just as we begin our new life together.
              </p>
              <div className="flex items-center gap-4">
                <Sparkles className="w-6 h-6 text-rose" />
                <span className="text-xs uppercase tracking-[0.2em] text-ivory/60 font-medium">Grand Ballroom</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="rounded-sm overflow-hidden shadow-2xl border border-white/5">
              <Venue />
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: RSVP (Rose Theme) */}
        <section id="rsvp" className="relative h-screen w-full snap-start flex flex-col bg-rose overflow-hidden px-6 py-12 md:py-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="max-w-3xl w-full mx-auto my-auto"
          >
            <div className="text-center mb-16">
               <h2 className="script-font text-5xl md:text-6xl text-sage mb-4">Confirm Attendance</h2>
               <p className="text-xs tracking-[0.4em] text-sage/60 uppercase">Kindly respond by May 20th</p>
            </div>
            <div className="bg-ivory/10 p-8 rounded-sm backdrop-blur-sm border border-white/10">
              <RSVPForm />
            </div>
          </motion.div>
        </section>

        {/* SECTION 6: MUSIC & FOOTER (Dark Sage Theme) */}
        <section className="relative h-screen w-full snap-start flex flex-col items-center justify-between bg-[#2d362a] text-ivory">
          <div /> 
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="max-w-lg w-full mx-auto px-6 text-center space-y-12"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
              <Music className="w-10 h-10 text-rose mx-auto" />
            </motion.div>
            <h2 className="script-font text-5xl md:text-6xl text-rose">Request a Melody</h2>
            <p className="opacity-40 text-sm tracking-wide leading-relaxed">
              Is there a song that reminds you of love? Share it with us, and it might find its way into our ballroom playlist.
            </p>
            <input 
              type="text" 
              placeholder="Song Title & Artist"
              className="w-full bg-transparent border-b border-white/10 focus:border-rose outline-none py-4 text-center transition-all text-xl font-light placeholder:text-white/5"
            />
          </motion.div>
          <footer className="w-full py-16 text-center border-t border-white/5">
            <h2 className="script-font text-4xl text-rose mb-6">Asmae & Yassine</h2>
            <div className="flex flex-wrap justify-center gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.5em] opacity-30">
              <span>Morocco</span>
              <span>June 2026</span>
              <span>Black Tie</span>
            </div>
          </footer>
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
          background: rgba(216, 193, 195, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
