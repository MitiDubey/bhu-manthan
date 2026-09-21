import type { LandUseType, PriorityLevel } from '../types/parcel';

export const LAND_USE_COLORS: Record<LandUseType, string> = {
  Agriculture: '#10b981', // Emerald 500
  'Built-up': '#f59e0b',  // Amber 500
  Water: '#0284c7',       // Sky 600
  Forest: '#15803d',      // Green 700
  Vacant: '#64748b',      // Slate 500
};

export const LAND_USE_LABELS: Record<LandUseType, string> = {
  Agriculture: 'Agriculture (कृषि)',
  'Built-up': 'Built-up (निर्मित/आबादी)',
  Water: 'Water Body (जल निकाय)',
  Forest: 'Forest / Scrub (वन क्षेत्र)',
  Vacant: 'Vacant / Fallow (रिक्त/परती)',
};

export const getPriorityBadgeClass = (priority: PriorityLevel): string => {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-500/20 text-red-400 border-red-500/40';
    case 'MEDIUM':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    case 'LOW':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    default:
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
  }
};

export const formatCoordinates = (lng: number, lat: number): string => {
  const latDirection = lat >= 0 ? 'N' : 'S';
  const lngDirection = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(5)}° ${latDirection}, ${Math.abs(lng).toFixed(5)}° ${lngDirection}`;
};

export const GWALIOR_PRESETS = [
  {
    name: 'Whole India 3D',
    description: 'Planetary 3D Perspective over Indian Subcontinent',
    center: [78.9629, 22.5937] as [number, number],
    zoom: 4.2,
    pitch: 25,
    bearing: 0,
    parcelId: null,
  },
  {
    name: 'Gwalior Study Area',
    description: 'Primary Cadastral Target Study Area (Madhya Pradesh)',
    center: [78.1950, 26.2200] as [number, number],
    zoom: 12.5,
    pitch: 52,
    bearing: -20,
    parcelId: null,
  },
  {
    name: 'Morar Belts (GW-012)',
    description: 'Cadastral Study Belt GW-011 to GW-015',
    center: [78.2280, 26.2235] as [number, number],
    zoom: 16.5,
    pitch: 58,
    bearing: 20,
    parcelId: 'GW-012',
  },
  {
    name: 'New Delhi (NCR)',
    description: 'National Capital Region (Non-cadastral inspection)',
    center: [77.2090, 28.6139] as [number, number],
    zoom: 13.0,
    pitch: 45,
    bearing: 0,
    parcelId: null,
  },
  {
    name: 'Mumbai (MMR)',
    description: 'Maharashtra Coastal Agglomeration (Non-cadastral inspection)',
    center: [72.8777, 19.0760] as [number, number],
    zoom: 12.8,
    pitch: 48,
    bearing: -15,
    parcelId: null,
  },
  {
    name: 'Bengaluru IT Belt',
    description: 'Karnataka Tech Corridor (Non-cadastral inspection)',
    center: [77.5946, 12.9716] as [number, number],
    zoom: 13.0,
    pitch: 40,
    bearing: 10,
    parcelId: null,
  },
  {
    name: 'Varanasi Corridor',
    description: 'Ganges River Heritage Corridor (Non-cadastral inspection)',
    center: [82.9739, 25.3176] as [number, number],
    zoom: 13.5,
    pitch: 45,
    bearing: 15,
    parcelId: null,
  },
];

