import * as THREE from 'three';

/**
 * Procedural Equirectangular Earth Texture Generator
 * Generates high-detail 2048x1024 maps completely offline with 0 external network dependencies.
 */

// Equirectangular projection helper: Converts (lon, lat) in degrees to Canvas (x, y)
function geoToCanvas(lon: number, lat: number, width: number, height: number): [number, number] {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return [x, y];
}

// Major continental landmass polygons in [lon, lat] coordinates (WGS84 Equirectangular)
const CONTINENT_POLYGONS: [number, number][][] = [
  // Eurasia & North Africa connected landmass (detailed Indian subcontinent, Asia, Europe)
  [
    [-9, 36], [-9, 43], [-1, 43], [5, 43], [3, 47], [-4, 48], [-1, 53], [8, 54],
    [10, 58], [5, 62], [15, 68], [28, 71], [40, 68], [60, 69], [75, 73], [100, 77],
    [125, 74], [140, 72], [170, 67], [180, 65], [175, 62], [162, 55], [142, 50],
    [132, 43], [122, 38], [120, 31], [118, 25], [110, 20], [108, 15], [105, 10],
    [101, 3], [98, 8], [92, 16], [88, 22], [85, 20], [80, 16], [80, 9], [77, 8],
    [73, 15], [70, 21], [68, 24], [62, 25], [57, 26], [50, 29], [48, 31], [40, 30],
    [35, 32], [32, 31], [27, 34], [23, 38], [20, 40], [16, 41], [12, 44], [3, 42],
    [-2, 37], [-6, 36], [-9, 36]
  ],
  // Indian Subcontinent high-fidelity refinement (Gujarati gulf, Deccan, Kanyakumari, Coromandel, Bay of Bengal, Sundarbans)
  [
    [68, 23], [70, 21], [72.8, 19], [73.8, 15.5], [75, 12], [76.5, 9.5], [77.5, 8.1],
    [78.2, 8.5], [79.8, 10.3], [80.3, 13], [82, 16], [84, 18.5], [87, 21.5], [89, 22],
    [90, 23.5], [88, 26], [85, 27.5], [80, 29], [75, 32], [73, 34], [71, 32], [70, 27],
    [68.5, 24.5], [68, 23]
  ],
  // Africa (Central & Southern)
  [
    [-17, 15], [-17, 12], [-12, 8], [-7, 4], [3, 6], [9, 4], [9, 0], [12, -6],
    [13, -12], [12, -18], [15, -23], [18, -34], [26, -34], [33, -28], [36, -18],
    [40, -10], [42, -2], [51, 11], [43, 12], [33, 27], [25, 32], [10, 37], [0, 36],
    [-10, 32], [-13, 27], [-17, 21], [-17, 15]
  ],
  // North America
  [
    [-168, 66], [-160, 60], [-150, 60], [-140, 58], [-130, 54], [-124, 48], [-124, 40],
    [-118, 34], [-115, 30], [-110, 23], [-105, 20], [-97, 18], [-92, 16], [-88, 16],
    [-83, 9], [-80, 8], [-77, 8], [-80, 15], [-83, 22], [-81, 25], [-80, 30], [-75, 35],
    [-71, 42], [-65, 44], [-60, 47], [-64, 50], [-60, 55], [-63, 60], [-70, 62],
    [-80, 62], [-90, 65], [-95, 68], [-115, 70], [-135, 70], [-155, 71], [-168, 66]
  ],
  // South America
  [
    [-77, 8], [-73, 11], [-62, 10], [-52, 5], [-45, -1], [-35, -5], [-35, -10],
    [-38, -14], [-40, -20], [-45, -24], [-50, -30], [-55, -35], [-65, -45], [-68, -55],
    [-75, -50], [-74, -40], [-72, -30], [-70, -20], [-77, -12], [-81, -5], [-79, 1],
    [-77, 8]
  ],
  // Australia
  [
    [113, -22], [115, -34], [122, -35], [135, -35], [140, -38], [147, -38], [153, -28],
    [150, -21], [143, -13], [137, -12], [135, -16], [129, -15], [123, -17], [118, -20],
    [113, -22]
  ],
  // Greenland
  [
    [-52, 60], [-42, 60], [-30, 66], [-20, 72], [-18, 80], [-30, 83], [-50, 83],
    [-60, 77], [-55, 70], [-52, 60]
  ],
  // Japan & East Asian Islands
  [
    [130, 32], [133, 35], [137, 35], [141, 42], [144, 44], [142, 45], [140, 40],
    [135, 34], [130, 32]
  ],
  // Great Britain & Ireland
  [
    [-5, 50], [1.5, 51], [0, 53], [-1, 56], [-4, 58], [-6, 56], [-5, 52], [-5, 50]
  ],
  // Scandinavia
  [
    [5, 58], [10, 60], [15, 65], [20, 68], [28, 70], [20, 66], [13, 62], [8, 59], [5, 58]
  ],
  // Antarctica ice mass
  [
    [-180, -75], [180, -75], [180, -90], [-180, -90], [-180, -75]
  ]
];

