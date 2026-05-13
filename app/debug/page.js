'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Terminal, RefreshCw, ShieldAlert, Cpu, Database, Bug, Activity, Search } from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';

export default function DebugPage() {
  const [health, setHealth] = useState(100);
  const [isFixing, setIsFixing] = useState(false);

  const simulateFix = () => {
    setIsFixing(true);
    setTimeout(() => {
      setHealth(prev => Math.max(0, prev - 25));
      setIsFixing(false);
    }, 2000);
  };

  return (
    <main className="h-screen bg-[#050000] flex flex-col overflow-hidden relative">
      {/* Background Starfield with Red Tint */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <SpaceBackground />
        <div className="absolute inset-0 bg-red-900/10" />
      </div>

      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />

      {/* Header */}
      <header className="h-20 border-b border-red-900/30 bg-black/80 backdrop-blur-xl flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-500/10 border border-red-500/50 flex items-center justify-center rounded">
            <ShieldAlert size={24} className="text-red-500 animate-pulse" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-black text-red-500 tracking-tighter">DIMENSION_X</h1>
            <p className="font-mono text-[8px] text-red-500/40 tracking-[0.5em] uppercase">Sector: CORRUPTED_SYSTEMS // Level_04</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right">
            <div className="font-display text-[10px] font-bold text-red-500/40 uppercase tracking-widest mb-1">SYSTEM_INTEGRITY</div>
            <div className="w-64 h-3 bg-red-900/20 rounded-full border border-red-900/30 overflow-hidden relative">
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: `${health}%` }}
                className="h-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              />
              {/* Segmented lines overlay */}
              <div className="absolute inset-0 flex justify-between px-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="w-px h-full bg-black/40" />
                ))}
              </div>
            </div>
          </div>
          <div className="h-10 w-px bg-red-900/20" />
          <button 
            onClick={simulateFix}
            disabled={isFixing}
            className="px-8 py-3 bg-red-500 text-black font-display font-black text-xs tracking-widest rounded hover:bg-white transition-all disabled:opacity-50 group"
          >
            {isFixing ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <span className="flex items-center gap-2 uppercase">TERMINATE_BUG <Zap size={14} fill="currentColor" /></span>
            )}
          </button>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Log Analysis Pane */}
        <aside className="w-96 border-r border-red-900/20 bg-black/60 backdrop-blur-md flex flex-col">
          <div className="p-6 border-b border-red-900/20 flex items-center justify-between">
            <h3 className="font-display text-xs font-bold text-red-500/60 tracking-widest uppercase">LOG_ANALYSIS</h3>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-red-900/40" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 font-mono text-[10px] space-y-4">
            <div className="p-3 bg-red-500/5 border border-red-900/20 rounded">
              <span className="text-red-500/40">[08:12:44]</span> <span className="text-white/60">FATAL: Memory leak detected in kernel.alloc()</span>
              <div className="mt-2 text-red-500">Node_ID: 0x4f92-EX</div>
            </div>
            <div className="p-3 bg-red-500/5 border border-red-900/20 rounded">
              <span className="text-red-500/40">[08:12:45]</span> <span className="text-white/60">WARN: Core stability dropping. Critical threshold reached.</span>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="text-red-500/20">
                [08:12:{46+i}] TRACE: Thread_Pool_{i} stalled. awaiting_sync...
              </div>
            ))}
          </div>
        </aside>

        {/* Center: System Visualization */}
        <div className="flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
          {/* Active Incident Banner */}
          <section className="glass-panel border-red-500/30 bg-red-500/5 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Bug size={80} className="text-red-500" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={20} className="text-red-500" />
              <h2 className="font-display text-xl font-black text-white tracking-widest uppercase">THE_MEMORY_VOID_v4</h2>
            </div>
            <p className="text-red-500/60 font-medium max-w-2xl leading-relaxed">
              A high-level memory leak has breached the production environment of <span className="text-white">Central_Galaxy</span>. The leak is recursive. If not stabilized within the cycle, the entire sub-sector will collapse.
            </p>
          </section>

          {/* Inspection Grid */}
          <div className="grid grid-cols-2 gap-8 flex-1">
            <InspectPanel 
              title="THREAD_STABILITY" 
              icon={<Cpu className="text-red-500" size={18} />}
              value="CRITICAL"
              trend="DOWN"
            />
            <InspectPanel 
              title="DATABASE_SYNC" 
              icon={<Database className="text-red-500" size={18} />}
              value="LAGGING"
              trend="STABLE"
            />
            <div className="col-span-2 glass-panel p-8 flex flex-col border-red-900/20">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-display text-xs font-bold text-red-500/60 tracking-widest uppercase">SYSTEM_FLOW_VISUALIZER</h4>
                <div className="flex items-center gap-4 text-xs font-mono text-red-500/40 uppercase">
                  <span>Zoom: 100%</span>
                  <span>Grid: Active</span>
                </div>
              </div>
              <div className="flex-1 bg-black/40 rounded-xl border border-red-900/20 flex items-center justify-center relative overflow-hidden">
                {/* Simulated Flow Grid */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 opacity-10">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="border border-red-500/20" />
                  ))}
                </div>
                <div className="relative flex items-center gap-12">
                  <Flownode active />
                  <Flowline active />
                  <Flownode active corrupted />
                  <Flowline />
                  <Flownode />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tools Sidebar */}
        <aside className="w-80 border-l border-red-900/20 bg-black/60 backdrop-blur-md flex flex-col">
          <div className="p-6 border-b border-red-900/20">
            <h3 className="font-display text-xs font-bold text-red-500/60 tracking-widest uppercase">DEBUG_TOOLKIT</h3>
          </div>
          <div className="p-6 space-y-4">
            <ToolItem label="Memory_Profiler" icon={<Search size={14} />} />
            <ToolItem label="Thread_Monitor" icon={<Activity size={14} />} />
            <ToolItem label="Network_Sniffer" icon={<Zap size={14} />} />
            <div className="pt-8 space-y-4">
              <h4 className="font-display text-[10px] tracking-[0.3em] text-red-500/20 uppercase">BOSS_STATUS</h4>
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-display text-[10px] font-bold text-white tracking-widest">LEAK_VOID</span>
                  <span className="font-mono text-xs text-red-500">Lv.99</span>
                </div>
                <div className="h-1 w-full bg-red-900/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-red-500" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function InspectPanel({ title, icon, value, trend }) {
  return (
    <div className="glass-panel p-6 border-l-2 border-red-900">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h4 className="font-display text-[10px] font-bold text-red-500/60 tracking-widest uppercase">{title}</h4>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-display font-black text-white">{value}</div>
        <div className={`font-mono text-[10px] font-bold ${trend === 'DOWN' ? 'text-red-500' : 'text-white/20'}`}>
          {trend === 'DOWN' ? '▼ INSTABILITY' : '■ STABLE'}
        </div>
      </div>
    </div>
  );
}

function Flownode({ active, corrupted }) {
  return (
    <div className={`w-12 h-12 rounded-lg border-2 ${active ? 'border-red-500/50' : 'border-white/5'} flex items-center justify-center relative`}>
      <div className={`w-3 h-3 rounded-full ${corrupted ? 'bg-red-500 animate-pulse' : active ? 'bg-red-500/20' : 'bg-white/5'}`} />
      {corrupted && <div className="absolute -inset-2 bg-red-500/20 rounded-lg blur animate-pulse" />}
    </div>
  );
}

function Flowline({ active }) {
  return (
    <div className="w-12 h-px bg-white/5 relative">
      {active && <div className="absolute inset-0 bg-red-500/40 shadow-[0_0_10px_red]" />}
    </div>
  );
}

function ToolItem({ label, icon }) {
  return (
    <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-red-500 hover:text-black transition-all group">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-display text-[10px] font-bold tracking-widest uppercase">{label}</span>
      </div>
      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
