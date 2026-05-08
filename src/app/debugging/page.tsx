"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Terminal, ShieldAlert, Zap, Brain, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';

const levels = [
  { id: 1, title: 'Simple Errors', difficulty: 'Beginner', xp: 100, desc: 'Syntax errors and typos.', color: 'from-green-500 to-emerald-400' },
  { id: 2, title: 'Logic Errors', difficulty: 'Intermediate', xp: 250, desc: 'Conditionals and loops.', color: 'from-blue-500 to-cyan-400' },
  { id: 3, title: 'API & Async', difficulty: 'Advanced', xp: 500, desc: 'Promises and network issues.', color: 'from-purple-500 to-violet-400' },
  { id: 4, title: 'System Bugs', difficulty: 'Expert', xp: 1000, desc: 'Memory leaks and race conditions.', color: 'from-orange-500 to-red-400' },
  { id: 5, title: 'Production Crises', difficulty: 'Legendary', xp: 2500, desc: 'Real-world GitHub issues.', color: 'from-red-600 to-pink-600' },
];

const bugSnippets = [
  {
    level: 1,
    title: "The Missing Semicolon Mystery",
    code: `function greet(name) {
  console.log("Hello, " + name)
  return
  console.log("This will never run")
}`,
    bug: "Unreachable code after empty return.",
    hints: ["Check the return statement.", "Is there anything after return?", "The function exits before the second log."]
  }
];

export default function DebugArena() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(0);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
          <Bug className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-4xl font-black">DEBUGGING ARENA</h1>
          <p className="text-white/50">Master the art of hunting bugs. Every fix makes you stronger.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Level Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            Select Difficulty
          </h2>
          {levels.map((level) => (
            <motion.div
              key={level.id}
              whileHover={{ x: 10 }}
              onClick={() => setSelectedLevel(level.id)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedLevel === level.id 
                ? 'bg-white/10 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                : 'glass border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-gradient-to-r ${level.color} text-white`}>
                  {level.difficulty}
                </span>
                <span className="text-xs font-bold text-white/40">+{level.xp} XP</span>
              </div>
              <h3 className="text-lg font-bold">{level.title}</h3>
              <p className="text-xs text-white/40 mt-1">{level.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Terminal Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedLevel ? (
              <motion.div
                key="arena"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col"
              >
                <div className="glass rounded-3xl overflow-hidden border-white/10 flex flex-col h-full min-h-[600px]">
                  {/* Terminal Header */}
                  <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-sm font-mono text-white/40 italic">bug_hunt_v1.js</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <button 
                        onClick={() => setShowHint(prev => (prev + 1) % 4)}
                        className="flex items-center gap-2 text-xs font-bold text-yellow-400 hover:text-yellow-300"
                       >
                         <Lightbulb className="w-4 h-4" />
                         GET HINT
                       </button>
                    </div>
                  </div>

                  {/* Code Editor Mockup */}
                  <div className="flex-1 p-8 font-mono text-lg bg-[#010409]">
                    <pre className="text-white/80">
                      {bugSnippets[0].code.split('\n').map((line, i) => (
                        <div key={i} className="flex gap-6 group">
                          <span className="text-white/20 w-8 text-right select-none">{i + 1}</span>
                          <span className={line.includes('return') ? 'text-red-400' : ''}>{line}</span>
                        </div>
                      ))}
                    </pre>
                  </div>

                  {/* Hint Display */}
                  <AnimatePresence>
                    {showHint > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-yellow-400/10 border-t border-yellow-400/20 p-6"
                      >
                        <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center shrink-0">
                              <Brain className="w-5 h-5 text-yellow-400" />
                           </div>
                           <div>
                              <h4 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-1">AI Hint {showHint}</h4>
                              <p className="text-white/70 text-sm">
                                {bugSnippets[0].hints[showHint - 1]}
                              </p>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Bar */}
                  <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
                    <p className="text-sm text-white/40">
                      Identify and fix the issue to progress.
                    </p>
                    <div className="flex gap-4">
                      <button className="px-6 py-2 glass hover:bg-white/10 rounded-xl font-bold text-sm">RUN CODE</button>
                      <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        SUBMIT FIX
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center glass rounded-3xl border-dashed border-white/10 text-center p-20">
                <Terminal className="w-20 h-20 text-white/10 mb-6" />
                <h2 className="text-2xl font-bold mb-2">Initialize Hunt</h2>
                <p className="text-white/40 max-w-sm">Select a difficulty level on the left to start finding and fixing bugs.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats/Leaderboard mini section */}
      <div className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-3xl border-white/5">
           <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Your Progress</h3>
           <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-black">1,240</span>
              <span className="text-white/40 mb-1 text-sm font-bold">XP</span>
           </div>
           <div className="h-2 w-full bg-white/5 rounded-full">
              <div className="h-full w-1/3 bg-red-500 rounded-full" />
           </div>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5">
           <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Recent Fixes</h3>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-sm font-medium">Memory Leak in App</span>
                 <span className="text-xs text-green-400">+500 XP</span>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-sm font-medium">Infinite Loop Monster</span>
                 <span className="text-xs text-green-400">+250 XP</span>
              </div>
           </div>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5 flex flex-col items-center justify-center text-center">
           <Trophy className="w-10 h-10 text-yellow-400 mb-4" />
           <h3 className="font-bold">Debugging Rank</h3>
           <p className="text-2xl font-black text-neon-cyan mt-1">#420</p>
           <p className="text-xs text-white/40 uppercase tracking-widest mt-2">Global Leaderboard</p>
        </div>
      </div>
    </div>
  );
}
