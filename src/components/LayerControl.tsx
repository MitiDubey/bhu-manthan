import React, { useState } from 'react';
import { 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Calendar, 
  BarChart2, 
  Sliders
} from 'lucide-react';
import type { LayerVisibilityState, BhuvanLulcPeriod } from '../types/parcel';
import { BHUVAN_LULC_PALETTE } from '../data/bhuvanStats';

interface LayerControlProps {
  layers: LayerVisibilityState;
  onToggleLayer: (layerKey: keyof LayerVisibilityState) => void;
  onSelectBhuvanPeriod: (period: BhuvanLulcPeriod) => void;
  onChangeBhuvanOpacity: (opacity: number) => void;
  onOpenBhuvanStats: () => void;
  flaggedCount: number;
}

export const LayerControl: React.FC<LayerControlProps> = ({
  layers,
  onToggleLayer,
  onSelectBhuvanPeriod,
  onChangeBhuvanOpacity,
  onOpenBhuvanStats,
  flaggedCount,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute top-20 left-4 z-20 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 pointer-events-auto">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-950/90 hover:bg-slate-900 text-left transition-colors border-b border-slate-800"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
            MAP LAYERS
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {/* Layer List */}
      {isOpen && (
        <div className="p-3.5 space-y-2.5 text-xs max-h-[78vh] overflow-y-auto">
          {/* Layer 1: Satellite Imagery (Visualization / Context) */}
          <label className="flex items-center justify-between cursor-pointer group select-none py-1">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  layers.satellite
                    ? 'bg-sky-500 border-sky-400 text-white'
                    : 'border-slate-600 bg-slate-800/80'
                }`}
              >
                {layers.satellite && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <span className="font-semibold text-slate-200 group-hover:text-white block leading-tight">
                  Satellite Imagery
                </span>
                <span className="text-[10px] text-slate-400">Visualization basemap</span>
              </div>
            </div>
            <span className="text-[10px] text-sky-400 font-mono">Context</span>
            <input
              type="checkbox"
              className="hidden"
              checked={layers.satellite}
              onChange={() => onToggleLayer('satellite')}
            />
          </label>

          {/* Layer 2: 3D Terrain (Visualization / Context) */}
          <label className="flex items-center justify-between cursor-pointer group select-none py-1">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  layers.terrain
                    ? 'bg-emerald-500 border-emerald-400 text-white'
                    : 'border-slate-600 bg-slate-800/80'
                }`}
              >
                {layers.terrain && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <span className="font-semibold text-slate-200 group-hover:text-white block leading-tight">
                  3D Terrain
                </span>
                <span className="text-[10px] text-slate-400">DEM elevation mesh</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Context</span>
            <input
              type="checkbox"
              className="hidden"
              checked={layers.terrain}
              onChange={() => onToggleLayer('terrain')}
            />
          </label>

          {/* Layer 4: Parcel / Cadastral Boundaries (Interactive Parcel Layer) */}
          <label className="flex items-center justify-between cursor-pointer group select-none py-1">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  layers.parcelBoundaries
                    ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                    : 'border-slate-600 bg-slate-800/80'
                }`}
              >
                {layers.parcelBoundaries && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <span className="font-semibold text-slate-200 group-hover:text-white block leading-tight">
                  Parcel Boundaries
                </span>
                <span className="text-[10px] text-amber-400/90 font-mono">Interactive cadastre (ULPIN)</span>
              </div>
            </div>
            <span className="text-[10px] text-amber-300 font-mono">Interactive</span>
            <input
              type="checkbox"
              className="hidden"
              checked={layers.parcelBoundaries}
              onChange={() => onToggleLayer('parcelBoundaries')}
            />
          </label>

          {/* Layer 3: Bhuvan LULC (Inspectable Geospatial Layer) */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <label className="flex items-center justify-between cursor-pointer group select-none">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    layers.bhuvanLulc
                      ? 'bg-orange-500 border-orange-400 text-white'
                      : 'border-slate-600 bg-slate-800/80'
                  }`}
                >
                  {layers.bhuvanLulc && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div>
                  <span className="font-semibold text-slate-100 group-hover:text-white block leading-tight">
                    Bhuvan LULC
                  </span>
                  <span className="text-[10px] text-orange-400">ISRO-NRSC thematic overlay</span>
                </div>
              </div>
              <span className="text-[10px] text-orange-300 font-mono">Thematic</span>
              <input
                type="checkbox"
                className="hidden"
                checked={layers.bhuvanLulc}
                onChange={() => onToggleLayer('bhuvanLulc')}
              />
            </label>

            {/* LULC Year Selector & Controls */}
            {layers.bhuvanLulc && (
              <div className="ml-6 p-2.5 bg-slate-950/80 border border-orange-500/30 rounded-lg space-y-2.5 text-xs animate-in fade-in duration-150">
                {/* Requested LULC YEAR Dropdown */}
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-orange-400" /> LULC YEAR
                  </label>
                  <select
                    value={layers.bhuvanPeriod}
                    onChange={(e) => onSelectBhuvanPeriod(e.target.value as BhuvanLulcPeriod)}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-orange-200 font-mono focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="2005-06">2005–06 (Cycle 1)</option>
                    <option value="2011-12">2011–12 (Cycle 2)</option>
                    <option value="2015-16">2015–16 (Cycle 3)</option>
                  </select>
                </div>

                {/* Opacity Slider */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-slate-400" /> Layer Opacity:
                    </span>
                    <span className="font-mono text-slate-200">{Math.round(layers.bhuvanOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.0"
                    step="0.05"
                    value={layers.bhuvanOpacity}
                    onChange={(e) => onChangeBhuvanOpacity(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* Bhuvan Classification Legend */}
                <div className="space-y-1 pt-1 border-t border-slate-800 text-[11px]">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider block mb-1">
                    ISRO-NRSC 1:50K Legend
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: BHUVAN_LULC_PALETTE.agriculture }} />
                      <span className="text-slate-200">Agriculture</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Cropland</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: BHUVAN_LULC_PALETTE.builtup }} />
                      <span className="text-slate-200">Built-up</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Settlement</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: BHUVAN_LULC_PALETTE.forest }} />
                      <span className="text-slate-200">Forest</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Scrub/Ridge</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: BHUVAN_LULC_PALETTE.water }} />
                      <span className="text-slate-200">Water</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Talab/Canal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: BHUVAN_LULC_PALETTE.wasteland }} />
                      <span className="text-slate-200">Wasteland</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Barren</span>
                  </div>
                </div>

                {/* View AOI Statistics Button */}
                <button
                  onClick={onOpenBhuvanStats}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-orange-600/30 hover:bg-orange-600/50 text-orange-200 border border-orange-500/40 rounded text-[11px] font-medium transition-colors cursor-pointer"
                >
                  <BarChart2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>View AOI Statistics</span>
                </button>
              </div>
            )}
          </div>

          {/* Layer 5: Land Record Status (Parcel-linked Interactive Layer) */}
          <div className="pt-2 border-t border-slate-800">
            <label className="flex items-center justify-between cursor-pointer group select-none py-1">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    layers.landRecordStatus
                      ? 'bg-purple-500 border-purple-400 text-white'
                      : 'border-slate-600 bg-slate-800/80'
                  }`}
                >
                  {layers.landRecordStatus && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div>
                  <span className="font-semibold text-slate-200 group-hover:text-white block leading-tight">
                    Land Record Status
                  </span>
                  <span className="text-[10px] text-purple-300/80">Title & revenue status</span>
                </div>
              </div>
              <span className="text-[10px] text-purple-300 font-mono">Parcel-linked</span>
              <input
                type="checkbox"
                className="hidden"
                checked={layers.landRecordStatus}
                onChange={() => onToggleLayer('landRecordStatus')}
              />
            </label>

            {layers.landRecordStatus && (
              <div className="ml-6 mt-1 p-2 bg-slate-950/70 border border-purple-500/30 rounded-lg space-y-1 text-[11px] animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-300">Verified Title</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-mono">Clean</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-slate-300">Under Review</span>
                  </div>
                  <span className="text-amber-400 text-[10px] font-mono">Mutation</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-slate-300">Disputed Record</span>
                  </div>
                  <span className="text-red-400 text-[10px] font-mono">Civil Suit</span>
                </div>
              </div>
            )}
          </div>

          {/* Layer 6: Change Detection (Parcel-linked Interactive Layer) */}
          <div className="pt-2 border-t border-slate-800">
            <label className="flex items-center justify-between cursor-pointer group select-none py-1">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    layers.changeDetection
                      ? 'bg-rose-500 border-rose-400 text-white'
                      : 'border-slate-600 bg-slate-800/80'
                  }`}
                >
                  {layers.changeDetection && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div>
                  <span className="font-semibold text-slate-200 group-hover:text-white block leading-tight">
                    Change Detection
                  </span>
                  <span className="text-[10px] text-rose-400/90">Potential change signals</span>
                </div>
              </div>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded">
                {flaggedCount} Flagged
              </span>
              <input
                type="checkbox"
                className="hidden"
                checked={layers.changeDetection}
                onChange={() => onToggleLayer('changeDetection')}
              />
            </label>
          </div>

          {/* Layer 7: Policy Impact (Scenario / Spatial Impact Layer) */}
          <div className="pt-2 border-t border-slate-800">
            <label className="flex items-center justify-between cursor-pointer group select-none py-1">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    layers.policyImpact
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold'
                      : 'border-slate-600 bg-slate-800/80'
                  }`}
                >
                  {layers.policyImpact && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div>
                  <span className="font-semibold text-slate-200 group-hover:text-white block leading-tight">
                    Policy Impact
                  </span>
                  <span className="text-[10px] text-cyan-400/90">Simulation scenario spatial layer</span>
                </div>
              </div>
              <span className="text-[10px] text-cyan-300 font-mono">Scenario</span>
              <input
                type="checkbox"
                className="hidden"
                checked={layers.policyImpact}
                onChange={() => onToggleLayer('policyImpact')}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
