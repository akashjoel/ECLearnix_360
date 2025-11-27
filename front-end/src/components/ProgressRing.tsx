import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#3B82F6',
  className = '',
  showPercentage = true,
  animated = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const center = size / 2;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background Ring */}
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        
        {/* Progress Ring */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={animated ? { strokeDashoffset: circumference } : {}}
          animate={animated ? { strokeDashoffset } : {}}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.2
          }}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))'
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {showPercentage && (
          <motion.div
            initial={animated ? { scale: 0, opacity: 0 } : {}}
            animate={animated ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.8
            }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-gray-800">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-gray-500">Complete</div>
          </motion.div>
        )}
      </div>

      {/* Animated Glow Effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 1.2
          }}
        />
      )}

      {/* Floating Particles */}
      {animated && progress > 0 && (
        <>
          <motion.div
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${center + radius * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2)}px`,
              top: `${center + radius * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2)}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.5
            }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full"
            style={{
              left: `${center + (radius - 10) * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2)}px`,
              top: `${center + (radius - 10) * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2)}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.7
            }}
          />
        </>
      )}
    </div>
  );
};

export default ProgressRing; 