/* ==========================================================================
   STATE & TELEMETRY REGISTRY
   ========================================================================== */

let activeUserId = null;
let userData = null;
let partnerData = null;
let currentTheme = 'deep-space';

// Particle Engine Configuration
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: 0, y: 0, lastX: 0, lastY: 0, speed: 0 };
let lastMouseMoveTime = Date.now();
let isWarpSpeed = false;
let warpStars = [];

// Audio Engine Nodes (Web Audio API)
let audioCtx = null;
let spaceHumOsc = null;
let spaceHumGain = null;
let spaceHumFilter = null;
let spaceResonanceOsc = null;
let spaceResonanceGain = null;
let isAudioActive = false;

/* ==========================================================================
   INITIALIZATION & AUTOPLAY BYPASS
   ========================================================================== */

document.getElementById('btn-init-system').addEventListener('click', async () => {
  try {
    // 1. Initialize Web Audio API
    initAudioEngine();
    
    // 2. Perform Haptic Trigger test
    triggerHaptics([80]);

    // 3. Hide activation overlay
    const overlay = document.getElementById('audio-bypass-overlay');
    overlay.classList.add('fade-out');

    logToConsole('Audio, Haptic, and Physics Engines synchronized successfully.', 'success');

    // 4. Kick off database seed or loading
    await bootstrapDashboard();

  } catch (error) {
    console.error('Failed to activate system:', error);
    logToConsole('System activation error: ' + error.message, 'error');
  }
});

// Seed star field background for warp simulations
function initWarpStars() {
  warpStars = [];
  for (let i = 0; i < 200; i++) {
    warpStars.push({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width,
      color: '#fff'
    });
  }
}

// Window resizing
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initWarpStars();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

/* ==========================================================================
   WEB AUDIO SYNTHESIZER ENGINE
   ========================================================================== */

function initAudioEngine() {
  if (isAudioActive) return;

  // Create audio context supporting prefix fallbacks
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContextClass();
  
  // Node 1: Space Hum (Triangle)
  spaceHumOsc = audioCtx.createOscillator();
  spaceHumOsc.type = 'triangle';
  spaceHumOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
  
  // Node 2: Space Resonance (Sine)
  spaceResonanceOsc = audioCtx.createOscillator();
  spaceResonanceOsc.type = 'sine';
  spaceResonanceOsc.frequency.setValueAtTime(110, audioCtx.currentTime); // A2 note

  // Biquad Filter (Lowpass) to make it deep and moody
  spaceHumFilter = audioCtx.createBiquadFilter();
  spaceHumFilter.type = 'lowpass';
  spaceHumFilter.frequency.setValueAtTime(180, audioCtx.currentTime);
  spaceHumFilter.Q.setValueAtTime(1.5, audioCtx.currentTime);

  // Gain nodes for volume management
  spaceHumGain = audioCtx.createGain();
  spaceHumGain.gain.setValueAtTime(0.06, audioCtx.currentTime);

  spaceResonanceGain = audioCtx.createGain();
  spaceResonanceGain.gain.setValueAtTime(0.015, audioCtx.currentTime);

  // Connect graphs
  spaceHumOsc.connect(spaceHumFilter);
  spaceResonanceOsc.connect(spaceHumFilter);
  spaceHumFilter.connect(spaceHumGain);
  spaceHumFilter.connect(spaceResonanceGain);
  
  spaceHumGain.connect(audioCtx.destination);
  spaceResonanceGain.connect(audioCtx.destination);

  // Start oscillators
  spaceHumOsc.start(0);
  spaceResonanceOsc.start(0);
  
  isAudioActive = true;
}

// Modulate frequency/filter based on card hover tilt
function updateSpaceHum(tiltMagnitude) {
  if (!isAudioActive || !audioCtx) return;
  
  // Keep values bounded
  const mag = Math.min(Math.max(tiltMagnitude, 0), 1.5);
  
  // Modulate main frequency between 55Hz and 75Hz
  const humFreq = 55 + (mag * 15);
  spaceHumOsc.frequency.setTargetAtTime(humFreq, audioCtx.currentTime, 0.1);
  
  // Modulate resonance frequency between 110Hz and 150Hz
  const resonanceFreq = 110 + (mag * 30);
  spaceResonanceOsc.frequency.setTargetAtTime(resonanceFreq, audioCtx.currentTime, 0.15);

  // Open up filter cutoff as user tilts: 180Hz (flat) to 550Hz (tilted)
  const filterCutoff = 180 + (mag * 250);
  spaceHumFilter.frequency.setTargetAtTime(filterCutoff, audioCtx.currentTime, 0.08);
}

