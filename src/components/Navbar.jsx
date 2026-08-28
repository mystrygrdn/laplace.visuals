import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-bgPrimary/70 backdrop-blur-md border-b border-white/5 py-5 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        {/* LOGO */}
        <NavLink 
          to="/" 
          className="font-syne text-xl md:text-2xl font-extrabold tracking-wider text-textPrimary hover:text-accentPrimary transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          LAPLACE<span className="text-accentPrimary">.</span>
        </NavLink>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `relative font-medium tracking-wide uppercase text-sm transition-colors duration-300 ${
                  isActive 
                    ? 'text-accentPrimary font-semibold' 
                    : 'text-textSecondary hover:text-textPrimary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accentPrimary rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* DESKTOP CONTACT BUTTON (MAGNETIC) */}
        <div className="hidden md:block">
          <NavLink to="/contact">
            <MagneticButton className="border border-accentPrimary/50 hover:border-accentPrimary hover:bg-accentPrimary/10 transition-colors duration-300 px-6 py-2.5 rounded-full font-syne text-xs uppercase tracking-widest text-textPrimary flex items-center gap-1">
              Let's Shoot <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </NavLink>
        </div>

        {/* MOBILE BURGER ICON */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-textPrimary hover:text-accentPrimary transition-colors duration-300"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <div className={`fixed inset-0 z-40 bg-bgPrimary/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center space-y-8 text-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `font-syne text-3xl font-bold tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-accentPrimary' : 'text-textPrimary hover:text-accentPrimary'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-6"
          >
            <button className="border-2 border-accentPrimary text-bgPrimary bg-accentPrimary font-syne font-bold uppercase tracking-widest px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-transparent hover:text-accentPrimary transition-all duration-300">
              CONTACT US <ArrowUpRight className="w-4.5 h-4.5" />
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}
