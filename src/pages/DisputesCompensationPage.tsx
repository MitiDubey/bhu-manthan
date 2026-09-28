import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import {
  mockDisputeCompensationData,
  ParcelDisputeCompensationOverview,
} from '../data/disputesCompensation';
import {
  Scale,
  ShieldAlert,
  DollarSign,
  Clock,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileText,
  X,
  Database,
  ArrowUpRight,
} from 'lucide-react';

export const DisputesCompensationPage: React.FC = () => {
  const { selectParcelById, setCurrentPage } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisputeStatus, setSelectedDisputeStatus] = useState('All');
  const [selectedCompStatus, setSelectedCompStatus] = useState('All');
  const [activeTimelineItem, setActiveTimelineItem] =
    useState<ParcelDisputeCompensationOverview | null>(null);

  // Filtered parcels
  const filteredData = mockDisputeCompensationData.filter(item => {
    const matchesSearch =
      item.khasraNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.parcelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ulpIn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dispute.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDispute =
      selectedDisputeStatus === 'All' || item.dispute.status === selectedDisputeStatus;

    const matchesComp =
      selectedCompStatus === 'All' || item.compensation.status === selectedCompStatus;

    return matchesSearch && matchesDispute && matchesComp;
  });

  // Calculate high-level aggregates
  const totalSanctioned = mockDisputeCompensationData.reduce(
    (sum, i) => sum + i.compensation.sanctionedAmountInr,
    0
  );
  const totalDisbursed = mockDisputeCompensationData.reduce(
    (sum, i) => sum + i.compensation.disbursedAmountInr,
    0
  );
  const totalPending = mockDisputeCompensationData.reduce(
    (sum, i) => sum + i.compensation.pendingAmountInr,
    0
  );
  const activeDisputesCount = mockDisputeCompensationData.filter(
    i => i.dispute.status === 'Active Litigation' || i.dispute.status === 'Revenue Court Sub-Judice'
  ).length;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Dispute & Compensation Intelligence
            </h1>
            <Badge variant="rose">MODULE 8</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Unified adjudication tracking: State Revenue Courts (UP-RCCMS), NJDG Judicial Grid & CPGRAMS compensation escrow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-twin-850 border border-twin-700/80 text-xs font-mono text-slate-300">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>NJDG / RCCMS SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Litigation Count */}
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400">Active Disputes Under Adjudication</span>
            <div className="text-2xl font-bold text-rose-400 mt-1">
              {activeDisputesCount} <span className="text-xs font-normal text-slate-400">Sub-Judice</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 font-mono">
              <span>High Court & Tehsildar Benches</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-950/80 text-rose-400 border border-rose-800">
            <Scale className="w-5 h-5" />
          </div>
        </div>

        {/* Total Compensation Sanctioned */}
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400">Sanctioned Land Awards</span>
            <div className="text-2xl font-bold text-white mt-1">
              ₹{(totalSanctioned / 10000000).toFixed(2)}{' '}
              <span className="text-xs font-normal text-slate-400">Cr</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-mono">
              <span>RFCTLARR 2013 Framework</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Compensation Disbursed */}
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400">Disbursed via DBT to Landholders</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              ₹{(totalDisbursed / 10000000).toFixed(2)}{' '}
              <span className="text-xs font-normal text-slate-400">Cr</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aadhaar-Linked DBT Cleared</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Escrow Held */}
        <div className="glass-panel p-4 rounded-xl border border-twin-700/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400">Escrow Held Pending Dispute</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              ₹{(totalPending / 100000).toFixed(1)}{' '}
              <span className="text-xs font-normal text-slate-400">Lakhs</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Avg Delay: 412 Days</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="glass-panel p-4 rounded-xl border border-twin-700/80 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Khasra, ULPIN, Case No, CNR..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-twin-850 border border-twin-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Dispute Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDisputeStatus}
              onChange={e => setSelectedDisputeStatus(e.target.value)}
              className="bg-twin-850 border border-twin-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Dispute States</option>
              <option value="Active Litigation">Active Litigation</option>
              <option value="Revenue Court Sub-Judice">Revenue Sub-Judice</option>
              <option value="Resolved">Resolved</option>
              <option value="No Dispute">No Dispute (Clean Title)</option>
            </select>
          </div>

          {/* Compensation Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <select
              value={selectedCompStatus}
              onChange={e => setSelectedCompStatus(e.target.value)}
              className="bg-twin-850 border border-twin-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Compensation States</option>
              <option value="Fully Disbursed">Fully Disbursed</option>
              <option value="Escrow Held / Pending Dispute">Escrow Held</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>
        </div>
      </div>

      {/* DISPUTE & COMPENSATION CARDS / TABLE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>PARCEL ADJUDICATION DOSSIERS ({filteredData.length} TOTAL)</span>
          <span>CLICK ANY PARCEL TO VIEW CASE TIMELINE OR LAUNCH DIGITAL TWIN</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredData.map(item => (
            <div
              key={item.parcelId}
              className="glass-panel p-5 rounded-2xl border border-twin-700/80 hover:border-cyan-500/60 transition-all space-y-4"
            >
              {/* Row 1: Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-twin-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-twin-800 border border-twin-700 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                    {item.khasraNo.split(' ')[1] || 'KH'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{item.khasraNo}</span>
                      <span className="text-xs font-mono text-cyan-400">({item.parcelCode})</span>
                      <Badge
                        variant={
                          item.dispute.status === 'Active Litigation'
                            ? 'rose'
                            : item.dispute.status === 'Revenue Court Sub-Judice'
                            ? 'amber'
                            : item.dispute.status === 'Resolved'
                            ? 'emerald'
                            : 'slate'
                        }
                      >
                        {item.dispute.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{item.ownerName}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-300">ULPIN: {item.ulpIn}</span>
                      <span>•</span>
                      <span>{item.areaHa} ha</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {item.dispute.timeline.length > 0 && (
                    <button
                      onClick={() => setActiveTimelineItem(item)}
                      className="px-3 py-1.5 rounded-lg bg-twin-800 hover:bg-twin-750 border border-twin-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Judicial Timeline ({item.dispute.timeline.length})</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      selectParcelById(item.parcelId);
                      setCurrentPage('digital-twin');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open in Digital Twin</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Row 2: Split Columns - Dispute Intelligence on Left & Compensation Intelligence on Right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Dispute Details */}
                <div className="p-3.5 rounded-xl bg-twin-850/80 border border-twin-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-rose-400" />
                      DISPUTE PROFILE
                    </span>
                    <span className="text-rose-400 font-semibold">{item.dispute.category}</span>
                  </div>

                  <div className="space-y-1 font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Case Ref / CNR:</span>
                      <span className="text-slate-200">{item.dispute.caseNumber}</span>
                    </div>
                    {item.dispute.cnrNumber && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">NJDG CNR:</span>
                        <span className="text-cyan-400">{item.dispute.cnrNumber}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Forum / Authority:</span>
                      <span className="text-slate-300 text-right truncate max-w-[200px]" title={item.dispute.authority}>
                        {item.dispute.authority}
                      </span>
                    </div>
                    {item.dispute.nextHearingDate && (
                      <div className="flex justify-between text-amber-400">
                        <span>Next Cause List Date:</span>
                        <span className="font-bold">{item.dispute.nextHearingDate}</span>
                      </div>
                    )}
                    <div className="pt-1 text-[11px] text-slate-400 font-sans border-t border-twin-800">
                      <span className="text-slate-500">Litigants: </span>
                      {item.dispute.partiesInvolved}
                    </div>
                  </div>
                </div>

                {/* Right: Compensation Details */}
                <div className="p-3.5 rounded-xl bg-twin-850/80 border border-twin-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      COMPENSATION & ESCROW STATUS
                    </span>
                    <Badge
                      variant={
                        item.compensation.status === 'Fully Disbursed'
                          ? 'emerald'
                          : item.compensation.status === 'Escrow Held / Pending Dispute'
                          ? 'amber'
                          : 'slate'
                      }
                    >
                      {item.compensation.status}
                    </Badge>
                  </div>

                  <div className="space-y-1 font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scheme:</span>
                      <span className="text-slate-200 truncate max-w-[220px]" title={item.compensation.schemeName}>
                        {item.compensation.schemeName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sanctioned Award:</span>
                      <span className="text-white font-bold">
                        ₹{item.compensation.sanctionedAmountInr > 0 ? item.compensation.sanctionedAmountInr.toLocaleString('en-IN') : 'N/A'}
                      </span>
                    </div>
                    {item.compensation.pendingAmountInr > 0 && (
                      <div className="flex justify-between text-amber-400">
                        <span>Escrow Held Amount:</span>
                        <span className="font-bold">
                          ₹{item.compensation.pendingAmountInr.toLocaleString('en-IN')} ({item.compensation.pendingDurationDays} days held)
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">DBT Clearance:</span>
                      <span className={item.compensation.dbtStatus === 'Credited' ? 'text-emerald-400' : 'text-amber-400'}>
                        {item.compensation.dbtStatus}
                      </span>
                    </div>
                    <div className="pt-1 text-[11px] text-slate-400 font-sans border-t border-twin-800">
                      <span className="text-slate-500">Competent Authority: </span>
                      {item.compensation.competentAuthority}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JUDICIAL TIMELINE MODAL */}
      {activeTimelineItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-twin-900 border border-twin-700/80 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-twin-700/80 bg-twin-950 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">
                    Hearing Timeline: {activeTimelineItem.khasraNo} ({activeTimelineItem.dispute.caseNumber})
                  </h2>
                  <Badge variant="amber">NJDG SYNCED</Badge>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {activeTimelineItem.dispute.authority}
                </p>
              </div>
              <button
                onClick={() => setActiveTimelineItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-twin-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
              <div className="relative pl-6 border-l-2 border-twin-700 space-y-6">
                {activeTimelineItem.dispute.timeline.map((event, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-twin-900" />
                    <div className="p-4 rounded-xl bg-twin-850 border border-twin-700/70 space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-cyan-400">{event.stage}</span>
                        <span className="text-slate-400">{event.date}</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans">
                        {event.orderSummary}
                      </p>
                      <div className="text-[11px] text-slate-400 font-mono pt-1">
                        Coram: {event.courtAuthority}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-twin-700/80 bg-twin-950 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveTimelineItem(null)}
                className="px-4 py-2 rounded-xl bg-twin-800 hover:bg-twin-700 text-xs font-mono text-slate-200 transition-colors"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  selectParcelById(activeTimelineItem.parcelId);
                  setCurrentPage('digital-twin');
                  setActiveTimelineItem(null);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono flex items-center gap-1.5 shadow-glow-cyan transition-all"
              >
                <span>Inspect in Digital Twin</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
