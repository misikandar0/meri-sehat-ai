'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Activity,
  ShieldCheck,
  Sparkles,
  Layers,
  RotateCcw,
  Maximize2,
  Heart,
  Droplets,
  Zap,
  Split,
  Eye,
  Play,
  Pause,
} from 'lucide-react';

type IsolatedLayer = 'all' | 'skeleton' | 'muscles' | 'vascular' | 'neural';

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interaction States
  const [isDissociated, setIsDissociated] = useState<boolean>(false);
  const [activeLayer, setActiveLayer] = useState<IsolatedLayer>('all');
  const [rotationSpeed, setRotationSpeed] = useState<number>(1); // 0 = paused, 1 = normal, 2 = fast
  const [rotMetrics, setRotMetrics] = useState({ rotY: 0, depth: 5.4, progress: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Refs for animation loop access without re-binding
  const isDissociatedRef = useRef(isDissociated);
  isDissociatedRef.current = isDissociated;

  const activeLayerRef = useRef(activeLayer);
  activeLayerRef.current = activeLayer;

  const rotationSpeedRef = useRef(rotationSpeed);
  rotationSpeedRef.current = rotationSpeed;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07111f, 0.08);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 640;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    } catch (e) {
      console.warn('WebGL init fallback:', e);
      return;
    }

    // 2. High-End Bioluminescent Lighting System
    const ambientLight = new THREE.AmbientLight(0x0b1930, 2.2);
    scene.add(ambientLight);

    const cyanKeyLight = new THREE.DirectionalLight(0x56e6f2, 4.5);
    cyanKeyLight.position.set(4, 5, 4);
    scene.add(cyanKeyLight);

    const magentaFillLight = new THREE.DirectionalLight(0xff3366, 3.2);
    magentaFillLight.position.set(-4, -2, 3);
    scene.add(magentaFillLight);

    const goldBackLight = new THREE.DirectionalLight(0xffb703, 2.8);
    goldBackLight.position.set(0, 3, -4);
    scene.add(goldBackLight);

    const corePointLight = new THREE.PointLight(0x56e6f2, 3.0, 6);
    corePointLight.position.set(0, 0.3, 0);
    scene.add(corePointLight);

    // 3. MASTER HUMAN ASSEMBLY & ANATOMICAL LAYER GROUPS
    const masterAssembly = new THREE.Group();
    scene.add(masterAssembly);

    const skeletonGroup = new THREE.Group();
    const muscleGroup = new THREE.Group();
    const vascularGroup = new THREE.Group();
    const neuralGroup = new THREE.Group();
    const biofield5DGroup = new THREE.Group();

    masterAssembly.add(skeletonGroup);
    masterAssembly.add(muscleGroup);
    masterAssembly.add(vascularGroup);
    masterAssembly.add(neuralGroup);
    masterAssembly.add(biofield5DGroup);

    // =========================================================================
    // LAYER 1: SKELETAL SYSTEM (BONES) - Bioluminescent Ivory / Electric Cyan
    // =========================================================================
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xdff9fb,
      emissive: 0x22a6b3,
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.65,
      wireframe: false,
    });

    const boneJointMaterial = new THREE.MeshBasicMaterial({
      color: 0x56e6f2,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });

    // A. Cranium / Skull
    const skullGeom = new THREE.SphereGeometry(0.32, 24, 20);
    skullGeom.scale(0.85, 1.15, 0.95);
    const skullMesh = new THREE.Mesh(skullGeom, boneMaterial);
    skullMesh.position.set(0, 1.45, 0);
    skeletonGroup.add(skullMesh);

    // Mandible / Jaw
    const jawGeom = new THREE.BoxGeometry(0.24, 0.16, 0.26);
    const jawMesh = new THREE.Mesh(jawGeom, boneMaterial);
    jawMesh.position.set(0, 1.22, 0.08);
    skeletonGroup.add(jawMesh);

    // B. Vertebral Column (Spine - 20 Segmented Vertebrae)
    for (let i = 0; i < 20; i++) {
      const vY = 1.15 - i * 0.08;
      const vertGeom = new THREE.CylinderGeometry(0.05, 0.06, 0.045, 10);
      const vertMesh = new THREE.Mesh(vertGeom, boneMaterial);
      vertMesh.position.set(0, vY, -0.04 + Math.sin(i * 0.3) * 0.02);
      skeletonGroup.add(vertMesh);
    }

    // C. Ribcage (10 Bilateral Curved Thoracic Rib Arches & Sternum)
    const sternumGeom = new THREE.CylinderGeometry(0.04, 0.035, 0.55, 8);
    const sternumMesh = new THREE.Mesh(sternumGeom, boneMaterial);
    sternumMesh.position.set(0, 0.65, 0.22);
    skeletonGroup.add(sternumMesh);

    for (let r = 0; r < 8; r++) {
      const ribY = 0.9 - r * 0.07;
      const radiusX = 0.36 - r * 0.015;
      const ribGeom = new THREE.TorusGeometry(radiusX, 0.016, 8, 24, Math.PI * 1.15);
      const ribMesh = new THREE.Mesh(ribGeom, boneJointMaterial);
      ribMesh.rotation.x = Math.PI / 2 + 0.15;
      ribMesh.rotation.z = Math.PI * 0.42;
      ribMesh.position.set(0, ribY, 0.04);
      skeletonGroup.add(ribMesh);
    }

    // D. Clavicles (Collarbones)
    const clavicleGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.65, 8);
    const clavicleMesh = new THREE.Mesh(clavicleGeom, boneMaterial);
    clavicleMesh.rotation.z = Math.PI / 2;
    clavicleMesh.position.set(0, 1.05, 0.08);
    skeletonGroup.add(clavicleMesh);

    // E. Pelvic Girdle (Sacrum & Iliac Wings)
    const pelvisGeom = new THREE.TorusGeometry(0.34, 0.07, 10, 24, Math.PI * 1.2);
    const pelvisMesh = new THREE.Mesh(pelvisGeom, boneMaterial);
    pelvisMesh.rotation.x = Math.PI / 2 + 0.3;
    pelvisMesh.rotation.z = Math.PI * 0.4;
    pelvisMesh.position.set(0, -0.4, 0);
    skeletonGroup.add(pelvisMesh);

    // F. Upper Limbs (Humerus, Radius, Ulna, Hands)
    const createArmSkeleton = (side: number) => {
      // Humerus (Upper arm)
      const humerusGeom = new THREE.CylinderGeometry(0.035, 0.03, 0.55, 10);
      const humerus = new THREE.Mesh(humerusGeom, boneMaterial);
      humerus.position.set(side * 0.55, 0.72, 0);
      humerus.rotation.z = side * -0.15;
      skeletonGroup.add(humerus);

      // Elbow joint
      const elbowGeom = new THREE.SphereGeometry(0.045, 10, 10);
      const elbow = new THREE.Mesh(elbowGeom, boneJointMaterial);
      elbow.position.set(side * 0.62, 0.42, 0);
      skeletonGroup.add(elbow);

      // Forearm (Radius/Ulna)
      const forearmGeom = new THREE.CylinderGeometry(0.028, 0.024, 0.52, 10);
      const forearm = new THREE.Mesh(forearmGeom, boneMaterial);
      forearm.position.set(side * 0.68, 0.14, 0.05);
      forearm.rotation.z = side * -0.12;
      skeletonGroup.add(forearm);

      // Hand
      const handGeom = new THREE.BoxGeometry(0.07, 0.12, 0.03);
      const hand = new THREE.Mesh(handGeom, boneMaterial);
      hand.position.set(side * 0.73, -0.16, 0.08);
      skeletonGroup.add(hand);
    };
    createArmSkeleton(1);
    createArmSkeleton(-1);

    // G. Lower Limbs (Femur, Knee, Tibia, Fibula, Feet)
    const createLegSkeleton = (side: number) => {
      // Femur (Thigh bone)
      const femurGeom = new THREE.CylinderGeometry(0.045, 0.038, 0.75, 10);
      const femur = new THREE.Mesh(femurGeom, boneMaterial);
      femur.position.set(side * 0.22, -0.85, 0);
      femur.rotation.z = side * -0.05;
      skeletonGroup.add(femur);

      // Patella / Knee Joint
      const kneeGeom = new THREE.SphereGeometry(0.055, 10, 10);
      const knee = new THREE.Mesh(kneeGeom, boneJointMaterial);
      knee.position.set(side * 0.23, -1.25, 0.04);
      skeletonGroup.add(knee);

      // Tibia / Lower leg
      const tibiaGeom = new THREE.CylinderGeometry(0.036, 0.03, 0.72, 10);
      const tibia = new THREE.Mesh(tibiaGeom, boneMaterial);
      tibia.position.set(side * 0.24, -1.65, 0);
      skeletonGroup.add(tibia);

      // Foot
      const footGeom = new THREE.BoxGeometry(0.09, 0.05, 0.22);
      const foot = new THREE.Mesh(footGeom, boneMaterial);
      foot.position.set(side * 0.25, -2.04, 0.08);
      skeletonGroup.add(foot);
    };
    createLegSkeleton(1);
    createLegSkeleton(-1);

    // =========================================================================
    // LAYER 2: MUSCULAR SYSTEM (MUSCLES) - Crimson Holographic Fiber Shader
    // =========================================================================
    const muscleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff4757,
      emissive: 0xb33939,
      emissiveIntensity: 0.45,
      roughness: 0.3,
      metalness: 0.35,
      transmission: 0.35,
      transparent: true,
      opacity: 0.78,
      wireframe: false,
    });

    const muscleFiberMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b81,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });

    // Pectorals (Chest Plates)
    [-1, 1].forEach((side) => {
      const pecGeom = new THREE.BoxGeometry(0.24, 0.22, 0.12);
      const pecMesh = new THREE.Mesh(pecGeom, muscleMaterial);
      pecMesh.position.set(side * 0.16, 0.76, 0.23);
      pecMesh.rotation.y = side * 0.2;
      muscleGroup.add(pecMesh);
    });

    // Abdominal Wall (Rectus Abdominis - 6 Segmented Packs)
    for (let row = 0; row < 3; row++) {
      [-1, 1].forEach((side) => {
        const absGeom = new THREE.BoxGeometry(0.13, 0.12, 0.08);
        const absMesh = new THREE.Mesh(absGeom, muscleMaterial);
        absMesh.position.set(side * 0.09, 0.48 - row * 0.14, 0.2);
        muscleGroup.add(absMesh);
      });
    }

    // Deltoids (Shoulders)
    [-1, 1].forEach((side) => {
      const deltGeom = new THREE.SphereGeometry(0.12, 12, 12);
      deltGeom.scale(1, 1.4, 1.1);
      const deltMesh = new THREE.Mesh(deltGeom, muscleMaterial);
      deltMesh.position.set(side * 0.52, 0.96, 0.05);
      muscleGroup.add(deltMesh);

      // Biceps
      const bicepGeom = new THREE.CylinderGeometry(0.08, 0.07, 0.35, 10);
      const bicepMesh = new THREE.Mesh(bicepGeom, muscleMaterial);
      bicepMesh.position.set(side * 0.58, 0.7, 0.04);
      muscleGroup.add(bicepMesh);

      // Quadriceps (Thigh Muscles)
      const quadGeom = new THREE.CylinderGeometry(0.12, 0.09, 0.62, 12);
      const quadMesh = new THREE.Mesh(quadGeom, muscleMaterial);
      quadMesh.position.set(side * 0.23, -0.82, 0.05);
      muscleGroup.add(quadMesh);

      // Calves (Gastrocnemius)
      const calfGeom = new THREE.SphereGeometry(0.1, 12, 12);
      calfGeom.scale(0.9, 1.8, 1);
      const calfMesh = new THREE.Mesh(calfGeom, muscleMaterial);
      calfMesh.position.set(side * 0.24, -1.55, -0.02);
      muscleGroup.add(calfMesh);
    });

    // Muscle Contour Wireframe Mesh Envelope
    const muscleTorsoGeom = new THREE.CylinderGeometry(0.38, 0.28, 0.95, 16, 6);
    const muscleTorsoMesh = new THREE.Mesh(muscleTorsoGeom, muscleFiberMaterial);
    muscleTorsoMesh.position.set(0, 0.48, 0.06);
    muscleGroup.add(muscleTorsoMesh);

    // =========================================================================
    // LAYER 3: VASCULAR SYSTEM (VEINS, ARTERIES & PULSING HEART)
    // =========================================================================
    const arteryMaterial = new THREE.MeshBasicMaterial({
      color: 0xff1744, // Bright arterial red
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    const veinMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff, // Bright venous cyan
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    // Anatomical Beating Heart
    const heartMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0xff0055,
        emissive: 0xff0033,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      })
    );
    heartMesh.position.set(-0.06, 0.68, 0.12);
    vascularGroup.add(heartMesh);

    // Aortic Arch & Descending Aorta
    const aortaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.06, 0.75, 0.12),
      new THREE.Vector3(-0.02, 0.88, 0.1),
      new THREE.Vector3(0.04, 0.82, 0.06),
      new THREE.Vector3(0.02, 0.2, 0.02),
      new THREE.Vector3(0.0, -0.4, 0.02),
    ]);
    const aortaGeom = new THREE.TubeGeometry(aortaCurve, 32, 0.025, 8, false);
    const aortaMesh = new THREE.Mesh(aortaGeom, arteryMaterial);
    vascularGroup.add(aortaMesh);

    // Vena Cava (Major Return Vein)
    const venaCavaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.08, 0.95, 0.06),
      new THREE.Vector3(0.06, 0.68, 0.1),
      new THREE.Vector3(0.05, 0.15, 0.03),
      new THREE.Vector3(0.04, -0.42, 0.02),
    ]);
    const venaCavaMesh = new THREE.Mesh(
      new THREE.TubeGeometry(venaCavaCurve, 24, 0.024, 8, false),
      veinMaterial
    );
    vascularGroup.add(venaCavaMesh);

    // Carotid Arteries (Ascending Neck to Head)
    [-1, 1].forEach((side) => {
      const carotidCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.05, 0.88, 0.08),
        new THREE.Vector3(side * 0.09, 1.15, 0.06),
        new THREE.Vector3(side * 0.12, 1.42, 0.05),
      ]);
      const carotidMesh = new THREE.Mesh(
        new THREE.TubeGeometry(carotidCurve, 16, 0.015, 6, false),
        arteryMaterial
      );
      vascularGroup.add(carotidMesh);

      // Arm Vessels (Brachial & Radial)
      const armVesselCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.15, 0.9, 0.08),
        new THREE.Vector3(side * 0.52, 0.72, 0.02),
        new THREE.Vector3(side * 0.64, 0.35, 0.04),
        new THREE.Vector3(side * 0.72, -0.15, 0.06),
      ]);
      const armVesselMesh = new THREE.Mesh(
        new THREE.TubeGeometry(armVesselCurve, 24, 0.014, 6, false),
        side === 1 ? arteryMaterial : veinMaterial
      );
      vascularGroup.add(armVesselMesh);

      // Leg Vessels (Femoral & Tibial)
      const legVesselCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.04, -0.42, 0.02),
        new THREE.Vector3(side * 0.2, -0.85, 0.04),
        new THREE.Vector3(side * 0.22, -1.35, 0.02),
        new THREE.Vector3(side * 0.24, -1.95, 0.05),
      ]);
      const legVesselMesh = new THREE.Mesh(
        new THREE.TubeGeometry(legVesselCurve, 28, 0.016, 6, false),
        side === 1 ? arteryMaterial : veinMaterial
      );
      vascularGroup.add(legVesselMesh);
    });

    // Circulating Blood Stream Particles (Dynamic Erythrocyte Flow)
    const bloodCellCount = 220;
    const bloodCellGeom = new THREE.BufferGeometry();
    const bloodCellPositions = new Float32Array(bloodCellCount * 3);
    const bloodCellColors = new Float32Array(bloodCellCount * 3);

    for (let b = 0; b < bloodCellCount; b++) {
      const t = Math.random();
      // Distribute along vascular corridors
      const side = Math.random() > 0.5 ? 1 : -1;
      const isArterial = Math.random() > 0.45;

      const y = (Math.random() - 0.5) * 3.2;
      const spread = Math.sin((y + 1.6) / 3.2 * Math.PI) * 0.35;
      const x = (Math.random() - 0.5) * spread + (y < -0.4 ? side * 0.22 : y > 0.2 ? side * 0.15 : 0);
      const z = (Math.random() - 0.5) * 0.2;

      bloodCellPositions[b * 3] = x;
      bloodCellPositions[b * 3 + 1] = y;
      bloodCellPositions[b * 3 + 2] = z;

      // Color: Red for arterial blood, Cyan for oxygenated return
      if (isArterial) {
        bloodCellColors[b * 3] = 1.0;
        bloodCellColors[b * 3 + 1] = 0.15;
        bloodCellColors[b * 3 + 2] = 0.25;
      } else {
        bloodCellColors[b * 3] = 0.34;
        bloodCellColors[b * 3 + 1] = 0.9;
        bloodCellColors[b * 3 + 2] = 0.95;
      }
    }

    bloodCellGeom.setAttribute('position', new THREE.BufferAttribute(bloodCellPositions, 3));
    bloodCellGeom.setAttribute('color', new THREE.BufferAttribute(bloodCellColors, 3));

    const bloodCellMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const bloodCells = new THREE.Points(bloodCellGeom, bloodCellMat);
    vascularGroup.add(bloodCells);

    // =========================================================================
    // LAYER 4: NEURAL / NERVOUS SYSTEM (BRAIN & SYNAPSE MATRIX)
    // =========================================================================
    // Brain Cerebral Cortex
    const brainGeom = new THREE.IcosahedronGeometry(0.24, 2);
    const brainMat = new THREE.MeshBasicMaterial({
      color: 0x9b8cff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const brainMesh = new THREE.Mesh(brainGeom, brainMat);
    brainMesh.position.set(0, 1.48, -0.02);
    neuralGroup.add(brainMesh);

    // Spinal Neural Conduit (Spinal Cord)
    const spinalCordGeom = new THREE.CylinderGeometry(0.022, 0.018, 1.5, 10);
    const spinalCordMat = new THREE.MeshBasicMaterial({
      color: 0x9b8cff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const spinalCordMesh = new THREE.Mesh(spinalCordGeom, spinalCordMat);
    spinalCordMesh.position.set(0, 0.45, -0.06);
    neuralGroup.add(spinalCordMesh);

    // Radiating Synaptic Neural Particles (Action Potentials)
    const synapseCount = 140;
    const synapseGeom = new THREE.BufferGeometry();
    const synapsePositions = new Float32Array(synapseCount * 3);

    for (let s = 0; s < synapseCount; s++) {
      synapsePositions[s * 3] = (Math.random() - 0.5) * 0.9;
      synapsePositions[s * 3 + 1] = 1.6 - Math.random() * 2.8;
      synapsePositions[s * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    synapseGeom.setAttribute('position', new THREE.BufferAttribute(synapsePositions, 3));
    const synapsePoints = new THREE.Points(
      synapseGeom,
      new THREE.PointsMaterial({
        color: 0xc8d6e5,
        size: 0.03,
        transparent: true,
        opacity: 0.8,
      })
    );
    neuralGroup.add(synapsePoints);

    // =========================================================================
    // LAYER 5: 5D HYPER-DIMENSIONAL QUANTUM GYROSCOPE RINGS
    // =========================================================================
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.012, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x56e6f2, transparent: true, opacity: 0.6 })
    );
    ring1.rotation.x = Math.PI / 3;
    biofield5DGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.01, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x9b8cff, transparent: true, opacity: 0.55 })
    );
    ring2.rotation.y = Math.PI / 4;
    biofield5DGroup.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.008, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xffb703, transparent: true, opacity: 0.5 })
    );
    ring3.rotation.z = Math.PI / 6;
    biofield5DGroup.add(ring3);

    setIsLoaded(true);

    // 4. ANIMATION INTERPOLATION VARIABLES (DISSOCIATION & 5D MOTION)
    let currentDissociate = 0;
    let targetDissociate = 0;

    let autoRotationAngle = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let userManualRotationY = 0;

    // Pointer Drag to Rotate Around Model
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointerX;
      userManualRotationY += deltaX * 0.008;
      previousPointerX = e.clientX;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Page Scroll Coupling
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // 5. MAIN RENDER LOOP (Continuous 5D Circular Orbit & Explosive Dissociation)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const speedMultiplier = rotationSpeedRef.current;

      // Update Target Dissociation Value
      targetDissociate = isDissociatedRef.current ? 1.0 : 0.0;
      currentDissociate = THREE.MathUtils.lerp(currentDissociate, targetDissociate, 0.055);

      // A. Continuous Circular Motion (5D Hyper-Orbital Motion)
      autoRotationAngle += 0.0075 * speedMultiplier;
      masterAssembly.rotation.y = autoRotationAngle + userManualRotationY;

      // Scroll-Linked Multi-Axis Perspective Pitch
      const scrollPitch = Math.sin(scrollY * 0.002) * 0.12;
      masterAssembly.rotation.x = scrollPitch;
      masterAssembly.rotation.z = Math.cos(scrollY * 0.0015) * 0.05;

      // Camera Z-Depth reacts slightly to scroll
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5.4 + (scrollY * 0.0006), 0.05);

      // B. Dissociation Layer Vectors (Exploded Separations)
      // 1. Muscles glide forward (+Z) and right (+X)
      muscleGroup.position.set(
        currentDissociate * 0.75,
        0,
        currentDissociate * 1.25
      );
      muscleGroup.rotation.y = currentDissociate * 0.18;

      // 2. Vascular System (Veins & Heart) glides backward (-Z) and left (-X)
      vascularGroup.position.set(
        -currentDissociate * 0.75,
        0,
        -currentDissociate * 1.25
      );
      vascularGroup.rotation.y = -currentDissociate * 0.18;

      // 3. Neural System glides upward (+Y)
      neuralGroup.position.set(
        0,
        currentDissociate * 0.65,
        0
      );

      // 4. Skeleton remains anchored with slight breathing dilation
      skeletonGroup.position.set(0, 0, 0);
      skeletonGroup.scale.setScalar(1 + currentDissociate * 0.05);

      // 5. 5D Rings expand in exploded mode
      biofield5DGroup.scale.setScalar(1 + currentDissociate * 0.35);
      ring1.rotation.x = elapsedTime * 0.4 * speedMultiplier;
      ring1.rotation.y = elapsedTime * 0.6 * speedMultiplier;
      ring2.rotation.y = -elapsedTime * 0.5 * speedMultiplier;
      ring2.rotation.z = elapsedTime * 0.3 * speedMultiplier;
      ring3.rotation.z = elapsedTime * 0.45 * speedMultiplier;

      // C. Beating Heart Cardiac Pulse Animation (72 BPM)
      const heartPulse = 1.0 + Math.sin(elapsedTime * 7.5) * 0.09 * (1 + (Math.sin(elapsedTime * 15) > 0 ? 0.08 : 0));
      heartMesh.scale.setScalar(heartPulse);

      // D. Circulating Blood Stream Motion along Corridors
      const bPositions = bloodCellGeom.attributes.position.array as Float32Array;
      for (let b = 0; b < bloodCellCount; b++) {
        bPositions[b * 3 + 1] -= 0.018 * speedMultiplier; // Flow downward
        if (bPositions[b * 3 + 1] < -2.1) {
          bPositions[b * 3 + 1] = 1.55; // Recycle back to head/heart
        }
      }
      bloodCellGeom.attributes.position.needsUpdate = true;

      // E. Synaptic Neural Sparkle Pulsing
      brainMesh.rotation.y = elapsedTime * 0.3;

      // F. Layer Visibility Isolation Controls
      const currentLayer = activeLayerRef.current;
      skeletonGroup.visible = currentLayer === 'all' || currentLayer === 'skeleton';
      muscleGroup.visible = currentLayer === 'all' || currentLayer === 'muscles';
      vascularGroup.visible = currentLayer === 'all' || currentLayer === 'vascular';
      neuralGroup.visible = currentLayer === 'all' || currentLayer === 'neural';

      // Update rotation telemetry state occasionally
      if (Math.floor(elapsedTime * 30) % 6 === 0) {
        setRotMetrics({
          rotY: Math.round(((masterAssembly.rotation.y * 180) / Math.PI) % 360),
          depth: parseFloat(camera.position.z.toFixed(2)),
          progress: Math.round(currentDissociate * 100),
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Responsive Resize Handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] sm:h-[600px] lg:h-[680px] flex items-center justify-center select-none overflow-hidden bg-gradient-to-b from-[#07111F]/95 via-[#0B1930]/85 to-[#07111F]"
      aria-label="Interactive 3D Anatomical Human Model with Exploded Layer Dissociation and 5D Orbital Motion"
    >
      {/* Dynamic 5D Holographic Radial Aurora */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className={`rounded-full blur-3xl transition-all duration-700 ${
            isDissociated
              ? 'w-[520px] h-[520px] bg-gradient-to-tr from-[#56E6F2]/20 via-[#ff4757]/20 to-[#9B8CFF]/25 scale-110'
              : 'w-[400px] h-[400px] bg-gradient-to-tr from-[#56E6F2]/15 via-[#9B8CFF]/15 to-transparent'
          }`}
        />
      </div>

      {/* Primary 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onClick={() => setIsDissociated(!isDissociated)}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500 z-10"
        title="Click to dissociate human body into bones, muscles and veins!"
      />

      {/* TOP-LEFT HUD: 5D Orbit & Dissociation Telemetry */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1930]/85 backdrop-blur-md border border-[#56E6F2]/30 text-[10px] font-mono text-[#56E6F2] shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#56E6F2] animate-pulse" />
          <span>
            5D ANATOMY • ORBIT: {rotMetrics.rotY}° • Z:{rotMetrics.depth}m
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#07111F]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#8FA2BD]">
          <span
            className={`w-2 h-2 rounded-full ${
              isDissociated ? 'bg-[#ff4757] animate-ping' : 'bg-[#56E6F2]'
            }`}
          />
          <span>
            MODE: {isDissociated ? `DISSOCIATED (${rotMetrics.progress}%)` : 'ASSEMBLED (HOLISTIC)'}
          </span>
        </div>
      </div>

      {/* TOP-RIGHT CONTROLS: Anatomical Layer Isolators */}
      <div className="absolute top-4 right-4 z-20 flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#07111F]/85 backdrop-blur-xl border border-white/10 shadow-xl">
        {(
          [
            { id: 'all', label: 'All' },
            { id: 'skeleton', label: 'Bones' },
            { id: 'muscles', label: 'Muscles' },
            { id: 'vascular', label: 'Veins' },
            { id: 'neural', label: 'Neural' },
          ] as { id: IsolatedLayer; label: string }[]
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveLayer(item.id);
            }}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
              activeLayer === item.id
                ? 'bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] shadow-md shadow-[#56E6F2]/25'
                : 'text-[#8FA2BD] hover:text-[#F7FAFF] hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* DISSOCIATED FLOATING 3D HOLOGRAPHIC CALLOUT LABELS */}
      {isDissociated && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-between px-6 sm:px-12">
          {/* Left Callouts: Vascular & Neural */}
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="p-3 rounded-2xl bg-[#0B1930]/90 backdrop-blur-xl border border-[#00e5ff]/40 shadow-xl max-w-[190px]">
              <div className="flex items-center gap-1.5 text-[#00e5ff] text-[10px] font-mono font-bold">
                <Heart className="w-3.5 h-3.5 fill-[#ff1744] text-[#ff1744] animate-pulse" />
                <span>VASCULAR & VEINS</span>
              </div>
              <p className="text-[11px] text-[#F7FAFF] font-semibold mt-1">
                72 BPM • Active Circulation
              </p>
              <p className="text-[10px] text-[#8FA2BD] leading-tight mt-0.5">
                Hemoglobin, RBCs & Platelet transport network.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#0B1930]/90 backdrop-blur-xl border border-[#9b8cff]/40 shadow-xl max-w-[190px]">
              <div className="flex items-center gap-1.5 text-[#9b8cff] text-[10px] font-mono font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>NEURAL CONDUIT</span>
              </div>
              <p className="text-[11px] text-[#F7FAFF] font-semibold mt-1">
                Central Synaptic Matrix
              </p>
              <p className="text-[10px] text-[#8FA2BD] leading-tight mt-0.5">
                Spinal cord & reflex nerve impulses.
              </p>
            </div>
          </div>

          {/* Right Callouts: Muscles & Bones */}
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-3 rounded-2xl bg-[#0B1930]/90 backdrop-blur-xl border border-[#ff4757]/40 shadow-xl max-w-[190px]">
              <div className="flex items-center gap-1.5 text-[#ff4757] text-[10px] font-mono font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>MUSCULAR FIBERS</span>
              </div>
              <p className="text-[11px] text-[#F7FAFF] font-semibold mt-1">
                Myocyte Contractile Layer
              </p>
              <p className="text-[10px] text-[#8FA2BD] leading-tight mt-0.5">
                Glucose metabolism & creatine phosphate reserves.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#0B1930]/90 backdrop-blur-xl border border-[#56e6f2]/40 shadow-xl max-w-[190px]">
              <div className="flex items-center gap-1.5 text-[#56e6f2] text-[10px] font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SKELETAL FRAME</span>
              </div>
              <p className="text-[11px] text-[#F7FAFF] font-semibold mt-1">
                Hematopoietic Marrow
              </p>
              <p className="text-[10px] text-[#8FA2BD] leading-tight mt-0.5">
                Calcium framework & blood cell synthesis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CENTER-BOTTOM PRIMARY CTA: CLICK TO DISSOCIATE */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsDissociated(!isDissociated);
          }}
          className={`pointer-events-auto group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-extrabold text-xs tracking-wide uppercase transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer ${
            isDissociated
              ? 'bg-gradient-to-r from-[#ff4757] via-[#ff6b81] to-[#ffa502] text-white shadow-[0_0_35px_rgba(255,71,87,0.45)]'
              : 'bg-gradient-to-r from-[#56E6F2] via-[#38bdf8] to-[#9B8CFF] text-[#07111F] shadow-[0_0_35px_rgba(86,230,242,0.4)]'
          }`}
        >
          <Split className={`w-4 h-4 transition-transform duration-500 ${isDissociated ? 'rotate-180' : ''}`} />
          <span>
            {isDissociated ? 'Reassemble Human Body' : 'Click to Dissociate Anatomy (5D Exploded View)'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/20 text-current">
            {isDissociated ? 'Unified' : 'Explode'}
          </span>
        </button>

        {/* Orbit Speed & Interactive Hint */}
        <div className="flex items-center gap-3 text-[10px] text-[#8FA2BD] pointer-events-auto">
          <span className="hidden sm:inline">Drag to orbit freely • Click body or button to separate layers</span>
          <div className="flex items-center gap-1 bg-[#07111F]/80 px-2 py-0.5 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setRotationSpeed(rotationSpeed === 0 ? 1 : 0)}
              className="hover:text-[#56E6F2] transition-colors p-0.5"
              title={rotationSpeed === 0 ? 'Resume Orbit' : 'Pause Orbit'}
            >
              {rotationSpeed === 0 ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => setRotationSpeed(rotationSpeed === 2 ? 1 : 2)}
              className={`px-1.5 py-0.2 rounded font-mono ${
                rotationSpeed === 2 ? 'text-[#56E6F2] font-bold' : 'text-[#8FA2BD]'
              }`}
              title="Fast 5D Rotation"
            >
              2x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
