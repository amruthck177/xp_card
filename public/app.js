/* ==========================================================================
   XP & STREAK CARD SYSTEM v2.0 - CORE ENGINE
   Features:
   - Web Audio Modular Synthesis & Live Oscilloscope
   - Socket.io Real-Time Multiplayer Tether Shockwaves & Boss Raids
   - 3D Tilt Parallax & Mobile Gyroscope Accelerometer
   - Particle Physics Canvas & Hyperdrive Warp Engine
   - 60-Day Activity Heatmap Matrix
   - Daily Quests & Challenges Engine
   - Co-Op Raid Boss Arena ("Chronos the Streak Devourer")
   - Cosmetic Vault & Animated Frames Customizer
   - Tiered Global Leaderboards & 1-Click Card PNG Exporter
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
let masterDroneGain = null;
let audioAnalyser = null;
let isAudioActive = false;
let currentWaveform = 'sine';

// Real-Time Socket.io Connection
let socket = null;

/* ==========================================================================
   INITIALIZATION & AUTOPLAY BYPASS
   ========================================================================== */

document.getElementById('btn-init-system').addEventListener('click', async () => {
  try {
    // 1. Initialize Web Audio API
    initAudioEngine();
    
    // 2. Perform Haptic Trigger test
    triggerHaptics([80]);

    // 3. Initialize Real-Time WebSockets
    initSocketEngine();

    // 4. Hide activation overlay
    const overlay = document.getElementById('audio-bypass-overlay');
    overlay.classList.add('fade-out');

    logToConsole('Quantum Core activated: Audio Synth, Sockets, and Physics online.', 'success');

    // 5. Kick off dashboard bootstrap
    await bootstrapDashboard();

    // 6. Setup mobile gyroscope
    initGyroscope();

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
   SOCKET.IO REAL-TIME MULTIPLAYER SYNCHRONIZATION
   ========================================================================== */

function initSocketEngine() {
  try {
    if (typeof io !== 'undefined') {
      socket = io();

      socket.on('connect', () => {
        logToConsole(`[SOCKET] Connected to telemetry mesh (ID: ${socket.id.slice(0,6)}...)`, 'system');
      });

      // Listen for partner tether shockwaves
      socket.on('tether_pulse', (data) => {
        logToConsole(`⚡ Shockwave received from ${data.sender}! Added +${data.addedXP} XP.`, 'success');
        triggerTetherShockwave();
        triggerHaptics([60, 40, 60]);
      });

      // Listen for raid boss damage across all clients
      socket.on('boss_damaged', (data) => {
        logToConsole(`⚔️ Boss attacked by ${data.attacker}! Dealt -${data.damage} damage.`, 'system');
        updateBossUI(data.currentHp, data.maxHp);
        spawnFloatingDamage(data.damage);
      });

      // Listen for partner cheers
      socket.on('partner_high_five', (data) => {
        logToConsole(`🙌 High-Five received from partner! Streak synergy boosted!`, 'success');
        playChimeSFX();
        triggerHaptics([80, 50, 120]);
        triggerPartnerCardGlow();
      });
    }
  } catch (err) {
    console.warn('Socket.io connection initialization skipped:', err);
  }
}

// Visual shockwave along SVG tether
function triggerTetherShockwave() {
  const tetherCurve = document.getElementById('tether-curve');
  if (!tetherCurve) return;

  tetherCurve.style.stroke = '#ffffff';
  tetherCurve.style.strokeWidth = '8';
  tetherCurve.style.filter = 'drop-shadow(0 0 15px #00f5ff)';

  setTimeout(() => {
    tetherCurve.style.stroke = 'url(#tether-gradient)';
    tetherCurve.style.strokeWidth = '4';
    tetherCurve.style.filter = 'url(#tether-glow)';
  }, 600);
}

function triggerPartnerCardGlow() {
  const pCard = document.getElementById('partner-user-card');
  if (!pCard) return;
  pCard.style.boxShadow = '0 0 35px #00ff88, inset 0 0 20px #00ff88';
  setTimeout(() => {
    pCard.style.boxShadow = '';
  }, 1000);
}

/* ==========================================================================
   WEB AUDIO SYNTHESIZER & OSCILLOSCOPE ENGINE
   ========================================================================== */

function initAudioEngine() {
  if (isAudioActive) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContextClass();
  
  // Analyser node for oscilloscope
  audioAnalyser = audioCtx.createAnalyser();
  audioAnalyser.fftSize = 256;

  // Master drone gain
  masterDroneGain = audioCtx.createGain();
  masterDroneGain.gain.setValueAtTime(0.65, audioCtx.currentTime);

  // Node 1: Space Hum
  spaceHumOsc = audioCtx.createOscillator();
  spaceHumOsc.type = currentWaveform;
  spaceHumOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
  
  // Node 2: Space Resonance
  spaceResonanceOsc = audioCtx.createOscillator();
  spaceResonanceOsc.type = 'sine';
  spaceResonanceOsc.frequency.setValueAtTime(110, audioCtx.currentTime); // A2 note

  // Biquad Filter (Lowpass)
  spaceHumFilter = audioCtx.createBiquadFilter();
  spaceHumFilter.type = 'lowpass';
  spaceHumFilter.frequency.setValueAtTime(350, audioCtx.currentTime);
  spaceHumFilter.Q.setValueAtTime(4.0, audioCtx.currentTime);

  // Individual Gain nodes
  spaceHumGain = audioCtx.createGain();
  spaceHumGain.gain.setValueAtTime(0.06, audioCtx.currentTime);

  spaceResonanceGain = audioCtx.createGain();
  spaceResonanceGain.gain.setValueAtTime(0.015, audioCtx.currentTime);

  // Connect routing
  spaceHumOsc.connect(spaceHumFilter);
  spaceResonanceOsc.connect(spaceHumFilter);
  spaceHumFilter.connect(spaceHumGain);
  spaceHumFilter.connect(spaceResonanceGain);
  
  spaceHumGain.connect(masterDroneGain);
  spaceResonanceGain.connect(masterDroneGain);

  masterDroneGain.connect(audioAnalyser);
  audioAnalyser.connect(audioCtx.destination);

  spaceHumOsc.start(0);
  spaceResonanceOsc.start(0);
  
  isAudioActive = true;

  // Start oscilloscope render loop
  requestAnimationFrame(drawOscilloscope);
}

// Draw live waveform on synth studio oscilloscope canvas
function drawOscilloscope() {
  const scopeCanvas = document.getElementById('synth-scope-canvas');
  if (scopeCanvas && audioAnalyser && isAudioActive) {
    const sCtx = scopeCanvas.getContext('2d');
    const bufferLength = audioAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    audioAnalyser.getByteTimeDomainData(dataArray);

    sCtx.fillStyle = '#030308';
    sCtx.fillRect(0, 0, scopeCanvas.width, scopeCanvas.height);

    sCtx.lineWidth = 2;
    sCtx.strokeStyle = currentTheme === 'cyberpunk' ? '#00ff88' : '#00f5ff';
    sCtx.shadowBlur = 8;
    sCtx.shadowColor = sCtx.strokeStyle;
    sCtx.beginPath();

    const sliceWidth = (scopeCanvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * scopeCanvas.height) / 2;

      if (i === 0) {
        sCtx.moveTo(x, y);
      } else {
        sCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    sCtx.lineTo(scopeCanvas.width, scopeCanvas.height / 2);
    sCtx.stroke();
  }
  requestAnimationFrame(drawOscilloscope);
}

// Modulate frequency/filter based on card hover tilt or phone gyroscope
function updateSpaceHum(tiltMagnitude) {
  if (!isAudioActive || !audioCtx || !spaceHumOsc) return;
  
  const mag = Math.min(Math.max(tiltMagnitude, 0), 1.5);
  
  const humFreq = 55 + (mag * 25);
  spaceHumOsc.frequency.setTargetAtTime(humFreq, audioCtx.currentTime, 0.1);
  
  const resonanceFreq = 110 + (mag * 50);
  spaceResonanceOsc.frequency.setTargetAtTime(resonanceFreq, audioCtx.currentTime, 0.15);

  const baseCutoff = parseFloat(document.getElementById('slider-filter-cutoff')?.value || 350);
  const filterCutoff = baseCutoff + (mag * 350);
  spaceHumFilter.frequency.setTargetAtTime(filterCutoff, audioCtx.currentTime, 0.08);
}

// Synthesizer Harmonic Chord (Test Button)
function playHarmonicChordSFX() {
  if (!isAudioActive || !audioCtx) return;

  const notes = [220, 277.18, 329.63]; // A3, C#4, E4 (Major Triad)
  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = currentWaveform;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2 + idx * 0.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime + idx * 0.08);
    osc.stop(audioCtx.currentTime + 1.5 + idx * 0.2);
  });
}

// Chime SFX for cheers and quest claim
function playChimeSFX() {
  if (!isAudioActive || !audioCtx) return;
  const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  chimeNotes.forEach((f, i) => {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime + i * 0.07);
    g.gain.setValueAtTime(0.1, audioCtx.currentTime + i * 0.07);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.07 + 0.6);
    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + i * 0.07);
    osc.stop(audioCtx.currentTime + i * 0.07 + 0.7);
  });
}

