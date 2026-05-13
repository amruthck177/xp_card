'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X, Send, Sparkles, BrainCircuit } from 'lucide-react';

export default function NovaMentor() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 glass-panel border-neon-purple shadow-neon-purple/20 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-cosmic-900/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-neon-purple/20 rounded-full flex items-center justify-center border border-neon-purple/40">
                    <BrainCircuit size={20} className="text-neon-purple" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-void animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-white tracking-tight">NOVA AI</h4>
                  <p className="text-[10px] font-display font-medium text-neon-green uppercase tracking-widest">Active Mentor</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Content (Mock) */}
            <div className="p-4 h-64 overflow-y-auto space-y-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center">
                  <Cpu size={14} className="text-neon-purple" />
                </div>
                <div className="p-3 bg-white/5 rounded-2xl rounded-tl-none border border-white/10">
                  <p className="text-sm text-white/80 leading-relaxed font-medium">
                    Greetings, Developer. I am Nova. I've analyzed your current trajectory. You're showing strong potential in <span className="text-neon-blue">Frontend Architectures</span>. Shall we initialize a simulation?
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-void/50 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Query Nova..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neon-purple/50 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-neon-purple rounded-lg hover:shadow-neon-purple transition-all">
                  <Send size={16} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-neon-purple flex items-center justify-center shadow-neon-purple border-4 border-void relative group"
      >
        <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        {isOpen ? <X size={24} className="text-white" /> : <Sparkles size={24} className="text-white" />}
      </motion.button>
    </div>
  );
}
