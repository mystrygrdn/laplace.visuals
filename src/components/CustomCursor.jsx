import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'hovering' | 'view-mode'

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Set initial positions offscreen
    gsap.set([cursor, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .interactive-hover');
      const isImage = target.closest('.portfolio-image-card');

      if (isImage) {
        setCursorState('view-mode');
      } else if (isInteractive) {
        setCursorState('hovering');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${
          cursorState === 'hovering' ? 'hovering' : ''
        } ${cursorState === 'view-mode' ? 'view-mode' : ''}`}
      />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${
          cursorState === 'hovering' ? 'hovering' : ''
        } ${cursorState === 'view-mode' ? 'view-mode' : ''}`}
      />
    </>
  );
}