// Plasma Snap SFX
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

// Warp Speed Zoom SFX
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

  const bufferSize = audioCtx.sampleRate * 0.4;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

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

  noiseNode.start(0);
  noiseNode.stop(audioCtx.currentTime + 0.35);
}

/* ==========================================================================
   HAPTICS MANAGER & MOBILE GYROSCOPE
   ========================================================================== */

function triggerHaptics(pattern) {
  if (navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      console.warn('Vibration not supported on this device.', e);
    }
  }
}

function initGyroscope() {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (event) => {
      if (event.gamma === null || event.beta === null) return;
      
      const dx = Math.min(Math.max(event.gamma / 30, -1), 1);
      const dy = Math.min(Math.max((event.beta - 45) / 30, -1), 1);
      
      const rotX = -(dy * 12).toFixed(2);
      const rotY = (dx * 12).toFixed(2);

      mainCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, 0, 10px)`;
      const dist = Math.sqrt(dx*dx + dy*dy);
      updateSpaceHum(dist);
    });
  }
}

/* ==========================================================================
   3D TILT PHYSICS & PARALLAX MATH (DESKTOP CURSOR)
   ========================================================================== */

const mainCard = document.getElementById('main-user-card');

mainCard.addEventListener('mousemove', (e) => {
  const rect = mainCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const w = rect.width;
  const h = rect.height;

  const dx = (x - w/2) / (w/2);
  const dy = (y - h/2) / (h/2);

  const rotX = -(dy * 12).toFixed(2);
  const rotY = (dx * 12).toFixed(2);

  const zTranslation = mainCard.classList.contains('danger') ? -25 : 10;
  mainCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, 0, ${zTranslation}px)`;

  mainCard.style.setProperty('--glare-x', `${(x / w) * 100}%`);
  mainCard.style.setProperty('--glare-y', `${(y / h) * 100}%`);
  mainCard.style.setProperty('--shift-x', `${dx * -20}`);
  mainCard.style.setProperty('--shift-y', `${dy * -20}`);

  const distance = Math.sqrt(dx*dx + dy*dy);
  updateSpaceHum(distance);
});

