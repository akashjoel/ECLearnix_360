import React, { useEffect, useRef } from 'react';

const FloatingLaptop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = 400;
      canvas.height = 300;
    };

    resizeCanvas();

    // Animation variables
    let animationId: number;
    let time = 0;

    // Laptop dimensions
    const laptopWidth = 200;
    const laptopHeight = 120;
    const screenWidth = 180;
    const screenHeight = 100;

    // Animation loop
    const animate = () => {
      time += 0.02;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate floating animation
      const floatY = Math.sin(time) * 10;

      // Save context for transformations
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2 + floatY);

      // Draw laptop base
      const gradient = ctx.createLinearGradient(-laptopWidth/2, -laptopHeight/2, laptopWidth/2, laptopHeight/2);
      gradient.addColorStop(0, '#1f2937');
      gradient.addColorStop(0.5, '#374151');
      gradient.addColorStop(1, '#111827');

      ctx.fillStyle = gradient;
      ctx.fillRect(-laptopWidth/2, -laptopHeight/2, laptopWidth, laptopHeight);

      // Draw laptop screen
      const screenGradient = ctx.createLinearGradient(-screenWidth/2, -screenHeight/2, screenWidth/2, screenHeight/2);
      screenGradient.addColorStop(0, '#1e40af');
      screenGradient.addColorStop(0.5, '#3b82f6');
      screenGradient.addColorStop(1, '#1d4ed8');

      ctx.fillStyle = screenGradient;
      ctx.fillRect(-screenWidth/2, -screenHeight/2, screenWidth, screenHeight);

      // Draw screen content (code lines)
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.textAlign = 'left';
      
      const codeLines = [
        'function launchCareer() {',
        '  const skills = [',
        '    "React", "Node.js",',
        '    "Python", "AWS"',
        '  ];',
        '  return success;',
        '}'
      ];

      codeLines.forEach((line, index) => {
        ctx.fillText(line, -screenWidth/2 + 10, -screenHeight/2 + 20 + index * 15);
      });

      // Draw keyboard
      ctx.fillStyle = '#374151';
      ctx.fillRect(-laptopWidth/2 + 10, laptopHeight/2 - 30, laptopWidth - 20, 20);

      // Draw keys
      ctx.fillStyle = '#6b7280';
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 3; j++) {
          ctx.fillRect(
            -laptopWidth/2 + 15 + i * 20,
            laptopHeight/2 - 25 + j * 7,
            15, 5
          );
        }
      }

      // Draw glowing effect
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 150);
      glowGradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)');
      glowGradient.addColorStop(1, 'rgba(217, 70, 239, 0)');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(-150, -100, 300, 200);

      // Draw floating particles around laptop
      for (let i = 0; i < 10; i++) {
        const angle = time + i * 0.5;
        const radius = 80 + Math.sin(time * 2 + i) * 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${0.5 + 0.3 * Math.sin(time + i)})`;
        ctx.fill();
      }

      // Draw connection lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const startAngle = time + i * 0.8;
        const endAngle = time + i * 0.8 + 0.3;
        
        ctx.beginPath();
        ctx.arc(0, 0, 60 + i * 10, startAngle, endAngle);
        ctx.stroke();
      }

      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default FloatingLaptop; 