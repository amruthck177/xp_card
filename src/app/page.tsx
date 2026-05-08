"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Brain, Bug, Zap, Users, Trophy, 
  Code, Shield, Terminal, Globe, Briefcase, 
  LineChart, Sparkles, MessageSquare, Play
} from 'lucide-react';
import Link from 'next/link';

const modules = [
  { id: 'learning', title: 'AI Learning Paths', icon: <Brain />, color: 'from-blue-500 to-cyan-400', desc: 'Personalized roadmap with daily missions.' },
  { id: 'debug', title: 'Debugging Arena', icon: <Bug />, color: 'from-red-500 to-orange-400', desc: 'Master the art of bug hunting across 5 levels.', new: true },
  { id: 'battles', title: 'Coding Battles', icon: <Zap />, color: 'from-yellow-400 to-orange-500', desc: '1v1, Team, and AI Boss battles.' },
  { id: 'aptitude', title: 'Aptitude & Interview', icon: <Sparkles />, color: 'from-purple-500 to-pink-500', desc: 'Quant, Logic, and AI Mock Interviews.', new: true },
  { id: 'social', title: 'Social Network', icon: <Users />, color: 'from-green-400 to-emerald-600', desc: 'Connect, share, and collaborate.' },
  { id: 'projects', title: 'Project Builder', icon: <Code />, color: 'from-indigo-500 to-blue-600', desc: 'Build real-world apps with AI help.' },
  { id: 'city', title: 'Open World City', icon: <Globe />, color: 'from-teal-400 to-cyan-500', desc: 'Explore virtual developer districts.' },
  { id: 'career', title: 'Career Mode', icon: <Briefcase />, color: 'from-slate-400 to-slate-600', desc: 'Resume builder and job matching.' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl py-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-neon-cyan/20">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium text-neon-cyan uppercase tracking-widest">A New Era of Coding</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            WELCOME TO THE <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-white to-neon-purple animate-gradient">
              CODEVERSE
            </span>
          </h1>
          <p className="max-w-2xl text-xl text-white/60 mb-12 leading-relaxed">
            The ultimate developer growth ecosystem. Master coding, defeat AI monsters, 
            build a career, and join a global network of legendary architects.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              START YOUR JOURNEY
            </button>
            <button className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors border-white/20">
              EXPLORE DEV CITY
            </button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl"
        >
          <Stat label="Total Developers" value="1.2M+" />
          <Stat label="Projects Built" value="450K+" />
          <Stat label="Bugs Fixed" value="8.9M+" />
          <Stat label="Battles Won" value="2.1M+" />
        </motion.div>
      </section>

      {/* Ecosystem Modules Grid */}
      <section className="w-full max-w-7xl mt-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Explore the Ecosystem</h2>
            <p className="text-white/50">Every module is designed to accelerate your growth.</p>
          </div>
          <Link href="/modules" className="text-neon-cyan font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All Modules <Rocket className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <ModuleCard key={module.id} module={module} index={index} />
          ))}
        </div>
      </section>

      {/* Live Battles Preview */}
      <section className="w-full max-w-7xl mt-40 glass rounded-3xl p-12 relative overflow-hidden border-white/10">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Zap className="w-64 h-64 text-yellow-400" />
        </div>
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Live Coding Battles</h2>
            <p className="text-xl text-white/60 mb-8">
              Compete in real-time. Solve challenges, earn XP, and climb the global leaderboard. 
              Team up or go solo against legendary AI bosses.
            </p>
            <button className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl hover:scale-105 transition-transform">
              ENTER ARENA
            </button>
          </div>
          <div className="glass-card rounded-2xl p-6 border-white/5">
             <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-widest text-yellow-400">Current Top Battle</span>
                <span className="px-2 py-1 bg-red-500 rounded text-[10px] font-bold">LIVE</span>
             </div>
             <div className="flex items-center gap-4 mb-6">
                <BattleAvatar name="AlphaCode" level="52" color="cyan" />
                <span className="text-2xl font-black italic text-white/20">VS</span>
                <BattleAvatar name="CyberMage" level="48" color="purple" />
             </div>
             <div className="space-y-4">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full w-2/3 bg-gradient-to-r from-neon-cyan to-neon-purple" />
                </div>
                <div className="flex justify-between text-xs font-bold text-white/40">
                   <span>ALPHACITY LABS TASK</span>
                   <span>65% COMPLETE</span>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl font-black text-white">{value}</span>
    <span className="text-xs text-white/40 uppercase tracking-widest font-bold">{label}</span>
  </div>
);

const ModuleCard = ({ module, index }: { module: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    className="group relative"
  >
    <div className={`absolute -inset-0.5 bg-gradient-to-r ${module.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
    <Link href={`/${module.id}`}>
      <div className="relative h-full glass-card p-8 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-2 cursor-pointer border-white/5 hover:border-white/20 transition-all duration-300">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-white shadow-lg`}>
          {React.cloneElement(module.icon, { className: 'w-6 h-6' })}
        </div>
        {module.new && (
          <span className="absolute top-4 right-4 px-2 py-0.5 bg-neon-cyan text-black text-[10px] font-black rounded uppercase">NEW</span>
        )}
        <h3 className="text-xl font-bold">{module.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed">
          {module.desc}
        </p>
      </div>
    </Link>
  </motion.div>
);

const BattleAvatar = ({ name, level, color }: { name: string; level: string; color: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-neon-${color} p-1`}>
      <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
        <User className={`w-6 h-6 text-neon-${color}`} />
      </div>
    </div>
    <div>
      <div className="text-sm font-bold text-white">{name}</div>
      <div className={`text-[10px] font-black text-neon-${color} uppercase`}>LVL {level}</div>
    </div>
  </div>
);