mainCard.addEventListener('mouseleave', () => {
  mainCard.style.transform = `rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0px)`;
  mainCard.style.setProperty('--shift-x', '0');
  mainCard.style.setProperty('--shift-y', '0');
  updateSpaceHum(0);
});

/* ==========================================================================
   PARTICLE CANVAS ANIMATIONS
   ========================================================================== */

class Particle {
  constructor(x, y, type, color) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;
    
    if (type === 'spark') {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 2 + 1.5;
      this.decay = Math.random() * 0.03 + 0.015;
      this.gravity = 0.05;
    } else {
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 12 + 6;
      this.decay = Math.random() * 0.01 + 0.005;
      this.gravity = -0.01;
    }
    this.opacity = 1.0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.opacity -= this.decay;
    if (this.type === 'mist') this.size += 0.1;
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
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  
  const now = Date.now();
  const dt = now - lastMouseMoveTime;
  if (dt > 1) {
    const dx = mouse.x - mouse.lastX;
    const dy = mouse.y - mouse.lastY;
    mouse.speed = Math.sqrt(dx*dx + dy*dy) / dt;
  }
  
  mouse.lastX = mouse.x;
  mouse.lastY = mouse.y;
  lastMouseMoveTime = now;

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
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouse.x, mouse.y, 'spark', color));
      }
    } else if (mouse.speed > 0.05) {
      if (Math.random() < 0.3) {
        particles.push(new Particle(mouse.x, mouse.y, 'mist', color));
      }
    }
  }
});

function tickParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isWarpSpeed) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    ctx.lineWidth = 2;
    
    warpStars.forEach(star => {
      star.z -= 12;
      if (star.z <= 0) {
        star.z = canvas.width;
        star.x = (Math.random() - 0.5) * canvas.width;
        star.y = (Math.random() - 0.5) * canvas.height;
      }
      
      const k = 220 / star.z;
      const px = star.x * k + cx;
      const py = star.y * k + cy;
      
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
   CO-OP DYNAMIC SVG TETHER
   ========================================================================== */

const tetherSvg = document.getElementById('tether-svg');
const tetherCurve = document.getElementById('tether-curve');

function updateCoopTether() {
  const partnerCard = document.getElementById('partner-user-card');
  if (!partnerCard || partnerCard.classList.contains('hidden') || !userData?.coopPartnerId) {
    if (tetherSvg) tetherSvg.style.display = 'none';
    return;
  }
  
  tetherSvg.style.display = 'block';

  const mainRect = mainCard.getBoundingClientRect();
  const partnerRect = partnerCard.getBoundingClientRect();

  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const x1 = mainRect.left + mainRect.width / 2 + scrollX;
  const y1 = mainRect.bottom + scrollY;

  const x2 = partnerRect.left + scrollX;
  const y2 = partnerRect.top + partnerRect.height / 2 + scrollY;

  const dx = x2 - x1;
  const dy = y2 - y1;
  
  const cx1 = x1 + dx * 0.1;
  const cy1 = y1 + dy * 0.8;
  const cx2 = x1 + dx * 0.5;
  const cy2 = y2;

  tetherCurve.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
}

window.addEventListener('resize', updateCoopTether);
window.addEventListener('scroll', updateCoopTether);
function renderLoop() {
  updateCoopTether();
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);

/* ==========================================================================
   SHATTER & STEAM ANIMATIONS
   ========================================================================== */

function triggerShieldShatterAnimation() {
  const container = document.getElementById('streak-shatter-container');
  container.innerHTML = '';

  const rect = container.getBoundingClientRect();
  const shardsCount = 18;

  playShieldShatterSFX();
  triggerHaptics([80, 50, 150]);

  for (let i = 0; i < shardsCount; i++) {
    const shard = document.createElement('div');
    shard.className = 'shatter-shard';
    
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    shard.style.left = `${cx + (Math.random() - 0.5) * 40}px`;
    shard.style.top = `${cy + (Math.random() - 0.5) * 40}px`;

    const size = Math.random() * 8 + 4;
    shard.style.width = `${size}px`;
    shard.style.height = `${size}px`;

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 120 + 60;
    const tx = `${Math.cos(angle) * dist}px`;
    const ty = `${Math.sin(angle) * dist}px`;
    const rot = `${Math.random() * 720 - 360}deg`;

    shard.style.setProperty('--tx', tx);
    shard.style.setProperty('--ty', ty);
    shard.style.setProperty('--rot', rot);

    container.appendChild(shard);

    setTimeout(() => {
      shard.classList.add('shatter-trigger');
    }, 10);
  }

  logToConsole('⚠️ STREAK SHIELD CONSUMED! Streak preserved.', 'error');
}

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
    puff.style.left = `${Math.random() * 100}%`;
    puff.style.bottom = '0';
    puff.style.animationDuration = `${Math.random() * 1.5 + 1.5}s`;
    puff.style.width = `${Math.random() * 6 + 4}px`;
    puff.style.height = puff.style.width;

    container.appendChild(puff);

    setTimeout(() => {
      puff.remove();
    }, 3000);
  }, 180);
}

