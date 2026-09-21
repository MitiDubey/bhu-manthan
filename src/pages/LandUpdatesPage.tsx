import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { ChangeEvent } from '../types';
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  UserPlus,
  ArrowRight,
  Eye,
  Sliders,
  Calendar,
  Sparkles,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const LandUpdatesPage: React.FC = () => {
  const {
    changeEvents,
    approveChangeEvent,
    rejectChangeEvent,
    dispatchSurvey,
    selectParcelById,
    setCurrentPage,
  } = useApp();

  const [activeEventId, setActiveEventId] = useState<string>(changeEvents[0]?.id || '');
  const [sliderPos, setSliderPos] = useState<number>(50);

  const activeEvent = changeEvents.find(e => e.id === activeEventId) || changeEvents[0];

  const handleApprove = (id: string) => {
    approveChangeEvent(id);
  };

  const handleReject = (id: string) => {
    rejectChangeEvent(id);
  };

  const handleDispatch = (id: string) => {
    const surveyor = prompt('Enter field surveyor name or Kanungo circle:', 'Kanungo Circle 2 Officer');
    if (surveyor) {
      dispatchSurvey(id, surveyor);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Satellite Change Verification Queue
            </h1>
            <Badge variant="rose" pulse>
              HUMAN-IN-THE-LOOP
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Review AI remote-sensing change detections before mutating official PostGIS digital twin records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="md">
            {changeEvents.filter(e => e.status === 'Pending Verification').length} PENDING REVIEW
          </Badge>
        </div>
      </div>

      {/* MAIN TWO-COLUMN SPLIT: ACTIVE EVENT REVIEW ON LEFT & QUEUE LIST ON RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Before/After Split Comparison & Review Actions */}
        <div className="lg:col-span-2 space-y-6">
          {activeEvent && (
            <div className="glass-panel p-6 rounded-2xl border border-twin-700/80 space-y-6">
              {/* Event Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-twin-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={activeEvent.status === 'Approved' ? 'emerald' : activeEvent.status === 'Rejected' ? 'slate' : 'rose'}>
                      {activeEvent.status}
                    </Badge>
                    <span className="font-mono text-xs text-slate-400">
                      ID: {activeEvent.id} • {activeEvent.detectionDate}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {activeEvent.khasraNo} ({activeEvent.parcelCode})
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">{activeEvent.location}</p>
                </div>

                <button
                  onClick={() => {
                    selectParcelById(activeEvent.parcelId);
                    setCurrentPage('digital-twin');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-twin-850 hover:bg-twin-800 border border-twin-700 text-xs font-mono text-cyan-400 flex items-center gap-1.5 self-start"
                >
                  <span>Open in Digital Twin</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* INTERACTIVE BEFORE / AFTER SLIDER */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-emerald-400 font-semibold">◀ BASELINE: {activeEvent.previousClass}</span>
                  <span className="text-slate-500">DRAG SLIDER TO REVEAL SATELLITE EVIDENCE</span>
                  <span className="text-rose-400 font-semibold">DETECTED: {activeEvent.newDetectedClass} ▶</span>
                </div>

                {/* Slider Container */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-twin-700 select-none">
                  {/* After Image (Full background) */}
                  <img
                    src={activeEvent.evidenceUriAfter}
                    alt="Detected Current Imagery"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-rose-950/80 border border-rose-800 text-rose-300 px-2 py-1 rounded text-[10px] font-mono">
                    2025 Cartosat-3 (High Res)
                  </div>

                  {/* Before Image (Clipped overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden border-r-2 border-cyan-400 shadow-[2px_0_10px_rgba(0,240,255,0.6)]"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={activeEvent.evidenceUriBefore}
                      alt="Baseline Historical Imagery"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="absolute top-3 left-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-2 py-1 rounded text-[10px] font-mono">
                      2022 Sentinel-2 Baseline
                    </div>
                  </div>

                  {/* Slider scrub input */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderPos}
                    onChange={e => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>
              </div>

              {/* Event Description & AI Confidence */}
              <div className="p-4 rounded-xl bg-twin-850 border border-twin-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">
                    AI Change Detection Finding
                  </span>
                  <Badge variant="cyan">AI CONFIDENCE: {activeEvent.confidence}%</Badge>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {activeEvent.description}
                </p>
                {activeEvent.assignedSurveyor && (
                  <div className="pt-2 text-xs font-mono text-cyan-300 flex items-center gap-1.5 border-t border-twin-800">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Assigned Field Inspector: {activeEvent.assignedSurveyor}</span>
                  </div>
                )}
              </div>

              {/* REVIEW DECISION ACTION BAR */}
              <div className="pt-2 border-t border-twin-800">
                <span className="font-mono text-xs text-slate-400 block mb-3 font-semibold">
                  OFFICIAL REVENUE REVIEW DECISION:
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleApprove(activeEvent.id)}
                    disabled={activeEvent.status === 'Approved'}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs font-mono flex items-center gap-2 transition-all ${
                      activeEvent.status === 'Approved'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 opacity-60'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-glow-emerald'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>APPROVE & MUTATE TWIN STATE</span>
                  </button>

                  <button
                    onClick={() => handleDispatch(activeEvent.id)}
                    className="px-4 py-2.5 rounded-xl bg-twin-850 hover:bg-twin-800 border border-twin-700 text-slate-200 font-semibold text-xs font-mono flex items-center gap-2 transition-all"
                  >
                    <UserPlus className="w-4 h-4 text-cyan-400" />
                    <span>DISPATCH GROUND TRUTH SURVEY</span>
                  </button>

                  <button
                    onClick={() => handleReject(activeEvent.id)}
                    disabled={activeEvent.status === 'Rejected'}
                    className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 text-rose-300 font-semibold text-xs font-mono flex items-center gap-2 transition-all ml-auto"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>REJECT AS ANOMALY</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Queue List */}
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-twin-700/80">
            <h3 className="font-bold text-sm text-white mb-1 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-cyan-400" />
              Incoming Detections Queue ({changeEvents.length})
            </h3>
            <p className="text-xs text-slate-400">Select an item below to inspect evidence</p>

            <div className="space-y-3 mt-4">
              {changeEvents.map(event => {
                const isSelected = activeEvent?.id === event.id;
                return (
                  <div
                    key={event.id}
                    onClick={() => setActiveEventId(event.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-twin-800 border-cyan-400 shadow-glow-cyan'
                        : 'bg-twin-850/80 hover:bg-twin-800 border-twin-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-white">{event.khasraNo}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
                          event.status === 'Approved'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : event.status === 'Field Survey Dispatched'
                            ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-1">{event.detectedType}</p>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 pt-2 border-t border-twin-800">
                      <span>{event.detectionDate}</span>
                      <span className="text-cyan-400">AI Conf: {event.confidence}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
