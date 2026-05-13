'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Brain, Shield, Gamepad2, Smartphone, Cloud, Database } from 'lucide-react';

const GALAXIES = [
  {
    id: 'web',
    name: 'Web Galaxy',
    description: 'Master the fabric of the digital world. React, Next.js, and beyond.',
    iconType: 'Globe',
    color: 'border-neon-blue',
    glow: 'shadow-neon-blue/20',
  },
  {
    id: 'ai',
    name: 'AI Nebula',
    description: 'Harness neural networks and LLMs to build the future of intelligence.',
    iconType: 'Brain',
    color: 'border-neon-purple',
    glow: 'shadow-neon-purple/20',
  },
  {
    id: 'cyber',
    name: 'Cyber Void',
    description: 'Defend systems and master the art of ethical exploitation.',
    iconType: 'Shield',
    color: 'border-neon-pink',
    glow: 'shadow-neon-pink/20',
  },
  {
    id: 'game',
    name: 'Game Realm',
    description: 'Craft immersive worlds using Three.js, Unity, and physics engines.',
    iconType: 'Gamepad2',
    color: 'border-neon-green',
    glow: 'shadow-neon-green/20',
  },
  {
    id: 'mobile',
    name: 'Mobile Orbit',
    description: 'Build seamless experiences for every device in the palm of a hand.',
    iconType: 'Smartphone',
    color: 'border-neon-yellow',
    glow: 'shadow-neon-yellow/20',
  },
  {
    id: 'cloud',
    name: 'Cloud Cluster',
    description: 'Architect scalable infrastructures and master distributed systems.',
    iconType: 'Cloud',
    color: 'border-cyan-400',
    glow: 'shadow-cyan-400/20',
  }
];

function GalaxyIcon({ type, color }) {
  const props = { className: color, size: 32 };
  switch(type) {
    case 'Globe': return <Globe {...props} />;
    case 'Brain': return <Brain {...props} />;
    case 'Shield': return <Shield {...props} />;
    case 'Gamepad2': return <Gamepad2 {...props} />;
    case 'Smartphone': return <Smartphone {...props} />;
    case 'Cloud': return <Cloud {...props} />;
    default: return <Database {...props} />;
  }
}

export default function GalaxyGrid() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black mb-4"
          >
            CHOOSE YOUR <span className="text-neon-purple">CAREER GALAXY</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-display tracking-widest text-sm uppercase"
          >
            Every choice shapes your developer identity
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALAXIES.map((galaxy, idx) => (
            <GalaxyCard key={galaxy.id} galaxy={galaxy} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalaxyCard({ galaxy, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`glass-panel p-8 border-t-2 ${galaxy.color} ${galaxy.glow} group cursor-pointer transition-all`}
    >
      <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
        <GalaxyIcon type={galaxy.iconType} color={galaxy.color.replace('border-', 'text-')} />
      </div>
      <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-glow-white transition-all">
        {galaxy.name}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium">
        {galaxy.description}
      </p>
      <div className="flex items-center gap-2 text-xs font-display font-bold tracking-widest text-white/40 group-hover:text-white transition-colors">
        EXPLORE GALAXY <span className="text-neon-purple">→</span>
      </div>
    </motion.div>
  );
}