/* ==========================================================================
   MILESTONE BURSTS SHOWCASE
   ========================================================================== */

function trigger7DayMilestone() {
  playPlasmaSnapSFX();
  triggerHaptics([100, 40, 100]);
  logToConsole('🌌 7-DAY MILESTONE! Floating gravity sequence activated.', 'success');

  const elements = [
    document.querySelector('.username'),
    document.querySelector('.streak-number'),
    document.querySelector('.badges-showcase'),
    document.querySelector('.xp-progress-section')
  ];

  elements.forEach(el => {
    if (el) el.classList.add('antigravity-float');
  });

  const colors = ['#6c63ff', '#00f5ff', '#ff007f', '#ffd700', '#00ff88'];
  for (let i = 0; i < 60; i++) {
    const p = new Particle(
      canvas.width * Math.random(),
      canvas.height + 20,
      'spark',
      colors[Math.floor(Math.random() * colors.length)]
    );
    p.vy = -(Math.random() * 5 + 4);
    p.vx = (Math.random() - 0.5) * 3;
    p.gravity = -0.05;
    p.decay = 0.008;
    particles.push(p);
  }

  setTimeout(() => {
    elements.forEach(el => {
      if (el) el.classList.remove('antigravity-float');
    });
    logToConsole('Gravity engines normalized.', 'system');
  }, 6000);
}

function trigger30DayMilestone() {
  playWarpZoomSFX();
  triggerHaptics([60, 40, 60, 40, 200]);
  logToConsole('🚀 30-DAY WARP SPEED MILESTONE! Warp hyperdrive engaged.', 'success');

  const flash = document.getElementById('screen-flash');
  flash.style.opacity = '1.0';
  flash.style.transition = 'none';

  setTimeout(() => {
    flash.style.transition = 'opacity 1.5s ease';
    flash.style.opacity = '0';
  }, 50);

  isWarpSpeed = true;
  document.querySelector('.dashboard-container').style.filter = 'blur(1px)';

  setTimeout(() => {
    isWarpSpeed = false;
    document.querySelector('.dashboard-container').style.filter = 'none';
    logToConsole('Warp hyperdrive disengaged.', 'system');
  }, 3000);
}

/* ==========================================================================
   API DATA LINKING & DASHBOARD BOOTSTRAP
   ========================================================================== */

function logToConsole(message, type = 'system') {
  const windowEl = document.getElementById('system-logs');
  if (!windowEl) return;
  const line = document.createElement('div');
  line.className = `log-line ${type}`;
  line.innerText = `[${new Date().toLocaleTimeString()}] ${message}`;
  windowEl.appendChild(line);
  windowEl.scrollTop = windowEl.scrollHeight;
}

async function bootstrapDashboard() {
  logToConsole('Connecting to API gateway...', 'system');
  
  try {
    let res = await fetch('/api/users/default/dashboard');
    if (!res.ok) {
      logToConsole('Seeding upgraded system profiles...', 'system');
      await seedDatabase();
    } else {
      const data = await res.json();
      if (!data.user) {
        await seedDatabase();
      } else {
        activeUserId = data.user._id;
        updateDashboardUI(data);
        logToConsole(`Fetched dashboard telemetry for ${data.user.username}.`, 'success');

        // Load upgraded modules
        loadAndRenderHeatmap();
        loadAndRenderQuests();
        loadAndRenderBoss();
      }
    }
  } catch (error) {
    console.error(error);
    logToConsole('API Gateway fetch failed. Seeding fallback profile...', 'error');
    await seedDatabase();
  }
}

async function seedDatabase() {
  try {
    logToConsole('Requesting backend database re-seed...', 'system');
    const res = await fetch('/api/seed', { method: 'POST' });
    const data = await res.json();
    
    const userA = data.users[0];
    activeUserId = userA._id;
    logToConsole('Database re-seeded successfully with Quantum upgrades!', 'success');
    
    const dashboardRes = await fetch(`/api/users/${activeUserId}/dashboard`);
    const dashboardData = await dashboardRes.json();
    updateDashboardUI(dashboardData);

    loadAndRenderHeatmap();
    loadAndRenderQuests();
    loadAndRenderBoss();
  } catch (e) {
    logToConsole('Database seeding failed: ' + e.message, 'error');
  }
}

