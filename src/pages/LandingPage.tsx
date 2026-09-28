import React from 'react';
import { useApp } from '../context/AppContext';
import { WorldGlobeMap } from '../components/map/WorldGlobeMap';
import { Badge } from '../components/common/Badge';
import {
  ArrowRight,
  ShieldCheck,
  Satellite,
  Cpu,
  Layers,
  Sparkles,
  Database,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Compass,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="w-full flex flex-col space-y-16 pb-20">
      {/* HERO SECTION WITH 3D ROTATING GLOBE */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-8 lg:pt-12 text-center overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="cyan" size="md" pulse>
            SMART INDIA HACKATHON • LIVING DIGITAL TWIN FOR LAND GOVERNANCE
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="max-w-5xl text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
          From Static Maps to a Living{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            Digital Twin
          </span>
        </h1>

        {/* Subhead */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-300 mt-6 leading-relaxed">
          <strong className="text-cyan-300 font-semibold">BHU-MANTHAN</strong> unifies cadastral
          land records, multispectral satellite remote sensing, pgvector legal intelligence, and
          dynamic what-if policy simulations into an interactive command platform for modern land
          governance.
        </p>

        {/* Simulation Feature Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-twin-900/80 border border-cyan-500/30 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>PHOTOREALISTIC EARTH SIMULATION</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-twin-900/80 border border-emerald-500/30 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>SENTINEL-2 & CARTOSAT-3 ORBITS</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-twin-900/80 border border-amber-500/30 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>DAY/NIGHT TERMINATOR</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-twin-900/80 border border-purple-500/30 text-purple-300">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>VARANASI DIGITAL TWIN CORE</span>
          </div>
        </div>

        {/* 3D Rotating Living Earth Globe Simulation */}
        <div className="w-full max-w-5xl my-8">
          <WorldGlobeMap heightClass="h-[540px] md:h-[620px]" />
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 z-10">
          <button
            onClick={() => setCurrentPage('digital-twin')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm tracking-wide font-mono flex items-center gap-2 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
          >
            LAUNCH DIGITAL TWIN (VARANASI)
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentPage('dashboard')}
            className="px-6 py-3.5 rounded-xl bg-twin-850 hover:bg-twin-800 border border-twin-700 hover:border-slate-500 text-slate-100 font-semibold text-sm transition-all"
          >
            VIEW EXECUTIVE DASHBOARD
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 text-slate-500 flex flex-col items-center gap-1 animate-bounce text-xs font-mono">
          <span>SCROLL TO EXPLORE ARCHITECTURE</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* SECTION 2: THE 3 CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="emerald">CORE CAPABILITIES</Badge>
          <h2 className="text-3xl font-bold text-white mt-3">
            Next-Generation Decision Support Architecture
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Built for district collectors, revenue departments, town planners, and environmental
            auditors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-cyan-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
              <Satellite className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Continuous Satellite Change Audits</h3>
            <p className="text-slate-400 text-xs leading-relaxed mt-2.5">
              Sentinel-2 and Cartosat-3 multispectral imagery feeds automatically detect unauthorized
              construction, soil grading, and water body shrinkage with up to 96% AI confidence.
            </p>
            <div className="mt-4 pt-4 border-t border-twin-800 flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>NDVI / NDWI Indices</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Cadastral PostGIS Digital Twin</h3>
            <p className="text-slate-400 text-xs leading-relaxed mt-2.5">
              Every Khasra parcel is treated as a dynamic entity holding historical land-use
              evolution (2018–2025), ownership provenance, and zoning setback compliance in 2D and
              3D.
            </p>
            <div className="mt-4 pt-4 border-t border-twin-800 flex items-center justify-between text-xs font-mono text-emerald-400">
              <span>Sub-Meter Precision</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Dynamic What-If Policy Simulation</h3>
            <p className="text-slate-400 text-xs leading-relaxed mt-2.5">
              Simulate the ripple effects of urban growth rates, eco-buffer setbacks, and industrial
              quotas on agricultural security, carbon offsets, and revenue before issuing government
              gazettes.
            </p>
            <div className="mt-4 pt-4 border-t border-twin-800 flex items-center justify-between text-xs font-mono text-purple-400">
              <span>5-Year Projections</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: RECOMMENDED DATA ARCHITECTURE FLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel p-8 rounded-2xl border border-twin-700/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-twin-800">
            <div>
              <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                SYSTEM ARCHITECTURE (SECTION 2 & 3)
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Unified Geospatial Pipeline & Decision Stack
              </h3>
            </div>
            <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>FastAPI Backend Ready</span>
            </div>
          </div>

          {/* Pipeline Step Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-twin-850/80 border border-twin-700/60">
              <div className="font-mono text-xs text-cyan-400 mb-1">01. INGESTION</div>
              <div className="font-bold text-white text-sm">Raw Data Lake (S3)</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Sentinel-2 MSI, Cartosat-3, drone orthophotos, Bhulekh Land Records & PDF gazettes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-twin-850/80 border border-twin-700/60">
              <div className="font-mono text-xs text-emerald-400 mb-1">02. PERSISTENCE</div>
              <div className="font-bold text-white text-sm">PostgreSQL + PostGIS</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Cadastral geometry polygons, spatial indexing, change event logs, and pgvector embeddings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-twin-850/80 border border-twin-700/60">
              <div className="font-mono text-xs text-purple-400 mb-1">03. INTELLIGENCE</div>
              <div className="font-bold text-white text-sm">FastAPI + AI Services</div>
              <p className="text-[11px] text-slate-400 mt-1">
                NDVI change scoring, RAG legal search across revenue codes, and scenario simulation equations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-twin-850/80 border border-twin-700/60">
              <div className="font-mono text-xs text-amber-400 mb-1">04. DECISION SUPPORT</div>
              <div className="font-bold text-white text-sm">Digital Twin UI</div>
              <p className="text-[11px] text-slate-400 mt-1">
                MapLibre / Leaflet 2D/3D map, contextual parcel drawers, and human-in-the-loop verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SIH DEMO QUICK LAUNCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-twin-900 via-twin-850 to-twin-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs text-cyan-400 font-semibold">
                RECOMMENDED 6-STEP DEMO SEQUENCE
              </span>
            </div>
            <h4 className="text-xl font-bold text-white">
              Ready to present the Smart India Hackathon Demo?
            </h4>
            <p className="text-slate-400 text-xs mt-1 max-w-xl">
              Follow the curated walkthrough: Landing Globe → Digital Twin Parcel Selection →
              Historical NDVI Evidence → Policy Simulation What-If → Land Updates Verification.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('digital-twin')}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono tracking-wider shrink-0 shadow-glow-cyan transition-all"
          >
            START DEMO FLOW
          </button>
        </div>
      </section>
    </div>
  );
};
