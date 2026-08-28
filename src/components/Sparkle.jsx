import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Sparkle — 4-point star SVG matching the Laplace Visuals logo motif.
 *
 * Props:
 *   size     {number}  Default 24. Controls width & height in px.
 *   color    {string}  Default '#FF5E00'. Fill color.
 *   animate  {boolean} Default true. Enables GSAP twinkle loop.
 *   className {string} Extra classes for positioning.
 */
export default function Sparkle({
  size = 24,
  color = '#FF5E00',
  animate = true,
  className = '',
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el || !animate) return;

    // Random delay so multiple sparkles don't pulse together
    const delay = Math.random() * 1.2;

    const anim = gsap.to(el, {
      scale: 1.15,
      rotation: 20,
      opacity: 0.7,
      duration: 1.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay,
      transformOrigin: '50% 50%',
    });

    return () => anim.kill();
  }, [animate]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M50 5 C53 35 65 47 95 50 C65 53 53 65 50 95 C47 65 35 53 5 50 C35 47 47 35 50 5 Z" />
    </svg>
  );
}
