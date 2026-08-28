import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function ThreeHeroBg() {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // If not desktop, do not initialize Three.js
    if (!isDesktop) return;

    const container = containerRef.current;
    if (!container) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Start very close to the particles (abstract lens blur effect)
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- CREATING PARTICLES ---
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const primaryColor = new THREE.Color('#FF5E00'); // Film orange
    const secondaryColor = new THREE.Color('#DFFF00'); // Acid green

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI - Math.PI / 2;
      const r = 5 + Math.sin(u * 3) * 1.5; // wavy sphere radius

      const x = r * Math.cos(u) * Math.cos(v);
      const y = r * Math.sin(u) * Math.cos(v);
      const z = r * Math.sin(v) + Math.cos(u * 2) * 1.2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Mix colors for a dynamic look
      const mixedColor = primaryColor.clone().lerp(secondaryColor, Math.random() * 0.25);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular particle texture (canvas drawing)
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.2,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- ZOOM OUT PULL ON MOUNT ---
    // Smooth camera focal pull from z=3 to z=15
    const cameraZoomAnim = gsap.to(camera.position, {
      z: 15,
      duration: 3.5,
      ease: 'power3.inOut',
      delay: 0.2
    });

    // --- MOUSE MOVE REACTION ---
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);

    // --- RESIZE HANDLER ---
    const onResize = () => {
      if (!containerRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow rotational drift
      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.x = elapsedTime * 0.04;

      // Mouse interactive camera drift (with dampening, relative to zoom Z)
      const targetX = mouseX * 8;
      const targetY = -mouseY * 8;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      cameraZoomAnim.kill();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      scene.clear();
    };
  }, [isDesktop]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
    />
  );
}
