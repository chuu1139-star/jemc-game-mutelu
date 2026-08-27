import { useEffect, useRef } from "react";

type Firefly = {
  x: number;
  y: number;
  radius: number;
  drift: number;
  sway: number;
  phase: number;
  pulse: number;
  hue: string;
};

export function Fireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fireflies: Firefly[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;
    let running = false;
    let seed = 918273;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(0, rect.width);
      height = Math.max(0, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedFireflies = () => {
      fireflies.length = 0;
      for (let i = 0; i < 32; i++) {
        fireflies.push({
          x: random(),
          y: random(),
          radius: 1 + random() * 3,
          drift: 0.0007 + random() * 0.0012,
          sway: 5 + random() * 13,
          phase: random() * Math.PI * 2,
          pulse: 1.1 + random() * 1.8,
          hue: random() < 0.5 ? "255,215,0" : "173,255,47",
        });
      }
    };

    const draw = (time: number) => {
      if (!running || document.hidden || reduceMotion.matches || width <= 0) return;
      const dt = Math.min((time - lastTime) / 1000 || 0, 0.05);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      fireflies.forEach((f) => {
        f.y -= f.drift * dt * 60;
        if (f.y < -0.03) f.y = 1.03;
        const x = f.x * width + Math.sin((time / 1000) * 0.32 + f.phase) * f.sway;
        const y = f.y * height;
        const alpha = 0.24 + 0.3 * ((Math.sin((time / 1000) * f.pulse + f.phase) + 1) / 2);
        const glow = ctx.createRadialGradient(x, y, 0, x, y, f.radius * 7);
        glow.addColorStop(0, `rgba(${f.hue},${alpha})`);
        glow.addColorStop(0.28, `rgba(${f.hue},${alpha * 0.45})`);
        glow.addColorStop(1, `rgba(${f.hue},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, f.radius * 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,220,${Math.min(0.9, alpha + 0.25)})`;
        ctx.beginPath();
        ctx.arc(x, y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      frameId = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const start = () => {
      if (running || document.hidden || reduceMotion.matches || width <= 0) return;
      running = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(draw);
    };

    resize();
    seedFireflies();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const onVis = () => (document.hidden ? stop() : start());
    const onMotion = () => (reduceMotion.matches ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    reduceMotion.addEventListener("change", onMotion);
    if (!reduceMotion.matches) start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      reduceMotion.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
    />
  );
}


