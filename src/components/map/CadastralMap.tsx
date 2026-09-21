import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from 'react-leaflet';
import { useApp } from '../../context/AppContext';
import { getLandUseColor } from '../../data/parcels';
import { Layers, Eye, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

// Controller to smoothly fly camera when activeMapCenter changes
const MapCenterController: React.FC = () => {
  const { activeMapCenter } = useApp();
  const map = useMap();

  useEffect(() => {
    if (activeMapCenter) {
      map.flyTo(activeMapCenter, 15, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [activeMapCenter, map]);

  return null;
};

interface CadastralMapProps {
  heightClass?: string;
  showControls?: boolean;
}

export const CadastralMap: React.FC<CadastralMapProps> = ({
  heightClass = 'h-[calc(100vh-4rem)]',
  showControls = true,
}) => {
  const {
    parcels,
    selectedParcel,
    setSelectedParcel,
    is3DMode,
    setIs3DMode,
    activeLayers,
    toggleLayer,
    activeMapCenter,
    selectedState,
    selectedCity,
  } = useApp();

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden rounded-xl border border-twin-700/60 bg-twin-950 transition-all duration-700`}>
      {/* 3D Isometric tilt wrapper */}
      <div
        className={`w-full h-full transition-transform duration-700 ease-out origin-bottom ${
          is3DMode ? 'scale-95 [transform:rotateX(28deg)_rotateZ(-4deg)] shadow-[0_30px_60px_rgba(0,0,0,0.8)]' : ''
        }`}
      >
        <MapContainer
          center={activeMapCenter}
          zoom={15}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
          zoomControl={false}
        >
          {/* Base Tile Layer: Satellite or Dark Canvas */}
          {activeLayers.satellite ? (
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          ) : (
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              maxZoom={19}
            />
          )}

          {/* Master Plan 2031 Zoning Buffer simulation overlay for Varanasi */}
          {activeLayers.masterPlan && (
            <Polygon
              positions={[
                [25.3740, 83.0210],
                [25.3750, 83.0300],
                [25.3670, 83.0310],
                [25.3660, 83.0200],
              ]}
              pathOptions={{
                color: '#8B5CF6',
                weight: 1.5,
                dashArray: '6, 6',
                fillColor: '#8B5CF6',
                fillOpacity: 0.12,
              }}
            >
              <Tooltip sticky>
                <span className="font-mono text-xs">Master Plan 2031: Eco-Heritage Regulated Buffer</span>
              </Tooltip>
            </Polygon>
          )}

          {/* Cadastral Parcels Layer */}
          {activeLayers.parcels &&
            parcels.map(parcel => {
              const isSelected = selectedParcel?.id === parcel.id;
              const color = getLandUseColor(parcel.currentLandUse);

              return (
                <Polygon
                  key={parcel.id}
                  positions={parcel.coordinates}
                  pathOptions={{
                    color: isSelected ? '#00F0FF' : color,
                    weight: isSelected ? 3.5 : 2,
                    fillColor: color,
                    fillOpacity: isSelected ? 0.45 : 0.25,
                    dashArray: parcel.zoningViolation ? '4, 4' : undefined,
                  }}
                  eventHandlers={{
                    click: () => {
                      setSelectedParcel(parcel);
                    },
                  }}
                >
                  <Tooltip sticky direction="top">
                    <div className="p-1 font-sans">
                      <div className="font-bold text-slate-100 flex items-center justify-between gap-3">
                        <span>{parcel.khasraNo}</span>
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                          style={{ backgroundColor: `${color}33`, color: color }}
                        >
                          {parcel.currentLandUse}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Code: <span className="font-mono text-cyan-400">{parcel.parcelCode}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {parcel.district}, {parcel.state} • {parcel.areaHectares} ha ({parcel.areaAcres || (parcel.areaHectares * 2.47).toFixed(1)} ac)
                      </div>
                      <div className="text-[11px] text-cyan-300 font-mono mt-1">
                        Soil: {parcel.soilEnvironmentalIndicators?.soilType?.split(' ')[0] || 'Alluvial'} • pH {parcel.soilEnvironmentalIndicators?.phLevel || 7.4}
                      </div>
                      {parcel.zoningViolation && (
                        <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
                          <ShieldAlert className="w-3 h-3 text-amber-400" />
                          Zoning Mismatch Detected
                        </div>
                      )}
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}

          <MapCenterController />
        </MapContainer>
      </div>

      {/* Floating HUD & Map Controls */}
      {showControls && (
        <>
          {/* Top Left Active Geographic Node HUD */}
          <div className="absolute top-4 left-4 z-10 glass-panel px-3.5 py-2 rounded-lg text-xs font-mono text-slate-300 flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{selectedCity.toUpperCase()}, {selectedState.toUpperCase()}</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">
              {activeMapCenter[0].toFixed(4)}°N {activeMapCenter[1].toFixed(4)}°E
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              POSTGIS SYNC
            </span>
          </div>

          {/* Top Right 2D/3D & Satellite Toolbar */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg ${
                is3DMode
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-glow-cyan'
                  : 'bg-twin-900/80 text-slate-300 border-twin-700 hover:border-slate-500'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {is3DMode ? '3D DIGITAL TWIN ON' : 'SWITCH TO 3D TILT'}
            </button>

            <button
              onClick={() => toggleLayer('satellite')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg ${
                activeLayers.satellite
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                  : 'bg-twin-900/80 text-slate-300 border-twin-700 hover:border-slate-500'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {activeLayers.satellite ? 'SATELLITE ORTHO' : 'DARK CARTOGRAPHY'}
            </button>
          </div>

          {/* Bottom Floating Layer Switcher */}
          <div className="absolute bottom-4 left-4 z-10 glass-panel px-3 py-2 rounded-lg flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-slate-200">LAYERS:</span>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={activeLayers.parcels}
                onChange={() => toggleLayer('parcels')}
                className="rounded bg-twin-800 border-twin-600 text-cyan-500 focus:ring-0 w-3.5 h-3.5"
              />
              <span className={activeLayers.parcels ? 'text-cyan-300 font-medium' : 'text-slate-400'}>
                Khasra Parcels ({parcels.length})
              </span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={activeLayers.masterPlan}
                onChange={() => toggleLayer('masterPlan')}
                className="rounded bg-twin-800 border-twin-600 text-purple-500 focus:ring-0 w-3.5 h-3.5"
              />
              <span className={activeLayers.masterPlan ? 'text-purple-300 font-medium' : 'text-slate-400'}>
                Master Plan Buffer
              </span>
            </label>
          </div>

          {/* Land-Use Legend */}
          <div className="absolute bottom-4 right-4 z-10 glass-panel px-3 py-2 rounded-lg flex items-center gap-3 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />
              <span>Agri</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]" />
              <span>Commercial</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]" />
              <span>Residential</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#8B5CF6]" />
              <span>Industrial</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#06B6D4]" />
              <span>Wetland</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
