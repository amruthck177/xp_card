"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, FileText, Layout, Star, 
  MapPin, Building, DollarSign, Rocket,
  CheckCircle, Globe, Share2, Download
} from 'lucide-react';

const jobs = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Neo Tokyo Tech', salary: '$140k - $180k', tags: ['React', 'Next.js'], match: 92 },
  { id: 2, title: 'AI Solutions Architect', company: 'CyberMind AI', salary: '$160k - $220k', tags: ['Python', 'LLMs'], match: 85 },
  { id: 3, title: 'Full Stack Developer', company: 'Grid Systems', salary: '$120k - $150k', tags: ['Node.js', 'Postgres'], match: 78 },
];

export default function CareerMode() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'resume' | 'portfolio'>('jobs');

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Briefcase className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Career Launchpad</span>
          </div>
          <h1 className="text-4xl font-black mb-2">CAREER MODE</h1>
          <p className="text-white/50">Your gateway to the world's most elite developer roles.</p>
        </div>

        <div className="flex glass p-1.5 rounded-2xl border-white/5">
           <TabButton active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} label="Job Match" />
           <TabButton active={activeTab === 'resume'} onClick={() => setActiveTab('resume')} label="AI Resume" />
           <TabButton active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} label="Portfolio" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Profile */}
        <div className="space-y-6">
           <div className="glass p-8 rounded-3xl border-white/5">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-1">
                    <div className="w-full h-full rounded-2xl bg-space-950 flex items-center justify-center">
                       <Layout className="w-8 h-8 text-white/20" />
                    </div>
                 </div>
                 <div>
                    <h3 className="font-bold">John Script</h3>
                    <p className="text-xs text-white/40">Full Stack Warrior</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <SkillProgress label="Frontend Mastery" value={85} />
                 <SkillProgress label="Backend Logic" value={70} />
                 <SkillProgress label="System Design" value={45} />
              </div>
           </div>

           <div className="glass p-8 rounded-3xl border-white/5 bg-gradient-to-br from-neon-cyan/10 to-transparent">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                 <Rocket className="w-4 h-4 text-neon-cyan" />
                 Placement Probability
              </h3>
              <div className="text-4xl font-black text-white mb-2">72%</div>
              <p className="text-xs text-white/50 leading-relaxed">Based on your Battle Rank and Project Portfolio, you are in the top 10% of applicants this month.</p>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
           {activeTab === 'jobs' ? (
             <div className="space-y-4">
                {jobs.map((job) => (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                           <Building className="w-6 h-6 text-white/20" />
                        </div>
                        <div>
                           <h4 className="font-bold text-lg">{job.title}</h4>
                           <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-white/40 flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.company}</span>
                              <span className="text-xs text-white/40 flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                           <div className="text-xs font-black text-neon-cyan uppercase">{job.match}% MATCH</div>
                           <div className="h-1 w-20 bg-white/5 rounded-full mt-1">
                              <div className="h-full bg-neon-cyan rounded-full" style={{ width: `${job.match}%` }} />
                           </div>
                        </div>
                        <button className="px-6 py-2 bg-white text-black font-bold rounded-xl text-sm hover:scale-105 transition-transform">APPLY</button>
                     </div>
                  </motion.div>
                ))}
             </div>
           ) : activeTab === 'resume' ? (
             <div className="glass rounded-3xl border-white/5 p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                   <FileText className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">AI Resume Generator</h2>
                <p className="text-white/50 max-w-md mb-8">Let CodeVerse AI craft a high-performance resume based on your achievements, project metrics, and Battle history.</p>
                <div className="flex gap-4">
                   <button className="px-8 py-3 bg-blue-500 text-white font-bold rounded-xl text-sm hover:scale-105 transition-transform flex items-center gap-2">
                      <Rocket className="w-4 h-4" /> GENERATE RESUME
                   </button>
                   <button className="px-8 py-3 glass border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/5 transition-all flex items-center gap-2">
                      <Download className="w-4 h-4" /> IMPORT GITHUB
                   </button>
                </div>
             </div>
           ) : (
             <div className="grid md:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                  <div key={i} className="glass p-6 rounded-3xl border-white/5 overflow-hidden group">
                     <div className="aspect-video bg-white/5 rounded-2xl mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-3 bg-white text-black rounded-full shadow-xl"><Share2 className="w-5 h-5" /></button>
                        </div>
                     </div>
                     <h4 className="font-bold mb-1">Grid System Dashboard</h4>
                     <p className="text-xs text-white/40 mb-4 uppercase font-black">Next.js • Tailwind • Supabase</p>
                     <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xs font-bold text-neon-cyan">LIVE PREVIEW</span>
                        <ExternalLink className="w-4 h-4 text-white/20" />
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

const TabButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${active ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
  >
    {label}
  </button>
);

const SkillProgress = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5">
       <span className="text-white/40">{label}</span>
       <span className="text-neon-cyan">{value}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
       <div className="h-full bg-neon-cyan rounded-full" style={{ width: `${value}%` }} />
    </div>
  </div>
);
