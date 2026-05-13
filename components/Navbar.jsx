import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Terminal, Users, BrainCircuit, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-[100] px-6 py-4 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-8 py-3 border-white/5 bg-void/40 backdrop-blur-xl pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-neon-purple/20 border border-neon-purple/50 rounded-lg flex items-center justify-center shadow-neon-purple/20 group-hover:scale-110 transition-transform">
            <Terminal size={24} className="text-white" />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter text-white uppercase italic">
            CODE<span className="text-neon-purple">VERSE</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="DASHBOARD" />
          <NavLink href="/explorer" icon={<Rocket size={18} />} label="GALAXIES" />
          <NavLink href="/debug" icon={<Shield size={18} />} label="DIMENSION_X" />
          <NavLink href="/social" icon={<Users size={18} />} label="SOCIAL_HUB" />
          <NavLink href="/nova" icon={<BrainCircuit size={18} />} label="NOVA_AI" />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/aptitude" className="px-6 py-2.5 bg-neon-purple text-white font-display font-black text-[10px] tracking-widest rounded-xl hover:scale-105 transition-all shadow-neon-purple/20 uppercase">
            SYNC_PROFILE
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, icon, label }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 text-white/40 hover:text-white transition-all group relative py-2">
      <span className="group-hover:text-neon-cyan transition-colors">{icon}</span>
      <span className="font-display text-[10px] font-bold tracking-widest uppercase">{label}</span>
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan transition-all group-hover:w-full" />
    </Link>
  );
}
