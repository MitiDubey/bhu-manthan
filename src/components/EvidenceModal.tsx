import React from 'react';
import { 
  X, 
  Satellite, 
  AlertTriangle, 
  Layers, 
  ShieldCheck,
  TrendingDown,
  Info
} from 'lucide-react';
import type { ParcelProperties } from '../types/parcel';

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcel: ParcelProperties | null;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  isOpen,
  onClose,
  parcel,
}) => {
  if (!isOpen || !parcel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                  Remote Sensing Change Detection Evidence
                </h3>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                  {parcel.parcel_id}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  ULPIN: {parcel.ulpin || 'Not available in prototype'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-temporal satellite audit • Khasra {parcel.khasra_no}, {parcel.village}, Tehsil {parcel.tehsil}, {parcel.district}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs">
          {/* Top Alert Banner */}
          <div className="p-3.5 bg-amber-950/30 border border-amber-500/40 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-200 uppercase text-xs tracking-wider">
                  Potential Change Signal ({parcel.confidence || '93% (Prototype / Illustrative)'} Confidence)
                </span>
                <span className="px-2 py-0.5 bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] rounded font-bold uppercase">
                  {parcel.priority} Priority
                </span>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[10px] rounded font-medium">
                  {parcel.verification_status || 'Pending Verification'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Spectral and geometric transition detected: <strong className="text-white">{parcel.previous_state || 'Agriculture'}</strong> to{' '}
                <strong className="text-amber-300">{parcel.detected_state || 'Built-up / Plinth'}</strong>. Magnitude of change:{' '}
                <strong className="text-white">{parcel.change_percentage || '25%'} of total parcel area</strong>.
              </p>
            </div>
          </div>

          {/* Visual Evidence Grid (Pre vs Post vs Radiometric Mask) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" /> Multi-Temporal Satellite Pair & Spectral Change Mask
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">Sensors: Sentinel-2 MSI (10m VNIR BOA)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pre-Change Baseline */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-400">Baseline (2022)</span>
                  <span className="text-slate-400 font-mono">NDVI: 0.76</span>
                </div>
                <div className="relative h-44 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-950/60 via-green-900/40 to-slate-950 border border-emerald-500/30 flex items-center justify-center text-center p-3">
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                  <div className="relative z-10 space-y-1">
                    <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      T0
                    </div>
                    <span className="block font-semibold text-white text-xs">Full Canopy Cover</span>
                    <span className="block text-[10px] text-emerald-300">Continuous Cropland</span>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-emerald-500/20 text-[9px] text-emerald-300 rounded font-mono">
                      Sentinel-2 MSI • 14 Oct 2022
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  High near-infrared reflectance (Band 8, 10m). Uniform photosynthetic activity across parcel boundary.
                </p>
              </div>

              {/* Current Satellite Pass */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-400">Current Pass (2026)</span>
                  <span className="text-slate-400 font-mono">NDVI: 0.38</span>
                </div>
                <div className="relative h-44 rounded-lg overflow-hidden bg-gradient-to-br from-amber-950/60 via-stone-900/40 to-slate-950 border border-amber-500/30 flex items-center justify-center text-center p-3">
                  <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                  <div className="relative z-10 space-y-1">
                    <div className="w-8 h-8 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      T1
                    </div>
                    <span className="block font-semibold text-white text-xs">Structural Footing</span>
                    <span className="block text-[10px] text-amber-300">Vegetation Stripped</span>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-amber-500/20 text-[9px] text-amber-300 rounded font-mono">
                      Acquired: {parcel.observation_date || '20 Aug 2026'}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Sharp spectral shift in SWIR Bands (11/12) consistent with soil clearance and structural footprint.
                </p>
              </div>

              {/* Radiometric Change Mask */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-red-400">Radiometric Mask (Δ)</span>
                  <span className="text-red-300 font-mono font-bold">Conf: {parcel.confidence || '93%'}</span>
                </div>
                <div className="relative h-44 rounded-lg overflow-hidden bg-gradient-to-br from-red-950/70 via-red-900/30 to-slate-950 border border-red-500/40 flex items-center justify-center text-center p-3">
                  <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                  <div className="relative z-10 space-y-1">
                    <div className="w-8 h-8 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs animate-pulse">
                      Δ
                    </div>
                    <span className="block font-semibold text-white text-xs">Potential Change Isolated</span>
                    <span className="block text-[10px] text-red-300">Affected: {parcel.change_percentage || '25%'} of parcel</span>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-red-500/20 text-[9px] text-red-300 rounded font-mono">
                      Spectral Threshold: &gt;0.85
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Spatial clustering corresponds to non-agricultural plinth footprint; flagged for field revenue officer check.
                </p>
              </div>
            </div>
          </div>

          {/* Sensor Telemetry & Spectral Indices Table */}
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sensor Verification & Spectral Telemetry
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Multispectral Sensor</span>
                <span className="font-semibold text-white font-mono">Sentinel-2 MSI (10m VNIR)</span>
              </div>
              <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Constellation Cadence</span>
                <span className="font-semibold text-sky-300 font-mono">5-Day Revisit Cycle</span>
              </div>
              <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Cloud Cover</span>
                <span className="font-semibold text-emerald-300 font-mono">0.0% (Clear Sky)</span>
              </div>
              <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Solar Elevation</span>
                <span className="font-semibold text-white font-mono">62.4° North</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span>NDVI Degradation Index:</span>
                <span className="text-emerald-400 font-mono">0.76 (Baseline)</span>
                <span className="text-slate-500">→</span>
                <span className="text-red-400 font-mono font-bold">0.38 (Current)</span>
                <span className="text-red-400 font-semibold font-mono text-[10px]">(-49.8% Drop)</span>
              </div>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px] font-semibold uppercase">
                Status: {parcel.verification_status || 'Pending Verification'}
              </span>
            </div>
          </div>

          {/* Mandatory Imagery Resolution Caveat & Legal Workflow Note */}
          <div className="p-3.5 bg-blue-950/30 border border-blue-500/30 rounded-xl flex items-start gap-3 text-blue-300/90 text-[11px] leading-relaxed">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sky-200">
                Detection granularity depends on imagery resolution and data quality. Small parcel-level changes may require higher-resolution imagery and/or field verification.
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Official Revenue Workflow: Remote sensing observations do not auto-mutate revenue records. Suspected transitions follow standard protocol: Remote Sensing → Change Detection → Confidence/Priority Score → Verification Queue → Authorized Review → Approved/Rejected → New Record Version → Digital Twin Refresh.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Observation Audit: {parcel.parcel_id} • Khasra {parcel.khasra_no}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Ground Verification Notice dispatched for Parcel ${parcel.parcel_id} (Khasra ${parcel.khasra_no}) to Tehsil ${parcel.tehsil} revenue office.`);
                onClose();
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-amber-950/40 transition-colors cursor-pointer"
            >
              Dispatch Ground Inspection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
