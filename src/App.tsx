import { useState, useRef, useCallback } from 'react';
import type { Map as MapLibreMap } from 'maplibre-gl';
import { SatelliteMap } from './components/SatelliteMap';
import { TopNavigation } from './components/TopNavigation';
import { MapControls } from './components/MapControls';
import { LayerControl } from './components/LayerControl';
import { ParcelPopup } from './components/ParcelPopup';
import { DigitalTwinDrawer } from './components/DigitalTwinDrawer';
import { GisStatusBar } from './components/GisStatusBar';
import { BhuvanLulcStatsModal } from './components/BhuvanLulcStatsModal';
import { DataDistinctionModal } from './components/DataDistinctionModal';
import { EvidenceModal } from './components/EvidenceModal';
import { AreaContextOverlay } from './components/AreaContextOverlay';
import type { 
  ParcelProperties, 
  LayerVisibilityState, 
  MapTelemetry,
  BhuvanLulcPeriod,
  TimelineYear,
  PolicySimulationParams,
  UnconnectedAreaInspectionResult,
} from './types/parcel';
import { GWALIOR_PRESETS } from './utils/mapUtils';
import { parcelsGeoJSONData } from './data/parcelsGeoJSON';
import {
  reverseGeocode,
  fetchCurrentModelEnvironmentalData,
  isWithinCadastralCoverage,
} from './utils/indiaGeoService';

