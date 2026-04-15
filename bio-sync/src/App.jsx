import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LedgerProvider } from './context/LedgerContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SyncPortal from './components/SyncPortal';
import Ledger from './components/Ledger';

function App() {
  const location = useLocation();

  return (
    <LedgerProvider>
      <div className="relative min-h-screen">
        {/* Background Aura Layers */}
        <div className="mesh-aura">
          <div className="w-[60vw] h-[60vw] bg-indigo-600/10 top-[-20%] left-[-10%]" />
          <div className="w-[50vw] h-[50vw] bg-purple-600/10 bottom-[-10%] right-[-10%]" />
        </div>

        <Navbar />

        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/sync" element={<SyncPortal />} />
              <Route path="/about" element={<About />} />
              <Route path="/ledger" element={<Ledger />} />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="py-20 px-8 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/5 mt-20">
          <div className="flex items-center gap-3 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
             <span className="text-2xl font-black italic tracking-tighter">BioSync.</span>
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-l border-white/20 pl-4 py-1 leading-none">
                Lumina Talent Protocol<br/>Exhibition Node v2025
             </span>
          </div>
          
          <div className="flex gap-10 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
             <a href="#" className="hover:text-indigo-400 transition-colors">Whitepaper</a>
             <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Ledger</a>
             <a href="#" className="hover:text-indigo-400 transition-colors">SDG International</a>
          </div>

          <div className="text-[10px] font-mono text-gray-800 tracking-tighter">
             SECURE_NODE::7A_92_F4_CC
          </div>
        </footer>
      </div>
    </LedgerProvider>
  );
}

export default App;
