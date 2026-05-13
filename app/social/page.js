'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hash, MessageSquare, Mic2, Users, Search, Plus, Send, Code, Zap, Star, Shield, Trophy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SpaceBackground from '@/components/SpaceBackground';

const CHANNELS = [
  { group: 'FOUNDATION', items: ['#general-chat', '#newbie-sector', '#rules-of-civ'] },
  { group: 'KNOWLEDGE_NODES', items: ['#python-help', '#react-orbit', '#ai-nebula', '#cyber-void'] },
  { group: 'COLLABORATION', items: ['#team-recruitment', '#project-showcase', '#debug-zone'] },
];

const STUDY_ROOMS = [
  { name: 'Core_Logic_Study', members: 12, active: true },
  { name: 'React_Hooks_Deepdive', members: 8, active: true },
  { name: 'LeetCode_Grind_A', members: 4, active: false },
];

export default function SocialPage() {
  return (
    <main className="h-screen bg-void flex flex-col overflow-hidden relative">
      <SpaceBackground />
      <Navbar />

      <div className="pt-20 flex-1 flex overflow-hidden max-w-[1800px] mx-auto w-full">
        
        {/* Left Sidebar: Channels */}
        <aside className="w-64 border-r border-white/5 bg-void/60 backdrop-blur-xl flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-display text-sm font-black tracking-widest text-white/40 uppercase">CIVILIZATION</h2>
            <button className="text-white/20 hover:text-white transition-colors">
              <Plus size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-8">
            {CHANNELS.map((group) => (
              <div key={group.group} className="space-y-2">
                <h3 className="px-2 font-display text-[9px] tracking-[0.3em] text-white/20 uppercase">{group.group}</h3>
                {group.items.map((channel) => (
                  <button 
                    key={channel} 
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${channel === '#react-orbit' ? 'bg-neon-purple/10 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                  >
                    <Hash size={16} className={channel === '#react-orbit' ? 'text-neon-purple' : 'opacity-40'} />
                    <span className="font-display text-[11px] font-bold tracking-wider">{channel}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden relative">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="me" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-void" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-display font-bold text-white tracking-tight">NEO_ARCHITECT</div>
              <div className="text-[8px] font-mono text-neon-cyan uppercase tracking-widest">OVR_94</div>
            </div>
            <button className="text-white/20 hover:text-white transition-colors">
              <Mic2 size={16} />
            </button>
          </div>
        </aside>

        {/* Center: Message Feed */}
        <div className="flex-1 flex flex-col bg-void/40 backdrop-blur-sm relative border-r border-white/5">
          <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-void/50">
            <div className="flex items-center gap-4">
              <Hash size={20} className="text-white/40" />
              <div>
                <h4 className="font-display text-sm font-bold tracking-tight">#react-orbit</h4>
                <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Synchronizing state protocols in real-time.</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <Users size={14} className="text-neon-cyan" />
                <span className="font-mono text-[10px] text-white/60">142_ONLINE</span>
              </div>
              <div className="relative">
                <Search size={18} className="text-white/20" />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <ChatMessage 
              user="DATA_GHOST" 
              ovr={95} 
              text="Just stabilized the Memory Void trial. The recursive loop was hidden in the sector middleware."
              time="14:20"
              karma={12}
            />
            <ChatMessage 
              user="PIXEL_LORD" 
              ovr={92} 
              text="Any architects free for a pair-programming session on Three.js shaders?"
              time="14:22"
              tag="SHADERS"
            />
            <div className="flex items-center gap-4 py-4">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[8px] font-display font-bold text-white/10 tracking-[0.5em] uppercase">SYSTEM_NEW_MESSAGES</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <ChatMessage 
              user="CODE_TITAN" 
              ovr={91} 
              text="Check out this component architecture I just finished. It handles 100k concurrent orbital syncs."
              code={`const OrbitSync = ({ nodes }) => {\n  return nodes.map(n => <Node key={n.id} {...n} />);\n};`}
              time="14:25"
              karma={24}
            />
          </div>

          <footer className="p-6">
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-2 flex items-end gap-2 focus-within:border-neon-purple transition-all">
              <button className="p-2.5 text-white/20 hover:text-white transition-colors">
                <Plus size={20} />
              </button>
              <textarea 
                placeholder="Broadcast to civilization..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white py-2.5 resize-none max-h-32"
                rows={1}
              />
              <div className="flex items-center gap-1">
                <button className="p-2.5 text-white/20 hover:text-white transition-colors">
                  <Zap size={20} />
                </button>
                <button className="p-2.5 bg-neon-purple text-white rounded-xl hover:shadow-neon-purple transition-all">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </footer>
        </div>

        {/* Right Sidebar: Study Rooms & Leaderboard */}
        <aside className="w-80 bg-void/60 backdrop-blur-xl flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h3 className="font-display text-[9px] tracking-[0.3em] text-white/20 uppercase mb-6">LIVE_STUDY_ROOMS</h3>
            <div className="space-y-3">
              {STUDY_ROOMS.map(room => (
                <div key={room.name} className="glass-panel p-4 flex flex-col gap-3 group cursor-pointer hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-neon-cyan">
                  <div className="flex justify-between items-start">
                    <div className="font-display text-[10px] font-bold text-white group-hover:text-neon-cyan transition-colors">{room.name}</div>
                    {room.active && <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-neon-cyan animate-pulse" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full border border-void overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=r${i}`} alt="user" />
                        </div>
                      ))}
                    </div>
                    <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">{room.members}_CITIZENS_SYNCING</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 border border-white/10 rounded-xl font-display text-[9px] font-bold text-white/20 tracking-widest uppercase hover:bg-white/5 transition-all">
              INITIALIZE_NEW_ROOM
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Trophy size={16} className="text-neon-amber" />
                <h3 className="font-display text-[9px] tracking-[0.3em] text-white/20 uppercase">SECTOR_LEADERBOARD</h3>
              </div>
              <div className="space-y-4">
                <SocialRank rank={1} name="ZERO_K" score="12,400" />
                <SocialRank rank={2} name="X_PHANTOM" score="10,850" />
                <SocialRank rank={3} name="NEO_ARCHITECT" score="9,400" highlight />
              </div>
            </section>

            <section className="glass-panel p-4 border-neon-cyan/20 bg-neon-cyan/5">
              <div className="flex items-center gap-3 mb-3">
                <Shield size={16} className="text-neon-cyan" />
                <h4 className="font-display text-[9px] font-bold tracking-widest uppercase">CIV_GOVERNANCE</h4>
              </div>
              <p className="text-[9px] text-white/40 leading-relaxed font-medium">
                High Karma citizens can now propose new training planets for the <span className="text-neon-cyan">AI Nebula</span>. Current vote active.
              </p>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
}

function ChatMessage({ user, ovr, text, code, time, karma, tag }) {
  return (
    <div className="flex gap-4 group">
      <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden relative flex-shrink-0 group-hover:border-neon-purple transition-all">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} alt={user} />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-display text-xs font-bold text-white group-hover:text-glow-white transition-all">{user}</span>
          <span className="font-mono text-[9px] text-neon-cyan px-1.5 py-0.5 bg-neon-cyan/10 border border-neon-cyan/30 rounded uppercase tracking-tighter">OVR_{ovr}</span>
          <span className="font-mono text-[8px] text-white/10 uppercase tracking-widest">{time}</span>
        </div>
        <div className="text-sm text-white/70 leading-relaxed font-medium">
          {tag && <span className="text-neon-purple font-display text-[10px] mr-2">#{tag}</span>}
          {text}
        </div>
        {code && (
          <div className="p-4 bg-void/80 border border-white/10 rounded-xl font-mono text-xs text-neon-cyan relative overflow-hidden group/code">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover/code:opacity-100 transition-opacity">
              <Code size={14} />
            </div>
            <pre className="whitespace-pre-wrap">{code}</pre>
          </div>
        )}
        <div className="flex gap-4 items-center pt-1">
          <button className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/5 rounded-full hover:border-neon-purple transition-all group/karma">
            <Star size={12} className="text-white/20 group-hover/karma:text-neon-amber transition-colors" />
            <span className="font-mono text-[9px] text-white/40">{karma || 0}</span>
          </button>
          <button className="text-white/10 hover:text-white/40 transition-colors text-[10px] font-display uppercase tracking-widest font-bold">Reply</button>
        </div>
      </div>
    </div>
  );
}

function SocialRank({ rank, name, score, highlight }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${highlight ? 'bg-neon-cyan/10 border border-neon-cyan/20' : 'hover:bg-white/5'}`}>
      <div className="flex items-center gap-3">
        <span className={`font-mono text-[10px] font-bold ${rank === 1 ? 'text-neon-amber' : 'text-white/20'}`}>0{rank}</span>
        <div className="font-display text-[10px] font-bold text-white tracking-tight">{name}</div>
      </div>
      <div className="font-mono text-[10px] text-white/40">{score}</div>
    </div>
  );
}
