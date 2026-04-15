import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLedger } from '../context/LedgerContext';
import { Search, Globe, User, Database, ChevronRight, Trash2 } from 'lucide-react';
import ProfileCard3D from './ProfileCard3D';

const Ledger = () => {
  const { identities, deleteFromLedger } = useLedger();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = identities.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.sdgFocus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Search & Discovery List */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase mb-4">
              Regional Talent Node // Global Ledger View
            </div>
            <h1 className="text-4xl font-black mb-2">Discovery Portal</h1>
            <p className="text-gray-500 text-sm max-w-md">
              Browse the decentralized ledger of world-impact professionals. Click a node to view their verified digital identity.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or SDG focus..." 
              className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-indigo-500 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {filtered.length === 0 ? (
              <div className="glass-panel p-12 text-center text-gray-600 italic text-sm">
                No matching identities found on this node.
              </div>
            ) : (
              filtered.map(user => (
                <motion.div 
                  key={user.id}
                  layout
                  className={`glass-panel p-5 flex items-center justify-between cursor-pointer transition-all border ${selectedUser?.id === user.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 hover:border-white/20'}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-indigo-400">
                        {user.firstName[0]}{user.lastName[0]}
                     </div>
                     <div>
                        <h3 className="text-sm font-bold">{user.firstName} {user.lastName}</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{user.sdgFocus}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                       <div className="text-xs font-black text-indigo-400">94<span className="text-[8px] text-gray-600">/100</span></div>
                       <div className="text-[8px] font-mono text-gray-700">{user.hash.substring(0,8).toUpperCase()}</div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteFromLedger(user.id); if(selectedUser?.id === user.id) setSelectedUser(null); }}
                      className="p-2 hover:text-red-500 text-gray-700 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    <ChevronRight size={18} className="text-gray-700" />
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-white/5 opacity-40 grayscale pointer-events-none">
             <div className="flex flex-col">
                <span className="text-xl font-black text-white">{identities.length}</span>
                <span className="text-[8px] uppercase font-bold tracking-widest">Active Nodes</span>
             </div>
             <div className="h-8 w-px bg-white/10" />
             <div className="flex flex-col">
                <span className="text-xl font-black text-white">4.2TB</span>
                <span className="text-[8px] uppercase font-bold tracking-widest">Shard Size</span>
             </div>
          </div>
        </div>

        {/* Right: Live View of the selected user */}
        <div className="lg:w-1/2 min-h-[600px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedUser ? (
                <motion.div 
                  key={selectedUser.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ProfileCard3D data={selectedUser} />
                </motion.div>
              ) : (
                <div className="text-center space-y-4 opacity-20">
                   <Globe size={80} className="mx-auto text-indigo-500 animate-spin-slow" />
                   <p className="text-sm font-bold uppercase tracking-[0.3em]">Select a node to view proof</p>
                </div>
              )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Ledger;
