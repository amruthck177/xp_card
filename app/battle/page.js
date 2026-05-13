'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Timer, Users, MessageSquare, Zap, Trophy, Shield, Rocket, ChevronRight, X } from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';

export default function BattlePage() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [progressMe, setProgressMe] = useState(45);
  const [progressOpp, setProgressOpp] = useState(38);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
  };

  const handleFinish = () => setIsWinner(true);

  return (
    <main className="h-screen bg-void flex flex-col overflow-hidden relative">
      <SpaceBackground />
      
      {/* Battle Header */}
      <header className="h-20 border-b border-white/5 bg-void/80 backdrop-blur-xl flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-neon-cyan p-1 bg-void overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="me" />
            </div>
            <div>
              <h1 className="font-display text-sm font-black text-white">NEO_ARCHITECT</h1>
              <div className="font-mono text-[10px] text-neon-cyan">OVR_94 // STABLE</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className={`font-display text-2xl font-black ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="font-mono text-[8px] text-white/20 uppercase tracking-[0.5em]">SYSTEM_SYNC_WINDOW</div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <h1 className="font-display text-sm font-black text-white">ZERO_K</h1>
              <div className="font-mono text-[10px] text-neon-purple">OVR_98 // SYNCING</div>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-neon-purple p-1 bg-void overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=ZeroK" alt="opponent" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <Users size={16} className="text-neon-cyan" />
            <span className="font-mono text-xs text-white/60">2.4K SPECTATORS</span>
          </div>
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/20">
            <X size={20} />
          </div>
        </div>
      </header>

      {/* Battle Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* My Editor */}
        <div className="flex-1 flex flex-col relative border-r-2 border-void">
          <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
            <span className="font-mono text-[10px] text-neon-cyan uppercase font-bold tracking-widest">PROTOCOL_PROGRESS</span>
            <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div animate={{ width: `${progressMe}%` }} className="h-full bg-neon-cyan shadow-neon-cyan" />
            </div>
          </div>
          <div className="p-4 bg-white/5 border-b border-white/5 flex items-center gap-2">
            <Sword size={14} className="text-neon-cyan" />
            <span className="font-display text-[10px] font-bold text-white/40 tracking-widest uppercase">PRIMARY_WORK_NODE</span>
          </div>
          <div className="flex-1 bg-void/40 backdrop-blur-sm p-8 font-mono text-sm text-neon-cyan overflow-hidden">
            <pre>{`// Task: Implement a recursive depth-first search\n// for the system galaxy graph.\n\nfunction stabilizeCluster(galaxy) {\n  const stack = [galaxy.root];\n  const visited = new Set();\n\n  while (stack.length > 0) {\n    const node = stack.pop();\n    if (visited.has(node.id)) continue;\n    \n    // Initializing sync protocol...\n    node.sync();\n    visited.add(node.id);\n    \n    node.neighbors.forEach(neighbor => {\n      stack.push(neighbor);\n    });\n  }\n\n  return visited.size === galaxy.totalNodes;\n}`}</pre>
          </div>
        </div>

        {/* Question Panel (Floating Center) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 border-neon-amber/30 bg-void/90 shadow-neon-amber/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap size={20} className="text-neon-amber" />
              <h2 className="font-display text-xs font-bold tracking-widest text-white uppercase">MISSION_PROTOCOL_X9</h2>
            </div>
            <h3 className="text-xl font-display font-black mb-4 uppercase">STABILIZE_CLUSTER</h3>
            <p className="text-xs text-white/60 leading-relaxed font-medium mb-6 italic border-l-2 border-white/10 pl-4">
              "The AI Nebula has become fragmented. Implement a graph traversal algorithm to re-map the sub-sectors and verify connectivity."
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-[8px] font-display text-white/20 uppercase mb-1">XP_BOUNTY</div>
                <div className="font-mono text-sm text-neon-cyan">+1,200 XP</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-[8px] font-display text-white/20 uppercase mb-1">ELO_STAKE</div>
                <div className="font-mono text-sm text-neon-purple">+42 PTS</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Opponent Editor (Blurred/Simulated) */}
        <div className="flex-1 flex flex-col relative opacity-40 grayscale-[0.5]">
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
            <span className="font-mono text-[10px] text-neon-purple uppercase font-bold tracking-widest">OPPONENT_STABILITY</span>
            <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div animate={{ width: `${progressOpp}%` }} className="h-full bg-neon-purple shadow-neon-purple" />
            </div>
          </div>
          <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-end gap-2">
            <span className="font-display text-[10px] font-bold text-white/20 tracking-widest uppercase">ENCRYPTED_WORK_NODE</span>
            <Shield size={14} className="text-neon-purple" />
          </div>
          <div className="flex-1 bg-void/40 backdrop-blur-sm p-8 font-mono text-sm text-neon-purple/40 blur-[4px] select-none pointer-events-none">
            <pre>{`// Simulated opponent progress...\n// Data stream encrypted.\n// Logic nodes resolving...\n\nfunction analyzePattern(stream) {\n  const result = stream.filter(node => node.active);\n  return result.map(n => n.id);\n}`}</pre>
          </div>
        </div>
      </div>

      {/* Footer / Controls */}
      <footer className="h-24 bg-void/80 backdrop-blur-xl border-t border-white/5 px-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 glass-panel px-4 py-2 bg-white/[0.02]">
            <MessageSquare size={16} className="text-white/40" />
            <span className="font-mono text-xs text-white/60">LIVE_CHAT_SYNCED</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="font-display text-[10px] font-bold text-white/20 uppercase tracking-widest">KERNEL_VERSION</div>
            <div className="font-mono text-xs text-neon-cyan">v2.44.0-STABLE</div>
          </div>
          <button 
            onClick={handleFinish}
            className="px-10 py-4 bg-neon-cyan text-void font-display font-black text-sm tracking-widest rounded-xl hover:scale-105 transition-transform shadow-neon-cyan/20"
          >
            EXECUTE_FINALIZE
          </button>
        </div>
      </footer>

      {/* Winner Modal */}
      <AnimatePresence>
        {isWinner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-xl w-full glass-panel p-16 text-center border-neon-cyan shadow-neon-cyan/40 relative overflow-hidden"
            >
              <div className="scanline" />
              <div className="holographic-shimmer" />
              
              <div className="relative z-10">
                <div className="w-32 h-32 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-neon-cyan/50 relative">
                  <Trophy size={60} className="text-neon-cyan animate-bounce" />
                  <div className="absolute -inset-4 bg-neon-cyan/10 blur-xl animate-pulse" />
                </div>
                
                <h1 className="text-5xl font-display font-black mb-2 italic">VICTORY_SYNC</h1>
                <p className="font-mono text-xs text-neon-cyan tracking-[0.4em] uppercase mb-12">Cluster_Control: ESTABLISHED</p>
                
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <ResultItem label="XP_GAIN" value="+1,420" color="text-neon-cyan" />
                  <ResultItem label="ELO_GAIN" value="+42" color="text-neon-purple" />
                  <ResultItem label="KARMA" value="+8" color="text-neon-amber" />
                </div>

                <div className="flex flex-col gap-4">
                  <button className="w-full py-5 bg-neon-cyan text-void font-display font-black text-sm tracking-widest rounded-xl hover:scale-105 transition-transform">
                    RE-ENTER_DIMENSION
                  </button>
                  <button className="w-full py-5 bg-white/5 border border-white/10 text-white/40 font-display font-black text-[10px] tracking-[0.3em] rounded-xl hover:bg-white/10 transition-all">
                    BACK_TO_SOCIAL_HUB
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function ResultItem({ label, value, color }) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
      <span className="font-display text-[8px] font-bold text-white/20 tracking-widest uppercase">{label}</span>
      <span className={`font-mono text-lg font-black ${color}`}>{value}</span>
    </div>
  );
}
