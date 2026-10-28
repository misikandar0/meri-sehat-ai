'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3DMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Verify WebGL support
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07111f, 0.035);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 3, 14);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    } catch {
      return;
    }

    // 1. 3D Floating Infinite Wave Lattice
    const gridCols = 36;
    const gridRows = 36;
    const planeGeom = new THREE.PlaneGeometry(50, 50, gridCols, gridRows);
    planeGeom.rotateX(-Math.PI / 2.3);

    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x0f294a,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const gridMesh = new THREE.Mesh(planeGeom, planeMat);
    gridMesh.position.y = -4;
    scene.add(gridMesh);

    // 2. 3D Constellation Depth Dust Particles
    const dustCount = 180;
    const dustGeom = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const cCyan = new THREE.Color(0x56e6f2);
    const cViolet = new THREE.Color(0x9b8cff);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 40;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const c = i % 2 === 0 ? cCyan : cViolet;
      dustColors[i * 3] = c.r;
      dustColors[i * 3 + 1] = c.g;
      dustColors[i * 3 + 2] = c.b;
    }

    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeom.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
    });
    const dustPoints = new THREE.Points(dustGeom, dustMat);
    scene.add(dustPoints);

    // 3. Track Scroll Offset & Movement
    let scrollY = 0;
    let targetCameraY = 3;
    let targetGridY = -4;
    let targetCameraZ = 14;

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
      const progress = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);

      // Camera depth and altitude shifts in 3D space while page moves
      targetCameraY = 3 - progress * 4;
      targetCameraZ = 14 - Math.sin(progress * Math.PI) * 4;
      targetGridY = -4 + progress * 2;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 4. Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 5. Render Loop with 3D Wave & Scroll Depth Motion
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation while page moves
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.04;
      camera.lookAt(0, -1, 0);

      // Grid wave undulation
      gridMesh.rotation.z = Math.sin(elapsedTime * 0.15 + scrollY * 0.001) * 0.08;
      gridMesh.position.y += (targetGridY - gridMesh.position.y) * 0.04;

      // Dust constellation slow orbit & parallax drift
      dustPoints.rotation.y = elapsedTime * 0.02 + scrollY * 0.0006;
      dustPoints.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      planeGeom.dispose();
      planeMat.dispose();
      dustGeom.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
