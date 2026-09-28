import React from 'react';
import { X, ShieldAlert, AlertOctagon } from 'lucide-react';

interface DataDistinctionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataDistinctionModal: React.FC<DataDistinctionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Geospatial Data Hierarchy & Legal Integrity Protocol
              </h3>
              <p className="text-[11px] text-slate-400">
                Statutory Distinction: Satellite Observations vs. Legal Land Records
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          {/* Top Alert */}
          <div className="p-3 bg-red-950/30 border border-red-500/40 rounded-lg flex items-start gap-2.5 text-red-300">
            <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-[11px] space-y-1">
              <strong className="block text-red-200 uppercase font-semibold">Strict Governance Guardrail:</strong>
              Do NOT treat Bhuvan LULC or satellite imagery as the legal land record. Satellite observations do NOT automatically mutate or modify official Land Revenue Records without authorized on-ground Patwari / Tehsildar verification.
            </div>
          </div>

          {/* 5-Tier Data Model */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
              The 5-Tier Bhu-Manthan Data Architecture:
            </h4>

            <div className="space-y-2">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start gap-3">
                <div className="w-7 h-7 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Satellite Basemap</span>
                    <span className="text-[10px] text-sky-400 font-mono bg-sky-950/40 px-1.5 py-0.2 rounded">Observation</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Physical ground reality as captured by spaceborne optical sensors (Sentinel-2 MSI). Represents surface reflectance.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start gap-3">
                <div className="w-7 h-7 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Bhuvan LULC</span>
                    <span className="text-[10px] text-orange-400 font-mono bg-orange-950/40 px-1.5 py-0.2 rounded">Thematic Information</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Scientific land-use/land-cover classifications provided by ISRO-NRSC across 5-year cycles (2005–06, 2011–12, 2015–16, 2021–22).
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start gap-3">
                <div className="w-7 h-7 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Cadastral Parcel Boundaries</span>
                    <span className="text-[10px] text-amber-400 font-mono bg-amber-950/40 px-1.5 py-0.2 rounded">Spatial Boundary (ULPIN)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Legal spatial polygons tagged with 14-digit Unique Land Parcel Identification Number (Bhu-Aadhaar). Defines jurisdictional extent.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start gap-3">
                <div className="w-7 h-7 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">4</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Authorized Land Record</span>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/40 px-1.5 py-0.2 rounded">Statutory Legal Title</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Official Record of Rights (Bhulekh MP / RoR, Khasra, Khatoni) maintained under MP Land Revenue Code. Sole legal proof of ownership.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start gap-3">
                <div className="w-7 h-7 rounded bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 font-bold">5</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Bhu-Manthan Digital Twin</span>
                    <span className="text-[10px] text-teal-400 font-mono bg-teal-950/40 px-1.5 py-0.2 rounded">Integrated Synthesis</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    The integrated 3D spatial twin reconciling observation with cadastral records. Discrepancies generate <em>"Verification Signals"</em> for administrative inspection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-medium text-xs transition-colors cursor-pointer"
          >
            I Acknowledge & Understand
          </button>
        </div>
      </div>
    </div>
  );
};