export function App() {
  const mapInstanceRef = useRef<MapLibreMap | null>(null);

  // Layer Visibility State (7 Distinct Geospatial Layers)
  const [layers, setLayers] = useState<LayerVisibilityState>({
    satellite: true,
    terrain: true,
    parcelBoundaries: true,
    bhuvanLulc: false,
    landRecordStatus: false,
    changeDetection: false,
    policyImpact: false,
    bhuvanPeriod: '2015-16',
    bhuvanOpacity: 0.65,
  });

  // Modal Dialogs
  const [isBhuvanStatsOpen, setIsBhuvanStatsOpen] = useState(false);
  const [isDataDistinctionOpen, setIsDataDistinctionOpen] = useState(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);

  // Digital Twin Timeline & Policy Simulation State
  const [timelineYear, setTimelineYear] = useState<TimelineYear>(2026);
  const [isPolicySimulated, setIsPolicySimulated] = useState(false);

  // Selected Parcel & Digital Twin Drawer State
  const [selectedParcel, setSelectedParcel] = useState<ParcelProperties | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDigitalTwinOpen, setIsDigitalTwinOpen] = useState(false);

  // In-map Area Context Overlay (non-cadastral click inspection)
  const [areaContext, setAreaContext] = useState<UnconnectedAreaInspectionResult | null>(null);
  const [isAreaContextVisible, setIsAreaContextVisible] = useState(false);
  const [isInspectingArea, setIsInspectingArea] = useState(false);

  // 3D Globe Projection & Perspective Controls
  const [isGlobe, setIsGlobe] = useState(true);
  const [is3D, setIs3D] = useState(true);
  const [terrainExaggeration, setTerrainExaggeration] = useState(1.5);

  // Telemetry
  const [telemetry, setTelemetry] = useState<MapTelemetry>({
    lat: 26.2183,
    lng: 78.1828,
    zoom: 12.5,
    pitch: 55,
    bearing: -25,
    elevation: 215,
  });

  // Count flagged change parcels for LayerControl badge
  const flaggedCount = parcelsGeoJSONData.features.filter(
    (f) => f.properties.priority !== 'NONE'
  ).length;

  // Toggle individual layers
  const handleToggleLayer = (layerKey: keyof LayerVisibilityState) => {
    setLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  const handleSelectBhuvanPeriod = (period: BhuvanLulcPeriod) => {
    setLayers((prev) => ({ ...prev, bhuvanPeriod: period }));
  };

  const handleChangeBhuvanOpacity = (opacity: number) => {
    setLayers((prev) => ({ ...prev, bhuvanOpacity: opacity }));
  };

  // Select a parcel from map click — dismisses area context overlay
  const handleSelectParcel = (
    parcel: ParcelProperties | null,
    screenPos?: { x: number; y: number } | null
  ) => {
    setSelectedParcel(parcel);
    setPopupPosition(screenPos || null);
    if (parcel) {
      setIsDigitalTwinOpen(true);
      setIsAreaContextVisible(false);
      setAreaContext(null);
    }
  };

  /**
   * Non-cadastral area inspection:
   * 1. Map has already flown to the clicked point (SatelliteMap handles the flyTo)
   * 2. Show the overlay card immediately in loading state
   * 3. Fire Nominatim + Open-Meteo concurrently
   * 4. Populate overlay card with real data
   */
  const handleInspectUnconnectedArea = useCallback(async (coord: { lat: number; lng: number }) => {
    if (isWithinCadastralCoverage(coord.lat, coord.lng)) return;
    if (isInspectingArea) return;

    // Dismiss parcel drawer — area context takes over the UI
    setIsDigitalTwinOpen(false);
    setSelectedParcel(null);
    setPopupPosition(null);

    // Show card in loading state immediately (fast feedback)
    setAreaContext({
      coordinates: [coord.lng, coord.lat],
      admin: { display_name: '' },
      environmental: undefined,
    });
    setIsAreaContextVisible(true);
    setIsInspectingArea(true);

    try {
      const [admin, environmental] = await Promise.all([
        reverseGeocode(coord.lat, coord.lng),
        fetchCurrentModelEnvironmentalData(coord.lat, coord.lng),
      ]);

      setAreaContext({
        coordinates: [coord.lng, coord.lat],
        admin,
        environmental,
        lulc_context: `Satellite-derived LULC classification from ISRO-NRSC Bhuvan available for this region. Toggle the "Bhuvan LULC" layer (left panel) to view the ${admin.state || 'regional'} land cover classification over the satellite basemap.`,
      });
    } catch (err) {
      console.warn('Area inspection error:', err);
    } finally {
      setIsInspectingArea(false);
    }
  }, [isInspectingArea]);

  const handleRunSimulation = (_params: PolicySimulationParams) => {
    setIsPolicySimulated(true);
    setLayers((prev) => ({ ...prev, policyImpact: true }));
  };

  const handleOpenDigitalTwin = (_parcelId: string) => {
    setIsDigitalTwinOpen(true);
  };

  const handleCloseDigitalTwin = () => {
    setIsDigitalTwinOpen(false);
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetBearing = () => mapInstanceRef.current?.easeTo({ bearing: 0 });

  const handleResetView = () => {
    mapInstanceRef.current?.flyTo({
      center: [78.1950, 26.2200],
      zoom: 12.2,
      pitch: 52,
      bearing: -20,
      essential: true,
    });
    setSelectedParcel(null);
    setPopupPosition(null);
    setIsDigitalTwinOpen(false);
    setIsAreaContextVisible(false);
    setAreaContext(null);
  };

  const handleToggleGlobe = () => setIsGlobe((prev) => !prev);

  const handleToggle3D = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (is3D) {
      map.easeTo({ pitch: 0, bearing: 0, duration: 1000 });
      setIs3D(false);
    } else {
      map.easeTo({ pitch: 58, bearing: -20, duration: 1000 });
      setIs3D(true);
    }
  };

  const handleToggleTerrain = () => {
    setLayers((prev) => ({ ...prev, terrain: !prev.terrain }));
  };

  const handleSelectPreset = (preset: typeof GWALIOR_PRESETS[0]) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.flyTo({
      center: preset.center,
      zoom: preset.zoom,
      pitch: preset.pitch,
      bearing: preset.bearing,
      essential: true,
      duration: 2200,
    });

    if (preset.parcelId) {
      const match = parcelsGeoJSONData.features.find(
        (f) => f.properties.parcel_id === preset.parcelId
      );
      if (match) {
        setSelectedParcel(match.properties as unknown as ParcelProperties);
        setPopupPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 - 40 });
        setIsDigitalTwinOpen(true);
        setIsAreaContextVisible(false);
        setAreaContext(null);
      }
    } else {
      // Pan-India non-cadastral preset → trigger area inspection after flight
      setSelectedParcel(null);
      setPopupPosition(null);
      setIsDigitalTwinOpen(false);
      setTimeout(() => {
        handleInspectUnconnectedArea({ lat: preset.center[1], lng: preset.center[0] });
      }, 400);
    }
  };

  const handleSelectParcelById = (parcelId: string) => {
    const match = parcelsGeoJSONData.features.find(
      (f) => f.properties.parcel_id === parcelId
    );
    if (!match) return;

    const props = match.properties as unknown as ParcelProperties;
    setSelectedParcel(props);
    setPopupPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 - 40 });
    setIsDigitalTwinOpen(true);
    setIsAreaContextVisible(false);
    setAreaContext(null);

    if (mapInstanceRef.current && props.centroid) {
      mapInstanceRef.current.flyTo({
        center: props.centroid,
        zoom: 16.5,
        pitch: 58,
        bearing: 15,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });
    }
  };

  // Nominatim search result → fly-to + area inspection
  const handleFlyToLocation = useCallback((lat: number, lng: number, _label: string) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo({
      center: [lng, lat],
      zoom: 13.5,
      pitch: 45,
      bearing: 0,
      essential: true,
      duration: 2000,
    });
    setTimeout(() => {
      handleInspectUnconnectedArea({ lat, lng });
    }, 2200);
  }, [handleInspectUnconnectedArea]);

  // Jump to Gwalior from the area context overlay
  const handleJumpToGwalior = () => {
    mapInstanceRef.current?.flyTo({
      center: [78.1950, 26.2200],
      zoom: 13.5,
      pitch: 52,
      bearing: -20,
      essential: true,
      duration: 2200,
    });
    setIsAreaContextVisible(false);
    setAreaContext(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 select-none">
      {/* 1. Top Government GIS Header */}
      <TopNavigation
        onSelectPreset={handleSelectPreset}
        onSelectParcelById={handleSelectParcelById}
        activeParcelId={selectedParcel?.parcel_id || null}
        onOpenBhuvanStats={() => setIsBhuvanStatsOpen(true)}
        onOpenDataDistinction={() => setIsDataDistinctionOpen(true)}
        onFlyToLocation={handleFlyToLocation}
      />

      {/* 2. Core 3D Satellite Map Canvas */}
      <main className="w-full h-full">
        <SatelliteMap
          layers={layers}
          selectedParcelId={selectedParcel?.parcel_id || null}
          onSelectParcel={handleSelectParcel}
          onUpdateTelemetry={setTelemetry}
          terrainExaggeration={terrainExaggeration}
          is3D={is3D}
          isGlobe={isGlobe}
          mapInstanceRef={mapInstanceRef}
          onInspectUnconnectedArea={handleInspectUnconnectedArea}
        />
      </main>

      {/* 3. Layer Visibility Switcher & Legends */}
      <LayerControl
        layers={layers}
        onToggleLayer={handleToggleLayer}
        onSelectBhuvanPeriod={handleSelectBhuvanPeriod}
        onChangeBhuvanOpacity={handleChangeBhuvanOpacity}
        onOpenBhuvanStats={() => setIsBhuvanStatsOpen(true)}
        flaggedCount={flaggedCount}
      />

      {/* 4. GIS Navigation Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetBearing={handleResetBearing}
        onResetView={handleResetView}
        onToggle3D={handleToggle3D}
        onToggleTerrain={handleToggleTerrain}
        onToggleGlobe={handleToggleGlobe}
        is3D={is3D}
        isGlobe={isGlobe}
        terrainEnabled={layers.terrain}
        bearing={telemetry.bearing}
        terrainExaggeration={terrainExaggeration}
        onChangeExaggeration={setTerrainExaggeration}
      />

      {/* 5. Floating Parcel Info Card */}
      {selectedParcel && !isDigitalTwinOpen && (
        <ParcelPopup
          parcel={selectedParcel}
          position={popupPosition}
          onOpenDigitalTwin={handleOpenDigitalTwin}
          onClose={() => {
            setSelectedParcel(null);
            setPopupPosition(null);
          }}
        />
      )}

      {/* 6. Digital Twin Inspection Drawer (Slide-Over Right Panel) */}
      {isDigitalTwinOpen && (
        <DigitalTwinDrawer
          parcelId={selectedParcel?.parcel_id || null}
          parcelProps={selectedParcel}
          onClose={handleCloseDigitalTwin}
          onFocusParcel={() => {
            if (selectedParcel?.centroid && mapInstanceRef.current) {
              mapInstanceRef.current.flyTo({
                center: selectedParcel.centroid,
                zoom: 16.8,
                pitch: 58,
                bearing: 20,
              });
            }
          }}
          onOpenEvidence={() => setIsEvidenceOpen(true)}
          timelineYear={timelineYear}
          onTimelineYearChange={setTimelineYear}
          onRunSimulation={handleRunSimulation}
          isPolicySimulated={isPolicySimulated}
        />
      )}

      {/* 6b. In-Map Area Context Overlay (non-cadastral click) */}
      {isAreaContextVisible && (
        <AreaContextOverlay
          data={areaContext}
          isLoading={isInspectingArea}
          onClose={() => {
            setIsAreaContextVisible(false);
            setAreaContext(null);
          }}
          onJumpToGwalior={handleJumpToGwalior}
        />
      )}

      {/* 7. Bottom GIS Telemetry Bar */}
      <GisStatusBar
        telemetry={telemetry}
        selectedParcelId={selectedParcel?.parcel_id || null}
      />

      {/* 8. Bhuvan LULC Statistics Modal */}
      <BhuvanLulcStatsModal
        isOpen={isBhuvanStatsOpen}
        onClose={() => setIsBhuvanStatsOpen(false)}
        selectedParcelId={selectedParcel?.parcel_id || null}
        currentPeriod={layers.bhuvanPeriod}
        onSelectPeriod={handleSelectBhuvanPeriod}
      />

      {/* 9. Data Integrity Modal */}
      <DataDistinctionModal
        isOpen={isDataDistinctionOpen}
        onClose={() => setIsDataDistinctionOpen(false)}
      />

      {/* 10. Evidence Viewer Modal */}
      <EvidenceModal
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        parcel={selectedParcel}
      />
    </div>
  );
}

export default App;
