import React from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { CadastralMap } from '../components/map/CadastralMap';
import { monthlyChanges2024, ndviDistribution } from '../data/analyticsData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Layers,
  MapPin,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Cpu,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { parcels, changeEvents, setCurrentPage, selectParcelById } = useApp();

  const totalAreaHa = parcels.reduce((sum, p) => sum + p.areaHectares, 0).toFixed(1);
  const pendingAlerts = changeEvents.filter(e => e.status === 'Pending Verification');
  const flaggedCount = parcels.filter(p => p.status === 'Encroachment Flagged').length;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Land-Governance Command Dashboard
            </h1>
            <Badge variant="cyan">REAL-TIME</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            District: Varanasi • Tehsil: Sarnath • Cadastral Grid Sector 4 & 5
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('digital-twin')}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono flex items-center gap-1.5 shadow-glow-cyan transition-all"
          >
            <span>OPEN 2D/3D DIGITAL TWIN</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400">Total Monitored Area</span>
            <div className="text-2xl font-bold text-white mt-1">
              {totalAreaHa} <span className="text-xs font-normal text-slate-400">ha</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>100% PostGIS Synchronized</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400">Cadastral Khasra Parcels</span>
            <div className="text-2xl font-bold text-white mt-1">
              {parcels.length}{' '}
              <span className="text-xs font-normal text-slate-400">Core Entities</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-cyan-400 mt-1 font-mono">
              <span>High-Res Ortho Mapped</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400">Satellite Encroachment Flags</span>
            <div className="text-2xl font-bold text-rose-400 mt-1">
              {flaggedCount} <span className="text-xs font-normal text-slate-400">Parcels</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{pendingAlerts.length} Awaiting Verification</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-950/80 text-rose-400 border border-rose-800">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400">Policy Simulation Scenarios</span>
            <div className="text-2xl font-bold text-white mt-1">
              3 <span className="text-xs font-normal text-slate-400">Active</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-purple-400 mt-1 font-mono">
              <Cpu className="w-3.5 h-3.5" />
              <span>Master Plan 2031 Model</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-800">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: MINI DIGITAL TWIN MAP & LAND-USE DYNAMICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Interactive Mini Map */}
        <div className="lg:col-span-2 glass-panel p-4 rounded-xl border border-twin-700/60 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Live Cadastral Digital Twin View (Sarnath Sector)
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('digital-twin')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Full Screen Map <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <CadastralMap heightClass="h-[360px]" showControls={false} />
        </div>

        {/* Right: NDVI Biomass Distribution */}
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-sm text-white">NDVI Vegetation Health</h2>
              <span className="text-[10px] font-mono text-slate-400">Sentinel-2 MSI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Biomass distribution across surveyed parcels indicating vegetative vigor vs built-up
              surfaces.
            </p>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ndviDistribution}
                    dataKey="areaHa"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                  >
                    {ndviDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#101626',
                      borderColor: '#1E2B4D',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-3 border-t border-twin-800">
            {ndviDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.fill }} />
                <span className="text-slate-300 truncate">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: LAND-CHANGE SUMMARY BAR CHART & RECENT ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Change Trend Bar Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-twin-700/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-sm text-white">Monthly Verification Cadence (2024–2025)</h2>
              <p className="text-xs text-slate-400">
                Verified land mutations vs satellite-flagged encroachments
              </p>
            </div>
            <Badge variant="slate">Annual Stream</Badge>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyChanges2024}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#101626',
                    borderColor: '#1E2B4D',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="verifiedUpdates" name="Verified Updates" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="encroachmentsFlagged" name="Encroachments Flagged" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Recent Alerts Feed */}
        <div className="glass-panel p-5 rounded-xl border border-twin-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Change Detection Feed
              </h2>
              <Badge variant="rose" size="sm">
                {changeEvents.length} Events
              </Badge>
            </div>

            <div className="space-y-3">
              {changeEvents.slice(0, 3).map(event => (
                <div
                  key={event.id}
                  onClick={() => {
                    selectParcelById(event.parcelId);
                    setCurrentPage('land-updates');
                  }}
                  className="p-3 rounded-lg bg-twin-850 hover:bg-twin-800 border border-twin-700/60 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-white group-hover:text-cyan-400">
                      {event.khasraNo}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        event.status === 'Approved'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{event.detectedType}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {event.detectionDate}
                    </span>
                    <span className="text-cyan-400 font-semibold">AI Conf: {event.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('land-updates')}
            className="w-full mt-4 py-2 rounded-lg bg-twin-800 hover:bg-twin-700 text-xs font-mono text-slate-200 flex items-center justify-center gap-1.5 transition-colors border border-twin-700"
          >
            Review All in Verification Queue
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