function updateDashboardUI(data) {
  userData = data.user;
  partnerData = data.partner;

  // 1. User Header & Title
  document.getElementById('txt-username').innerText = userData.username;
  document.getElementById('txt-user-level').innerText = userData.level;
  document.getElementById('txt-current-streak').innerText = userData.currentStreak;
  document.getElementById('txt-longest-streak').innerText = userData.longestStreak;
  
  const titleEl = document.getElementById('txt-player-title');
  if (titleEl) titleEl.innerText = userData.playerTitle || 'Cyber Pioneer';

  // 2. Crystals Currency HUD
  const crystals = userData.crystals || 0;
  const crystalCountEl = document.getElementById('nav-crystal-count');
  if (crystalCountEl) crystalCountEl.innerText = crystals;
  const shopCrystalsEl = document.getElementById('shop-modal-crystals');
  if (shopCrystalsEl) shopCrystalsEl.innerText = crystals;

  // 3. Active Card Frame
  const cardEl = document.getElementById('main-user-card');
  const frameClasses = ['frame-electric', 'frame-magma', 'frame-quantum', 'frame-matrix'];
  frameClasses.forEach(c => cardEl.classList.remove(c));
  if (userData.activeFrame && userData.activeFrame !== 'default') {
    cardEl.classList.add(userData.activeFrame);
  }

  // 4. XP Level Progress
  const baseXPForCurrentLevel = (userData.level - 1) * 1000;
  const relativeXP = userData.currentXP - baseXPForCurrentLevel;
  document.getElementById('txt-xp-ratio').innerText = `${relativeXP} / 1000`;
  
  const xpPercent = Math.min(Math.max((relativeXP / 1000) * 100, 0), 100);
  document.getElementById('bar-xp-progress').style.width = `${xpPercent}%`;

  // 5. Streak Buffs HUD
  const buffMomentum = document.getElementById('buff-momentum');
  const buffHyperdrive = document.getElementById('buff-hyperdrive');
  const multBadge = document.getElementById('txt-multiplier-badge');

  if (userData.currentStreak >= 30) {
    if (buffHyperdrive) buffHyperdrive.classList.add('active');
    if (buffMomentum) buffMomentum.classList.add('active');
    if (multBadge) multBadge.innerText = '1.25x HYPER SPEED';
  } else if (userData.currentStreak >= 7) {
    if (buffMomentum) buffMomentum.classList.add('active');
    if (buffHyperdrive) buffHyperdrive.classList.remove('active');
    if (multBadge) multBadge.innerText = '1.1x MOMENTUM';
  } else {
    if (buffMomentum) buffMomentum.classList.remove('active');
    if (buffHyperdrive) buffHyperdrive.classList.remove('active');
    if (multBadge) multBadge.innerText = '1.0x SPEED';
  }

  // 6. Theme settings
  if (userData.themePreference) {
    switchTheme(userData.themePreference, false);
  }

  // 7. Power Hour state
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

  // 8. Badges rendering with 3D depth
  const bGrid = document.getElementById('badge-grid');
  bGrid.innerHTML = '';
  document.getElementById('txt-badge-count').innerText = `${userData.badges.length} Badges`;
  
  userData.badges.forEach(b => {
    const badgeEl = document.createElement('div');
    badgeEl.className = `badge-card badge-item ${b.isHolographic ? 'holographic' : ''}`;
    badgeEl.setAttribute('title', `${b.name} ${b.isHolographic ? '(Holographic Coin)' : '(Standard Badge)'}`);
    
    const inner = document.createElement('span');
    inner.className = 'badge-inner';
    inner.innerText = b.icon;
    
    badgeEl.appendChild(inner);
    bGrid.appendChild(badgeEl);
  });

  // 9. Shields tracker
  const shieldsWrapper = document.getElementById('shield-indicators-wrapper');
  shieldsWrapper.innerHTML = '';
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

  // 10. Partner UI update
  const partnerCard = document.getElementById('partner-user-card');
  if (partnerData) {
    partnerCard.classList.remove('hidden');
    document.getElementById('txt-partner-username').innerText = partnerData.username;
    document.getElementById('txt-partner-level').innerText = partnerData.level;
    document.getElementById('txt-partner-streak').innerText = partnerData.currentStreak;
    
    const pTitle = document.getElementById('txt-partner-title');
    if (pTitle) pTitle.innerText = partnerData.playerTitle || 'Co-Op Partner';

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

  setTimeout(updateCoopTether, 100);
}

// Theme switcher
function switchTheme(themeName, syncWithBackend = true) {
  document.body.className = `theme-${themeName}`;
  currentTheme = themeName;

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
    .catch(e => console.error('Error saving theme preference:', e));
  }
}

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const selectedTheme = e.target.getAttribute('data-theme');
    switchTheme(selectedTheme, true);
  });
});

/* ==========================================================================
   UPGRADE V2.0: 60-DAY ACTIVITY HEATMAP MATRIX
   ========================================================================== */

async function loadAndRenderHeatmap() {
  if (!activeUserId) return;
  try {
    const res = await fetch(`/api/users/${activeUserId}/heatmap`);
    const data = await res.json();
    const history = data.history || [];

    const grid = document.getElementById('heatmap-grid');
    const tooltip = document.getElementById('heatmap-tooltip');
    if (!grid) return;

    grid.innerHTML = '';

    history.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';

      // Assign intensity level
      let lvl = 0;
      if (day.xp >= 300) lvl = 4;
      else if (day.xp >= 200) lvl = 3;
      else if (day.xp >= 100) lvl = 2;
      else if (day.xp > 0) lvl = 1;

      cell.classList.add(`lvl-${lvl}`);

      cell.addEventListener('mouseenter', () => {
        tooltip.innerText = `📅 ${day.date} • ${day.xp} XP Earned • ${day.count} Activities`;
        tooltip.style.color = lvl > 0 ? 'var(--accent-secondary)' : 'var(--text-muted)';
      });

      grid.appendChild(cell);
    });
  } catch (err) {
    console.error('Failed to load activity heatmap:', err);
  }
}

/* ==========================================================================
   UPGRADE V2.0: DAILY QUESTS & CHALLENGES ENGINE
   ========================================================================== */

