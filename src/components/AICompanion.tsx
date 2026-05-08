"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Brain, Code, Zap } from 'lucide-react';

const AICompanion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome back, Architect. I’m monitoring the grid. Your memory leak skills are improving, but your async patterns need optimization. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing your request... I’ve updated your roadmap to include Advanced React Hooks. You’ve earned +10 Focus XP for being proactive.' }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-2xl flex items-center justify-center shadow-2xl shadow-neon-cyan/20 z-[60] hover:scale-110 transition-transform group"
      >
        <Sparkles className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-space-950 animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-96 h-[500px] glass rounded-3xl z-[60] border-white/10 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-white/5 p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-neon-cyan" />
                </div>
                <div>
                   <h3 className="font-bold text-sm">AI MENTOR</h3>
                   <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[10px] text-white/40 font-black uppercase">Monitoring Grid</span>
                   </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-neon-cyan text-black font-medium' 
                    : 'bg-white/5 border border-white/10 text-white/80'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
               <QuickAction icon={<Code className="w-3 h-3" />} label="Review Code" />
               <QuickAction icon={<Zap className="w-3 h-3" />} label="Roadmap" />
               <QuickAction icon={<Sparkles className="w-3 h-3" />} label="Explain" />
            </div>

            {/* Input */}
            <div className="p-6 bg-white/5 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask your mentor..."
                  className="w-full bg-space-950 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:border-neon-cyan/50 focus:outline-none transition-colors"
                />
                <button 
                  onClick={sendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-neon-cyan rounded-lg flex items-center justify-center text-black hover:bg-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const QuickAction = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap">
    {icon} {label}
  </button>
);

export default AICompanion;
