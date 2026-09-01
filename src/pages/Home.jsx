import React from 'react';
import { motion } from 'framer-motion';
import ThreeHeroBg from '../components/ThreeHeroBg';
import ServiceWordScroll from '../components/Servicewordscroll';

// Framer motion transition animation config
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

export default function Home() {
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

      {/* "WE OFFER" — list layanan yang nyala satu-satu pas discroll, disusul CTA ke portfolio */}
      <ServiceWordScroll
        items={[
          'graduation shoots.',
          'event coverage.',
          'studio portraits.',
          'campaign visuals.',
        ]}
      />
    </motion.div>
  );
}