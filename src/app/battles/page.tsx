"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Users, ShieldAlert, Swords, Trophy, 
  User, Timer, Flame, Play, Sword, Shield,
  Gamepad2, Skull
} from 'lucide-react';

const modes = [
  { id: '1v1', title: '1v1 Speed Battle', icon: <Swords />, color: 'from-blue-500 to-cyan-500', desc: 'Solve faster than your opponent.', players: '2' },
  { id: 'team', title: 'Team Projects', icon: <Users />, color: 'from-purple-500 to-pink-500', desc: 'Collaborate on complex tasks.', players: '4-8' },
  { id: 'boss', title: 'AI Boss Raid', icon: <Skull />, color: 'from-red-600 to-orange-600', desc: 'Defeat the Memory Leak Dragon.', players: 'Co-op' },
];

const activeBattles = [
  { id: 1, type: '1v1', players: ['AlphaCode', 'CyberMage'], task: 'Reverse Linked List', time: '02:45', intensity: 85 },
  { id: 2, type: 'boss', players: ['DevSlayer', 'BugHunter'], task: 'Memory Leak Dragon', time: '12:20', intensity: 95 },
  { id: 3, type: 'team', players: ['Team Phoenix', 'Team Void'], task: 'Microservices Auth', time: '45:00', intensity: 70 },
];

export default function BattleArena() {
  const [selectedMode, setSelectedMode] = useState(modes[0]);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
           <div className="w-20 h-20 bg-yellow-400/20 rounded-3xl flex items-center justify-center border border-yellow-400/30">
              <Zap className="w-10 h-10 text-yellow-400" />
           </div>
           <div>
              <h1 className="text-4xl font-black">BATTLE ARENA</h1>
              <p className="text-white/50">Test your skills in real-time high-stakes coding combat.</p>
           </div>
        </div>
        
        <div className="flex items-center gap-4 glass px-6 py-3 rounded-2xl border-white/5">
           <Trophy className="w-5 h-5 text-yellow-400" />
           <div className="flex flex-col">
              <span className="text-[10px] text-white/40 font-black uppercase">Battle Rank</span>
              <span className="text-lg font-black text-white">#1,204 <span className="text-xs text-neon-cyan font-bold">PLATINUM II</span></span>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Battle Modes */}
        <div className="lg:col-span-1 space-y-4">
           <h2 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">Choose Your Battle</h2>
           {modes.map((mode) => (
             <motion.div
               key={mode.id}
               whileHover={{ scale: 1.02 }}
               onClick={() => setSelectedMode(mode)}
               className={`p-6 rounded-3xl border cursor-pointer transition-all relative overflow-hidden ${
                 selectedMode.id === mode.id 
                 ? 'bg-white/5 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.1)]' 
                 : 'glass border-white/5'
               }`}
             >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mode.color} opacity-10 blur-2xl`} />
                <div className="flex items-center gap-4 relative z-10">
                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center text-white shrink-0 shadow-lg`}>
                      {React.cloneElement(mode.icon as React.ReactElement, { className: 'w-6 h-6' })}
                   </div>
                   <div>
                      <h3 className="font-black text-lg">{mode.title}</h3>
                      <p className="text-xs text-white/40">{mode.desc}</p>
                   </div>
                </div>
                <div className="mt-4 flex items-center justify-between relative z-10">
                   <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded text-white/60 uppercase">{mode.players} PLAYERS</span>
                   <button className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                     selectedMode.id === mode.id ? 'bg-yellow-400 text-black' : 'bg-white/5 text-white/60'
                   }`}>
                      JOIN QUEUE
                   </button>
                </div>
             </motion.div>
           ))}

           <div className="glass p-6 rounded-3xl border-white/5 bg-gradient-to-br from-red-500/10 to-transparent border-red-500/20">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                 <ShieldAlert className="w-4 h-4" />
                 <span className="text-xs font-black uppercase tracking-widest">Urgent Quest</span>
              </div>
              <h4 className="font-bold text-sm mb-1">Infinite Loop Outbreak!</h4>
              <p className="text-xs text-white/50 mb-4">The Frontend District is being overrun by infinite loops. Deploy now to save the grid.</p>
              <button className="w-full py-2 bg-red-500 text-white font-bold rounded-xl text-xs hover:bg-red-600 transition-colors">ACCEPT QUEST</button>
           </div>
        </div>

        {/* Live Feed / Active Battles */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                 <Gamepad2 className="w-5 h-5 text-neon-cyan" />
                 Live Spectate
              </h2>
              <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black rounded-full border border-red-500/20 uppercase animate-pulse">42 Battles Active</span>
           </div>

           <div className="grid md:grid-cols-2 gap-6">
              {activeBattles.map((battle) => (
                <motion.div 
                  key={battle.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all group"
                >
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{battle.type} Battle</span>
                         <h4 className="font-bold text-sm text-neon-cyan">{battle.task}</h4>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-white/60">
                         <Timer className="w-3 h-3" />
                         {battle.time}
                      </div>
                   </div>

                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5">
                            <div className="w-full h-full rounded-full bg-space-950 flex items-center justify-center">
                               <User className="w-5 h-5 text-white/40" />
                            </div>
                         </div>
                         <span className="text-xs font-bold">{battle.players[0]}</span>
                      </div>
                      <div className="text-lg font-black italic text-white/10">VS</div>
                      <div className="flex items-center gap-2 text-right">
                         <span className="text-xs font-bold">{battle.players[1]}</span>
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-0.5">
                            <div className="w-full h-full rounded-full bg-space-950 flex items-center justify-center">
                               <User className="w-5 h-5 text-white/40" />
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${battle.intensity}%` }}
                           className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                         />
                      </div>
                      <div className="flex justify-between text-[10px] font-black text-white/40 uppercase">
                         <span>INTENSITY</span>
                         <span className="text-neon-cyan">{battle.intensity}%</span>
                      </div>
                   </div>

                   <button className="w-full mt-6 py-2 glass rounded-xl text-xs font-bold text-white/60 group-hover:bg-white/10 group-hover:text-white transition-all flex items-center justify-center gap-2">
                      <Play className="w-3 h-3 fill-current" /> SPECTATE MATCH
                   </button>
                </motion.div>
              ))}
           </div>

           {/* Global Feed */}
           <div className="glass p-8 rounded-3xl border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Swords className="w-32 h-32" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-6">Recent Combat History</h3>
              <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-green-500" />
                         </div>
                         <div>
                            <div className="text-sm font-bold">CodeNinja defeated BugMaster</div>
                            <div className="text-[10px] text-white/40 uppercase font-black">1v1 Speed Battle • +250 XP</div>
                         </div>
                      </div>
                      <span className="text-xs text-white/40 font-medium">2m ago</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
