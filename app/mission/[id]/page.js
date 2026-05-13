import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, HelpCircle, Code2, Play, Info, CheckCircle2, ChevronRight, BrainCircuit, ShieldAlert, Zap, Trophy } from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import CodeEditor from '@/components/CodeEditor';

export default function MissionPage({ params }) {
  const [code, setCode] = useState(`function solveMission() {\n  // Initialize your protocol here\n  console.log("Syncing with React Orbit...");\n}`);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBossMode, setIsBossMode] = useState(true); // Example: toggled if it's a boss mission

  const handleSubmit = () => {
    // Simulated test case execution
    setTimeout(() => {
      setIsCompleted(true);
    }, 1500);
  };

  return (
    <main className="h-screen bg-void flex flex-col overflow-hidden">
      <SpaceBackground />
      
      {/* Mission Header */}
      <header className={`h-16 border-b transition-colors duration-1000 flex items-center justify-between px-6 z-50 ${isBossMode ? 'border-red-500/30 bg-red-950/20' : 'border-white/5 bg-void/80'} backdrop-blur-xl`}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded border transition-all ${isBossMode ? 'bg-red-500/20 border-red-500/50 shadow-neon-pink' : 'bg-neon-purple/20 border-neon-purple/40'}`}>
              <Code2 size={18} className={isBossMode ? 'text-red-500' : 'text-neon-purple'} />
            </div>
            <div>
              <h1 className="font-display text-sm font-bold tracking-tight">REACT_ORBITALS_v1.0</h1>
              <p className="font-mono text-[8px] text-white/40 uppercase">GALAXY_WEB // PLANET_REACT</p>
            </div>
          </div>

          {isBossMode && (
            <>
              <div className="h-8 w-px bg-white/5 mx-4" />
              <div className="flex flex-col gap-1 w-64">
                <div className="flex justify-between items-center text-[8px] font-mono font-bold text-red-500 uppercase">
                  <span>SYSTEM_CORRUPTION</span>
                  <span>78%</span>
                </div>
                <div className="h-1.5 w-full bg-red-900/20 rounded-full border border-red-900/30 overflow-hidden">
                  <motion.div 
                    initial={{ width: "100%" }}
                    animate={{ width: "78%" }}
                    className="h-full bg-red-500 shadow-neon-pink"
                  />
                </div>
              </div>
            </>
          )}

          {!isBossMode && (
            <>
              <div className="h-8 w-px bg-white/5" />
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-white/20 uppercase">REWARD_XP</span>
                  <span className="font-mono text-xs text-neon-cyan">+450_XP</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="font-mono text-xs text-white/40 italic">04:12_ELAPSED</div>
          <button 
            onClick={handleSubmit}
            className={`px-6 py-2 font-display font-black text-xs tracking-widest rounded-lg hover:scale-105 transition-all ${isBossMode ? 'bg-red-500 text-black hover:bg-white' : 'bg-neon-cyan text-void'}`}
          >
            {isBossMode ? 'EXECUTE_PURGE' : 'EXECUTE_SYNC'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor Pane */}
        <CodeEditor initialCode={code} onChange={setCode} />

        {/* Mission Brief Pane */}
        <aside className="w-[450px] bg-void/80 backdrop-blur-xl flex flex-col z-10 border-l border-white/5">
          <div className="p-8 space-y-8 flex-1 overflow-y-auto">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Info size={16} className="text-neon-cyan" />
                <h3 className="font-display text-xs font-bold tracking-widest uppercase">MISSION_OBJECTIVE</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed font-medium">
                The orbital balance of <span className="text-neon-cyan">Planet_React</span> depends on the efficient synchronization of state. Your task is to initialize a functional component that hooks into the central data stream and stabilizes the output.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <BrainCircuit size={16} className="text-neon-purple" />
                <h3 className="font-display text-xs font-bold tracking-widest uppercase">NOVA_SYNC</h3>
              </div>
              <div className="p-4 bg-neon-purple/5 border border-neon-purple/20 rounded-xl relative overflow-hidden group">
                <div className="scanline" />
                <p className="text-xs text-white/80 leading-relaxed italic mb-4">
                  "Remember, developer: props flow down, but state flows up when correctly encapsulated. Don't let your data leak into the void."
                </p>
                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-[10px] font-display font-bold text-neon-purple hover:text-white transition-colors"
                >
                  {showHint ? 'CLOSE_ENCRYPTED_HINT' : 'ACCESS_ENCRYPTED_HINT'} <ChevronRight size={14} />
                </button>
                <AnimatePresence>
                  {showHint && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-neon-purple/20 text-[10px] font-mono text-neon-purple/60 leading-relaxed"
                    >
                      HINT_DATA: Look into the 'useState' hook structure. Ensure your setter is correctly bound to the user input event.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <section>
              <h3 className="font-display text-[10px] tracking-[0.3em] text-white/20 uppercase mb-4">TEST_PROTOCOLS</h3>
              <div className="space-y-3">
                <ProtocolItem label="Component Initialized" status="PASS" />
                <ProtocolItem label="State Hook Detected" status="PENDING" />
                <ProtocolItem label="Sync Output Verified" status="PENDING" />
              </div>
            </section>
          </div>

          {/* Social Presence Mini */}
          <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-void bg-cosmic-500 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=P${i}`} alt="user" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-void bg-white/5 flex items-center justify-center text-[8px] font-bold text-white/40">
                +12
              </div>
            </div>
            <span className="text-[10px] font-display font-bold text-white/20 tracking-widest uppercase">ENCRYPTED_COMMS_ACTIVE</span>
          </div>
        </aside>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full glass-panel p-10 text-center border-neon-cyan shadow-neon-cyan/20"
            >
              <div className="w-20 h-20 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-neon-cyan/50">
                <CheckCircle2 size={40} className="text-neon-cyan" />
              </div>
              <h2 className="text-3xl font-display font-black mb-2">MISSION_SYNCED</h2>
              <p className="font-mono text-[10px] text-neon-cyan tracking-[0.3em] uppercase mb-8">System_Stability: RESTORED</p>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-display text-[10px] font-bold text-white/40 tracking-widest uppercase">XP_EARNED</span>
                  <span className="font-mono text-neon-cyan font-bold">+450_XP</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-display text-[10px] font-bold text-white/40 tracking-widest uppercase">KARMA_GAIN</span>
                  <span className="font-mono text-neon-purple font-bold">+12_KM</span>
                </div>
              </div>

              <button 
                onClick={() => setIsCompleted(false)}
                className="w-full py-4 bg-neon-cyan text-void font-display font-black text-sm tracking-widest rounded-xl hover:scale-105 transition-transform"
              >
                ASCEND_TO_ORBIT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function ProtocolItem({ label, status }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
      <span className="text-[10px] font-display font-bold text-white/60 tracking-wider uppercase">{label}</span>
      <span className={`font-mono text-[10px] font-bold ${status === 'PASS' ? 'text-neon-cyan' : 'text-white/20'}`}>{status}</span>
    </div>
  );
}
