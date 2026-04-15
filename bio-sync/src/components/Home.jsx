import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Share2, Database, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase">
            Phase 1 // Public Exhibition Mode
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
            Your Talent. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-pulse">Global Impact.</span>
          </h1>

          <p className="text-gray-400 text-xl max-w-lg leading-relaxed font-light">
            Synchronize your professional skills with the worlds most critical challenges. Build an identity that proves your contribution to a sustainable future.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/sync" className="btn-premium group px-8 py-5 text-lg">
              Synchronize Now 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="glass-panel px-8 py-5 text-lg font-bold flex items-center gap-2 hover:bg-white/5 transition-all">
              Learn More <Share2 size={18} className="text-indigo-400" />
            </Link>
          </div>

          <div className="flex items-center gap-8 pt-12 border-t border-white/5">
             <div className="flex flex-col gap-1">
                <span className="text-2xl font-black text-white">99%</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-none">Accuracy Rate</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-2xl font-black text-white">1.2M</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-none">Global Nodes</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-2xl font-black text-white">SDG</span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-none">Validated</span>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          {/* Floating UI Elements for decoration */}
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          
          <div className="glass-panel p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
               <Sparkles className="text-indigo-400 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                     <ShieldCheck className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Secure Identity</h3>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Lumina Protocol v1.4</p>
                  </div>
               </div>
               
               <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                     <span>Global Impact Score</span>
                     <span>98.4% Verified</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-full bg-indigo-500" 
                     />
                  </div>
               </div>

               <div className="flex gap-3">
                  <div className="flex-grow glass-panel p-4 flex items-center gap-3">
                     <Database size={16} className="text-gray-500" />
                     <span className="text-xs font-bold text-gray-400">HASHED ON LEDGER</span>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
