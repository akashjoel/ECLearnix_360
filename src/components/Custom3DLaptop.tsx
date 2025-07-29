import React from 'react';

// Simple fallback component that won't cause rendering issues
const Custom3DLaptop: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Laptop container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Laptop base */}
        <div className="relative w-48 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-1000">
          {/* Screen */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-40 h-24 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg shadow-xl border-2 border-gray-600">
            {/* Screen content */}
            <div className="p-2">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="h-1 bg-green-400 rounded mb-1 animate-pulse"
                  style={{ 
                    width: `${80 - i * 10}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Keyboard area */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg">
            {/* Keyboard keys */}
            <div className="grid grid-cols-4 gap-1 p-2">
              {[...Array(16)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-gray-500 rounded-sm animate-pulse"
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating particles around laptop */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float-particle opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Connection lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`laptop-line-${i}`}
            className="absolute w-px h-16 bg-gradient-to-b from-blue-400/40 to-transparent animate-pulse"
            style={{
              left: `${30 + i * 8}%`,
              top: '50%',
              transform: `translateY(-50%) rotate(${i * 30}deg)`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Custom3DLaptop; 