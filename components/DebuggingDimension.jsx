'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Terminal, Zap, Bug } from 'lucide-react';

export default function DebuggingDimension() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background glitch effect mockup */}
      <div className="absolute inset-0 bg-red-500/5 opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 order-2 lg:order-1">
            <div className="relative group">
              {/* Corrupted Code Window Mockup */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-neon-purple rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-void border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">system_failure.log</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-white/20">08:42:11 [SYSTEM] INITIALIZING CORE...</div>
                  <div className="text-white/20">08:42:12 [KERNEL] ALLOCATING MEMORY...</div>
                  <div className="flex gap-4">
                    <span className="text-white/20">08:42:13</span>
                    <span className="text-red-500 animate-pulse font-bold">[CRITICAL] MEMORY_LEAK_DETECTED</span>
                  </div>
                  <div className="text-neon-blue">08:42:14 [NOVA] ANALYZING ROOT CAUSE...</div>
                  <div className="pl-4 text-white/60 italic border-l-2 border-neon-purple py-1">
                    "Look at the event listener in line 42, developer. It's never detached."
                  </div>
                  <div className="text-white/20">08:42:15 [SYSTEM] STANDBY FOR MANUAL REPAIR...</div>
                  <div className="flex items-center gap-2 text-white bg-white/5 p-2 rounded border border-white/10">
                    <span className="text-neon-green">$</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>
              
              {/* Floating warning badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-4 bg-red-500 rounded-2xl shadow-neon-pink border-2 border-void flex items-center gap-3"
              >
                <AlertTriangle size={24} className="text-white" />
                <div className="text-left">
                  <div className="text-[10px] font-display font-bold text-white/70 uppercase">Incident</div>
                  <div className="text-xs font-display font-black text-white">MEMORY LEAK</div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">
              THE <span className="text-red-500 text-glow-red">DEBUGGING</span> <br />
              DIMENSION.
            </h2>
            <p className="text-xl text-white/60 mb-8 leading-relaxed font-medium">
              Enter the Planet of Broken Systems. Real developers spend 80% of their time fixing what's broken. We've gamified the struggle.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <Bug className="text-red-500 mb-2" size={20} />
                <h4 className="text-sm font-display font-bold text-white mb-1">REAL BUGS</h4>
                <p className="text-xs text-white/40">From syntax errors to memory leaks and race conditions.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <Zap className="text-neon-yellow mb-2" size={20} />
                <h4 className="text-sm font-display font-bold text-white mb-1">BOSS FIGHTS</h4>
                <p className="text-xs text-white/40">Save production environments while under intense pressure.</p>
              </div>
            </div>
            <button className="btn-primary bg-red-600 hover:shadow-red-500/50">
              ENTER THE DIMENSION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
