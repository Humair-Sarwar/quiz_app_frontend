import React from "react";

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
  return (
    <div
      className="relative rounded-full flex items-center justify-center transition-all duration-700 ease-out"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(#f97316 ${progress * 3.6}deg, #e5e7eb ${progress * 3.6}deg)`,
        transition: "background 0.8s ease-in-out",
      }}
    >
      {/* Inner white circle (creates ring effect) */}
      <div
        className="absolute bg-white rounded-full flex items-center justify-center"
        style={{
          width: size - thickness * 2,
          height: size - thickness * 2,
        }}
      >
        <div className="flex flex-col justify-center items-center">
            <span className="text-2xl font-semibold text-gray-800">
          {Math.round(progress)}%
        </span>
        <span>Score</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
