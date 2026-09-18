import React from 'react';
import {
  X,
  MapPin,
  Thermometer,
  Droplets,
  Layers,
  Navigation,
  AlertTriangle,
  Wind,
  ArrowRight,
} from 'lucide-react';
import type { UnconnectedAreaInspectionResult } from '../types/parcel';

interface AreaContextOverlayProps {
  data: UnconnectedAreaInspectionResult | null;
  isLoading: boolean;
  onClose: () => void;
  onJumpToGwalior: () => void;
}

/**
 * Compact in-map floating context card.
 * Appears after the camera flies to a non-cadastral click location.
 * Shows real Nominatim + Open-Meteo + Bhuvan LULC context.
 * Does NOT generate a synthetic parcel.
 */
export const AreaContextOverlay: React.FC<AreaContextOverlayProps> = ({
  data,
  isLoading,
  onClose,
  onJumpToGwalior,
}) => {
  if (!isLoading && !data) return null;

  const env = data?.environmental;
  const admin = data?.admin;
  const [lng, lat] = data?.coordinates ?? [0, 0];

  const locationLabel = admin?.display_name
    ? admin.display_name.split(',').slice(0, 2).join(', ')
    : lat !== 0
    ? `${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`
    : 'Inspecting location…';

  return (
    <div className="absolute bottom-14 left-4 z-30 w-[340px] pointer-events-auto animate-in slide-in-from-bottom-2 duration-200">
      {/* Card */}
      <div className="bg-slate-900/96 backdrop-blur-xl border border-slate-700/80 rounded-xl shadow-2xl shadow-black/60 overflow-hidden">

        {/* Header row */}
        <div className="flex items-start justify-between px-3.5 pt-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 shrink-0">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-100 truncate">{locationLabel}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[9px] font-mono text-slate-500">
                  {lat !== 0 ? `${lat.toFixed(4)}°N ${lng.toFixed(4)}°E` : 'Loading…'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors shrink-0 cursor-pointer ml-2"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* No-cadastral-data notice */}
        <div className="mx-3.5 mt-2.5 px-2.5 py-2 bg-amber-950/40 border border-amber-600/30 rounded-lg flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-bold text-amber-300 leading-tight">
              Parcel-level cadastral data not connected
            </p>
            <p className="text-[9px] text-amber-300/70 mt-0.5 leading-tight">
              Cadastral coverage: Gwalior, MP (prototype area only)
            </p>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="px-3.5 py-4 flex items-center gap-2 text-slate-400 text-xs">
            <svg className="w-3.5 h-3.5 animate-spin text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Fetching location context from Nominatim + Open-Meteo…</span>
          </div>
        )}

        {/* Data content */}
        {!isLoading && data && (
          <div className="px-3.5 py-2.5 space-y-2.5">

            {/* Admin hierarchy */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  🟢 Administrative Context
                </span>
                <span className="text-[8px] text-slate-500 font-mono">Nominatim / OSM</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                {admin?.state && (
                  <div className="px-2 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <span className="text-slate-500 block text-[9px]">State</span>
                    <span className="text-slate-200 font-medium">{admin.state}</span>
                  </div>
                )}
                {admin?.district && admin.district !== 'Not available from geocoding source' && (
                  <div className="px-2 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <span className="text-slate-500 block text-[9px]">District</span>
                    <span className="text-slate-200 font-medium">{admin.district}</span>
                  </div>
                )}
                {admin?.tehsil && admin.tehsil !== 'Not available from geocoding source' && (
                  <div className="px-2 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <span className="text-slate-500 block text-[9px]">Tehsil / Block</span>
                    <span className="text-slate-200 font-medium">{admin.tehsil}</span>
                  </div>
                )}
                {admin?.postcode && admin.postcode !== 'Not available from geocoding source' && (
                  <div className="px-2 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <span className="text-slate-500 block text-[9px]">Pincode</span>
                    <span className="font-mono text-slate-200">{admin.postcode}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Environmental telemetry */}
            {env && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Thermometer className="w-3 h-3 text-orange-400 shrink-0" />
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                    🟠 Current Model-Derived Environmental Data
                  </span>
                  <span className="text-[8px] text-slate-500 font-mono">Open-Meteo</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  <div className="flex flex-col items-center px-1.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-center">
                    <Thermometer className="w-3 h-3 text-orange-300 mb-0.5" />
                    <span className="text-[11px] font-bold text-orange-300">{env.temperature?.toFixed(1)}°</span>
                    <span className="text-[8px] text-slate-500">Temp °C</span>
                  </div>
                  <div className="flex flex-col items-center px-1.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-center">
                    <Droplets className="w-3 h-3 text-sky-400 mb-0.5" />
                    <span className="text-[11px] font-bold text-sky-300">{env.humidity}%</span>
                    <span className="text-[8px] text-slate-500">Humidity</span>
                  </div>
                  <div className="flex flex-col items-center px-1.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-center">
                    <Wind className="w-3 h-3 text-slate-400 mb-0.5" />
                    <span className="text-[11px] font-bold text-slate-300">{env.surface_pressure?.toFixed(0)}</span>
                    <span className="text-[8px] text-slate-500">hPa</span>
                  </div>
                  <div className="flex flex-col items-center px-1.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-center">
                    <Droplets className="w-3 h-3 text-emerald-400 mb-0.5" />
                    <span className="text-[10px] font-bold text-emerald-300">{env.soil_temperature?.toFixed(1)}°</span>
                    <span className="text-[8px] text-slate-500">Soil T°</span>
                  </div>
                </div>
                {env.soil_moisture && (
                  <div className="mt-1 px-2 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                    <span className="text-[9px] text-slate-500">Volumetric Soil Moisture</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">{env.soil_moisture}</span>
                  </div>
                )}
                <p className="text-[8px] text-slate-600 mt-1 italic leading-tight">
                  Model-derived data from Open-Meteo. Not direct in-situ parcel sensor readings.
                </p>
              </div>
            )}

            {/* Bhuvan LULC context */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Layers className="w-3 h-3 text-teal-400 shrink-0" />
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                  🟢 Bhuvan LULC Context
                </span>
                <span className="text-[8px] text-slate-500 font-mono">ISRO-NRSC</span>
              </div>
              <div className="px-2 py-2 rounded-lg bg-teal-950/30 border border-teal-700/30 text-[10px] text-teal-200/80 leading-relaxed">
                {data.lulc_context || 'Thematic LULC classification available via Bhuvan WMS layer. Toggle the Bhuvan LULC layer (left panel) to view satellite-derived land cover classification at this location.'}
              </div>
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="px-3.5 pb-3 pt-1 flex items-center justify-between border-t border-slate-800 mt-1">
          <button
            onClick={onJumpToGwalior}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-600/40 rounded-lg text-[10px] font-semibold text-emerald-300 transition-colors cursor-pointer"
          >
            <ArrowRight className="w-3 h-3" />
            Jump to Gwalior (Cadastral Area)
          </button>
          <span className="text-[8px] text-slate-600 font-mono">
            {lat !== 0 ? `${lat.toFixed(3)}°N` : ''}
          </span>
        </div>
      </div>
    </div>
  );
};
