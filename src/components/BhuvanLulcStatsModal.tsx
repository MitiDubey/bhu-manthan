import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  ShieldAlert, 
  Info
} from 'lucide-react';
import { BHUVAN_LULC_STATS } from '../data/bhuvanStats';
import type { BhuvanLulcPeriod } from '../types/parcel';

interface BhuvanLulcStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedParcelId: string | null;
  currentPeriod: BhuvanLulcPeriod;
  onSelectPeriod: (period: BhuvanLulcPeriod) => void;
}

type AoiTab = 'Parcel' | 'Village' | 'Tehsil' | 'District' | 'Custom';

export const BhuvanLulcStatsModal: React.FC<BhuvanLulcStatsModalProps> = ({
  isOpen,
  onClose,
  selectedParcelId,
  currentPeriod,
  onSelectPeriod,
}) => {
  const [aoiLevel, setAoiLevel] = useState<AoiTab>('Parcel');

  if (!isOpen) return null;

  // Resolve data based on AOI Level
  let recordKey = selectedParcelId || 'GW-012';
  if (aoiLevel === 'Village') recordKey = 'Village';
  if (aoiLevel === 'Tehsil') recordKey = 'Tehsil';
  if (aoiLevel === 'District') recordKey = 'District';
  if (aoiLevel === 'Custom') recordKey = 'Village'; // representative for custom AOI

  const stats = BHUVAN_LULC_STATS[recordKey]?.[currentPeriod] || BHUVAN_LULC_STATS['GW-012'][currentPeriod];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center font-bold text-xs font-mono">
              ISRO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  Bhuvan LULC Analytics & Statistics
                </h3>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded">
                  ISRO-NRSC
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Land Use Land Cover Thematic Synthesis • Gwalior Prototype
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

        {/* Legal & Governance Notice Banner */}
        <div className="px-4 py-2 bg-amber-950/40 border-b border-amber-600/30 flex items-center gap-2 text-[11px] text-amber-300">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong>Observational Earth Science Data:</strong> Bhuvan LULC is an observation layer, not a legal title record. Records require authorized Revenue review.
          </span>
        </div>

        {/* AOI Level Selector Tabs */}
        <div className="flex items-center px-4 py-2 bg-slate-950/50 border-b border-slate-800 gap-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] text-slate-400 font-medium mr-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> AOI Level:
          </span>
          {(['Parcel', 'Village', 'Tehsil', 'District', 'Custom'] as AoiTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setAoiLevel(tab)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                aoiLevel === tab
                  ? 'bg-sky-500/25 text-sky-300 border border-sky-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab === 'Parcel' ? `Selected Parcel (${selectedParcelId || 'GW-012'})` : tab}
            </button>
          ))}
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300 font-medium">Bhuvan LULC Cycle:</span>
          </div>

          <div className="flex items-center gap-1">
            {(['2005-06', '2011-12', '2015-16'] as BhuvanLulcPeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => onSelectPeriod(period)}
                className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                  currentPeriod === period
                    ? 'bg-orange-500/30 text-orange-300 border border-orange-500/50 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Summary Metric Strip */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Scope Name</span>
              <span className="font-semibold text-slate-100 text-xs truncate block mt-0.5">
                {stats.aoi_name}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Extent</span>
              <span className="font-bold text-slate-100 text-sm block mt-0.5">
                {stats.total_area_ha.toLocaleString()} ha
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Dataset Source</span>
              <span className="font-mono text-orange-300 text-[10px] block mt-0.5 truncate">
                {stats.source}
              </span>
            </div>
          </div>

          {/* LULC Breakdown Table */}
          <div className="border border-slate-800 rounded-lg overflow-hidden">
            <div className="px-3.5 py-2 bg-slate-950/70 border-b border-slate-800 flex justify-between text-[11px] font-semibold text-slate-300">
              <span>Land-use / Land-cover Class</span>
              <div className="flex gap-8">
                <span className="w-16 text-right">Area</span>
                <span className="w-12 text-right">Share</span>
              </div>
            </div>

            <div className="divide-y divide-slate-800/60 bg-slate-900/40">
              {stats.classes.map((cls) => (
                <div key={cls.className} className="px-3.5 py-2.5 flex items-center justify-between text-xs hover:bg-slate-800/30">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-sm border border-slate-600 shrink-0" style={{ backgroundColor: cls.color }} />
                    <span className="font-medium text-slate-200">{cls.className}</span>
                  </div>

                  <div className="flex items-center gap-8">
                    <span className="font-mono text-slate-300 w-16 text-right">
                      {cls.area_ha.toLocaleString()} ha
                    </span>
                    <div className="flex items-center gap-2 w-20 justify-end">
                      <span className="font-mono font-bold text-slate-100 w-10 text-right">
                        {cls.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graphical Proportional Distribution Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
              <span>Proportional Distribution</span>
              <span>Total: 100%</span>
            </div>
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-800">
              {stats.classes.map((cls) => (
                <div
                  key={cls.className}
                  style={{ width: `${cls.percentage}%`, backgroundColor: cls.color }}
                  title={`${cls.className}: ${cls.percentage}%`}
                />
              ))}
            </div>
          </div>

          {/* 4-Tier Conceptual Architecture Explanation */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-2 text-[11px] text-slate-300">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              Bhu-Manthan 4-Tier Geospatial Data Integrity Model:
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-slate-100 block">1. Satellite Basemap</span>
                Physical ground reality observation (Raw Sensor)
              </div>
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-orange-300 block">2. Bhuvan LULC</span>
                ISRO-NRSC thematic scientific classification
              </div>
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-amber-300 block">3. Cadastral Parcel</span>
                Legal/spatial boundary (ULPIN / Bhu-Aadhaar)
              </div>
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-emerald-300 block">4. Land Record (Bhulekh)</span>
                Authorized statutory Record of Rights (RoR)
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-[10px] text-slate-400">
            Official Source: <strong>Bhuvan / ISRO-NRSC</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
