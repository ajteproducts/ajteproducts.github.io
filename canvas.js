(() => {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  const DOT_COUNT = 70;
  const MAX_DIST = 160;
  const SPEED = 0.4;

  let dots = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeDot() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    };
  }

  function init() {
    resize();
    dots = Array.from({ length: DOT_COUNT }, makeDot);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Move dots
    for (const d of dots) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
    }

    // Draw connections
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(180,180,180,${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    for (const d of dots) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(190,190,190,0.5)';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
})();
