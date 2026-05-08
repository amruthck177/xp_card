"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Layout, Database, Server, 
  Terminal, Sparkles, Plus, Rocket,
  FolderOpen, Settings, ChevronRight, Play
} from 'lucide-react';

const projectTypes = [
  { id: 'saas', title: 'Modern SaaS App', stack: 'Next.js, Tailwind, Prisma', color: 'from-blue-500 to-cyan-500' },
  { id: 'ai', title: 'AI Dashboard', stack: 'OpenAI, LangChain, Python', color: 'from-purple-500 to-pink-500' },
  { id: 'crypto', title: 'Web3 Marketplace', stack: 'Solidity, Ethers.js', color: 'from-orange-500 to-yellow-500' },
  { id: 'mobile', title: 'Cross-platform App', stack: 'React Native, Firebase', color: 'from-red-500 to-rose-500' },
];

export default function ProjectBuilder() {
  const [selectedType, setSelectedType] = useState(projectTypes[0]);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <Code className="w-3 h-3 text-indigo-400" />
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Architect Mode</span>
          </div>
          <h1 className="text-4xl font-black mb-2">PROJECT BUILDER</h1>
          <p className="text-white/50">Build production-grade apps with real-time AI assistance.</p>
        </div>

        <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2">
           <Plus className="w-5 h-5" />
           NEW PROJECT
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Project Templates */}
        <div className="lg:col-span-1 space-y-4">
           <h2 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">Smart Templates</h2>
           {projectTypes.map((type) => (
             <motion.div
               key={type.id}
               whileHover={{ x: 10 }}
               onClick={() => setSelectedType(type)}
               className={`p-6 rounded-3xl border cursor-pointer transition-all relative overflow-hidden ${
                 selectedType.id === type.id 
                 ? 'bg-white/5 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
                 : 'glass border-white/5 opacity-60 hover:opacity-100'
               }`}
             >
                <div className="relative z-10">
                   <h3 className="font-bold text-sm mb-1">{type.title}</h3>
                   <p className="text-[10px] text-white/40 uppercase font-black">{type.stack}</p>
                </div>
                {selectedType.id === type.id && (
                  <div className={`absolute bottom-0 left-0 h-1 bg-indigo-500 w-full`} />
                )}
             </motion.div>
           ))}
        </div>

        {/* Builder Workspace */}
        <div className="lg:col-span-3 space-y-6">
           <div className="glass rounded-3xl border-white/5 overflow-hidden">
              {/* Workspace Header */}
              <div className="bg-white/5 p-6 border-b border-white/10 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedType.color} flex items-center justify-center text-white shadow-lg`}>
                       <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="font-bold">Project Initializer</h3>
                       <p className="text-[10px] text-white/40 uppercase font-black">AI is generating folder structure...</p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 glass rounded-lg border-white/10 text-white/40 hover:text-white"><Settings className="w-4 h-4" /></button>
                    <button className="px-6 py-2 bg-indigo-500 text-white font-bold rounded-xl text-sm">DEPLOY</button>
                 </div>
              </div>

              {/* Steps Area */}
              <div className="p-8 grid md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <h4 className="text-xs font-black text-white/30 uppercase tracking-widest">Implementation Plan</h4>
                    <div className="space-y-4">
                       <StepItem id={1} title="Scaffold Next.js App" status="completed" />
                       <StepItem id={2} title="Configure Tailwind v4" status="in-progress" />
                       <StepItem id={3} title="Database Schema (Prisma)" status="pending" />
                       <StepItem id={4} title="API Route Generation" status="pending" />
                    </div>
                 </div>

                 <div className="bg-[#010409] rounded-2xl p-6 font-mono text-xs border border-white/5 min-h-[300px]">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                       <span className="text-white/40 italic">File Explorer</span>
                       <FolderOpen className="w-4 h-4 text-white/20" />
                    </div>
                    <div className="space-y-2 text-white/60">
                       <div className="flex items-center gap-2 text-indigo-400"><FolderOpen className="w-3 h-3" /> src/</div>
                       <div className="flex items-center gap-2 ml-4 text-indigo-400"><FolderOpen className="w-3 h-3" /> app/</div>
                       <div className="flex items-center gap-2 ml-8"><Code className="w-3 h-3" /> layout.tsx</div>
                       <div className="flex items-center gap-2 ml-8"><Code className="w-3 h-3 text-neon-cyan" /> page.tsx</div>
                       <div className="flex items-center gap-2 ml-4 text-indigo-400"><FolderOpen className="w-3 h-3" /> components/</div>
                       <div className="flex items-center gap-2 ml-4"><Settings className="w-3 h-3" /> next.config.js</div>
                       <div className="flex items-center gap-2 ml-4"><Database className="w-3 h-3" /> prisma.schema</div>
                    </div>
                 </div>
              </div>

              {/* AI Suggestion Bar */}
              <div className="p-6 bg-indigo-500/5 border-t border-indigo-500/10 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                       <Sparkles className="w-4 h-4 text-indigo-400" />
                    </div>
                    <p className="text-xs text-white/60 font-medium">AI Suggestion: "Would you like to add authentication using NextAuth.js?"</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-4 py-1.5 glass border-white/10 text-[10px] font-black uppercase">IGNORE</button>
                    <button className="px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-black uppercase rounded-lg">YES, ADD IT</button>
                 </div>
              </div>
           </div>

           {/* Active Projects */}
           <div className="grid md:grid-cols-2 gap-6 pt-6">
              <div className="glass p-8 rounded-3xl border-white/5 relative overflow-hidden group">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                          <Code className="w-6 h-6 text-neon-cyan" />
                       </div>
                       <div>
                          <h4 className="font-bold">CodeVerse Clone</h4>
                          <span className="text-[10px] text-white/40 uppercase font-black">Active 2h ago</span>
                       </div>
                    </div>
                    <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                       <Play className="w-4 h-4 fill-current" />
                    </button>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full mb-2">
                    <div className="h-full w-2/3 bg-neon-cyan rounded-full" />
                 </div>
                 <div className="flex justify-between text-[10px] font-black text-white/40 uppercase">
                    <span>Progress</span>
                    <span>65%</span>
                 </div>
              </div>

              <div className="glass p-8 rounded-3xl border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-opacity">
                 <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-white/20" />
                 </div>
                 <h4 className="font-bold text-sm">Draft New Project</h4>
                 <p className="text-[10px] text-white/40 uppercase mt-1">Start from scratch</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

const StepItem = ({ id, title, status }: { id: number; title: string; status: 'completed' | 'in-progress' | 'pending' }) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl border ${
    status === 'in-progress' ? 'bg-indigo-500/5 border-indigo-500/20' : 
    status === 'completed' ? 'opacity-50 border-white/5' : 'border-white/5'
  }`}>
    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
      status === 'completed' ? 'bg-green-500 text-white' : 
      status === 'in-progress' ? 'bg-indigo-500 text-white animate-pulse' : 'bg-white/5 text-white/20'
    }`}>
       {status === 'completed' ? <CheckCircle className="w-3 h-3" /> : id}
    </div>
    <span className={`text-sm font-bold ${status === 'pending' ? 'text-white/20' : 'text-white'}`}>{title}</span>
    {status === 'in-progress' && <ChevronRight className="w-4 h-4 ml-auto text-indigo-500" />}
  </div>
);
