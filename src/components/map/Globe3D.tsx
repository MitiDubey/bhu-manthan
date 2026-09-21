import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';
import {
  CADASTRAL_HOTSPOTS,
  SATELLITE_CONSTELLATION,
  latLonToVector3,
  CadastralHotspot,
  SatelliteOrbit,
} from './earth/earthData';
import {
  createDayEarthTexture,
  createNightLightsTexture,
  createOceanSpecularTexture,
  createAtmosphericCloudTexture,
  createNdviBiosphereTexture,
} from './earth/earthTextures';
import { createAtmosphereMesh, createInnerAtmosphereMesh } from './earth/atmosphereShader';
import {
  Globe,
  Satellite as SatelliteIcon,
  Layers,
  Play,
  Pause,
  RotateCcw,
  MapPin,
  Sparkles,
  Sun,
  Moon,
  ChevronRight,
  Radio,
  Sliders,
  Maximize2,
  X,
} from 'lucide-react';

type SimulationMode = 'natural' | 'cadastral' | 'ndvi' | 'night';

export const Globe3D: React.FC = () => {
  const { setCurrentPage } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulation state
  const [activeMode, setActiveMode] = useState<SimulationMode>('natural');
  const [showClouds, setShowClouds] = useState<boolean>(true);
  const [showSatellites, setShowSatellites] = useState<boolean>(true);
  const [showCadastralGrid, setShowCadastralGrid] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [sunAngle, setSunAngle] = useState<number>(45); // Sun longitude degrees
  const [selectedHotspot, setSelectedHotspot] = useState<CadastralHotspot | null>(
    CADASTRAL_HOTSPOTS[0] // Default to Varanasi
  );
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteOrbit | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // References to communicate with Three.js animation loop without re-instantiating scene
  const sceneRefs = useRef<{
    earthMaterial?: THREE.MeshStandardMaterial;
    nightMesh?: THREE.Mesh;
    cloudMesh?: THREE.Mesh;
    gridGroup?: THREE.Group;
    satellitesGroup?: THREE.Group;
    hotspotsGroup?: THREE.Group;
    dirLight?: THREE.DirectionalLight;
    globeGroup?: THREE.Group;
    targetRotation?: { x: number; y: number } | null;
    isUserDragging?: boolean;
    dayTex?: THREE.CanvasTexture;
    nightTex?: THREE.CanvasTexture;
    ndviTex?: THREE.CanvasTexture;
  }>({});

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.85;

    // 3. WebGL Renderer with High-Fidelity Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Cosmos Starfield Background
    const starGeo = new THREE.BufferGeometry();
    const starCount = 900;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 40 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      // Mix of blue-white and warm golden stars
      const isWarm = Math.random() > 0.75;
      starColors[i * 3] = isWarm ? 1.0 : 0.6 + Math.random() * 0.4;
      starColors[i * 3 + 1] = isWarm ? 0.85 : 0.8 + Math.random() * 0.2;
      starColors[i * 3 + 2] = isWarm ? 0.6 : 1.0;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 5. Master Globe Rotation Group
    const globeGroup = new THREE.Group();
    // Real Earth Axial Tilt: 23.44° (0.409 radians)
    globeGroup.rotation.z = -0.15;
    // Initial rotation: Focus prominently on India & Varanasi (~83°E, 25°N)
    globeGroup.rotation.y = -2.25;
    globeGroup.rotation.x = 0.35;
    scene.add(globeGroup);
    sceneRefs.current.globeGroup = globeGroup;

    // 6. Generate Procedural Textures
    const dayTex = createDayEarthTexture();
    const nightTex = createNightLightsTexture();
    const specTex = createOceanSpecularTexture();
    const cloudTex = createAtmosphericCloudTexture();
    const ndviTex = createNdviBiosphereTexture();

    sceneRefs.current.dayTex = dayTex;
    sceneRefs.current.nightTex = nightTex;
    sceneRefs.current.ndviTex = ndviTex;

    // 7. Base Earth Sphere
    const earthGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: dayTex,
      roughnessMap: specTex,
      roughness: 0.65,
      metalness: 0.15,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);
    sceneRefs.current.earthMaterial = earthMat;

    // 8. Night Lights Shell (Additive Blending over Earth surface)
    const nightGeo = new THREE.SphereGeometry(1.002, 64, 64);
    const nightMat = new THREE.MeshBasicMaterial({
      map: nightTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
    });
    const nightMesh = new THREE.Mesh(nightGeo, nightMat);
    globeGroup.add(nightMesh);
    sceneRefs.current.nightMesh = nightMesh;

    // 9. Atmospheric Clouds Sphere (Independent rotation for weather winds)
    const cloudGeo = new THREE.SphereGeometry(1.015, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.82,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    globeGroup.add(cloudMesh);
    sceneRefs.current.cloudMesh = cloudMesh;

    // 10. Atmospheric Rayleigh Glow Halo & Inner Haze
    const outerAtmosphere = createAtmosphereMesh(1.0);
    globeGroup.add(outerAtmosphere);

    const innerAtmosphere = createInnerAtmosphereMesh(1.0);
    globeGroup.add(innerAtmosphere);

    // 11. Cadastral Graticules & Geospatial Coordinate Grid
    const gridGroup = new THREE.Group();
    globeGroup.add(gridGroup);
    sceneRefs.current.gridGroup = gridGroup;

    // Equator Ring
    const equatorGeo = new THREE.RingGeometry(1.006, 1.01, 96);
    const equatorMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const equatorMesh = new THREE.Mesh(equatorGeo, equatorMat);
    equatorMesh.rotation.x = Math.PI / 2;
    gridGroup.add(equatorMesh);

    // Tropic of Cancer (23.5°N - Passes directly across India)
    const tropicRadius = Math.cos(23.5 * (Math.PI / 180)) * 1.006;
    const tropicHeight = Math.sin(23.5 * (Math.PI / 180)) * 1.006;
    const tropicGeo = new THREE.RingGeometry(tropicRadius - 0.003, tropicRadius + 0.003, 96);
    const tropicMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const tropicMesh = new THREE.Mesh(tropicGeo, tropicMat);
    tropicMesh.rotation.x = Math.PI / 2;
    tropicMesh.position.y = tropicHeight;
    gridGroup.add(tropicMesh);

    // Coordinate Longitude Meridians (Prime Meridian & 82.5°E IST Meridian)
    const meridianPoints: THREE.Vector3[] = [];
    for (let lat = -90; lat <= 90; lat += 2) {
      meridianPoints.push(latLonToVector3(lat, 82.5, 1.007)); // Indian Standard Time Meridian
    }
    const istLineGeo = new THREE.BufferGeometry().setFromPoints(meridianPoints);
    const istLineMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    });
    const istLine = new THREE.Line(istLineGeo, istLineMat);
    gridGroup.add(istLine);

    // Radar Scanning Beam over Varanasi / North India
    const radarGeo = new THREE.RingGeometry(0.02, 0.22, 32, 1, 0, Math.PI / 2);
    const radarMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const radarMesh = new THREE.Mesh(radarGeo, radarMat);
    const varanasiPos = latLonToVector3(25.3176, 82.9739, 1.018);
    radarMesh.position.copy(varanasiPos);
    radarMesh.lookAt(new THREE.Vector3(0, 0, 0));
    gridGroup.add(radarMesh);

    // 12. Cadastral Hotspots (Interactive 3D Beacons)
    const hotspotsGroup = new THREE.Group();
    globeGroup.add(hotspotsGroup);
    sceneRefs.current.hotspotsGroup = hotspotsGroup;

    const beaconRings: { mesh: THREE.Mesh; scale: number; baseSize: number }[] = [];

    CADASTRAL_HOTSPOTS.forEach(spot => {
      const pos = latLonToVector3(spot.lat, spot.lon, 1.012);
      const isCore = spot.type === 'core';
      const colorNum = new THREE.Color(spot.color).getHex();

      // Pin Central Dot
      const dotGeo = new THREE.SphereGeometry(isCore ? 0.028 : 0.02, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: colorNum });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(pos);
      dotMesh.userData = { isHotspot: true, hotspot: spot };
      hotspotsGroup.add(dotMesh);

      // Altitude Vertical Stem
      const stemPoints = [pos, latLonToVector3(spot.lat, spot.lon, isCore ? 1.06 : 1.04)];
      const stemGeo = new THREE.BufferGeometry().setFromPoints(stemPoints);
      const stemMat = new THREE.LineBasicMaterial({
        color: colorNum,
        transparent: true,
        opacity: 0.8,
      });
      const stemLine = new THREE.Line(stemGeo, stemMat);
      hotspotsGroup.add(stemLine);

      // Floating Beacon Head
      const headGeo = new THREE.SphereGeometry(isCore ? 0.022 : 0.015, 16, 16);
      const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.copy(stemPoints[1]);
      headMesh.userData = { isHotspot: true, hotspot: spot };
      hotspotsGroup.add(headMesh);

      // Pulsing Radar Ripple Ring
      const ringGeo = new THREE.RingGeometry(0.025, 0.035, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorNum,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      hotspotsGroup.add(ringMesh);
      beaconRings.push({ mesh: ringMesh, scale: 1.0, baseSize: isCore ? 1.6 : 1.0 });
    });

    // 13. Satellite Constellation & Orbital Tracks
    const satellitesGroup = new THREE.Group();
    globeGroup.add(satellitesGroup);
    sceneRefs.current.satellitesGroup = satellitesGroup;

    const satelliteMeshes: {
      orbit: SatelliteOrbit;
      mesh: THREE.Group;
      trackLine: THREE.Line;
      angle: number;
    }[] = [];

    SATELLITE_CONSTELLATION.forEach((sat, idx) => {
      // Orbital Ring Trajectory
      const orbitCurve = new THREE.EllipseCurve(
        0, 0,
        sat.radius, sat.radius,
        0, 2 * Math.PI,
        false,
        0
      );
      const orbitPoints = orbitCurve.getPoints(96).map(p => new THREE.Vector3(p.x, 0, p.y));
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(sat.color).getHex(),
        transparent: true,
        opacity: 0.35,
      });
      const orbitMesh = new THREE.Line(orbitGeo, orbitMat);
      orbitMesh.rotation.x = sat.inclination;
      orbitMesh.rotation.z = idx * 0.8;
      satellitesGroup.add(orbitMesh);

      // 3D Satellite Model Body + Solar Panels
      const satGroup = new THREE.Group();
      // Main Bus
      const busGeo = new THREE.BoxGeometry(0.025, 0.025, 0.035);
      const busMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.9,
        roughness: 0.2,
      });
      const busMesh = new THREE.Mesh(busGeo, busMat);
      satGroup.add(busMesh);

      // Solar Panels
      const panelGeo = new THREE.BoxGeometry(0.1, 0.015, 0.003);
      const panelMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(sat.color).getHex() });
      const panelMesh = new THREE.Mesh(panelGeo, panelMat);
      satGroup.add(panelMesh);

      // Swath Downward Projection Beam
      const beamGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -(sat.radius - 1.0), 0),
      ]);
      const beamMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(sat.color).getHex(),
        transparent: true,
        opacity: 0.5,
      });
      const beamLine = new THREE.Line(beamGeo, beamMat);
      satGroup.add(beamLine);

      satGroup.userData = { isSatellite: true, satellite: sat };
      satellitesGroup.add(satGroup);

      satelliteMeshes.push({
        orbit: sat,
        mesh: satGroup,
        trackLine: orbitMesh,
        angle: (idx * Math.PI) / 1.5,
      });
    });

    // 14. Directional Sunlight & Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x0c1e3a, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 2.6);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    sceneRefs.current.dirLight = dirLight;

    // Atmospheric Backlight
    const backLight = new THREE.DirectionalLight(0x00f0ff, 0.8);
    backLight.position.set(-6, -2, -4);
    scene.add(backLight);

    // 15. User Drag & Raycasting Interaction
    let isDragging = false;
    let dragDistance = 0;
    let previousMousePosition = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      sceneRefs.current.isUserDragging = true;
      dragDistance = 0;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      velocity = { x: 0, y: 0 };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

        velocity = { x: deltaX * 0.005, y: deltaY * 0.005 };
        globeGroup.rotation.y += velocity.x;
        globeGroup.rotation.x += velocity.y;
        // Clamp vertical tilt so globe doesn't invert
        globeGroup.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroup.rotation.x));

        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        // Hover Raycast Check
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(hotspotsGroup.children, true);
        if (intersects.length > 0) {
          const hit = intersects[0].object.userData.hotspot as CadastralHotspot | undefined;
          if (hit) {
            container.style.cursor = 'pointer';
            setHoveredItem(hit.name);
            return;
          }
        }
        container.style.cursor = 'grab';
        setHoveredItem(null);
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      isDragging = false;
      sceneRefs.current.isUserDragging = false;

      // If it was a crisp click (not drag), check for hotspot selection
      if (dragDistance < 6) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(hotspotsGroup.children, true);
        if (intersects.length > 0) {
          const hit = intersects[0].object.userData.hotspot as CadastralHotspot | undefined;
          if (hit) {
            setSelectedHotspot(hit);
            setSelectedSatellite(null);
            // Smoothly focus on this city
            focusHotspotCoordinates(hit.lat, hit.lon);
            return;
          }
        }

        // Check satellites
        const satIntersects = raycaster.intersectObjects(satellitesGroup.children, true);
        if (satIntersects.length > 0) {
          const hitSat = satIntersects[0].object.userData.satellite as SatelliteOrbit | undefined;
          if (hitSat) {
            setSelectedSatellite(hitSat);
            setSelectedHotspot(null);
          }
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.0015;
      camera.position.z = Math.max(1.8, Math.min(4.2, camera.position.z));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Focus Helper
    const focusHotspotCoordinates = (lat: number, lon: number) => {
      // Calculate target Y and X rotations to center this coordinate
      const targetY = -((lon + 180) * (Math.PI / 180)) + Math.PI / 2;
      const targetX = lat * (Math.PI / 180) * 0.45;
      sceneRefs.current.targetRotation = { x: targetX, y: targetY };
    };

    // 16. Continuous Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation towards target hotspot if selected
      if (sceneRefs.current.targetRotation) {
        const { x: tx, y: ty } = sceneRefs.current.targetRotation;
        globeGroup.rotation.y += (ty - globeGroup.rotation.y) * 0.05;
        globeGroup.rotation.x += (tx - globeGroup.rotation.x) * 0.05;
        if (
          Math.abs(ty - globeGroup.rotation.y) < 0.002 &&
          Math.abs(tx - globeGroup.rotation.x) < 0.002
        ) {
          sceneRefs.current.targetRotation = null;
        }
      } else if (!isDragging && isRotating) {
        // Natural Earth Planetary Rotation
        globeGroup.rotation.y += 0.0018;
      }

      // Atmospheric Cloud Drift (Winds blow slightly faster than Earth rotation)
      if (cloudMesh) {
        cloudMesh.rotation.y += 0.0006;
      }

      // Radar Sweep Rotation
      radarMesh.rotation.z += 0.035;

      // Pulsing Beacon Rings Animation
      beaconRings.forEach(beacon => {
        beacon.scale += delta * 0.8;
        if (beacon.scale > 2.8) beacon.scale = 1.0;
        const scaleVal = beacon.scale * beacon.baseSize;
        beacon.mesh.scale.set(scaleVal, scaleVal, scaleVal);
        (beacon.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(
          0,
          0.85 - (beacon.scale - 1.0) * 0.45
        );
      });

      // Update Satellites along Orbits
      satelliteMeshes.forEach(sat => {
        sat.angle += sat.orbit.speed;
        const r = sat.orbit.radius;
        const x = r * Math.cos(sat.angle);
        const z = r * Math.sin(sat.angle);

        // Position with orbital inclination
        sat.mesh.position.set(x, 0, z);
        sat.mesh.rotation.y = -sat.angle;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 17. Container Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      nightGeo.dispose();
      nightMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRotating]);

  // Synchronize Simulation Mode Changes
  useEffect(() => {
    const { earthMaterial, nightMesh, dayTex, nightTex, ndviTex } = sceneRefs.current;
    if (!earthMaterial) return;

    if (activeMode === 'natural') {
      earthMaterial.map = dayTex || null;
      earthMaterial.roughness = 0.65;
      earthMaterial.metalness = 0.15;
      if (nightMesh) nightMesh.visible = true;
    } else if (activeMode === 'cadastral') {
      earthMaterial.map = dayTex || null;
      earthMaterial.roughness = 0.5;
      earthMaterial.metalness = 0.3;
      if (nightMesh) nightMesh.visible = true;
    } else if (activeMode === 'ndvi') {
      earthMaterial.map = ndviTex || null;
      earthMaterial.roughness = 0.8;
      earthMaterial.metalness = 0.05;
      if (nightMesh) nightMesh.visible = false;
    } else if (activeMode === 'night') {
      earthMaterial.map = nightTex || null;
      earthMaterial.roughness = 0.9;
      earthMaterial.metalness = 0.1;
      if (nightMesh) nightMesh.visible = true;
    }
    earthMaterial.needsUpdate = true;
  }, [activeMode]);

  // Synchronize Cloud Layer Toggle
  useEffect(() => {
    if (sceneRefs.current.cloudMesh) {
      sceneRefs.current.cloudMesh.visible = showClouds;
    }
  }, [showClouds]);

  // Synchronize Satellites Toggle
  useEffect(() => {
    if (sceneRefs.current.satellitesGroup) {
      sceneRefs.current.satellitesGroup.visible = showSatellites;
    }
  }, [showSatellites]);

  // Synchronize Cadastral Grid Toggle
  useEffect(() => {
    if (sceneRefs.current.gridGroup) {
      sceneRefs.current.gridGroup.visible = showCadastralGrid;
    }
  }, [showCadastralGrid]);

  // Synchronize Sun Position Slider
  useEffect(() => {
    if (sceneRefs.current.dirLight) {
      const rad = sunAngle * (Math.PI / 180);
      const distance = 7.0;
      sceneRefs.current.dirLight.position.set(
        distance * Math.cos(rad),
        2.5,
        distance * Math.sin(rad)
      );
    }
  }, [sunAngle]);

  // Quick Action Handlers
  const handleFocusVaranasi = () => {
    const varanasi = CADASTRAL_HOTSPOTS[0];
    setSelectedHotspot(varanasi);
    setSelectedSatellite(null);
    const targetY = -((varanasi.lon + 180) * (Math.PI / 180)) + Math.PI / 2;
    const targetX = varanasi.lat * (Math.PI / 180) * 0.45;
    sceneRefs.current.targetRotation = { x: targetX, y: targetY };
  };

  const handleFocusIndia = () => {
    const targetY = -((79.0 + 180) * (Math.PI / 180)) + Math.PI / 2;
    const targetX = 22.0 * (Math.PI / 180) * 0.45;
    sceneRefs.current.targetRotation = { x: targetX, y: targetY };
  };

  const handleResetOrbit = () => {
    sceneRefs.current.targetRotation = { x: 0.35, y: -2.25 };
  };

  return (
    <div className="relative w-full h-[540px] md:h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-twin-950 via-[#060b17] to-twin-950 border border-twin-700/60 shadow-2xl flex items-center justify-center select-none group">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* TOP LEFT: Telemetry HUD & Status */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-twin-900/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold tracking-wide">BHU-EARTH 3D SIMULATION</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400">VARANASI CORE ONLINE</span>
        </div>

        <div className="px-3 py-2 rounded-xl bg-twin-950/75 backdrop-blur-md border border-twin-700/50 text-[11px] font-mono text-slate-300 space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">AXIAL TILT:</span>
            <span className="text-cyan-400">23.44° OBLIQUE</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">REVISIT CYCLE:</span>
            <span className="text-emerald-400">SENTINEL-2 (5 DAYS)</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">MONITORED PARCELS:</span>
            <span className="text-amber-400">43,820 KHASRAS</span>
          </div>
          {hoveredItem && (
            <div className="pt-1 border-t border-twin-800 text-cyan-300 flex items-center gap-1.5 animate-pulse">
              <MapPin className="w-3 h-3" />
              <span>Target: {hoveredItem}</span>
            </div>
          )}
        </div>
      </div>

      {/* TOP RIGHT: Simulation Mode Selector */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-twin-900/85 backdrop-blur-md border border-twin-700/80 shadow-xl">
          <button
            onClick={() => setActiveMode('natural')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'natural'
                ? 'bg-cyan-500 text-black font-bold shadow-glow-cyan'
                : 'text-slate-300 hover:text-white hover:bg-twin-800'
            }`}
            title="Photorealistic Natural Earth with Day/Night and Clouds"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Natural</span>
          </button>

          <button
            onClick={() => setActiveMode('cadastral')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'cadastral'
                ? 'bg-cyan-500 text-black font-bold shadow-glow-cyan'
                : 'text-slate-300 hover:text-white hover:bg-twin-800'
            }`}
            title="Cadastral Grid with Lat/Lon Graticules & Radar Scans"
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cadastral</span>
          </button>

          <button
            onClick={() => setActiveMode('ndvi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'ndvi'
                ? 'bg-emerald-500 text-black font-bold shadow-glow-emerald'
                : 'text-slate-300 hover:text-white hover:bg-twin-800'
            }`}
            title="NDVI Vegetation Vitality & Eco-Buffers"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">NDVI</span>
          </button>

          <button
            onClick={() => setActiveMode('night')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'night'
                ? 'bg-amber-500 text-black font-bold'
                : 'text-slate-300 hover:text-white hover:bg-twin-800'
            }`}
            title="Night Lights & Urban Population Density"
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Night</span>
          </button>
        </div>

        {/* Quick Focus Shortcuts */}
        <div className="flex items-center gap-1 bg-twin-950/80 backdrop-blur-md px-2 py-1 rounded-xl border border-twin-800 text-[11px] font-mono">
          <button
            onClick={handleFocusVaranasi}
            className="px-2 py-1 rounded hover:bg-cyan-500/20 text-cyan-300 transition-colors"
          >
            ★ Focus Varanasi
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={handleFocusIndia}
            className="px-2 py-1 rounded hover:bg-emerald-500/20 text-emerald-300 transition-colors"
          >
            India Grid
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={handleResetOrbit}
            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reset Globe Orbit"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* BOTTOM LEFT: Simulation Controls (Clouds, Satellites, Sun Slider) */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-twin-900/85 backdrop-blur-md border border-twin-700/80 shadow-xl">
          {/* Play/Pause Rotation */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-xl text-xs font-mono transition-colors ${
              isRotating
                ? 'bg-twin-800 text-cyan-400 hover:bg-twin-700'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
            title={isRotating ? 'Pause Earth Rotation' : 'Resume Planetary Rotation'}
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Toggle Clouds */}
          <button
            onClick={() => setShowClouds(!showClouds)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 ${
              showClouds
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Clouds</span>
          </button>

          {/* Toggle Satellites */}
          <button
            onClick={() => setShowSatellites(!showSatellites)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 ${
              showSatellites
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <SatelliteIcon className="w-3.5 h-3.5" />
            <span>Satellites</span>
          </button>

          {/* Toggle Grid */}
          <button
            onClick={() => setShowCadastralGrid(!showCadastralGrid)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 ${
              showCadastralGrid
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
        </div>

        {/* Sun Angle / Day-Night Terminator Slider */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-twin-950/80 backdrop-blur-md border border-twin-800 text-xs font-mono text-slate-300 w-fit">
          <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[10px] text-slate-400">SUN ANGLE:</span>
          <input
            type="range"
            min="0"
            max="360"
            value={sunAngle}
            onChange={e => setSunAngle(Number(e.target.value))}
            className="w-28 h-1.5 bg-twin-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-[10px] text-cyan-400 font-mono w-7 text-right">{sunAngle}°</span>
        </div>
      </div>

      {/* BOTTOM RIGHT: Interactive Detail Drawer for Selected Hotspot or Satellite */}
      {selectedHotspot && (
        <div className="absolute bottom-4 right-4 z-20 w-80 max-w-[calc(100vw-32px)] p-4 rounded-2xl bg-twin-900/90 backdrop-blur-xl border border-cyan-500/40 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-start justify-between pb-2 border-b border-twin-800">
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: selectedHotspot.color }}
                />
                <h4 className="font-bold text-white text-sm tracking-wide">{selectedHotspot.name}</h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{selectedHotspot.stateOrRegion}</span>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="p-1 rounded-lg hover:bg-twin-800 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed mt-2.5">
            {selectedHotspot.description}
          </p>

          <div className="grid grid-cols-2 gap-2 my-3 text-[10px] font-mono">
            <div className="p-2 rounded-lg bg-twin-950/80 border border-twin-800">
              <span className="text-slate-500 block">CADASTRE PARCELS</span>
              <span className="font-bold text-cyan-300 text-xs">
                {selectedHotspot.monitoredParcels.toLocaleString()} Units
              </span>
            </div>
            <div className="p-2 rounded-lg bg-twin-950/80 border border-twin-800">
              <span className="text-slate-500 block">NDVI VEG INDEX</span>
              <span className="font-bold text-emerald-400 text-xs">
                {selectedHotspot.ndviScore} (Optimal)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-3 px-1">
            <span>OVERPASS:</span>
            <span className="text-amber-300">{selectedHotspot.lastSatellitePass}</span>
          </div>

          {selectedHotspot.id === 'varanasi' ? (
            <button
              onClick={() => setCurrentPage('digital-twin')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-cyan transition-transform transform active:scale-95"
            >
              <span>EXPLORE VARANASI DIGITAL TWIN</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage('gis-explorer')}
              className="w-full py-2 rounded-xl bg-twin-800 hover:bg-twin-700 border border-twin-700 text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>INSPECT IN GIS EXPLORER</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* SATELLITE DETAIL DRAWER */}
      {selectedSatellite && (
        <div className="absolute bottom-4 right-4 z-20 w-80 max-w-[calc(100vw-32px)] p-4 rounded-2xl bg-twin-900/90 backdrop-blur-xl border border-emerald-500/40 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-start justify-between pb-2 border-b border-twin-800">
            <div>
              <div className="flex items-center gap-1.5">
                <SatelliteIcon className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-white text-sm tracking-wide">
                  {selectedSatellite.name}
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{selectedSatellite.agency}</span>
            </div>
            <button
              onClick={() => setSelectedSatellite(null)}
              className="p-1 rounded-lg hover:bg-twin-800 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed mt-2.5">
            {selectedSatellite.purpose}
          </p>

          <div className="grid grid-cols-2 gap-2 my-3 text-[10px] font-mono">
            <div className="p-2 rounded-lg bg-twin-950/80 border border-twin-800">
              <span className="text-slate-500 block">ALTITUDE</span>
              <span className="font-bold text-emerald-300 text-xs">
                {selectedSatellite.altitudeKm.toLocaleString()} km
              </span>
            </div>
            <div className="p-2 rounded-lg bg-twin-950/80 border border-twin-800">
              <span className="text-slate-500 block">ORBITAL VELOCITY</span>
              <span className="font-bold text-cyan-300 text-xs">{selectedSatellite.speedKmS} km/s</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 mb-3 px-1">
            <span className="text-slate-500 block mb-0.5">PAYLOAD RESOLUTION:</span>
            <span className="text-white font-semibold">{selectedSatellite.resolution}</span>
          </div>

          <button
            onClick={() => setSelectedSatellite(null)}
            className="w-full py-2 rounded-xl bg-twin-800 hover:bg-twin-700 text-slate-200 font-mono text-xs transition-colors"
          >
            DISMISS TELEMETRY
          </button>
        </div>
      )}

      {/* DRAG HINT BADGE */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-slate-500 bg-twin-950/60 backdrop-blur-sm px-3 py-0.5 rounded-full border border-twin-800 pointer-events-none hidden sm:block">
        Click & drag to rotate • Scroll to zoom • Click nodes for telemetry
      </div>
    </div>
  );
};
