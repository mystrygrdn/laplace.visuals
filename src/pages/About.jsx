import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Eye } from 'lucide-react';
import { teamData } from '../data/team';
import TextReveal from '../components/TextReveal';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

export default function About() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen pt-24 pb-20"
    >
      {/* HEADER & PHILOSOPHY */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16 md:mb-24">
        <span className="text-accentSecondary text-xs uppercase font-mono">// Our DNA</span>
        <h1 className="font-syne text-4xl md:text-7xl font-extrabold uppercase mt-2">
          Behind the Lens<span className="text-accentPrimary">.</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mt-12 items-start">
          <div className="border-l-2 border-accentPrimary pl-6">
            <h2 className="font-syne text-2xl md:text-4xl font-extrabold uppercase text-textPrimary leading-tight">
              We don't shoot subjects. <br />We write <span className="font-serif italic text-accentSecondary font-normal lowercase">visual essays</span> in silver halide.
            </h2>
          </div>
          <div>
            <p className="text-textSecondary text-base md:text-lg leading-relaxed font-light">
              Laplace Visuals is a collective of image makers, light shapers, and editors. Founded in 2020, we rejected the traditional sterile styles of commercial photography in favor of editorial, documentary, and high-contrast visuals. We cater to couples and brands who seek raw, unposed truth.
            </p>
          </div>
        </div>
      </section>

      {/* LEAD PHOTOGRAPHER PROFILE */}
      <section className="py-20 px-6 md:px-12 bg-bgSecondary border-y border-white/5 mb-20 md:mb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photographer image */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <div className="aspect-[3/4] relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                alt="Darlian Laplace"
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary via-transparent to-transparent opacity-60" />
            </div>
            <span className="absolute bottom-6 left-6 bg-accentPrimary text-bgPrimary font-syne font-extrabold text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
              Lead Artist
            </span>
          </div>

          {/* Photographer details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-accentSecondary text-xs uppercase font-mono tracking-widest mb-3">
              // Creative Director
            </span>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold uppercase text-textPrimary leading-none mb-6">
              Darlian Laplace<span className="text-accentPrimary">.</span>
            </h2>
            
            <blockquote className="border-l-4 border-accentSecondary pl-6 italic text-textPrimary text-lg md:text-xl font-serif mb-6 leading-relaxed">
              "The photographer is an observer, not a choreographer. A wedding is a living, breathing play; product is architectural art. We structure light to match the mood."
            </blockquote>
            
            <p className="text-textSecondary text-sm md:text-base leading-relaxed font-light space-y-4">
              Darlian spent a decade working as a commercial fashion photographer in Milan and Tokyo before returning to Indonesia to launch Laplace Visuals. His signature style—blending high-fashion editorial composition with analogue film grain textures—has redefined modern wedding and product branding aesthetics.
            </p>
            
            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8 mt-8">
              <div>
                <span className="text-accentPrimary font-syne text-xl md:text-2xl font-black block">35MM</span>
                <span className="text-textSecondary text-[10px] uppercase tracking-wider font-mono">Preferred Focal</span>
              </div>
              <div>
                <span className="text-accentPrimary font-syne text-xl md:text-2xl font-black block">150+</span>
                <span className="text-textSecondary text-[10px] uppercase tracking-wider font-mono">Weddings Shot</span>
              </div>
              <div>
                <span className="text-accentPrimary font-syne text-xl md:text-2xl font-black block">M-Format</span>
                <span className="text-textSecondary text-[10px] uppercase tracking-wider font-mono">Camera System</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accentSecondary text-xs uppercase font-mono tracking-widest">// The Syndicate</span>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold uppercase mt-2">
            The Creative Crew<span className="text-accentPrimary">.</span>
          </h2>
          <p className="text-textSecondary text-sm max-w-md mx-auto mt-4 leading-relaxed font-light">
            The specialized craftsmen and women who translate fleeting moments into permanent visual relics.
          </p>
        </div>

        {/* TEAM CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {teamData.map((member) => (
            <div 
              key={member.id}
              className="group flex flex-col bg-bgSecondary border border-white/5 rounded-3xl overflow-hidden hover:border-accentSecondary/20 transition-all duration-300 shadow-xl"
            >
              {/* IMAGE HOLDER */}
              <div className="overflow-hidden aspect-[4/5] relative">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-accentSecondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* CARD INFO */}
              <div className="p-6 md:p-8 flex flex-col">
                <h3 className="font-syne text-xl font-bold text-textPrimary group-hover:text-accentSecondary transition-colors">
                  {member.name}
                </h3>
                <span className="text-accentPrimary text-xs font-semibold uppercase tracking-wider mt-1">
                  {member.role}
                </span>
                
                <p className="text-textSecondary text-xs mt-4 leading-relaxed font-mono border-t border-white/5 pt-4">
                  <span className="text-textPrimary font-semibold font-sans block mb-1">FACTOID:</span>
                  {member.funFact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