// Major mountain ranges [lon, lat, radiusLon, radiusLat, name]
const MOUNTAIN_RANGES = [
  { lon: 82, lat: 29, rLon: 16, rLat: 4, name: 'Himalayas' },
  { lon: 74, lat: 34, rLon: 6, rLat: 4, name: 'Karakoram' },
  { lon: 10, lat: 46, rLon: 7, rLat: 3, name: 'Alps' },
  { lon: -115, lat: 45, rLon: 8, rLat: 16, name: 'Rockies' },
  { lon: -69, lat: -25, rLon: 4, rLat: 22, name: 'Andes' },
  { lon: 59, lat: 60, rLon: 3, rLat: 18, name: 'Urals' },
  { lon: 76, lat: 14, rLon: 3, rLat: 8, name: 'Western Ghats' },
  { lon: 82, lat: 18, rLon: 3, rLat: 7, name: 'Eastern Ghats' },
];

// Major deserts [lon, lat, rLon, rLat]
const DESERT_ZONES = [
  { lon: 18, lat: 24, rLon: 22, rLat: 8 },  // Sahara
  { lon: 45, lat: 24, rLon: 12, rLat: 6 },  // Arabian
  { lon: 71, lat: 27, rLon: 4, rLat: 3 },   // Thar
  { lon: 100, lat: 43, rLon: 14, rLat: 5 }, // Gobi
  { lon: 130, lat: -25, rLon: 12, rLat: 7 },// Outback
  { lon: -70, lat: -23, rLon: 3, rLat: 6 }, // Atacama
];

