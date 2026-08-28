import React from 'react';

export default function Marquee({ items = [] }) {
  // Duplicate items twice to ensure the loop wraps seamlessly on wide monitors
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-bgSecondary border-y border-white/5 py-5 md:py-8 select-none relative z-10 my-10">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] transition-all">
        {marqueeItems.map((item, idx) => (
          <span 
            key={idx} 
            className="font-syne text-2xl md:text-6xl font-black uppercase tracking-wider mx-6 md:mx-12 text-textPrimary flex items-center gap-4 md:gap-12"
          >
            {item}
            <span className="text-accentPrimary text-xl md:text-4xl select-none">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
