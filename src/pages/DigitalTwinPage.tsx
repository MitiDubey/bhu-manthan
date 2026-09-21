import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DigitalTwinView } from '../components/DigitalTwinView';
import { CadastralMap } from '../components/map/CadastralMap';
import { ParcelDetailDrawer } from '../components/digitalTwin/ParcelDetailDrawer';
import { indianStatesAndCities } from '../data/indiaGeographies';
import { Badge } from '../components/common/Badge';
import {
  Compass,
  Info,
  Layers,
  Globe,
  Sparkles,
} from 'lucide-react';

export const DigitalTwinPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  const {
    parcels,
    selectedParcel,
    setSelectedParcel,
    selectedState,
    selectedCity,
    setSelectedGeography,
  } = useApp();

  // Find the selected state object
  const currentStateObj =
    indianStatesAndCities.find(s => s.name === selectedState) || indianStatesAndCities[0];

  const handleStateChange = (stateName: string) => {
    const st = indianStatesAndCities.find(s => s.name === stateName);
    if (st && st.cities.length > 0) {
      const firstCity = st.cities[0];
      setSelectedGeography(st.name, firstCity.name, firstCity.coordinates);
    }
  };

  const handleCityChange = (cityName: string) => {
    const city = currentStateObj.cities.find(c => c.name === cityName);
    if (city) {
      setSelectedGeography(selectedState, city.name, city.coordinates);
    }
  };

  // Quick jump presets for 2D overview
  const quickJumpLocations: { state: string; city: string; coords: [number, number]; label: string }[] = [
    { state: 'Uttar Pradesh', city: 'Varanasi', coords: [25.3630, 83.0200], label: 'Varanasi Peri-Urban (UP)' },
    { state: 'Uttar Pradesh', city: 'Ayodhya', coords: [26.7922, 82.1998], label: 'Ayodhya Heritage (UP)' },
    { state: 'Karnataka', city: 'Bengaluru Urban & Tech Corridor', coords: [12.9425, 77.7285], label: 'Bengaluru Tech SEZ (KA)' },
    { state: 'Maharashtra', city: 'Mumbai MMR', coords: [19.0760, 72.8777], label: 'Mumbai MMR (MH)' },
    { state: 'Delhi (NCT)', city: 'Dwarka - Aerocity Corridor', coords: [28.5921, 77.0460], label: 'Delhi-NCR Aerocity (DL)' },
  ];

  if (viewMode === '3d') {
    return (
      <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
        <DigitalTwinView onSwitchTo2D={() => setViewMode('2d')} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      {/* 2D ALL-INDIA GEOGRAPHY EXPLORER TOOLBAR */}
      <div className="h-14 bg-twin-900/90 border-b border-twin-700/80 px-4 flex items-center justify-between z-10 backdrop-blur-xl shrink-0 gap-4 overflow-x-auto">
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">2D EXPLORER:</span>
          </div>

          {/* 1. Indian State Selector */}
          <div className="relative">
            <select
              value={selectedState}
              onChange={e => handleStateChange(e.target.value)}
              className="bg-twin-850 border border-twin-700/80 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-100 cursor-pointer focus:outline-none focus:border-cyan-400"
            >
              {indianStatesAndCities.map(st => (
                <option key={st.code} value={st.name} className="bg-twin-900 text-slate-100">
                  {st.name} ({st.type === 'Union Territory' ? 'UT' : 'State'})
                </option>
              ))}
            </select>
          </div>

          {/* 2. City / District Selector */}
          <div className="relative">
            <select
              value={selectedCity}
              onChange={e => handleCityChange(e.target.value)}
              className="bg-twin-850 border border-twin-700/80 rounded-lg px-2.5 py-1.5 text-xs font-mono text-cyan-300 font-semibold cursor-pointer focus:outline-none focus:border-cyan-400"
            >
              {currentStateObj.cities.map(ct => (
                <option key={ct.name} value={ct.name} className="bg-twin-900 text-slate-100">
                  {ct.name} {ct.hasSampleParcels ? '★ (Parcels Loaded)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Jump Pills across prominent Indian Zones */}
        <div className="hidden xl:flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-500 shrink-0">QUICK JUMP:</span>
          {quickJumpLocations.map((loc, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedGeography(loc.state, loc.city, loc.coords)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono shrink-0 transition-all border ${
                selectedCity === loc.city
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-semibold shadow-glow-cyan'
                  : 'bg-twin-850/80 hover:bg-twin-800 text-slate-400 hover:text-slate-200 border-twin-700/60'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Switch back to 3D View */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => setViewMode('3d')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-mono transition-colors shadow-glow-cyan"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Launch 3D Satellite Twin</span>
          </button>
          <Badge variant="cyan" size="sm">
            {currentStateObj.cities.length} DISTRICTS
          </Badge>
        </div>
      </div>

      {/* Main Map & Detail Panel View */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Central Map Canvas */}
        <div className="flex-1 relative h-full">
          <CadastralMap heightClass="h-full" showControls={true} />

          {/* Floating Instructions if no parcel is clicked */}
          {!selectedParcel && (
            <div className="absolute bottom-6 left-6 z-20 glass-panel p-4 rounded-xl border border-cyan-500/30 max-w-sm">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
                <Info className="w-4 h-4" />
                <span>12-FIELD DIGITAL TWIN READY</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Click any Khasra parcel polygon on the map to trigger an asynchronous backend fetch
                for all 12 attributes (Soil indicators, satellite observations, legal research, and policy scenarios).
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {parcels.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedParcel(p)}
                    className="px-2 py-1 rounded bg-twin-850 hover:bg-cyan-950 border border-twin-700 hover:border-cyan-500 text-[11px] font-mono text-slate-200 transition-colors"
                  >
                    {p.khasraNo} ({p.district})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contextual Right Slide-Out 12-Field Information Drawer */}
        {selectedParcel && <ParcelDetailDrawer />}
      </div>
    </div>
  );
};
