'use client';

import { motion } from 'framer-motion';

export default function XPBar({ current, total, level }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end">
        <span className="font-display text-[10px] tracking-widest text-white/40 uppercase">LEVEL {level}</span>
        <span className="font-mono text-xs text-neon-cyan">{current} / {total} XP</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan relative"
        >
          {/* Pulse effect */}
          <motion.div 
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      </div>
    </div>
  );
}
