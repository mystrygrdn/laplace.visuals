import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Count up from 0 to 100
    const duration = 2000; // 2 seconds total loader
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400); // Small pause at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%', 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] bg-bgPrimary flex flex-col justify-center items-center select-none"
    >
      <div className="relative flex flex-col items-center">
        {/* Camera Viewfinder Box around Logo */}
        <div className="relative p-6 md:p-8 border border-white/10 rounded-3xl mb-8 flex items-center justify-center">
          {/* Viewfinder corner lines */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accentPrimary" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accentPrimary" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-accentPrimary" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-accentPrimary" />
          
          {/* Camera specs tags */}
          <span className="absolute -top-3 left-6 bg-bgPrimary px-2 text-[9px] font-mono text-textSecondary uppercase tracking-widest">
            [ RAW ]
          </span>
          <span className="absolute -bottom-3 right-6 bg-bgPrimary px-2 text-[9px] font-mono text-textSecondary uppercase tracking-widest">
            [ 35mm F/1.2 ]
          </span>

          {/* Logo container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-white flex items-center justify-center"
          >
            <img 
              src="/logo.jpg" 
              alt="Laplace Logo" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </div>

        {/* Loading details */}
        <div className="text-center">
          <h2 className="font-syne text-xs uppercase tracking-[0.3em] text-textSecondary mb-2">
            Initializing Laplace Lens
          </h2>
          
          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden relative">
            <motion.div 
              className="h-full bg-accentPrimary absolute top-0 left-0"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage text */}
          <span className="font-syne font-black text-3xl md:text-5xl text-accentPrimary block mt-4 tabular-nums">
            {Math.floor(progress).toString().padStart(3, '0')}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
