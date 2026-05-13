'use client';

import React from 'react';
import SpaceBackground from '@/components/SpaceBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GalaxyGrid from '@/components/GalaxyGrid';
import DeveloperCard from '@/components/DeveloperCard';
import NovaMentor from '@/components/NovaMentor';
import DebuggingDimension from '@/components/DebuggingDimension';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      {/* Immersive Space Background */}
      <SpaceBackground />
      
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        
        {/* Identity System Section */}
        <section className="py-24 px-6 bg-void/50 backdrop-blur-sm border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-display font-black mb-6">
                YOUR <span className="text-neon-blue text-glow-blue">IDENTITY</span>, <br />
                EVOLVED.
              </h2>
              <p className="text-xl text-white/60 mb-8 max-w-xl leading-relaxed font-medium">
                In CodeVerse, you aren't just an anonymous learner. You are a Citizen. Your Developer Card tracks every bug fixed, every system built, and every peer helped.
              </p>
              <ul className="space-y-4 mb-10 inline-block text-left">
                <li className="flex items-center gap-3 text-white/80 font-display text-sm tracking-wide">
                  <div className="w-2 h-2 rounded-full bg-neon-blue shadow-neon-blue" />
                  DYNAMIC OVR RANKING (0-99)
                </li>
                <li className="flex items-center gap-3 text-white/80 font-display text-sm tracking-wide">
                  <div className="w-2 h-2 rounded-full bg-neon-purple shadow-neon-purple" />
                  HOLOGRAPHIC ACHIEVEMENT BADGES
                </li>
                <li className="flex items-center gap-3 text-white/80 font-display text-sm tracking-wide">
                  <div className="w-2 h-2 rounded-full bg-neon-green shadow-neon-green" />
                  LIVING KARMA REPUTATION
                </li>
              </ul>
              <button className="btn-secondary">
                INITIALIZE YOUR CARD
              </button>
            </div>
            
            <div className="relative">
              {/* Background ambient glows for the card */}
              <div className="absolute -inset-10 bg-neon-blue/10 rounded-full blur-[80px]" />
              <div className="absolute -inset-20 bg-neon-purple/5 rounded-full blur-[100px] animate-pulse-slow" />
              <DeveloperCard />
            </div>
          </div>
        </section>

        {/* Galaxy Navigation */}
        <GalaxyGrid />

        {/* Debugging Dimension Section */}
        <DebuggingDimension />

        {/* Call to Action / Footer Simulation */}
        <section className="py-32 px-6 text-center">
          <div className="max-w-3xl mx-auto glass-panel p-16 border-neon-blue/20">
            <h2 className="text-4xl font-display font-black mb-6">READY TO ASCEND?</h2>
            <p className="text-white/40 font-display tracking-widest text-sm uppercase mb-12">
              The universe is waiting for its next architect.
            </p>
            <button className="btn-primary scale-125 hover:scale-135 transition-transform">
              INITIALIZE PROTOCOL
            </button>
          </div>
        </section>
      </div>

      {/* Floating Nova AI Mentor */}
      <NovaMentor />

      {/* Global Finishing Glows */}
      <div className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cosmic-900/40 to-transparent pointer-events-none z-0" />
    </main>
  );
}
