import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2 } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const horizontalSectionRef = useRef(null);
  const horizontalContainerRef = useRef(null);

  const categories = ['All', 'Graduation', 'Events'];

  // Filter items
  const filteredItems = selectedCategory === 'All'
    ? portfolioData
    : portfolioData.filter(item => item.category === selectedCategory);

  // Featured items for horizontal scroll (take the first 5 elements)
  const horizontalItems = portfolioData.slice(0, 5);

  // Set up GSAP Horizontal Scroll Pinning (Desktop only)
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    const container = horizontalContainerRef.current;
    const list = horizontalSectionRef.current;
    
    if (!isDesktop || !container || !list) return;

    // Force recalculate elements width
    const totalScrollWidth = list.scrollWidth - window.innerWidth;
    
    if (totalScrollWidth <= 0) return;

    const scrollAnim = gsap.to(list, {
      x: -totalScrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalScrollWidth}`,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      scrollAnim.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrevPhoto = () => {
    setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen pt-24"
    >
      {/* HEADER */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <span className="text-accentSecondary text-xs uppercase font-mono">// Our Vault</span>
        <h1 className="font-syne text-4xl md:text-7xl font-extrabold uppercase mt-2">
          Visual Archive<span className="text-accentPrimary">.</span>
        </h1>
        <p className="text-textSecondary text-sm md:text-lg max-w-md leading-relaxed mt-4">
          Explore our collection of authentic stories, frame-by-frame. Filter by category or explore the highlights.
        </p>
      </section>

      {/* HORIZONTAL SHOWCASE (PINNED ON SCROLL) */}
      <div className="hidden lg:block w-full" ref={horizontalContainerRef}>
        <div className="h-screen w-full flex flex-col justify-center bg-bgSecondary overflow-hidden relative">
          <div className="absolute top-8 left-12 z-10 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accentPrimary animate-pulse" />
            <span className="text-[11px] font-syne font-bold uppercase tracking-widest text-textPrimary">
              Featured Canvas (Vertical Scroll to Pan)
            </span>
          </div>

          <div ref={horizontalSectionRef} className="flex flex-row items-center gap-12 px-12 whitespace-nowrap will-change-transform">
            {horizontalItems.map((item) => (
              <div 
                key={`horiz-${item.id}`} 
                className="inline-block relative shrink-0 aspect-[16/10] h-[65vh] bg-bgPrimary border border-white/5 rounded-3xl overflow-hidden group shadow-2xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary/90 via-transparent to-transparent flex flex-col justify-end p-8">
                  <span className="text-accentSecondary text-xs font-bold uppercase tracking-widest mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-syne text-3xl font-bold text-textPrimary whitespace-normal leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-textSecondary text-sm mt-2 flex items-center gap-1.5 font-light">
                    <MapPin className="w-4 h-4 text-accentPrimary" /> {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE SHOWCASE ROW (NATIVE HORIZONTAL SCROLL) */}
      <div className="lg:hidden w-full px-6 mb-16">
        <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-accentSecondary block mb-4">
          Swipe Highlights
        </span>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 select-none">
          {horizontalItems.map((item) => (
            <div 
              key={`horiz-mob-${item.id}`} 
              className="snap-start shrink-0 w-[80vw] aspect-[4/3] bg-bgSecondary border border-white/5 rounded-2xl overflow-hidden relative"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary/90 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-accentSecondary text-[10px] font-bold uppercase tracking-widest mb-1">
                  {item.category}
                </span>
                <h3 className="font-syne text-lg font-bold text-textPrimary">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GALLERY FILTER & GRID */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        {/* FILTER BAR */}
        <div className="flex flex-wrap gap-2 md:gap-4 justify-start md:justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-syne text-xs uppercase tracking-widest transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-accentSecondary text-bgPrimary border-accentSecondary font-bold scale-105'
                  : 'bg-bgSecondary text-textSecondary border-white/10 hover:border-textPrimary hover:text-textPrimary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PROJECTS GRID (MASONRY-LIKE GRID) */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(idx)}
                className="break-inside-avoid relative overflow-hidden group bg-bgSecondary border border-white/5 rounded-2xl cursor-pointer hover:border-accentPrimary/25 transition-colors duration-300 shadow-lg"
              >
                {/* PHOTO CONTAINER */}
                <div className={`relative overflow-hidden portfolio-image-card ${
                  item.aspect === 'tall' 
                    ? 'aspect-[3/4]' 
                    : item.aspect === 'wide' 
                      ? 'aspect-[3/2]' 
                      : 'aspect-[1/1]'
                }`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Floating Expand Icon */}
                  <div className="absolute top-4 right-4 bg-bgPrimary/80 w-8 h-8 rounded-full flex items-center justify-center text-textPrimary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* BOTTOM CAPTION */}
                <div className="p-5 flex flex-col">
                  <div className="flex justify-between items-center">
                    <h4 className="font-syne text-md font-bold group-hover:text-accentPrimary transition-colors duration-300">
                      {item.title}
                    </h4>
                    <span className="text-[9px] font-mono border border-accentSecondary/30 text-accentSecondary bg-accentSecondary/5 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-textSecondary mt-2 pt-2 border-t border-white/5 font-light">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accentPrimary" /> {item.location}
                    </span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bgPrimary/98 backdrop-blur-md flex flex-col justify-center items-center p-4 md:p-10 select-none"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-textSecondary hover:text-accentPrimary transition-colors w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-6 text-textSecondary hover:text-accentPrimary transition-colors w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hidden md:flex"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-6 text-textSecondary hover:text-accentPrimary transition-colors w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hidden md:flex"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Photo & Caption wrapper */}
            <div className="max-w-5xl w-full h-[75vh] flex flex-col justify-center items-center gap-4">
              <motion.img
                key={filteredItems[lightboxIndex].image}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-2xl"
              />

              {/* Caption */}
              <div className="text-center">
                <span className="text-[10px] tracking-widest text-accentSecondary font-bold uppercase">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="font-syne text-xl md:text-2xl font-bold text-textPrimary mt-1">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-textSecondary text-xs md:text-sm mt-1.5 flex items-center justify-center gap-1.5 font-light">
                  <span>Client: {filteredItems[lightboxIndex].client}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accentPrimary" /> {filteredItems[lightboxIndex].location}</span>
                  <span>•</span>
                  <span>{filteredItems[lightboxIndex].year}</span>
                </p>
              </div>
            </div>

            {/* Mobile swipe hint */}
            <div className="absolute bottom-6 flex gap-8 md:hidden text-xs text-textSecondary">
              <button onClick={handlePrevPhoto} className="px-4 py-2 border border-white/10 rounded-full flex items-center gap-1 uppercase tracking-wider font-mono">
                Prev
              </button>
              <button onClick={handleNextPhoto} className="px-4 py-2 border border-white/10 rounded-full flex items-center gap-1 uppercase tracking-wider font-mono">
                Next
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
