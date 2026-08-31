import React from 'react';
import { motion } from 'framer-motion';
import { teamData } from '../data/team';

// jagged starburst blob, dipakai sebagai aksen di pojok tiap card
function Starburst({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        d="M100 0 L114 66 L172 26 L128 88 L200 100 L128 112 L172 174 L114 134 L100 200 L86 134 L28 174 L72 112 L0 100 L72 88 L28 26 L86 66 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// clip metalik di ujung lanyard
function Carabiner() {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" className="drop-shadow-sm shrink-0">
      <circle cx="13" cy="7" r="5.5" fill="none" stroke="#a3a3a8" strokeWidth="2.5" />
      <path
        d="M7.5 12.5 L7.5 22 Q7.5 26 13 26 Q18.5 26 18.5 22 L18.5 12.5"
        fill="none"
        stroke="#a3a3a8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// tali bertekstur (biar kebaca di background terang MAUPUN gelap) + slider berlogo "L."
function Lanyard() {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className="w-6 md:w-7 h-9 md:h-11 rounded-t-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.25)] ring-1 ring-black/10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #e4e4e7 0px, #e4e4e7 4px, #c9c9cf 4px, #c9c9cf 8px)'
        }}
      />
      <div className="w-8 md:w-9 h-4 md:h-5 -mt-0.5 rounded-[2px] bg-black flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.35)] shrink-0">
        <span className="font-syne font-black text-[8px] md:text-[9px] text-white tracking-widest">
          L<span className="text-accentPrimary">.</span>
        </span>
      </div>
      <div
        className="w-6 md:w-7 h-5 md:h-6 shadow-[0_1px_3px_rgba(0,0,0,0.25)] ring-1 ring-black/10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #e4e4e7 0px, #e4e4e7 4px, #c9c9cf 4px, #c9c9cf 8px)'
        }}
      />
      <Carabiner />
    </div>
  );
}

// tilt & swing dibikin jauh lebih halus — cukup buat kesan "3D ngegantung",
// bukan ayunan liar yang bikin pojok card numpuk ke card sebelah
const TILTS = [-3, 2.5, -2, 3, -2.5, 2];
const DURATIONS = [5.2, 5.8, 5.4, 6.1, 5.6, 5.9];

function IDBadge({ member, index }) {
  const tilt = TILTS[index % TILTS.length];
  const duration = DURATIONS[index % DURATIONS.length];
  const accent = index % 2 === 0 ? 'text-accentPrimary' : 'text-accentSecondary';

  return (
    <motion.div
      className="relative flex flex-col items-center"
      style={{ transformOrigin: 'top center' }}
      initial={{ rotate: tilt }}
      animate={{ rotate: [tilt, tilt * -0.5, tilt] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
      whileHover={{ scale: 1.04 }}
    >
      <Lanyard />

      {/* card */}
      <div className="relative w-40 sm:w-48 md:w-56 h-64 sm:h-72 md:h-80 rounded-2xl bg-white overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-black/10">
        {/* pivot hole */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/25 z-40" />

        {/* logo header */}
        <div className="absolute top-0 inset-x-0 h-8 flex items-center justify-center bg-white z-30 border-b border-black/5">
          <span className="font-syne font-black uppercase text-[10px] tracking-[0.2em] text-black">
            Laplace<span className="text-accentPrimary">.</span>
          </span>
        </div>

        {/* vertical role strip on the left edge */}
        <div className="absolute left-0 top-8 bottom-0 w-7 md:w-8 bg-black z-20 flex items-center justify-center overflow-hidden">
          <span
            className="font-syne font-black uppercase text-[10px] md:text-[11px] tracking-[0.3em] text-white whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            {member.role}
          </span>
        </div>

        {/* starburst accent, peeking behind the photo */}
        <Starburst
          className={`absolute top-3 left-1 w-24 h-24 md:w-28 md:h-28 z-10 opacity-90 ${accent}`}
        />

        {/* photo */}
        <img
          src={member.image}
          alt={member.name}
          draggable={false}
          loading="lazy"
          className="absolute top-8 left-7 md:left-8 right-0 bottom-0 w-[calc(100%-1.75rem)] md:w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover grayscale z-0"
        />

        {/* name plate */}
        <div className="absolute bottom-0 left-7 md:left-8 right-0 bg-black px-4 py-3 z-20">
          <p className="font-syne italic font-black text-white text-xl md:text-2xl leading-none">
            {member.name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamIDCards() {
  return (
    <section className="relative w-full bg-bgPrimary py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 flex flex-col items-center text-center border-b border-textPrimary/10 pb-8">
          <span className="text-accentSecondary text-xs uppercase font-mono tracking-widest">
            // Backstage Pass
          </span>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold uppercase text-textPrimary mt-2">
            Meet Our Team<span className="text-accentPrimary">.</span>
          </h2>
          <span className="text-textSecondary/50 font-mono text-xs uppercase tracking-widest mt-3">
            ID · Access All Areas
          </span>
        </div>

        {/* gap dilebarin biar card yang miring nggak numpuk sama tetangganya */}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-20 md:gap-x-20 pt-10">
          {teamData.map((member, i) => (
            <IDBadge key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}