// Plasma Snap SFX (7-Day milestone)
function playPlasmaSnapSFX() {
  if (!isAudioActive || !audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.35);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(600, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start(0);
  osc.stop(audioCtx.currentTime + 0.4);
}

// Warp Speed Zoom SFX (30-Day milestone)
function playWarpZoomSFX() {
  if (!isAudioActive || !audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const osc2 = audioCtx.createOscillator();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(60, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 1.8);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(120, audioCtx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 1.8);

  gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.6);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

  osc.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start(0);
  osc2.start(0);
  osc.stop(audioCtx.currentTime + 1.9);
  osc2.stop(audioCtx.currentTime + 1.9);
}

// Shield Shatter SFX
function playShieldShatterSFX() {
  if (!isAudioActive || !audioCtx) return;

  // Synthesize white noise for shatter sound
  const bufferSize = audioCtx.sampleRate * 0.4;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'peaking';
  filter.frequency.setValueAtTime(3200, audioCtx.currentTime);
  filter.Q.setValueAtTime(5, audioCtx.currentTime);

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

  noiseNode.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // Play high chime osc alongside noise
  const chime = audioCtx.createOscillator();
  chime.type = 'sine';
  chime.frequency.setValueAtTime(2500, audioCtx.currentTime);
  chime.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.3);

  const chimeGain = audioCtx.createGain();
  chimeGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  chimeGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

  chime.connect(chimeGain);
  chimeGain.connect(audioCtx.destination);

  noiseNode.start(0);
  chime.start(0);
  chime.stop(audioCtx.currentTime + 0.35);
}

/* ==========================================================================
   HAPTICS MANAGER
   ========================================================================== */

function triggerHaptics(pattern) {
  if (navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      console.warn('Vibration API blocked or not supported on this device schema.', e);
    }
  }
}

/* ==========================================================================
   3D TILT PHYSICS & PARALLAX MATH
   ========================================================================== */

const mainCard = document.getElementById('main-user-card');

