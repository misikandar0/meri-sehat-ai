'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Activity, ShieldCheck, Sparkles, Compass, Eye, Maximize2, Layers } from 'lucide-react';

interface FloatingMarker {
  id: string;
  name: string;
  shortName: string;
  sampleValue: string;
  unit: string;
  status: 'optimal' | 'within_range' | 'sample';
  role: string;
  position3D: [number, number, number];
  screenX: number;
  screenY: number;
  visible: boolean;
}

type ViewMode = 'core' | 'vascular' | 'cellular' | 'scan';

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>('core');
  const [rotMetrics, setRotMetrics] = useState({ rotX: 0, rotY: 0, depth: 5.2 });

  // Markers in 3D coordinate space mapped to 2D screen positions
  const [markers, setMarkers] = useState<FloatingMarker[]>([
    {
      id: 'hb',
      name: 'Hemoglobin',
      shortName: 'Hb',
      sampleValue: '13.8',
      unit: 'g/dL',
      status: 'within_range',
      role: 'Oxygen Transport',
      position3D: [0.65, 0.45, 0.3],
      screenX: 0,
      screenY: 0,
      visible: true,
    },
    {
      id: 'wbc',
      name: 'White Blood Cells',
      shortName: 'WBC',
      sampleValue: '6.8',
      unit: 'x10⁹/L',
      status: 'optimal',
      role: 'Immune Defense',
      position3D: [-0.7, 0.1, 0.25],
      screenX: 0,
      screenY: 0,
      visible: true,
    },
    {
      id: 'plt',
      name: 'Platelet Count',
      shortName: 'PLT',
      sampleValue: '260',
      unit: 'x10⁹/L',
      status: 'optimal',
      role: 'Vascular Integrity',
      position3D: [0.35, -0.65, 0.4],
      screenX: 0,
      screenY: 0,
      visible: true,
    },
  ]);

  // Ref to hold the active view mode for render loop access
  const viewModeRef = useRef<ViewMode>(currentViewMode);
  viewModeRef.current = currentViewMode;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Verify WebGL support
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 2. Initialize Three.js Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07111f, 0.12);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 3. Dynamic Lighting System (Cyan & Soft Violet Atmospheric Duo)
    const ambientLight = new THREE.AmbientLight(0x0b1930, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x56e6f2, 4.0);
    cyanLight.position.set(3, 4, 3);
    scene.add(cyanLight);

    const violetLight = new THREE.DirectionalLight(0x9b8cff, 3.5);
    violetLight.position.set(-3, -2, 2);
    scene.add(violetLight);

    const coreLight = new THREE.PointLight(0x56e6f2, 2.0, 4);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 4. Create Anatomical / Cellular Holographic Sculpture
    const group = new THREE.Group();
    scene.add(group);

    // A. Center Volumetric Ribbed Torso/Core Form
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0b1930,
      emissive: 0x112240,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // B. Inner Glowing Bio-Sphere (Holographic Organ Core)
    const innerGeometry = new THREE.IcosahedronGeometry(0.85, 2);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x56e6f2,
      emissive: 0x1d3356,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerMesh);

    // C. Orbital Vascular Lattice Rings
    const ring1Geom = new THREE.TorusGeometry(1.7, 0.015, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x56e6f2,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    group.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(1.95, 0.012, 16, 100);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x9b8cff,
      transparent: true,
      opacity: 0.55,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Material);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    group.add(ring2);

    // D. Cellular Particle Constellation (Microscopic Blood Matrix)
    const particleCount = 320;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x56e6f2);
    const colorViolet = new THREE.Color(0x9b8cff);
    const colorWhite = new THREE.Color(0xf7faff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 1.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? colorCyan : i % 3 === 1 ? colorViolet : colorWhite;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // E. 3D Glowing Anchor Nodes at Specific Marker Coordinates
    const markerMeshes: THREE.Mesh[] = [];
    markers.forEach((m) => {
      const pinGeom = new THREE.SphereGeometry(0.065, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: m.id === 'hb' ? 0x56e6f2 : m.id === 'wbc' ? 0x9b8cff : 0x56e6f2,
      });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      pinMesh.position.set(...m.position3D);
      group.add(pinMesh);
      markerMeshes.push(pinMesh);
    });

    setIsLoaded(true);

    // 5. Scroll Interaction: Track Scroll Offset & Velocity While Page is Moving
    let scrollY = 0;
    let targetScrollRotationY = 0;
    let targetScrollRotationX = 0;
    let targetCameraZ = 5.2;
    let lastScrollY = 0;
    let scrollVelocity = 0;

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
      scrollVelocity = scrollY - lastScrollY;
      lastScrollY = scrollY;

      // 3D Rotation Transitions linked to page scroll movement
      targetScrollRotationY = scrollY * 0.0035;
      targetScrollRotationX = Math.sin(scrollY * 0.002) * 0.4;

      // 3D Camera Depth Transition while page is moving
      // As user scrolls down, camera draws in closer, then shifts angle
      const scrollFactor = Math.min(1.5, scrollY / 600);
      targetCameraZ = 5.2 - scrollFactor * 0.9;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 6. Mouse Interaction / Pointer Parallax
    let targetPointerX = 0;
    let targetPointerY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      targetPointerY = x * 0.45;
      targetPointerX = -y * 0.35;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Render Loop with Smooth 3D Transitions on Scroll & Camera Morphing
    let animationFrameId: number;
    let clock = new THREE.Clock();
    const tempV = new THREE.Vector3();

    // Mode-specific target offsets
    const modeCameraTargets: Record<ViewMode, { z: number; y: number; fov: number }> = {
      core: { z: 5.2, y: 0, fov: 45 },
      vascular: { z: 4.5, y: 0.3, fov: 42 },
      cellular: { z: 3.9, y: -0.2, fov: 40 },
      scan: { z: 4.8, y: 0.5, fov: 48 },
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Combined 3D Rotation from Idle Orbit + Mouse Parallax + Page Moving Scroll
      const combinedTargetY = targetPointerY + targetScrollRotationY;
      const combinedTargetX = targetPointerX + targetScrollRotationX;

      group.rotation.y += 0.003;
      group.rotation.x += (combinedTargetX - group.rotation.x) * 0.06;
      group.rotation.y += (combinedTargetY - (group.rotation.y % (Math.PI * 2))) * 0.04;
      group.rotation.z += (Math.cos(elapsedTime * 0.5 + scrollY * 0.001) * 0.1 - group.rotation.z) * 0.03;

      // 3D Camera Transitions (Smooth Lerp to target depth while page moving)
      const currentMode = viewModeRef.current;
      const modeTarget = modeCameraTargets[currentMode];
      const finalTargetZ = modeTarget.z - (Math.min(1.2, scrollY / 700) * 0.8);

      camera.position.z += (finalTargetZ - camera.position.z) * 0.05;
      camera.position.y += (modeTarget.y - camera.position.y) * 0.05;

      // Smoothly orbit lights with scroll motion
      cyanLight.position.x = 3 * Math.cos(scrollY * 0.003 + elapsedTime * 0.5);
      cyanLight.position.z = 3 * Math.sin(scrollY * 0.003 + elapsedTime * 0.5);
      violetLight.position.x = -3 * Math.cos(scrollY * 0.003 - elapsedTime * 0.4);

      // Ring Dilation & Rotation speed changes while page moves
      const velocityDilation = Math.min(0.25, Math.abs(scrollVelocity) * 0.008);
      ring1.scale.setScalar(1 + velocityDilation);
      ring2.scale.setScalar(1 + velocityDilation * 1.2);

      ring1.rotation.z = elapsedTime * 0.15 + scrollY * 0.004;
      ring2.rotation.z = -elapsedTime * 0.12 - scrollY * 0.003;

      coreMesh.rotation.y = elapsedTime * 0.15 + scrollY * 0.002;
      coreMesh.rotation.x = elapsedTime * 0.08;
      innerMesh.rotation.y = -elapsedTime * 0.22 - scrollY * 0.003;
      particles.rotation.y = elapsedTime * 0.05 + scrollY * 0.0015;

      // Decay scroll velocity gradually
      scrollVelocity *= 0.9;

      // Project 3D marker coordinates to 2D screen positions
      const w = container.clientWidth;
      const h = container.clientHeight;
      const updatedScreenCoords = markers.map((m, idx) => {
        const mesh = markerMeshes[idx];
        if (mesh) {
          mesh.getWorldPosition(tempV);
          tempV.project(camera);
          const x = ((tempV.x + 1) * w) / 2;
          const y = ((-tempV.y + 1) * h) / 2;
          const isBehind = tempV.z > 1;
          return {
            ...m,
            screenX: Math.max(10, Math.min(w - 140, x)),
            screenY: Math.max(10, Math.min(h - 80, y)),
            visible: !isBehind,
          };
        }
        return m;
      });

      setMarkers(updatedScreenCoords);

      // Update HUD metrics
      setRotMetrics({
        rotX: Math.round((group.rotation.x * 180) / Math.PI),
        rotY: Math.round((group.rotation.y * 180) / Math.PI) % 360,
        depth: parseFloat(camera.position.z.toFixed(2)),
      });

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      resizeObserver.disconnect();

      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ring1Geom.dispose();
      ringMaterial.dispose();
      ring2Geom.dispose();
      ring2Material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      markerMeshes.forEach((m) => {
        m.geometry.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
        else m.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center select-none overflow-hidden"
      aria-label="Interactive 3D Anatomical & Biomarker Visualization with Scroll Transitions"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#56E6F2]/10 via-[#9B8CFF]/15 to-transparent blur-3xl animate-atmospheric" />
      </div>

      {webGLSupported ? (
        <canvas
          ref={canvasRef}
          className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        /* Fallback SVG Architectural Illustration if WebGL is disabled */
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-48 h-48 rounded-full border border-[#56E6F2]/30 flex items-center justify-center relative animate-pulse-subtle bg-[#0B1930]/40">
            <div className="w-32 h-32 rounded-full border border-[#9B8CFF]/40 flex items-center justify-center">
              <Activity className="w-12 h-12 text-[#56E6F2]" />
            </div>
            <div className="absolute -top-3 px-3 py-1 rounded-full bg-[#0B1930] border border-[#56E6F2]/40 text-[#56E6F2] text-[10px] font-bold">
              Biomarker Matrix
            </div>
          </div>
          <p className="text-xs text-[#8FA2BD] mt-4 max-w-xs">
            Holographic Anatomical System Active (2D Accelerated Mode)
          </p>
        </div>
      )}

      {/* Floating 3D Biomarker HUD Labels (Synchronized with 3D Matrix) */}
      {isLoaded &&
        markers.map((marker) => {
          if (!marker.visible || marker.screenX === 0) return null;
          const isExpanded = activeMarker === marker.id;

          return (
            <div
              key={marker.id}
              style={{
                left: `${marker.screenX}px`,
                top: `${marker.screenY}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 transition-transform duration-100 ease-out pointer-events-auto"
            >
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setActiveMarker(isExpanded ? null : marker.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#07111F]/90 backdrop-blur-md border border-[#56E6F2]/40 shadow-lg shadow-[#07111F]/80 hover:border-[#56E6F2] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-[#56E6F2] cursor-pointer"
                  aria-label={`${marker.name} sample marker: ${marker.sampleValue} ${marker.unit}`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#56E6F2] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#56E6F2]" />
                  </span>

                  <span className="text-[11px] font-bold text-[#F7FAFF] tracking-wide">
                    {marker.shortName}
                  </span>
                  <span className="text-[10px] font-mono font-medium text-[#56E6F2]">
                    {marker.sampleValue}
                  </span>
                  <span className="text-[9px] text-[#8FA2BD]">
                    {marker.unit}
                  </span>
                </button>

                {/* Expanded Micro-Card on Click */}
                {isExpanded && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 p-3.5 rounded-2xl bg-[#0B1930]/95 backdrop-blur-xl border border-[#56E6F2]/30 shadow-2xl text-left z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between text-[10px] text-[#56E6F2] font-mono mb-1">
                      <span>{marker.role}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#56E6F2]/10 border border-[#56E6F2]/30 text-[9px] font-bold">
                        Sample Marker
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#F7FAFF]">{marker.name}</div>
                    <div className="text-[11px] text-[#8FA2BD] mt-1 leading-snug">
                      Illustrative reference demonstration value for laboratory report decoding.
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

      {/* Real-time 3D Scroll Perspective Mode Switcher Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-2xl bg-[#07111F]/80 backdrop-blur-xl border border-white/10 shadow-lg">
        {(['core', 'vascular', 'cellular', 'scan'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setCurrentViewMode(mode)}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
              currentViewMode === mode
                ? 'bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] shadow-sm'
                : 'text-[#8FA2BD] hover:text-[#F7FAFF] hover:bg-white/5'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Decorative HUD Corner Accents with Real-time 3D Scroll Rotation Metrics */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1930]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#56E6F2] shadow-sm">
        <Sparkles className="w-3 h-3 text-[#56E6F2]" />
        <span>SCROLL-LINKED 3D • Y:{rotMetrics.rotY}° X:{rotMetrics.rotX}° Z:{rotMetrics.depth}m</span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#07111F]/90 backdrop-blur-md border border-white/10 text-[10px] text-[#8FA2BD] shadow-sm">
        <ShieldCheck className="w-3.5 h-3.5 text-[#56E6F2] shrink-0" />
        <span>
          3D transitions actively respond to page movement and pointer depth.
        </span>
      </div>
    </div>
  );
}