// Major world city clusters for Night Lights [lon, lat, intensity, radius]
const CITY_LIGHTS = [
  // India & South Asia (High density focus for Bhu-Manthan)
  { lon: 77.2, lat: 28.6, p: 1.0, r: 18 },  // Delhi-NCR
  { lon: 82.97, lat: 25.32, p: 1.0, r: 14 },// Varanasi (Primary Twin Core)
  { lon: 80.95, lat: 26.85, p: 0.9, r: 12 },// Lucknow
  { lon: 82.20, lat: 26.79, p: 0.8, r: 10 },// Ayodhya
  { lon: 81.85, lat: 25.44, p: 0.8, r: 10 },// Prayagraj
  { lon: 72.88, lat: 19.08, p: 1.0, r: 18 },// Mumbai MMR
  { lon: 73.86, lat: 18.52, p: 0.9, r: 14 },// Pune
  { lon: 77.59, lat: 12.97, p: 1.0, r: 16 },// Bengaluru
  { lon: 78.49, lat: 17.39, p: 0.9, r: 15 },// Hyderabad
  { lon: 80.27, lat: 13.08, p: 0.9, r: 15 },// Chennai
  { lon: 88.36, lat: 22.57, p: 0.9, r: 16 },// Kolkata
  { lon: 72.57, lat: 23.02, p: 0.9, r: 14 },// Ahmedabad - GIFT
  { lon: 75.79, lat: 26.91, p: 0.8, r: 12 },// Jaipur
  { lon: 74.87, lat: 31.63, p: 0.8, r: 10 },// Amritsar / Punjab corridor
  { lon: 90.41, lat: 23.81, p: 0.8, r: 12 },// Dhaka
  // Indo-Gangetic ribbon lighting
  { lon: 79.5, lat: 27.5, p: 0.7, r: 35 },
  { lon: 84.5, lat: 25.8, p: 0.7, r: 30 },
  // East Asia
  { lon: 139.7, lat: 35.7, p: 1.0, r: 22 }, // Tokyo
  { lon: 121.5, lat: 31.2, p: 1.0, r: 20 }, // Shanghai
  { lon: 116.4, lat: 39.9, p: 1.0, r: 18 }, // Beijing
  { lon: 113.3, lat: 23.1, p: 1.0, r: 22 }, // Pearl River Delta
  { lon: 127.0, lat: 37.6, p: 0.9, r: 16 }, // Seoul
  { lon: 103.8, lat: 1.35, p: 0.9, r: 12 }, // Singapore
  // Europe
  { lon: -0.12, lat: 51.5, p: 1.0, r: 18 }, // London
  { lon: 2.35, lat: 48.86, p: 1.0, r: 18 }, // Paris
  { lon: 13.4, lat: 52.5, p: 0.9, r: 14 },  // Berlin
  { lon: 8.5, lat: 50.1, p: 0.9, r: 20 },   // Rhine-Ruhr corridor
  { lon: 12.5, lat: 41.9, p: 0.8, r: 12 },  // Rome
  { lon: 37.6, lat: 55.75, p: 0.9, r: 16 }, // Moscow
  // Middle East
  { lon: 55.3, lat: 25.2, p: 0.9, r: 14 },  // Dubai
  { lon: 46.7, lat: 24.7, p: 0.8, r: 12 },  // Riyadh
  // Americas
  { lon: -74.0, lat: 40.7, p: 1.0, r: 22 }, // New York
  { lon: -87.6, lat: 41.88, p: 0.9, r: 18 },// Chicago
  { lon: -118.2, lat: 34.05, p: 1.0, r: 20 },// Los Angeles
  { lon: -122.4, lat: 37.77, p: 0.9, r: 16 },// San Francisco Bay
  { lon: -46.6, lat: -23.55, p: 0.9, r: 18 },// Sao Paulo
  { lon: -58.38, lat: -34.6, p: 0.8, r: 15 },// Buenos Aires
  { lon: -99.13, lat: 19.43, p: 0.9, r: 18 },// Mexico City
];

/**
 * 1. Creates Photorealistic Day Earth Equirectangular Texture
 */
