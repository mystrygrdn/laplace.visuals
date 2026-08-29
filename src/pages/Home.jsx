import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import ThreeHeroBg from '../components/ThreeHeroBg';
import Marquee from '../components/Marquee';
import TextReveal from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';

// Framer motion transition animation config
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

// =============================================
// DUMMY DATA — layanan yang ditawarkan. Ganti teks & gambar sesuai kebutuhan asli.
// =============================================
const servicesData = [
  {
    id: 1,
    number: '01',
    title: 'Graduation Outdoor Photoshoot',
    description:
      'An outdoor graduation photoshoot with a candid, cinematic style — capturing your graduation moments with friends and family.',
    images: [
      'https://picsum.photos/seed/svc-grad1/1000/750',
      'https://picsum.photos/seed/svc-grad2/1000/750',
      'https://picsum.photos/seed/svc-grad3/1000/750',
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Event Coverage',
    description:
      'Full documentation for campus events, concerts, and corporate events — from the preparation to the highlight moments.',
    images: [
      'https://picsum.photos/seed/svc-event1/1000/750',
      'https://picsum.photos/seed/svc-event2/1000/750',
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Studio Portrait Session',
    description:
      'A studio portrait session with professional lighting, perfect for personal branding or personal keepsakes.',
    images: [
      'https://picsum.photos/seed/svc-studio1/1000/750',
      'https://picsum.photos/seed/svc-studio2/1000/750',
    ],
  },
];

// =============================================
// SERVICES SECTION — interactive list + image carousel (white theme)
// =============================================
function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  const activeService = servicesData[activeIndex];

  const handleSelect = (idx) => {
    setActiveIndex(idx);
    setPhotoIndex(0);
  };

  const handlePrev = () =>
    setPhotoIndex((p) => (p - 1 + activeService.images.length) % activeService.images.length);
  const handleNext = () =>
    setPhotoIndex((p) => (p + 1) % activeService.images.length);

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-12 md:mb-16">
        <span className="text-accentSecondary text-xs uppercase font-mono">// What We Offer</span>
        <h2 className="font-syne text-3xl md:text-5xl font-extrabold uppercase mt-2 text-textPrimary">
          How We Can Help You<span className="text-accentPrimary">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* LIST + CTA */}
        <div>
          <div className="relative border-l border-black/10 pl-8">
            {servicesData.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div key={service.id} className="relative">
                  <button onClick={() => handleSelect(idx)} className="w-full text-left py-6 group">
                    {isActive && (
                      <motion.span
                        layoutId="service-active-line"
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="absolute -left-8 top-0 bottom-0 w-[2px] bg-accentPrimary"
                      />
                    )}

                    <div className="flex items-start gap-4">
                      <span
                        className={`font-mono text-xs mt-2 shrink-0 transition-colors duration-300 ${
                          isActive ? 'text-accentPrimary' : 'text-textSecondary/40'
                        }`}
                      >
                        /{service.number}
                      </span>

                      <div>
                        <h3
                          className={`font-syne text-xl md:text-3xl font-bold uppercase transition-colors duration-300 ${
                            isActive
                              ? 'text-textPrimary'
                              : 'text-textSecondary/40 group-hover:text-textSecondary'
                          }`}
                        >
                          {service.title}
                        </h3>

                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                              className="text-textSecondary text-sm md:text-base mt-3 max-w-md leading-relaxed overflow-hidden"
                            >
                              {service.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>

                  {idx < servicesData.length - 1 && <div className="border-t border-black/5" />}
                </div>
              );
            })}
          </div>

          {/* SEE MORE BUTTON — right under the list, links to the Portfolio page */}
          <div className="mt-10 pl-8">
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 border border-black/10 hover:border-accentPrimary hover:bg-accentPrimary/5 text-textPrimary font-syne font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-full transition-all duration-300"
            >
              See More Work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* IMAGE PANEL */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-bgSecondary border border-black/5 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${activeService.id}-${photoIndex}`}
              src={activeService.images[photoIndex]}
              alt={activeService.title}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* NAV ARROWS */}
          <div className="absolute bottom-5 right-5 flex gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-textPrimary shadow-md transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-textPrimary shadow-md transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const marqueeKeywords = [
    'Photography', 'Videography', 'Graduation', 'Events', 'Videography',
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

      {/* SERVICES SECTION (menggantikan Featured Narratives) */}
      <ServicesSection />
    </motion.div>
  );
}