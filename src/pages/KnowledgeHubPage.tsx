import React, { useState } from 'react';
import { mockKnowledgeDocuments } from '../data/knowledgeDocuments';
import { KnowledgeDocument } from '../types';
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
} from 'lucide-react';

export const KnowledgeHubPage: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument | null>(null);
  const [copied, setCopied] = useState(false);

  const topics = [
    'All',
    'Revenue & Land Reforms',
    'Zoning & Master Plan',
    'Environmental & Wetland Protection',
    'Remote Sensing & GIS',
  ];

  const filteredDocs = mockKnowledgeDocuments.filter(doc => {
    const matchesTopic = selectedTopic === 'All' || doc.topic === selectedTopic;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.snippet.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const handleCopyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Geospatial & Land-Governance Knowledge Hub
          </h1>
          <Badge variant="purple">VECTOR REPOSITORY</Badge>
        </div>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Comprehensive legal acts, gazettes, remote-sensing technical manuals, and development authority master plans.
        </p>
      </div>

      {/* SEARCH AND TOPIC FILTERS */}
      <div className="glass-panel p-4 rounded-xl border border-twin-700/80 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by title, author, or keyword..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            className="w-full bg-twin-850 border border-twin-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedTopic === t
                  ? 'bg-purple-950 text-purple-300 border border-purple-500 font-semibold shadow-sm'
                  : 'bg-twin-850 text-slate-400 hover:text-white border border-twin-700/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* DOCUMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="glass-panel p-5 rounded-xl border border-twin-700/60 flex flex-col justify-between hover:border-cyan-500/50 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant="purple" size="sm">
                  {doc.topic}
                </Badge>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {doc.year}
                </span>
              </div>

              <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                {doc.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">{doc.author}</p>

              <p className="text-xs text-slate-300 mt-3 p-3 rounded-lg bg-twin-850 border border-twin-800 line-clamp-3 leading-relaxed">
                "{doc.snippet}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-twin-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 truncate max-w-[160px]">
                {doc.citation}
              </span>
              <button
                onClick={() => setSelectedDoc(doc)}
                className="px-2.5 py-1 rounded bg-twin-800 hover:bg-cyan-950 hover:border-cyan-500 border border-twin-700 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1"
              >
                <span>Read Excerpt</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-twin-900 border border-twin-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-twin-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <Badge variant="purple">{selectedDoc.topic}</Badge>
              <h2 className="text-xl font-bold text-white mt-2">{selectedDoc.title}</h2>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Issued by: {selectedDoc.author} • Year: {selectedDoc.year} • Jurisdiction: {selectedDoc.state}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-twin-850 border border-twin-700 text-sm text-slate-200 leading-relaxed space-y-3 font-sans">
              <h4 className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Full Statutory Provision Extract
              </h4>
              <p>{selectedDoc.snippet}</p>
              <p className="text-xs text-slate-400">
                This document chunk has been tokenized and indexed in pgvector using OpenAI text-embedding-3-large
                to power high-precision semantic land-use dispute retrieval.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-twin-950 border border-twin-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Citation: {selectedDoc.citation}</span>
              <button
                onClick={() => handleCopyCitation(selectedDoc.citation)}
                className="px-2.5 py-1 rounded bg-twin-800 hover:bg-twin-700 text-cyan-400 flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Citation'}</span>
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-lg bg-twin-800 text-slate-300 hover:text-white text-xs font-mono"
              >
                Close
              </button>
              <button
                onClick={() => alert(`Initiating mock download for ${selectedDoc.fileUri}`)}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono flex items-center gap-1.5 shadow-glow-cyan"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Gazetted Record</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
