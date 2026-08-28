import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail } from 'lucide-react';
import MagneticButton from './MagneticButton';

// Custom SVG icon for Instagram
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Custom SVG icon for LinkedIn
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// Custom SVG icon for WhatsApp since Lucide doesn't have it natively
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.88 1.28h.005c5.505 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.727 14.161c-.247.697-1.205 1.272-1.657 1.319-.452.046-.902.261-2.924-.54-2.585-1.026-4.227-3.64-4.357-3.812-.128-.172-1.047-1.389-1.047-2.65 0-1.261.648-1.88.88-2.13.232-.249.508-.312.678-.312.17 0 .341.002.49.009.157.007.368-.06.577.444.21.518.72 1.746.782 1.87.062.124.103.269.02.435-.082.166-.124.269-.247.414-.124.145-.262.327-.373.438-.124.124-.253.259-.108.508.145.249.643 1.057 1.38 1.713.948.844 1.748 1.106 2.007 1.23.259.124.409.103.563-.073.155-.176.673-.787.854-1.057.18-.27.362-.228.61-.135.249.093 1.58.745 1.854.88.274.135.457.202.524.316.067.114.067.662-.18 1.359z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bgSecondary border-t border-white/5 pt-16 pb-8 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mb-16">
        {/* BRAND COLUMN */}
        <div className="md:col-span-2">
          <NavLink to="/" className="font-syne text-2xl font-black text-textPrimary tracking-wide">
            LAPLACE<span className="text-accentPrimary">.</span>
          </NavLink>
          <p className="mt-4 text-textSecondary text-sm md:text-base max-w-sm leading-relaxed">
            Shaping light, capturing souls, and freezing moments in silver halide. Based in Tangerang, shooting worldwide.
          </p>
        </div>

        {/* NAVIGATION COLUMN */}
        <div>
          <h4 className="font-syne text-xs uppercase tracking-widest text-textPrimary mb-6 font-bold">
            Navigation
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <NavLink to="/" className="text-textSecondary hover:text-accentPrimary transition-colors duration-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" className="text-textSecondary hover:text-accentPrimary transition-colors duration-300">
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className="text-textSecondary hover:text-accentPrimary transition-colors duration-300">
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-textSecondary hover:text-accentPrimary transition-colors duration-300">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-textSecondary hover:text-accentPrimary transition-colors duration-300">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* SOCIAL LINKS COLUMN */}
        <div>
          <h4 className="font-syne text-xs uppercase tracking-widest text-textPrimary mb-6 font-bold">
            Connect
          </h4>
          <div className="flex flex-wrap gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <MagneticButton className="w-11 h-11 bg-bgPrimary border border-white/10 hover:border-accentPrimary hover:text-accentPrimary transition-colors duration-300 flex items-center justify-center rounded-full text-textSecondary">
                <InstagramIcon className="w-5 h-5" />
              </MagneticButton>
            </a>
            
            <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MagneticButton className="w-11 h-11 bg-bgPrimary border border-white/10 hover:border-accentPrimary hover:text-accentPrimary transition-colors duration-300 flex items-center justify-center rounded-full text-textSecondary">
                <WhatsAppIcon className="w-5 h-5" />
              </MagneticButton>
            </a>

            <a href="mailto:hello@laplacevisuals.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
              <MagneticButton className="w-11 h-11 bg-bgPrimary border border-white/10 hover:border-accentPrimary hover:text-accentPrimary transition-colors duration-300 flex items-center justify-center rounded-full text-textSecondary">
                <Mail className="w-5 h-5" />
              </MagneticButton>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <MagneticButton className="w-11 h-11 bg-bgPrimary border border-white/10 hover:border-accentPrimary hover:text-accentPrimary transition-colors duration-300 flex items-center justify-center rounded-full text-textSecondary">
                <LinkedinIcon className="w-5 h-5" />
              </MagneticButton>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-textSecondary">
        <p>© {currentYear} Laplace Visuals. All Rights Reserved.</p>
        <p className="mt-3 md:mt-0 tracking-widest uppercase">
          Crafted for <span className="text-accentSecondary">Gen-Z Aesthetics</span>
        </p>
      </div>
    </footer>
  );
}
