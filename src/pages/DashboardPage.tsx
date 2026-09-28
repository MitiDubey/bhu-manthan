import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { CadastralMap } from '../components/map/CadastralMap';
import { monthlyChanges2024, ndviDistribution } from '../data/analyticsData';
import { mockDisputeCompensationData } from '../data/disputesCompensation';
import { mockKnowledgeDocuments } from '../data/knowledgeDocuments';
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
  LineChart,
  Line,
  Legend,
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
  Scale,
  DollarSign,
  CloudRain,
  Leaf,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Building2,
  Wheat,
  Activity,
  Trees,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { parcels, changeEvents, setCurrentPage, selectParcelById, currentScenario } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'disputes' | 'climate' | 'policy' | 'research'
  >('overview');

  const totalAreaHa = parcels.reduce((sum, p) => sum + p.areaHectares, 0).toFixed(1);
  const pendingAlerts = changeEvents.filter(e => e.status === 'Pending Verification');
  const flaggedCount = parcels.filter(p => p.status === 'Encroachment Flagged').length;

  // Disputes & compensation aggregations
  const activeDisputes = mockDisputeCompensationData.filter(
    i => i.dispute.status === 'Active Litigation' || i.dispute.status === 'Revenue Court Sub-Judice'
  ).length;
  const totalSanctionedCr = (
    mockDisputeCompensationData.reduce((s, i) => s + i.compensation.sanctionedAmountInr, 0) /
    10000000
  ).toFixed(2);
  const totalDisbursedCr = (
    mockDisputeCompensationData.reduce((s, i) => s + i.compensation.disbursedAmountInr, 0) /
    10000000
  ).toFixed(2);

  // Climate data sample
  const climateTrends = [
    { year: '2021', floodRiskIndex: 42, waterTableDepthM: 10.2, riparianCanopyPct: 68 },
    { year: '2022', floodRiskIndex: 48, waterTableDepthM: 10.9, riparianCanopyPct: 64 },
    { year: '2023', floodRiskIndex: 55, waterTableDepthM: 11.5, riparianCanopyPct: 59 },
    { year: '2024', floodRiskIndex: 61, waterTableDepthM: 12.1, riparianCanopyPct: 54 },
    { year: '2025', floodRiskIndex: 64, waterTableDepthM: 12.6, riparianCanopyPct: 52 },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Bhu-Manthan Unified Command Dashboard
            </h1>
            <Badge variant="cyan">MODULE 10</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            District: Varanasi • Tehsil: Sarnath • Unified Cross-Module Intelligence Console
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

      {/* DASHBOARD PERSPECTIVE TABS (Mandated by PDF Page 11) */}
      <div className="flex items-center gap-2 border-b border-twin-700/80 pb-2 overflow-x-auto select-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-twin-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Unified Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('disputes')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all shrink-0 ${
            activeTab === 'disputes'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-glow-rose font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-twin-800'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Disputes & Compensation</span>
          {activeDisputes > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('climate')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all shrink-0 ${
            activeTab === 'climate'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-glow-emerald font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-twin-800'
          }`}
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>Climate & Environmental</span>
        </button>

        <button
          onClick={() => setActiveTab('policy')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all shrink-0 ${
            activeTab === 'policy'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-twin-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Policy Indicators & Outcomes</span>
        </button>

        <button
          onClick={() => setActiveTab('research')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all shrink-0 ${
            activeTab === 'research'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-twin-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Research Insights</span>
        </button>
      </div>

      {/* TAB 1: UNIFIED OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Monitored Area */}
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

            {/* Metric 2: Cadastral Parcels */}
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

            {/* Metric 3: Satellite Flags */}
            <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Satellite Change Detections</span>
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

            {/* Metric 4: Disputes & Compensation */}
            <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Sub-Judice Land Disputes</span>
                <div className="text-2xl font-bold text-amber-400 mt-1">
                  {activeDisputes} <span className="text-xs font-normal text-slate-400">Active</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-1 font-mono">
                  <Scale className="w-3.5 h-3.5" />
                  <span>₹{totalSanctionedCr} Cr Awards Tracked</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800">
                <Scale className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION: MINI DIGITAL TWIN & NDVI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-panel p-4 rounded-xl border border-twin-700/60 flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-sm text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Live Cadastral Digital Twin View (Sarnath Sector)
                </h2>
                <button
                  onClick={() => setCurrentPage('digital-twin')}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Full Screen Map <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <CadastralMap heightClass="h-[360px]" showControls={false} />
            </div>

            {/* Right: NDVI Biomass */}
            <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-sm text-white">NDVI Vegetation Health</h2>
                  <span className="text-[10px] font-mono text-slate-400">Sentinel-2 MSI</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Biomass distribution across surveyed parcels indicating vegetative vigor vs built-up surfaces.
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

          {/* BOTTOM SECTION: MONTHLY VERIFICATION & RECENT DETECTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

              <div className="h-[240px] w-full">
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

            {/* Right: Change Detection Feed */}
            <div className="glass-panel p-5 rounded-xl border border-twin-700/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    Change Detection Feed
                  </h2>
                  <Badge variant="rose">{pendingAlerts.length} PENDING</Badge>
                </div>

                <div className="space-y-3">
                  {changeEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      onClick={() => {
                        selectParcelById(event.parcelId);
                        setCurrentPage('land-updates');
                      }}
                      className="p-2.5 rounded-lg bg-twin-850 hover:bg-twin-800 border border-twin-700/60 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200">{event.khasraNo}</span>
                        <span className="font-mono text-[10px] text-cyan-400">{event.confidence}% AI</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{event.detectedType}</p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1">
                        <span>{event.detectionDate}</span>
                        <span className="text-cyan-400">Review Queue →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('land-updates')}
                className="w-full mt-3 py-2 rounded-lg bg-twin-800 hover:bg-twin-750 text-xs font-mono text-slate-200 flex items-center justify-center gap-1 border border-twin-700"
              >
                <span>Open Full Verification Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DISPUTES & COMPENSATION INTELLIGENCE */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-twin-700/60">
              <span className="text-xs text-slate-400 font-mono">Total Tracked Sanctioned Awards</span>
              <div className="text-2xl font-bold text-white mt-1">₹{totalSanctionedCr} Cr</div>
              <p className="text-[11px] text-emerald-400 font-mono mt-1">Disbursed: ₹{totalDisbursedCr} Cr</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-twin-700/60">
              <span className="text-xs text-slate-400 font-mono">Contested in Revenue / Civil Courts</span>
              <div className="text-2xl font-bold text-rose-400 mt-1">{activeDisputes} Parcels</div>
              <p className="text-[11px] text-slate-500 font-mono mt-1">UP-RCCMS & High Court Dockets</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-twin-700/60">
              <span className="text-xs text-slate-400 font-mono">Escrow Held Pending Adjudication</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">₹84.5 Lakhs</div>
              <p className="text-[11px] text-amber-400 font-mono mt-1">Avg Resolution: 412 Days</p>
            </div>
          </div>

          {/* Quick List */}
          <div className="glass-panel p-5 rounded-2xl border border-twin-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  Active Dispute & Land Award Cases
                </h3>
                <p className="text-xs text-slate-400">Integrated with National Judicial Data Grid (NJDG)</p>
              </div>
              <button
                onClick={() => setCurrentPage('disputes-compensation')}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <span>Launch Full Module 8 Dossiers</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockDisputeCompensationData.slice(0, 4).map(item => (
                <div
                  key={item.parcelId}
                  onClick={() => {
                    selectParcelById(item.parcelId);
                    setCurrentPage('disputes-compensation');
                  }}
                  className="p-3.5 rounded-xl bg-twin-850 hover:bg-twin-800 border border-twin-750 cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{item.khasraNo}</span>
                    <Badge
                      variant={
                        item.dispute.status === 'Active Litigation'
                          ? 'rose'
                          : item.dispute.status === 'Revenue Court Sub-Judice'
                          ? 'amber'
                          : 'emerald'
                      }
                    >
                      {item.dispute.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-300 font-mono">
                    Case: {item.dispute.caseNumber}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-twin-800">
                    <span>Award: ₹{(item.compensation.sanctionedAmountInr / 100000).toFixed(1)} L</span>
                    <span className="text-cyan-400">Open Case →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLIMATE & ENVIRONMENTAL METRICS */}
      {activeTab === 'climate' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-twin-700/60">
              <span className="text-xs text-slate-400 font-mono">Flood Inundation Risk Score</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">Zone IV (High)</div>
              <p className="text-[11px] text-slate-500 font-mono mt-1">River Varuna 100m Riparian Buffer</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-twin-700/60">
              <span className="text-xs text-slate-400 font-mono">Groundwater Depth (bgl)</span>
              <div className="text-2xl font-bold text-rose-400 mt-1">12.6 m</div>
              <p className="text-[11px] text-rose-500 font-mono mt-1">Depleting at -0.6m / annum</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-twin-700/60">
              <span className="text-xs text-slate-400 font-mono">Riparian Canopy Cover</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">52.4%</div>
              <p className="text-[11px] text-slate-400 font-mono mt-1">Target 70% under NGT Mandate</p>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-twin-700/80 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                Longitudinal Climate & Hydrological Stress Index (2021–2025)
              </h3>
              <p className="text-xs text-slate-400">
                Co-registered Sentinel-2 NDWI water index and CGWB ground telemetry
              </p>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={climateTrends}>
                  <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#101626',
                      borderColor: '#1E2B4D',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="floodRiskIndex" stroke="#F59E0B" name="Flood Risk Index" />
                  <Line type="monotone" dataKey="waterTableDepthM" stroke="#F43F5E" name="Water Depth (m bgl)" />
                  <Line type="monotone" dataKey="riparianCanopyPct" stroke="#10B981" name="Canopy Retention %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: POLICY INDICATORS & PROJECT OUTCOMES */}
      {activeTab === 'policy' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-twin-700/60 font-mono">
              <span className="text-xs text-slate-400">Master Plan 2031 Adherence</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">84.6%</div>
              <p className="text-[11px] text-slate-500 mt-1">Zoning conformity in Sarnath Sector</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-twin-700/60 font-mono">
              <span className="text-xs text-slate-400">Farmland Protection Weight</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">
                {currentScenario.parameters.agriculturalProtectionWeight}/10
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Active Scenario: {currentScenario.name}</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-twin-700/60 font-mono">
              <span className="text-xs text-slate-400">Ring Road Corridor Density</span>
              <div className="text-2xl font-bold text-cyan-400 mt-1">+3.5% / yr</div>
              <p className="text-[11px] text-slate-500 mt-1">Urban Sprawl Velocity</p>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-twin-700/80 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                Active Policy Scenario: {currentScenario.name}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{currentScenario.description}</p>
            </div>
            <button
              onClick={() => setCurrentPage('policy-simulation')}
              className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-semibold text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <span>Launch Simulator</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: RESEARCH & PRECEDENT INSIGHTS */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-twin-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Key Legal Precedents & Research Briefs
                </h3>
                <p className="text-xs text-slate-400">
                  Vector-indexed legal statutes driving Bhu-Manthan automated compliance scoring
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('ai-research')}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <span>Ask AI Legal Assistant</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {mockKnowledgeDocuments.slice(0, 3).map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setCurrentPage('knowledge-hub')}
                  className="p-4 rounded-xl bg-twin-850 hover:bg-twin-800 border border-twin-750 cursor-pointer transition-all space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <Badge variant="cyan">{doc.docType}</Badge>
                    <h4 className="font-bold text-xs text-white mt-2 leading-tight">{doc.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                      {doc.snippet}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-mono text-cyan-400 border-t border-twin-800">
                    Source: {doc.source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
