import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockKnowledgeDocuments } from '../data/knowledgeDocuments';
import { KnowledgeDocument, KnowledgeDocType } from '../types';
import { Badge } from '../components/common/Badge';
import {
  BookOpen,
  Search,
  Filter,
  FileText,
  Download,
  ExternalLink,
  Shield,
  Calendar,
  X,
  Copy,
  Check,
  Tag,
  MapPin,
  Sparkles,
  Layers,
  Building,
} from 'lucide-react';

export const KnowledgeHubPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDocType, setSelectedDocType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument | null>(null);
  const [copied, setCopied] = useState(false);

  const docTypes: (KnowledgeDocType | 'All')[] = [
    'All',
    'Research Papers',
    'Policy Documents',
    'Legal Documents',
    'Datasets',
    'Case Studies',
    'Project Reports',
    'GIS Resources',
    'Satellite Resources',
  ];

  const topics = [
    'All',
    'Revenue & Land Reforms',
    'Zoning & Master Plan',
    'Environmental & Wetland Protection',
    'Remote Sensing & GIS',
  ];

  const years = ['All', '2024', '2023', '2022', '2020'];
  const locations = ['All', 'Uttar Pradesh', 'National'];

  const filteredDocs = mockKnowledgeDocuments.filter(doc => {
    const matchesTopic = selectedTopic === 'All' || doc.topic === selectedTopic;
    const matchesDocType = selectedDocType === 'All' || doc.docType === selectedDocType;
    const matchesYear = selectedYear === 'All' || doc.year.toString() === selectedYear;
    const matchesLocation = selectedLocation === 'All' || doc.state === selectedLocation;

    const query = searchFilter.toLowerCase();
    const matchesSearch =
      doc.title.toLowerCase().includes(query) ||
      doc.author.toLowerCase().includes(query) ||
      doc.source.toLowerCase().includes(query) ||
      doc.snippet.toLowerCase().includes(query) ||
      (doc.keywords && doc.keywords.some(k => k.toLowerCase().includes(query)));

    return matchesTopic && matchesDocType && matchesYear && matchesLocation && matchesSearch;
  });

  const handleCopyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Geospatial & Land-Governance Knowledge Hub
            </h1>
            <Badge variant="purple">MODULE 6</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Full-text repository of Acts, Gazettes, Master Plans, Research Papers, Datasets & Satellite Technical Guides.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('ai-research')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-black font-semibold text-xs font-mono flex items-center gap-2 shadow-glow-cyan transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Ask AI Research Assistant</span>
        </button>
      </div>

      {/* DOCUMENT TYPE CATEGORY CHIPS (PDF Page 8) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
        <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
          DOC CATEGORY:
        </span>
        {docTypes.map(type => {
          const isActive = selectedDocType === type;
          return (
            <button
              key={type}
              onClick={() => setSelectedDocType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 transition-all ${
                isActive
                  ? 'bg-cyan-500 text-black font-bold shadow-glow-cyan'
                  : 'bg-twin-850 hover:bg-twin-800 text-slate-300 border border-twin-700/80'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* MULTI-FILTER CONTROL BAR (PDF Page 8: Topic, Location, Year, Source, Keywords) */}
      <div className="glass-panel p-4 rounded-xl border border-twin-700/80 flex flex-col lg:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search title, keywords, source..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            className="w-full bg-twin-850 border border-twin-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Topic Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
              className="bg-twin-850 border border-twin-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
            >
              {topics.map(t => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Topics' : t}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="bg-twin-850 border border-twin-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Jurisdictions' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="bg-twin-850 border border-twin-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
            >
              {years.map(y => (
                <option key={y} value={y}>
                  {y === 'All' ? 'All Years' : y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* DOCUMENT GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>INDEXED PUBLICATIONS ({filteredDocs.length} FOUND)</span>
          <span>CLICK ANY CARD TO INSPECT METADATA & CITATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map(doc => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="glass-panel p-5 rounded-2xl border border-twin-700/80 hover:border-cyan-500/60 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan">{doc.docType}</Badge>
                  <span className="text-[10px] font-mono text-slate-400">{doc.year}</span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans">
                  {doc.snippet}
                </p>

                {/* Keywords Chips */}
                {doc.keywords && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {doc.keywords.slice(0, 3).map((kw, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-twin-800 text-slate-400"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-twin-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="truncate max-w-[160px] text-[11px]">{doc.source}</span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOCUMENT DETAIL MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-twin-900 border border-twin-700/80 rounded-2xl shadow-2xl overflow-hidden space-y-4">
            <div className="p-5 border-b border-twin-700/80 bg-twin-950 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="purple">{selectedDoc.docType}</Badge>
                  <span className="text-xs font-mono text-slate-400">{selectedDoc.version}</span>
                </div>
                <h2 className="text-base font-bold text-white leading-snug">{selectedDoc.title}</h2>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-twin-800 transition-colors ml-3 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono max-h-[70vh] overflow-y-auto">
              <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-750 space-y-2">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  STATUTORY ABSTRACT / EXECUTIVE SUMMARY:
                </span>
                <p className="text-slate-200 leading-relaxed font-sans text-xs">
                  {selectedDoc.snippet}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">AUTHOR / ISSUING BODY</span>
                  <span>{selectedDoc.author}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">GAZETTE SOURCE</span>
                  <span>{selectedDoc.source}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">JURISDICTION</span>
                  <span>
                    {selectedDoc.district}, {selectedDoc.state}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">ACCESS PERMISSION</span>
                  <span className="text-emerald-400">{selectedDoc.accessLevel}</span>
                </div>
              </div>

              {/* Citation Box with One-Click Copy */}
              <div className="p-3.5 rounded-xl bg-twin-950 border border-twin-800 space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  <span>FORMAL STATUTORY CITATION:</span>
                  <button
                    onClick={() => handleCopyCitation(selectedDoc.citation)}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono normal-case"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Citation!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="font-mono text-cyan-300 text-xs bg-black/40 p-2.5 rounded border border-twin-800">
                  {selectedDoc.citation}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-twin-700/80 bg-twin-950 flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentPage('ai-research');
                  setSelectedDoc(null);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Legal Assistant about this Act</span>
              </button>

              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl bg-twin-800 hover:bg-twin-700 text-slate-300 text-xs font-mono transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
