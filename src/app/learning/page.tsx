"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Code2, Cpu, ShieldCheck, Database, 
  Globe, Layout, Smartphone, Cloud, Terminal,
  Lock, CheckCircle2, Circle, ArrowRight, Play
} from 'lucide-react';

const paths = [
  { id: 'web', title: 'Full Stack Web', icon: <Globe />, color: 'from-blue-500 to-cyan-400', progress: 45, level: 'Intermediate', topics: ['React', 'Next.js', 'Node.js', 'PostgreSQL'] },
  { id: 'ai', title: 'AI / Machine Learning', icon: <Cpu />, color: 'from-purple-500 to-pink-500', progress: 12, level: 'Beginner', topics: ['Python', 'TensorFlow', 'Neural Networks'] },
  { id: 'mobile', title: 'App Development', icon: <Smartphone />, color: 'from-orange-500 to-yellow-400', progress: 0, level: 'Locked', topics: ['Flutter', 'React Native', 'Swift'] },
  { id: 'cyber', title: 'Cybersecurity', icon: <ShieldCheck />, color: 'from-red-500 to-rose-400', progress: 0, level: 'Locked', topics: ['Pen Testing', 'Network Security', 'Cryptography'] },
];

const roadmapSteps = [
  { id: 1, title: 'HTML5 & Semantic Web', status: 'completed', duration: '2 hours', xp: 50 },
  { id: 2, title: 'CSS3 Masterclass (Flex/Grid)', status: 'completed', duration: '4 hours', xp: 100 },
  { id: 3, title: 'Modern JavaScript (ES6+)', status: 'in-progress', duration: '6 hours', xp: 200 },
  { id: 4, title: 'React Fundamentals', status: 'locked', duration: '8 hours', xp: 400 },
  { id: 5, title: 'Next.js 15 & SSR', status: 'locked', duration: '10 hours', xp: 600 },
];

export default function LearningPaths() {
  const [selectedPath, setSelectedPath] = useState(paths[0]);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">AI-POWERED LEARNING PATHS</h1>
          <p className="text-white/50">AI-curated roadmaps tailored to your goals and pace.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <div className="text-xs text-white/40 font-bold uppercase">Daily Streak</div>
              <div className="text-xl font-black text-orange-500">🔥 12 Days</div>
           </div>
           <button className="px-6 py-3 glass rounded-xl font-bold text-sm border-white/10">RESUME LAST LESSON</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Path Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">Your Tracks</h2>
          {paths.map((path) => (
            <motion.div
              key={path.id}
              whileHover={{ x: 10 }}
              onClick={() => setSelectedPath(path)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
                selectedPath.id === path.id 
                ? 'bg-white/5 border-neon-cyan/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                : 'glass border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center text-white shrink-0`}>
                  {React.cloneElement(path.icon as React.ReactElement, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{path.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] text-white/40 uppercase font-black">{path.level}</span>
                     {path.progress > 0 && <span className="text-[10px] text-neon-cyan font-black">{path.progress}%</span>}
                  </div>
                </div>
              </div>
              {selectedPath.id === path.id && (
                <div className="absolute bottom-0 left-0 h-1 bg-neon-cyan" style={{ width: `${path.progress}%` }} />
              )}
            </motion.div>
          ))}
          
          <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-white/30 font-bold text-sm hover:border-white/20 hover:text-white/50 transition-all flex items-center justify-center gap-2">
             <Brain className="w-4 h-4" />
             AI GENERATE NEW PATH
          </button>
        </div>

        {/* Roadmap Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="glass p-8 rounded-3xl border-white/5 relative overflow-hidden">
             <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${selectedPath.color} opacity-5 blur-3xl`} />
             <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${selectedPath.color} flex items-center justify-center text-white shadow-2xl`}>
                   {React.cloneElement(selectedPath.icon as React.ReactElement, { className: 'w-12 h-12' })}
                </div>
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-black">{selectedPath.title} Mastery</h2>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold border border-white/10">Roadmap v2.4</span>
                   </div>
                   <div className="flex flex-wrap gap-4 mt-4">
                      {selectedPath.topics.map((topic, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs text-white/60">
                           <div className="w-1 h-1 rounded-full bg-neon-cyan" /> {topic}
                        </span>
                      ))}
                   </div>
                </div>
                <div className="text-center md:text-right">
                   <div className="text-4xl font-black text-white">{selectedPath.progress}%</div>
                   <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Overall Progress</div>
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
               <Terminal className="w-5 h-5 text-neon-cyan" />
               Learning Roadmap
            </h3>
            
            <div className="relative pl-8 space-y-6 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
               {roadmapSteps.map((step) => (
                 <motion.div 
                   key={step.id}
                   whileHover={{ x: 5 }}
                   className={`relative p-6 rounded-2xl border transition-all ${
                     step.status === 'in-progress' 
                     ? 'bg-white/5 border-neon-cyan/30' 
                     : step.status === 'completed' 
                     ? 'bg-green-500/5 border-green-500/20 opacity-70' 
                     : 'glass border-white/5 opacity-50'
                   }`}
                 >
                   {/* Node Icon */}
                   <div className={`absolute -left-11 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 transition-colors ${
                     step.status === 'completed' 
                     ? 'bg-green-500 border-green-500' 
                     : step.status === 'in-progress' 
                     ? 'bg-neon-cyan border-neon-cyan animate-pulse' 
                     : 'bg-space-950 border-white/10'
                   }`}>
                     {step.status === 'completed' ? <CheckCircle2 className="w-3 h-3 text-white" /> : <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                   </div>

                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold">{step.title}</h4>
                            {step.status === 'in-progress' && <span className="px-2 py-0.5 bg-neon-cyan/20 text-neon-cyan text-[10px] font-black rounded uppercase">Active</span>}
                         </div>
                         <div className="flex items-center gap-4 text-xs text-white/40 font-bold uppercase tracking-wider">
                            <span>{step.duration}</span>
                            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> +{step.xp} XP</span>
                         </div>
                      </div>
                      
                      <div className="flex gap-2">
                         {step.status === 'locked' ? (
                            <div className="px-4 py-2 glass rounded-lg text-white/20 flex items-center gap-2 text-xs font-bold">
                               <Lock className="w-3 h-3" /> LOCKED
                            </div>
                         ) : (
                            <button className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                              step.status === 'completed' 
                              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                              : 'bg-neon-cyan text-black hover:scale-105'
                            }`}>
                               {step.status === 'completed' ? 'REVIEW' : 'START LESSON'}
                            </button>
                         )}
                      </div>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
