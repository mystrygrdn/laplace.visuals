import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import TeamIDCards from '../components/TeamIDCards';
import { behindTheScenesPhotos } from '../data/behindthescene';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

const TILTS = [-2, 1.5, -1, 2, -1.5, 1];

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString('en-GB', { hour12: false });
    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Hero() {
  const trackRef = useRef(null);
  const time = useClock();
  const photos = [...behindTheScenesPhotos, ...behindTheScenesPhotos];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 32,
        ease: 'none',
        repeat: -1
      });

      gsap.fromTo(
        '.hero-enter',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] md:min-h-screen bg-bgPrimary overflow-hidden flex flex-col pt-36 md:pt-44 pb-8">
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-accentPrimary/15 blur-[110px] rounded-full z-0" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-accentPrimary/15 blur-[110px] rounded-full z-0" />

      <div className="hero-enter relative z-20 px-6 text-center">
        <h1 className="font-syne font-black uppercase leading-none text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
          Behind Laplace
        </h1>
      </div>

      <div className="hero-enter relative z-20 mt-14 md:mt-16 overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-3 md:gap-5 px-6">
          {photos.map((photo, i) => (
            <div
              key={`${photo.id}-${i}`}
              className="w-40 h-52 sm:w-52 sm:h-64 md:w-64 md:h-80 shrink-0 overflow-hidden rounded-sm shadow-2xl"
              style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
            >
              <img
                src={photo.image}
                alt={photo.alt}
                draggable={false}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hero-enter relative z-20 mt-auto pt-10 px-6 md:px-12 flex items-end justify-between gap-6">
        <span className="font-mono text-xs text-textSecondary/60 uppercase tracking-widest">Est. 2026</span>
        <p className="hidden md:block max-w-md text-center text-textSecondary text-sm md:text-base font-light leading-relaxed">
          We are a collective of image makers, light shapers, and editors — writing raw, unposed visual
          essays in silver halide.
        </p>
        <span className="font-mono text-xs text-textSecondary/60 tracking-widest tabular-nums">{time}</span>
      </div>
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