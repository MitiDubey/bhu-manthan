import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockScenarios } from '../data/policyScenarios';
import { mockPolicyFeedbackRecords } from '../data/policyFeedback';
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
  Repeat,
  Activity,
  ArrowRight,
  Database,
  Satellite,
} from 'lucide-react';

export const PolicySimulationPage: React.FC = () => {
  const { currentScenario, setCurrentScenario, updateScenarioParams, setCurrentPage, selectParcelById } =
    useApp();

  const [activeMode, setActiveMode] = useState<'forward' | 'feedback'>('forward');
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string>(mockPolicyFeedbackRecords[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simRunCount, setSimRunCount] = useState(1);
  const [modelCalibrated, setModelCalibrated] = useState(false);

  const activeFeedback =
    mockPolicyFeedbackRecords.find(f => f.id === selectedFeedbackId) || mockPolicyFeedbackRecords[0];

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

  const handleApplyFeedbackCalibration = () => {
    setModelCalibrated(true);
    updateScenarioParams({
      urbanExpansionRate: 4.2,
      agriculturalProtectionWeight: 8,
    });
    setTimeout(() => setModelCalibrated(false), 3000);
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
  ];

  // Feedback Chart Data (Predicted vs Observed Outcome)
  const feedbackChartData = [
    {
      metric: 'Farmland Loss (ha)',
      Predicted: Math.abs(activeFeedback.predictedFarmlandLossHa),
      ActualObserved: Math.abs(activeFeedback.actualFarmlandLossHa),
    },
    {
      metric: 'Urban Built-Up (ha)',
      Predicted: activeFeedback.predictedUrbanGainHa,
      ActualObserved: activeFeedback.actualUrbanGainHa,
    },
    {
      metric: 'Revenue (₹ Cr)',
      Predicted: activeFeedback.predictedRevenueCr,
      ActualObserved: activeFeedback.actualRevenueCr,
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Dynamic Policy Simulation & Spatial Impact Engine
            </h1>
            <Badge variant="purple">MODULE 4</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Parametric land-use allocation simulator integrated with Cellular Automata, PostGIS & Real-world Feedback Loop.
          </p>
        </div>

        {/* Mode Switcher: Forward Simulation vs Feedback Loop (PDF Page 6) */}
        <div className="flex items-center p-1 rounded-xl bg-twin-900 border border-twin-700/80">
          <button
            onClick={() => setActiveMode('forward')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeMode === 'forward'
                ? 'bg-cyan-500 text-black font-bold shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Forward Simulator ("What If?")</span>
          </button>

          <button
            onClick={() => setActiveMode('feedback')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeMode === 'feedback'
                ? 'bg-purple-500 text-white font-bold shadow-glow-purple'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Policy Feedback Loop ("Predicted vs Actual")</span>
          </button>
        </div>
      </div>

      {/* STATUTORY DISCLAIMER (Required by PDF Page 6) */}
      <div className="p-3 rounded-xl bg-twin-850/80 border border-twin-700/60 text-xs font-mono text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            METHODOLOGY NOTICE: Simulation outputs are illustrative parametric projections for decision-support rather than guaranteed statutory outcomes.
          </span>
        </div>
        <span className="text-slate-500 hidden md:inline">Cellular Automata v2.4</span>
      </div>

      {/* ===================== MODE 1: FORWARD SCENARIO SIMULATION ===================== */}
      {activeMode === 'forward' && (
        <>
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
            <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-2">
              SCENARIO PRESETS:
            </span>
            {mockScenarios.map(s => {
              const isActive = currentScenario.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handlePresetSelect(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 transition-all ${
                    isActive
                      ? 'bg-twin-800 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan font-bold'
                      : 'bg-twin-900/60 text-slate-400 hover:text-white border border-twin-800'
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>

          {/* MAIN 2-COLUMN SIMULATION WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 1 Col: Parametric Policy Sliders */}
            <div className="glass-panel p-5 rounded-2xl border border-twin-700/80 space-y-6">
              <div className="flex items-center justify-between border-b border-twin-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <h2 className="font-bold text-sm text-white">Policy Levers & Constraints</h2>
                </div>
                <button
                  onClick={() => handlePresetSelect('scenario-01')}
                  className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Sliders Container */}
              <div className="space-y-5 text-xs font-mono">
                {/* Slider 1: Urban Expansion Rate */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Urban Expansion Velocity</span>
                    <span className="font-bold text-cyan-400">{params.urbanExpansionRate}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={8.0}
                    step={0.1}
                    value={params.urbanExpansionRate}
                    onChange={e => handleSliderChange('urbanExpansionRate', Number(e.target.value))}
                    className="w-full h-2 bg-twin-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>0.5% (Strict Limit)</span>
                    <span>8.0% (High Sprawl)</span>
                  </div>
                </div>

                {/* Slider 2: Green Buffer Setback */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Riparian & Green Setback</span>
                    <span className="font-bold text-emerald-400">{params.greenBufferSetback} meters</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={300}
                    step={10}
                    value={params.greenBufferSetback}
                    onChange={e => handleSliderChange('greenBufferSetback', Number(e.target.value))}
                    className="w-full h-2 bg-twin-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>30m (Statutory Min)</span>
                    <span>300m (Max Eco-Shield)</span>
                  </div>
                </div>

                {/* Slider 3: Industrial Zone Quota */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Industrial / Logistics Quota</span>
                    <span className="font-bold text-purple-400">{params.industrialZoneQuota}%</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={30}
                    step={1}
                    value={params.industrialZoneQuota}
                    onChange={e => handleSliderChange('industrialZoneQuota', Number(e.target.value))}
                    className="w-full h-2 bg-twin-950 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>2% (Agro-Only)</span>
                    <span>30% (Logistics Corridor)</span>
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
                    onChange={e =>
                      handleSliderChange('agriculturalProtectionWeight', Number(e.target.value))
                    }
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
                    {results && results.forestCoverDeltaHa > 0
                      ? `+${results.forestCoverDeltaHa}`
                      : results?.forestCoverDeltaHa}{' '}
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
        </>
      )}

      {/* ===================== MODE 2: POLICY EFFECTIVENESS FEEDBACK LOOP (PDF Page 6 & 24) ===================== */}
      {activeMode === 'feedback' && (
        <div className="space-y-6">
          {/* Header Explanation */}
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/80 flex items-start justify-between gap-4">
            <div className="space-y-1 text-xs">
              <span className="font-bold text-purple-300 font-mono text-sm flex items-center gap-2">
                <Repeat className="w-4 h-4 text-purple-400" />
                Closed-Loop Policy Effectiveness Feedback Architecture
              </span>
              <p className="text-slate-300">
                The simulator isn't just "What if?". It continuously validates past simulations against real-world
                remote-sensing outcomes:
                <span className="font-mono text-cyan-300">
                  {' '}
                  Simulation → Policy Implemented → Real-World Outcomes → Observed Satellite Data → Compare → Model Calibration
                </span>
                .
              </p>
            </div>
            {modelCalibrated && (
              <Badge variant="emerald" pulse>
                CALIBRATION APPLIED!
              </Badge>
            )}
          </div>

          {/* Historical Policy Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {mockPolicyFeedbackRecords.map(item => {
              const isSelected = selectedFeedbackId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedFeedbackId(item.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-twin-800 border-purple-400 shadow-glow-purple'
                      : 'bg-twin-850/60 border-twin-750 hover:bg-twin-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={item.effectivenessScorePct > 85 ? 'emerald' : 'amber'}>
                      {item.effectivenessScorePct}% FIDELITY
                    </Badge>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.implementedYear} → {item.evaluationYear}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-white line-clamp-2 mt-2 leading-tight">
                    {item.policyName}
                  </h4>
                  <div className="text-[10px] font-mono text-slate-400 mt-2">{item.geography}</div>
                </div>
              );
            })}
          </div>

          {/* Detailed Feedback Comparison Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart: Predicted vs Observed */}
            <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-twin-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" />
                    Predicted vs Observed Ground Reality (Sentinel-2 & Cartosat-3)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Evaluation Period: {activeFeedback.implementedYear} to {activeFeedback.evaluationYear}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-slate-400 block">Effectiveness Score</span>
                  <span className="text-xl font-bold text-purple-400 font-mono">
                    {activeFeedback.effectivenessScorePct}%
                  </span>
                </div>
              </div>

              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={feedbackChartData}>
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
                    <Bar dataKey="Predicted" fill="#A855F7" name="Simulation Predicted" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ActualObserved" fill="#10B981" name="Actual Satellite Observed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right: Model Adjustment Recommendation */}
            <div className="glass-panel p-5 rounded-2xl border border-twin-700/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-sm text-white">Model Adjustment Feed</h3>
                </div>

                <div className="p-3.5 rounded-xl bg-twin-950 border border-twin-800 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    OBSERVED SATELLITE EVIDENCE:
                  </span>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    {activeFeedback.observedEvidenceSource}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-semibold block">
                    FEEDBACK CALIBRATION DIRECTIVE:
                  </span>
                  <p className="text-slate-200 leading-relaxed font-sans">
                    {activeFeedback.modelAdjustmentNotes}
                  </p>
                </div>
              </div>

              <button
                onClick={handleApplyFeedbackCalibration}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-black font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Repeat className="w-4 h-4 text-black" />
                <span>APPLY CALIBRATION TO SIMULATOR</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
