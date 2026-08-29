import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const sparkleRef = useRef(null);
  const idleRotationTween = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'hovering' | 'view-mode'

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, select, textarea, [role="button"], .interactive-hover'
      );
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

  // Sparkle logo Laplace: berputar pelan terus-menerus saat idle,
  // membesar saat hover elemen interaktif. Warna selalu ungu (diatur lewat CSS).
  useEffect(() => {
    const sparkle = sparkleRef.current;
    if (!sparkle) return;

    if (idleRotationTween.current) {
      idleRotationTween.current.kill();
      idleRotationTween.current = null;
    }

    if (cursorState === 'default') {
      gsap.to(sparkle, { scale: 1, duration: 0.3, ease: 'power2.out' });
      idleRotationTween.current = gsap.to(sparkle, {
        rotate: '+=360',
        duration: 6,
        ease: 'none',
        repeat: -1,
      });
    } else if (cursorState === 'hovering') {
      gsap.to(sparkle, {
        rotate: 45,
        scale: 1.5,
        duration: 0.4,
        ease: 'back.out(2.5)',
      });
    } else if (cursorState === 'view-mode') {
      gsap.to(sparkle, {
        rotate: 90,
        scale: 1.8,
        duration: 0.4,
        ease: 'back.out(2.5)',
      });
    }

    return () => {
      if (idleRotationTween.current) idleRotationTween.current.kill();
    };
  }, [cursorState]);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${cursorState === 'hovering' ? 'hovering' : ''} ${
        cursorState === 'view-mode' ? 'view-mode' : ''
      }`}
    >
      <svg
        ref={sparkleRef}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="currentColor"
        style={{ transformOrigin: 'center', display: 'block' }}
      >
        <path d="M9 0 C9 4.2 4.2 9 0 9 C4.2 9 9 13.8 9 18 C9 13.8 13.8 9 18 9 C13.8 9 9 4.2 9 0Z" />
      </svg>
    </div>
  );
}