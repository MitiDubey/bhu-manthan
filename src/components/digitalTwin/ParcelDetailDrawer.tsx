import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { getLandUseColor } from '../../data/parcels';
import {
  X,
  MapPin,
  Maximize2,
  Calendar,
  Satellite,
  ShieldAlert,
  Play,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  Compass,
  Layers,
  ArrowRight,
  Sparkles,
  Droplet,
  Flame,
  Wind,
  Layers as SoilLayers,
  BookOpen,
  Sliders,
  History,
  Building,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export const ParcelDetailDrawer: React.FC = () => {
  const { selectedParcel, setSelectedParcel, setCurrentPage, isLoadingParcelDetails } = useApp();
  
  // Navigation sub-tabs inside drawer for clean viewing of the 12 fields
  const [activeTab, setActiveTab] = useState<
    'core' | 'soil_env' | 'satellite' | 'history' | 'research' | 'scenarios'
  >('core');

  if (!selectedParcel) return null;

  const color = getLandUseColor(selectedParcel.currentLandUse);

  return (
    <div className="w-full lg:w-[480px] h-full flex flex-col bg-twin-900/95 backdrop-blur-2xl border-l border-twin-700/80 shadow-2xl z-20 overflow-hidden select-none">
      {/* Header */}
      <div className="p-4 border-b border-twin-700/80 bg-twin-950/70 flex items-start justify-between relative">
        {isLoadingParcelDetails && (
          <div className="absolute inset-0 bg-twin-950/80 backdrop-blur-sm z-30 flex items-center justify-center gap-2 font-mono text-xs text-cyan-400">
            <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
            <span>FETCHING DIGITAL TWIN TELEMETRY FROM BACKEND...</span>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            {/* 1. Parcel ID Badge */}
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              {selectedParcel.parcelCode}
            </span>
            <Badge
              variant={
                selectedParcel.status === 'Verified'
                  ? 'emerald'
                  : selectedParcel.status === 'Encroachment Flagged'
                  ? 'rose'
                  : 'amber'
              }
              size="sm"
              pulse={selectedParcel.status === 'Encroachment Flagged'}
            >
              {selectedParcel.status}
            </Badge>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {selectedParcel.khasraNo}
          </h2>

          {/* 6. Location Header */}
          <p className="text-xs font-mono text-slate-400 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" />
            {selectedParcel.village}, {selectedParcel.tehsil}, {selectedParcel.district} ({selectedParcel.state})
          </p>
        </div>

        <button
          onClick={() => setSelectedParcel(null)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-twin-800 transition-all"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sub-Tab Navigation for the 12 Fields */}
      <div className="flex border-b border-twin-800 bg-twin-950/40 text-xs font-mono overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('core')}
          className={`px-3 py-2.5 text-center font-medium border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'core'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Identity & Area
        </button>
        <button
          onClick={() => setActiveTab('soil_env')}
          className={`px-3 py-2.5 text-center font-medium border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'soil_env'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Soil & Env
        </button>
        <button
          onClick={() => setActiveTab('satellite')}
          className={`px-3 py-2.5 text-center font-medium border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'satellite'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Satellite Obs
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-3 py-2.5 text-center font-medium border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'history'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Change History
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`px-3 py-2.5 text-center font-medium border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'research'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Research & Law
        </button>
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`px-3 py-2.5 text-center font-medium border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'scenarios'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Policy What-If
        </button>
      </div>

      {/* Content Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
        {/* TAB 1: IDENTITY, LAND CATEGORY, AREA, CURRENT LAND USE & INFRASTRUCTURE */}
        {activeTab === 'core' && (
          <div className="space-y-4">
            {/* 2. Land Category Banner */}
            <div className="p-3 rounded-xl bg-twin-850 border border-twin-700/80 space-y-1">
              <span className="font-mono text-[10px] uppercase text-cyan-400 font-semibold tracking-wider block">
                Official Cadastral Classification
              </span>
              <div className="font-bold text-sm text-white">
                {selectedParcel.landCategory || `${selectedParcel.currentLandUse} Land Tenure`}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Official Revenue Reference: {selectedParcel.officialReference}
              </div>
            </div>

            {/* 3. Area Grid (ha, acres, m², perimeter) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <div className="p-2.5 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">Hectares</span>
                <span className="text-base font-bold text-cyan-300">
                  {selectedParcel.areaHectares} ha
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">Acres</span>
                <span className="text-base font-bold text-slate-200">
                  {selectedParcel.areaAcres || (selectedParcel.areaHectares * 2.471).toFixed(2)} ac
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">Sq. Meters</span>
                <span className="text-xs font-bold text-slate-300">
                  {selectedParcel.areaSqMeters.toLocaleString()} m²
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">Perimeter</span>
                <span className="text-xs font-bold text-slate-300">
                  {selectedParcel.perimeterMeters} m
                </span>
              </div>
            </div>

            {/* 4. Current vs Registered Land Use Comparison */}
            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/80 space-y-2">
              <span className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider block">
                Land Use Status Audit
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-twin-900 border border-twin-800">
                  <span className="text-slate-400 text-[10px] block">Current (Remote Sensing)</span>
                  <span className="font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    {selectedParcel.currentLandUse}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-twin-900 border border-twin-800">
                  <span className="text-slate-400 text-[10px] block">Registered (Khatauni)</span>
                  <span className="font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    {selectedParcel.registeredLandUse}
                  </span>
                </div>
              </div>

              {selectedParcel.currentLandUse !== selectedParcel.registeredLandUse && (
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-[11px] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Unlawful land-use diversion without Section 80/143 conversion clearance.</span>
                </div>
              )}
            </div>

            {/* 6. Complete Location & Geographic Coordinates */}
            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/80 space-y-2">
              <span className="font-mono text-[10px] uppercase text-cyan-400 font-semibold tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                Geospatial Administrative Location
              </span>
              <div className="grid grid-cols-2 gap-y-1.5 font-mono text-[11px] text-slate-300">
                <div>
                  <span className="text-slate-500 text-[10px] block">State:</span>
                  <span>{selectedParcel.state}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">District:</span>
                  <span>{selectedParcel.district}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Tehsil:</span>
                  <span>{selectedParcel.tehsil}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Pincode:</span>
                  <span>{selectedParcel.locationDetails?.pincode || '221007'}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-twin-800">
                  <span className="text-slate-500 text-[10px] block">Polygon Coordinates / Centroid:</span>
                  <span className="text-cyan-400">
                    {selectedParcel.locationDetails?.coordinatesText || `${selectedParcel.center[0].toFixed(4)}° N, ${selectedParcel.center[1].toFixed(4)}° E`}
                  </span>
                </div>
              </div>
            </div>

            {/* 8. Nearby Infrastructure Distances */}
            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/80 space-y-2">
              <span className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-cyan-400" />
                Nearby Infrastructure Proximities
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {selectedParcel.nearbyInfrastructure.map((infra, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-1.5 rounded bg-twin-900/60 border border-twin-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{infra}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: 7. SOIL & ENVIRONMENTAL INDICATORS */}
        {activeTab === 'soil_env' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/80 space-y-1">
              <span className="font-mono text-[10px] uppercase text-emerald-400 font-semibold tracking-wider block">
                Pedological & Soil Classification
              </span>
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <SoilLayers className="w-4 h-4 text-emerald-400" />
                <span>{selectedParcel.soilEnvironmentalIndicators?.soilType || 'Ganga Alluvial Silt Loam'}</span>
              </div>
            </div>

            {/* Metric Readout Grid */}
            <div className="grid grid-cols-2 gap-2.5 font-mono">
              <div className="p-3 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">Soil pH Level</span>
                <span className="text-lg font-bold text-emerald-400">
                  {selectedParcel.soilEnvironmentalIndicators?.phLevel || 7.4}
                </span>
                <span className="text-[10px] text-slate-500 block">Neutral to Slightly Alkaline</span>
              </div>

              <div className="p-3 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">Organic Carbon</span>
                <span className="text-lg font-bold text-cyan-400">
                  {selectedParcel.soilEnvironmentalIndicators?.organicCarbonPct || 0.76}%
                </span>
                <span className="text-[10px] text-slate-500 block">High Agricultural Biomass</span>
              </div>

              <div className="p-3 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">Soil Moisture Index</span>
                <span className="text-lg font-bold text-blue-400">
                  {selectedParcel.soilEnvironmentalIndicators?.soilMoistureIndex || 32}%
                </span>
                <span className="text-[10px] text-slate-500 block">Sentinel-1 Radar Derived</span>
              </div>

              <div className="p-3 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">Groundwater Depth</span>
                <span className="text-lg font-bold text-amber-400">
                  {selectedParcel.soilEnvironmentalIndicators?.groundwaterDepthMeters || 11.2} m
                </span>
                <span className="text-[10px] text-slate-500 block">Below Ground Level (bgl)</span>
              </div>
            </div>

            {/* Environmental Hazards */}
            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/80 space-y-2 font-mono text-[11px]">
              <span className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider block">
                Environmental Vulnerability Indices
              </span>
              <div className="flex justify-between items-center py-1.5 border-b border-twin-800">
                <span className="text-slate-300">Flood Inundation Class:</span>
                <Badge variant={selectedParcel.floodRisk === 'Critical' ? 'rose' : selectedParcel.floodRisk === 'Moderate' ? 'amber' : 'emerald'}>
                  {selectedParcel.soilEnvironmentalIndicators?.floodInundationClass || selectedParcel.floodRisk}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-twin-800">
                <span className="text-slate-300">Topsoil Erosion Risk:</span>
                <span className="text-emerald-400 font-bold">
                  {selectedParcel.soilEnvironmentalIndicators?.erosionRisk || 'Low'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-300">Air Quality Index (AQI):</span>
                <span className="text-cyan-400 font-bold">
                  {selectedParcel.soilEnvironmentalIndicators?.airQualityIndexAQI || 128} (Moderate)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 9. SATELLITE OBSERVATIONS */}
        {activeTab === 'satellite' && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-twin-700 relative aspect-video bg-black group">
              <img
                src={selectedParcel.latestObservation.imageUri}
                alt="Satellite capture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-twin-950/80 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-800">
                {selectedParcel.latestObservation.satellite} ({selectedParcel.latestObservation.resolution})
              </div>
              <div className="absolute bottom-2 right-2 bg-twin-950/80 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-slate-300">
                Pass Date: {selectedParcel.latestObservation.captureDate}
              </div>
            </div>

            {/* Remote Sensing Indices */}
            <div className="grid grid-cols-2 gap-2 font-mono">
              <div className="p-3 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">NDVI (Vegetation Index)</span>
                <span className="text-lg font-bold text-emerald-400">
                  +{selectedParcel.latestObservation.ndvi}
                </span>
                <span className="text-[10px] text-slate-500 block">Photosynthetic Biomass</span>
              </div>
              <div className="p-3 rounded-lg bg-twin-850 border border-twin-700/60">
                <span className="text-[10px] text-slate-400 block">NDWI (Water / Moisture)</span>
                <span className="text-lg font-bold text-cyan-400">
                  {selectedParcel.latestObservation.ndwi}
                </span>
                <span className="text-[10px] text-slate-500 block">Surface Moisture Content</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/80 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Satellite Change Anomaly Score:</span>
                <span className="font-bold text-amber-400">{selectedParcel.latestObservation.changeScore}%</span>
              </div>
              <div className="w-full bg-twin-950 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                  style={{ width: `${selectedParcel.latestObservation.changeScore}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 5. HISTORICAL LAND USE & 10. CHANGE HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div>
              <span className="font-mono text-xs text-cyan-400 font-semibold block mb-2">
                Historical Land Use Evolution (2018–2025)
              </span>
              <div className="relative pl-5 border-l-2 border-twin-700 space-y-3">
                {selectedParcel.history.map((hist, idx) => {
                  const histColor = getLandUseColor(hist.landUse);
                  return (
                    <div key={idx} className="relative">
                      <div
                        className="absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-twin-900"
                        style={{ backgroundColor: histColor }}
                      />
                      <div className="p-2.5 rounded-lg bg-twin-850 border border-twin-700/60">
                        <div className="flex items-center justify-between">
                          <span className="font-bold font-mono text-white">{hist.year}</span>
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-medium"
                            style={{ backgroundColor: `${histColor}22`, color: histColor }}
                          >
                            {hist.landUse}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1">{hist.notes}</p>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1 pt-1 border-t border-twin-800">
                          <span>{hist.source}</span>
                          <span>Confidence: {hist.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 10. Change History Audit Trail */}
            <div className="pt-2 border-t border-twin-800">
              <span className="font-mono text-xs text-amber-400 font-semibold block mb-2">
                Mutation & Encroachment Log
              </span>
              <div className="space-y-2">
                {selectedParcel.changeHistory?.map(ch => (
                  <div key={ch.id} className="p-2.5 rounded-lg bg-twin-850 border border-twin-700/60">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-cyan-400 font-bold">{ch.eventType}</span>
                      <span className="text-slate-400">{ch.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-200 mt-1 font-sans">{ch.detectedChange}</p>
                    <div className="text-[10px] text-slate-400 font-mono mt-1 pt-1 border-t border-twin-800">
                      Engine: {ch.source} • Status: <strong className="text-white">{ch.status}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 11. RELEVANT RESEARCH & LEGAL PROVISIONS */}
        {activeTab === 'research' && (
          <div className="space-y-3">
            <span className="font-mono text-xs text-cyan-400 font-semibold block">
              Statutory Law, Master Plan 2031 & Legal Precedents
            </span>

            {selectedParcel.relevantResearch?.map(res => (
              <div key={res.id} className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/70 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="purple" size="sm">
                    {res.statuteOrGuideline}
                  </Badge>
                  <span className="font-mono text-[10px] text-slate-400">{res.year}</span>
                </div>
                <h4 className="font-bold text-xs text-white">{res.title}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed bg-twin-900 p-2.5 rounded-lg border border-twin-800">
                  {res.relevanceSummary}
                </p>
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => setCurrentPage('knowledge-hub')}
                    className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Read Full Legal Chapter</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: 12. POLICY SCENARIOS & PROJECTED IMPACT */}
        {activeTab === 'scenarios' && (
          <div className="space-y-3">
            <span className="font-mono text-xs text-purple-400 font-semibold block">
              Simulated Policy Impacts on this Parcel
            </span>

            {selectedParcel.policyScenariosImpact?.map((scen, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{scen.scenarioName}</span>
                  <Badge variant={scen.restrictionLevel === 'Strict Moratorium' ? 'rose' : scen.restrictionLevel === 'Conditional Approval' ? 'amber' : 'emerald'}>
                    {scen.restrictionLevel}
                  </Badge>
                </div>

                <div className="font-mono text-[11px] text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-500">Projected Classification: </span>
                    <span className="text-cyan-300">{scen.projectedZoning}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Carbon Offset Yield: </span>
                    <span className={scen.carbonCreditYieldTons >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {scen.carbonCreditYieldTons > 0 ? `+${scen.carbonCreditYieldTons}` : scen.carbonCreditYieldTons} Tons/yr
                    </span>
                  </div>
                  <p className="text-slate-400 pt-1 font-sans text-[11px]">{scen.economicImpactText}</p>
                </div>
              </div>
            ))}

            <button
              onClick={() => setCurrentPage('policy-simulation')}
              className="w-full py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-700 text-purple-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors mt-3"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Modify Simulation Parameters for this Zone</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Action Bar */}
      <div className="p-4 border-t border-twin-700/80 bg-twin-950/80 space-y-2">
        <button
          onClick={() => setCurrentPage('policy-simulation')}
          className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-cyan transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          Run Policy Simulation on this Parcel
        </button>
      </div>
    </div>
  );
};
