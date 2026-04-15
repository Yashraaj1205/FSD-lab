import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Activity, ArrowRight, ShieldCheck, PieChart } from 'lucide-react';

const ImpactCalculator = () => {
  const [investment, setInvestment] = useState('0'); // In years
  const [effortHours, setEffortHours] = useState('40'); // Hours per week
  const [intensity, setIntensity] = useState(0.8); // 0.1 to 1.0

  // International SROI Benchmarks (Simulated Social Value per Hour for SDGs)
  const socialValuePerHour = 15.5; // USD/Euro equivalent for sustainability work

  const calculateSROI = () => {
    const years = parseFloat(investment) || 0;
    const hoursPerYear = parseFloat(effortHours) * 52;
    const totalPotentialValue = years * hoursPerYear * socialValuePerHour;
    const adjustedValue = totalPotentialValue * intensity;
    
    // Return the "Social Return Ratio" (Simulated)
    return (adjustedValue / 1000).toFixed(1); // e.g., 94.2k Social ROI
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel p-8 w-full max-w-md mx-auto h-full flex flex-col justify-between border-indigo-500/10"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="text-indigo-500 w-5 h-5" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">SROI Estimator</h2>
          </div>
          <ShieldCheck className="text-emerald-500 w-4 h-4 opacity-40" />
        </div>

        <div className="bg-black/60 p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <span>Career Investment (Years)</span>
            <span className="text-indigo-400">{investment}Yrs</span>
          </div>
          <input 
            type="range" min="0" max="40" step="1" 
            className="w-full accent-indigo-500 bg-white/10"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
          />
          
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest pt-2">
            <span>Weekly Intensity (Hrs)</span>
            <span className="text-indigo-400">{effortHours}Hrs</span>
          </div>
          <input 
            type="range" min="10" max="100" step="5" 
            className="w-full accent-indigo-500 bg-white/10"
            value={effortHours}
            onChange={(e) => setEffortHours(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Contribution Intensity</h3>
          <div className="flex gap-2">
            {[0.4, 0.7, 1.0].map(val => (
                <button
                  key={val}
                  onClick={() => setIntensity(val)}
                  className={`flex-grow py-2 rounded-lg text-[10px] font-bold border transition-all ${
                    intensity === val ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-transparent border-white/5 text-gray-600'
                  }`}
                >
                  {val === 0.4 ? 'Low' : val === 0.7 ? 'Moderate' : 'Core'}
                </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-gray-600 leading-none">Social Return (SROI)</p>
              <h4 className="text-4xl font-black italic tracking-tighter text-indigo-500">
                {calculateSROI()}<span className="text-[10px] font-bold not-italic text-gray-500 ml-1 leading-none uppercase tracking-widest">Global Pts</span>
              </h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <Activity className="text-indigo-400 animate-pulse" size={16} />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImpactCalculator;