export function createDayEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Step 1: Deep Ocean base gradient with equatorial warmth
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0.0, '#06162a'); // Polar deep indigo
  oceanGrad.addColorStop(0.2, '#082142');
  oceanGrad.addColorStop(0.5, '#0b2e5c'); // Equatorial vibrant ocean
  oceanGrad.addColorStop(0.8, '#082142');
  oceanGrad.addColorStop(1.0, '#06162a');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle ocean bathymetry currents
  ctx.fillStyle = 'rgba(0, 180, 216, 0.04)';
  for (let i = 0; i < 40; i++) {
    const y = (i / 40) * height;
    ctx.fillRect(0, y, width, 4);
  }

  // Step 2: Draw Coastal Shallow Turquoise Shelves (Buffer around continents)
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  CONTINENT_POLYGONS.forEach(poly => {
    if (poly.length < 3) return;
    ctx.beginPath();
    const [startX, startY] = geoToCanvas(poly[0][0], poly[0][1], width, height);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < poly.length; i++) {
      const [x, y] = geoToCanvas(poly[i][0], poly[i][1], width, height);
      ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Outermost turquoise shelf
    ctx.strokeStyle = 'rgba(0, 200, 210, 0.22)';
    ctx.lineWidth = 14;
    ctx.stroke();

    // Intermediate cyan shelf
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.28)';
    ctx.lineWidth = 7;
    ctx.stroke();
  });

  // Step 3: Draw Landmass Base (Natural Earth Biome - Lush Green / Forest)
  CONTINENT_POLYGONS.forEach(poly => {
    if (poly.length < 3) return;
    ctx.beginPath();
    const [startX, startY] = geoToCanvas(poly[0][0], poly[0][1], width, height);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < poly.length; i++) {
      const [x, y] = geoToCanvas(poly[i][0], poly[i][1], width, height);
      ctx.lineTo(x, y);
    }
    ctx.closePath();

    ctx.fillStyle = '#264e28'; // Rich vegetation green
    ctx.fill();

    ctx.strokeStyle = '#326635';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Step 4: Overlay Deserts & Arid Zones
  DESERT_ZONES.forEach(d => {
    const [cx, cy] = geoToCanvas(d.lon, d.lat, width, height);
    const rx = (d.rLon / 360) * width;
    const ry = (d.rLat / 180) * height;

    const desertGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
    desertGrad.addColorStop(0, 'rgba(214, 171, 107, 0.88)'); // Arid sand gold
    desertGrad.addColorStop(0.6, 'rgba(189, 147, 85, 0.65)');
    desertGrad.addColorStop(1, 'rgba(38, 78, 40, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = desertGrad;
    ctx.fill();
    ctx.restore();
  });

  // Step 5: Overlay Mountain Ranges & Snow Caps
  MOUNTAIN_RANGES.forEach(m => {
    const [cx, cy] = geoToCanvas(m.lon, m.lat, width, height);
    const rx = (m.rLon / 360) * width;
    const ry = (m.rLat / 180) * height;

    // Mountain rock ridge
    const mtnGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
    mtnGrad.addColorStop(0, 'rgba(240, 245, 255, 0.95)'); // Snow cap apex
    mtnGrad.addColorStop(0.35, 'rgba(160, 150, 140, 0.7)'); // Slate rock
    mtnGrad.addColorStop(0.7, 'rgba(95, 90, 75, 0.4)');
    mtnGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, (m.lon > 0 ? -0.15 : 0.4), 0, Math.PI * 2);
    ctx.fillStyle = mtnGrad;
    ctx.fill();
    ctx.restore();
  });

  // Step 6: Polar Ice Caps (North Arctic & Antarctica)
  // Arctic
  const arcticGrad = ctx.createLinearGradient(0, 0, 0, height * 0.12);
  arcticGrad.addColorStop(0, 'rgba(248, 250, 252, 0.98)');
  arcticGrad.addColorStop(0.7, 'rgba(226, 232, 240, 0.85)');
  arcticGrad.addColorStop(1, 'rgba(200, 220, 240, 0)');
  ctx.fillStyle = arcticGrad;
  ctx.fillRect(0, 0, width, height * 0.12);

  // Antarctica
  const antarcticGrad = ctx.createLinearGradient(0, height * 0.86, 0, height);
  antarcticGrad.addColorStop(0, 'rgba(200, 220, 240, 0)');
  antarcticGrad.addColorStop(0.3, 'rgba(226, 232, 240, 0.9)');
  antarcticGrad.addColorStop(1, 'rgba(255, 255, 255, 0.98)');
  ctx.fillStyle = antarcticGrad;
  ctx.fillRect(0, height * 0.86, width, height * 0.14);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  return texture;
}

/**
 * 2. Creates Night City Lights Texture
 * Glows warmly on the dark side of the globe
 */
