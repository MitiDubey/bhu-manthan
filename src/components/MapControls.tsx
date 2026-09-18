import React from 'react';
import { Plus, Minus, Compass, RotateCcw, Mountain, Globe } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetBearing: () => void;
  onResetView: () => void;
  onToggle3D: () => void;
  onToggleTerrain: () => void;
  onToggleGlobe: () => void;
  is3D: boolean;
  isGlobe: boolean;
  terrainEnabled: boolean;
  bearing: number;
  terrainExaggeration: number;
  onChangeExaggeration: (val: number) => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetBearing,
  onResetView,
  onToggle3D,
  onToggleTerrain,
  onToggleGlobe,
  is3D,
  isGlobe,
  terrainEnabled,
  bearing,
  terrainExaggeration,
  onChangeExaggeration,
}) => {
  return (
    <div className="absolute top-20 right-4 z-20 flex flex-col items-end gap-2 pointer-events-none">
      {/* Primary Navigation Cluster */}
      <div className="flex flex-col bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg overflow-hidden shadow-xl pointer-events-auto p-1 gap-1">
        {/* Zoom In */}
        <button
          onClick={onZoomIn}
          title="Zoom In (+)"
          className="w-8 h-8 flex items-center justify-center rounded text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={onZoomOut}
          title="Zoom Out (−)"
          className="w-8 h-8 flex items-center justify-center rounded text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-full h-px bg-slate-800" />

        {/* Compass (Click resets bearing to North) */}
        <button
          onClick={onResetBearing}
          title={`Compass: Reset North (${Math.round(bearing)}°)`}
          className="w-8 h-8 flex items-center justify-center rounded text-slate-200 hover:text-white hover:bg-slate-800 transition-colors relative"
          aria-label="Reset North"
        >
          <Compass
            className="w-4 h-4 transition-transform duration-200"
            style={{ transform: `rotate(${-bearing}deg)` }}
          />
          <span className="absolute top-0.5 right-1 text-[8px] font-mono font-bold text-red-400">N</span>
        </button>

        <div className="w-full h-px bg-slate-800" />

        {/* 3D Globe Projection Toggle */}
        <button
          onClick={onToggleGlobe}
          title={isGlobe ? "Switch to Flat Projection" : "Switch to 3D Globe Projection"}
          className={`w-8 h-8 flex flex-col items-center justify-center rounded transition-colors ${
            isGlobe
              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          aria-label="Toggle Globe Projection"
        >
          <Globe className="w-4 h-4" />
        </button>

        {/* 3D / 2D Perspective Toggle */}
        <button
          onClick={onToggle3D}
          title={is3D ? "Switch to 2D Top-Down View" : "Switch to 3D Perspective View"}
          className={`w-8 h-8 flex flex-col items-center justify-center rounded text-[10px] font-bold tracking-tight transition-colors ${
            is3D
              ? 'bg-sky-500/25 text-sky-300 border border-sky-500/40'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          aria-label="Toggle 3D"
        >
          <span>{is3D ? '3D' : '2D'}</span>
        </button>

        {/* Terrain ON/OFF Toggle */}
        <button
          onClick={onToggleTerrain}
          title={terrainEnabled ? "Disable 3D Elevation Terrain" : "Enable 3D Elevation Terrain"}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            terrainEnabled
              ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          aria-label="Toggle Terrain"
        >
          <Mountain className="w-4 h-4" />
        </button>

        <div className="w-full h-px bg-slate-800" />

        {/* Reset View to Gwalior Overview */}
        <button
          onClick={onResetView}
          title="Reset View to Gwalior"
          className="w-8 h-8 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Reset View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terrain Exaggeration Slider (shows when terrain is enabled) */}
      {terrainEnabled && (
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-2.5 shadow-xl pointer-events-auto flex flex-col gap-1.5 w-36">
          <div className="flex justify-between items-center text-[10px] text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              <Mountain className="w-3 h-3 text-emerald-400" /> Exaggeration
            </span>
            <span className="font-mono text-emerald-300 font-bold">{terrainExaggeration.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="2.5"
            step="0.1"
            value={terrainExaggeration}
            onChange={(e) => onChangeExaggeration(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
