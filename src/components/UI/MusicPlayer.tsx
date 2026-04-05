'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Custom event listener to start music when the invitation phase ends
    const handleStartMusic = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 34;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('Autoplay blocked: Manual toggle needed.', err);
        });
      }
    };

    window.addEventListener('start-music', handleStartMusic);
    
    // Fallback: If user interacts after the phase is already ended, it will start.
    // However, the 'start-music' event from Page is the primary way.

    return () => window.removeEventListener('start-music', handleStartMusic);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    if (audioRef.current) {
      // Loop back to second 34
      audioRef.current.currentTime = 34;
      audioRef.current.play();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] group">
      <audio 
        ref={audioRef} 
        src="/songs/main_bg_song.mp3" 
        onEnded={handleEnded}
      />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-ivory text-[10px] py-1 px-3 rounded-sm whitespace-nowrap tracking-widest uppercase pointer-events-none">
        {isPlaying ? 'Mute' : 'Play Music'}
      </div>

      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="bg-black/20 backdrop-blur-md border border-white/10 p-3.5 rounded-full shadow-2xl text-beige/80 hover:text-beige transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div 
              key="on" 
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }} 
              animate={{ opacity: 1, rotate: 0, scale: 1 }} 
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            >
              <Volume2 className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div 
              key="off" 
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }} 
              animate={{ opacity: 1, rotate: 0, scale: 1 }} 
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            >
              <VolumeX className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation when playing */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 border-2 border-beige rounded-full -z-10"
          />
        )}
      </motion.button>
    </div>
  );
}
