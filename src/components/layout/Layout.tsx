import React from 'react';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-twin-950 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <TopNavbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[#070A11]">
          {children}
        </main>
      </div>
    </div>
  );
};
