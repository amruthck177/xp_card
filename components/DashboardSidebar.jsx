'use client';

import { motion } from 'framer-motion';
import { Home, Compass, Target, Sword, Users, Settings, Flame } from 'lucide-react';
import XPBar from './XPBar';

const NAV_LINKS = [
  { icon: <Home size={20} />, label: 'SYSTEM_HOME', coords: '00:00:00' },
  { icon: <Compass size={20} />, label: 'GALAXY_MAP', coords: '12:45:89' },
  { icon: <Target size={20} />, label: 'DIMENSION_X', coords: '99:01:42' },
  { icon: <Sword size={20} />, label: 'BATTLE_NET', coords: '33:12:01' },
  { icon: <Users size={20} />, label: 'CIV_HUB', coords: '05:88:21' },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-80 h-screen fixed left-0 top-0 border-r border-white/5 bg-void/80 backdrop-blur-xl p-6 flex flex-col z-50">
      {/* Mini Developer Card */}
      <div className="glass-panel p-4 mb-8 relative overflow-hidden group">
        <div className="scanline" />
        <div className="flex gap-4 items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center font-display text-xl">
            94
          </div>
          <div>
            <h3 className="font-display text-xs tracking-tight">NEO_ARCHITECT</h3>
            <p className="text-[10px] font-mono text-white/40">OVR_RANK_LEGEND</p>
          </div>
        </div>
        <XPBar current={4200} total={5000} level={24} />
      </div>

      {/* Streak Badge */}
      <div className="flex items-center gap-3 px-4 py-3 bg-neon-amber/10 border border-neon-amber/30 rounded-xl mb-8 group cursor-help">
        <Flame size={20} className="text-neon-amber animate-pulse" />
        <div className="flex flex-col">
          <span className="font-display text-[10px] tracking-widest text-white/40 uppercase">STREAK</span>
          <span className="font-mono text-xs font-bold text-neon-amber">12 DAYS ACTIVE</span>
        </div>
      </div>

      {/* Galaxy Navigation */}
      <nav className="flex-1 space-y-2">
        <p className="px-4 font-display text-[10px] tracking-[0.3em] text-white/20 uppercase mb-4">NAVIGATION_COORDS</p>
        {NAV_LINKS.map((link, idx) => (
          <motion.a
            key={link.label}
            whileHover={{ x: 5 }}
            href="#"
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-4 text-white/60 group-hover:text-neon-cyan transition-colors">
              {link.icon}
              <span className="font-display text-xs tracking-wider font-bold">{link.label}</span>
            </div>
            <span className="font-mono text-[8px] text-white/20 group-hover:text-neon-cyan/40">{link.coords}</span>
          </motion.a>
        ))}
      </nav>

      {/* Bottom Settings */}
      <button className="flex items-center gap-4 px-4 py-4 text-white/40 hover:text-white transition-colors border-t border-white/5">
        <Settings size={20} />
        <span className="font-display text-xs tracking-widest">SYSTEM_CONFIG</span>
      </button>
    </aside>
  );
}
