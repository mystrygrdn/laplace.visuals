import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import ThreeHeroBg from '../components/ThreeHeroBg';
import Marquee from '../components/Marquee';
import TextReveal from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';
import { portfolioData } from '../data/portfolio';
import { eventsData } from '../data/events';

// Framer motion transition animation config
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

export default function Home() {
  // Highlight 3 featured items
  const featuredWorks = portfolioData.slice(0, 3);
  
  // Highlight the latest 2 events
  const latestEvents = eventsData.slice(0, 2);

  const marqueeKeywords = [
    "Photography", "Videography", "Graduation", "Events", "Videography",
  ];

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen pt-24"
    >
    {/* HERO SECTION — -mt-24 nge-cancel pt-24 di wrapper atas, biar foto mulai persis dari atas viewport */}
<section className="relative -mt-24 overflow-hidden border-b border-white/5">
  <ThreeHeroBg />
</section>

      {/* MARQUEE RUNNING TEXT */}
      <Marquee items={marqueeKeywords} />

      {/* FEATURED WORKS SECTION */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
          <div>
            <span className="text-accentSecondary text-xs uppercase font-mono">// Highlighted Projects</span>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold uppercase mt-2">
              Featured Narratives<span className="text-accentPrimary">.</span>
            </h2>
          </div>
          <Link to="/portfolio" className="group mt-4 md:mt-0 flex items-center gap-2 text-sm uppercase tracking-wider font-semibold font-syne text-accentPrimary hover:text-textPrimary transition-colors duration-300">
            View All Portfolios <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {featuredWorks.map((work, idx) => (
            <Link 
              key={work.id} 
              to="/portfolio"
              className="group flex flex-col relative overflow-hidden bg-bgSecondary border border-white/5 rounded-2xl hover:border-accentPrimary/20 transition-all duration-300"
            >
              {/* IMAGE HOLDER */}
              <div className="overflow-hidden aspect-[4/5] relative portfolio-image-card">
                <img
                  src={work.image}
                  alt={work.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Accent overlay color shift on hover */}
                <div className="absolute inset-0 bg-accentPrimary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-4 left-4 bg-bgPrimary/80 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-accentSecondary">
                  {work.category}
                </span>
              </div>

              {/* CARD INFO */}
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-syne text-lg font-bold group-hover:text-accentPrimary transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-textSecondary text-xs mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accentSecondary" strokeWidth={2.5} /> {work.location}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-textSecondary group-hover:text-accentPrimary group-hover:border-accentPrimary group-hover:bg-accentPrimary/5 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LATEST EVENTS SECTION */}
      <section className="py-20 px-6 md:px-12 bg-bgSecondary border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-accentSecondary text-xs uppercase font-mono">// Studio Footprints</span>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold uppercase mt-2">
              Latest Campaigns<span className="text-accentPrimary">.</span>
            </h2>
          </div>

          <div className="divide-y divide-white/5">
            {latestEvents.map((event) => (
              <div 
                key={event.id}
                className="group py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:px-4 transition-all duration-300 hover:bg-bgPrimary/30 rounded-xl"
              >
                <div className="flex items-start gap-4 md:gap-8">
                  <span className="font-syne text-xl md:text-3xl font-extrabold text-accentPrimary/40 group-hover:text-accentPrimary transition-colors">
                    0{event.id}
                  </span>
                  <div>
                    <span className={`inline-block text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-3 ${
                      event.status === 'Upcoming' 
                        ? 'bg-accentSecondary/20 text-accentSecondary border border-accentSecondary/30' 
                        : 'bg-white/5 text-textSecondary'
                    }`}>
                      {event.status}
                    </span>
                    <h3 className="font-syne text-xl md:text-2xl font-bold group-hover:text-accentSecondary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-textSecondary text-xs md:text-sm mt-2 max-w-xl leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                  <span className="text-sm font-semibold flex items-center gap-2 text-textPrimary">
                    <Calendar className="w-4 h-4 text-accentPrimary" /> {event.date}
                  </span>
                  <span className="text-xs text-textSecondary flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accentSecondary" /> {event.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link to="/events">
              <MagneticButton className="border border-white/10 hover:border-accentPrimary hover:bg-accentPrimary/5 text-textPrimary font-syne font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-full transition-all">
                See Full Schedule
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}