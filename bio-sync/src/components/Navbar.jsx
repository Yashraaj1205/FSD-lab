import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, LayoutGrid, Info, Zap, Globe } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-auto">
      <div className="glass-panel px-7 py-3.5 flex items-center gap-9 border border-white/10 shadow-indigo-500/10 backdrop-blur-3xl">
        <NavLink to="/" className="flex items-center gap-2.5 mr-5 group">
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-600/40 group-hover:scale-110 transition-transform">
            <Shield className="text-white w-4.5 h-4.5" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic text-white">
            Bio<span className="text-indigo-500">Sync</span>.
          </span>
        </NavLink>

        <div className="flex items-center gap-7">
          <NavLink to="/" className={({ isActive }) => `nav-link flex items-center gap-2 ${isActive ? 'active' : ''}`}>
            <Zap size={14} /> Home
          </NavLink>
          <NavLink to="/sync" className={({ isActive }) => `nav-link flex items-center gap-2 ${isActive ? 'active' : ''}`}>
            <LayoutGrid size={14} /> Sync Portal
          </NavLink>
          <NavLink to="/ledger" className={({ isActive }) => `nav-link flex items-center gap-2 ${isActive ? 'active' : ''}`}>
            <Globe size={14} /> Talent Ledger
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link flex items-center gap-2 ${isActive ? 'active' : ''}`}>
            <Info size={14} /> About
          </NavLink>
        </div>

        <div className="h-4 w-px bg-white/15 mx-2" />

        <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] hidden lg:block">
           Exhibition Active <span className="text-emerald-500 animate-pulse ml-1.5 shadow-emerald-500 shadow-2xl">●</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
