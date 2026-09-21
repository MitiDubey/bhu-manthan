import * as THREE from 'three';

/**
 * Converts Geodetic (Lat, Lon) in degrees to 3D Cartesian coordinates (Vector3)
 * matching Three.js SphereGeometry equirectangular UV alignment.
 */
export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);     // 0 at North Pole, PI at South Pole
  const theta = (lon + 180) * (Math.PI / 180);  // 0 at -180°, 2*PI at +180°

  // Aligns with Three.js SphereGeometry UV mapping
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export interface CadastralHotspot {
  id: string;
  name: string;
  stateOrRegion: string;
  lat: number;
  lon: number;
  type: 'core' | 'hq' | 'space' | 'heritage' | 'coastal' | 'global';
  color: string;
  monitoredParcels: number;
  lastSatellitePass: string;
  ndviScore: number;
  aiConfidence: number;
  description: string;
  highlightAction?: string;
}

export const CADASTRAL_HOTSPOTS: CadastralHotspot[] = [
  {
    id: 'varanasi',
    name: 'Varanasi',
    stateOrRegion: 'Uttar Pradesh (Digital Twin Testbed)',
    lat: 25.3176,
    lon: 82.9739,
    type: 'core',
    color: '#00f0ff',
    monitoredParcels: 4210,
    lastSatellitePass: 'Sentinel-2A • 18 mins ago',
    ndviScore: 0.68,
    aiConfidence: 97.4,
    description: 'Flagship Cadastral Digital Twin testbed with sub-meter Khasra geometry, Cartosat-3 integration, and RAG legal search.',
    highlightAction: 'LAUNCH DIGITAL TWIN',
  },
  {
    id: 'delhi',
    name: 'New Delhi (HQ)',
    stateOrRegion: 'National Capital Territory',
    lat: 28.6139,
    lon: 77.2090,
    type: 'hq',
    color: '#10b981',
    monitoredParcels: 6800,
    lastSatellitePass: 'Cartosat-3 • 42 mins ago',
    ndviScore: 0.45,
    aiConfidence: 98.1,
    description: 'Central Cadastre Command, Survey of India, and NIC National Land Records Modernisation Programme (NLRMP) sync.',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru (ISRO)',
    stateOrRegion: 'Karnataka • NRSC Space Hub',
    lat: 12.9716,
    lon: 77.5946,
    type: 'space',
    color: '#8b5cf6',
    monitoredParcels: 11200,
    lastSatellitePass: 'NavIC Ground Station • LIVE',
    ndviScore: 0.62,
    aiConfidence: 99.2,
    description: 'ISRO Headquarters & National Remote Sensing Centre (NRSC) primary earth observation downlink.',
  },
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    stateOrRegion: 'Uttar Pradesh (Heritage & Urban Buffer)',
    lat: 26.7922,
    lon: 82.1998,
    type: 'heritage',
    color: '#f59e0b',
    monitoredParcels: 2890,
    lastSatellitePass: 'Sentinel-2B • 2 hours ago',
    ndviScore: 0.58,
    aiConfidence: 96.2,
    description: 'Rapid infrastructure expansion zone, Saryu river eco-buffer setbacks, and heritage masterplan zoning.',
  },
  {
    id: 'mumbai',
    name: 'Mumbai MMR',
    stateOrRegion: 'Maharashtra (Coastal Infrastructure)',
    lat: 19.0760,
    lon: 72.8777,
    type: 'coastal',
    color: '#06b6d4',
    monitoredParcels: 9400,
    lastSatellitePass: 'Cartosat-3 • 3 hours ago',
    ndviScore: 0.42,
    aiConfidence: 95.8,
    description: 'Coastal Regulation Zone (CRZ) environmental compliance, mangrove preservation audits, and port logistics.',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad (NRSC)',
    stateOrRegion: 'Telangana • AI Inference Hub',
    lat: 17.3850,
    lon: 78.4867,
    type: 'space',
    color: '#ec4899',
    monitoredParcels: 9200,
    lastSatellitePass: 'Cartosat-2E • 1 hour ago',
    ndviScore: 0.53,
    aiConfidence: 98.7,
    description: 'AI model training cluster for automated encroachment detection, NDVI calculation, and change vector analysis.',
  },
];

export interface SatelliteOrbit {
  id: string;
  name: string;
  agency: string;
  orbitType: string;
  altitudeKm: number;
  speedKmS: number;
  resolution: string;
  color: string;
  radius: number; // 3D sphere orbit radius
  inclination: number; // tilt radians
  speed: number; // angular speed
  swathWidthKm: number;
  purpose: string;
}

export const SATELLITE_CONSTELLATION: SatelliteOrbit[] = [
  {
    id: 'sentinel-2a',
    name: 'Sentinel-2A',
    agency: 'ESA / Copernicus MultiSpectral',
    orbitType: 'Sun-Synchronous Polar LEO',
    altitudeKm: 786,
    speedKmS: 7.45,
    resolution: '10m Multi-spectral (13 Bands)',
    color: '#00f0ff',
    radius: 1.28,
    inclination: 1.72, // ~98.6° retrograde
    speed: 0.005,
    swathWidthKm: 290,
    purpose: 'Continuous 5-day NDVI vegetation health, NDWI water body index, and agricultural land monitoring.',
  },
  {
    id: 'cartosat-3',
    name: 'Cartosat-3',
    agency: 'ISRO (Indian Space Research Organisation)',
    orbitType: 'Agile Polar Sun-Synchronous',
    altitudeKm: 505,
    speedKmS: 7.61,
    resolution: '0.28m Panchromatic (Sub-Meter)',
    color: '#10b981',
    radius: 1.21,
    inclination: 1.69, // ~97.5°
    speed: 0.0065,
    swathWidthKm: 17,
    purpose: 'Sub-meter cadastral parcel boundary verification, unauthorized encroachment detection, and 3D terrain modeling.',
  },
  {
    id: 'navic-01',
    name: 'NavIC-1I (IRNSS)',
    agency: 'ISRO Satellite Navigation System',
    orbitType: 'Geosynchronous Inclined (IGSO)',
    altitudeKm: 35786,
    speedKmS: 3.07,
    resolution: 'Dual Frequency L5 & S-band Geodesy',
    color: '#f59e0b',
    radius: 1.45,
    inclination: 0.51, // ~29°
    speed: 0.002,
    swathWidthKm: 1500,
    purpose: 'Sub-meter differential GPS positioning, cadastral surveyor RTK alignment, and time synchronization across India.',
  },
];
