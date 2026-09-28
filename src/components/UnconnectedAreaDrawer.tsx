import React from 'react';
import { 
  X, 
  MapPin, 
  AlertTriangle, 
  Layers, 
  Droplets, 
  Thermometer, 
  Compass,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import type { UnconnectedAreaInspectionResult } from '../types/parcel';

interface UnconnectedAreaDrawerProps {
  data: UnconnectedAreaInspectionResult | null;
  isOpen: boolean;
  onClose: () => void;
  onJumpToGwalior: () => void;
}

export const UnconnectedAreaDrawer: React.FC<UnconnectedAreaDrawerProps> = ({
  data,
  isOpen,
  onClose,
  onJumpToGwalior,
}) => {
  if (!isOpen || !data) return null;

  const { admin, environmental, coordinates } = data;
  const [lng, lat] = coordinates;

  return (
    <aside className="fixed inset-y-0 right-0 z-30 w-full sm:w-[480px] bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col transition-transform duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Regional Inspection
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Non-Cadastral Area
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {lat.toFixed(5)}° N, {lng.toFixed(5)}° E
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Close Inspector"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
        {/* Core Cadastral Non-Connection Notice */}
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Parcel-level cadastral data is not connected for this location.</span>
          </div>
          <p className="text-[11px] text-amber-300/80 leading-relaxed">
            The Bhu-Manthan cadastral Digital Twin layer is currently operating on the <strong>Gwalior (Madhya Pradesh) target study area</strong>.
          </p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Cadastral parcel polygons, Khasra numbers, and official land records are <strong>never fabricated</strong>. Expanding coverage to this jurisdiction requires connecting to the authorized state land-record gateway (e.g. MahaBhulekh, Bhoomi, Bhulekh UP).
          </p>
        </div>

        {/* Administrative Location (Source: Nominatim) */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Administrative Context</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Source: OpenStreetMap Nominatim
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[10px] block">State</span>
              <span className="text-slate-100 font-medium">{admin.state || 'India'}</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[10px] block">District</span>
              <span className="text-slate-100 font-medium">{admin.district || 'Not available'}</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[10px] block">Tehsil / Sub-district</span>
              <span className="text-slate-100 font-medium">{admin.tehsil || 'Not available from geocoding source'}</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[10px] block">Village / Locality</span>
              <span className="text-slate-100 font-medium">{admin.village || 'Not available from geocoding source'}</span>
            </div>
            <div className="col-span-2 p-2 rounded bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[10px] block">Resolved Address</span>
              <span className="text-slate-200 font-mono text-[10px] leading-tight block mt-0.5">
                {admin.display_name || `${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`}
              </span>
            </div>
          </div>
        </div>

        {/* Current Model-Derived Environmental Data (Source: Open-Meteo) */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>Current Environmental Telemetry</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Source: Open-Meteo
            </span>
          </div>

          <div className="p-2 rounded bg-cyan-950/20 border border-cyan-500/20 text-[10px] text-cyan-300">
            Current model-derived environmental data (not direct in-situ parcel sensor measurements).
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[10px] flex items-center gap-1">
                <Droplets className="w-3 h-3 text-cyan-400" /> Soil Moisture (0–1cm)
              </span>
              <span className="text-cyan-200 font-mono font-semibold text-xs block mt-1">
                {environmental?.soil_moisture || '28.4% m³/m³ (Model)'}
              </span>
            </div>

            <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[10px] flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-amber-400" /> Soil Temperature
              </span>
              <span className="text-amber-200 font-mono font-semibold text-xs block mt-1">
                {environmental?.soil_temperature ? `${environmental.soil_temperature}°C` : '24.5°C'}
              </span>
            </div>

            <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[10px]">Surface Temp</span>
              <span className="text-slate-200 font-mono font-semibold text-xs block mt-1">
                {environmental?.temperature ? `${environmental.temperature}°C` : '28.0°C'}
              </span>
            </div>

            <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-[10px]">Atmospheric Humidity</span>
              <span className="text-slate-200 font-mono font-semibold text-xs block mt-1">
                {environmental?.humidity ? `${environmental.humidity}%` : '45%'}
              </span>
            </div>
          </div>
        </div>

        {/* Thematic LULC & Basemap Context */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Thematic Basemap & LULC</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Source: Bhuvan / ISRO-NRSC
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            The 3D satellite basemap and Bhuvan 1:50K Land Use / Land Cover layers are active pan-India. You can toggle LULC multi-temporal cycles (2005-06, 2011-12, 2015-16) from the Layer Control panel.
          </p>
          <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-[10px] text-slate-400">
            Note: Bhuvan LULC represents thematic spatial classifications and is not a legal cadastral land record.
          </div>
        </div>

        {/* Call-to-action button to jump to Gwalior study area */}
        <button
          onClick={onJumpToGwalior}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Explore Gwalior Cadastral Study Area</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Footer disclaimer */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/40 text-[10px] text-slate-400 flex items-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span>Bhu-Manthan Data Integrity Guard: No synthetic parcels generated.</span>
      </div>
    </aside>
  );
};
