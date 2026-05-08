"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Map, Zap, Cpu, Code, 
  Shield, Terminal, Search, Compass, 
  MapPin, Wind, Sparkles, Trophy
} from 'lucide-react';

const districts = [
  { id: 'frontend', name: 'Frontend District', icon: <Code />, color: 'bg-cyan-500', desc: 'The hub of pixels and UI mastery.', quests: 12, danger: 'Low' },
  { id: 'ai', name: 'AI Labs', icon: <Cpu />, color: 'bg-purple-500', desc: 'Neural networks and LLM experiments.', quests: 8, danger: 'High' },
  { id: 'cyber', name: 'Cyber Arena', icon: <Shield />, color: 'bg-red-500', desc: 'Defend the grid from loop outbreaks.', quests: 15, danger: 'Extreme' },
  { id: 'backend', name: 'Logic Fortress', icon: <Terminal />, color: 'bg-orange-500', desc: 'Master scaling and server architecture.', quests: 10, danger: 'Medium' },
];

export default function DevCity() {
  const [activeDistrict, setActiveDistrict] = useState(districts[0]);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
           <div className="w-20 h-20 bg-neon-cyan/20 rounded-3xl flex items-center justify-center border border-neon-cyan/30">
              <Globe className="w-10 h-10 text-neon-cyan" />
           </div>
           <div>
              <h1 className="text-4xl font-black">OPEN WORLD DEV CITY</h1>
              <p className="text-white/50">Explore the futuristic metropolis of developer mastery.</p>
           </div>
        </div>
        
        <div className="flex glass px-6 py-3 rounded-2xl border-white/5 gap-8">
           <CityStat label="Active Quests" value="45" color="cyan" />
           <div className="w-px h-10 bg-white/10" />
           <CityStat label="Unlocked Zones" value="4/12" color="purple" />
           <div className="w-px h-10 bg-white/10" />
           <CityStat label="Global Rank" value="#420" color="yellow" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 h-[700px]">
        {/* Interactive Map Area */}
        <div className="lg:col-span-2 glass rounded-[3rem] border-white/5 relative overflow-hidden bg-[#020617]">
           {/* Grid Background */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
           
           {/* District Nodes */}
           <div className="absolute inset-0 p-20 flex items-center justify-center">
              <div className="relative w-full h-full">
                 {districts.map((district, idx) => (
                   <motion.div
                     key={district.id}
                     whileHover={{ scale: 1.1 }}
                     onClick={() => setActiveDistrict(district)}
                     className={`absolute cursor-pointer group`}
                     style={{
                       top: `${20 + (idx * 20)}%`,
                       left: `${15 + (idx * 20)}%`,
                     }}
                   >
                      <div className={`w-16 h-16 rounded-full ${district.id === activeDistrict.id ? district.color : 'bg-white/10'} flex items-center justify-center text-white shadow-2xl relative z-10 transition-colors duration-500`}>
                         {React.cloneElement(district.icon, { className: 'w-8 h-8' })}
                         <div className={`absolute inset-0 rounded-full blur-xl ${district.color} opacity-20 animate-pulse`} />
                      </div>
                      <div className="absolute top-1/2 left-full ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-sm font-bold text-white bg-black/80 px-3 py-1 rounded-full border border-white/10">{district.name}</span>
                      </div>
                      
                      {/* Connection Lines (Mock) */}
                      {idx < districts.length - 1 && (
                        <div className="absolute top-8 left-8 w-40 h-px bg-gradient-to-r from-white/20 to-transparent rotate-45 origin-left -z-0" />
                      )}
                   </motion.div>
                 ))}
                 
                 {/* Central Hub */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-neon-cyan/20 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                       <div className="w-20 h-20 rounded-full border border-neon-cyan/40 flex items-center justify-center">
                          <Rocket className="w-8 h-8 text-neon-cyan/40" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Map Controls */}
           <div className="absolute bottom-8 left-8 flex gap-2">
              <button className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors"><Search className="w-4 h-4" /></button>
              <button className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors"><Compass className="w-4 h-4" /></button>
           </div>
        </div>

        {/* District Intelligence */}
        <div className="space-y-6">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeDistrict.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass p-8 rounded-[2rem] border-white/5 h-full flex flex-col"
              >
                 <div className={`w-16 h-16 rounded-2xl ${activeDistrict.color} flex items-center justify-center text-white mb-6 shadow-xl`}>
                    {React.cloneElement(activeDistrict.icon, { className: 'w-8 h-8' })}
                 </div>
                 <h2 className="text-3xl font-black mb-2 uppercase italic tracking-tighter">{activeDistrict.name}</h2>
                 <p className="text-white/50 text-sm leading-relaxed mb-8">{activeDistrict.desc}</p>
                 
                 <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                       <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Danger Level</div>
                       <div className={`text-sm font-bold ${activeDistrict.danger === 'Extreme' ? 'text-red-500' : 'text-neon-cyan'}`}>{activeDistrict.danger}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                       <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Active Quests</div>
                       <div className="text-sm font-bold text-white">{activeDistrict.quests}</div>
                    </div>
                 </div>

                 <div className="space-y-4 flex-1">
                    <h3 className="text-xs font-black text-white/30 uppercase tracking-widest mb-2">Available Quests</h3>
                    <QuestItem title="Refactor the Grid Core" reward="+500 XP" time="2h" />
                    <QuestItem title="Defeat Infinite Loop" reward="+1200 XP" time="4h" danger />
                    <QuestItem title="API Gateway Patch" reward="+300 XP" time="1h" />
                 </div>

                 <button className={`w-full mt-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl ${activeDistrict.color} text-white`}>
                    DEPLOY TO DISTRICT
                 </button>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const CityStat = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="flex flex-col">
     <span className="text-xs font-black text-white/30 uppercase tracking-widest">{label}</span>
     <span className={`text-xl font-black text-neon-${color}`}>{value}</span>
  </div>
);

const QuestItem = ({ title, reward, time, danger }: { title: string; reward: string; time: string; danger?: boolean }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-white/5">
     <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${danger ? 'bg-red-500 animate-pulse' : 'bg-neon-cyan'}`} />
        <div>
           <div className="text-sm font-bold group-hover:text-white transition-colors">{title}</div>
           <div className="text-[10px] font-black text-white/30 uppercase">{time} • {reward}</div>
        </div>
     </div>
     <Trophy className="w-4 h-4 text-white/10 group-hover:text-yellow-400 transition-all" />
  </div>
);