mainCard.addEventListener('mousemove', (e) => {
  const rect = mainCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const w = rect.width;
  const h = rect.height;

  // Relative coordinates centered on zero (-1.0 to 1.0)
  const dx = (x - w/2) / (w/2);
  const dy = (y - h/2) / (h/2);

  // 3D rotations (Max 12 degrees)
  const rotX = -(dy * 12).toFixed(2);
  const rotY = (dx * 12).toFixed(2);

  // Update card transform variables (Z axis drops down in danger state)
  const zTranslation = mainCard.classList.contains('danger') ? -25 : 10;
  mainCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, 0, ${zTranslation}px)`;

  // Glass specular glare offsets
  mainCard.style.setProperty('--glare-x', `${(x / w) * 100}%`);
  mainCard.style.setProperty('--glare-y', `${(y / h) * 100}%`);

  // Specular contribution grid offset
  mainCard.style.setProperty('--shift-x', `${dx * -20}`);
  mainCard.style.setProperty('--shift-y', `${dy * -20}`);

  // Modulate sound hum pitch based on distance from center
  const distance = Math.sqrt(dx*dx + dy*dy);
  updateSpaceHum(distance);

  // Update custom tilt variables for custom danger classes
  mainCard.style.setProperty('--tilt-x-card', `${dx * 5}px`);
  mainCard.style.setProperty('--tilt-y-card', `${dy * 5}px`);
});

mainCard.addEventListener('mouseleave', () => {
  // Gracefully transition back to static
  mainCard.style.transform = `rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0px)`;
  mainCard.style.setProperty('--shift-x', '0');
  mainCard.style.setProperty('--shift-y', '0');
  
  // Fade out audio hum modulation
  updateSpaceHum(0);
});

/* ==========================================================================
   VELOCITY PARTICLE & WARP SPEED SYSTEMS
   ========================================================================== */

class Particle {
  constructor(x, y, type, color) {
    this.x = x;
    this.y = y;
    this.type = type; // 'spark' or 'mist'
    this.color = color;
    
    if (type === 'spark') {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 2 + 1.5;
      this.decay = Math.random() * 0.03 + 0.015;
      this.gravity = 0.05;
    } else { // 'mist'
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 12 + 6;
      this.decay = Math.random() * 0.01 + 0.005;
      this.gravity = -0.01; // mist floats up
    }
    
    this.opacity = 1.0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.opacity -= this.decay;
    if (this.type === 'mist') {
      this.size += 0.1; // mist expands
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    if (this.type === 'spark') {
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    } else {
      ctx.shadowBlur = 0;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }
}

// Track mouse speed and positions over document
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  
  const now = Date.now();
  const dt = now - lastMouseMoveTime;
  if (dt > 1) {
    const dx = mouse.x - mouse.lastX;
    const dy = mouse.y - mouse.lastY;
    mouse.speed = Math.sqrt(dx*dx + dy*dy) / dt; // pixels per millisecond
  }
  
  mouse.lastX = mouse.x;
  mouse.lastY = mouse.y;
  lastMouseMoveTime = now;

  // Only spawn cursor particles if hovered over the main card
  const rect = mainCard.getBoundingClientRect();
  const isOverCard = (
    mouse.x >= rect.left && 
    mouse.x <= rect.right && 
    mouse.y >= rect.top && 
    mouse.y <= rect.bottom
  );

  if (isOverCard && !isWarpSpeed) {
    const themeColors = {
      'deep-space': ['#6c63ff', '#00f5ff', '#0099ff'],
      'cyberpunk': ['#ff007f', '#00ff00', '#ffff00'],
      'solar-flare': ['#ff5722', '#ffd700', '#ff9800']
    };
    
    const colors = themeColors[currentTheme] || ['#fff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    if (mouse.speed > 1.2) {
      // High speed: spawn dynamic neon sparks
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouse.x, mouse.y, 'spark', color));
      }
    } else if (mouse.speed > 0.05) {
      // Slow speed: spawn soft glowing mist
      if (Math.random() < 0.3) {
        particles.push(new Particle(mouse.x, mouse.y, 'mist', color));
      }
    }
  }
});

// Particles animation loop
function tickParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isWarpSpeed) {
    // Warp speed Starfield simulation
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    ctx.lineWidth = 2;
    
    warpStars.forEach(star => {
      star.z -= 12; // accelerate forwards
      if (star.z <= 0) {
        star.z = canvas.width;
        star.x = (Math.random() - 0.5) * canvas.width;
        star.y = (Math.random() - 0.5) * canvas.height;
      }
      
      const k = 220 / star.z;
      const px = star.x * k + cx;
      const py = star.y * k + cy;
      
      // Calculate radial trail lines
      const prevK = 220 / (star.z + 40);
      const opx = star.x * prevK + cx;
      const opy = star.y * prevK + cy;

      const colors = {
        'deep-space': '#00f5ff',
        'cyberpunk': '#ff007f',
        'solar-flare': '#ff5722'
      };

      ctx.beginPath();
      ctx.strokeStyle = colors[currentTheme] || '#fff';
      ctx.moveTo(px, py);
      ctx.lineTo(opx, opy);
      ctx.stroke();
    });
  } else {
    // Standard telemetry sparks updating
    particles = particles.filter(p => p.opacity > 0.01);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
  }

  requestAnimationFrame(tickParticles);
}
requestAnimationFrame(tickParticles);

/* ==========================================================================
   CO-OP DYNAMIC BEZIER TETHER
   ========================================================================== */

const tetherSvg = document.getElementById('tether-svg');
const tetherCurve = document.getElementById('tether-curve');

function updateCoopTether() {
  const partnerCard = document.getElementById('partner-user-card');
  
  // Don't draw if partner card is hidden
  if (partnerCard.classList.contains('hidden') || !userData?.coopPartnerId) {
    tetherSvg.style.display = 'none';
    return;
  }
  
  tetherSvg.style.display = 'block';

  // Anchor points on elements
  const mainRect = mainCard.getBoundingClientRect();
  const partnerRect = partnerCard.getBoundingClientRect();

  // Coordinates matching absolute window dimensions
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Link from middle bottom of main card to middle left of partner card
  const x1 = mainRect.left + mainRect.width / 2 + scrollX;
  const y1 = mainRect.bottom + scrollY;

  const x2 = partnerRect.left + scrollX;
  const y2 = partnerRect.top + partnerRect.height / 2 + scrollY;

  // Calculate smooth control coordinates for S-Curve
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  const cx1 = x1 + dx * 0.1;
  const cy1 = y1 + dy * 0.8;
  const cx2 = x1 + dx * 0.5;
  const cy2 = y2;

  // Render SVG cubic Bezier curve path
  tetherCurve.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
}

// Update tether curve positions on layout transitions
window.addEventListener('resize', updateCoopTether);
window.addEventListener('scroll', updateCoopTether);
// Continuously update during animation frame ticks so 3D tilt adjustments map seamlessly
function renderLoop() {
  updateCoopTether();
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);

/* ==========================================================================
   GAMIFICATION STATE ANIMATIONS: SHATTER, badge COIN, SMOKE
   ========================================================================== */

// 1. Shield Shatter Particle generator
function triggerShieldShatterAnimation() {
  const container = document.getElementById('streak-shatter-container');
  container.innerHTML = ''; // clean old elements

  const rect = container.getBoundingClientRect();
  const shardsCount = 18;

  playShieldShatterSFX();
  triggerHaptics([80, 50, 150]);

  for (let i = 0; i < shardsCount; i++) {
    const shard = document.createElement('div');
    shard.className = 'shatter-shard';
    
    // Distribute shards centered inside block
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    shard.style.left = `${cx + (Math.random() - 0.5) * 40}px`;
    shard.style.top = `${cy + (Math.random() - 0.5) * 40}px`;

    // Size variations
    const size = Math.random() * 8 + 4;
    shard.style.width = `${size}px`;
    shard.style.height = `${size}px`;

    // Direction variables read by CSS keyframes
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 120 + 60;
    const tx = `${Math.cos(angle) * dist}px`;
    const ty = `${Math.sin(angle) * dist}px`;
    const rot = `${Math.random() * 720 - 360}deg`;

    shard.style.setProperty('--tx', tx);
    shard.style.setProperty('--ty', ty);
    shard.style.setProperty('--rot', rot);

    container.appendChild(shard);

    // Apply animation trigger class
    setTimeout(() => {
      shard.classList.add('shatter-trigger');
    }, 10);
  }

  logToConsole('⚠️ STREAK SHIELD CONSUMED! Streak preserved.', 'error');
}

// 2. Power hour animated steam puffs generator
let steamInterval = null;
function toggleSteamGenerator(active) {
  const container = document.getElementById('steam-container');
  if (steamInterval) clearInterval(steamInterval);

  if (!active) {
    container.innerHTML = '';
    return;
  }

  steamInterval = setInterval(() => {
    const puff = document.createElement('div');
    puff.className = 'steam-puff';
    
    // Spawn across top boundary
    puff.style.left = `${Math.random() * 100}%`;
    puff.style.bottom = '0';
    puff.style.animationDuration = `${Math.random() * 1.5 + 1.5}s`;
    puff.style.width = `${Math.random() * 6 + 4}px`;
    puff.style.height = puff.style.width;

    container.appendChild(puff);

    // Prune spent puffs
    setTimeout(() => {
      puff.remove();
    }, 3000);
  }, 180);
}

/* ==========================================================================
   MILESTONE BURSTS SHOWCASE
   ========================================================================== */

// 1. 7-Day Antigravity Confetti Burst
function trigger7DayMilestone() {
  playPlasmaSnapSFX();
  triggerHaptics([100, 40, 100]);

  logToConsole('🌌 7-DAY MILESTONE! Floating gravity sequence activated.', 'success');

  // Trigger floating CSS on card elements
  const elements = [
    document.querySelector('.username'),
    document.querySelector('.streak-number'),
    document.querySelector('.badges-showcase'),
    document.querySelector('.xp-progress-section')
  ];

  elements.forEach(el => {
    if (el) el.classList.add('antigravity-float');
  });

  // Confetti particles spawning in canvas
  const colors = ['#6c63ff', '#00f5ff', '#ff007f', '#ffd700', '#00ff00'];
  for (let i = 0; i < 60; i++) {
    const p = new Particle(
      canvas.width * Math.random(),
      canvas.height + 20,
      'spark',
      colors[Math.floor(Math.random() * colors.length)]
    );
    // Overwrite speeds to drift upwards
    p.vy = -(Math.random() * 5 + 4);
    p.vx = (Math.random() - 0.5) * 3;
    p.gravity = -0.05; // upwards pull
    p.decay = 0.008;
    particles.push(p);
  }

  // Restore gravity after 6 seconds
  setTimeout(() => {
    elements.forEach(el => {
      if (el) el.classList.remove('antigravity-float');
    });
    logToConsole('Gravity engines normalized.', 'system');
  }, 6000);
}

// 2. 30-Day Warp Speed Burst
function trigger30DayMilestone() {
  playWarpZoomSFX();
  triggerHaptics([60, 40, 60, 40, 200]);

  logToConsole('🚀 30-DAY WARP SPEED MILESTONE! Warp hyperdrive engaged.', 'success');

  // Trigger screen flash overlay
  const flash = document.getElementById('screen-flash');
  flash.style.opacity = '1.0';
  flash.style.transition = 'none';

  setTimeout(() => {
    flash.style.transition = 'opacity 1.5s ease';
    flash.style.opacity = '0';
  }, 50);

  // Set warp speed active state
  isWarpSpeed = true;
  document.querySelector('.dashboard-container').style.filter = 'blur(1px)';

  // Return to normal after 3 seconds
  setTimeout(() => {
    isWarpSpeed = false;
    document.querySelector('.dashboard-container').style.filter = 'none';
    logToConsole('Warp hyperdrive disengaged.', 'system');
  }, 3000);
}

/* ==========================================================================
   API DATA LINKING & BACKEND CONNECTIONS
   ========================================================================== */

// Log lines formatter
function logToConsole(message, type = 'system') {
  const windowEl = document.getElementById('system-logs');
  const line = document.createElement('div');
  line.className = `log-line ${type}`;
  line.innerText = `[${new Date().toLocaleTimeString()}] ${message}`;
  windowEl.appendChild(line);
  windowEl.scrollTop = windowEl.scrollHeight;
}

// Check database/mock user states on boot
async function bootstrapDashboard() {
  logToConsole('Connecting to API gateway...', 'system');
  
  try {
    // Fetch stats using empty ID first (which will fall back to first seeded user)
    let res = await fetch('/api/users/default/dashboard');
    if (!res.ok) {
      // Seed first if fetch fails or user is empty
      logToConsole('Dashboard empty. Seeding system profiles...', 'system');
      await seedDatabase();
    } else {
      const data = await res.json();
      if (!data.user) {
        await seedDatabase();
      } else {
        activeUserId = data.user._id;
        updateDashboardUI(data);
        logToConsole(`Fetched dashboard telemetry for ${data.user.username}.`, 'success');
      }
    }
  } catch (error) {
    console.error(error);
    logToConsole('API Gateway fetch failed. Running in offline mock data schema.', 'error');
    // Fall back to seed anyway (will fall back to in-memory seed)
    await seedDatabase();
  }
}

// Trigger backend re-seed
async function seedDatabase() {
  try {
    logToConsole('Requesting backend seeding...', 'system');
    const res = await fetch('/api/seed', { method: 'POST' });
    const data = await res.json();
    
    // Grab first user's ID
    const userA = data.users[0];
    activeUserId = userA._id;
    
    logToConsole('Database seeded successfully!', 'success');
    
    // Refresh UI
    const dashboardRes = await fetch(`/api/users/${activeUserId}/dashboard`);
    const dashboardData = await dashboardRes.json();
    updateDashboardUI(dashboardData);
  } catch (e) {
    logToConsole('Database seeding failed: ' + e.message, 'error');
  }
}

// Bind UI controls to values
function updateDashboardUI(data) {
  userData = data.user;
  partnerData = data.partner;

  // 1. Text elements
  document.getElementById('txt-username').innerText = userData.username;
  document.getElementById('txt-user-level').innerText = userData.level;
  document.getElementById('txt-current-streak').innerText = userData.currentStreak;
  document.getElementById('txt-longest-streak').innerText = userData.longestStreak;
  
  // Calculate level progress caps (1000 XP linear level caps)
  const baseXPForCurrentLevel = (userData.level - 1) * 1000;
  const relativeXP = userData.currentXP - baseXPForCurrentLevel;
  document.getElementById('txt-xp-ratio').innerText = `${relativeXP} / 1000`;
  
  const xpPercent = Math.min(Math.max((relativeXP / 1000) * 100, 0), 100);
  document.getElementById('bar-xp-progress').style.width = `${xpPercent}%`;

  // 2. Theme settings
  if (userData.themePreference) {
    switchTheme(userData.themePreference, false);
  }

  // 3. Power hour features
  const pTag = document.getElementById('tag-power-hour');
  const simPowerHourChk = document.getElementById('sim-power-hour');
  if (userData.isPowerHour) {
    pTag.classList.remove('hidden');
    simPowerHourChk.checked = true;
    toggleSteamGenerator(true);
  } else {
    pTag.classList.add('hidden');
    simPowerHourChk.checked = false;
    toggleSteamGenerator(false);
  }

  // 4. Badges rendering
  const bGrid = document.getElementById('badge-grid');
  bGrid.innerHTML = '';
  document.getElementById('txt-badge-count').innerText = `${userData.badges.length} Badges`;
  
  userData.badges.forEach(b => {
    const badgeEl = document.createElement('div');
    badgeEl.className = `badge-card ${b.isHolographic ? 'holographic' : ''}`;
    badgeEl.setAttribute('title', `${b.name} ${b.isHolographic ? '(Holographic Coin)' : '(Standard Badge)'}`);
    
    const inner = document.createElement('span');
    inner.className = 'badge-inner';
    inner.innerText = b.icon;
    
    badgeEl.appendChild(inner);
    bGrid.appendChild(badgeEl);
  });

  // 5. Shields display
  const shieldsWrapper = document.getElementById('shield-indicators-wrapper');
  shieldsWrapper.innerHTML = '';
  
  // Total 3 possible shields (standard system display slots)
  const totalShieldSlots = 3;
  for (let i = 0; i < totalShieldSlots; i++) {
    const slot = document.createElement('div');
    slot.className = 'shield-slot';
    if (i < userData.streakShields) {
      slot.classList.add('active');
      slot.innerHTML = '🛡️';
    } else {
      slot.innerHTML = '⚙️';
    }
    shieldsWrapper.appendChild(slot);
  }

  // 6. Partner UI update
  const partnerCard = document.getElementById('partner-user-card');
  if (partnerData) {
    partnerCard.classList.remove('hidden');
    document.getElementById('txt-partner-username').innerText = partnerData.username;
    document.getElementById('txt-partner-level').innerText = partnerData.level;
    document.getElementById('txt-partner-streak').innerText = partnerData.currentStreak;

    // Check if partner's streak is broken (last active date is > 1 day ago)
    const statusTag = document.getElementById('partner-status-tag');
    const now = new Date();
    const isBroken = partnerData.lastActiveDate ? (Math.floor(Math.abs(now.setHours(0,0,0,0) - new Date(partnerData.lastActiveDate).setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)) > 1) : true;

    if (isBroken) {
      statusTag.innerText = 'BROKEN';
      statusTag.className = 'partner-status broken';
    } else {
      statusTag.innerText = 'ACTIVE';
      statusTag.className = 'partner-status';
    }
  } else {
    partnerCard.classList.add('hidden');
  }

  // 7. Update Tether positions
  setTimeout(updateCoopTether, 100);
}

// Theme switcher application logic
function switchTheme(themeName, syncWithBackend = true) {
  document.body.className = `theme-${themeName}`;
  currentTheme = themeName;

  // Toggle active button status
  document.querySelectorAll('.theme-btn').forEach(btn => {
    if (btn.getAttribute('data-theme') === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (syncWithBackend && activeUserId) {
    fetch(`/api/users/${activeUserId}/theme`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: themeName })
    })
    .then(res => res.json())
    .then(data => {
      logToConsole(`Theme preference saved: ${themeName}`, 'system');
    })
    .catch(e => console.error('Error saving theme preference:', e));
  }
}

// Add click listeners to switcher buttons
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const selectedTheme = e.target.getAttribute('data-theme');
    switchTheme(selectedTheme, true);
  });
});

/* ==========================================================================
   BUTTON CLICK HANDLERS & SIMULATION CONTROLLERS
   ========================================================================== */

// 1. Perform Log Activity Endpoint
document.getElementById('btn-perform-activity').addEventListener('click', async () => {
  if (!activeUserId) return;

  logToConsole('Registering activity...', 'system');
  try {
    const res = await fetch(`/api/users/${activeUserId}/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ xpAmount: 100 })
    });
    const data = await res.json();

    logToConsole(`Activity saved! Added +${data.addedXP} XP.`, 'success');
    
    // Check level up
    if (data.leveledUp) {
      logToConsole(`👑 LEVEL UP! You reached Level ${data.user.level}!`, 'success');
      triggerHaptics([100, 100, 100, 100]);
    }

    // Check animations
    if (data.shieldShattered) {
      triggerShieldShatterAnimation();
    }

    // Trigger milestone flashes dynamically based on new streak
    if (data.user.currentStreak === 7) {
      trigger7DayMilestone();
    } else if (data.user.currentStreak === 30) {
      trigger30DayMilestone();
    }

    updateDashboardUI(data);

  } catch (error) {
    logToConsole('Activity registration failed: ' + error.message, 'error');
  }
});

