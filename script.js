const canvas = document.querySelector('#loveCanvas');
const ctx = canvas.getContext('2d');
const finalMessage = document.querySelector('#finalMessage');
const hint = document.querySelector('#hint');
let width, height, dpr, particles = [], rain = [], animationId, startedAt = 0, previousStep = -1;

// Change these words or the final message in index.html whenever you want.
const sequence = [
  { text: '❤︎', duration: 3500 },
  { text: '3', duration: 2500 },
  { text: '2', duration: 2500 },
  { text: '1', duration: 3000 },
  { text: 'Happy Birthday', duration: 3900 },
  { text: 'Khusu', duration: 3600 },
];

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth; height = window.innerHeight;
  canvas.width = width * dpr; canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  rain = Array.from({ length: Math.ceil(width / 24) }, (_, i) => ({
    x: i * 24 + Math.random() * 10,
    y: Math.random() * height,
    speed: .18 + Math.random() * .45,
    size: 9 + Math.random() * 5,
    fade: .25 + Math.random() * .55
  }));
  makeTargets(currentText());
}

function currentText() {
  let passed = 0;
  const elapsed = performance.now() - startedAt;
  for (const item of sequence) { passed += item.duration; if (elapsed < passed) return item.text; }
  return sequence.at(-1).text;
}

function textPoints(text) {
  const off = document.createElement('canvas');
  const offCtx = off.getContext('2d');
  off.width = width; off.height = height;
  const isNumber = text.length === 1;
  let size = isNumber ? Math.min(width * .42, height * .62) : Math.min(width / (text.length * .64), height * .29);
  offCtx.font = `600 ${size}px Georgia, serif`;
  offCtx.textAlign = 'center'; offCtx.textBaseline = 'middle';
  offCtx.fillStyle = '#fff'; offCtx.fillText(text, width / 2, height / 2);
  const data = offCtx.getImageData(0, 0, width, height).data;
  const step = Math.max(4, Math.round(Math.min(width, height) / 170));
  const points = [];
  for (let y = 0; y < height; y += step) for (let x = 0; x < width; x += step) {
    if (data[(y * width + x) * 4 + 3] > 100) points.push({ x, y });
  }
  return points;
}

function makeTargets(text) {
  if (!width) return;
  const points = textPoints(text);
  const count = Math.max(850, points.length);
  while (particles.length < count) particles.push({ x: Math.random() * width, y: Math.random() * height, tx: 0, ty: 0, r: 1 + Math.random() * 1.4, seed: Math.random() * 9 });
  particles = particles.slice(0, count);
  particles.forEach((p, i) => {
    const target = points[i % points.length];
    p.tx = target.x + (Math.random() - .5) * 1.7;
    p.ty = target.y + (Math.random() - .5) * 1.7;
  });
}

function drawBackground() {
  ctx.fillStyle = '#08080e'; ctx.fillRect(0, 0, width, height);
  ctx.save(); ctx.font = '10px monospace'; ctx.textAlign = 'center';
  for (const line of rain) {
    line.y -= line.speed;
    if (line.y < -160) { line.y = height + 50; line.x = Math.random() * width; }
    for (let n = 0; n < 11; n++) {
      const y = line.y + n * 17;
      ctx.fillStyle = n % 3 === 0 ? `rgba(255,91,155,${line.fade})` : `rgba(215,110,163,${line.fade * .55})`;
      ctx.fillText(n % 2 ? 'I LOVE YOU' : '♡', line.x, y);
    }
  }
  ctx.restore();
}

function drawParticles(stepProgress) {
  const settling = Math.min(1, stepProgress / .34);
  const leaving = Math.max(0, (stepProgress - .74) / .26);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  particles.forEach((p, i) => {
    const swirlX = Math.sin((performance.now() / 450) + p.seed) * (1 - settling) * 22;
    const swirlY = Math.cos((performance.now() / 380) + p.seed) * (1 - settling) * 22;
    p.x += (p.tx + swirlX - p.x) * (.032 + settling * .09);
    p.y += (p.ty + swirlY - p.y) * (.032 + settling * .09);
    const out = leaving * 16;
    const alpha = .25 + settling * .75 - leaving * .4;
    ctx.fillStyle = `rgba(255,255,214,${Math.max(0,alpha)})`;
    ctx.beginPath(); ctx.arc(p.x + Math.sin(i) * out, p.y + Math.cos(i * 1.7) * out, p.r, 0, Math.PI * 2); ctx.fill();
  });
  ctx.restore();
}

function animate(now) {
  if (!startedAt) startedAt = now;
  let elapsed = now - startedAt, passed = 0, active = 0;
  for (let i = 0; i < sequence.length; i++) { if (elapsed < passed + sequence[i].duration) { active = i; break; } passed += sequence[i].duration; active = i + 1; }
  if (active >= sequence.length) { drawBackground(); finalMessage.classList.add('show'); hint.style.opacity = 0; return; }
  const item = sequence[active], progress = (elapsed - passed) / item.duration;
  if (active !== previousStep) { previousStep = active; makeTargets(item.text); }
  drawBackground(); drawParticles(progress);
  animationId = requestAnimationFrame(animate);
}

function start() {
  cancelAnimationFrame(animationId); startedAt = performance.now(); previousStep = -1;
  finalMessage.classList.remove('show'); hint.style.opacity = 1;
  particles = [];
  makeTargets(sequence[0].text);
  animationId = requestAnimationFrame(animate);
}

document.querySelector('#restart').addEventListener('click', start);
window.addEventListener('resize', resize);
resize(); start();
