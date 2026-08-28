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
    if (!isDesktop) return;

    const container = containerRef.current;
    if (!container) return;

    // ────────────────────────────────────────────────
    // SCENE / CAMERA / RENDERER
    // ────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b0b0c, 8, 22);

    const camera = new THREE.PerspectiveCamera(
      58,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const primaryColor = new THREE.Color('#FF5E00'); // film orange
    const secondaryColor = new THREE.Color('#DFFF00'); // acid green

    // ────────────────────────────────────────────────
    // TEXTURE HELPERS
    // ────────────────────────────────────────────────
    // Soft bokeh circle with a faint outer ring, like an out-of-focus
    // camera highlight rather than a flat dot.
    function makeBokehTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,0.95)');
      grad.addColorStop(0.35, 'rgba(255,255,255,0.55)');
      grad.addColorStop(0.7, 'rgba(255,255,255,0.12)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      // faint donut ring for a "bokeh highlight" feel
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(32, 32, 22, 0, Math.PI * 2);
      ctx.stroke();
      return new THREE.CanvasTexture(canvas);
    }

    // Small sharp point, for fine grain/spark texture.
    function makeSparkTexture() {
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
      return new THREE.CanvasTexture(canvas);
    }

    const bokehTexture = makeBokehTexture();
    const sparkTexture = makeSparkTexture();

    // ────────────────────────────────────────────────
    // LAYER A — outer bokeh cloud (orange, big, soft, slow)
    // ────────────────────────────────────────────────
    function buildLayer({ count, radiusBase, radiusVar, color, sizeBase, sizeVar, opacity, texture }) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI - Math.PI / 2;
        const r = radiusBase + Math.sin(u * 3) * radiusVar + (Math.random() - 0.5) * radiusVar;

        positions[i * 3] = r * Math.cos(u) * Math.cos(v);
        positions[i * 3 + 1] = r * Math.sin(u) * Math.cos(v);
        positions[i * 3 + 2] = r * Math.sin(v) + Math.cos(u * 2) * (radiusVar * 0.6);

        const c = color.clone().lerp(new THREE.Color('#ffffff'), Math.random() * 0.15);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        sizes[i] = sizeBase + Math.random() * sizeVar;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: sizeBase,
        map: texture,
        vertexColors: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      return { points, geometry, material };
    }

    const bokehLayer = buildLayer({
      count: 260,
      radiusBase: 6,
      radiusVar: 2,
      color: primaryColor,
      sizeBase: 0.9,
      sizeVar: 0.7,
      opacity: 0.5,
      texture: bokehTexture,
    });

    const sparkLayer = buildLayer({
      count: 380,
      radiusBase: 4.5,
      radiusVar: 1.4,
      color: secondaryColor,
      sizeBase: 0.12,
      sizeVar: 0.14,
      opacity: 0.9,
      texture: sparkTexture,
    });

    const grainLayer = buildLayer({
      count: 500,
      radiusBase: 9,
      radiusVar: 4,
      color: new THREE.Color('#ffffff'),
      sizeBase: 0.05,
      sizeVar: 0.05,
      opacity: 0.35,
      texture: sparkTexture,
    });

    scene.add(bokehLayer.points, sparkLayer.points, grainLayer.points);

    // ────────────────────────────────────────────────
    // INTRO FLASH — a soft camera-flash pop on mount
    // ────────────────────────────────────────────────
    const flashMaterial = new THREE.SpriteMaterial({
      map: bokehTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flashSprite = new THREE.Sprite(flashMaterial);
    flashSprite.scale.set(14, 14, 1);
    flashSprite.position.z = -1;
    scene.add(flashSprite);

    gsap.fromTo(
      flashMaterial,
      { opacity: 0.9 },
      { opacity: 0, duration: 1.4, ease: 'power2.out', delay: 0.1 }
    );

    // ────────────────────────────────────────────────
    // CAMERA DOLLY + LENS BREATHING
    // ────────────────────────────────────────────────
    const cameraZoomAnim = gsap.to(camera.position, {
      z: 14,
      duration: 4,
      ease: 'expo.out',
      delay: 0.2,
    });

    const fovState = { value: camera.fov };
    const fovBreath = gsap.to(fovState, {
      value: camera.fov + 3,
      duration: 6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        camera.fov = fovState.value;
        camera.updateProjectionMatrix();
      },
    });

    // Whole particle field breathes subtly in scale
    const scaleTargets = [bokehLayer.points.scale, sparkLayer.points.scale, grainLayer.points.scale];
    const breatheTweens = scaleTargets.map((target) =>
      gsap.to(target, {
        x: 1.06,
        y: 1.06,
        z: 1.06,
        duration: 5 + Math.random() * 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    );

    // ────────────────────────────────────────────────
    // MOUSE PARALLAX
    // ────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ────────────────────────────────────────────────
    // RESIZE
    // ────────────────────────────────────────────────
    const onResize = () => {
      if (!containerRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // ────────────────────────────────────────────────
    // ANIMATION LOOP
    // ────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const t = clock.getElapsedTime();

      bokehLayer.points.rotation.y = t * 0.05;
      bokehLayer.points.rotation.x = t * 0.02;

      sparkLayer.points.rotation.y = -t * 0.09;
      sparkLayer.points.rotation.x = t * 0.05;

      grainLayer.points.rotation.y = t * 0.015;

      const targetX = mouseX * 8;
      const targetY = -mouseY * 8;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // ────────────────────────────────────────────────
    // CLEANUP
    // ────────────────────────────────────────────────
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      cameraZoomAnim.kill();
      fovBreath.kill();
      breatheTweens.forEach((tw) => tw.kill());
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      [bokehLayer, sparkLayer, grainLayer].forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      flashMaterial.dispose();
      bokehTexture.dispose();
      sparkTexture.dispose();
      scene.clear();
      renderer.dispose();
    };
  }, [isDesktop]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
    />
  );
}