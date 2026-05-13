'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, MessageSquare, LineChart, Target, History, Mic, Send, Cpu, Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import Navbar from '@/components/Navbar';
import AttributeRadar from '@/components/AttributeRadar';

export default function NovaPage() {
  return (
    <main className="min-h-screen bg-void relative">
      <SpaceBackground />
      <Navbar />

      <div className="pt-32 pb-20 px-8 max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 h-[calc(100vh-140px)]">
        
        {/* Left Col: Nova Chat Interface */}
        <div className="xl:col-span-4 glass-panel border-neon-purple/20 flex flex-col h-full bg-void/60 backdrop-blur-xl">
          <header className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center border border-neon-purple/50">
                  <BrainCircuit size={24} className="text-neon-purple animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-neon-green rounded-full border-4 border-void" />
              </div>
              <div>
                <h2 className="font-display text-sm font-bold tracking-widest uppercase">NOVA_AI</h2>
                <p className="font-mono text-[8px] text-neon-green uppercase tracking-widest">Active_Senior_Mentor</p>
              </div>
            </div>
            <button className="text-white/20 hover:text-white transition-colors">
              <History size={18} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <Message 
              sender="nova" 
              text="Greetings, Neo. I've been reviewing your recent submissions in the Web Galaxy. Your event-loop logic is solid, but we should optimize your memory footprint."
              time="08:42"
            />
            <Message 
              sender="user" 
              text="Show me my current weaknesses."
              time="08:44"
            />
            <Message 
              sender="nova" 
              text="I've synthesized a new Roadmap based on your 'Memory Void' trial performance. Your weakest node is 'Garbage Collection Protocols'."
              time="08:45"
              suggestions={['View Roadmap', 'Start Training', 'Code Review']}
            />
          </div>

          <footer className="p-6 border-t border-white/5 bg-white/[0.02]">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Query Nova AI..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-neon-purple transition-all pr-24"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="p-2 text-white/20 hover:text-white transition-colors">
                  <Mic size={18} />
                </button>
                <button className="p-2.5 bg-neon-purple text-white rounded-xl hover:shadow-neon-purple transition-all">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </footer>
        </div>

        {/* Center Col: Roadmap & Profile Analysis */}
        <div className="xl:col-span-5 flex flex-col gap-8 h-full">
          {/* Weakness Radar Chart */}
          <section className="glass-panel p-8 border-l-4 border-neon-cyan flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="font-display text-sm font-bold tracking-[0.2em] text-white/40 uppercase">APTITUDE_MATRIX</h3>
                <p className="text-xs text-white/60 font-medium">Real-time cognitive profile synchronization.</p>
              </div>
              <div className="px-3 py-1 bg-neon-cyan/20 border border-neon-cyan/50 rounded-lg">
                <span className="font-mono text-[10px] text-neon-cyan font-bold">STABLE</span>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <AttributeRadar />
            </div>
          </section>

          {/* Interactive Roadmap */}
          <section className="glass-panel p-8 flex flex-col h-80">
            <h3 className="font-display text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-8">EVOLUTION_ROADMAP</h3>
            <div className="relative flex-1 px-4">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5" />
              <div className="space-y-6">
                <RoadmapNode active title="Master State Management" status="COMPLETED" icon={<CheckCircle2 className="text-neon-cyan" size={14} />} />
                <RoadmapNode active pulse title="Optimize Memory Allocation" status="IN_PROGRESS" icon={<Cpu className="text-neon-purple" size={14} />} />
                <RoadmapNode title="Scale Distributed Systems" status="LOCKED" icon={<Target className="text-white/20" size={14} />} />
              </div>
            </div>
          </section>
        </div>

        {/* Right Col: Code Review & Suggestions */}
        <div className="xl:col-span-3 flex flex-col gap-8 h-full">
          <section className="glass-panel p-6 border-t-2 border-neon-amber flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Cpu size={18} className="text-neon-amber" />
              <h3 className="font-display text-xs font-bold tracking-widest uppercase">SENIOR_REVIEW_LOG</h3>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 font-mono text-[10px]">
              <ReviewItem 
                line="42" 
                comment="Using nested ternary operators here reduces protocol readability. Decouple for better stability."
                severity="low"
              />
              <ReviewItem 
                line="108" 
                comment="CRITICAL: Event listener leak detected in useEffect. Attach a cleanup protocol immediately."
                severity="high"
              />
              <ReviewItem 
                line="15" 
                comment="Consider memoizing this calculation to prevent unnecessary orbital re-renders."
                severity="med"
              />
            </div>
            <button className="w-full py-4 mt-6 bg-neon-amber text-void font-display font-black text-[10px] tracking-widest rounded-xl hover:scale-105 transition-transform uppercase">
              APPLY_SUGGESTED_FIXES
            </button>
          </section>

          {/* Archetype Card */}
          <section className="glass-panel p-6 border-neon-cyan/20 bg-neon-cyan/5">
            <div className="flex items-center gap-4 mb-4">
              <Star className="text-neon-cyan shadow-neon-cyan" size={24} />
              <div>
                <h4 className="font-display font-bold text-xs">THE_ARCHITECT</h4>
                <p className="text-[10px] font-mono text-neon-cyan uppercase">Developer_Archetype</p>
              </div>
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed font-medium">
              You prioritize structure and scalability. Nova will tailor your path towards distributed systems and system architecture.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function Message({ sender, text, time, suggestions }) {
  const isNova = sender === 'nova';
  return (
    <div className={`flex gap-3 ${isNova ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${isNova ? 'bg-neon-purple/20 border-neon-purple/50' : 'bg-white/5 border-white/20'}`}>
        {isNova ? <BrainCircuit size={14} className="text-neon-purple" /> : <div className="text-[8px] font-bold">ME</div>}
      </div>
      <div className="space-y-3 max-w-[85%]">
        <div className={`p-4 rounded-2xl ${isNova ? 'bg-white/5 rounded-tl-none border border-white/10' : 'bg-neon-purple text-white rounded-tr-none shadow-neon-purple/20'}`}>
          <p className="text-xs leading-relaxed font-medium">{text}</p>
          <div className={`mt-2 text-[8px] font-mono ${isNova ? 'text-white/20' : 'text-white/60'}`}>{time}</div>
        </div>
        {suggestions && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[8px] font-display font-bold text-white/60 hover:text-white hover:border-neon-purple transition-all uppercase tracking-widest">
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RoadmapNode({ title, status, icon, active, pulse }) {
  return (
    <div className="flex items-center gap-6 group">
      <div className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${active ? 'bg-void border-neon-cyan' : 'bg-white/5 border-white/10'}`}>
        {icon}
        {pulse && <div className="absolute inset-0 rounded-full bg-neon-cyan/20 animate-ping" />}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <div className={`text-[10px] font-display font-bold tracking-tight ${active ? 'text-white' : 'text-white/20'}`}>{title}</div>
          <div className={`text-[8px] font-mono tracking-widest uppercase ${status === 'COMPLETED' ? 'text-neon-cyan' : status === 'IN_PROGRESS' ? 'text-neon-purple' : 'text-white/10'}`}>{status}</div>
        </div>
        <ArrowUpRight size={14} className="text-white/0 group-hover:text-white/20 transition-all" />
      </div>
    </div>
  );
}

function ReviewItem({ line, comment, severity }) {
  const color = severity === 'high' ? 'text-red-500' : severity === 'med' ? 'text-neon-amber' : 'text-neon-cyan';
  return (
    <div className="p-3 bg-white/5 border border-white/5 rounded relative overflow-hidden group">
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${severity === 'high' ? 'bg-red-500' : severity === 'med' ? 'bg-neon-amber' : 'bg-neon-cyan'}`} />
      <div className="flex justify-between items-start mb-1">
        <span className={`text-[8px] font-bold ${color}`}>LINE_{line}</span>
        <span className="text-[8px] opacity-20 uppercase">{severity}_SEVERITY</span>
      </div>
      <p className="text-white/60 leading-relaxed italic">{comment}</p>
    </div>
  );
}
