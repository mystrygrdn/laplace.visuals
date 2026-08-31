import React from 'react';
import { motion } from 'framer-motion';
import TeamIDCards from '../components/TeamIDCards';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

// manual-lens barrel ring with aperture-scale tick marks
function LensRing({ className }) {
  const ticks = Array.from({ length: 48 });
  return (
    <svg viewBox="0 0 400 400" className={className}>
      <circle cx="200" cy="200" r="188" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {ticks.map((_, i) => {
        const angle = (360 / ticks.length) * i;
        const isMajor = i % 4 === 0;
        return (
          <line
            key={i}
            x1="200"
            y1={isMajor ? 10 : 16}
            x2="200"
            y2="24"
            stroke="currentColor"
            strokeWidth={isMajor ? 1.5 : 1}
            opacity={isMajor ? 0.65 : 0.3}
            transform={`rotate(${angle} 200 200)`}
          />
        );
      })}
      <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

// real typewriter effect — types the headline out character by character
function useTypewriter(text, { speed = 55, startDelay = 500 } = {}) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let raf;
    const start = setTimeout(function tick() {
      setCount((c) => {
        const next = c + 1;
        if (next < text.length) raf = setTimeout(tick, speed);
        return next;
      });
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { typed: text.slice(0, count), done: count >= text.length };
}

const HEADLINE = 'BEHIND\nLAPLACE';

function Hero() {
  const { typed, done } = useTypewriter(HEADLINE, { speed: 55, startDelay: 500 });

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-bgPrimary px-6 pt-36 md:pt-44 pb-16">
      {/* soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,0,0,0.06),transparent_60%)]" />

      {/* calm concentric rings */}
      <motion.div
        className="absolute w-[380px] h-[380px] md:w-[560px] md:h-[560px] text-accentPrimary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <LensRing className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full border border-textPrimary/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      />

      {/* stamp badge — sits safely below the nav now */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="hidden md:flex absolute top-16 lg:top-20 right-[14%] lg:right-[20%] w-20 h-20 rounded-full border border-dashed border-accentSecondary/50 items-center justify-center text-center z-10"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest text-accentSecondary leading-tight">
          Est.
          <br />
          2020
        </span>
      </motion.div>

      {/* typewriter headline */}
      <h1
        style={{ whiteSpace: 'pre-line' }}
        className="relative z-10 text-center font-syne font-black uppercase leading-[0.88] text-textPrimary text-6xl sm:text-7xl md:text-[7.5rem]"
      >
        {typed}
        <motion.span
          className="inline-block w-[0.06em] h-[0.75em] bg-accentPrimary ml-1 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
        {done && <span className="text-accentPrimary">.</span>}
      </h1>

      {/* highlight underline, reveals once typing is done */}
      {done && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="relative z-10 h-2.5 md:h-3 w-44 md:w-64 bg-accentPrimary/20 mt-3 origin-left"
        />
      )}

      {/* philosophy, appears once the headline finishes typing */}
      {done && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative z-10 max-w-xl text-center text-textSecondary text-base md:text-lg font-light leading-relaxed mt-8"
        >
          We don't shoot subjects — we write{' '}
          <span className="font-serif italic text-accentSecondary">visual essays</span> in silver halide. A
          collective of image makers, light shapers, and editors, raw and unposed since 2020.
        </motion.p>
      )}
    </section>
  );
}

export default function About() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen"
    >
      <Hero />

      <div className="pb-20">
        <TeamIDCards />
      </div>
    </motion.div>
  );
}