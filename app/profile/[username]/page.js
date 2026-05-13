'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, ExternalLink, Shield, Trophy, Star, Bug, Cpu, Zap, Code, Layout, BrainCircuit } from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import Navbar from '@/components/Navbar';
import DeveloperCard from '@/components/DeveloperCard';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-void relative">
      <SpaceBackground />
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-20">
        
        {/* Profile Hero */}
        <section className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-10 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse" />
            <DeveloperCard />
          </div>
          
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                <h1 className="text-5xl font-display font-black tracking-tight uppercase">NEO_ARCHITECT</h1>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg">
                    <span className="font-mono text-[10px] text-neon-cyan font-bold">LVL_24</span>
                  </div>
                  <div className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded-lg">
                    <span className="font-mono text-[10px] text-neon-purple font-bold">RANK_LEGEND</span>
                  </div>
                </div>
              </div>
              <p className="text-xl text-white/60 font-medium leading-relaxed max-w-2xl">
                System architect specialized in <span className="text-neon-cyan">Distributed React Ecosystems</span> and <span className="text-neon-purple">Neural Frontend Frameworks</span>. Currently exploring the deep void of WebAssembly.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatSquare icon={<Trophy className="text-neon-amber" size={20} />} label="BATTLES_WON" value="42" />
              <StatSquare icon={<Bug className="text-red-500" size={20} />} label="BUGS_TERMINATED" value="1.2K" />
              <StatSquare icon={<Star className="text-neon-cyan" size={20} />} label="KARMA_SCORE" value="940" />
              <StatSquare icon={<Code className="text-neon-purple" size={20} />} label="PROJECTS_BUILT" value="18" />
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <SocialBtn icon={<Github size={18} />} />
              <SocialBtn icon={<Twitter size={18} />} />
              <SocialBtn icon={<Linkedin size={18} />} />
              <button className="flex items-center gap-3 px-8 py-3 bg-neon-cyan text-void font-display font-black text-xs tracking-widest rounded-xl hover:scale-105 transition-transform ml-4">
                CONTACT_CITIZEN
              </button>
            </div>
          </div>
        </section>

        {/* Contribution Heatmap Mockup */}
        <section className="glass-panel p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display text-sm font-black tracking-widest text-white/40 uppercase">GALAXY_ACTIVITY_LOG</h3>
            <div className="flex gap-4 text-[10px] font-mono text-white/20">
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-white/5" /> VOID</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-neon-cyan/40" /> SYNCING</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-neon-cyan shadow-neon-cyan" /> FULL_STABILITY</div>
            </div>
          </div>
          <div className="grid grid-cols-24 gap-1.5 h-32">
            {Array.from({ length: 24 * 7 }).map((_, i) => (
              <div 
                key={i} 
                className={`rounded-[2px] transition-all hover:scale-125 ${i % 3 === 0 ? 'bg-neon-cyan shadow-neon-cyan/40' : i % 5 === 0 ? 'bg-neon-cyan/40' : 'bg-white/5'}`}
              />
            ))}
          </div>
        </section>

        {/* Featured Projects Grid */}
        <section className="space-y-8">
          <h3 className="font-display text-sm font-black tracking-widest text-white/40 uppercase">FEATURED_PROTOCOL_BUILDS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              title="NEURAL_DASHBOARD_v4" 
              desc="Real-time brain-to-code interface visualization using Three.js and the AI Nebula API."
              tags={['React', 'Three.js', 'AI']}
              icon={<BrainCircuit className="text-neon-purple" />}
            />
            <ProjectCard 
              title="QUANTUM_AUTH_LAYER" 
              desc="End-to-end encrypted authentication protocol for cross-galaxy communications."
              tags={['Security', 'Node.js', 'Cyber']}
              icon={<Shield className="text-neon-cyan" />}
            />
          </div>
        </section>

        {/* Achievement Wall */}
        <section className="space-y-8">
          <h3 className="font-display text-sm font-black tracking-widest text-white/40 uppercase">HONOR_SUBSYSTEMS</h3>
          <div className="flex flex-wrap gap-4">
            <AchievementBadge name="FLAME_SYNCER" rarity="LEGENDARY" />
            <AchievementBadge name="BUG_EXTERMINATOR" rarity="ELITE" />
            <AchievementBadge name="GALAXY_ARCHITECT" rarity="RARE" />
            <AchievementBadge name="SPEED_CODER_III" rarity="ELITE" />
            <AchievementBadge name="MENTOR_SOUL" rarity="COMMON" />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatSquare({ icon, label, value }) {
  return (
    <div className="glass-panel p-4 flex flex-col items-center justify-center text-center gap-2 border-white/5 group hover:border-neon-cyan transition-all">
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-xl font-display font-black text-white">{value}</div>
      <div className="font-display text-[8px] font-bold text-white/20 tracking-widest uppercase">{label}</div>
    </div>
  );
}

function SocialBtn({ icon }) {
  return (
    <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all">
      {icon}
    </button>
  );
}

function ProjectCard({ title, desc, tags, icon }) {
  return (
    <div className="glass-panel p-8 border-white/5 hover:border-white/20 group transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink size={20} className="text-white/40" />
      </div>
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-display font-black mb-2 group-hover:text-glow-white transition-all">{title}</h4>
          <p className="text-sm text-white/40 leading-relaxed mb-6 font-medium">{desc}</p>
          <div className="flex gap-3">
            {tags.map(t => (
              <span key={t} className="text-[10px] font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded border border-neon-cyan/20">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementBadge({ name, rarity }) {
  const color = rarity === 'LEGENDARY' ? 'text-neon-amber border-neon-amber' : rarity === 'ELITE' ? 'text-neon-purple border-neon-purple' : 'text-neon-cyan border-neon-cyan';
  return (
    <div className={`px-4 py-2 bg-white/5 border rounded-xl flex items-center gap-3 transition-all hover:scale-105 cursor-default ${color}`}>
      <Star size={14} fill="currentColor" />
      <span className="font-display text-[9px] font-bold tracking-widest uppercase">{name}</span>
    </div>
  );
}
