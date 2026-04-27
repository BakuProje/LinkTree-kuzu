import React, { useEffect, useRef } from 'react';

const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    // Star particle class
    class Star {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speed: number;
      opacity: number;
      angle: number;
      distance: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseSize = Math.random() * 1.5;
        this.size = this.baseSize;
        this.speed = Math.random() * 0.05 + 0.01;
        this.opacity = Math.random();
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * Math.max(width, height) * 0.5;
        this.color = Math.random() > 0.8 ? 'rgba(150, 200, 255,' : 'rgba(255, 255, 255,';
      }

      update() {
        this.angle += this.speed * 0.05;
        this.opacity = 0.2 + Math.abs(Math.sin(Date.now() * 0.0005 * (this.speed * 100))) * 0.8;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (this.baseSize > 1.2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(0, 191, 255, 0.8)';
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    class ShootingStar {
      x: number = 0;
      y: number = 0;
      length: number = 0;
      speed: number = 0;
      opacity: number = 0;
      active: boolean = false;

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.5;
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 10 + 5;
        this.opacity = 0;
        this.active = true;
      }

      update() {
        if (!this.active) {
          if (Math.random() < 0.005) this.reset();
          return;
        }
        this.x += this.speed;
        this.y += this.speed * 0.5;
        this.opacity += 0.05;
        if (this.x > width || this.y > height) this.active = false;
      }

      draw() {
        if (!this.active || !ctx) return;
        const grad = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y - this.length * 0.5);
        grad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(this.opacity, 0.8)})`);
        grad.addColorStop(1, 'rgba(0, 191, 255, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y - this.length * 0.5);
        ctx.stroke();
      }
    }

    const stars: Star[] = Array.from({ length: 200 }, () => new Star());
    const shootingStars: ShootingStar[] = Array.from({ length: 3 }, () => new ShootingStar());

    // Nebula clouds
    const drawNebula = () => {
      const time = Date.now() * 0.00005;
      
      // Deep background
      ctx.fillStyle = '#010409';
      ctx.fillRect(0, 0, width, height);

      // Nebula layers
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      // Layer 1: Deep Blue
      const grad1 = ctx.createRadialGradient(
        width * 0.5 + Math.cos(time) * 100,
        height * 0.5 + Math.sin(time) * 50,
        0,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      grad1.addColorStop(0, 'rgba(0, 30, 100, 0.3)');
      grad1.addColorStop(0.5, 'rgba(0, 10, 40, 0.1)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Cyan Nebula
      const grad2 = ctx.createRadialGradient(
        width * 0.3 + Math.sin(time * 1.5) * 200,
        height * 0.7 + Math.cos(time * 0.8) * 150,
        0,
        width * 0.3,
        height * 0.7,
        width * 0.6
      );
      grad2.addColorStop(0, 'rgba(0, 150, 255, 0.15)');
      grad2.addColorStop(0.6, 'rgba(0, 50, 100, 0.05)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Layer 3: Subtle Purple
      const grad3 = ctx.createRadialGradient(
        width * 0.8 + Math.cos(time * 1.2) * 200,
        height * 0.2 + Math.sin(time * 1.1) * 150,
        0,
        width * 0.8,
        height * 0.2,
        width * 0.5
      );
      grad3.addColorStop(0, 'rgba(100, 0, 255, 0.1)');
      grad3.addColorStop(0.5, 'rgba(50, 0, 100, 0.02)');
      grad3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawNebula();
      
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      shootingStars.forEach(ss => {
        ss.update();
        ss.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#000' }}
    />
  );
};

export default CosmicBackground;
