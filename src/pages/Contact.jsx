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

export default function Contact() {
  const contactLinks = [
    {
      name: 'Instagram',
      handle: '@laplace.visuals',
      url: 'https://instagram.com/laplace.visuals',
      color: 'hover:bg-accentPrimary hover:text-bgPrimary',
      textColor: 'text-accentPrimary',
      icon: InstagramIcon
    },
    {
      name: 'WhatsApp',
      handle: '+62 812-3456-7890',
      url: 'https://wa.me/628123456789',
      color: 'hover:bg-accentSecondary hover:text-bgPrimary',
      textColor: 'text-accentSecondary',
      icon: Phone
    },
    {
      name: 'Gmail',
      handle: 'hello@laplacevisuals.com',
      url: 'mailto:hello@laplacevisuals.com',
      color: 'hover:bg-accentPrimary hover:text-bgPrimary',
      textColor: 'text-accentPrimary',
      icon: Mail
    },
    {
      name: 'LinkedIn',
      handle: 'Laplace Visuals',
      url: 'https://linkedin.com',
      color: 'hover:bg-accentSecondary hover:text-bgPrimary',
      textColor: 'text-accentSecondary',
      icon: LinkedinIcon
    }
  ];

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen pt-32 md:pt-40 pb-12 flex flex-col"
    >
      {/* HEADER */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto w-full mb-16 md:mb-20">
        <span className="text-accentSecondary text-xs uppercase font-mono tracking-widest">
          // Connection
        </span>
        <h1 className="font-syne text-4xl md:text-7xl lg:text-8xl font-black uppercase mt-4 leading-[0.95] text-textPrimary">
          Let's Collaborate<span className="text-accentPrimary">.</span>
        </h1>
        <p className="text-textSecondary text-sm md:text-lg max-w-md leading-relaxed mt-6 font-light">
          No complicated forms, no friction. Tap on any of our direct channels to start co-creating your visual legacy.
        </p>
      </section>

      {/* MASSIVE BUTTONS LIST */}
      <section className="w-full border-t border-black/10 divide-y divide-black/10 flex-1">
        {contactLinks.map((link, idx) => {
          const Icon = link.icon;

          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-8 md:py-16 px-6 md:px-12 transition-all duration-500 ease-out group ${link.color}`}
            >
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between md:items-center gap-4">
                {/* Platform Name and Detail */}
                <div className="flex items-center gap-6">
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
                  <span className="text-[10px] font-syne font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Open Channel
                  </span>

                  {/* Magnetic indicator wrapper */}
                  <MagneticButton className="w-12 h-12 md:w-20 md:h-20 border border-current flex items-center justify-center rounded-full group-hover:bg-bgPrimary group-hover:text-textPrimary transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 group-hover:rotate-45 transition-transform duration-500" />
                  </MagneticButton>
                </div>
              </div>
            </a>
          );
        })}
      </section>

      {/* FOOTER CALLOUT */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto w-full text-center md:text-left mt-12 text-xs text-textSecondary flex flex-col md:flex-row justify-between items-center gap-4 border-t border-black/10 pt-6">
        <p>Inquiries are typically answered in less than 12 hours.</p>
        <p className="font-mono text-accentPrimary">TANGERANG / BANTEN / INDONESIA</p>
      </section>
    </motion.div>
  );
}