import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';

interface WorldGlobeMapProps {
  heightClass?: string;
  showOverlay?: boolean;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export const WorldGlobeMap: React.FC<WorldGlobeMapProps> = ({
  heightClass = 'h-[620px]',
  showOverlay = true,
  initialCenter = [78.9629, 22.5937],
  initialZoom = 1.35,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const satelliteUrl =
      import.meta.env.VITE_SATELLITE_TILE_URL ||
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

    const boundariesUrl =
      'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

    const roadsUrl =
      'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}';

    const map = new maplibregl.Map({
      container: mapContainer.current,
      attributionControl: false,
      antialias: true,
      center: initialCenter,
      zoom: initialZoom,
      pitch: 0,
      bearing: -18,
      style: {
        version: 8,
        projection: { type: 'globe' },
        sources: {
          satellite: {
            type: 'raster',
            tiles: [satelliteUrl],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; Esri, Maxar',
          },
          'country-reference': {
            type: 'raster',
            tiles: [boundariesUrl],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; Esri',
          },
          'transport-reference': {
            type: 'raster',
            tiles: [roadsUrl],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; Esri',
          },
        },
        layers: [
          {
            id: 'satellite-earth',
            type: 'raster',
            source: 'satellite',
            paint: {
              'raster-opacity': 1,
              'raster-saturation': 0.08,
              'raster-contrast': 0.12,
            },
          },
          {
            id: 'country-boundaries-labels',
            type: 'raster',
            source: 'country-reference',
            paint: {
              'raster-opacity': 0.86,
              'raster-brightness-min': 0.02,
              'raster-brightness-max': 1,
            },
          },
          {
            id: 'major-transport-reference',
            type: 'raster',
            source: 'transport-reference',
            minzoom: 4,
            paint: {
              'raster-opacity': 0.42,
            },
          },
        ],
        sky: {
          'sky-color': '#050816',
          'horizon-color': '#0b1730',
          'fog-color': '#0b1730',
          'sky-horizon-blend': 0.08,
          'horizon-fog-blend': 0.04,
          'fog-ground-blend': 0,
        },
        light: {
          anchor: 'viewport',
          color: '#fff3d6',
          intensity: 0.55,
        },
      },
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');

    map.on('load', () => {
      map.easeTo({
        center: [82.9739, 25.3176],
        zoom: Math.max(initialZoom, 2.6),
        bearing: 8,
        duration: 2600,
        essential: true,
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [initialCenter, initialZoom]);

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden rounded-2xl border border-twin-700/60 bg-[#050816] shadow-2xl`}>
      <div ref={mapContainer} className="w-full h-full" />

      {showOverlay && (
        <>
          <div className="absolute top-4 left-4 z-10 rounded-xl border border-cyan-500/30 bg-twin-950/80 px-3 py-2 text-left font-mono text-xs text-slate-300 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>GLOBAL SATELLITE GLOBE</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Country boundaries, place labels, and full-earth imagery
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-twin-700 bg-twin-950/70 px-3 py-1 font-mono text-[10px] text-slate-400 backdrop-blur-sm sm:block">
            Drag to rotate globe • Scroll to zoom • Explore all countries
          </div>
        </>
      )}
    </div>
  );
};
