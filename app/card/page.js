'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Clock, ShieldCheck, Flame, Bug, Zap, Cpu } from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import Navbar from '@/components/Navbar';
import AttributeRadar from '@/components/AttributeRadar';

export default function CardPage() {
  return (
    <main className="min-h-screen bg-void relative">
      <SpaceBackground />
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* Holographic Card Display */}
        <div className="relative group perspective-2000">
          <motion.div 
            initial={{ rotateY: -20, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-96 h-[600px] rounded-[40px] bg-void border border-white/20 shadow-neon-purple overflow-hidden"
          >
            <div className="holographic-shimmer" />
            <div className="scanline" />
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col gap-1">
                  <div className="px-3 py-1 bg-neon-purple/20 border border-neon-purple/50 rounded-full w-fit">
                    <span className="text-[10px] font-display font-bold tracking-widest text-neon-purple uppercase">LEGENDARY</span>
                  </div>
                  <div className="text-xs font-mono text-white/40">UID: CV_4290_X</div>
                </div>
                <div className="text-6xl font-display font-black italic text-white text-glow-purple">94</div>
              </div>

              {/* Avatar & Info */}
              <div className="text-center mb-10">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 bg-neon-purple blur-3xl opacity-20 animate-pulse" />
                  <div className="relative w-full h-full rounded-full border-4 border-neon-purple p-1.5 bg-void">
                    <div className="w-full h-full rounded-full overflow-hidden bg-cosmic-500/10">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl font-display font-black tracking-tightest mb-1 uppercase">NEO_ARCHITECT</h2>
                <p className="text-[10px] font-display font-bold tracking-[0.4em] text-neon-cyan uppercase">Master Debugger Archetype</p>
              </div>

              {/* Attributes Chart */}
              <div className="flex-1 flex items-center justify-center -mt-8">
                <AttributeRadar />
              </div>

              {/* Achievement Badges */}
              <div className="mt-auto flex justify-center gap-4">
                <BadgeIcon icon={<Flame size={18} />} color="text-neon-amber" />
                <BadgeIcon icon={<Bug size={18} />} color="text-red-500" />
                <BadgeIcon icon={<Cpu size={18} />} color="text-neon-cyan" />
                <BadgeIcon icon={<Zap size={18} />} color="text-neon-purple" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Card Details & Actions */}
        <div className="flex-1 space-y-10">
          <section>
            <h1 className="text-5xl font-display font-black mb-6 leading-tight">EVOLUTION_STATUS</h1>
            <p className="text-xl text-white/60 font-medium leading-relaxed mb-8">
              Your identity has synchronized with the <span className="text-neon-purple">Web Galaxy</span>. Every milestone achieved here is permanently etched into the holographic substrate of your card.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-3 px-8 py-4 bg-white text-void font-display font-black text-xs tracking-widest rounded-xl hover:scale-105 transition-transform">
                <Share2 size={18} /> EXPORT_IDENTITY
              </button>
              <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-display font-black text-xs tracking-widest rounded-xl hover:bg-white/10 transition-all">
                EVOLUTION_HISTORY
              </button>
            </div>
          </section>

          {/* Trial Status */}
          <section className="glass-panel p-8 border-l-4 border-neon-amber">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-neon-amber" />
                <h3 className="font-display font-bold text-lg tracking-widest">GATEKEEPER_TRIAL</h3>
              </div>
              <span className="font-mono text-xs text-neon-amber uppercase tracking-widest">PENDING_VERIFICATION</span>
            </div>
            <p className="text-sm text-white/40 mb-6 font-medium">To unlock the Legendary evolution path, you must pass a live architecture defense session with Nova AI.</p>
            <div className="flex items-center gap-2 text-white/60 font-mono text-[10px] uppercase">
              <Clock size={14} /> NEXT_SYNC_WINDOW: 12H 44M
            </div>
          </section>

          {/* Evolution Timeline Preview */}
          <section className="space-y-4">
            <h4 className="font-display text-[10px] tracking-[0.3em] text-white/20 uppercase">RECENT_MUTATIONS</h4>
            <div className="space-y-2">
              <MutationItem date="08.12.26" label="Logic attribute increased (+4)" />
              <MutationItem date="05.12.26" label="Unlocked 'Bug Hunter' Tier II badge" />
              <MutationItem date="01.12.26" label="OVR rank updated: 91 → 94" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function BadgeIcon({ icon, color }) {
  return (
    <div className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${color} hover:scale-110 transition-transform cursor-pointer`}>
      {icon}
    </div>
  );
}

function MutationItem({ date, label }) {
  return (
    <div className="flex items-center gap-4 text-xs font-medium">
      <span className="font-mono text-white/20">{date}</span>
      <span className="text-white/60">{label}</span>
    </div>
  );
}
