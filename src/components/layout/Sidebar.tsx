import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  LayoutDashboard,
  MapPin,
  Layers,
  Cpu,
  Sliders,
  BarChart3,
  BookOpen,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Database,
  Radio,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, changeEvents } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const pendingUpdates = changeEvents.filter(e => e.status === 'Pending Verification').length;

  const navItems = [
    { id: 'landing', label: 'Landing & Story', icon: Globe, badge: null },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'digital-twin', label: 'Digital Twin', icon: MapPin, badge: 'Core' },
    { id: 'gis-explorer', label: 'GIS Explorer', icon: Layers, badge: null },
    { id: 'policy-simulation', label: 'Policy Simulation', icon: Sliders, badge: 'Sim' },
    { id: 'ai-research', label: 'AI Legal Research', icon: Cpu, badge: 'RAG' },
    { id: 'analytics', label: 'Geospatial Analytics', icon: BarChart3, badge: null },
    { id: 'knowledge-hub', label: 'Knowledge Hub', icon: BookOpen, badge: null },
    {
      id: 'land-updates',
      label: 'Land Updates Queue',
      icon: CheckSquare,
      badge: pendingUpdates > 0 ? `${pendingUpdates}` : null,
      badgeColor: 'rose',
    },
  ];

  return (
    <aside
      className={`h-[calc(100vh-4rem)] bg-twin-950/95 border-r border-twin-700/80 flex flex-col justify-between transition-all duration-300 z-20 select-none ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Navigation List */}
      <div className="py-3 px-2 space-y-1">
        <div className="px-2 py-1 mb-2 flex items-center justify-between">
          {!collapsed && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              PLATFORM MODULES
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-twin-800 transition-colors ml-auto"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/70 to-twin-900 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-twin-850/80'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-cyan-400' : 'text-slate-400'
                }`}
              />

              {!collapsed && (
                <span className="truncate flex-1 text-left font-sans">{item.label}</span>
              )}

              {/* Badges */}
              {!collapsed && item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    item.badgeColor === 'rose'
                      ? 'bg-rose-950 text-rose-400 border border-rose-800'
                      : 'bg-cyan-950 text-cyan-400 border border-cyan-800/80'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Active Indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-cyan-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Telemetry */}
      <div className="p-3 border-t border-twin-800 bg-twin-900/60 font-mono text-[11px]">
        {!collapsed ? (
          <div className="space-y-1.5 text-slate-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px]">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                TELEMETRY
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">99.8% READY</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>PostGIS Tables</span>
              <span>12 Verified</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>Vector Embeddings</span>
              <span>pgvector-active</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="Telemetry: 99.8% Online">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
};
