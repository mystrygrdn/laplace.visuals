import React from 'react';
import { motion } from 'framer-motion';
import TeamIDCards from '../components/TeamIDCards';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

const STATS = [
  { value: '2020', label: 'Founded' },
  { value: '150+', label: 'Projects Shot' },
  { value: '6', label: 'Crew Members' },
  { value: '35MM', label: 'Signature Format' }
];

export default function About() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen pt-24 pb-20"
    >
      {/* HERO & PHILOSOPHY */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between border-b border-textPrimary/10 pb-6 mb-14 md:mb-20">
          <span className="text-accentSecondary text-xs uppercase font-mono tracking-widest">
            // Our DNA
          </span>
          <span className="hidden md:inline text-textSecondary/50 text-xs uppercase font-mono tracking-widest">
            Est. 2020
          </span>
        </div>

        <h1 className="font-syne font-extrabold uppercase leading-[0.92] text-textPrimary">
          <span className="block text-4xl md:text-7xl">We shoot</span>
          <span className="block text-4xl md:text-7xl">
            behind the{' '}
            <span className="font-serif italic font-normal lowercase text-accentPrimary">
              lens
            </span>
            .
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-14 md:mt-20 items-start">
          <div className="lg:col-span-7 border-l-2 border-accentPrimary pl-6">
            <p className="font-syne text-xl md:text-3xl font-extrabold uppercase text-textPrimary leading-snug">
              We don't shoot subjects. We write{' '}
              <span className="font-serif italic text-accentSecondary font-normal lowercase">
                visual essays
              </span>{' '}
              in silver halide.
            </p>
          </div>
          <div className="lg:col-span-5">
            <p className="text-textSecondary text-base md:text-lg leading-relaxed font-light">
              Laplace Visuals is a collective of image makers, light shapers, and editors. Founded in 2020, we rejected the traditional sterile styles of commercial photography in favor of editorial, documentary, and high-contrast visuals. We cater to couples and brands who seek raw, unposed truth.
            </p>
          </div>
        </div>

        {/* studio facts — real info, replaces the old ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 md:mt-24 pt-10 border-t border-textPrimary/10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <span className="font-syne text-2xl md:text-4xl font-black text-accentPrimary block leading-none">
                {stat.value}
              </span>
              <span className="text-textSecondary text-[11px] md:text-xs uppercase tracking-widest font-mono mt-2 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* MEET THE TEAM — hanging lanyard ID cards */}
      <div className="mt-20 md:mt-28">
        <TeamIDCards />
      </div>
    </motion.div>
  );
}