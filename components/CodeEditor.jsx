'use client';

import React, { useState } from 'react';
import { Terminal, Play, Save, Settings, ChevronRight } from 'lucide-react';

export default function CodeEditor({ initialCode, onChange }) {
  const [lines, setLines] = useState(initialCode.split('\n'));

  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
    setLines(value.split('\n'));
  };

  return (
    <div className="flex-1 flex flex-col bg-void/20 backdrop-blur-sm relative border-r border-white/5 group">
      {/* Editor Header */}
      <div className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white/40">
            <Terminal size={12} />
            <span className="font-mono text-[10px] tracking-widest uppercase italic">workspace_node.jsx</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-neon-cyan" />
            <span className="font-mono text-[9px] text-white/20 uppercase">SYNC_ACTIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/20 hover:text-white transition-colors"><Settings size={14} /></button>
          <button className="text-white/20 hover:text-white transition-colors"><Save size={14} /></button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Line Numbers */}
        <div className="w-12 bg-white/[0.02] border-r border-white/5 flex flex-col items-center py-8 font-mono text-[10px] text-white/10 select-none">
          {lines.map((_, i) => (
            <div key={i} className="h-6 flex items-center">{i + 1}</div>
          ))}
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative">
          {/* Syntax highlighting mockup (Simplified overlay) */}
          <textarea 
            className="absolute inset-0 bg-transparent p-8 font-mono text-sm text-neon-cyan focus:outline-none resize-none selection:bg-neon-purple/30 selection:text-white z-10 leading-6"
            defaultValue={initialCode}
            onChange={handleChange}
            spellCheck={false}
          />
          
          {/* Ambient Background Glow for Editor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-[100px] pointer-events-none" />
        </div>
      </div>
      
      {/* Console Overlay (Interactive) */}
      <div className="h-40 bg-void border-t border-white/10 p-4 font-mono text-[10px] flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-white/20 uppercase tracking-[0.2em] font-bold">
            <ChevronRight size={12} /> KERNEL_LOGS
          </div>
          <button className="text-[8px] text-white/20 hover:text-white uppercase tracking-widest">Clear</button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
          <div className="text-neon-cyan/40">08:45:11 [SYSTEM] BOOTING_WORKSPACE...</div>
          <div className="text-neon-cyan/40">08:45:12 [KERNEL] SYNCING_RESOURCES...</div>
          <div className="text-white/60">$ Ready for instruction.</div>
          <div className="text-neon-purple">>> Protocol initialized. Standby for sync execution.</div>
        </div>
      </div>
    </div>
  );
}