// 2. Revive partner endpoint
document.getElementById('btn-revive-partner').addEventListener('click', async () => {
  if (!activeUserId) return;

  logToConsole('Requesting partner revival...', 'system');
  try {
    const res = await fetch(`/api/users/${activeUserId}/spend-xp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await res.json();
    if (!res.ok) {
      logToConsole(data.message, 'error');
      return;
    }

    logToConsole(data.message, 'success');
    triggerHaptics([200, 100, 200]);
    
    // Play sweep
    playPlasmaSnapSFX();
    
    updateDashboardUI(data);

  } catch (error) {
    logToConsole('Revival error: ' + error.message, 'error');
  }
});

// 3. Simulate Missed Day (Updates last active date to 3 days ago, triggers activity log)
document.getElementById('btn-sim-miss').addEventListener('click', async () => {
  if (!activeUserId) return;

  logToConsole('Simulating missed calendar day...', 'system');
  try {
    // 1. Force state on backend to missed
    await fetch(`/api/users/${activeUserId}/toggle-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field: 'lastActiveDate', value: 'missed' })
    });

    // 2. Run activity to verify shield deduction or reset
    logToConsole('Running activity check post-miss...', 'system');
    const res = await fetch(`/api/users/${activeUserId}/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ xpAmount: 100 })
    });
    const data = await res.json();

    if (data.shieldShattered) {
      triggerShieldShatterAnimation();
    } else if (data.streakWasReset) {
      logToConsole('💔 Streak reset! No shields remaining.', 'error');
      triggerHaptics([300]);
    }

    updateDashboardUI(data);

  } catch (error) {
    logToConsole('Miss simulation error: ' + error.message, 'error');
  }
});

// 4. Toggle Power Hour checkbox
document.getElementById('sim-power-hour').addEventListener('change', async (e) => {
  if (!activeUserId) return;

  const value = e.target.checked;
  logToConsole(`Setting Power Hour status: ${value}`, 'system');
  try {
    const res = await fetch(`/api/users/${activeUserId}/toggle-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field: 'isPowerHour', value })
    });
    const data = await res.json();
    
    // Update dashboard UI
    bootstrapDashboard();
  } catch (error) {
    logToConsole('Power Hour toggle error: ' + error.message, 'error');
  }
});

