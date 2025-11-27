import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface QuizCard3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isCorrect?: boolean;
  isSelected?: boolean;
  isAnswered?: boolean;
}

const QuizCard3D: React.FC<QuizCard3DProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  isCorrect,
  isSelected,
  isAnswered
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const getCardStyle = () => {
    if (isAnswered) {
      if (isCorrect) {
        return 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-green-200';
      }
      if (isSelected) {
        return 'border-red-500 bg-gradient-to-br from-red-50 to-rose-50 shadow-red-200';
      }
      return 'border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 shadow-gray-200';
    }
    
    if (disabled) {
      return 'border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 shadow-gray-200 cursor-not-allowed';
    }
    
    return 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-blue-100 cursor-pointer';
  };

  const getGlowEffect = () => {
    if (isAnswered) {
      if (isCorrect) {
        return 'shadow-lg shadow-green-200/50';
      }
      if (isSelected) {
        return 'shadow-lg shadow-red-200/50';
      }
    }
    return isHovered ? 'shadow-xl shadow-blue-200/50' : 'shadow-lg';
  };

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl border-2 transition-all duration-300 ${getCardStyle()} ${getGlowEffect()} ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        rotateX: disabled ? 0 : springRotateX,
        rotateY: disabled ? 0 : springRotateY,
        scale: isHovered && !disabled ? 1.02 : 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {/* 3D Depth Effect */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-gray-50/80"
        style={{
          transform: 'translateZ(20px)',
        }}
      />
      
      {/* Content with 3D positioning */}
      <div
        className="relative z-10 p-6"
        style={{
          transform: 'translateZ(40px)',
        }}
      >
        {children}
      </div>

      {/* Animated Border Glow */}
      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-blue-400/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            transform: 'translateZ(10px)',
          }}
        />
      )}

      {/* Success/Error Glow */}
      {isAnswered && (
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 ${
            isCorrect ? 'border-green-400/50' : isSelected ? 'border-red-400/50' : ''
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            transform: 'translateZ(5px)',
          }}
        />
      )}

      {/* Floating Particles Effect */}
      {isHovered && !disabled && (
        <>
          <motion.div
            className="absolute top-2 left-4 w-1 h-1 bg-blue-400 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              transform: 'translateZ(30px)',
            }}
          />
          <motion.div
            className="absolute bottom-3 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              transform: 'translateZ(30px)',
            }}
          />
        </>
      )}
    </motion.div>
  );
};

export default QuizCard3D; 