import React from 'react';
import { ArrowRight, X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { ParcelProperties } from '../types/parcel';
import { LAND_USE_COLORS } from '../utils/mapUtils';

interface ParcelPopupProps {
  parcel: ParcelProperties;
  onOpenDigitalTwin: (parcelId: string) => void;
  onClose: () => void;
  position?: { x: number; y: number } | null;
}

export const ParcelPopup: React.FC<ParcelPopupProps> = ({
  parcel,
  onOpenDigitalTwin,
  onClose,
  position,
}) => {
  const landColor = LAND_USE_COLORS[parcel.land_use] || '#64748b';
  const hasChange = parcel.priority !== 'NONE';

  return (
    <div
      className="absolute z-30 w-72 sm:w-80 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95 pointer-events-auto"
      style={
        position
          ? {
              left: `${Math.min(Math.max(16, position.x - 140), window.innerWidth - 330)}px`,
              top: `${Math.min(Math.max(80, position.y - 200), window.innerHeight - 280)}px`,
            }
          : { bottom: '56px', left: '50%', transform: 'translateX(-50%)' }
      }
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/90 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full ring-2 ring-slate-700" style={{ backgroundColor: landColor }} />
          <span className="text-sm font-bold text-white tracking-wide font-mono">
            {parcel.parcel_id}
          </span>
          <span className="text-[10px] text-slate-300 font-mono px-1.5 py-0.5 bg-slate-700/60 rounded">
            Khasra {parcel.khasra_no}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-700/60 transition-colors"
          title="Close Card"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 space-y-3 text-xs">
        {/* Land Use & Area */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-slate-800/60 border border-slate-700/40">
            <span className="text-[10px] text-slate-400 block mb-0.5">Classification</span>
            <span
              className="px-1.5 py-0.5 rounded text-[11px] font-semibold inline-block"
              style={{ backgroundColor: `${landColor}25`, color: landColor }}
            >
              {parcel.land_use}
            </span>
          </div>

          <div className="p-2 rounded bg-slate-800/60 border border-slate-700/40">
            <span className="text-[10px] text-slate-400 block mb-0.5">Cadastral Area</span>
            <span className="font-bold text-slate-100">{parcel.area}</span>
            {parcel.area_bigha && (
              <span className="text-[10px] text-slate-400 block">{parcel.area_bigha}</span>
            )}
          </div>
        </div>

        {/* Location & Title */}
        <div className="flex items-center justify-between text-[11px] px-1">
          <span className="text-slate-400">Jurisdiction:</span>
          <span className="text-slate-200 font-medium">
            {parcel.village}, Tehsil {parcel.tehsil}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] px-1">
          <span className="text-slate-400">Title Status:</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {parcel.title_status}
          </span>
        </div>

        {/* Change alert pill if detected */}
        {hasChange ? (
          <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/50 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-rose-300 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                Change Signal Detected
              </span>
              <span className="font-bold text-rose-400 font-mono text-[10px] bg-rose-900/50 px-1.5 py-0.5 rounded">
                {parcel.confidence} Conf.
              </span>
            </div>
            <p className="text-[10px] text-slate-200">
              {parcel.change_type} ({parcel.change_percentage} area)
            </p>
          </div>
        ) : (
          <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-1.5 text-[11px] text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Compliant with Cadastral Master Plan</span>
          </div>
        )}

        {/* Action Button: Open Digital Twin Dossier */}
        <button
          onClick={() => onOpenDigitalTwin(parcel.parcel_id)}
          className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-lg transition-all duration-150 shadow-lg shadow-emerald-950/50 group cursor-pointer"
        >
          <span>Open Full Digital Twin Dossier</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
