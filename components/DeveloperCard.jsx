'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Cpu, MessageSquare, Brain } from 'lucide-react';

export default function DeveloperCard() {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
      className="relative w-80 h-[480px] rounded-[32px] overflow-hidden border border-white/20 bg-void shadow-2xl group transition-all duration-500 perspective-1000"
    >
      {/* Background holographic patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-900/40 via-void to-neon-blue/10 opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      {/* Glow effects */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-neon-purple/20 rounded-full blur-[60px]" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-neon-blue/20 rounded-full blur-[60px]" />

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header: Rank & Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="px-3 py-1 bg-neon-blue/20 border border-neon-blue/40 rounded-full">
            <span className="text-[10px] font-display font-bold tracking-widest text-neon-blue uppercase">Legend</span>
          </div>
          <div className="text-4xl font-display font-black text-white italic group-hover:text-glow-blue transition-all">
            94
          </div>
        </div>

        {/* Avatar Area */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-neon-purple rounded-full blur-xl opacity-30 group-hover:opacity-60 animate-pulse-slow" />
          <div className="relative w-full h-full rounded-full border-2 border-neon-purple p-1 bg-void">
            <div className="w-full h-full rounded-full overflow-hidden bg-cosmic-900">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Status Indicator */}
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-neon-green rounded-full border-4 border-void shadow-glow" />
        </div>

        {/* User Info */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-display font-bold text-white tracking-tight mb-1">NEO_ARCHITECT</h3>
          <p className="text-xs font-display tracking-widest text-white/40 uppercase">The Master Debugger</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          <StatMini icon={<Cpu size={14} />} label="Frontend" value="92" color="text-neon-blue" />
          <StatMini icon={<Brain size={14} />} label="AI IQ" value="88" color="text-neon-purple" />
          <StatMini icon={<Target size={14} />} label="Logic" value="96" color="text-neon-yellow" />
          <StatMini icon={<Shield size={14} />} label="Security" value="85" color="text-neon-pink" />
        </div>

        {/* Footer: Galaxy */}
        <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-neon-yellow" />
            <span className="text-[10px] font-display font-semibold tracking-wider text-white/60">KARMA: 1.2K</span>
          </div>
          <div className="text-[10px] font-display font-semibold tracking-wider text-neon-blue">AI GALAXY</div>
        </div>
      </div>

      {/* Holographic shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
    </motion.div>
  );
}

function StatMini({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2 border border-white/5">
      <div className={`${color}`}>{icon}</div>
      <div className="flex flex-col">
        <span className="text-[8px] font-display text-white/40 uppercase">{label}</span>
        <span className="text-xs font-bold text-white tracking-tighter">{value}</span>
      </div>
    </div>
  );
}