async function loadAndRenderQuests() {
  if (!activeUserId) return;
  try {
    const res = await fetch(`/api/users/${activeUserId}/quests`);
    const data = await res.json();
    const quests = data.quests || [];

    const listEl = document.getElementById('quests-list');
    if (!listEl) return;

    listEl.innerHTML = '';

    quests.forEach(quest => {
      const qItem = document.createElement('div');
      qItem.className = `quest-item ${quest.completed ? 'completed' : ''}`;

      const pct = Math.min(100, Math.floor((quest.progress / quest.target) * 100));

      let actionHtml = '';
      if (quest.claimed) {
        actionHtml = `<span class="quest-claimed-tag">✓ REWARD CLAIMED</span>`;
      } else if (quest.completed) {
        actionHtml = `<button class="quest-claim-btn" data-quest-id="${quest.id}">CLAIM +${quest.rewardCrystals} 💎</button>`;
      } else {
        actionHtml = `<span class="quest-ratio">${quest.progress} / ${quest.target}</span>`;
      }

      qItem.innerHTML = `
        <div class="quest-top">
          <span class="quest-name">${quest.title}</span>
          <div class="quest-reward-pills">
            <span class="reward-pill">+${quest.rewardXP} XP</span>
            <span class="reward-pill crystal">+${quest.rewardCrystals} 💎</span>
          </div>
        </div>
        <div class="quest-desc">${quest.description}</div>
        <div class="quest-progress-row">
          <div class="quest-track">
            <div class="quest-fill" style="width: ${pct}%;"></div>
          </div>
          ${actionHtml}
        </div>
      `;

      // Wire up claim button
      const claimBtn = qItem.querySelector('.quest-claim-btn');
      if (claimBtn) {
        claimBtn.addEventListener('click', async () => {
          claimQuestReward(quest.id);
        });
      }

      listEl.appendChild(qItem);
    });
  } catch (err) {
    console.error('Failed to load daily quests:', err);
  }
}

async function claimQuestReward(questId) {
  try {
    const res = await fetch(`/api/users/${activeUserId}/quests/${questId}/claim`, {
      method: 'POST'
    });
    const data = await res.json();
    if (!res.ok) {
      logToConsole(data.message, 'error');
      return;
    }

    logToConsole(`🎉 ${data.message}`, 'success');
    playChimeSFX();
    triggerHaptics([80, 50, 100]);

    // Refresh UI & Quests
    updateDashboardUI(data);
    loadAndRenderQuests();
  } catch (err) {
    logToConsole('Quest claim failed: ' + err.message, 'error');
  }
}

/* ==========================================================================
   UPGRADE V2.0: CO-OP RAID BOSS ARENA ("CHRONOS")
   ========================================================================== */

async function loadAndRenderBoss() {
  try {
    const res = await fetch('/api/boss');
    const data = await res.json();
    if (data.boss) {
      updateBossUI(data.boss.currentHp, data.boss.maxHp);
      const nameEl = document.getElementById('boss-name');
      const tierEl = document.getElementById('boss-tier');
      if (nameEl) nameEl.innerText = data.boss.name;
      if (tierEl) tierEl.innerText = data.boss.tier;
    }
  } catch (err) {
    console.error('Failed to load raid boss data:', err);
  }
}

function updateBossUI(currentHp, maxHp) {
  const ratioEl = document.getElementById('boss-hp-ratio');
  const fillEl = document.getElementById('boss-hp-fill');
  if (ratioEl) ratioEl.innerText = `${currentHp.toLocaleString()} / ${maxHp.toLocaleString()} HP`;
  if (fillEl) {
    const pct = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));
    fillEl.style.width = `${pct}%`;
  }
}

function spawnFloatingDamage(dmg) {
  const arena = document.querySelector('.boss-arena-card');
  if (!arena) return;

  const dmgEl = document.createElement('div');
  dmgEl.className = 'floating-damage';
  dmgEl.innerText = `-${dmg} HP`;

  const rect = arena.getBoundingClientRect();
  dmgEl.style.left = `${rect.width / 2 + (Math.random() - 0.5) * 80}px`;
  dmgEl.style.top = `40px`;

  arena.appendChild(dmgEl);

  setTimeout(() => dmgEl.remove(), 1000);
}

document.getElementById('btn-attack-boss').addEventListener('click', async () => {
  if (!activeUserId) return;

  try {
    const res = await fetch('/api/boss/attack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: activeUserId })
    });
    const data = await res.json();

    logToConsole(`⚔️ ${data.message} (+50 XP, +20 💎)`, 'success');
    playPlasmaSnapSFX();
    triggerHaptics([90, 40, 90]);

    if (data.bossDefeated) {
      logToConsole(`👑 CHRONOS DEFEATED! Earned ${data.boss.rewardBadge} and bonus Crystals!`, 'success');
      trigger30DayMilestone();
    }

    if (data.user) {
      updateDashboardUI({ user: data.user, partner: partnerData });
      loadAndRenderQuests();
    }

    updateBossUI(data.boss.currentHp, data.boss.maxHp);
    spawnFloatingDamage(data.damage);

  } catch (err) {
    logToConsole('Boss attack failed: ' + err.message, 'error');
  }
});

/* ==========================================================================
   UPGRADE V2.0: COSMETICS VAULT & REWARDS SHOP
   ========================================================================== */

