'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SealCanvas from '@/components/Three/SealCanvas';
import Countdown from '@/components/UI/Countdown';
import Timeline from '@/components/UI/Timeline';
import Venue from '@/components/UI/Venue';
import RSVPForm from '@/components/UI/RSVPForm';
import { Heart, Music, Sparkles } from 'lucide-react';

export default function Home() {
  const [reveal, setReveal] = useState(false);
  const weddingDate = '2026-06-20T14:00:00'; 

  useEffect(() => {
    if (reveal) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [reveal]);

  return (
    <main className="min-h-screen relative bg-black">
      {/* Permanent Background Video for Hero */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 grayscale"
        >
          <source src="/videos/walking_sceen.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
      </div>

      {/* 3D Envelope Reveal Overlay */}
      <AnimatePresence>
        {!reveal && (
          <SealCanvas key="seal" onStartReveal={() => setReveal(true)} />
        )}
      </AnimatePresence>

      {/* Main Content Sections */}
      <AnimatePresence>
        {reveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-10 w-full"
          >
            {/* Hero Section Text Area (Overlaying Video) */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center text-center">
              <div className="relative z-10 px-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  {/* Names with Decorative Accessoires */}
                  <div className="flex items-center justify-center gap-4 md:gap-8">
                    {/* Left Ornament */}
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="hidden sm:block"
                    >
                      <svg width="60" height="40" viewBox="0 0 100 40" fill="none" className="text-gold/70">
                        <path d="M100 20C70 20 50 0 0 20C50 40 70 20 100 20Z" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="95" cy="20" r="3" fill="currentColor"/>
                      </svg>
                    </motion.div>

                    <h1 className="script-font text-6xl md:text-8xl text-white drop-shadow-2xl px-2">
                      Asmae Filali <span className="text-gold block">&</span>  Yassine El Hajji
                    </h1>

                    {/* Right Ornament (Mirrored) */}
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="hidden sm:block scale-x-[-1]"
                    >
                      <svg width="60" height="40" viewBox="0 0 100 40" fill="none" className="text-gold/70">
                        <path d="M100 20C70 20 50 0 0 20C50 40 70 20 100 20Z" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="95" cy="20" r="3" fill="currentColor"/>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Date at the Bottom of the Cluster */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="mt-6 flex flex-col items-center"
                  >
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4" />
                    <p className="text-xl md:text-2xl font-light tracking-[0.3em] text-gold/90 uppercase">
                      June 20 <span className="mx-2 text-white/40">•</span> 2026
                    </p>
                    <p className="text-[10px] tracking-[0.5em] text-white/60 uppercase mt-2">Save the Date</p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Scroll Hint Indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">Confirm Your Attendance</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gold/80 to-transparent" />
              </motion.div>
            </section>

            {/* Countdown Section - Clean Modern Style */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center bg-[#fffdfa] overflow-hidden">
              {/* Subtle Background Texture/Decorative Element */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                <Heart className="w-[80vh] h-[80vh] text-gold rotate-12" />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="mb-12 space-y-4">
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-gold/60 block font-medium">
                    The Royal Celebration Begins In
                  </span>
                  <div className="h-[1px] w-12 bg-gold/30 mx-auto" />
                </div>

                {/* The Countdown Component */}
                <Countdown weddingDate={weddingDate} />

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-16 text-xs uppercase tracking-[0.3em] text-gold/40 italic"
                >
                  Until I say "I Do"
                </motion.p>
              </motion.div>
            </section>

            {/* Content Sections - Clean Elegant Layout */}
            <div className="max-w-5xl mx-auto px-6 space-y-0 py-0">
              
              {/* Timeline Section */}
              <section className="relative h-screen w-full flex flex-col items-center justify-between bg-[#fffdfa] overflow-hidden">
                {/* Header - Fixed height at top */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center shrink-0"
                >
                  <Heart className="w-6 h-6 gold-text mb-3" />
                  <h2 className="script-font text-5xl md:text-6xl gold-text">A Day to Remember</h2>
                  <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mt-2">The Wedding Program</p>
                </motion.div>

                {/* Timeline - Takes remaining space */}
                <div className="flex-grow w-full max-w-lg flex items-center justify-center px-6">
                  <Timeline />
                </div>

                {/* Footer hint for this section */}
                <div className="shrink-0 pt-4">
                  <div className="h-px w-12 bg-gold/20 mx-auto" />
                </div>
              </section>

              {/* Venue Section */}
              <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="w-12 h-[1px] bg-gold mb-8" />
                  <h2 className="script-font text-6xl gold-text">The Venue</h2>
                  <p className="text-lg font-light leading-relaxed opacity-80">
                    We invite you to celebrate our union in the majestic halls of St. Royal Cathedral, followed by a grand banquet at the Palace Gardens.
                  </p>
                  <Sparkles className="w-6 h-6 gold-text" />
                </div>
                <Venue />
              </section>

              {/* Musical Section */}
              <section className="text-center space-y-8 py-20 border-y border-gold/10">
                <Music className="w-8 h-8 gold-text mx-auto" />
                <h2 className="script-font text-5xl gold-text">Ballroom Melodies</h2>
                <p className="opacity-60 text-sm max-w-md mx-auto leading-relaxed px-4">
                  Which melody would you like to hear under the crystal chandeliers? Share your favorite song with us.
                </p>
                <div className="max-w-xs mx-auto">
                  <input 
                    type="text" 
                    placeholder="Song Title & Artist"
                    className="w-full bg-transparent border-b border-gold/40 focus:border-gold outline-none py-4 text-center transition-all"
                  />
                </div>
              </section>

              {/* RSVP Section - Keeping a hint of paper for the "card" feel */}
              <section id="rsvp" className="py-10">
                <RSVPForm />
              </section>
            </div>

            {/* Footer */}
            <footer className="py-12 px-6 text-center bg-ivory border-t border-gold/10">
              <h2 className="script-font text-5xl gold-text mb-6">Arthur & Isabella</h2>
              <div className="flex justify-center gap-8 text-[10px] uppercase tracking-[0.3em] opacity-40">
                <span>London</span>
                <span>June 2026</span>
                <span>United Kingdom</span>
              </div>
              <p className="mt-12 text-xs opacity-30 italic">formal attire requested</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
