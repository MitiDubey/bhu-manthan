import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple' | 'slate';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'sm',
  pulse = false
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/80',
    emerald: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80',
    amber: 'bg-amber-950/80 text-amber-400 border-amber-800/80',
    rose: 'bg-rose-950/80 text-rose-400 border-rose-800/80',
    purple: 'bg-purple-950/80 text-purple-400 border-purple-800/80',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
  };

  const dotColors = {
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    purple: 'bg-purple-400',
    slate: 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border transition-all ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`} />
        </span>
      )}
      {children}
    </span>
  );
};
