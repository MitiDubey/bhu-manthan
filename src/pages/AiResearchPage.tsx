import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockKnowledgeDocuments, mockAiQueries } from '../data/knowledgeDocuments';
import { Badge } from '../components/common/Badge';
import {
  Search,
  Sparkles,
  BookOpen,
  FileText,
  ExternalLink,
  ShieldCheck,
  Cpu,
  ChevronRight,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const AiResearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeResult, setActiveResult] = useState<{
    answer: string;
    confidence: number;
    citations: string[];
    sourceDocIds: string[];
  } | null>(mockAiQueries['commercial']);
  const [isSearching, setIsSearching] = useState(false);

  const sampleQuestions = [
    { text: 'Can agricultural land in Varanasi Sarnath be converted to commercial warehousing without Sec 80?', key: 'commercial' },
    { text: 'What are the legal setback distances for wetlands and river Varuna floodplains under NGT directives?', key: 'wetland' },
    { text: 'What restrictions apply to construction inside the Sarnath Archaeological Monument buffer?', key: 'sarnath' },
  ];

  const handleSearch = (qText: string) => {
    setIsSearching(true);
    setQuery(qText);
    setTimeout(() => {
      const lower = qText.toLowerCase();
      if (lower.includes('wetland') || lower.includes('flood') || lower.includes('water')) {
        setActiveResult(mockAiQueries['wetland']);
      } else if (lower.includes('sarnath') || lower.includes('monument') || lower.includes('archaeolog')) {
        setActiveResult(mockAiQueries['sarnath']);
      } else {
        setActiveResult(mockAiQueries['commercial']);
      }
      setIsSearching(false);
    }, 500);
  };

  const citedDocs = mockKnowledgeDocuments.filter(doc =>
    activeResult?.sourceDocIds.includes(doc.id)
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Land-Governance Legal Intelligence
          </h1>
          <Badge variant="cyan">pgvector RAG</Badge>
        </div>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Semantic vector search across state revenue codes, gazettes, Master Plan 2031, and Supreme Court/NGT precedents.
        </p>
      </div>

      {/* Query Search Bar */}
      <div className="glass-panel p-4 rounded-xl border border-twin-700/80 space-y-3">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (query.trim()) handleSearch(query);
          }}
          className="relative flex items-center"
        >
          <Search className="w-5 h-5 text-cyan-400 absolute left-4" />
          <input
            type="text"
            placeholder="Ask a legal/geospatial governance question (e.g. 'Is warehousing permitted in Varuna flood plain?')..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-twin-850 border border-twin-700 rounded-xl pl-12 pr-32 py-3.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
          />
          <button
            type="submit"
            className="absolute right-2.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 shadow-glow-cyan"
          >
            {isSearching ? (
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>QUERY</span>
          </button>
        </form>

        {/* Sample Prompt Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="font-mono text-[11px] text-slate-500">SAMPLE QUERIES:</span>
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(sq.text)}
              className="px-2.5 py-1 rounded-md bg-twin-850 hover:bg-twin-800 border border-twin-700/60 text-slate-300 hover:text-cyan-300 text-[11px] transition-colors"
            >
              {sq.text.substring(0, 48)}...
            </button>
          ))}
        </div>
      </div>

      {/* AI SYNTHESIZED RESPONSE */}
      {activeResult && (
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-twin-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">AI Legal Analysis & Statutory Synthesis</h2>
                <span className="text-[11px] font-mono text-slate-400">
                  Vector Retrieval: cosine similarity over 1,420 tokenized legal chunks
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="emerald" size="sm">
                CONFIDENCE: {activeResult.confidence}%
              </Badge>
              <Badge variant="cyan" size="sm">
                VERIFIED CITATIONS
              </Badge>
            </div>
          </div>

          {/* Answer Text */}
          <div className="text-sm text-slate-200 leading-relaxed space-y-3 font-sans">
            <p className="bg-twin-850/60 p-4 rounded-xl border border-twin-700/60">
              {activeResult.answer}
            </p>
          </div>

          {/* Statutory Citations Badges */}
          <div className="pt-2">
            <span className="font-mono text-xs text-slate-400 block mb-2 font-semibold">
              OFFICIAL STATUTORY CITATIONS:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeResult.citations.map((cite, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-twin-850 border border-twin-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{cite}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CITED PRIMARY SOURCE DOCUMENTS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Cited Primary Legal Documents & Master Plans ({citedDocs.length})
          </h3>
          <span className="text-xs font-mono text-slate-400">pgvector Retrieved Chunks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {citedDocs.map(doc => (
            <div
              key={doc.id}
              className="glass-panel p-5 rounded-xl border border-twin-700/60 flex flex-col justify-between hover:border-cyan-500/50 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="purple" size="sm">
                    {doc.topic}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-400">{doc.year}</span>
                </div>

                <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                  {doc.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-mono">{doc.author}</p>

                <p className="text-xs text-slate-300 mt-3 p-2.5 rounded bg-twin-850 border border-twin-800 line-clamp-3 leading-relaxed">
                  "{doc.snippet}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-twin-800 flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 truncate max-w-[200px]">{doc.citation}</span>
                <button className="text-slate-400 hover:text-white flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                  <span>View Full Doc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
