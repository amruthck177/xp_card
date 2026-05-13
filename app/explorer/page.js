'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Lock, ChevronLeft, Zap, Target, Star, BrainCircuit } from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import Navbar from '@/components/Navbar';

const GALAXIES = [
  { id: 'web', name: 'WEB_GALAXY', x: '20%', y: '30%', color: '#06b6d4', progress: 72, planets: [
    { name: 'Planet_JS', status: 'Active', progress: 85 },
    { name: 'React_Orbit', status: 'Locked', progress: 0 },
    { name: 'Next_Core', status: 'Locked', progress: 0 },
  ]},
  { id: 'ai', name: 'AI_NEBULA', x: '50%', y: '60%', color: '#6366f1', progress: 45, planets: [
    { name: 'Neural_Node', status: 'Active', progress: 45 },
    { name: 'LLM_Cluster', status: 'Locked', progress: 0 },
  ]},
  { id: 'cyber', name: 'CYBER_VOID', x: '80%', y: '25%', color: '#f59e0b', progress: 12, planets: [
    { name: 'Auth_Edge', status: 'Active', progress: 12 },
  ]},
  { id: 'game', name: 'GAME_REALM', x: '30%', y: '75%', color: '#10b981', progress: 0 },
  { id: 'cloud', name: 'CLOUD_CLUSTER', x: '70%', y: '80%', color: '#3b82f6', progress: 0 },
];

export default function ExplorerPage() {
  const [selectedGalaxy, setSelectedGalaxy] = useState(null);

  return (
    <main className="min-h-screen bg-void overflow-hidden relative">
      <SpaceBackground />
      <Navbar />

      <AnimatePresence mode="wait">
        {!selectedGalaxy ? (
          <motion.div 
            key="star-map"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative h-screen w-full flex items-center justify-center"
          >
            {/* Constellation lines (Static mockup) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <line x1="20%" y1="30%" x2="50%" y2="60%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="60%" x2="80%" y2="25%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="60%" x2="30%" y2="75%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="60%" x2="70%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            <div className="text-center absolute top-32 z-20">
              <h1 className="text-4xl font-display font-black tracking-widest text-white mb-2 uppercase">Galaxy_Navigator</h1>
              <p className="font-mono text-[10px] text-white/40 tracking-[0.5em] uppercase">Select a sector to initialize orbital sync</p>
            </div>

            {GALAXIES.map((galaxy) => (
              <GalaxyNode 
                key={galaxy.id} 
                galaxy={galaxy} 
                onClick={() => setSelectedGalaxy(galaxy)} 
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="planet-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen w-full flex items-center justify-center relative p-20"
          >
            <button 
              onClick={() => setSelectedGalaxy(null)}
              className="absolute top-32 left-20 flex items-center gap-3 text-white/40 hover:text-white transition-colors font-display text-xs tracking-widest"
            >
              <ChevronLeft size={20} /> RETURN_TO_CLUSTER
            </button>

            <div className="flex flex-col lg:flex-row items-center gap-20 w-full max-w-7xl">
              {/* Planet Visualization Area */}
              <div className="relative flex-1 aspect-square max-w-[500px]">
                <div className="absolute inset-0 rounded-full border border-white/5 animate-orbit" />
                <div className="absolute inset-0 rounded-full border border-white/5 rotate-45 animate-orbit" style={{ animationDirection: 'reverse' }} />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    layoutId={`galaxy-${selectedGalaxy.id}`}
                    className="w-48 h-48 rounded-full border-4 border-void shadow-2xl relative flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: selectedGalaxy.color + '20', borderColor: selectedGalaxy.color }}
                  >
                    <div className="absolute inset-0 opacity-30 animate-pulse" style={{ background: `radial-gradient(circle, ${selectedGalaxy.color}, transparent)` }} />
                    <Globe size={80} style={{ color: selectedGalaxy.color }} />
                  </motion.div>
                </div>

                {/* Orbiting Planets Mockup */}
                {selectedGalaxy.planets?.map((p, i) => (
                  <motion.div 
                    key={p.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="absolute"
                    style={{ 
                      top: `${50 + 40 * Math.sin(i * 2)}%`, 
                      left: `${50 + 40 * Math.cos(i * 2)}%` 
                    }}
                  >
                    <div className={`w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center bg-void group cursor-pointer hover:border-white transition-all`}>
                      {p.status === 'Locked' ? <Lock size={14} className="text-white/20" /> : <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-neon-cyan" />}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Side Panel Info */}
              <div className="w-full lg:w-96 space-y-8">
                <header>
                  <h2 className="text-5xl font-display font-black mb-2" style={{ color: selectedGalaxy.color }}>{selectedGalaxy.name}</h2>
                  <p className="font-mono text-[10px] text-white/40 tracking-[0.4em] uppercase">Sector_Stability: {selectedGalaxy.progress}%</p>
                </header>

                <div className="space-y-4">
                  <h4 className="font-display text-[10px] tracking-[0.3em] text-white/20 uppercase">Available_Planets</h4>
                  {selectedGalaxy.planets?.map((planet) => (
                    <div key={planet.name} className="glass-panel p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className={`w-1.5 h-1.5 rounded-full ${planet.status === 'Locked' ? 'bg-white/20' : 'bg-neon-cyan'}`} />
                        <div>
                          <div className="font-display text-sm font-bold tracking-tight">{planet.name}</div>
                          <div className="font-mono text-[8px] text-white/40 uppercase">{planet.status}</div>
                        </div>
                      </div>
                      {planet.status === 'Active' && <Zap size={16} className="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
                  <BrainCircuit className="text-neon-purple mt-1 flex-shrink-0" size={24} />
                  <div>
                    <div className="text-xs font-display font-bold text-white mb-2 tracking-widest uppercase">Nova_Recommendation</div>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">"Synchronize with <span className="text-neon-cyan">Planet_JS</span> first. Your logical profile shows high compatibility with asynchronous event loops."</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function GalaxyNode({ galaxy, onClick }) {
  return (
    <motion.div
      layoutId={`galaxy-${galaxy.id}`}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className="absolute cursor-pointer group"
      style={{ top: galaxy.y, left: galaxy.x, transform: 'translate(-50%, -50%)' }}
    >
      <div className="relative">
        <div className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: galaxy.color }} />
        <div className="w-16 h-16 rounded-full border-2 border-void flex items-center justify-center relative bg-void shadow-2xl transition-all group-hover:scale-110" style={{ borderColor: galaxy.color }}>
          <Globe size={32} style={{ color: galaxy.color }} />
        </div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
          <div className="font-display text-[10px] font-black tracking-widest text-white group-hover:text-glow-white transition-all uppercase">{galaxy.name}</div>
          <div className="font-mono text-[8px] text-white/40">{galaxy.progress}% SYNC</div>
        </div>
      </div>
    </motion.div>
  );
}
