import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Globe, ShieldCheck, AlertCircle, GraduationCap, Briefcase, Zap } from 'lucide-react';

const IdentityForm = ({ onSync }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    sdgFocus: 'Climate Action',
    summary: '',
    education: { institute: '', degree: '', year: '' },
    experience: { company: '', role: '', period: '' },
    skills: '', // Comma separated for tagging
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = true;
    if (!formData.lastName) newErrors.lastName = true;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
      setTimeout(() => {
        onSync(formData);
      }, 1500);
    }
  };

  const inputClass = (err) => `flex items-center gap-2 p-3 rounded-xl bg-black/20 border transition-all ${err ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus-within:border-indigo-500'}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-8 max-w-2xl mx-auto overflow-y-auto max-h-[80vh] custom-scrollbar"
    >
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="text-indigo-500 w-8 h-8" />
        <div>
           <h2 className="text-2xl font-black tracking-tight">Sync Portal</h2>
           <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Global Talent Ledger v3.0</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details Row */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">01. Personal Brand</h3>
           <div className="grid grid-cols-2 gap-4">
              <div className={inputClass(errors.firstName)}>
                <User size={16} className="text-gray-500" />
                <input type="text" placeholder="First Name" className="bg-transparent outline-none w-full text-sm" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
              </div>
              <div className={inputClass(errors.lastName)}>
                <User size={16} className="text-gray-500" />
                <input type="text" placeholder="Last Name" className="bg-transparent outline-none w-full text-sm" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              </div>
           </div>
           <div className={inputClass(errors.email)}>
              <Mail size={16} className="text-gray-500" />
              <input type="text" placeholder="Digital Identifier (Email)" className="bg-transparent outline-none w-full text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
           </div>
        </div>

        {/* Education Row - Lab Sample 3 Requirement */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">02. Academic Credentials</h3>
           <div className={inputClass()}>
              <GraduationCap size={16} className="text-gray-500" />
              <input type="text" placeholder="Educational Institute" className="bg-transparent outline-none w-full text-sm" value={formData.education.institute} onChange={e => setFormData({...formData, education: {...formData.education, institute: e.target.value}})} />
           </div>
           <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Degree" className="bg-black/20 border border-white/10 p-3 rounded-xl text-sm outline-none" value={formData.education.degree} onChange={e => setFormData({...formData, education: {...formData.education, degree: e.target.value}})} />
              <input type="text" placeholder="Graduation Year" className="bg-black/20 border border-white/10 p-3 rounded-xl text-sm outline-none" value={formData.education.year} onChange={e => setFormData({...formData, education: {...formData.education, year: e.target.value}})} />
           </div>
        </div>

        {/* Professional Row - Lab Sample 3 Requirement */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">03. Career Experience</h3>
           <div className={inputClass()}>
              <Briefcase size={16} className="text-gray-500" />
              <input type="text" placeholder="Company / Organization" className="bg-transparent outline-none w-full text-sm" value={formData.experience.company} onChange={e => setFormData({...formData, experience: {...formData.experience, company: e.target.value}})} />
           </div>
           <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Role" className="bg-black/20 border border-white/10 p-3 rounded-xl text-sm outline-none" value={formData.experience.role} onChange={e => setFormData({...formData, experience: {...formData.experience, role: e.target.value}})} />
              <input type="text" placeholder="Period (e.g. 2022 - 2024)" className="bg-black/20 border border-white/10 p-3 rounded-xl text-sm outline-none" value={formData.experience.period} onChange={e => setFormData({...formData, experience: {...formData.experience, period: e.target.value}})} />
           </div>
        </div>

        {/* Skills & Objective */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">04. Global Competencies</h3>
           <div className={inputClass()}>
              <Zap size={16} className="text-gray-500" />
              <input type="text" placeholder="Core Skills (comma separated)" className="bg-transparent outline-none w-full text-sm" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
           </div>
           <textarea 
            rows="3"
            placeholder="Career Objective & Impact Vision..."
            className="w-full p-4 rounded-xl bg-black/20 border border-white/10 focus:border-indigo-500 outline-none text-sm transition-all"
            value={formData.summary}
            onChange={(e) => setFormData({...formData, summary: e.target.value})}
          />
        </div>

        <button type="submit" className="btn-premium w-full text-lg py-5">
          Synchronize Identity
        </button>
      </form>

      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            <div className="glass-panel p-10 text-center max-w-sm border-indigo-500/30">
               <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-6">
                 <ShieldCheck className="text-indigo-400 w-10 h-10" />
               </div>
               <h2 className="text-2xl font-bold mb-2">Sync Successful</h2>
               <p className="text-gray-400 text-sm mb-6">Your identity has been hashed and added to the Global Talent Ledger.</p>
               <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                 <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5 }} className="h-full bg-indigo-500" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IdentityForm;
