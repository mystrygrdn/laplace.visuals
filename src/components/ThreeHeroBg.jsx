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
    scene.fog = new THREE.Fog(0xffffff, 6, 26);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const purple = new THREE.Color('#6D28D9');
    const black = new THREE.Color('#0B0B0C');

    // ────────────────────────────────────────────────
    // SCENE CONTENT — sparse wireframe grid field
    // (just enough geometry for the camera move to read;
    //  no particle clutter, no flashing dots)
    // ────────────────────────────────────────────────
    const sceneGroup = new THREE.Group();

    // Floor grid — thin, wide, sits low
    const floorGrid = new THREE.GridHelper(40, 40, purple, black);
    floorGrid.position.y = -3;
    floorGrid.material.transparent = true;
    floorGrid.material.opacity = 0.18;
    sceneGroup.add(floorGrid);

    // A handful of slow-drifting wireframe polyhedra for depth cues
    const shapeGeometries = [
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(1.1, 0.35, 8, 24),
    ];

    const shapes = shapeGeometries.map((geometry, i) => {
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? purple : black,
        transparent: true,
        opacity: 0.35,
      });
      const mesh = new THREE.LineSegments(edges, material);
      mesh.position.set(
        (i - 1) * 6,
        Math.sin(i) * 1.5,
        -i * 4
      );
      sceneGroup.add(mesh);
      return mesh;
    });

    scene.add(sceneGroup);

    // ────────────────────────────────────────────────
    // CAMERA ANIMATION — slow forward dolly + gentle drift,
    // this IS the visual: no particles doing the work.
    // ────────────────────────────────────────────────
    const dollyTl = gsap.timeline({ delay: 0.1 });
    dollyTl.to(camera.position, {
      z: 6,
      y: 0.4,
      duration: 5,
      ease: 'power2.out',
    });

    // Continuous slow orbit around the scene
    const orbitState = { angle: 0 };
    const orbitTween = gsap.to(orbitState, {
      angle: Math.PI * 2,
      duration: 60,
      ease: 'none',
      repeat: -1,
    });

    // Gentle up/down bob so the camera feels handheld, not static
    const bobTween = gsap.to(camera.position, {
      y: '+=0.3',
      duration: 6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 5,
    });

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
    const orbitRadius = 2.5;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Base orbit position around the scene's center, layered under the dolly/bob tweens
      const orbitX = Math.sin(orbitState.angle) * orbitRadius;
      const orbitZOffset = Math.cos(orbitState.angle) * orbitRadius * 0.3;

      const targetX = orbitX + mouseX * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.z += (orbitZOffset * 0.02);

      camera.lookAt(0, 0, -2);

      shapes.forEach((mesh, i) => {
        mesh.rotation.x = t * 0.05 * (i + 1);
        mesh.rotation.y = t * 0.08 * (i + 1);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // ────────────────────────────────────────────────
    // CLEANUP
    // ────────────────────────────────────────────────
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      dollyTl.kill();
      orbitTween.kill();
      bobTween.kill();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      floorGrid.geometry.dispose();
      floorGrid.material.dispose();
      shapes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
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