import React from "react";
import { motion } from "framer-motion"; // ✨ Import Framer Motion

interface ProgressBarProps {
  progress: number; // value from 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Clamp progress between 0 and 100 to prevent layout breaks
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-black uppercase tracking-widest text-slate-500">
          Quiz Progress
        </span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-black text-[#ff5b07]"
        >
          {Math.round(clampedProgress)}%
        </motion.span>
      </div>

      <div className="relative w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
        {/* Animated Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-r from-orange-400 to-[#ff5b07] h-full rounded-full"
        >
          {/* Subtle Reflective Shimmer Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] w-20 animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;