export function createNightLightsTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Dark deep black background
  ctx.fillStyle = '#020307';
  ctx.fillRect(0, 0, width, height);

  // Render glowing city lights
  CITY_LIGHTS.forEach(city => {
    const [cx, cy] = geoToCanvas(city.lon, city.lat, width, height);
    const radius = city.r;

    // Ambient city glow
    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.8);
    glowGrad.addColorStop(0, `rgba(255, 215, 110, ${0.95 * city.p})`); // Bright golden white core
    glowGrad.addColorStop(0.3, `rgba(255, 150, 40, ${0.75 * city.p})`); // Amber halo
    glowGrad.addColorStop(0.7, `rgba(220, 90, 20, ${0.35 * city.p})`);  // Warm orange dispersal
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.8, 0, Math.PI * 2);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // Needle-sharp center core
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(2, radius * 0.25), 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 250, 230, 0.98)';
    ctx.fill();
    ctx.restore();
  });

  // Inter-city transport & coastal light veins (Ganges ribbon, US interstate corridor, Europe)
  ctx.strokeStyle = 'rgba(255, 170, 60, 0.28)';
  ctx.lineWidth = 1.5;

  // Indo-Gangetic corridor: Delhi -> Kanpur -> Prayagraj -> Varanasi -> Patna -> Kolkata
  const gangesWaypoints: [number, number][] = [
    [77.2, 28.6], [80.3, 26.5], [81.8, 25.4], [83.0, 25.3], [85.1, 25.6], [88.4, 22.6]
  ];
  ctx.beginPath();
  const [gx0, gy0] = geoToCanvas(gangesWaypoints[0][0], gangesWaypoints[0][1], width, height);
  ctx.moveTo(gx0, gy0);
  for (let i = 1; i < gangesWaypoints.length; i++) {
    const [x, y] = geoToCanvas(gangesWaypoints[i][0], gangesWaypoints[i][1], width, height);
    ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Golden Quadrilateral: Delhi -> Mumbai -> Bengaluru -> Chennai -> Kolkata
  const gqWaypoints: [number, number][] = [
    [77.2, 28.6], [72.9, 19.1], [77.6, 13.0], [80.3, 13.1], [88.4, 22.6]
  ];
  ctx.beginPath();
  const [q0x, q0y] = geoToCanvas(gqWaypoints[0][0], gqWaypoints[0][1], width, height);
  ctx.moveTo(q0x, q0y);
  for (let i = 1; i < gqWaypoints.length; i++) {
    const [x, y] = geoToCanvas(gqWaypoints[i][0], gqWaypoints[i][1], width, height);
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.22)';
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 3. Creates Specular Ocean Gloss Map
 * Pure white = maximum specular shine (water reflects sunlight)
 * Pure dark = matte diffuse (continents do not reflect glare)
 */
export function createOceanSpecularTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Oceans are shiny
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Continents are matte
  CONTINENT_POLYGONS.forEach(poly => {
    if (poly.length < 3) return;
    ctx.beginPath();
    const [startX, startY] = geoToCanvas(poly[0][0], poly[0][1], width, height);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < poly.length; i++) {
      const [x, y] = geoToCanvas(poly[i][0], poly[i][1], width, height);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#111111';
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 4. Creates Dynamic Atmospheric Cloud Texture
 * Swirling weather fronts, tropical convergence, and cyclonic spirals
 */
export function createAtmosphericCloudTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Transparent cosmos
  ctx.clearRect(0, 0, width, height);

  // Cloud bands (Equatorial ITCZ + mid-latitude jet streams)
  const drawCloudSwirl = (cx: number, cy: number, rX: number, rY: number, alpha: number) => {
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rX, rY));
    grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.85})`);
    grad.addColorStop(0.4, `rgba(240, 245, 255, ${alpha * 0.55})`);
    grad.addColorStop(0.8, `rgba(220, 235, 255, ${alpha * 0.2})`);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rX, rY, Math.sin(cx * 0.01) * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  };

  // Generate 80 organic cloud clusters across weather belts
  for (let i = 0; i < 90; i++) {
    const lon = ((i * 137.5) % 360) - 180;
    // Concentrate around ITCZ (0° to 15°N), storm tracks (35°N to 55°N, 40°S to 60°S)
    const belt = (i % 3 === 0) ? (Math.random() * 16 - 8) :
                 (i % 3 === 1) ? (35 + Math.random() * 20) :
                                 (-45 - Math.random() * 15);
    const [cx, cy] = geoToCanvas(lon, belt, width, height);
    const rx = 35 + Math.random() * 85;
    const ry = 15 + Math.random() * 40;
    drawCloudSwirl(cx, cy, rx, ry, 0.55 + Math.random() * 0.35);
  }

  // Cyclonic spirals over Bay of Bengal & Pacific
  const drawCyclone = (lon: number, lat: number, radius: number) => {
    const [cx, cy] = geoToCanvas(lon, lat, width, height);
    ctx.save();
    ctx.translate(cx, cy);
    for (let a = 0; a < 6; a++) {
      const angle = (a * Math.PI) / 3;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * 15, Math.sin(angle) * 15, radius * 0.7, angle, angle + Math.PI, false);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 8;
      ctx.stroke();
    }
    ctx.restore();
  };

  drawCyclone(87, 18, 40); // Bay of Bengal depression
  drawCyclone(140, 20, 55); // Western Pacific Typhoon
  drawCyclone(-65, 28, 50); // Atlantic Hurricane alley

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 5. Creates NDVI (Normalized Difference Vegetation Index) Multi-Spectral Biosphere Texture
 * Shows dense agricultural canopy, eco-buffers, and water bodies
 */
export function createNdviBiosphereTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep Navy for Water Bodies (NDWI negative / near 0)
  ctx.fillStyle = '#020b18';
  ctx.fillRect(0, 0, width, height);

  // Landmass Base (Mid NDVI 0.3 - 0.4)
  CONTINENT_POLYGONS.forEach(poly => {
    if (poly.length < 3) return;
    ctx.beginPath();
    const [startX, startY] = geoToCanvas(poly[0][0], poly[0][1], width, height);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < poly.length; i++) {
      const [x, y] = geoToCanvas(poly[i][0], poly[i][1], width, height);
      ctx.lineTo(x, y);
    }
    ctx.closePath();

    ctx.fillStyle = '#0f4c3a'; // Mid-level green
    ctx.fill();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // High NDVI Zones (>0.75 Radiant Emerald/Lime): Indo-Gangetic Basin, Amazon, Congo, Western Ghats
  const HIGH_NDVI = [
    { lon: 82, lat: 26, rLon: 14, rLat: 5 }, // Indo-Gangetic plain (Varanasi/UP/Bihar/Bengal)
    { lon: 76, lat: 12, rLon: 4, rLat: 8 },  // Western Ghats / Kerala
    { lon: -60, lat: -3, rLon: 24, rLat: 12 },// Amazon Basin
    { lon: 22, lat: 0, rLon: 15, rLat: 9 },  // Congo Basin
    { lon: 105, lat: 15, rLon: 10, rLat: 8 },// Mekong Basin
    { lon: 15, lat: 50, rLon: 18, rLat: 7 }, // Central Europe
  ];

  HIGH_NDVI.forEach(z => {
    const [cx, cy] = geoToCanvas(z.lon, z.lat, width, height);
    const rx = (z.rLon / 360) * width;
    const ry = (z.rLat / 180) * height;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
    grad.addColorStop(0, 'rgba(16, 255, 140, 0.9)'); // Vivid neon NDVI chlorophyll
    grad.addColorStop(0.5, 'rgba(0, 230, 180, 0.65)');
    grad.addColorStop(1, 'rgba(15, 76, 58, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  });

  // Low NDVI / Arid Zones (Amber / Ochre 0.1 - 0.2)
  DESERT_ZONES.forEach(d => {
    const [cx, cy] = geoToCanvas(d.lon, d.lat, width, height);
    const rx = (d.rLon / 360) * width;
    const ry = (d.rLat / 180) * height;

    const desertGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
    desertGrad.addColorStop(0, 'rgba(245, 158, 11, 0.85)'); // Arid amber
    desertGrad.addColorStop(0.7, 'rgba(180, 83, 9, 0.45)');
    desertGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = desertGrad;
    ctx.fill();
    ctx.restore();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}