// 5. Toggle Danger State checkbox (Mocked locally for UI display)
document.getElementById('sim-danger-state').addEventListener('change', (e) => {
  const isDanger = e.target.checked;
  const card = document.getElementById('main-user-card');

  if (isDanger) {
    card.classList.add('danger');
    logToConsole('🚨 Danger State Activated! &lt; 2 Hours left to preserve streak.', 'error');
    // Low rumble sound frequency shift
    if (isAudioActive && spaceHumFilter) {
      spaceHumFilter.frequency.setValueAtTime(100, audioCtx.currentTime);
      spaceHumFilter.Q.setValueAtTime(8, audioCtx.currentTime); // high resonance pulse
    }
  } else {
    card.classList.remove('danger');
    logToConsole('Danger State deactivated.', 'system');
    if (isAudioActive && spaceHumFilter) {
      spaceHumFilter.frequency.setValueAtTime(180, audioCtx.currentTime);
      spaceHumFilter.Q.setValueAtTime(1.5, audioCtx.currentTime);
    }
  }
});

// 6. Milestone Bursts
document.getElementById('btn-burst-7').addEventListener('click', trigger7DayMilestone);
document.getElementById('btn-burst-30').addEventListener('click', trigger30DayMilestone);

// 7. Seed Database Reset
document.getElementById('btn-seed-db').addEventListener('click', seedDatabase);
