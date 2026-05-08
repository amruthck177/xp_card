"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Calculator, Puzzle, Languages, 
  Cpu, Mic, Video, Send, CheckCircle2,
  Clock, Award, ChevronRight
} from 'lucide-react';

const categories = [
  { id: 'quant', title: 'Quantitative Aptitude', icon: <Calculator />, color: 'from-blue-500 to-indigo-500', count: 120, topics: 'Time & Work, Probability, etc.' },
  { id: 'logical', title: 'Logical Reasoning', icon: <Puzzle />, color: 'from-purple-500 to-pink-500', count: 85, topics: 'Puzzles, Blood Relations, etc.' },
  { id: 'verbal', title: 'Verbal Ability', icon: <Languages />, color: 'from-orange-500 to-red-500', count: 60, topics: 'Grammar, Comprehension, etc.' },
  { id: 'tech', title: 'Technical MCQs', icon: <Cpu />, color: 'from-emerald-500 to-teal-500', count: 150, topics: 'OS, DBMS, CN, OOPs' },
];

export default function AptitudePrep() {
  const [activeTab, setActiveTab] = useState<'practice' | 'interview'>('practice');

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Placement Ready</span>
          </div>
          <h1 className="text-4xl font-black mb-2">APTITUDE & INTERVIEW PREP</h1>
          <p className="text-white/50">Level up your placement skills with AI-driven training.</p>
        </div>

        <div className="flex glass p-1.5 rounded-2xl border-white/5">
           <button 
             onClick={() => setActiveTab('practice')}
             className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'practice' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
           >
             Practice Labs
           </button>
           <button 
             onClick={() => setActiveTab('interview')}
             className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'interview' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
           >
             AI Interview Sim
           </button>
        </div>
      </div>

      {activeTab === 'practice' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group glass-card p-8 rounded-3xl border-white/5 hover:border-white/20 transition-all flex flex-col items-start"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                {React.cloneElement(cat.icon as React.ReactElement, { className: 'w-7 h-7' })}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-neon-cyan transition-colors">{cat.title}</h3>
              <p className="text-xs text-white/40 mb-6 uppercase tracking-widest font-bold">{cat.topics}</p>
              
              <div className="mt-auto w-full pt-6 border-t border-white/5 flex items-center justify-between">
                 <span className="text-sm font-bold text-white/60">{cat.count} Questions</span>
                 <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
            </motion.div>
          ))}
          
          {/* Daily Challenge Card */}
          <div className="md:col-span-2 lg:col-span-4 mt-8 glass rounded-3xl p-8 border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Clock className="w-40 h-40" />
             </div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-neon-cyan/20 rounded-2xl flex items-center justify-center shrink-0">
                      <Award className="w-8 h-8 text-neon-cyan" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-bold">Daily Aptitude Challenge</h2>
                      <p className="text-white/60">Solve 5 questions in 5 minutes to maintain your streak.</p>
                   </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-center">
                      <div className="text-2xl font-black">12</div>
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Day Streak</div>
                   </div>
                   <button className="px-8 py-3 bg-neon-cyan text-black font-bold rounded-xl hover:scale-105 transition-transform">
                      START CHALLENGE
                   </button>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 h-[600px]">
          {/* AI Interview Interface */}
          <div className="lg:col-span-2 glass rounded-3xl border-white/10 overflow-hidden flex flex-col">
             <div className="bg-white/5 p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                   <span className="text-sm font-bold uppercase tracking-widest">Live AI Technical Round</span>
                </div>
                <div className="flex gap-2">
                   <div className="w-8 h-8 rounded-lg glass flex items-center justify-center"><Mic className="w-4 h-4" /></div>
                   <div className="w-8 h-8 rounded-lg glass flex items-center justify-center"><Video className="w-4 h-4" /></div>
                </div>
             </div>
             
             <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink p-1 mb-8">
                   <div className="w-full h-full rounded-full bg-space-950 flex items-center justify-center overflow-hidden">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-16 h-16 rounded-full bg-neon-purple/20 blur-xl" 
                      />
                      <Brain className="w-12 h-12 text-neon-purple absolute" />
                   </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 italic">"Can you explain the difference between a Process and a Thread in modern Operating Systems?"</h2>
                <div className="flex items-center gap-2 text-neon-cyan text-sm font-bold">
                   <Send className="w-4 h-4" />
                   AI MENTOR IS LISTENING...
                </div>
             </div>
             
             <div className="p-6 bg-white/5 border-t border-white/10">
                <div className="h-2 w-full bg-white/5 rounded-full mb-4">
                   <div className="h-full w-1/4 bg-neon-purple rounded-full" />
                </div>
                <div className="flex justify-between text-xs font-bold text-white/40 uppercase tracking-widest">
                   <span>Confidence Analysis</span>
                   <span>Good</span>
                </div>
             </div>
          </div>
          
          {/* Interview Metrics */}
          <div className="space-y-6">
             <div className="glass p-8 rounded-3xl border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Mock Stats</h3>
                <div className="space-y-6">
                   <MetricBar label="Technical Accuracy" value={78} color="cyan" />
                   <MetricBar label="Communication" value={92} color="purple" />
                   <MetricBar label="Problem Solving" value={65} color="pink" />
                </div>
             </div>
             
             <div className="glass-card p-8 rounded-3xl border-white/5 bg-gradient-to-br from-neon-purple/10 to-transparent">
                <h3 className="font-bold mb-2">Ready for Google?</h3>
                <p className="text-sm text-white/50 mb-6">Based on your performance, you have a 68% chance of clearing the first technical round.</p>
                <button className="w-full py-3 bg-white text-black font-bold rounded-xl text-sm">VIEW DETAILED FEEDBACK</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MetricBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest">
      <span className="text-white/60">{label}</span>
      <span className={`text-neon-${color}`}>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className={`h-full bg-neon-${color}`}
      />
    </div>
  </div>
);
