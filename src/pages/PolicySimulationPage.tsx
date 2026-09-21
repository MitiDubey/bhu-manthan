import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockScenarios } from '../data/policyScenarios';
import { Badge } from '../components/common/Badge';
import confetti from 'canvas-confetti';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Sliders,
  Play,
  RotateCcw,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Trees,
  Wheat,
  Building2,
  DollarSign,
  Leaf,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const PolicySimulationPage: React.FC = () => {
  const { currentScenario, setCurrentScenario, updateScenarioParams, setCurrentPage, selectParcelById } = useApp();
  const [isSimulating, setIsSimulating] = useState(false);
  const [simRunCount, setSimRunCount] = useState(1);

  const params = currentScenario.parameters;
  const results = currentScenario.results;

  const handleSliderChange = (field: keyof typeof params, value: number) => {
    updateScenarioParams({ [field]: value });
  };

  const handlePresetSelect = (presetId: string) => {
    const found = mockScenarios.find(s => s.id === presetId);
    if (found) {
      setCurrentScenario(found);
    }
  };

  const executeSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimRunCount(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00F0FF', '#10B981', '#F59E0B'],
      });
    }, 800);
  };

  // Comparison Chart Data (Baseline vs Projected)
  const comparisonData = [
    {
      metric: 'Urban Built-Up (ha)',
      Baseline: 750,
      Projected: results ? results.urbanGrowthHa : 900,
    },
    {
      metric: 'Farmland Loss (ha)',
      Baseline: -600,
      Projected: results ? results.agriculturalLossHa : -750,
    },
    {
      metric: 'Forest / Buffer (ha)',
      Baseline: 50,
      Projected: results ? results.forestCoverDeltaHa : 110,
    },
    {
      metric: 'Carbon Offset (k-Tons)',
      Baseline: 2.1,
      Projected: results ? Number((results.carbonOffsetTonsDelta / 1000).toFixed(1)) : 4.5,
    },
    {
      metric: 'Tax Rev (₹ Cr)',
      Baseline: 210,
      Projected: results ? results.revenueImpactCrores : 340,
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What-If Policy Simulation Engine
            </h1>
            <Badge variant="purple">AI SIMULATOR</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Model zoning revisions, buffer ordinances, and peri-urban expansion impacts before enactment.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">PRESETS:</span>
          {mockScenarios.map(s => (
            <button
              key={s.id}
              onClick={() => handlePresetSelect(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                currentScenario.id === s.id
                  ? 'bg-purple-950 text-purple-300 border border-purple-500 font-semibold shadow-sm'
                  : 'bg-twin-850 text-slate-400 hover:text-white border border-twin-700/60'
              }`}
            >
              {s.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* TOP GRID: SCENARIO PARAMETERS ON LEFT, PROJECTED IMPACT KPIS ON RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Dynamic Policy Parameter Sliders */}
        <div className="glass-panel p-5 rounded-xl border border-twin-700/80 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-twin-800">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Scenario Control Parameters
            </h2>
            <Badge variant="cyan">Target 2030</Badge>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Slider 1: Urban Expansion */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Urban Growth Velocity (%/yr)</span>
                <span className="font-bold text-cyan-400">{params.urbanExpansionRate}%</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={8.0}
                step={0.1}
                value={params.urbanExpansionRate}
                onChange={e => handleSliderChange('urbanExpansionRate', Number(e.target.value))}
                className="w-full h-2 bg-twin-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1.0% (Controlled)</span>
                <span>8.0% (Rapid Sprawl)</span>
              </div>
            </div>

            {/* Slider 2: Green Buffer Setback */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>River/Wetland Buffer Setback</span>
                <span className="font-bold text-emerald-400">{params.greenBufferSetback} m</span>
              </div>
              <input
                type="range"
                min={30}
                max={250}
                step={10}
                value={params.greenBufferSetback}
                onChange={e => handleSliderChange('greenBufferSetback', Number(e.target.value))}
                className="w-full h-2 bg-twin-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>30m (Relaxed)</span>
                <span>250m (Strict NGT)</span>
              </div>
            </div>

            {/* Slider 3: Industrial Quota */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Industrial Zone Ceiling</span>
                <span className="font-bold text-purple-400">{params.industrialZoneQuota}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={params.industrialZoneQuota}
                onChange={e => handleSliderChange('industrialZoneQuota', Number(e.target.value))}
                className="w-full h-2 bg-twin-950 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>5% (Agro-only)</span>
                <span>30% (Heavy Logistics)</span>
              </div>
            </div>

            {/* Slider 4: Agricultural Protection */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Farmland Protection Weight</span>
                <span className="font-bold text-amber-400">{params.agriculturalProtectionWeight}/10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={params.agriculturalProtectionWeight}
                onChange={e => handleSliderChange('agriculturalProtectionWeight', Number(e.target.value))}
                className="w-full h-2 bg-twin-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 (Free Conversion)</span>
                <span>10 (Total Moratorium)</span>
              </div>
            </div>
          </div>

          {/* Action Button: Run Simulation */}
          <button
            onClick={executeSimulation}
            disabled={isSimulating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            {isSimulating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-black" />
                <span>SOLVING POSTGIS EQUATIONS...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black" />
                <span>EXECUTE POLICY SIMULATION (RUN #{simRunCount})</span>
              </>
            )}
          </button>
        </div>

        {/* Right 2 Cols: Dynamic Impact Cards & Comparison Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* 4 Impact Summary KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/60 font-mono">
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Urban Growth</span>
              </div>
              <div className="text-xl font-bold text-white">
                +{results?.urbanGrowthHa}{' '}
                <span className="text-[10px] font-normal text-slate-400">ha</span>
              </div>
              <span className="text-[10px] text-slate-500">Projected expansion</span>
            </div>

            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/60 font-mono">
              <div className="flex items-center gap-1.5 text-rose-400 text-xs mb-1">
                <Wheat className="w-3.5 h-3.5" />
                <span>Agri Farmland</span>
              </div>
              <div className="text-xl font-bold text-rose-400">
                {results?.agriculturalLossHa}{' '}
                <span className="text-[10px] font-normal text-slate-400">ha</span>
              </div>
              <span className="text-[10px] text-slate-500">Displaced cropland</span>
            </div>

            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/60 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs mb-1">
                <Trees className="w-3.5 h-3.5" />
                <span>Buffer Forest</span>
              </div>
              <div className="text-xl font-bold text-emerald-400">
                {results && results.forestCoverDeltaHa > 0 ? `+${results.forestCoverDeltaHa}` : results?.forestCoverDeltaHa}{' '}
                <span className="text-[10px] font-normal text-slate-400">ha</span>
              </div>
              <span className="text-[10px] text-slate-500">Riparian canopy</span>
            </div>

            <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/60 font-mono">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs mb-1">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Revenue Delta</span>
              </div>
              <div className="text-xl font-bold text-amber-400">
                ₹{results?.revenueImpactCrores}{' '}
                <span className="text-[10px] font-normal text-slate-400">Cr</span>
              </div>
              <span className="text-[10px] text-slate-500">Municipal tax base</span>
            </div>
          </div>

          {/* Comparative Baseline vs Projected Recharts Bar Chart */}
          <div className="glass-panel p-5 rounded-xl border border-twin-700/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Baseline 2025 vs 2030 Policy Projection Metrics
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time multi-dimensional trade-off simulation across Varanasi Peri-Urban Sector
                </p>
              </div>
              <Badge variant="emerald">Live Synchronized</Badge>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <XAxis dataKey="metric" stroke="#64748b" fontSize={11} />
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
                  <Bar dataKey="Baseline" fill="#475569" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Projected" fill="#00F0FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: IMPACTED PARCELS SAMPLER & DIRECT NAVIGATION */}
      <div className="glass-panel p-5 rounded-xl border border-twin-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="font-bold text-sm text-white">
              Estimated Affected Parcels Under Selected Parameters ({results?.affectedParcelsCount} Total)
            </h3>
            <p className="text-xs text-slate-400">
              Parcels requiring zoning re-notification or compulsory green setback adaptation.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('digital-twin')}
            className="px-3 py-1.5 rounded-lg bg-twin-800 hover:bg-twin-700 text-xs font-mono text-cyan-400 border border-twin-700 flex items-center gap-1 self-start"
          >
            View on Digital Twin Map →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
          <div
            onClick={() => {
              selectParcelById('parcel-002');
              setCurrentPage('digital-twin');
            }}
            className="p-3 rounded-lg bg-twin-850 hover:bg-twin-800 border border-twin-700 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between text-slate-200 font-semibold">
              <span>Khasra 413/Ga</span>
              <span className="text-rose-400">High Impact</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Falls directly within the enlarged {params.greenBufferSetback}m riparian conservation corridor.
            </p>
          </div>

          <div
            onClick={() => {
              selectParcelById('parcel-006');
              setCurrentPage('digital-twin');
            }}
            className="p-3 rounded-lg bg-twin-850 hover:bg-twin-800 border border-twin-700 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between text-slate-200 font-semibold">
              <span>Khasra 417/3</span>
              <span className="text-amber-400">Moderate Impact</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Industrial agro-logistics warehouse subject to {params.industrialZoneQuota}% zoning ceiling.
            </p>
          </div>

          <div
            onClick={() => {
              selectParcelById('parcel-001');
              setCurrentPage('digital-twin');
            }}
            className="p-3 rounded-lg bg-twin-850 hover:bg-twin-800 border border-twin-700 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between text-slate-200 font-semibold">
              <span>Khasra 412/1</span>
              <span className="text-emerald-400">Protected</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Preserved multi-crop farmland under agricultural protection weight {params.agriculturalProtectionWeight}/10.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
