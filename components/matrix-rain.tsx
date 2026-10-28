'use client';

import React, { useEffect, useRef } from 'react';
import { useCyber } from './cyber-context';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { matrixEnabled } = useCyber();

  useEffect(() => {
    if (!matrixEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'.split('');
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }

    let lastTime = 0;
    const fps = 28; // Keep CPU usage minimal and aesthetic smooth
    const interval = 1000 / fps;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      // Translucent black overlay to create trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading char is bright cyan or white
        if (Math.random() > 0.88) {
          ctx.fillStyle = '#b3ffc6';
        } else {
          ctx.fillStyle = '#00ff41';
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newCols = Math.floor(width / fontSize);
      drops.length = 0;
      for (let i = 0; i < newCols; i++) {
        drops[i] = Math.floor(Math.random() * -50);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [matrixEnabled]);

  if (!matrixEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
