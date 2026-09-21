import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CadastralMap } from '../components/map/CadastralMap';
import { Badge } from '../components/common/Badge';
import { getLandUseColor } from '../data/parcels';
import {
  Layers,
  Calendar,
  Filter,
  Eye,
  EyeOff,
  Sliders,
  MapPin,
  Sparkles,
  ShieldAlert,
  Droplets,
  Trees,
} from 'lucide-react';

export const GisExplorerPage: React.FC = () => {
  const {
    parcels,
    selectedParcel,
    setSelectedParcel,
    activeLayers,
    toggleLayer,
    timelineYear,
    setTimelineYear,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRiskTier, setSelectedRiskTier] = useState<string>('All');

  const categories = [
    'All',
    'Agricultural',
    'Commercial',
    'Residential',
    'Industrial',
    'Forest / Green Cover',
    'Water Body / Wetland',
  ];

  const filteredParcels = parcels.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.currentLandUse === selectedCategory;
    const matchesRisk = selectedRiskTier === 'All' || p.floodRisk === selectedRiskTier;
    return matchesCat && matchesRisk;
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden">
      {/* Left Geospatial Layers & Filter Sidebar */}
      <div className="w-full lg:w-80 h-full bg-twin-900/95 border-r border-twin-700/80 p-4 overflow-y-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-wider">
              GIS EXPLORER
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Spatial Layers & Timeline</h2>
          <p className="text-xs text-slate-400 mt-1">
            Toggle multi-spectral overlays and scrub historical satellite observations.
          </p>
        </div>

        {/* TEMPORAL TIMELINE SLIDER (2020 - 2025) */}
        <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              TEMPORAL TIMELINE
            </span>
            <Badge variant="cyan">{timelineYear}</Badge>
          </div>

          <input
            type="range"
            min={2020}
            max={2025}
            step={1}
            value={timelineYear}
            onChange={e => setTimelineYear(Number(e.target.value))}
            className="w-full h-2 bg-twin-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>2020 (Pre-COVID)</span>
            <span>2022</span>
            <span>2024</span>
            <span className="text-cyan-400 font-bold">2025 (Live)</span>
          </div>

          <p className="text-[11px] text-slate-400 leading-tight">
            {timelineYear === 2025
              ? 'Showing live Sentinel-2 & Cartosat-3 current state.'
              : `Showing historical composite for year ${timelineYear}. Notice peri-urban agricultural conversion along Ring Road.`}
          </p>
        </div>

        {/* GEOSPATIAL LAYERS TOGGLE */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Layer Stack
          </h3>

          <div className="space-y-1.5">
            <button
              onClick={() => toggleLayer('parcels')}
              className={`w-full p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                activeLayers.parcels
                  ? 'bg-twin-850 text-cyan-300 border-cyan-500/50'
                  : 'bg-twin-950/60 text-slate-500 border-twin-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Khasra Cadastral Boundaries</span>
              </div>
              {activeLayers.parcels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => toggleLayer('masterPlan')}
              className={`w-full p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                activeLayers.masterPlan
                  ? 'bg-twin-850 text-purple-300 border-purple-500/50'
                  : 'bg-twin-950/60 text-slate-500 border-twin-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>Master Plan 2031 Zoning Buffer</span>
              </div>
              {activeLayers.masterPlan ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => toggleLayer('satellite')}
              className={`w-full p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                activeLayers.satellite
                  ? 'bg-twin-850 text-emerald-300 border-emerald-500/50'
                  : 'bg-twin-950/60 text-slate-500 border-twin-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Sentinel-2 True Color Imagery</span>
              </div>
              {activeLayers.satellite ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => toggleLayer('wetlands')}
              className={`w-full p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                activeLayers.wetlands
                  ? 'bg-twin-850 text-cyan-300 border-cyan-500/50'
                  : 'bg-twin-950/60 text-slate-500 border-twin-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>Varuna Basin & Flood Plain</span>
              </div>
              {activeLayers.wetlands ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* LAND USE CATEGORY FILTER */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Land-Use Filter
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-black font-bold shadow-glow-cyan'
                      : 'bg-twin-850 text-slate-400 hover:text-white border border-twin-700/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* PARCEL LIST SUMMARY */}
        <div className="space-y-2 pt-2 border-t border-twin-800">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Filtered Parcels</span>
            <span className="text-white font-bold">{filteredParcels.length} Found</span>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {filteredParcels.map(p => {
              const color = getLandUseColor(p.currentLandUse);
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedParcel(p)}
                  className={`w-full p-2 rounded-lg text-left text-xs font-mono transition-all flex items-center justify-between ${
                    selectedParcel?.id === p.id
                      ? 'bg-cyan-950/80 border border-cyan-500 text-white'
                      : 'bg-twin-850 hover:bg-twin-800 border border-twin-700/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="font-semibold">{p.khasraNo}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{p.areaHectares} ha</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Map Viewport */}
      <div className="flex-1 h-full relative">
        <CadastralMap heightClass="h-full" showControls={true} />
      </div>
    </div>
  );
};
