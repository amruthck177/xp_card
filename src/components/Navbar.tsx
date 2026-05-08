"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Bug, Brain, Users, Trophy, User } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-xl flex items-center justify-center shadow-lg shadow-neon-cyan/20">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 tracking-tight">
            CODEVERSE
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink icon={<Brain className="w-4 h-4" />} label="Learning" href="/learning" />
          <NavLink icon={<Bug className="w-4 h-4" />} label="Debug Arena" href="/debug" />
          <NavLink icon={<Zap className="w-4 h-4" />} label="Battles" href="/battles" />
          <NavLink icon={<Users className="w-4 h-4" />} label="Social" href="/social" />
          <NavLink icon={<Trophy className="w-4 h-4" />} label="Rankings" href="/rankings" />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-xs text-white/50 uppercase tracking-widest font-semibold">Script Kid</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-neon-cyan">LVL 1</span>
              <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '30%' }}
                  className="h-full bg-neon-cyan shadow-[0_0_10px_#22d3ee]"
                />
              </div>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-neon-cyan/50 transition-colors">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) => (
  <Link href={href} className="group flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors relative">
    {icon}
    {label}
    <motion.div 
      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300"
    />
  </Link>
);

export default Navbar;