async function loadAndRenderShop() {
  try {
    const res = await fetch('/api/shop/items');
    const data = await res.json();
    const items = data.items || [];

    const grid = document.getElementById('shop-items-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const unlocked = userData?.unlockedFrames || ['default'];
    const activeFrame = userData?.activeFrame || 'default';
    const activeTitle = userData?.playerTitle || '';

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'shop-card';

      let buttonHtml = '';
      if (item.category === 'frame') {
        if (activeFrame === item.id) {
          buttonHtml = `<button class="shop-btn equipped">EQUIPPED</button>`;
        } else if (unlocked.includes(item.id)) {
          buttonHtml = `<button class="shop-btn owned" data-equip-frame="${item.id}">EQUIP</button>`;
        } else {
          buttonHtml = `<button class="shop-btn" data-buy-item="${item.id}">UNLOCK</button>`;
        }
      } else if (item.category === 'title') {
        if (activeTitle === item.titleValue) {
          buttonHtml = `<button class="shop-btn equipped">EQUIPPED</button>`;
        } else {
          buttonHtml = `<button class="shop-btn" data-buy-item="${item.id}">APPLY TITLE</button>`;
        }
      } else {
        buttonHtml = `<button class="shop-btn" data-buy-item="${item.id}">BUY</button>`;
      }

      card.innerHTML = `
        <div>
          <div class="shop-item-icon">${item.icon}</div>
          <div class="shop-item-name">${item.name}</div>
          <div class="shop-item-desc">${item.description}</div>
        </div>
        <div class="shop-card-footer">
          <div class="shop-price">💎 ${item.cost}</div>
          ${buttonHtml}
        </div>
      `;

      // Wire buy/equip listeners
      const buyBtn = card.querySelector('[data-buy-item]');
      if (buyBtn) {
        buyBtn.addEventListener('click', () => buyShopItem(item.id));
      }

      const equipBtn = card.querySelector('[data-equip-frame]');
      if (equipBtn) {
        equipBtn.addEventListener('click', () => equipCardFrame(item.id));
      }

      grid.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load shop catalog:', err);
  }
}

async function buyShopItem(itemId) {
  if (!activeUserId) return;
  try {
    const res = await fetch('/api/shop/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: activeUserId, itemId })
    });
    const data = await res.json();
    if (!res.ok) {
      logToConsole(data.message, 'error');
      return;
    }

    logToConsole(`🛍️ ${data.message}`, 'success');
    playChimeSFX();
    triggerHaptics([70, 70, 100]);

    updateDashboardUI({ user: data.user, partner: partnerData });
    loadAndRenderShop();
  } catch (err) {
    logToConsole('Purchase failed: ' + err.message, 'error');
  }
}

