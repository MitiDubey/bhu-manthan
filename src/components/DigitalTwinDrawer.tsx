import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Activity, 
  AlertTriangle, 
  Download, 
  Maximize2, 
  Satellite, 
  Compass, 
  Layers, 
  Clock, 
  Droplets, 
  BookOpen, 
  Sparkles, 
  Building2,
  FileCheck,
  Eye,
  Sliders,
  Play,
  Info
} from 'lucide-react';
import type { 
  ParcelProperties, 
  TimelineYear, 
  PolicySimulationParams, 
  PolicySimulationResults 
} from '../types/parcel';
import { LAND_USE_COLORS } from '../utils/mapUtils';
import { parcelsMetadata } from '../data/parcelsMetadata';

interface DigitalTwinDrawerProps {
  parcelId: string | null;
  parcelProps: ParcelProperties | null;
  onClose: () => void;
  onFocusParcel?: () => void;
  onOpenEvidence?: () => void;
  timelineYear: TimelineYear;
  onTimelineYearChange: (year: TimelineYear) => void;
  onRunSimulation?: (params: PolicySimulationParams) => void;
  isPolicySimulated?: boolean;
}

type MainTabType = 'core' | 'modules';
type ModuleTabType = 'all' | 'land' | 'location_soil' | 'satellite_infra' | 'history_policy';

