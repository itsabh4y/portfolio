import React, { useEffect, useRef, useState, useCallback } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [statusText, setStatusText] = useState('initializing');
  const animFrameRef = useRef(null);
  const nodesRef = useRef([]);
  const ripplesRef = useRef([]);
  const startTimeRef = useRef(Date.now());
  const exitingRef = useRef(false);

  const DURATION = 3000;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();

    // Create grid intersection nodes
    const GRID_SIZE = 48;
    const nodes = [];
    for (let x = 0; x < w + GRID_SIZE; x += GRID_SIZE) {
      for (let y = 0; y < h + GRID_SIZE; y += GRID_SIZE) {
        nodes.push({
          x, y,
          baseSize: 1.5,
          size: 1.5,
          glow: 0,
          pulseOffset: Math.random() * Math.PI * 2,
          activated: false,
          activateTime: 0,
        });
      }
    }
    nodesRef.current = nodes;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 300,
        opacity: 0.6,
        speed: 6,
      });
    };

    const handleTouch = (e) => {
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const t = Math.min(elapsed / DURATION, 1);
      const time = Date.now() * 0.001;

      // Eased progress
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.round(eased * 100));

      // Status text
      if (t < 0.25) setStatusText('initializing');
      else if (t < 0.5) setStatusText('loading assets');
      else if (t < 0.8) setStatusText('preparing layout');
      else setStatusText('ready');

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Background — match portfolio cream
      ctx.fillStyle = '#f7f5ef';
      ctx.fillRect(0, 0, w, h);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseRadius = 150;

      // Update and draw nodes
      nodes.forEach(node => {
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse proximity glow
        if (dist < mouseRadius) {
          const factor = 1 - dist / mouseRadius;
          node.glow = Math.max(node.glow, factor);
          node.size = node.baseSize + factor * 5;
        } else {
          node.glow *= 0.92;
          node.size = node.baseSize + node.glow * 3;
        }

        // Progress activation wave — from center
        const cx = w / 2;
        const cy = h / 2;
        const distFromCenter = Math.sqrt((node.x - cx) ** 2 + (node.y - cy) ** 2);
        const maxDist = Math.sqrt(cx * cx + cy * cy);
        const activationThreshold = eased * maxDist * 1.2;

        if (distFromCenter < activationThreshold && !node.activated) {
          node.activated = true;
          node.activateTime = time;
        }

        // Pulse for activated nodes
        let pulse = 0;
        if (node.activated) {
          const since = time - node.activateTime;
          pulse = Math.sin(since * 3 + node.pulseOffset) * 0.3;
        }

        const radius = Math.max(node.size + pulse, 0.5);

        // Draw node
        if (node.glow > 0.05 || node.activated) {
          // Glow ring for mouse proximity
          if (node.glow > 0.1) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, Math.max(radius * 4, 1), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(14, 165, 233, ${node.glow * 0.12})`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

          if (node.activated) {
            const alpha = 0.15 + pulse * 0.1 + node.glow * 0.5;
            ctx.fillStyle = node.glow > 0.2
              ? `rgba(14, 165, 233, ${Math.min(alpha + 0.3, 1)})`
              : `rgba(14, 165, 233, ${Math.min(alpha, 0.6)})`;
          } else {
            ctx.fillStyle = `rgba(14, 165, 233, ${node.glow * 0.6})`;
          }
          ctx.fill();
        } else {
          // Dormant dot
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
          ctx.fill();
        }
      });

      // Draw connection lines from mouse to nearby nodes
      if (mx > 0 && my > 0) {
        nodes.forEach(node => {
          const dx = mx - node.x;
          const dy = my - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 10) {
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(node.x, node.y);
            const alpha = (1 - dist / mouseRadius) * 0.15;
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });

        // Mouse cursor glow
        const cursorGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
        cursorGlow.addColorStop(0, 'rgba(14, 165, 233, 0.08)');
        cursorGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(mx - 60, my - 60, 120, 120);
      }

      // Draw ripples from clicks
      ripplesRef.current.forEach(ripple => {
        ripple.radius += ripple.speed;
        ripple.opacity *= 0.97;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(14, 165, 233, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner ring
        if (ripple.radius > 20) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(14, 165, 233, ${ripple.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Activate nodes in ripple range
        nodes.forEach(node => {
          const d = Math.sqrt((node.x - ripple.x) ** 2 + (node.y - ripple.y) ** 2);
          if (Math.abs(d - ripple.radius) < 20) {
            node.glow = Math.max(node.glow, 0.8 * ripple.opacity);
            node.size = node.baseSize + 4 * ripple.opacity;
          }
        });
      });

      // Clean up dead ripples
      ripplesRef.current = ripplesRef.current.filter(r => r.opacity > 0.02);

      // Trigger exit
      if (t >= 1 && !exitingRef.current) {
        exitingRef.current = true;
        setExiting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handleTouch);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen ${exiting ? 'loading-exit' : ''}`}>
      <canvas ref={canvasRef} className="loading-canvas" />

      <div className="loading-content">
        {/* Favicon logo */}
        <div className="loading-logo-container">
          <div className="loading-logo-wrapper">
            <img src="/favicon.png" alt="Logo" className="loading-favicon" />
            <div className="logo-orbit-ring" />
            <div className="logo-orbit-ring logo-orbit-ring-2" />
          </div>
        </div>

        {/* Brand */}
        <h1 className="loading-brand">by the horizons</h1>
        <p className="loading-tagline">ABHAY P. — WEB DEVELOPER</p>

        {/* Progress bar */}
        <div className="loading-progress-track">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loading-meta">
          <span className="loading-status">// {statusText}</span>
          <span className="loading-percentage">{progress}%</span>
        </div>

        <p className="loading-interact-hint">
          move & click to interact
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
