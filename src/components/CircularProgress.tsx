import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CircularProgressProps {
  progress: number; // 0 - 100
  size?: number; // diameter in px
  thickness?: number; // ring thickness
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 150,
  thickness = 12,
}) => {
  // SVG Math
  const center = size / 2;
  const radius = center - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // --- COUNT UP ANIMATION LOGIC ---
  const count = useMotionValue(0); // Start at 0
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // Animate the MotionValue from 0 to progress
    const controls = animate(count, progress, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [progress, count]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* SVG Container */}
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={thickness}
          fill="transparent"
          className="text-slate-100"
        />
        
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#ff5b07"
          strokeWidth={thickness}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        {/* We use motion.span to display the MotionValue */}
        <motion.span 
          className="text-4xl font-bold text-slate-800 tabular-nums"
        >
          {rounded}
        </motion.span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Score
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;