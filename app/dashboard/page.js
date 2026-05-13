'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Timer, Trophy, Star, ArrowUpRight, Zap } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import SpaceBackground from '@/components/SpaceBackground';
import NovaMentor from '@/components/NovaMentor';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-void">
      <SpaceBackground />
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="pl-80 min-h-screen">
        <header className="px-10 py-8 flex justify-between items-center border-b border-white/5 bg-void/50 backdrop-blur-md sticky top-0 z-40">
          <div>
            <h1 className="font-display text-2xl font-black tracking-tight">SYSTEM_DASHBOARD</h1>
            <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase">Initializing learning protocols... Status: STABLE</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-neon-cyan animate-pulse" />
              <span className="font-mono text-xs text-white/60">NODE_B7_ACTIVE</span>
            </div>
          </div>
        </header>

        <div className="p-10 space-y-10">
          {/* Daily Challenge Banner */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-neon-amber/30 bg-neon-amber/5 p-8 flex items-center justify-between group"
          >
            <div className="scanline" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-neon-amber mb-2">
                <Timer size={18} />
                <span className="font-display text-xs font-bold tracking-widest uppercase">DAILY_EVENT_WINDOW</span>
              </div>
              <h2 className="text-3xl font-display font-black mb-2">THE_MEMORY_VOID</h2>
              <p className="text-white/60 font-medium max-w-lg mb-6">A critical memory leak is consuming the central core. Trace and terminate the leak before system collapse.</p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-neon-amber text-void font-display font-black text-xs tracking-widest rounded-lg hover:scale-105 transition-transform">
                  INITIALIZE_CHALLENGE
                </button>
                <div className="px-4 py-3 flex flex-col justify-center">
                  <span className="font-mono text-[10px] text-white/40 uppercase">EXPIRES_IN</span>
                  <span className="font-mono text-lg text-neon-amber">04:12:44</span>
                </div>
              </div>
            </div>
            <Zap size={120} className="text-neon-amber/10 absolute right-12 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
          </motion.section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* Active Mission */}
            <div className="xl:col-span-2 space-y-8">
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-sm tracking-[0.3em] text-white/40 uppercase">ACTIVE_MISSION_STREAM</h3>
                  <button className="text-neon-cyan font-display text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:underline">
                    VIEW_ALL_PLANETS <ArrowUpRight size={14} />
                  </button>
                </div>
                <div className="glass-panel p-8 flex gap-8 items-center border-t-4 border-neon-purple">
                  <div className="w-32 h-32 rounded-2xl bg-cosmic-500/20 border border-cosmic-500/40 flex items-center justify-center relative">
                    <Star size={48} className="text-neon-purple animate-pulse" />
                    <div className="absolute inset-0 rounded-2xl bg-neon-purple/10 blur-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-2xl font-display font-black">REACT_ORBITALS</h4>
                        <p className="text-white/40 text-xs font-mono">PLANET_JS_GALAXY_WEB</p>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-2xl font-black text-neon-purple">72%</div>
                        <div className="text-[10px] font-mono text-white/20 uppercase">STABILITY_SYNC</div>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                      <div className="h-full w-[72%] bg-neon-purple" />
                    </div>
                    <button className="flex items-center gap-3 px-6 py-3 bg-white text-void font-display font-black text-xs tracking-widest rounded-lg hover:bg-neon-cyan hover:text-white transition-all">
                      <Play size={16} fill="currentColor" /> RESUME_MISSION
                    </button>
                  </div>
                </div>
              </section>

              {/* Recommended Paths */}
              <section>
                <h3 className="font-display text-sm tracking-[0.3em] text-white/40 uppercase mb-6">SUGGESTED_GALAXIES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PathCard 
                    title="AI_NEBULA" 
                    desc="Master neural network architectures and LLM integration protocols."
                    color="border-neon-purple"
                    icon={<Zap className="text-neon-purple" size={20} />}
                  />
                  <PathCard 
                    title="CYBER_VOID" 
                    desc="Initialize security defensive layers and penetration simulations."
                    color="border-neon-cyan"
                    icon={<Star className="text-neon-cyan" size={20} />}
                  />
                </div>
              </section>
            </div>

            {/* Leaderboard & Stats */}
            <aside className="space-y-8">
              <section>
                <h3 className="font-display text-sm tracking-[0.3em] text-white/40 uppercase mb-6">CIV_LEADERBOARD</h3>
                <div className="glass-panel overflow-hidden">
                  <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between font-display text-[10px] tracking-widest text-white/20">
                    <span>ARCHITECT</span>
                    <span>OVR_RANK</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    <LeaderboardRow rank={1} name="ZERO_K" ovr={98} xp="+2.4k" />
                    <LeaderboardRow rank={2} name="X_PHANTOM" ovr={96} xp="+1.8k" />
                    <LeaderboardRow rank={3} name="DATA_GHOST" ovr={95} xp="+1.2k" />
                    <LeaderboardRow rank={4} name="PIXEL_LORD" ovr={92} xp="+900" />
                    <LeaderboardRow rank={5} name="CODE_TITAN" ovr={91} xp="+850" />
                  </div>
                  <button className="w-full p-4 font-display text-[10px] font-bold tracking-[0.2em] text-white/20 hover:text-white transition-colors text-center uppercase border-t border-white/5">
                    VIEW_GLOBAL_RANKINGS
                  </button>
                </div>
              </section>

              {/* Stat Quicklook */}
              <div className="glass-panel p-6 border-l-2 border-neon-cyan">
                <div className="flex items-center gap-4 mb-4">
                  <Trophy className="text-neon-cyan" />
                  <h4 className="font-display font-bold text-sm">REPUTATION_SCORE</h4>
                </div>
                <div className="text-3xl font-display font-black text-white mb-2">1,240 <span className="text-neon-cyan text-sm">KM</span></div>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Global Karma Ranking: Top 4%</p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <NovaMentor />
    </main>
  );
}

function PathCard({ title, desc, color, icon }) {
  return (
    <div className={`glass-panel p-6 border-l-4 ${color} hover:bg-white/5 transition-all cursor-pointer group`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">{icon}</div>
        <ArrowUpRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
      </div>
      <h4 className="font-display font-bold text-sm mb-2">{title}</h4>
      <p className="text-xs text-white/40 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function LeaderboardRow({ rank, name, ovr, xp }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-all group">
      <div className="flex items-center gap-4">
        <span className={`font-mono text-xs font-bold ${rank === 1 ? 'text-neon-amber' : 'text-white/20'}`}>0{rank}</span>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} />
        </div>
        <div>
          <div className="font-display text-xs font-bold group-hover:text-neon-cyan transition-colors">{name}</div>
          <div className="font-mono text-[8px] text-neon-cyan">{xp} XP_DELTA</div>
        </div>
      </div>
      <div className="font-display text-lg font-black text-white/60 group-hover:text-white">{ovr}</div>
    </div>
  );
}
