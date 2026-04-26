import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
        >
          {/* Rainbow Light animation (45 degree, left to right) */}
          <motion.div 
            initial={{ x: '-150%', opacity: 0 }}
            animate={{ x: '150%', opacity: [0, 0.5, 0] }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent, rgba(255,0,0,0.2), rgba(255,165,0,0.2), rgba(255,255,0,0.2), rgba(0,255,0,0.2), rgba(0,0,255,0.2), rgba(75,0,130,0.2), rgba(238,130,238,0.2), transparent)',
              filter: 'blur(100px)',
              width: '200%',
              height: '100%',
            }}
          />

          <div className="relative text-center">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '1.5em' }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-brand-paper font-serif text-5xl md:text-7xl uppercase font-light pl-[1.5em]"
            >
              Bifrost
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-8 text-brand-gold font-sans text-[10px] uppercase tracking-[0.5em] opacity-60"
            >
              Connecting Worlds through Quality
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            onClick={() => setIsVisible(false)}
            className="absolute bottom-12 text-white/20 hover:text-white/60 transition-colors text-[9px] uppercase tracking-widest outline-none"
          >
            Skip Animation
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
