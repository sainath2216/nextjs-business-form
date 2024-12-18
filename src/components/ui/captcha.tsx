"use client";

import { useEffect, useRef, useState } from 'react';

interface CaptchaProps {
  onCodeChange: (code: string) => void;
}

export function Captcha({ onCodeChange }: CaptchaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [code, setCode] = useState('');

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise (dots)
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    // Add lines
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw text
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#4b5563';
    
    // Draw each character with slight random rotation
    const chars = code.split('');
    chars.forEach((char, i) => {
      ctx.save();
      const x = 20 + (i * 25);
      const y = 30;
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  };

  // Only run once on mount
  useEffect(() => {
    const newCode = generateRandomCode();
    setCode(newCode);
    onCodeChange(newCode);
    drawCaptcha(newCode);
  }, []); // Empty dependency array

  const refreshCaptcha = () => {
    const newCode = generateRandomCode();
    setCode(newCode);
    onCodeChange(newCode);
    drawCaptcha(newCode);
  };

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <canvas 
          ref={canvasRef}
          width="180"
          height="50"
          className="border rounded bg-gray-50"
        />
        <button
          type="button"
          onClick={refreshCaptcha}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800"
        >
          ↻ Refresh
        </button>
      </div>
    </div>
  );
}