import React from 'react';
import { motion } from 'framer-motion';

import ThreeHeroBg from '../components/ThreeHeroBg';
import ServiceWordScroll from '../components/Servicewordscroll';

const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
  },

  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },

  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

export default function Home() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen"
    >
      {/* =====================================================
          HERO
          
          Navbar memiliki tinggi 72px.
          Hero menghitung tinggi:
          
          100svh - 72px
          
          Jadi Hero tidak tertutup Navbar.
      ===================================================== */}
      <div className="pt-[72px]">
        <ThreeHeroBg />
      </div>

      {/* =====================================================
          SERVICES
      ===================================================== */}
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