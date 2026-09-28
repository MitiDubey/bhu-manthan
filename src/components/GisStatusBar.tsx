import React from 'react';
import type { MapTelemetry } from '../types/parcel';
import { formatCoordinates } from '../utils/mapUtils';

interface GisStatusBarProps {
  telemetry: MapTelemetry;
  selectedParcelId: string | null;
}

export const GisStatusBar: React.FC<GisStatusBarProps> = ({
  telemetry,
  selectedParcelId,
}) => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex items-center justify-between px-3 py-1.5 bg-slate-950/85 backdrop-blur-md border-t border-slate-800 text-[11px] text-slate-300 font-mono select-none">
      {/* Coordinates & Elevation */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">POS:</span>
          <span className="text-slate-100 font-medium">
            {formatCoordinates(telemetry.lng, telemetry.lat)}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-slate-400">ELEV:</span>
          <span className="text-emerald-400 font-medium">{Math.round(telemetry.elevation)} m</span>
          <span className="text-slate-400 text-[9px]">AMSL</span>
        </div>
      </div>

      {/* Camera Parameters */}
      <div className="hidden md:flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-1">
          <span className="text-slate-400">ZOOM:</span>
          <span className="text-sky-300 font-medium">{telemetry.zoom.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-slate-400">PITCH:</span>
          <span className="text-slate-200 font-medium">{Math.round(telemetry.pitch)}°</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-slate-400">HDG:</span>
          <span className="text-slate-200 font-medium">{Math.round((telemetry.bearing + 360) % 360)}°</span>
        </div>

        {selectedParcelId && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <span>ACTIVE:</span>
            <span className="font-bold">{selectedParcelId}</span>
          </div>
        )}
      </div>

      {/* Attribution & Notice */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-slate-400 hidden lg:inline">
          Datum: WGS84 • Sensor: Sentinel-2 MSI (10m VNIR)
        </span>
        <span className="text-[10px] text-amber-400/90 font-sans font-medium">
          Prototype Demo Only
        </span>
      </div>
    </footer>
  );
};
