import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoAnimation from '../assets/laplacelogo.animation.mp4';

export default function Preloader({ onComplete }) {
  const videoRef = useRef(null);
  const hasCompletedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // Lock scroll while preloader is visible (both html & body, in case
  // Lenis or the page scrolls one instead of the other), restore on unmount
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.classList.add('lenis-stopped');

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.classList.remove('lenis-stopped');
    };
  }, []);

  // Safety net: never let the preloader hang more than ~5s regardless of
  // what happens with the video (slow network, stalled decode, autoplay
  // blocked silently, etc.)
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      complete();
    }, 5000);
    return () => clearTimeout(safetyTimer);
  }, []);

  const complete = () => {
    if (hasCompletedRef.current) return; // avoid double-trigger
    hasCompletedRef.current = true;
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.6;
    }
  };

  const handleCanPlay = () => {
    setIsReady(true);
    // Try to play explicitly; some browsers silently reject autoplay
    videoRef.current?.play().catch(() => {
      // Autoplay blocked or failed — don't let the preloader hang forever
      complete();
    });
  };

  const handleError = () => {
    // Video failed to load entirely — skip preloader instead of freezing
    complete();
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col justify-center items-center select-none"
    >
      {/* Wrap the video in a plain div and animate THAT — never animate
          transform/scale directly on a <video> element, it forces the
          browser to re-composite the decoded frame every tick and is a
          common cause of intermittent jank. */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1.3, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        className="w-[80vw] max-w-2xl md:w-[50vw]"
      >
        <video
          ref={videoRef}
          src={logoAnimation}
          preload="auto"
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleCanPlay}
          onEnded={complete}
          onError={handleError}
          className="w-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
}