import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
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
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Glow grows as the page actually finishes loading — the logo visibly
  // "charges up" instead of pulsing randomly, so the animation means something.
  const glowStrength = 0.15 + (progress / 100) * 0.55;

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[9999] bg-bgPrimary flex flex-col justify-center items-center select-none"
    >
      <div className="flex flex-col items-center">
        {/* Logo — springs in, floats gently, glows brighter as progress climbs */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: 0,
            y: [0, -10, 0],
          }}
          transition={{
            scale: { type: 'spring', stiffness: 120, damping: 12 },
            rotate: { type: 'spring', stiffness: 120, damping: 12 },
            opacity: { duration: 0.5 },
            y: {
              delay: 0.6,
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="mb-10"
        >
          <motion.img
            src="src/assets/laplacelogo.webp"
            alt="Laplace Visuals"
            animate={{
              filter: `drop-shadow(0 0 ${18 * glowStrength}px rgba(255,94,0,${glowStrength}))`,
            }}
            transition={{ duration: 0.1 }}
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
          />
        </motion.div>

        {/* Loading label */}
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-textSecondary mb-4"
        >
          Loading Laplace Visuals
        </motion.span>

        {/* Progress bar */}
        <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-accentPrimary absolute top-0 left-0"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <span className="font-display font-black text-2xl md:text-3xl text-textPrimary block mt-4 tabular-nums">
          {Math.floor(progress).toString().padStart(3, '0')}%
        </span>
      </div>
    </motion.div>
  );
}