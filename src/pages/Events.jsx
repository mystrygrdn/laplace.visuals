import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { eventsData } from '../data/events';

gsap.registerPlugin(ScrollTrigger);

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

export default function Events() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    // Animating timeline items on scroll
    const items = el.querySelectorAll('.timeline-item');
    items.forEach((item) => {
      gsap.fromTo(
        item.querySelector('.timeline-content'),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      gsap.fromTo(
        item.querySelector('.timeline-dot'),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  }, []);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen pt-24 pb-20"
    >
      {/* HEADER */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <span className="text-accentSecondary text-xs uppercase font-mono">// Studio Footsteps</span>
        <h1 className="font-syne text-4xl md:text-7xl font-extrabold uppercase mt-2">
          Event Chronicle<span className="text-accentPrimary">.</span>
        </h1>
        <p className="text-textSecondary text-sm md:text-lg max-w-md leading-relaxed mt-4">
          A chronological trace of projects we've covered, campaigns we've produced, and upcoming destination shoot locations.
        </p>
      </section>

      {/* TIMELINE SECTION */}
      <section ref={timelineRef} className="px-6 md:px-12 max-w-5xl mx-auto relative">
        {/* Vertical Center Line */}
        <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

        {/* Timeline List */}
        <div className="space-y-16 md:space-y-24">
          {eventsData.map((event, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={event.id} 
                className="timeline-item flex flex-col md:flex-row relative items-start md:items-center"
              >
                {/* Timeline Dot */}
                <div className="timeline-dot absolute left-[19px] md:left-1/2 top-1.5 md:top-1/2 w-3.5 h-3.5 rounded-full bg-accentPrimary border-[3px] border-bgPrimary -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_10px_rgba(255,94,0,0.5)]" />

                {/* Left/Right Container placement */}
                <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${
                  isEven ? 'md:pr-16 md:text-right md:order-1' : 'md:pl-16 md:order-2 md:col-start-2'
                }`}>
                  <div className="timeline-content bg-bgSecondary border border-white/5 p-6 md:p-8 rounded-3xl hover:border-accentSecondary/20 transition-all duration-300 shadow-xl">
                    
                    {/* Status & Date */}
                    <div className={`flex flex-wrap items-center gap-3 mb-4 ${
                      isEven ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      <span className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                        event.status === 'Upcoming' 
                          ? 'bg-accentSecondary/20 text-accentSecondary border border-accentSecondary/30' 
                          : 'bg-white/5 text-textSecondary'
                      }`}>
                        {event.status}
                      </span>
                      <span className="text-xs text-accentPrimary font-semibold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {event.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-syne text-xl md:text-2xl font-bold text-textPrimary leading-tight">
                      {event.title}
                    </h3>
                    
                    {/* Date and Location info */}
                    <p className={`text-xs text-textSecondary mt-2 flex flex-wrap items-center gap-4 ${
                      isEven ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      <span>{event.date}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accentSecondary" /> {event.location}
                      </span>
                    </p>

                    {/* Description */}
                    <p className="text-textSecondary text-sm mt-4 leading-relaxed font-light">
                      {event.description}
                    </p>

                    {/* Previews Thumbnails Grid */}
                    {event.previews && event.previews.length > 0 && (
                      <div className={`mt-6 grid grid-cols-3 gap-3 ${
                        isEven ? 'md:justify-items-end' : 'md:justify-items-start'
                      }`}>
                        {event.previews.map((img, i) => (
                          <div 
                            key={i} 
                            className="aspect-[4/3] rounded-lg overflow-hidden border border-white/5 hover:border-accentPrimary/50 transition-colors duration-300 relative group"
                          >
                            <img
                              src={img}
                              alt="Event preview"
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty buffer box for symmetric timeline */}
                <div className={`hidden md:block w-1/2 ${isEven ? 'md:order-2' : 'md:order-1'}`} />
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
