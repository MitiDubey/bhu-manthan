import React from 'react';
import { useApp } from '../context/AppContext';
import { historicalLandUseTrends, districtComparisons } from '../data/analyticsData';
import { Badge } from '../components/common/Badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  Download,
  FileSpreadsheet,
  Layers,
  MapPin,
  Calendar,
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Longitudinal Land-Use Analytics
            </h1>
            <Badge variant="cyan">2019–2025 TRENDS</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Time-series telemetry on urban conversion velocity, deforestation, and water body preservation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting Varanasi Peri-Urban Land Ledger to CSV...')}
            className="px-3.5 py-2 rounded-lg bg-twin-850 hover:bg-twin-800 border border-twin-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => alert('Generating Executive Cadastral Summary PDF...')}
            className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-glow-cyan"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Download Audit Report</span>
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 font-mono">
          <span className="text-xs text-slate-400">Agricultural Area Shift (6-Yr)</span>
          <div className="text-2xl font-bold text-rose-400 mt-1 flex items-baseline gap-2">
            <span>-2,550 ha</span>
            <span className="text-xs text-rose-500">(-17.9%)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Consequent to Ring Road Ph-2 development</p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 font-mono">
          <span className="text-xs text-slate-400">Urban Residential Velocity</span>
          <div className="text-2xl font-bold text-cyan-400 mt-1 flex items-baseline gap-2">
            <span>+2,750 ha</span>
            <span className="text-xs text-cyan-500">(+61.1%)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Average sprawl rate of +4.5% / year</p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 font-mono">
          <span className="text-xs text-slate-400">Commercial / Logistics Expansion</span>
          <div className="text-2xl font-bold text-amber-400 mt-1 flex items-baseline gap-2">
            <span>+1,600 ha</span>
            <span className="text-xs text-amber-500">(+133.3%)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">High conversion pressure around Sarnath</p>
        </div>
      </div>

      {/* TIME SERIES STACKED AREA CHART */}
      <div className="glass-panel p-5 rounded-xl border border-twin-700/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Land-Use Composition Trajectory (Hectares)
            </h2>
            <p className="text-xs text-slate-400">
              Annual classified breakdown derived from co-registered Sentinel-2 and Landsat missions
            </p>
          </div>
          <Badge variant="slate">Multi-Spectral Sensor Fusion</Badge>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalLandUseTrends}>
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
              <Area type="monotone" dataKey="agriculture" name="Agricultural Farmland" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="urbanResidential" name="Urban Residential" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="commercial" name="Commercial / Logistics" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Area type="monotone" dataKey="forest" name="Forest & Green Buffers" stackId="1" stroke="#059669" fill="#059669" fillOpacity={0.6} />
              <Area type="monotone" dataKey="waterBodies" name="Wetlands & Water" stackId="1" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TEHSIL LEVEL COMPARISON TABLE */}
      <div className="glass-panel p-5 rounded-xl border border-twin-700/80 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Tehsil & Sub-District Geospatial Compliance Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Aggregated across Varanasi revenue subdivisions
            </p>
          </div>
          <Badge variant="emerald">5 Sub-divisions Audited</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-twin-850 text-slate-400 border-b border-twin-800">
              <tr>
                <th className="p-3">Tehsil Name</th>
                <th className="p-3">Total Parcels</th>
                <th className="p-3">Monitored Area</th>
                <th className="p-3">Agricultural %</th>
                <th className="p-3">Zoning Compliance</th>
                <th className="p-3">Active Alerts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-twin-800 text-slate-200">
              {districtComparisons.map((item, idx) => (
                <tr key={idx} className="hover:bg-twin-850/60 transition-colors">
                  <td className="p-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {item.tehsil}
                  </td>
                  <td className="p-3">{item.totalParcels.toLocaleString()}</td>
                  <td className="p-3">{item.monitoredAreaHa.toLocaleString()} ha</td>
                  <td className="p-3">{item.agriculturalPct}%</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        item.complianceRate >= 90
                          ? 'text-emerald-400 bg-emerald-950/60'
                          : 'text-amber-400 bg-amber-950/60'
                      }`}
                    >
                      {item.complianceRate}%
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-rose-400 font-bold">{item.alertCount} Flags</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
