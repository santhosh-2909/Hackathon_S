"use client";

import React, { useEffect, useRef } from "react";

export default function CursorLiquid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particles: Array<any> = [];

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);

    const pointer = { x: width / 2, y: height / 2 };

    function spawn(x: number, y: number) {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x,
          y,
          r: 6 + Math.random() * 18,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 60 + Math.random() * 40,
        });
      }
    }

    function onMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      spawn(pointer.x, pointer.y);
    }

    function onTouch(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      pointer.x = t.clientX;
      pointer.y = t.clientY;
      spawn(pointer.x, pointer.y);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    let raf = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // draw particles as blurred circles and composite them to create a liquid look
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 1;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grd.addColorStop(0, "rgba(99,102,241,0.95)");
        grd.addColorStop(0.4, "rgba(139,92,246,0.55)");
        grd.addColorStop(1, "rgba(79,70,229,0)");

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      }
      ctx.restore();

      // soft blur pass via CSS filter on the canvas element (applied in style)
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch as any);
    };
  }, []);

    return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 w-full h-full opacity-100"
      style={{ filter: "blur(18px) contrast(1.05)", mixBlendMode: "screen" }}
    />
  );
}
