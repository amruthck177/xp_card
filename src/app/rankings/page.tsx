"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Flame, User, ArrowUp, ArrowDown, Search } from 'lucide-react';

const leaderboard = [
  { rank: 1, name: 'AlphaCode', level: 124, xp: '450,000', badges: 42, trend: 'up' },
  { rank: 2, name: 'CyberMage', level: 118, xp: '425,000', badges: 38, trend: 'down' },
  { rank: 3, name: 'DevSlayer', level: 112, xp: '390,000', badges: 40, trend: 'up' },
  { rank: 4, name: 'BugHunter', level: 105, xp: '360,000', badges: 35, trend: 'stable' },
  { rank: 5, name: 'CodeNinja', level: 98, xp: '340,000', badges: 32, trend: 'up' },
  { rank: 6, name: 'LogicMaster', level: 92, xp: '310,000', badges: 28, trend: 'down' },
  { rank: 7, name: 'StackOverlord', level: 88, xp: '290,000', badges: 25, trend: 'up' },
];

export default function GlobalLeaderboard() {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <Trophy className="w-8 h-8 text-yellow-400" />
             <h1 className="text-4xl font-black">GLOBAL RANKINGS</h1>
          </div>
          <p className="text-white/50">The world's most legendary architects. Are you ready to climb?</p>
        </div>

        <div className="relative w-full md:w-80">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
           <input 
             type="text" 
             placeholder="Search architects..." 
             className="w-full glass bg-white/5 border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-neon-cyan/50 focus:outline-none transition-colors"
           />
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
         {leaderboard.slice(0, 3).map((player, idx) => (
           <motion.div
             key={player.rank}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             className={`relative p-8 rounded-3xl border flex flex-col items-center text-center overflow-hidden ${
                idx === 0 ? 'glass bg-yellow-400/5 border-yellow-400/30 scale-110 z-10' :
                idx === 1 ? 'glass bg-slate-400/5 border-slate-400/30' :
                'glass bg-orange-400/5 border-orange-400/30'
             }`}
           >
              {idx === 0 && <Flame className="absolute top-4 right-4 w-6 h-6 text-yellow-400 animate-pulse" />}
              <div className={`w-20 h-20 rounded-full mb-6 p-1 bg-gradient-to-br ${
                 idx === 0 ? 'from-yellow-400 to-orange-500' :
                 idx === 1 ? 'from-slate-300 to-slate-500' :
                 'from-orange-400 to-red-600'
              }`}>
                 <div className="w-full h-full rounded-full bg-space-950 flex items-center justify-center">
                    <User className="w-10 h-10 text-white/20" />
                 </div>
              </div>
              <h3 className="text-2xl font-black mb-1">{player.name}</h3>
              <div className="text-xs font-black text-neon-cyan uppercase tracking-widest mb-4">LVL {player.level} Architect</div>
              
              <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-white/5">
                 <div>
                    <div className="text-lg font-black text-white">{player.xp}</div>
                    <div className="text-[10px] text-white/40 uppercase font-black">Total XP</div>
                 </div>
                 <div>
                    <div className="text-lg font-black text-white">{player.badges}</div>
                    <div className="text-[10px] text-white/40 uppercase font-black">Badges</div>
                 </div>
              </div>
              
              <div className={`absolute top-0 left-0 px-4 py-2 font-black text-xl italic ${
                 idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-slate-400' : 'text-orange-400'
              }`}>
                 #{player.rank}
              </div>
           </motion.div>
         ))}
      </div>

      {/* Leaderboard Table */}
      <div className="glass rounded-3xl border-white/5 overflow-hidden">
         <div className="grid grid-cols-6 p-6 border-b border-white/10 text-xs font-black text-white/40 uppercase tracking-widest">
            <span className="col-span-1">Rank</span>
            <span className="col-span-2">Architect</span>
            <span className="col-span-1">Level</span>
            <span className="col-span-1">Badges</span>
            <span className="col-span-1 text-right">Total XP</span>
         </div>
         <div className="divide-y divide-white/5">
            {leaderboard.map((player, idx) => (
              <motion.div 
                key={player.rank}
                whileHover={{ bg: 'rgba(255,255,255,0.02)' }}
                className="grid grid-cols-6 p-6 items-center"
              >
                 <div className="col-span-1 flex items-center gap-3">
                    <span className={`text-lg font-black italic ${idx < 3 ? 'text-neon-cyan' : 'text-white/20'}`}>#{player.rank}</span>
                    {player.trend === 'up' && <ArrowUp className="w-3 h-3 text-green-500" />}
                    {player.trend === 'down' && <ArrowDown className="w-3 h-3 text-red-500" />}
                 </div>
                 <div className="col-span-2 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5" />
                    <span className="font-bold">{player.name}</span>
                 </div>
                 <div className="col-span-1 font-black text-neon-cyan">LVL {player.level}</div>
                 <div className="col-span-1 flex items-center gap-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="font-bold">{player.badges}</span>
                 </div>
                 <div className="col-span-1 text-right font-black text-white">{player.xp}</div>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
