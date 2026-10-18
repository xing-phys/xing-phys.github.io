export function initWave() {
  const canvas = document.querySelector('#wave');
  const context = canvas.getContext('2d');
  const button = document.querySelector('#pause-wave');
  const gui = document.querySelector('#gui');
  let waveTime = 0;
  let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let last = 0;

  function draw() {
    if (gui.hidden || !context) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width) return;

    const pixelRatio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = rect.width * pixelRatio;
    canvas.height = rect.height * pixelRatio;
    context.scale(pixelRatio, pixelRatio);

    const width = rect.width;
    const height = rect.height;
    const dark = document.body.classList.contains('dark');

    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width * 0.5, height * 0.5);
    context.rotate(-0.19);

    for (let j = 0; j < 49; j++) {
      const v = j / 48;
      context.beginPath();

      for (let i = 0; i <= 140; i++) {
        const u = i / 140;
        const x = (u - 0.5) * width * 0.96;
        const envelope = Math.sin(u * Math.PI) ** 0.7;
        const y = (v - 0.5) * height * 0.43
          + Math.sin(u * 8 + v * 5 + waveTime) * height * 0.12 * envelope
          + Math.cos(u * 13 - v * 4 - waveTime * 0.4) * height * 0.038 * envelope;

        if (i) context.lineTo(x, y);
        else context.moveTo(x, y);
      }

      context.strokeStyle = `hsla(${255 + v * 34},${dark ? 65 : 55}%,${dark ? 72 : 54}%,${0.22 + Math.sin(v * Math.PI) * 0.4})`;
      context.lineWidth = 0.9;
      context.stroke();
    }

    context.restore();
    context.fillStyle = dark ? '#c6b5f5' : '#8666c8';

    for (const [x, y] of [[0.19, 0.25], [0.81, 0.3], [0.79, 0.72], [0.23, 0.76]]) {
      context.beginPath();
      context.arc(width * x, height * y, 2, 0, Math.PI * 2);
      context.fill();
    }
  }

  function updateLabel() {
    button.textContent = paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
    button.setAttribute('aria-label', paused ? 'Resume wave animation' : 'Pause wave animation');
  }

  button.addEventListener('click', () => {
    paused = !paused;
    updateLabel();
  });
  updateLabel();

  function animate(time) {
    if (time - last > 40) {
      if (!paused && !document.hidden && !gui.hidden) {
        waveTime += 0.015;
        draw();
      }
      last = time;
    }
    requestAnimationFrame(animate);
  }

  new ResizeObserver(draw).observe(canvas);
  requestAnimationFrame(animate);

  return {draw};
}
