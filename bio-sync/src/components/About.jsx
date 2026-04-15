import React from 'react';
import { motion } from 'framer-motion';
import { Target, Globe2, ShieldAlert, Cpu, Database, LayoutGrid, Zap, Blocks } from 'lucide-react';

const About = () => {
  const sections = [
    {
      icon: <ShieldAlert className="text-red-400" />,
      title: "The Problem",
      description: "Traditional talent verification is siloed. Employers and NGOs cannot verify a professional's 'Real-World Impact' outside of a static resume, leading to a massive Global Impact Gap."
    },
    {
      icon: <Blocks className="text-indigo-400" />,
      title: "The Tech Node",
      description: "BIO-SYNC treats your browser as a Sovereign Ledger Node. Your identity is hashed locally, ensuring data ownership remains with the individual, not a central authority."
    },
    {
      icon: <Target className="text-emerald-400" />,
      title: "The Solution",
      description: "Providing a universal, international-grade currency for talent evaluation based on the SROI (Social Return on Investment) framework and UN SDG benchmarks."
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
      {/* 1. Project Philosophy Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-32"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase mb-6 tracking-widest">
          Lumina Talent Protocol // Framework v3.0
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
          Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Decentralize?</span>
        </h1>
        <p className="text-gray-500 text-xl max-w-3xl mx-auto leading-relaxed font-light">
          Your professional identity is too valuable to be owned by a single company. BIO-SYNC demonstrates a future where you own your impact, and organizations simply subscribe to your verified proof.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-32">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-10 space-y-6 border-white/5 hover:border-indigo-500/30 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {section.icon}
            </div>
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              {section.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 2. React Technical Specs Section - Fulfills Assignment Requirement */}
      <div className="space-y-12">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-black uppercase tracking-tighter italic">React Architecture Node</h2>
           <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em]">Inside the exhibition engine</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="glass-panel p-8 space-y-4 border-indigo-500/10">
              <div className="flex items-center gap-3 text-indigo-400">
                 <LayoutGrid size={20} />
                 <h4 className="font-bold text-sm uppercase tracking-widest">Component Based UI</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Everything you see—from the <strong>3D Cards</strong> to the <strong>Sync Form</strong>—is a React Component. This allows for rapid scaling and modularity across the global protocol.
              </p>
           </div>

           <div className="glass-panel p-8 space-y-4 border-indigo-500/10">
              <div className="flex items-center gap-3 text-purple-400">
                 <Cpu size={20} />
                 <h4 className="font-bold text-sm uppercase tracking-widest">React State & Hooks</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                We utilize <strong>useState</strong> to track your professional parameters in real-time and <strong>useEffect</strong> to synchronize that data with the local ledger persisting on your node.
              </p>
           </div>

           <div className="glass-panel p-8 space-y-4 border-indigo-500/10">
              <div className="flex items-center gap-3 text-emerald-400">
                 <Database size={20} />
                 <h4 className="font-bold text-sm uppercase tracking-widest">Global Context API</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                The <strong>Talent Discovery Ledger</strong> is powered by React's Context API, providing a unified data stream shared between the Sync Portal and the Global Discovery Node.
              </p>
           </div>

           <div className="glass-panel p-8 space-y-4 border-indigo-500/10">
              <div className="flex items-center gap-3 text-amber-400">
                 <Zap size={20} />
                 <h4 className="font-bold text-sm uppercase tracking-widest">Dynamic SROI Logic</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                React's <strong>declarative nature</strong> allows us to calculate your International SROI (Social Return on Investment) instantly as you adjust your career intensity.
              </p>
           </div>
        </div>
      </div>

      {/* 3. Proof of Sincerity Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-32 glass-panel p-16 flex flex-col items-center text-center overflow-hidden relative border-indigo-500/20"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-emerald-500" />
        <Globe2 size={100} className="text-indigo-500/5 absolute -right-12 -bottom-12 rotate-12" />
        
        <h2 className="text-4xl font-black mb-8 italic">The Exhibition Goal</h2>
        <p className="text-gray-500 max-w-3xl text-lg leading-relaxed font-light">
          The BIO-SYNC prototype demonstrates that professional identity doesn't belong to a server—it belongs to the professional. By combining <strong>React's Component Power</strong> with the philosophy of <strong>Decentralized Sovereignty</strong>, we provide a glimpse into a future where your career impact is your own universal currency.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
