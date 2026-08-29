import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { AnimatePresence, motion } from 'framer-motion';
import 'lenis/dist/lenis.css';

// Components
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top helper component
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  React.useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [triggerFlash, setTriggerFlash] = useState(false);

  // Trigger camera shutter flash on route changes, but only after initial loading completes
  useEffect(() => {
    if (isLoading) return;
    setTriggerFlash(true);
    const timeout = setTimeout(() => {
      setTriggerFlash(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [location.pathname, isLoading]);

  return (
    <>
      {/* Intro Preloader Animation */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Camera Shutter Flash Transition */}
      <AnimatePresence>
        {triggerFlash && (
          <motion.div
            key="camera-flash"
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-[99999] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <ScrollToTop />

        {/* Film Grain Texture Overlay — only after preloader is done, so it
            doesn't compete with the preloader video for GPU/compositing */}
        {!isLoading && <div className="grain" />}

        {/* Custom Cursor Dot & Ring — same reason: avoid mousemove-driven
            re-renders fighting with the video during the preloader */}
        {!isLoading && <CustomCursor />}

        <div className="flex flex-col min-h-screen">
          {/* Header Navigation */}
          <Navbar />

          {/* Animated Page Layout Wrapper */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </ReactLenis>
    </>
  );
}