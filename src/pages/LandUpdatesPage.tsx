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
  ShieldAlert,
  Scale,
  FileCheck2,
  Lock,
  X,
  Search,
  CheckCircle2,
  Clock,
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
  const [queueFilter, setQueueFilter] = useState<'All' | 'Authorized Reviewer' | 'Review Queue' | 'Monitoring / Batch Review'>('All');
  
  // Official Review Modal State
  const [isSignoffModalOpen, setIsSignoffModalOpen] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<'Approve' | 'Reject'>('Approve');
  const [orderNo, setOrderNo] = useState('VNS/REV/2025/MUT-092');
  const [reviewerName, setReviewerName] = useState('Dr. S. K. Pathak (Tehsildar Sarnath)');
  const [reviewNotes, setReviewNotes] = useState('Ground verification confirmed change against local Girdawari ledger.');

  const filteredEvents = changeEvents.filter(e => {
    if (queueFilter === 'All') return true;
    return e.reviewerQueue === queueFilter;
  });

  const activeEvent =
    changeEvents.find(e => e.id === activeEventId) || filteredEvents[0] || changeEvents[0];

  const handleOpenSignoff = (decision: 'Approve' | 'Reject') => {
    setReviewDecision(decision);
    setIsSignoffModalOpen(true);
  };

  const handleConfirmSignoff = () => {
    if (reviewDecision === 'Approve') {
      approveChangeEvent(activeEvent.id);
    } else {
      rejectChangeEvent(activeEvent.id);
    }
    setIsSignoffModalOpen(false);
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
              Satellite Change Verification & Prioritization Queue
            </h1>
            <Badge variant="rose" pulse>
              HUMAN-IN-THE-LOOP
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Module 3: Multi-tiered verification prioritization scoring before mutating official PostGIS digital twin records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="md">
            {changeEvents.filter(e => e.status === 'Pending Verification').length} PENDING REVIEW
          </Badge>
        </div>
      </div>

      {/* STATUTORY GOVERNANCE BANNER (Explicitly required by PDF Page 4 & 23) */}
      <div className="p-3.5 rounded-xl bg-twin-900 border border-cyan-500/30 flex items-start gap-3 text-xs font-mono">
        <Scale className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-slate-300">
          <span className="font-bold text-cyan-300">LEGAL GOVERNANCE PRINCIPLE: </span>
          Remote-sensing observations serve strictly as corroborative physical evidence rather than autonomous legal authority.
          Official records are never mutated automatically without authorized human reviewer sign-off under the UP Revenue Code.
        </div>
      </div>

      {/* PRIORITIZATION QUEUE TABS */}
      <div className="flex items-center gap-2 border-b border-twin-700/80 pb-2 overflow-x-auto select-none">
        <button
          onClick={() => setQueueFilter('All')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            queueFilter === 'All'
              ? 'bg-twin-800 text-white border border-twin-600 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All Detections ({changeEvents.length})
        </button>

        <button
          onClick={() => setQueueFilter('Authorized Reviewer')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
            queueFilter === 'Authorized Reviewer'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 font-bold shadow-glow-rose'
              : 'text-rose-400 hover:bg-twin-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <span>High Priority (Authorized Reviewer)</span>
        </button>

        <button
          onClick={() => setQueueFilter('Review Queue')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
            queueFilter === 'Review Queue'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
              : 'text-amber-400 hover:bg-twin-800'
          }`}
        >
          <span>Medium Priority (Review Queue)</span>
        </button>

        <button
          onClick={() => setQueueFilter('Monitoring / Batch Review')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
            queueFilter === 'Monitoring / Batch Review'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
              : 'text-slate-400 hover:bg-twin-800'
          }`}
        >
          <span>Low Priority (Batch Review)</span>
        </button>
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
                    <Badge
                      variant={
                        activeEvent.status === 'Approved'
                          ? 'emerald'
                          : activeEvent.status === 'Rejected'
                          ? 'slate'
                          : 'rose'
                      }
                    >
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

              {/* MODULE 3 PRIORITIZATION PIPELINE METRICS BREAKDOWN (PDF Page 3) */}
              <div className="p-4 rounded-xl bg-twin-950 border border-twin-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-twin-800/80 pb-2">
                  <span className="text-slate-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    PRIORITIZATION SCORING ENGINE
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Composite Score:</span>
                    <span className="text-lg font-bold text-cyan-400">
                      {activeEvent.priorityScore}/100
                    </span>
                    <Badge
                      variant={
                        activeEvent.priorityScore > 85
                          ? 'rose'
                          : activeEvent.priorityScore > 65
                          ? 'amber'
                          : 'slate'
                      }
                    >
                      {activeEvent.reviewerQueue}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px]">1. AI CONFIDENCE</span>
                    <span className="text-white font-bold">{activeEvent.confidence}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">2. CHANGE MAGNITUDE</span>
                    <span
                      className={`font-bold ${
                        activeEvent.changeMagnitude === 'High'
                          ? 'text-rose-400'
                          : activeEvent.changeMagnitude === 'Medium'
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {activeEvent.changeMagnitude}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">3. DATA QUALITY</span>
                    <span className="text-slate-300 font-medium">{activeEvent.dataQuality}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">4. GOVERNANCE IMPACT</span>
                    <span
                      className={`font-bold ${
                        activeEvent.governanceRelevance === 'High'
                          ? 'text-rose-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {activeEvent.governanceRelevance}
                    </span>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE BEFORE / AFTER SLIDER */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-emerald-400 font-semibold">
                    ◀ BASELINE: {activeEvent.previousClass}
                  </span>
                  <span className="text-slate-500">DRAG SLIDER TO REVEAL SATELLITE EVIDENCE</span>
                  <span className="text-rose-400 font-semibold">
                    DETECTED: {activeEvent.newDetectedClass} ▶
                  </span>
                </div>

                {/* Slider Container */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-twin-700 select-none">
                  {/* After Image */}
                  <img
                    src={activeEvent.evidenceUriAfter}
                    alt="Detected Current Imagery"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-rose-950/80 border border-rose-800 text-rose-300 px-2 py-1 rounded text-[10px] font-mono">
                    2025 Cartosat-3 (High Res)
                  </div>

                  {/* Before Image */}
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

              {/* Event Description & Surveyor Details */}
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
                {activeEvent.verifiedBy && (
                  <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5 border-t border-twin-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      Signed off by {activeEvent.verifiedBy} under Order #{activeEvent.verificationOrderNo}
                    </span>
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
                    onClick={() => handleOpenSignoff('Approve')}
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
                    <span>DISPATCH FIELD SURVEY</span>
                  </button>

                  <button
                    onClick={() => handleOpenSignoff('Reject')}
                    disabled={activeEvent.status === 'Rejected'}
                    className="px-4 py-2.5 rounded-xl bg-twin-850 hover:bg-rose-950/60 border border-twin-700 hover:border-rose-800 text-rose-400 font-semibold text-xs font-mono flex items-center gap-2 transition-all ml-auto"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>REJECT AS FALSE POSITIVE</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Filtered Queue List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>DETECTIONS LIST ({filteredEvents.length})</span>
            <span>CLICK TO INSPECT</span>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
            {filteredEvents.map(event => {
              const isSelected = event.id === activeEventId;
              return (
                <div
                  key={event.id}
                  onClick={() => setActiveEventId(event.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-twin-800/90 border-cyan-400 shadow-glow-cyan'
                      : 'glass-panel border-twin-750 hover:bg-twin-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Badge
                          variant={
                            event.status === 'Approved'
                              ? 'emerald'
                              : event.status === 'Rejected'
                              ? 'slate'
                              : event.priorityScore > 85
                              ? 'rose'
                              : 'amber'
                          }
                        >
                          {event.status}
                        </Badge>
                        <span className="text-[10px] font-mono text-slate-400">
                          {event.priorityScore} Pts
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{event.khasraNo}</h4>
                      <p className="text-xs text-slate-300 font-mono">{event.parcelCode}</p>
                    </div>

                    <div className="text-right font-mono text-[10px] text-slate-400">
                      <div>{event.detectionDate}</div>
                      <div className="text-cyan-400 font-semibold mt-1">{event.confidence}% AI</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {event.detectedType}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FORMAL AUTHORIZED REVIEW SIGNOFF MODAL */}
      {isSignoffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-twin-900 border border-twin-700/80 rounded-2xl shadow-2xl overflow-hidden space-y-4">
            <div className="p-5 border-b border-twin-700/80 bg-twin-950 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-cyan-400" />
                  Official Revenue Adjudication Sign-Off
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Record Mutation Order • {activeEvent.khasraNo} ({activeEvent.parcelCode})
                </p>
              </div>
              <button
                onClick={() => setIsSignoffModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-twin-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-400 uppercase">Review Decision:</label>
                <div className="text-base font-bold text-cyan-400">
                  {reviewDecision === 'Approve'
                    ? 'Mutate Digital Twin Land Use to ' + activeEvent.newDetectedClass
                    : 'Reject Change as Sensor Anomaly / False Positive'}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 uppercase">Statutory Order Reference Number:</label>
                <input
                  type="text"
                  value={orderNo}
                  onChange={e => setOrderNo(e.target.value)}
                  className="w-full bg-twin-950 border border-twin-700 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 uppercase">Authorized Reviewing Officer:</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={e => setReviewerName(e.target.value)}
                  className="w-full bg-twin-950 border border-twin-700 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 uppercase">Official Resolution Notes:</label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={e => setReviewNotes(e.target.value)}
                  className="w-full bg-twin-950 border border-twin-700 rounded-lg p-3 text-white font-sans text-xs"
                />
              </div>
            </div>

            <div className="p-4 border-t border-twin-700/80 bg-twin-950 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsSignoffModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-twin-800 hover:bg-twin-750 text-slate-300 text-xs font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSignoff}
                className={`px-5 py-2 rounded-xl text-black font-bold text-xs font-mono shadow-lg transition-all ${
                  reviewDecision === 'Approve'
                    ? 'bg-emerald-400 hover:bg-emerald-300'
                    : 'bg-rose-400 hover:bg-rose-300'
                }`}
              >
                {reviewDecision === 'Approve' ? 'CONFIRM & EXECUTE MUTATION' : 'CONFIRM REJECTION'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
