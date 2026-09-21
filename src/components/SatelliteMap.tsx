import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { 
  ParcelProperties, 
  LayerVisibilityState, 
  MapTelemetry,
  GeographicInspectionRequest,
} from '../types/parcel';
import { LAND_USE_COLORS } from '../utils/mapUtils';
import { parcelsGeoJSONData } from '../data/parcelsGeoJSON';

// Level 17 is the highest reliable imagery level across the study area. Higher
// requests return ArcGIS "Map data not available" tiles in some locations.
const FOCUSED_INSPECTION_ZOOM = 17;

interface SatelliteMapProps {
  layers: LayerVisibilityState;
  selectedParcelId: string | null;
  onSelectParcel: (parcel: ParcelProperties | null, screenPos?: { x: number; y: number } | null) => void;
  onInspectUnconnectedArea?: (request: GeographicInspectionRequest) => void;
  onUpdateTelemetry: (telemetry: MapTelemetry) => void;
  terrainExaggeration: number;
  is3D: boolean;
  isGlobe: boolean;
  mapInstanceRef: React.MutableRefObject<maplibregl.Map | null>;
}

export const SatelliteMap: React.FC<SatelliteMapProps> = ({
  layers,
  selectedParcelId,
  onSelectParcel,
  onInspectUnconnectedArea,
  onUpdateTelemetry,
  terrainExaggeration,
  isGlobe,
  mapInstanceRef,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const hoverPopupRef = useRef<maplibregl.Popup | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Initial Gwalior Camera Configuration
  const initialCenter: [number, number] = [78.1828, 26.2183]; // Gwalior center
  const initialZoom = 12.5;
  const initialPitch = 55;
  const initialBearing = -25;

  useEffect(() => {
    if (!mapContainer.current) return;

    // Fallback or custom tile endpoints via environment variables
    const satelliteUrl = 
      import.meta.env.VITE_SATELLITE_TILE_URL || 
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    
    const terrainDemUrl = 
      import.meta.env.VITE_TERRAIN_DEM_URL || 
      'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png';

    // MapLibre Map style with 3D Globe projection, satellite raster, and terrain DEM
    const map = new maplibregl.Map({
      container: mapContainer.current,
      maxZoom: FOCUSED_INSPECTION_ZOOM,
      style: {
        version: 8,
        projection: {
          type: isGlobe ? 'globe' : 'mercator',
        },
        sources: {
          'satellite-tiles': {
            type: 'raster',
            tiles: [satelliteUrl],
            tileSize: 256,
            attribution: '&copy; Esri &mdash; High-Resolution Satellite Orthophoto',
            maxzoom: 19,
          },
          'roads-reference-tiles': {
            type: 'raster',
            tiles: [
              'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            maxzoom: 19,
          },
          'places-reference-tiles': {
            type: 'raster',
            tiles: [
              'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            maxzoom: 19,
          },
          'terrain-source': {
            type: 'raster-dem',
            tiles: [terrainDemUrl],
            encoding: 'terrarium',
            tileSize: 256,
            maxzoom: 15,
          },
          'parcels-source': {
            type: 'geojson',
            data: parcelsGeoJSONData as any,
          },
        },
        layers: [
          // 1. Base Satellite Imagery Layer
          {
            id: 'satellite-base',
            type: 'raster',
            source: 'satellite-tiles',
            paint: {
              'raster-opacity': 1.0,
              'raster-saturation': 0.1,
              'raster-contrast': 0.15,
            },
          },
          // 2. Roads Overlay for geographic context
          {
            id: 'roads-context',
            type: 'raster',
            source: 'roads-reference-tiles',
            paint: {
              'raster-opacity': 0.65,
            },
          },
          // 3. Place Labels Overlay
          {
            id: 'places-context',
            type: 'raster',
            source: 'places-reference-tiles',
            paint: {
              'raster-opacity': 0.8,
            },
          },
          // 4. Bhuvan LULC (ISRO-NRSC) Thematic Overlay Layer
          {
            id: 'bhuvan-lulc-overlay',
            type: 'fill',
            source: 'parcels-source',
            layout: {
              visibility: 'none',
            },
            paint: {
              'fill-color': [
                'match',
                ['get', 'land_use'],
                'Agriculture', '#ffff66',
                'Built-up', '#ff0000',
                'Forest', '#38a800',
                'Water', '#004da8',
                'Vacant', '#d7c29e',
                '#ffff66'
              ],
              'fill-opacity': 0.65,
            },
          },
          // 4. Land Use Thematic Choropleth Fill Layer
          {
            id: 'parcels-landuse',
            type: 'fill',
            source: 'parcels-source',
            layout: {
              visibility: 'none',
            },
            paint: {
              'fill-color': [
                'match',
                ['get', 'land_use'],
                'Agriculture', LAND_USE_COLORS.Agriculture,
                'Built-up', LAND_USE_COLORS['Built-up'],
                'Water', LAND_USE_COLORS.Water,
                'Forest', LAND_USE_COLORS.Forest,
                'Vacant', LAND_USE_COLORS.Vacant,
                '#64748b'
              ],
              'fill-opacity': 0.5,
            },
          },
          // 5. Change Detection Alert Fill Layer
          {
            id: 'parcels-change',
            type: 'fill',
            source: 'parcels-source',
            layout: {
              visibility: 'none',
            },
            filter: ['!=', ['get', 'priority'], 'NONE'],
            paint: {
              'fill-color': [
                'match',
                ['get', 'priority'],
                'HIGH', '#ef4444',
                'MEDIUM', '#f59e0b',
                '#3b82f6'
              ],
              'fill-opacity': 0.45,
            },
          },
          // 6. Base Clickable Area Fill for Parcels
          {
            id: 'parcels-fill',
            type: 'fill',
            source: 'parcels-source',
            paint: {
              'fill-color': '#0284c7',
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.35,
                0.12
              ],
            },
          },
          // 7. Standard Parcel Cadastral Boundaries
          {
            id: 'parcels-boundary',
            type: 'line',
            source: 'parcels-source',
            layout: {
              'line-cap': 'round',
              'line-join': 'round',
              visibility: 'visible',
            },
            paint: {
              'line-color': '#f8fafc',
              'line-width': 2.0,
              'line-opacity': 0.95,
            },
          },
          // 8. Land Record Status Layer (Verified = Emerald, Under Review = Amber, Disputed = Red, Pending = Purple)
          {
            id: 'parcels-landrecord',
            type: 'fill',
            source: 'parcels-source',
            layout: {
              visibility: 'none',
            },
            paint: {
              'fill-color': [
                'match',
                ['coalesce', ['get', 'land_record_status'], 'VERIFIED'],
                'VERIFIED', '#10b981',
                'UNDER REVIEW', '#f59e0b',
                'DISPUTED', '#ef4444',
                'PENDING UPDATE', '#a855f7',
                '#64748b'
              ],
              'fill-opacity': 0.35,
            },
          },
          // 9. Policy Impact Scenario Spatial Layer
          {
            id: 'parcels-policy',
            type: 'fill',
            source: 'parcels-source',
            layout: {
              visibility: 'none',
            },
            paint: {
              'fill-color': '#06b6d4',
              'fill-opacity': 0.30,
            },
          },
          {
            id: 'parcels-policy-border',
            type: 'line',
            source: 'parcels-source',
            layout: {
              visibility: 'none',
            },
            paint: {
              'line-color': '#22d3ee',
              'line-width': 2.5,
              'line-dasharray': [3, 2],
              'line-opacity': 0.9,
            },
          },
          // 10. Change Detection Warning Border
          {
            id: 'parcels-change-boundary',
            type: 'line',
            source: 'parcels-source',
            layout: {
              visibility: 'none',
            },
            filter: ['!=', ['get', 'priority'], 'NONE'],
            paint: {
              'line-color': '#ff385c',
              'line-width': 3.5,
              'line-dasharray': [2, 1],
              'line-opacity': 1.0,
            },
          },
          // 11. Selected Parcel Boundary Highlight Line (Increased thickness on selection)
          {
            id: 'parcels-selected-outline',
            type: 'line',
            source: 'parcels-source',
            filter: ['==', ['get', 'parcel_id'], ''],
            paint: {
              'line-color': '#38bdf8',
              'line-width': 4.5,
              'line-opacity': 1.0,
            },
          },
          // 12. Selected Parcel 3D Selection Highlight (Subtle highlight effect, not building height)
          {
            id: 'parcels-extrusion',
            type: 'fill-extrusion',
            source: 'parcels-source',
            filter: ['==', ['get', 'parcel_id'], ''],
            paint: {
              'fill-extrusion-color': '#38bdf8',
              'fill-extrusion-height': 4, // Subtle 3-5m visual selection highlight (not physical elevation)
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': 0.4,
            },
          },
        ],
      },
      center: initialCenter,
      zoom: initialZoom,
      pitch: initialPitch,
      bearing: initialBearing,
      maxPitch: 82,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Suppress and log internal MapLibre warnings so map never crashes
    map.on('error', (e) => {
      console.warn('MapLibre GL internal event:', e.error?.message || e);
    });

    // Initialize Hover Tooltip Popup
    const hoverPopup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 15,
      className: 'gis-popup',
    });
    hoverPopupRef.current = hoverPopup;

    map.on('load', () => {
      // Configure 3D Terrain safely
      try {
        if (layers.terrain && map.getSource('terrain-source')) {
          map.setTerrain({
            source: 'terrain-source',
            exaggeration: terrainExaggeration,
          });
        }
      } catch (err) {
        console.warn('MapLibre 3D terrain warning, proceeding with flat base:', err);
      }

      // Add clickable parcel centroid badges
      try {
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        parcelsGeoJSONData.features.forEach((feat) => {
          const props = feat.properties;
          const el = document.createElement('div');
          el.className = 'cursor-pointer select-none transition-transform hover:scale-110';
          const isAlert = props.priority !== 'NONE';

          el.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              gap: 4px;
              padding: 2px 6px;
              background: rgba(15, 23, 42, 0.88);
              border: 1px solid ${isAlert ? 'rgba(239, 68, 68, 0.7)' : 'rgba(56, 189, 248, 0.6)'};
              border-radius: 4px;
              font-family: monospace;
              font-size: 10px;
              font-weight: 700;
              color: #f8fafc;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5);
              backdrop-filter: blur(4px);
            ">
              <span>${props.parcel_id}</span>
              ${isAlert ? '<span style="color: #ef4444; font-size: 9px;">⚠️</span>' : ''}
            </div>
          `;

          el.addEventListener('click', (e) => {
            e.stopPropagation();
            // Fly to parcel and select
            map.flyTo({
              center: props.centroid,
              zoom: 16.5,
              pitch: 58,
              bearing: 15,
              speed: 1.2,
              essential: true,
            });
            const clientPos = { x: e.clientX, y: e.clientY };
            onSelectParcel(props, clientPos);
          });

          const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
            .setLngLat(props.centroid)
            .addTo(map);

          markersRef.current.push(marker);
        });
      } catch (err) {
        console.warn('Marker initialization warning:', err);
      }

      // Update initial telemetry
      updateTelemetryState();
    });

    // Telemetry and Camera update listeners
    const updateTelemetryState = () => {
      const center = map.getCenter();
      let elevation = 215;
      try {
        if (map.getTerrain()) {
          const elev = (map as any).queryTerrainElevation?.([center.lng, center.lat]);
          if (elev != null && !isNaN(elev)) {
            elevation = elev;
          }
        }
      } catch {}

      onUpdateTelemetry({
        lat: center.lat,
        lng: center.lng,
        zoom: map.getZoom(),
        pitch: map.getPitch(),
        bearing: map.getBearing(),
        elevation,
      });
    };

    map.on('move', updateTelemetryState);
    map.on('pitch', updateTelemetryState);
    map.on('rotate', updateTelemetryState);

    // Mouse Hover on Parcels
    const parcelLayerIds = ['parcels-fill', 'parcels-landuse', 'parcels-change'];
    
    map.on('mousemove', (e: maplibregl.MapLayerMouseEvent) => {
      const activeLayers = parcelLayerIds.filter(id => !!map.getLayer(id));
      const features = map.queryRenderedFeatures(e.point, { layers: activeLayers });

      if (features.length > 0) {
        const feature = features[0];
        const props = feature.properties as unknown as ParcelProperties;

        map.getCanvas().style.cursor = 'pointer';

        // Show hover tooltip
        hoverPopup
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="padding: 6px 10px; font-family: monospace; font-size: 11px; line-height: 1.3;">
              <div style="font-weight: 700; color: #38bdf8; font-size: 12px;">${props.parcel_id}</div>
              <div style="color: #f1f5f9; font-size: 11px; margin-top: 2px;">${props.land_use}</div>
              <div style="color: #94a3b8; font-size: 10px; margin-top: 1px;">${props.area}</div>
            </div>
          `)
          .addTo(map);
      } else {
        map.getCanvas().style.cursor = '';
        hoverPopup.remove();
      }
    });

    map.on('mouseout', () => {
      map.getCanvas().style.cursor = '';
      hoverPopup.remove();
    });

    // SINGLE UNIFIED CLICK HANDLER: Handles both parcel selection and background click cleanly
    map.on('click', (e: maplibregl.MapLayerMouseEvent) => {
      const interactiveLayers = [
        'parcels-fill',
        'parcels-landrecord',
        'parcels-policy',
        'parcels-change',
        'bhuvan-lulc-overlay',
        'parcels-boundary',
        'parcels-extrusion',
        'parcels-selected-outline'
      ].filter(id => !!map.getLayer(id));

      const features = map.queryRenderedFeatures(e.point, { layers: interactiveLayers });

      if (features.length > 0) {
        const feature = features[0];
        const props = feature.properties as unknown as ParcelProperties;

        // Centroid coordinates from feature or click
        let centroid = props.centroid;
        if (!centroid && feature.geometry.type === 'Polygon') {
          const coords = (feature.geometry as any).coordinates[0];
          const avgLng = coords.reduce((sum: number, c: number[]) => sum + c[0], 0) / coords.length;
          const avgLat = coords.reduce((sum: number, c: number[]) => sum + c[1], 0) / coords.length;
          centroid = [avgLng, avgLat];
        }

        // Smooth camera fly-to focusing on the parcel
        map.flyTo({
          center: centroid || [e.lngLat.lng, e.lngLat.lat],
          zoom: FOCUSED_INSPECTION_ZOOM,
          pitch: 58,
          bearing: 15,
          speed: 1.2,
          curve: 1.4,
          essential: true,
        });

        // Pass click screen position to display floating details popup
        onSelectParcel(props, { x: e.point.x, y: e.point.y });
      } else {
        // Clicked outside connected cadastral features -> never generate fake parcel
        onSelectParcel(null, null);
        if (onInspectUnconnectedArea) {
          // Progressively drill into the clicked geography instead of always
          // jumping to street/parcel scale.
          const clickedLng = e.lngLat.lng;
          const clickedLat = e.lngLat.lat;
          const zoom = map.getZoom();
          const level = zoom <= 4 ? 'country' : zoom <= 7 ? 'state' : zoom <= 10 ? 'district' : 'local';
          onInspectUnconnectedArea({ lat: clickedLat, lng: clickedLng, level });
        }
      }
    });

    return () => {
      markersRef.current.forEach(m => m.remove());
      hoverPopup.remove();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Projection (Globe vs Mercator) dynamically
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;

    try {
      map.setProjection({ type: isGlobe ? 'globe' : 'mercator' });
    } catch (err) {
      console.warn('Projection update error:', err);
    }
  }, [isGlobe]);

  // Update Terrain Exaggeration & Toggle dynamically
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;

    try {
      if (layers.terrain && map.getSource('terrain-source')) {
        map.setTerrain({
          source: 'terrain-source',
          exaggeration: terrainExaggeration,
        });
      } else {
        map.setTerrain(null);
      }
    } catch (err) {
      console.warn('Terrain update error:', err);
    }
  }, [layers.terrain, terrainExaggeration]);

  // Update Layers Visibility (Satellite, Boundaries, Land Use, Change Detection)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // 1. Satellite Base
    if (map.getLayer('satellite-base')) {
      map.setLayoutProperty('satellite-base', 'visibility', layers.satellite ? 'visible' : 'none');
    }

    // 2. Parcel Boundaries
    if (map.getLayer('parcels-boundary')) {
      map.setLayoutProperty('parcels-boundary', 'visibility', layers.parcelBoundaries ? 'visible' : 'none');
    }

    // 4. Land Record Status Layer
    if (map.getLayer('parcels-landrecord')) {
      map.setLayoutProperty('parcels-landrecord', 'visibility', layers.landRecordStatus ? 'visible' : 'none');
    }

    // 5. Change Detection Layer & Warning Border
    if (map.getLayer('parcels-change')) {
      map.setLayoutProperty('parcels-change', 'visibility', layers.changeDetection ? 'visible' : 'none');
    }
    if (map.getLayer('parcels-change-boundary')) {
      map.setLayoutProperty('parcels-change-boundary', 'visibility', layers.changeDetection ? 'visible' : 'none');
    }

    // 6. Policy Impact Layer (Scenario / Spatial Layer)
    if (map.getLayer('parcels-policy')) {
      map.setLayoutProperty('parcels-policy', 'visibility', layers.policyImpact ? 'visible' : 'none');
    }
    if (map.getLayer('parcels-policy-border')) {
      map.setLayoutProperty('parcels-policy-border', 'visibility', layers.policyImpact ? 'visible' : 'none');
    }

    // 7. Bhuvan LULC (ISRO-NRSC) Thematic Overlay (Cycles: 2005-06, 2011-12, 2015-16)
    if (map.getLayer('bhuvan-lulc-overlay')) {
      map.setLayoutProperty('bhuvan-lulc-overlay', 'visibility', layers.bhuvanLulc ? 'visible' : 'none');
      map.setPaintProperty('bhuvan-lulc-overlay', 'fill-opacity', layers.bhuvanOpacity);

      // Match time period attribute (Bhuvan 1:50K 5-year cycles)
      const periodField = 
        layers.bhuvanPeriod === '2005-06' ? 'bhuvan_lulc_2005_06' :
        layers.bhuvanPeriod === '2011-12' ? 'bhuvan_lulc_2011_12' : 'bhuvan_lulc_2015_16';

      map.setPaintProperty('bhuvan-lulc-overlay', 'fill-color', [
        'coalesce',
        [
          'match',
          ['get', periodField],
          'Agriculture', '#ffff66',
          'Built-up', '#ff0000',
          'Forest', '#38a800',
          'Water', '#004da8',
          'Wasteland', '#d7c29e',
          null as any
        ],
        [
          'match',
          ['get', 'land_use'],
          'Agriculture', '#ffff66',
          'Built-up', '#ff0000',
          'Forest', '#38a800',
          'Water', '#004da8',
          'Vacant', '#d7c29e',
          '#ffff66'
        ]
      ] as any);
    }
  }, [layers]);

  // Update Selected Parcel Highlight & 3D Extrusion filter
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const filterExpr = selectedParcelId 
      ? (['==', ['get', 'parcel_id'], selectedParcelId] as unknown as maplibregl.FilterSpecification)
      : (['==', ['get', 'parcel_id'], ''] as unknown as maplibregl.FilterSpecification);

    if (map.getLayer('parcels-selected-outline')) {
      map.setFilter('parcels-selected-outline', filterExpr);
    }
    if (map.getLayer('parcels-extrusion')) {
      map.setFilter('parcels-extrusion', filterExpr);
    }
  }, [selectedParcelId]);

  return (
    <div className="relative w-full h-full bg-slate-950">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};
