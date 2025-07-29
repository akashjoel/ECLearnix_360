import React from 'react';

// Simple fallback component that won't cause rendering issues
const Custom3DModel: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 animate-pulse" />
      
      {/* Floating geometric shapes using CSS */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-float-delayed" />
      <div className="absolute bottom-20 left-1/2 w-36 h-36 bg-gradient-to-r from-pink-400/30 to-yellow-400/30 rounded-full blur-xl animate-float-slow" />
      
      {/* Animated particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-float-particle opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
      
      {/* Connection lines */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`line-${i}`}
          className="absolute w-px h-20 bg-gradient-to-b from-indigo-400/20 to-transparent animate-pulse"
          style={{
            left: `${20 + i * 10}%`,
            top: '50%',
            transform: `translateY(-50%) rotate(${i * 45}deg)`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

export default Custom3DModel; 