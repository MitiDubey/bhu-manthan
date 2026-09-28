import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Compass, Globe, Sparkles, MapPin, BarChart2, ShieldCheck, Search, X, AlertTriangle, Loader2, Layers } from 'lucide-react';
import { GWALIOR_PRESETS } from '../utils/mapUtils';
import { parcelsGeoJSONData } from '../data/parcelsGeoJSON';
import { searchIndiaLocations } from '../utils/indiaGeoService';

interface SearchResult {
  display_name: string;
  lat: number;
  lng: number;
  type: string;
}

interface TopNavigationProps {
  onSelectPreset: (preset: typeof GWALIOR_PRESETS[0]) => void;
  onSelectParcelById: (parcelId: string) => void;
  activeParcelId: string | null;
  onOpenBhuvanStats?: () => void;
  onOpenDataDistinction?: () => void;
  onFlyToLocation?: (lat: number, lng: number, label: string) => void;
  onSwitchTo2D?: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ 
  onSelectPreset, 
  onSelectParcelById,
  activeParcelId,
  onOpenBhuvanStats,
  onOpenDataDistinction,
  onFlyToLocation,
  onSwitchTo2D,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Nominatim search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchIndiaLocations(searchQuery);
        setSearchResults(results);
        setShowDropdown(results.length > 0);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  const handleSelectResult = (result: SearchResult) => {
    setSearchQuery(result.display_name.split(',')[0]);
    setShowDropdown(false);
    setSearchResults([]);
    if (onFlyToLocation) {
      onFlyToLocation(result.lat, result.lng, result.display_name);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowDropdown(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 pointer-events-none flex items-center justify-between px-4 py-3 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent backdrop-blur-[2px]">
      {/* Brand & Emblem */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-950/50">
          <Globe className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-wider text-slate-100 uppercase">
              BHU-MANTHAN <span className="text-xs font-normal text-emerald-400 font-sans ml-1">भू-मंथन</span>
            </h1>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
              3D Digital Twin
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Geospatial Land Governance Platform • Gwalior Prototype (MP) • Pan-India Navigation
          </p>
        </div>
      </div>

      {/* Center: Pan-India Search Bar */}
      <div className="hidden md:flex flex-col items-center gap-1 pointer-events-auto" ref={searchRef}>
        {/* LOCATION SEARCH ≠ CADASTRAL DATA warning badge */}
        <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-950/60 border border-amber-500/40 rounded-full text-[9px] font-bold text-amber-300 uppercase tracking-wider">
          <AlertTriangle className="w-2.5 h-2.5 shrink-0" />
          Location Search ≠ Cadastral Data
        </div>

        {/* Search Input */}
        <div className="relative w-[340px]">
          <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-lg px-2.5 py-1.5 shadow-lg">
            {isSearching
              ? <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin shrink-0" />
              : <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            }
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any location in India…"
              className="flex-1 bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
              onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
            />
            {searchQuery && (
              <button onClick={handleClearSearch} className="text-slate-500 hover:text-slate-300 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl shadow-black/50 overflow-hidden z-50 max-h-[260px] overflow-y-auto">
              {/* Sticky warning */}
              <div className="sticky top-0 px-3 py-1.5 bg-amber-950/80 border-b border-amber-600/30 flex items-center gap-1.5 text-[9px] text-amber-300 font-bold uppercase tracking-wider">
                <AlertTriangle className="w-2.5 h-2.5 shrink-0" />
                Cadastral parcel data only available for Gwalior prototype area
              </div>
              {searchResults.map((result, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectResult(result)}
                  className="w-full px-3 py-2 text-left hover:bg-slate-800 transition-colors border-b border-slate-800/50 last:border-b-0 cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-slate-200 leading-tight line-clamp-1">
                        {result.display_name.split(',')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500 leading-tight line-clamp-1 mt-0.5">
                        {result.display_name.split(',').slice(1, 3).join(',')}
                      </div>
                    </div>
                    <span className="ml-auto text-[9px] px-1 py-0.5 bg-slate-800 text-slate-400 rounded font-mono shrink-0">
                      {result.type}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Navigation Presets, Parcel Selector, Quick Actions */}
      <div className="hidden lg:flex items-center gap-2 pointer-events-auto">
        {/* Camera Presets */}
        <div className="flex items-center gap-1 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 p-1 rounded-lg shadow-lg">
          <span className="text-[11px] font-medium text-slate-400 px-2 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-slate-400" /> Presets:
          </span>
          {GWALIOR_PRESETS.map((preset) => {
            const isActive = preset.parcelId ? activeParcelId === preset.parcelId : false;
            return (
              <button
                key={preset.name}
                onClick={() => onSelectPreset(preset)}
                className={`px-2.5 py-1 text-xs rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 font-medium'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent'
                }`}
                title={preset.description}
              >
                {preset.parcelId && <Sparkles className="w-3 h-3 text-amber-400" />}
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* Parcel Jump Selector */}
        <div className="flex items-center gap-1 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 px-2 py-1 rounded-lg shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={activeParcelId || ''}
            onChange={(e) => e.target.value && onSelectParcelById(e.target.value)}
            aria-label="Select Cadastral Parcel"
            className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
          >
            <option value="" disabled className="bg-slate-900 text-slate-400">
              Jump to Parcel...
            </option>
            {parcelsGeoJSONData.features.map((f) => {
              const p = f.properties;
              const hasAlert = p.priority !== 'NONE';
              return (
                <option
                  key={p.parcel_id}
                  value={p.parcel_id}
                  className="bg-slate-900 text-slate-200"
                >
                  {p.parcel_id} ({p.land_use} - {p.area}){hasAlert ? ' ⚠️' : ''}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {onSwitchTo2D && (
          <button
            onClick={onSwitchTo2D}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/50 rounded-md backdrop-blur-md shadow-sm transition-colors cursor-pointer"
            title="Switch to 2D Cadastral Overview"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-[11px] font-mono hidden md:inline">2D Overview</span>
          </button>
        )}

        {onOpenBhuvanStats && (
          <button
            onClick={onOpenBhuvanStats}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 rounded-md backdrop-blur-md shadow-sm transition-colors cursor-pointer"
            title="View Official Bhuvan/ISRO LULC Statistics"
          >
            <BarChart2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-medium hidden xl:inline">Bhuvan LULC Stats</span>
          </button>
        )}

        {onOpenDataDistinction && (
          <button
            onClick={onOpenDataDistinction}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-sky-300 bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/40 rounded-md backdrop-blur-md shadow-sm transition-colors cursor-pointer"
            title="5-Tier Spatial Hierarchy & Legal Revenue Distinction"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="text-[11px] font-medium hidden sm:inline">Data Integrity</span>
          </button>
        )}

        <button
          onClick={onOpenDataDistinction}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-600/40 rounded-md backdrop-blur-md shadow-sm transition-colors cursor-pointer"
          title="Click to view statutory protocol regarding prototype cadastre"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[11px] font-mono hidden sm:inline">Prototype / Synthetic Cadastre</span>
        </button>
      </div>
    </header>
  );
};
