'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Target, Zap, Shield, Rocket, ChevronRight, HelpCircle, Sparkles, Cpu, Search } from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import Navbar from '@/components/Navbar';

const QUESTIONS = [
  {
    id: 1,
    text: "A critical system is leaking memory. Do you...",
    options: [
      { text: "Systematically isolate each module and profile usage.", archetype: "The Debugger" },
      { text: "Rewrite the core logic with a more efficient pattern.", archetype: "The Architect" },
      { text: "Deploy a quick patch and monitor real-time metrics.", archetype: "The Innovator" }
    ]
  },
  {
    id: 2,
    text: "When starting a new project, what excites you most?",
    options: [
      { text: "Designing the high-level architecture and data flow.", archetype: "The Architect" },
      { text: "Building beautiful, interactive UI components.", archetype: "The Creator" },
      { text: "Experimenting with cutting-edge AI integrations.", archetype: "The Innovator" }
    ]
  },
  {
    id: 3,
    text: "How do you prefer to help your teammates?",
    options: [
      { text: "Walking them through the logic until they solve it.", archetype: "The Mentor" },
      { text: "Fixing the bug for them and explaining the root cause.", archetype: "The Debugger" },
      { text: "Providing a reusable utility to solve the category of problem.", archetype: "The Architect" }
    ]
  }
];

export default function AptitudePage() {
  const [step, setStep] = useState(0); // 0: Intro, 1+: Questions, -1: Results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});

  const startTest = () => setStep(1);

  const handleAnswer = (archetype) => {
    setScores(prev => ({ ...prev, [archetype]: (prev[archetype] || 0) + 1 }));
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep(-1); // Results
    }
  };

  const getWinner = () => {
    return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0] || "The Architect";
  };

  return (
    <main className="min-h-screen bg-void relative flex flex-col items-center justify-center p-6 overflow-hidden">
      <SpaceBackground />
      <Navbar />

      <div className="relative z-10 max-w-3xl w-full">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="w-24 h-24 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto border border-neon-purple/50 relative">
                <Brain size={48} className="text-neon-purple animate-pulse" />
                <div className="absolute -inset-4 bg-neon-purple/10 rounded-full blur-xl" />
              </div>
              <h1 className="text-5xl font-display font-black tracking-tight uppercase">GATEKEEPER_TRIAL</h1>
              <p className="text-xl text-white/40 font-medium leading-relaxed max-w-xl mx-auto">
                Before you ascend the galaxies, we must map your cognitive profile. Your archetype determines your Nova AI interaction and evolution path.
              </p>
              <button 
                onClick={startTest}
                className="btn-primary px-12 py-5 scale-110"
              >
                INITIALIZE_SYNC_SEQUENCE
              </button>
            </motion.div>
          )}

          {step > 0 && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-12"
            >
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="font-display text-[10px] tracking-[0.4em] text-neon-purple uppercase">Cognitive_Mapping</div>
                  <div className="text-2xl font-display font-black">STRIKE_SYNC_0{currentQuestion + 1}</div>
                </div>
                <div className="font-mono text-xs text-white/20">PROGRESS: {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%</div>
              </div>

              <div className="glass-panel p-12 border-neon-purple/20 relative overflow-hidden">
                <div className="scanline" />
                <h2 className="text-2xl font-display font-bold text-white mb-12 leading-tight italic">
                  "{QUESTIONS[currentQuestion].text}"
                </h2>
                <div className="space-y-4">
                  {QUESTIONS[currentQuestion].options.map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleAnswer(opt.archetype)}
                      className="w-full p-6 text-left glass-panel border-white/5 hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all group relative overflow-hidden"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-8 h-8 rounded border border-white/10 flex items-center justify-center font-mono text-[10px] text-white/20 group-hover:text-neon-cyan group-hover:border-neon-cyan">
                          0{i + 1}
                        </div>
                        <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                          {opt.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === -1 && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-10 bg-neon-cyan/20 rounded-full blur-[80px] animate-pulse" />
                <div className="relative w-40 h-40 bg-void border-2 border-neon-cyan rounded-2xl flex items-center justify-center shadow-neon-cyan/20 mx-auto transform rotate-3">
                  <Sparkles size={80} className="text-neon-cyan" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-[10px] tracking-[0.5em] text-neon-cyan uppercase">Archetype_Identified</h4>
                <h1 className="text-6xl font-display font-black text-white italic underline decoration-neon-cyan/30 underline-offset-8">
                  {getWinner().replace('The ', '')}
                </h1>
              </div>

              <p className="text-white/60 font-medium max-w-lg mx-auto leading-relaxed">
                Your neural patterns align with <span className="text-neon-cyan">{getWinner()}</span>. You possess an innate ability to stabilize complex systems and trace failures to their source. Nova AI has been configured for your profile.
              </p>

              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                <ResultBadge icon={<Target size={14} />} label="LOGIC" val="+12" />
                <ResultBadge icon={<Shield size={14} />} label="STABILITY" val="+15" />
                <ResultBadge icon={<Search size={14} />} label="DEBUG" val="+20" />
              </div>

              <div className="flex flex-col gap-4 pt-8">
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="btn-primary w-full max-w-sm mx-auto"
                >
                  ASCEND_TO_DASHBOARD
                </button>
                <button className="font-display text-[10px] tracking-widest text-white/20 hover:text-white transition-colors uppercase font-bold">
                  RE-CALIBRATE_PROFILE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function ResultBadge({ icon, label, val }) {
  return (
    <div className="glass-panel p-3 border-white/5 flex flex-col items-center gap-1">
      <div className="text-neon-cyan">{icon}</div>
      <div className="text-[8px] font-display text-white/20 uppercase tracking-widest">{label}</div>
      <div className="text-xs font-mono font-bold text-white">{val}</div>
    </div>
  );
}
