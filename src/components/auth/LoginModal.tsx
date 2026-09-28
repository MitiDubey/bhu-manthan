import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  ShieldCheck,
  UserCheck,
  Lock,
  Key,
  CheckCircle2,
  X,
  ExternalLink,
  Building,
  GraduationCap,
  Scale,
  Cpu,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoleDefinition {
  id: string;
  title: string;
  badge: string;
  department: string;
  icon: React.ElementType;
  permissions: string[];
  accessLevel: 'Full Control' | 'High Authority' | 'Research & Simulation' | 'Public Read-Only';
}

const ROLES: RoleDefinition[] = [
  {
    id: 'District Magistrate / Collector',
    title: 'District Magistrate / Collector (DM)',
    badge: 'Executive Authority',
    department: 'Revenue & District Administration, Varanasi',
    icon: Building,
    permissions: [
      'Approve statutory land mutations',
      'Authorize compensation escrow releases',
      'Issue master plan zoning overrides',
      'Execute district-wide policy simulations',
    ],
    accessLevel: 'Full Control',
  },
  {
    id: 'Authorized Reviewer (Tehsildar)',
    title: 'Authorized Reviewer (Tehsildar / SDM)',
    badge: 'Revenue Magistrate',
    department: 'Tehsil Sarnath Revenue Court & Girdawari Section',
    icon: Scale,
    permissions: [
      'Sign off on satellite verification queue',
      'Issue spot inspection notices to Lekhpals',
      'Adjudicate boundary contestations under Sec 24',
      'Mutate digital twin cadastral boundaries',
    ],
    accessLevel: 'High Authority',
  },
  {
    id: 'Town Planning Officer',
    title: 'Town Planning Officer (VDA)',
    badge: 'Zoning & Master Plan',
    department: 'Varanasi Development Authority (VDA)',
    icon: ShieldCheck,
    permissions: [
      'Model Master Plan 2031 growth corridors',
      'Run infrastructure & urban density scenarios',
      'Enforce ASI & Varuna floodplain buffers',
      'Audit commercial ribbon developments',
    ],
    accessLevel: 'High Authority',
  },
  {
    id: 'GIS Analyst',
    title: 'Senior Geospatial Analyst',
    badge: 'Remote Sensing',
    department: 'Remote Sensing Applications Centre (RSAC-UP)',
    icon: Cpu,
    permissions: [
      'Calibrate Sentinel-2 & Cartosat-3 pipelines',
      'Configure LULC change detection models',
      'Query PostGIS spatial vector database',
      'Export multi-spectral NDVI/NDWI rasters',
    ],
    accessLevel: 'Research & Simulation',
  },
  {
    id: 'Researcher',
    title: 'Academic Researcher / Urban Planner',
    badge: 'Academic & RAG',
    department: 'IIT (BHU) Geoinformatics & Land Economics Lab',
    icon: GraduationCap,
    permissions: [
      'Query AI Legal Research RAG assistant',
      'Access longitudinal 2019-2025 analytics datasets',
      'Export anonymized land parcel ledgers',
      'Simulate agro-ecological policy outcomes',
    ],
    accessLevel: 'Research & Simulation',
  },
  {
    id: 'Public User',
    title: 'Citizen / Landholder / Public User',
    badge: 'Citizen Portal',
    department: 'Public Land Records & Grievance Portal',
    icon: UserCheck,
    permissions: [
      'Search Khasra records & Bhu-Aadhaar ULPIN',
      'View 2D/3D digital twin public layers',
      'Check status of compensation & land disputes',
      'Submit CPGRAMS land grievance inquiries',
    ],
    accessLevel: 'Public Read-Only',
  },
];

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { userRole, setUserRole } = useApp();
  const [selectedRoleId, setSelectedRoleId] = useState(userRole);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  if (!isOpen) return null;

  const currentRoleObj = ROLES.find(r => r.id === selectedRoleId) || ROLES[0];

  const handleSwitchSession = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setUserRole(selectedRoleId);
      setIsAuthenticating(false);
      setAuthSuccess(true);
      setTimeout(() => {
        setAuthSuccess(false);
        onClose();
      }, 900);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-twin-900 border border-twin-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-twin-700/80 bg-twin-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-twin-950 rounded-[10px] flex items-center justify-center">
                <Lock className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Bhu-Manthan RBAC Governance & Session Portal
                </h2>
                <Badge variant="cyan">JWT AUTH</Badge>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Role-Based Access Control • PostGIS & FastAPI Security Layer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-twin-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Active JWT Session Pill */}
          <div className="p-3.5 rounded-xl bg-twin-850 border border-twin-700/60 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">ACTIVE SESSION TOKEN:</span>
              <span className="text-cyan-400 font-semibold truncate max-w-[200px]">
                eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
              </span>
            </div>
            <span className="text-slate-400">EXPIRES: 8H 00M</span>
          </div>

          {/* Role Selection Grid */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold block">
              SELECT AUTHORIZED ROLE TO ASSUME:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLES.map(role => {
                const Icon = role.icon;
                const isSelected = selectedRoleId === role.id;
                return (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRoleId(role.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-twin-800 border-cyan-400 shadow-glow-cyan'
                        : 'bg-twin-850/60 border-twin-750 hover:bg-twin-800/60 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-twin-750 text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-white">{role.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{role.badge}</div>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Role Permissions Inspector */}
          <div className="p-4 rounded-xl bg-twin-950 border border-twin-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-cyan-400" />
                  Privileges for {currentRoleObj.title}
                </span>
                <span className="text-[11px] text-slate-400 block font-mono">
                  {currentRoleObj.department}
                </span>
              </div>
              <Badge variant={currentRoleObj.accessLevel === 'Full Control' ? 'rose' : 'cyan'}>
                {currentRoleObj.accessLevel}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-twin-800">
              {currentRoleObj.permissions.map((perm, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{perm}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-twin-700/80 bg-twin-950 flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Complies with Digital Personal Data Protection (DPDP) Act 2023</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-twin-800 hover:bg-twin-700 text-xs font-mono text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSwitchSession}
              disabled={isAuthenticating}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono flex items-center gap-2 shadow-glow-cyan transition-all"
            >
              {isAuthenticating ? (
                <span>ISSUING SESSION TOKEN...</span>
              ) : authSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>SESSION ESTABLISHED!</span>
                </>
              ) : (
                <span>SWITCH ROLE SESSION</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
