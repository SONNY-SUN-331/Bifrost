import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero Background" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-sans text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6 font-bold"
        >
          Limited Archive Release
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="font-serif text-6xl md:text-8xl text-brand-ink leading-[0.9] mb-12 tracking-tight font-light"
        >
          ESSENCE <br />
          <span className="italic">No. 01</span>
        </motion.h1 >

        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.2, duration: 1 }}
           className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <a 
            href="#shop" 
            className="group flex items-center gap-4 bg-white text-black px-12 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-brand-gold hover:text-white transition-all duration-500 rounded-none overflow-hidden relative"
          >
            <span className="relative z-10">Shop the Edit</span>
            <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
          </a>
          
          <a 
            href="#" 
            className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-brand-gold transition-colors border-b border-white/10 pb-2 flex items-center gap-2"
          >
            View Journal
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-paper/30 vertical-rl">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-paper/30 to-transparent" />
      </motion.div>
    </section>
  );
}