async function equipCardFrame(frameId) {
  if (!activeUserId) return;
  try {
    const res = await fetch(`/api/users/${activeUserId}/customize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activeFrame: frameId })
    });
    const data = await res.json();
    logToConsole(`✨ Equipped ${frameId} frame!`, 'success');
    playPlasmaSnapSFX();

    updateDashboardUI({ user: data.user, partner: partnerData });
    loadAndRenderShop();
  } catch (err) {
    logToConsole('Equip failed: ' + err.message, 'error');
  }
}

/* ==========================================================================
   UPGRADE V2.0: TIERED GLOBAL LEADERBOARDS
   ========================================================================== */

let leaderboardCache = [];

async function loadAndRenderLeaderboard(tierFilter = 'all') {
  try {
    if (leaderboardCache.length === 0) {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      leaderboardCache = data.leaderboard || [];
    }

    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const filtered = tierFilter === 'all'
      ? leaderboardCache
      : leaderboardCache.filter(u => u.tier === tierFilter);

    filtered.forEach(entry => {
      const tr = document.createElement('tr');
      const rankBadge = entry.rank <= 3
        ? `<span class="rank-pill rank-${entry.rank}">${entry.rank}</span>`
        : `#${entry.rank}`;

      tr.innerHTML = `
        <td>${rankBadge}</td>
        <td>
          <strong>${entry.username}</strong>
          <div style="font-size: 0.65rem; color: var(--accent-secondary);">${entry.playerTitle}</div>
        </td>
        <td><span class="tier-badge ${entry.tier}">${entry.tier}</span></td>
        <td>LVL ${entry.level}</td>
        <td>🔥 ${entry.currentStreak}d</td>
        <td><strong>${entry.currentXP.toLocaleString()} XP</strong></td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Failed to load leaderboard:', err);
  }
}

// Leaderboard tab switcher
document.querySelectorAll('.tier-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    document.querySelectorAll('.tier-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    const tier = e.target.getAttribute('data-tier');
    loadAndRenderLeaderboard(tier);
  });
});

/* ==========================================================================
   UPGRADE V2.0: 1-CLICK HIGH-RES CARD IMAGE EXPORTER
   ========================================================================== */

document.getElementById('btn-export-card').addEventListener('click', async () => {
  const target = document.getElementById('main-user-card');
  if (!target) return;

  logToConsole('Generating high-resolution holographic card export...', 'system');
  playPlasmaSnapSFX();

  try {
    const originalTransform = target.style.transform;
    target.style.transform = 'none'; // Flatten 3D tilt for clean capture

    const canvasCapture = await html2canvas(target, {
      backgroundColor: null,
      scale: 2.5, // Retina sharpness
      useCORS: true
    });

    target.style.transform = originalTransform;

    const dataUrl = canvasCapture.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `StreakCard_${userData ? userData.username : 'Pioneer'}.png`;
    link.href = dataUrl;
    link.click();

    logToConsole('📸 Card snapshot exported and downloaded successfully!', 'success');
    triggerHaptics([80, 50, 100]);
  } catch (err) {
    console.error('Export failed:', err);
    logToConsole('Export error: ' + err.message, 'error');
  }
});

/* ==========================================================================
   UPGRADE V2.0: AUDIO SYNTHESIZER STUDIO CONTROLS
   ========================================================================== */

document.querySelectorAll('.wave-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.wave-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentWaveform = e.target.getAttribute('data-wave');
    if (spaceHumOsc) spaceHumOsc.type = currentWaveform;
    logToConsole(`Waveform set to: ${currentWaveform}`, 'system');
  });
});

const sliderCutoff = document.getElementById('slider-filter-cutoff');
const valCutoff = document.getElementById('val-filter-cutoff');
if (sliderCutoff) {
  sliderCutoff.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    valCutoff.innerText = `${val} Hz`;
    if (spaceHumFilter && audioCtx) {
      spaceHumFilter.frequency.setTargetAtTime(val, audioCtx.currentTime, 0.05);
    }
  });
}

const sliderQ = document.getElementById('slider-filter-q');
const valQ = document.getElementById('val-filter-q');
if (sliderQ) {
  sliderQ.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    valQ.innerText = `${val.toFixed(1)}`;
    if (spaceHumFilter && audioCtx) {
      spaceHumFilter.Q.setTargetAtTime(val, audioCtx.currentTime, 0.05);
    }
  });
}

const sliderDrone = document.getElementById('slider-drone-vol');
const valDrone = document.getElementById('val-drone-vol');
if (sliderDrone) {
  sliderDrone.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    valDrone.innerText = `${val}%`;
    if (masterDroneGain && audioCtx) {
      masterDroneGain.gain.setTargetAtTime(val / 100, audioCtx.currentTime, 0.05);
    }
  });
}

document.getElementById('btn-test-synth-chord').addEventListener('click', playHarmonicChordSFX);

/* ==========================================================================
   MODAL DIALOG CONTROLLER (SYNTH, LEADERBOARD, SHOP)
   ========================================================================== */

document.getElementById('btn-open-synth').addEventListener('click', () => {
  document.getElementById('modal-synth').classList.remove('hidden');
});

document.getElementById('btn-open-leaderboard').addEventListener('click', () => {
  document.getElementById('modal-leaderboard').classList.remove('hidden');
  loadAndRenderLeaderboard('all');
});

document.getElementById('btn-open-shop').addEventListener('click', () => {
  document.getElementById('modal-shop').classList.remove('hidden');
  loadAndRenderShop();
});

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const modalId = e.target.getAttribute('data-close');
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
  });
});

// Close modals when clicking backdrop
document.querySelectorAll('.modal-backdrop').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
});

// Partner cheer (High-Five) button
document.getElementById('btn-quick-cheer').addEventListener('click', () => {
  if (socket) {
    socket.emit('partner_high_five', { from: userData?.username });
  }
  logToConsole('🙌 High-Five sent across real-time quantum tether!', 'success');
  playChimeSFX();
  triggerHaptics([60, 40, 100]);
  triggerTetherShockwave();
});

/* ==========================================================================
   BUTTON CLICK HANDLERS & SIMULATION CONTROLLERS
   ========================================================================== */

// 1. Log Activity Endpoint
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

    logToConsole(`Activity saved! Added +${data.addedXP} XP and +${data.earnedCrystals || 15} 💎.`, 'success');
    
    if (data.leveledUp) {
      logToConsole(`👑 LEVEL UP! You reached Level ${data.user.level}!`, 'success');
      playChimeSFX();
      triggerHaptics([100, 100, 100, 100]);
    }

    if (data.shieldShattered) {
      triggerShieldShatterAnimation();
    }

    if (data.user.currentStreak === 7) {
      trigger7DayMilestone();
    } else if (data.user.currentStreak === 30) {
      trigger30DayMilestone();
    }

    updateDashboardUI(data);
    loadAndRenderHeatmap();
    loadAndRenderQuests();

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
    playPlasmaSnapSFX();
    triggerTetherShockwave();
    
    updateDashboardUI(data);

  } catch (error) {
    logToConsole('Revival error: ' + error.message, 'error');
  }
});

// 3. Simulate Missed Day
document.getElementById('btn-sim-miss').addEventListener('click', async () => {
  if (!activeUserId) return;

  logToConsole('Simulating missed calendar day...', 'system');
  try {
    await fetch(`/api/users/${activeUserId}/toggle-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field: 'lastActiveDate', value: 'missed' })
    });

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
    await fetch(`/api/users/${activeUserId}/toggle-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field: 'isPowerHour', value })
    });
    bootstrapDashboard();
  } catch (error) {
    logToConsole('Power Hour toggle error: ' + error.message, 'error');
  }
});

// 5. Toggle Danger State checkbox
document.getElementById('sim-danger-state').addEventListener('change', (e) => {
  const isDanger = e.target.checked;
  const card = document.getElementById('main-user-card');

  if (isDanger) {
    card.classList.add('danger');
    logToConsole('🚨 Danger State Activated! &lt; 2 Hours left to preserve streak.', 'error');
    if (isAudioActive && spaceHumFilter) {
      spaceHumFilter.frequency.setValueAtTime(100, audioCtx.currentTime);
      spaceHumFilter.Q.setValueAtTime(8, audioCtx.currentTime);
    }
  } else {
    card.classList.remove('danger');
    logToConsole('Danger State deactivated.', 'system');
    if (isAudioActive && spaceHumFilter) {
      spaceHumFilter.frequency.setValueAtTime(350, audioCtx.currentTime);
      spaceHumFilter.Q.setValueAtTime(4.0, audioCtx.currentTime);
    }
  }
});

// 6. Milestone Bursts
document.getElementById('btn-burst-7').addEventListener('click', trigger7DayMilestone);
document.getElementById('btn-burst-30').addEventListener('click', trigger30DayMilestone);

// 7. Seed Database Reset
document.getElementById('btn-seed-db').addEventListener('click', seedDatabase);
