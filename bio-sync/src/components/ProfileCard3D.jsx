import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Zap, Rotate3d, Heart, Download, Globe } from 'lucide-react';

const ProfileCard3D = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Helper to safely get data
  const get = (path, fallback = "NOT SYNCHRONIZED") => {
    const parts = path.split('.');
    let current = data;
    for (const part of parts) {
      if (current && current[part]) current = current[part];
      else return fallback;
    }
    return current || fallback;
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `impact_proof_${data.lastName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div 
        className="card-container w-[400px] h-[600px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div 
          className="relative w-full h-full preserve-3d transition-all duration-700"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front: Personal Brand & Objectives */}
          <div className="absolute w-full h-full backface-hidden glass-panel p-8 flex flex-col justify-between border-indigo-500/20 shadow-indigo-500/10 shadow-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-bold uppercase">
                  {get('firstName')[0]}{get('lastName')[0]}
                </div>
                <div className="text-right">
                  <div className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-bold ring-1 ring-indigo-500/30 uppercase tracking-widest">
                    SYNC_ID: {data.hash ? data.hash.toUpperCase() : 'PENDING'}
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {get('firstName')} <span className="text-indigo-500">{get('lastName')}</span>
                </h1>
                <p className="text-indigo-400 font-medium text-sm mt-1 uppercase tracking-widest flex items-center gap-1">
                   <Zap size={14} /> Global Impact Strategist
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Heart size={14} /> Mission Summary
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "{get('summary') || 'To leverage disruptive innovation for global sustainability and social equity.'}"
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                   <Briefcase size={14} /> Career Node
                </h3>
                <div className="border-l-2 border-indigo-500/30 pl-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold">{get('experience.role')}</h4>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">
                        {get('experience.company')} • {get('experience.period')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-indigo-400">
                <Rotate3d size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Click to flip</span>
              </div>
              <button 
                onClick={handleDownload}
                className="p-2 bg-white/5 hover:bg-indigo-500/20 rounded-lg transition-colors border border-white/10"
              >
                 <Download size={16} className="text-indigo-400" />
              </button>
            </div>
          </div>

          {/* Back: Education & Skills */}
          <div 
            className="absolute w-full h-full backface-hidden glass-panel p-8 flex flex-col justify-between border-indigo-500/20"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                   <GraduationCap size={16} /> Academic Archive
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="text-sm font-bold text-indigo-400">{get('education.degree')}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                        {get('education.institute')} • {get('education.year')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                   <Award size={16} /> Verified Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {get('skills', 'Community,SDG,React').split(',').map(skill => (
                    <span key={skill} className="px-3 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] font-bold uppercase text-gray-300">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-600/10 p-5 rounded-xl border border-indigo-500/20">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Global SROI Score</h4>
                    <Globe size={14} className="text-indigo-500/40" />
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="text-4xl font-black italic tracking-tighter">94<span className="text-sm text-gray-500 not-italic">/100</span></div>
                    <div className="flex-grow h-2 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[94%]" />
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 opacity-30 text-[8px] font-mono tracking-tighter">
               <span>HASH::{data.hash || 'NULL'}</span>
               <span>VERIFIED BY LUMINA V3.0</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="text-center text-gray-500 max-w-sm">
        <p className="text-[10px] uppercase font-bold tracking-widest leading-relaxed">
          This digital identity uses <strong>Lumina SROI</strong> to link your career achieving to global humanity necessity.
        </p>
      </div>
    </div>
  );
};

export default ProfileCard3D;