export const DigitalTwinDrawer: React.FC<DigitalTwinDrawerProps> = ({
  parcelId,
  parcelProps,
  onClose,
  onFocusParcel,
  onOpenEvidence,
  timelineYear,
  onTimelineYearChange,
  onRunSimulation,
  isPolicySimulated = false,
}) => {
  const [mainTab, setMainTab] = useState<MainTabType>('core');
  const [moduleTab, setModuleTab] = useState<ModuleTabType>('all');

  const [simParams, setSimParams] = useState<PolicySimulationParams>({
    landProtectionLevel: 'Strict',
    urbanExpansionControl: 'Buffer Enforced',
    compensationEfficiency: '90-Day Accelerated',
  });

  if (!parcelId || !parcelProps) return null;

  // Find extended 12-attribute dossier from parcelsMetadata
  const dossier = parcelsMetadata.parcels.find((p) => p.parcel_id === parcelId);

  const landColor = LAND_USE_COLORS[parcelProps.land_use] || '#64748b';
  const hasChange = parcelProps.priority !== 'NONE';

  // Active observation state based on the historical timeline slider
  const activeTimelineState = parcelProps.timeline_states?.[timelineYear] || {
    year: timelineYear,
    land_use: parcelProps.land_use,
    ndvi: timelineYear === 2022 ? 0.76 : timelineYear === 2024 ? 0.68 : 0.61,
    built_up_pct: timelineYear === 2022 ? 0 : timelineYear === 2024 ? 4 : 12,
    change_status: timelineYear === 2022 ? 'Clean Baseline' : timelineYear === 2024 ? 'Transition Signal' : 'Potential Change Detected',
    observation_date: timelineYear === 2022 ? '14 Oct 2022' : timelineYear === 2024 ? '12 Nov 2024' : (parcelProps.observation_date || '20 Aug 2026'),
  };

  // Policy simulation calculation
  const calculateSimResults = (params: PolicySimulationParams): PolicySimulationResults => {
    let agLoss = 5.9;
    let disputes = 241;
    let comp = 890;

    if (params.landProtectionLevel === 'Standard') {
      agLoss += 1.2;
      disputes += 44;
    } else if (params.landProtectionLevel === 'Relaxed') {
      agLoss += 3.9;
      disputes += 119;
    }

    if (params.urbanExpansionControl === 'Standard Zoning') {
      agLoss += 0.8;
      disputes += 20;
    } else if (params.urbanExpansionControl === 'High Growth') {
      agLoss += 2.1;
      disputes += 50;
    }

    if (params.compensationEfficiency === 'Standard SLA') {
      comp += 160;
    } else if (params.compensationEfficiency === 'Delayed') {
      comp += 520;
    }

    return {
      agriculturalLossPct: Number(agLoss.toFixed(1)),
      disputedParcelsCount: disputes,
      pendingCompensationCount: comp,
    };
  };

  const simResults = calculateSimResults(simParams);

  const handleDownloadFullDossier = () => {
    const exportData = {
      parcel_id: parcelProps.parcel_id,
      ulpin: parcelProps.ulpin || 'Not available in prototype',
      generated_at: new Date().toISOString(),
      platform: "Bhu-Manthan National Digital Twin",
      status: "?? Prototype / Synthetic Placeholder",
      active_timeline_year: timelineYear,
      active_timeline_state: activeTimelineState,
      simulation_results: simResults,
      dossier_record: dossier || parcelProps,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${parcelProps.parcel_id}_DigitalTwin_Dossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <aside className="absolute top-0 right-0 bottom-0 z-40 w-full sm:w-[480px] md:w-[540px] lg:w-[580px] bg-slate-900/95 backdrop-blur-2xl border-l border-slate-700/80 shadow-2xl flex flex-col transition-transform duration-300 animate-in slide-in-from-right text-slate-200 pointer-events-auto">
      {/* 1. Header Bar */}
      <div className="p-4 border-b border-slate-700/60 bg-slate-950/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold font-mono text-white tracking-wide">
                {parcelProps.parcel_id}
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700 rounded">
                Khasra {parcelProps.khasra_no}
              </span>
              {hasChange && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded">
                  POTENTIAL CHANGE
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-slate-400 font-mono">
                ULPIN: {parcelProps.ulpin ?? 'Not available from connected source'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] text-slate-400">
                {parcelProps.village}, Tehsil {parcelProps.tehsil}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onFocusParcel && (
            <button
              onClick={onFocusParcel}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Focus in 3D Map"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Synthetic Disclaimer Banner */}
      <div className="px-4 py-2 bg-amber-950/40 border-b border-amber-600/30 flex items-center justify-between text-[11px] text-amber-300 shrink-0">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Prototype / Synthetic Land Governance Telemetry</span>
        </div>
        <span className="font-mono text-[10px] text-amber-400/80">WGS84 • Gwalior MP</span>
      </div>

      {/* Main Navigation Mode Switcher */}
      <div className="flex items-center px-4 py-2 border-b border-slate-800 bg-slate-950/60 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMainTab('core')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mainTab === 'core'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Digital Twin Core (A–H)
          </button>
          <button
            onClick={() => setMainTab('modules')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mainTab === 'modules'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            12-Module Dossier
          </button>
        </div>
        <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
          {mainTab === 'core' ? 'Spatial/Temporal Synthesis' : 'Extended Attributes'}
        </span>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        
        {/* ======================================================== */}
        {/* VIEW 1: DIGITAL TWIN CORE (SECTIONS A THROUGH H) */}
        {/* ======================================================== */}
        {mainTab === 'core' && (
          <div className="space-y-4">
            {/* SECTION A: IDENTITY & LOCATION */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-sky-400" /> Section A: Identity & Location
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded uppercase tracking-wider">
                  ?? Prototype / Synthetic Placeholder
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Internal Prototype Parcel ID</span>
                  <span className="font-mono font-bold text-white text-sm">{parcelProps.parcel_id}</span>
                  <span className="text-[9px] text-amber-400/80 block mt-0.5">Prototype reference only</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800 col-span-2">
                  <span className="text-[10px] text-slate-400 block">ULPIN (Bhu-Aadhaar 14-Digit)</span>
                  <span className={`font-mono font-semibold text-xs ${parcelProps.ulpin ? 'text-emerald-400' : 'text-slate-500 italic'}`}>
                    {parcelProps.ulpin ?? 'Not available from connected source'}
                  </span>
                  {!parcelProps.ulpin && (
                    <span className="text-[9px] text-slate-500 block mt-0.5">Will be populated from official ULPIN registry upon cadastral import</span>
                  )}
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Khasra Number</span>
                  <span className="font-mono font-semibold text-slate-200">{parcelProps.khasra_no}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Village / Mauza</span>
                  <span className="font-medium text-slate-200">{parcelProps.village}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Tehsil & District</span>
                  <span className="font-medium text-slate-200">{parcelProps.tehsil}, {parcelProps.district}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Area</span>
                  <span className="font-bold text-white">{parcelProps.area}</span>
                  <span className="text-[10px] text-slate-400 block">{parcelProps.area_bigha || '11.2 Bigha'}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800 col-span-2">
                  <span className="text-[10px] text-slate-400 block">Geographic Centroid (WGS84)</span>
                  <span className="font-mono text-slate-300 text-[11px]">
                    {parcelProps.centroid ? `${parcelProps.centroid[1].toFixed(5)}°N, ${parcelProps.centroid[0].toFixed(5)}°E` : '26.2250°N, 78.1920°E'}
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION B: SPATIAL STATE */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400" /> Section B: Spatial State
                </span>
                <span className="text-[10px] font-mono text-slate-400">Topology: Closed Polygon</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Observed Land Use</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full ring-2 ring-slate-700" style={{ backgroundColor: landColor }} />
                    <span className="font-bold text-white text-xs">{activeTimelineState.land_use || parcelProps.land_use}</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Cadastral Boundary Edge</span>
                  <span className="font-medium text-emerald-400 block mt-1">4 Vertices • Fully Enclosed</span>
                </div>
              </div>

              {/* Nearby Spatial Context */}
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  Nearby Spatial & Geographic Context
                </span>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div className="p-1.5 rounded bg-slate-950/70 border border-slate-800/80">
                    <span className="text-slate-400 block">Highway NH-44</span>
                    <span className="font-mono font-bold text-amber-300">1.8 km East</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950/70 border border-slate-800/80">
                    <span className="text-slate-400 block">Morar River Canal</span>
                    <span className="font-mono font-bold text-sky-300">0.9 km South</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950/70 border border-slate-800/80">
                    <span className="text-slate-400 block">Village Abadi</span>
                    <span className="font-mono font-bold text-indigo-300">0.4 km West</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION C: AUTHORIZED LAND RECORD */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> Section C: Land Record
                </span>
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    🟢 Real Source Data
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {parcelProps.land_record_status || 'VERIFIED'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Recorded Land Use</span>
                  <span className="font-bold text-slate-100">{parcelProps.land_use}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Compensation Status</span>
                  <span className="font-semibold text-amber-300">{parcelProps.compensation_status || 'Pending'}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Dispute Status</span>
                  <span className="font-semibold text-slate-200">{parcelProps.dispute_status || 'None'}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800 col-span-2">
                  <span className="text-[10px] text-slate-400 block">Statutory Source</span>
                  <span className="font-medium text-slate-200">MP Bhulekh / Record of Rights (RoR)</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Last Verified Date</span>
                  <span className="font-mono text-slate-300">{parcelProps.last_updated_record || '20 Aug 2026'}</span>
                </div>
              </div>

              {/* Legal Warning Notice */}
              <div className="p-2.5 bg-amber-950/20 border border-amber-500/30 rounded-lg flex items-start gap-2 text-amber-300/90 text-[10px]">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Statutory Notice:</strong> Satellite imagery is an observational data layer and is NOT a legal land record. Legal ownership and boundaries are governed strictly by the state revenue department (MP Bhulekh).
                </span>
              </div>
            </div>

            {/* SECTION C2: BHUVAN LULC — Separate Card (distinct from Land Record) */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-teal-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-400" /> Bhuvan LULC (ISRO-NRSC)
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  🟢 Real Source Data
                </span>
              </div>

              <div className="p-2.5 bg-teal-950/20 border border-teal-700/30 rounded-lg text-[10px] text-teal-200/80">
                <strong className="text-teal-300">Important distinction:</strong> Bhuvan LULC is a satellite-derived thematic classification layer from ISRO-NRSC. It represents observed land cover, NOT the legal land use category from the revenue record. LULC and authorized land records may differ — divergence is itself a change detection signal.
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">LULC Classification</span>
                  <span className="font-bold text-teal-300">{parcelProps.land_use}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Assessment Cycle</span>
                  <span className="font-mono text-slate-200">2015–16 (Latest Available)</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800 col-span-2">
                  <span className="text-[10px] text-slate-400 block">Data Source</span>
                  <span className="font-medium text-slate-200">ISRO-NRSC Bhuvan LULC WMS/WMTS — bhuvan.nrsc.gov.in</span>
                </div>
              </div>
            </div>

            {/* SECTION D: EARTH OBSERVATION TELEMETRY */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Satellite className="w-3.5 h-3.5 text-teal-400" /> Section D: Earth Observation
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                  🟡 Derived Earth-Observation Data
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400">
                Sensor: <span className="text-teal-300 font-mono">Sentinel-2 MSI (10m VNIR)</span> — NDVI derived from Red (B4) / NIR (B8) bands. Not a direct in-situ measurement.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Observation Pass</span>
                  <span className="font-mono font-semibold text-slate-200 text-[10px]">{activeTimelineState.observation_date}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">NDVI (Canopy)</span>
                  <span className="font-mono font-bold text-emerald-400">{activeTimelineState.ndvi}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Built-up Footprint</span>
                  <span className="font-mono font-bold text-amber-300">{activeTimelineState.built_up_pct}%</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Water Body %</span>
                  <span className="font-mono font-semibold text-sky-400">0.0%</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Observed State:</span>
                <span className="font-semibold text-white">{activeTimelineState.land_use}</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">Confidence:</span>
                <span className="font-mono font-bold text-teal-300">{parcelProps.confidence || '93% (Prototype / Illustrative)'}</span>
              </div>
            </div>

            {/* SECTION E: CHANGE DETECTION */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Section E: Change Detection
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold rounded uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {parcelProps.verification_status || 'Potential Change Detected'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Previous Verified State</span>
                  <span className="font-semibold text-emerald-400">{parcelProps.previous_state || 'Agriculture'}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Current Observed State</span>
                  <span className="font-semibold text-amber-300">{parcelProps.detected_state || 'Built-up / Plinth'}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Change Type</span>
                  <span className="font-mono font-semibold text-white">{parcelProps.change_type || 'Agriculture → Built-up'}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Magnitude / Area</span>
                  <span className="font-mono font-bold text-rose-300">{parcelProps.change_percentage || '25%'} of parcel</span>
                </div>
              </div>

              {/* Transparent Detection Rule Explanation */}
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
                  Transparent Spectral Detection Rule
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Sentinel-2 multitemporal surface reflectance comparison flagged an NDVI drop exceeding 0.35 alongside elevated SWIR (Band 11) reflectivity. Spatial clustering within parcel boundaries indicates non-agricultural plinth/footing development.
                </p>
              </div>
            </div>

            {/* SECTION F: HISTORICAL TIMELINE */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> Section F: Historical Timeline
                </span>
                <span className="text-[10px] font-mono text-slate-400">Digital Twin Temporal States</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Observation Epoch:</span>
                  <span className="text-sky-400 font-mono text-sm">{timelineYear} Pass</span>
                </div>

                {/* 3-State Year Switcher Slider */}
                <div className="grid grid-cols-3 gap-2">
                  {([2022, 2024, 2026] as TimelineYear[]).map((yr) => (
                    <button
                      key={yr}
                      onClick={() => onTimelineYearChange(yr)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer text-center ${
                        timelineYear === yr
                          ? 'bg-sky-600 text-white shadow-lg shadow-sky-950/50 border border-sky-400 scale-[1.02]'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800/80 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Telemetry Status:</span>
                    <span className="font-semibold text-slate-200">{activeTimelineState.change_status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vegetation Health (NDVI):</span>
                    <span className="font-mono text-emerald-400">{activeTimelineState.ndvi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Impervious Surface:</span>
                    <span className="font-mono text-amber-300">{activeTimelineState.built_up_pct}%</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 italic">
                  Note: Distinguish Digital Twin multi-temporal satellite states (2022–2026) from Bhuvan LULC 5-year cycles (2005–06, 2011–12, 2015–16).
                </p>
              </div>
            </div>

            {/* SECTION G: EVIDENCE */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" /> Section G: Remote Sensing Evidence
                </span>
                <span className="text-[10px] font-mono text-slate-400">Sentinel-2 MSI (10m VNIR)</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2.5">
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Inspect multi-temporal satellite imagery pairs, false-color NDVI vegetation difference maps, and radiometric segmentation masks.
                </p>

                {onOpenEvidence && (
                  <button
                    onClick={onOpenEvidence}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-lg transition-all shadow-lg shadow-amber-950/40 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Remote Sensing Evidence</span>
                  </button>
                )}
              </div>
            </div>

            {/* SECTION H: POLICY SIMULATION */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Section H: Policy Simulation
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold rounded uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  ?? Simulation Data
                </span>
              </div>

              <div className="space-y-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {/* Parameter 1 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 font-medium">Agricultural Land Protection Level</span>
                    <span className="text-cyan-300 font-bold">{simParams.landProtectionLevel}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['Strict', 'Standard', 'Relaxed'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setSimParams(prev => ({ ...prev, landProtectionLevel: lvl }))}
                        className={`py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${
                          simParams.landProtectionLevel === lvl
                            ? 'bg-cyan-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 2 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 font-medium">Urban Expansion Control</span>
                    <span className="text-cyan-300 font-bold">{simParams.urbanExpansionControl}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['Buffer Enforced', 'Standard Zoning', 'High Growth'] as const).map((ctrl) => (
                      <button
                        key={ctrl}
                        onClick={() => setSimParams(prev => ({ ...prev, urbanExpansionControl: ctrl }))}
                        className={`py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${
                          simParams.urbanExpansionControl === ctrl
                            ? 'bg-cyan-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {ctrl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 3 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 font-medium">Compensation Settlement Efficiency</span>
                    <span className="text-cyan-300 font-bold">{simParams.compensationEfficiency}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['90-Day Accelerated', 'Standard SLA', 'Delayed'] as const).map((eff) => (
                      <button
                        key={eff}
                        onClick={() => setSimParams(prev => ({ ...prev, compensationEfficiency: eff }))}
                        className={`py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${
                          simParams.compensationEfficiency === eff
                            ? 'bg-cyan-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {eff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Run Simulation Trigger */}
                <button
                  onClick={() => onRunSimulation?.(simParams)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-lg transition-all shadow-lg shadow-cyan-950/40 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isPolicySimulated ? 'Update Simulation Scenario' : 'Run Simulation'}</span>
                </button>

                {/* Baseline vs Scenario Results Card */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-cyan-500/30 space-y-2.5 text-[11px]">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <span className="font-bold text-white uppercase text-[10px] tracking-wider">
                      Regional Impact: Baseline vs. Scenario
                    </span>
                    <span className="text-cyan-400 font-mono text-[10px]">Active Model</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Regional Agricultural Land Loss:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="line-through text-slate-500 font-mono">8.4%</span>
                        <span className="text-cyan-400 font-bold font-mono text-xs">{simResults.agriculturalLossPct}%</span>
                        <span className="text-emerald-400 text-[10px]">(-{(8.4 - simResults.agriculturalLossPct).toFixed(1)}%)</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Disputed Parcels (Tehsil):</span>
                      <div className="flex items-center gap-1.5">
                        <span className="line-through text-slate-500 font-mono">327</span>
                        <span className="text-cyan-400 font-bold font-mono text-xs">{simResults.disputedParcelsCount}</span>
                        <span className="text-emerald-400 text-[10px]">(-{327 - simResults.disputedParcelsCount})</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Pending Compensation Claims:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="line-through text-slate-500 font-mono">1,240</span>
                        <span className="text-cyan-400 font-bold font-mono text-xs">{simResults.pendingCompensationCount}</span>
                        <span className="text-emerald-400 text-[10px]">(-{1240 - simResults.pendingCompensationCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                    Parcel Scenario Outcome:{' '}
                    <strong className="text-emerald-300">Conversion Risk Neutralized • Zoned as Protected Agriculture</strong>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 italic">
                  Disclaimer: Illustrative simulation — not an official forecast. Intended for policymaking evaluation prototypes.
                </p>
              </div>

              {/* POST-IMPLEMENTATION FEEDBACK LOOP */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">
                  Post-Implementation Feedback Loop
                </span>
                
                <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800 text-[10px] text-slate-300 space-y-2">
                  <div className="flex flex-wrap items-center gap-1 font-mono text-[9px] text-slate-400">
                    <span className="px-1.5 py-0.5 bg-slate-800 text-sky-300 rounded">1. Simulation</span>
                    <span>→</span>
                    <span className="px-1.5 py-0.5 bg-slate-800 text-cyan-300 rounded">2. Implementation</span>
                    <span>→</span>
                    <span className="px-1.5 py-0.5 bg-slate-800 text-emerald-300 rounded">3. Field Outcomes</span>
                    <span>→</span>
                    <span className="px-1.5 py-0.5 bg-slate-800 text-amber-300 rounded">4. Compare Actual vs Predicted</span>
                    <span>→</span>
                    <span className="px-1.5 py-0.5 bg-slate-800 text-teal-300 rounded">5. Effectiveness Scoring</span>
                    <span>→</span>
                    <span className="px-1.5 py-0.5 bg-slate-800 text-indigo-300 rounded">6. Continuous Refinement</span>
                  </div>

                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    Closing the Governance Loop: Digital Twin predictions are continuously calibrated by comparing projected parcel transitions against post-enactment satellite passes and field Patwari ground audit reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: EXTENDED 12-MODULE DOSSIER */}
        {/* ======================================================== */}
        {mainTab === 'modules' && (
          <div className="space-y-4">
            {/* Module Sub-tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 text-[11px]">
              <button
                onClick={() => setModuleTab('all')}
                className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  moduleTab === 'all'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All 12
              </button>
              <button
                onClick={() => setModuleTab('land')}
                className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  moduleTab === 'land'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Land & Use (1-5)
              </button>
              <button
                onClick={() => setModuleTab('location_soil')}
                className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  moduleTab === 'location_soil'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Soil (6-7)
              </button>
              <button
                onClick={() => setModuleTab('satellite_infra')}
                className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  moduleTab === 'satellite_infra'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Infra & Sat (8-9)
              </button>
              <button
                onClick={() => setModuleTab('history_policy')}
                className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  moduleTab === 'history_policy'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Policy (10-12)
              </button>
            </div>

            {/* MODULES 1 to 4: Parcel ID, Land Category, Area, Current Land Use */}
            {(moduleTab === 'all' || moduleTab === 'land') && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" /> Modules 1–4: Core Cadastral Profile
                </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* 1. Parcel ID & Category */}
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 col-span-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">1. Parcel ID</span>
                    <span className="text-base font-bold font-mono text-white">{parcelProps.parcel_id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">2. Land Category</span>
                    <span className="text-xs font-semibold text-emerald-400">
                      {dossier?.land_category || 'Private Agricultural Freehold'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Area Multi-Unit Breakdown */}
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">3. Area</span>
                <div className="space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hectares:</span>
                    <span className="font-bold text-slate-100">{dossier?.area_ha ?? parcelProps.area} ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Local Bigha:</span>
                    <span className="font-medium text-slate-200">{dossier?.area_bigha ?? parcelProps.area_bigha}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sq. Meters:</span>
                    <span className="font-mono text-[11px] text-slate-300">
                      {dossier?.area_sq_m ? dossier.area_sq_m.toLocaleString() : '28,000'} m²
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Current Land Use */}
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">4. Current Land Use</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: landColor }} />
                    <span className="font-bold text-slate-100 text-sm">{parcelProps.land_use}</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-2">
                  Status: <span className="text-slate-200">{parcelProps.verification_status}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 5: Historical Land Use */}
        {/* ======================================================== */}
        {(moduleTab === 'all' || moduleTab === 'land') && (
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> 5. Historical Land Use Timeline
              </span>
              <span className="text-[10px] text-slate-400 font-mono">2016 – 2026</span>
            </div>

            <div className="relative pl-4 space-y-3 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
              {(dossier?.historical_land_use || []).map((h, idx) => (
                <div key={idx} className="relative pl-3 text-xs">
                  <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-slate-900" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold font-mono text-amber-300">{h.year}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{h.source}</span>
                  </div>
                  <div className="font-medium text-slate-200 text-[11px]">{h.use}</div>
                  <div className="text-[10px] text-slate-400">{h.notes}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 6: Location */}
        {/* ======================================================== */}
        {(moduleTab === 'all' || moduleTab === 'location_soil') && (
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> 6. Administrative & Cadastral Location
            </span>

            <div className="grid grid-cols-2 gap-y-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Khasra Number</span>
                <span className="font-mono font-bold text-slate-100">{dossier?.location.khasra_no || parcelProps.khasra_no}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Khata Number</span>
                <span className="font-mono text-slate-200">{dossier?.location.khata_number || 'KT-9104'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Village</span>
                <span className="text-slate-200 font-medium">{parcelProps.village}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Tehsil</span>
                <span className="text-slate-200 font-medium">{parcelProps.tehsil}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">District & State</span>
                <span className="text-slate-200">Gwalior, Madhya Pradesh</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Cadastral Sheet</span>
                <span className="font-mono text-slate-300">{dossier?.location.cadastral_sheet || 'SH-MOR-07'}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-700/40">
                <span className="text-[10px] text-slate-400 block">Exact Geodetic Coordinates (DMS)</span>
                <span className="font-mono text-emerald-400 text-[11px]">
                  {dossier?.location.coordinates_dms || '26°13\'24.6"N 78°13\'40.8"E'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 7: Soil / Environmental indicators */}
        {/* ======================================================== */}
        {(moduleTab === 'all' || moduleTab === 'location_soil') && (
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5" /> 7. Soil / Environmental Indicators
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 col-span-2">
                <span className="text-[10px] text-slate-400 block">Soil Classification & Texture</span>
                <span className="font-semibold text-slate-200">
                  {dossier?.soil_environmental_indicators.soil_type || 'Sandy Clay Loam'}
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Soil Reaction (pH)</span>
                <span className="font-mono font-bold text-slate-100">
                  {dossier?.soil_environmental_indicators.soil_ph ?? 7.1}
                </span>
                <span className="text-[10px] text-slate-400 ml-1">(Neutral/Optimal)</span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Organic Carbon (OC)</span>
                <span className="font-mono font-bold text-slate-100">
                  {dossier?.soil_environmental_indicators.organic_carbon_percent ?? 0.41}%
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 col-span-2">
                <span className="text-[10px] text-slate-400 block mb-1">NDVI Vegetation Health (Current vs Baseline)</span>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: `${(dossier?.soil_environmental_indicators.ndvi_current ?? 0.38) * 100}%` }}
                    />
                  </div>
                  <div className="font-mono text-xs text-slate-200">
                    {dossier?.soil_environmental_indicators.ndvi_current ?? 0.38}
                    <span className="text-slate-400 text-[10px] ml-1">
                      (Base: {dossier?.soil_environmental_indicators.ndvi_baseline ?? 0.74})
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Groundwater Table</span>
                <span className="font-mono text-slate-200 text-[11px]">
                  {dossier?.soil_environmental_indicators.groundwater_table_depth || '18.6 m bgl'}
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Degradation Risk</span>
                <span className={`font-bold text-[11px] ${
                  dossier?.soil_environmental_indicators.land_degradation_risk === 'CRITICAL' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {dossier?.soil_environmental_indicators.land_degradation_risk || 'LOW'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 8: Nearby Infrastructure */}
        {/* ======================================================== */}
        {(moduleTab === 'all' || moduleTab === 'satellite_infra') && (
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" /> 8. Nearby Infrastructure & Governance Impact
            </span>

            <div className="space-y-2">
              {(dossier?.nearby_infrastructure || []).map((infra, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{infra.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-slate-800 text-indigo-300 border border-indigo-500/30 rounded">
                        {infra.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{infra.governance_impact}</p>
                  </div>
                  <span className="font-mono font-bold text-amber-300 text-xs shrink-0 bg-amber-950/40 px-2 py-1 rounded border border-amber-500/30">
                    {infra.distance_km} km
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 9: Satellite Observations */}
        {/* ======================================================== */}
        {(moduleTab === 'all' || moduleTab === 'satellite_infra') && (
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <span className="text-[11px] font-semibold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5 text-teal-400" /> 9. Satellite Earth Observations Telemetry
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Primary Sensor</span>
                <span className="font-medium text-slate-200 text-[11px]">
                  {dossier?.satellite_observations.primary_sensor || 'Sentinel-2 MSI (10m) / Cartosat-3'}
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Spatial Ground Resolution</span>
                <span className="font-mono font-bold text-teal-300 text-sm">
                  10m (VNIR) / 0.28m Context
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Last Acquisition</span>
                <span className="font-mono text-slate-300 text-[10px]">
                  {dossier?.satellite_observations.last_acquisition_utc || '2026-08-18T10:45:00Z'}
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Cloud Cover</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {dossier?.satellite_observations.cloud_cover_percent ?? 0.0}%
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 col-span-2">
                <span className="text-[10px] text-slate-400 block">Spectral Bands & Processing</span>
                <span className="text-[11px] font-mono text-slate-300">
                  {dossier?.satellite_observations.spectral_bands_used || 'VNIR B2-B8 & SWIR B11/B12'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 10: Change History */}
        {/* ======================================================== */}
        {(moduleTab === 'all' || moduleTab === 'history_policy') && (
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> 10. Change History & Surveillance Audit
            </span>

            <div className="space-y-2">
              {(dossier?.change_history || []).map((ch, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-slate-200 text-[11px]">{ch.date}</span>
                    <span className="font-mono text-[10px] text-rose-400 bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-500/30">
                      {ch.confidence_score}% Confidence
                    </span>
                  </div>
                  <div className="font-medium text-slate-200 text-xs">{ch.event}</div>
                  <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Source: {ch.detected_by}</span>
                    <span className="font-semibold text-amber-300">{ch.action_status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 11: Relevant Research */}
        {/* ======================================================== */}
        {(moduleTab === 'all' || moduleTab === 'history_policy') && (
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <span className="text-[11px] font-semibold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-violet-400" /> 11. Relevant Research & Scientific Citations
            </span>

            <div className="space-y-2">
              {(dossier?.relevant_research || []).map((res, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-100 text-xs">{res.title}</span>
                    <span className="font-mono text-[10px] text-violet-300 bg-violet-950/40 px-1.5 py-0.5 rounded shrink-0 ml-2">
                      {res.year}
                    </span>
                  </div>
                  <div className="text-[10px] text-violet-400/90 font-medium">{res.source_institution}</div>
                  <p className="text-[10px] text-slate-300 leading-relaxed italic bg-slate-950/40 p-1.5 rounded">
                    "{res.key_finding}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE 12: Policy Scenarios */}
        {/* ======================================================== */}
        {(moduleTab === 'all' || moduleTab === 'history_policy') && (
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 12. Policy Scenarios & Simulation
            </span>

            <div className="space-y-2.5">
              {(dossier?.policy_scenarios || []).map((pol, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-700/70 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-100 text-xs">{pol.scenario_name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-emerald-300 rounded border border-slate-700">
                      {pol.zoning_status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-slate-950/50 p-2 rounded">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Hydrological Runoff</span>
                      <span className="font-mono text-slate-200">{pol.projected_runoff_change}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Heat Island Delta</span>
                      <span className="font-mono text-slate-200">{pol.heat_island_delta}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Fiscal / Penalty Impact</span>
                      <span className="text-amber-300 font-medium">{pol.revenue_implication}</span>
                    </div>
                  </div>

                  <div className="p-2 bg-emerald-950/30 border border-emerald-500/30 rounded text-[11px] text-slate-300">
                    <span className="font-bold text-emerald-400 block text-[10px] uppercase">Policy Recommendation</span>
                    {pol.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        )}

      </div>

      {/* Footer Action Bar */}
      <div className="p-3.5 border-t border-slate-700/60 bg-slate-950/80 space-y-2 shrink-0">
        <button
          onClick={handleDownloadFullDossier}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-lg text-xs transition-all shadow-lg shadow-emerald-950/50 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export 12-Module Digital Twin Dossier (JSON)</span>
        </button>
      </div>
    </aside>
  );
};
