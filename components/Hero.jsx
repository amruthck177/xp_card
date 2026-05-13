'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cosmic-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Zap size={14} className="text-neon-yellow" />
          <span className="text-xs font-display font-medium tracking-widest text-white/80 uppercase">
            Evolution System v2.4 Active
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-display font-black tracking-tightest leading-tight mb-6"
        >
          EVOLVE INTO A <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-glow">
            LEGENDARY
          </span> DEVELOPER
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/60 mb-12 font-medium max-w-3xl mx-auto h-20"
        >
          <TypeAnimation
            sequence={[
              'The first developer learning civilization.',
              2000,
              'Master the code. Own your identity.',
              2000,
              'Enter the Debugging Dimension.',
              2000,
              'Build real systems. Gain real Karma.',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="btn-primary group">
            <span className="flex items-center gap-2">
              START YOUR JOURNEY <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="btn-secondary">
            EXPLORE THE GALAXIES
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12"
        >
          <StatItem value="142k+" label="Developers" />
          <StatItem value="8.4M" label="Bugs Fixed" />
          <StatItem value="12" label="Galaxies" />
          <StatItem value="99" label="OVR Max" />
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-display font-bold text-white mb-1">{value}</div>
      <div className="text-xs font-display tracking-widest text-white/40 uppercase">{label}</div>
    </div>
  );
}
