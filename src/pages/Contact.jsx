import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone, Mail } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

// Custom Instagram SVG Icon
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Custom LinkedIn SVG Icon
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

// Reveal per-kata buat heading, biar landing-nya nggak jatuh berat sebelah
const headingContainer = {
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } }
};
const headingWord = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0, 0, 1] } }
};

function RevealWords({ text, className }) {
  return (
    <motion.h1 variants={headingContainer} initial="initial" animate="animate" className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.08em] mr-[0.22em]">
          <motion.span variants={headingWord} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export default function Contact() {
  const contactLinks = [
    {
      name: 'Instagram',
      handle: '@laplace.visuals',
      url: 'https://instagram.com/laplace.visuals',
      wipe: 'bg-[#8B5CF6]',
      icon: InstagramIcon
    },
    {
      name: 'WhatsApp',
      handle: '+62 812-3456-7890',
      url: 'https://wa.me/628123456789',
      wipe: 'bg-[#0B0E12]',
      icon: Phone
    },
    {
      name: 'Gmail',
      handle: 'hello@laplacevisuals.com',
      url: 'mailto:hello@laplacevisuals.com',
      wipe: 'bg-[#8B5CF6]',
      icon: Mail
    },
    {
      name: 'LinkedIn',
      handle: 'Laplace Visuals',
      url: 'https://linkedin.com',
      wipe: 'bg-[#0B0E12]',
      icon: LinkedinIcon
    }
  ];

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen bg-white text-[#0B0E12] pt-32 md:pt-40 pb-12 flex flex-col"
    >
      {/* HEADER */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto w-full mb-16 md:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#8B5CF6] mb-6"
        >
          <span className="h-px w-6 bg-[#8B5CF6]/50" />
          Connection
        </motion.span>

        <RevealWords
          text="Let's Collaborate."
          className="font-syne font-black uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2.6rem,8vw,6.5rem)] text-[#0B0E12]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
          className="text-black/60 text-sm md:text-lg max-w-md leading-relaxed mt-6 font-light"
        >
          No complicated forms, no friction. Tap on any of our direct channels to start co-creating your visual legacy.
        </motion.p>
      </section>

      {/* MASSIVE BUTTONS LIST */}
      <section className="w-full border-t border-black/10 divide-y divide-black/10 flex-1">
        {contactLinks.map((link, idx) => {
          const Icon = link.icon;

          return (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="relative block w-full py-8 md:py-16 px-6 md:px-12 overflow-hidden group text-[#0B0E12] transition-colors duration-500 ease-out"
            >
              {/* wipe panel — nyapu dari bawah pas hover */}
              <span
                aria-hidden
                className={`absolute inset-0 z-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100 ${link.wipe}`}
              />

              <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between md:items-center gap-4 transition-colors duration-500 group-hover:text-white">
                {/* Platform Name and Detail */}
                <div className="flex items-center gap-6">
                  <span className="hidden md:inline-block font-mono text-xs text-black/30 group-hover:text-white/50 transition-colors duration-500">
                    /{String(idx + 1).padStart(2, '0')}
                  </span>
                  <Icon className="w-6 h-6 md:w-10 md:h-10 shrink-0 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h2 className="font-syne text-3xl md:text-7xl font-extrabold uppercase tracking-tight">
                      {link.name}
                    </h2>
                    <span className="text-xs md:text-sm font-mono mt-1 block opacity-60">
                      {link.handle}
                    </span>
                  </div>
                </div>

                {/* Arrow and Indicator */}
                <div className="flex items-center gap-4 self-end md:self-center">
                  <span className="text-[10px] font-syne font-bold uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Open Channel
                  </span>

                  <MagneticButton className="w-12 h-12 md:w-20 md:h-20 border border-black/20 flex items-center justify-center rounded-full transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#0B0E12]">
                    <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 group-hover:rotate-45 transition-transform duration-500" />
                  </MagneticButton>
                </div>
              </div>
            </motion.a>
          );
        })}
      </section>

      {/* FOOTER CALLOUT */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12 max-w-7xl mx-auto w-full text-center md:text-left mt-12 text-xs text-black/50 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-black/10 pt-6"
      >
        <p>Inquiries are typically answered in less than 12 hours.</p>
        <p className="font-mono text-[#8B5CF6]">MANADO / INDONESIA</p>
      </motion.section>
    </motion.div>
  );
}