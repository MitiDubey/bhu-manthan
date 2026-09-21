import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  Search,
  Activity,
  Bell,
  UserCheck,
  ChevronRight,
  Shield,
  Cpu,
  Layers,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const {
    userRole,
    setUserRole,
    searchQuery,
    setSearchQuery,
    selectParcelById,
    parcels,
    changeEvents,
    setCurrentPage,
    currentScenario,
  } = useApp();

  const [searchFocused, setSearchFocused] = useState(false);
  const pendingCount = changeEvents.filter(e => e.status === 'Pending Verification').length;

  // Filter parcels for search suggestions
  const suggestions = searchQuery.trim()
    ? parcels.filter(
        p =>
          p.khasraNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.parcelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.village.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="h-16 border-b border-twin-700/80 bg-twin-900/90 backdrop-blur-xl px-4 flex items-center justify-between z-30 sticky top-0">
      {/* Brand & Live Digital Twin Status */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentPage('landing')}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-glow-cyan flex items-center justify-center">
            <div className="w-full h-full bg-twin-950 rounded-[7px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-emerald-400">
                BHU-MANTHAN
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 font-semibold">
                v2.4 TWIN
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>POSTGIS LIVE</span>
              <span className="text-slate-600">•</span>
              <span>SENTINEL-2 SYNCED</span>
            </div>
          </div>
        </button>

        {/* Geographic Breadcrumbs */}
        <div className="hidden xl:flex items-center gap-1 text-xs font-mono text-slate-400 pl-4 border-l border-twin-700/60">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>India</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span>Uttar Pradesh</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-200">Varanasi Sadar</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-cyan-400 font-semibold">Sarnath Corridor</span>
        </div>
      </div>

      {/* Global Khasra / Parcel Search with Dropdown */}
      <div className="relative w-64 md:w-96">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Khasra (e.g. 412), Parcel Code, Owner..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
            className="w-full bg-twin-850/90 border border-twin-700/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
          />
        </div>

        {/* Search Suggestion Dropdown */}
        {searchFocused && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-twin-900 border border-twin-700/90 rounded-lg shadow-2xl py-1 z-50 max-h-72 overflow-y-auto">
            <div className="px-3 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-twin-800">
              Matched Cadastral Parcels ({suggestions.length})
            </div>
            {suggestions.map(p => (
              <button
                key={p.id}
                onMouseDown={() => {
                  selectParcelById(p.id);
                  setCurrentPage('digital-twin');
                  setSearchQuery('');
                }}
                className="w-full px-3 py-2 text-left hover:bg-twin-800 flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <div className="font-semibold text-slate-100 flex items-center gap-2">
                    <span>{p.khasraNo}</span>
                    <span className="text-[11px] font-mono text-cyan-400">{p.parcelCode}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{p.ownerName} • {p.village}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-twin-700 text-slate-300">
                    {p.currentLandUse}
                  </span>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{p.areaHectares} ha</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls: Scenario Pill, Notification, User Role */}
      <div className="flex items-center gap-3">
        {/* Active Policy Simulation Status Pill */}
        <button
          onClick={() => setCurrentPage('policy-simulation')}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-twin-850 border border-twin-700/80 hover:border-cyan-500/50 text-xs transition-all"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <div className="text-left font-mono">
            <span className="text-[10px] text-slate-400 block leading-tight">ACTIVE SCENARIO:</span>
            <span className="text-slate-200 font-semibold truncate max-w-[140px] block leading-tight">
              {currentScenario.name}
            </span>
          </div>
        </button>

        {/* Pending Verification Bell */}
        <button
          onClick={() => setCurrentPage('land-updates')}
          className="relative p-2 rounded-lg bg-twin-850 border border-twin-700/80 text-slate-300 hover:text-white hover:border-twin-600 transition-all"
          title="Satellite Change Detections"
        >
          <Bell className="w-4 h-4" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-black text-[10px] font-bold flex items-center justify-center font-mono animate-bounce">
              {pendingCount}
            </span>
          )}
        </button>

        {/* User Role Switcher */}
        <div className="flex items-center gap-2 pl-2 border-l border-twin-700/60">
          <div className="w-8 h-8 rounded-full bg-twin-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <select
              value={userRole}
              onChange={e => setUserRole(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-200 cursor-pointer focus:outline-none focus:text-cyan-300 border-none p-0 pr-1"
            >
              <option value="District Magistrate / Collector" className="bg-twin-900 text-slate-100">
                DM / Collector
              </option>
              <option value="Town Planning Officer" className="bg-twin-900 text-slate-100">
                Town Planning Officer
              </option>
              <option value="GIS Analyst" className="bg-twin-900 text-slate-100">
                GIS Analyst
              </option>
              <option value="Field Revenue Inspector" className="bg-twin-900 text-slate-100">
                Field Revenue Inspector
              </option>
            </select>
            <span className="text-[10px] font-mono text-emerald-400 block leading-none">
              Authenticated
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
