import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick, ...props }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const onMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      // Center of the button
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Distance from mouse to center
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;

      // Magnetic pull effect
      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const onMouseLeave = () => {
      // Spring back to origin
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    button.addEventListener('mousemove', onMouseMove);
    button.addEventListener('mouseleave', onMouseLeave);

    return () => {
      button.removeEventListener('mousemove', onMouseMove);
      button.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`inline-block select-none ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
