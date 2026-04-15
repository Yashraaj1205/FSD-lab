import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLedger } from '../context/LedgerContext';
import IdentityForm from './IdentityForm';
import ProfileCard3D from './ProfileCard3D';
import ImpactCalculator from './ImpactCalculator';
import { Database, Share2, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SyncPortal = () => {
  const { syncIdentity, activeIdentity } = useLedger();
  const [isSynced, setIsSynced] = useState(false);

  const handleSync = (data) => {
    syncIdentity(data);
    setIsSynced(true);
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        {!isSynced && !activeIdentity ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.1, scale: 1.05 }}
            className="grid lg:grid-cols-2 gap-20 items-center"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                Identity Integration // Phase 01
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
                Synchronize your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">World Purpose.</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed max-w-md font-light">
                Fill in your professional parameters. This data will be hashed and broadcasted to the local node to prove your global contribution.
              </p>

              <div className="glass-panel p-6 border-indigo-500/10 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <AlertCircle className="text-indigo-400" size={20} />
                 </div>
                 <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest leading-relaxed">
                    Once synced, your identity becomes discoverable on the <Link to="/ledger" className="text-indigo-400 hover:underline">Global Ledger</Link>.
                 </p>
              </div>
            </div>
            <IdentityForm onSync={handleSync} />
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
             <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                    Live Orbit Node // SECURE
                  </div>
                  <button onClick={() => setIsSynced(false)} className="text-[9px] font-bold uppercase tracking-widest text-gray-700 hover:text-white transition-colors">
                     Back to Sync
                  </button>
                </div>
                
                <ImpactCalculator />

                <div className="glass-panel p-8 space-y-6 relative overflow-hidden">
                  <Sparkles className="absolute -right-4 -top-4 text-indigo-500/10 rotate-12" size={80} />
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Node Performance</h3>
                    <div className="flex items-center gap-1.5">
                       <span className="text-[10px] font-bold text-gray-600 uppercase">Hashed</span>
                       <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-emerald-500 shadow-xl" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">
                    Your contribution metrics are now synchronized. Any global node can verify your SROI score in real-time.
                  </p>
                  <div className="flex gap-4">
                    <Link to="/ledger" className="flex-grow btn-premium text-[10px] uppercase tracking-[0.2em] gap-2 py-4">
                       Explore Global Pool <Database size={14} />
                    </Link>
                  </div>
                </div>
             </div>

             <ProfileCard3D data={activeIdentity || {}} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SyncPortal;
