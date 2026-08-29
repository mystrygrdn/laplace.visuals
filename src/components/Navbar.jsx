import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import laplaceLogo from '../assets/laplacelogo.webp';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-bgPrimary py-3 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        {/* LOGO — far left */}
        <NavLink
          to="/"
          className="flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={laplaceLogo}
            alt="Laplace Visuals"
            className="h-18 md:h-20 w-auto object-contain invert"
          />
        </NavLink>

        {/* DESKTOP NAV LINKS — clustered together, far right */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-bold tracking-wide transition-colors duration-300 ${
                  isActive
                    ? 'text-accentPrimary'
                    : 'text-textPrimary hover:text-accentPrimary'
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
                `font-display text-3xl transition-colors duration-300 ${
                  isActive ? 'text-accentPrimary' : 'text-textPrimary hover:text-accentPrimary'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}