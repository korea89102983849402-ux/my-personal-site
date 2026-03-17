import React, { useEffect, useRef } from 'react';

const SakuraBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log('SakuraBackground mounted');
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas ref is null');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setSize();
    window.addEventListener('resize', setSize);

    // --- Petals ---
    class Petal {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height; // Start above screen
        this.size = Math.random() * 10 + 5;
        this.speedX = Math.random() * 2 - 1; // Horizontal drift
        this.speedY = Math.random() * 2 + 1; // Fall speed
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        // Pink variations
        const colors = ['#FFC0CB', '#FFB7C5', '#FF69B4', '#FFB6C1'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Reset if out of bounds
        if (this.y > height + 20) {
          this.y = -20;
          this.x = Math.random() * width;
        }
        if (this.x > width + 20) {
          this.x = -20;
        } else if (this.x < -20) {
          this.x = width + 20;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Draw a simple petal shape (oval-ish with a point)
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const petals: Petal[] = [];
    const numPetals = 100;
    for (let i = 0; i < numPetals; i++) {
      petals.push(new Petal());
    }

    const animate = () => {
      // Clear with light background
      ctx.fillStyle = '#FFF0F5'; // Lavender Blush (very light pink)
      ctx.fillRect(0, 0, width, height);

      // Update and draw petals
      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ background: '#FFF0F5', zIndex: 0 }}
    />
  );
};

export default SakuraBackground;
