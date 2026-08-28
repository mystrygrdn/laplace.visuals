import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className = '', type = 'chars', delay = 0 }) {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Apply split-type to split text by characters, words, or lines
    const splitTextInstance = new SplitType(element, { types: type });

    const targets = 
      type === 'chars' 
        ? splitTextInstance.chars 
        : type === 'words' 
          ? splitTextInstance.words 
          : splitTextInstance.lines;

    // Set initial styling for smooth animation (hide split items to prevent flash)
    gsap.set(targets, { opacity: 0, y: 30 });

    const animation = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: type === 'chars' ? 0.03 : 0.08,
      ease: 'power4.out',
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });

    // Cleanup split type and animations on unmount
    return () => {
      animation.kill();
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      splitTextInstance.revert();
    };
  }, [type, delay, children]);

  return (
    <div ref={textRef} className={`split-text-container ${className}`}>
      {children}
    </div>
  );
}
