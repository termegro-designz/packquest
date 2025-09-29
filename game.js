// PackQuest Game 2.0 - The Ultimate Moving Adventure!
class PackQuestGame {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.gameRunning = false;
    this.gameLoop = null;
    this.lastUpdate = 0;
    
    // Game State
    this.currentLevel = 1;
    this.maxLevel = 10;
    this.score = 0;
    this.lives = 3;
    this.energy = 100;
    this.combo = 0;
    this.maxCombo = 0;
    
    // Player (PackQuest Hero)
    this.player = { 
      x: 50, y: 50, width: 40, height: 40, speed: 5,
      invulnerable: false, invulnerableTime: 0,
      hasShield: false, shieldTime: 0,
      magnetActive: false, magnetTime: 0,
      turboActive: false, turboTime: 0
    };
    
    // Game Objects
    this.boxes = [];
    this.coins = [];
    this.obstacles = [];
    this.powerUps = [];
    this.particles = [];
    this.floatingTexts = [];
    this.truck = { x: 700, y: 400, width: 80, height: 60 };
    
    // Level System
    this.levelData = this.generateLevelData();
    this.boxesNeeded = 5;
    this.boxesCollected = 0;
    this.coinCount = 0;
    
    // Controls
    this.keys = {};
    this.touchControls = { active: false, startX: 0, startY: 0 };
    
    // Assets
    this.images = {};
    this.sounds = {};
    this.imagesLoaded = false;
    this.soundsEnabled = true;
    
    // Achievements
    this.achievements = this.initAchievements();
    this.unlockedAchievements = this.loadAchievements();
    
    // Visual Effects
    this.camera = { x: 0, y: 0, shake: 0 };
    this.backgroundElements = [];
    
    this.init();
  }
  
  init() {
    this.canvas = document.getElementById('gameCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    
    this.setupControls();
    this.loadAssets();
    this.generateBackgroundElements();
    this.showWelcomeScreen();
  }
  
  setupControls() {
    // Keyboard
    document.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      
      // Cheat codes für Entwicklung 😉
      if (e.key === 'l' && e.ctrlKey) this.levelComplete();
      if (e.key === 'p' && e.ctrlKey) this.spawnPowerUp();
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
    
    // Touch Controls für Mobile
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.touchControls.active = true;
      this.touchControls.startX = touch.clientX - rect.left;
      this.touchControls.startY = touch.clientY - rect.top;
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.touchControls.active) return;
      
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const currentX = touch.clientX - rect.left;
      const currentY = touch.clientY - rect.top;
      
      const deltaX = currentX - this.touchControls.startX;
      const deltaY = currentY - this.touchControls.startY;
      
      // Bewegung basierend auf Touch
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        this.player.x += deltaX * 0.1;
        this.player.y += deltaY * 0.1;
        this.touchControls.startX = currentX;
        this.touchControls.startY = currentY;
      }
    });
    
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.touchControls.active = false;
    });
    
    // 📱 MOBILE BUTTON CONTROLS - Außerhalb des Canvas!
    this.setupMobileControls();
  }
  
  loadAssets() {
    const imageUrls = {
      player: 'charakter_pq-01.svg',
      coin: 'coin_pq.svg', 
      truck: 'lkw_pq-01.svg',
      chair: 'sessel_pq.svg'
    };
    
    let loadedCount = 0;
    const totalImages = Object.keys(imageUrls).length;
    
    Object.keys(imageUrls).forEach(key => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          this.imagesLoaded = true;
          this.setupLevel();
        }
      };
      img.onerror = () => {
        console.warn(`Could not load ${key} image: ${imageUrls[key]}`);
        loadedCount++;
        if (loadedCount === totalImages) {
          this.imagesLoaded = true;
          this.setupLevel();
        }
      };
      img.src = imageUrls[key];
      this.images[key] = img;
    });
    
    // Sound Setup (Web Audio API)
    this.setupSounds();
  }
  
  setupSounds() {
    // Audio wird erst nach User-Interaction initialisiert
    this.audioContext = null;
    this.soundsReady = false;
    this.sounds = {};
  }

  initializeAudio() {
    if (this.audioContext) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.sounds = {
        collect: this.createSound([523.25, 659.25, 783.99], 0.1), // C5-E5-G5
        powerup: this.createSound([440, 554.37, 659.25, 880], 0.2), // A4-C#5-E5-A5
        hurt: this.createSound([138.59, 146.83, 155.56], 0.3), // C#3-D3-D#3
        levelup: this.createSound([261.63, 329.63, 392, 523.25, 659.25], 0.4), // Triumphant
        combo: this.createSound([880, 987.77, 1108.73], 0.1) // High combo sound
      };
      this.soundsReady = true;
    } catch (e) {
      console.warn('Web Audio not supported:', e);
      this.soundsEnabled = false;
    }
  }
  
  createSound(frequencies, duration) {
    return () => {
      if (!this.soundsEnabled || !this.audioContext) return;
      
      frequencies.forEach((freq, i) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + i * 0.1);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + i * 0.1);
        gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + i * 0.1 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + i * 0.1 + duration);
        
        oscillator.start(this.audioContext.currentTime + i * 0.1);
        oscillator.stop(this.audioContext.currentTime + i * 0.1 + duration);
      });
    };
  }
  
  generateLevelData() {
    const wienDistricts = [
      'Innere Stadt', 'Leopoldstadt', 'Landstraße', 'Wieden', 'Margareten',
      'Mariahilf', 'Neubau', 'Josefstadt', 'Alsergrund', 'Favoriten'
    ];
    
    return wienDistricts.map((district, index) => ({
      name: `${index + 1}. ${district}`,
      difficulty: 1 + index * 0.3,
      boxesNeeded: 5 + index * 2,
      obstacleCount: 2 + index,
      coinMultiplier: 1 + index * 0.2,
      background: `hsl(${200 + index * 15}, 60%, ${20 + index * 3}%)`
    }));
  }
  
  initAchievements() {
    return {
      'first_steps': { name: 'Erste Schritte', desc: 'Sammle deine ersten 5 Kartons', unlocked: false, icon: '📦' },
      'coin_collector': { name: 'Münzsammler', desc: 'Sammle 50 Münzen', unlocked: false, icon: '🪙' },
      'speed_demon': { name: 'Geschwindigkeitsrausch', desc: 'Erreiche einen 10er Combo', unlocked: false, icon: '⚡' },
      'district_master': { name: 'Bezirks-Meister', desc: 'Schaffe alle 10 Wiener Bezirke', unlocked: false, icon: '🏆' },
      'survivor': { name: 'Überlebenskünstler', desc: 'Spiele 5 Minuten ohne Game Over', unlocked: false, icon: '💪' },
      'perfectionist': { name: 'Perfektionist', desc: 'Schaffe ein Level ohne Schaden', unlocked: false, icon: '✨' },
      'power_user': { name: 'Power User', desc: 'Nutze alle Power-Ups in einem Spiel', unlocked: false, icon: '🎮' }
    };
  }
  
  generateBackgroundElements() {
    this.backgroundElements = [];
    for (let i = 0; i < 20; i++) {
      this.backgroundElements.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }
  
  showWelcomeScreen() {
    this.drawBackground();
    
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Logo
    this.ctx.fillStyle = '#ffd91a';
    this.ctx.font = 'bold 32px "Press Start 2P", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('PACKQUEST 2.0', this.canvas.width/2, 120);
    
    // Subtitle
    this.ctx.font = '16px "Press Start 2P", monospace';
    this.ctx.fillStyle = '#1f6feb';
    this.ctx.fillText('Die ultimative Umzugs-Challenge!', this.canvas.width/2, 160);
    
    // Instructions
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText('🎯 Sammle Kartons, vermeide Möbel', this.canvas.width/2, 200);
    this.ctx.fillText('⚡ Sammle Power-Ups für Spezial-Fähigkeiten', this.canvas.width/2, 220);
    this.ctx.fillText('🏆 Erobere alle 10 Wiener Bezirke', this.canvas.width/2, 240);
    this.ctx.fillText('🎮 Steuerung: Pfeiltasten oder Touch', this.canvas.width/2, 260);
    
    // Level Progress
    this.ctx.fillStyle = '#ffd91a';
    this.ctx.fillText(`Aktueller Level: ${this.currentLevel}/10`, this.canvas.width/2, 300);
    
    // High Score
    const highScore = this.getHighScore();
    if (highScore > 0) {
      this.ctx.fillStyle = '#ff6b6b';
      this.ctx.fillText(`High Score: ${highScore}`, this.canvas.width/2, 320);
    }
    
    this.ctx.textAlign = 'left';
  }
  
  setupLevel() {
    const levelInfo = this.levelData[this.currentLevel - 1];
    
    // Reset game state
    this.player.x = 50;
    this.player.y = 50;
    this.player.invulnerable = false;
    this.player.hasShield = false;
    this.player.magnetActive = false;
    this.player.turboActive = false;
    
    this.boxesNeeded = levelInfo.boxesNeeded;
    this.boxesCollected = 0;
    this.combo = 0;
    this.energy = 100;
    
    // Clear arrays
    this.boxes = [];
    this.coins = [];
    this.obstacles = [];
    this.powerUps = [];
    this.particles = [];
    this.floatingTexts = [];
    
    // Generate level content
    this.generateBoxes();
    this.generateCoins();
    this.generateObstacles();
    
    // Position truck
    this.truck.x = this.canvas.width - this.truck.width - 20;
    this.truck.y = this.canvas.height - this.truck.height - 20;
    
    this.updateUI();
    this.showLevelIntro();
  }
  
  showLevelIntro() {
    const levelInfo = this.levelData[this.currentLevel - 1];
    
    this.drawBackground();
    
    // Level intro overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#ffd91a';
    this.ctx.font = 'bold 24px "Press Start 2P", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`LEVEL ${this.currentLevel}`, this.canvas.width/2, 180);
    
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(levelInfo.name, this.canvas.width/2, 220);
    this.ctx.fillText(`Kartons benötigt: ${levelInfo.boxesNeeded}`, this.canvas.width/2, 250);
    this.ctx.fillText(`Schwierigkeit: ${'★'.repeat(Math.ceil(levelInfo.difficulty))}`, this.canvas.width/2, 280);
    
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = '#ffd91a';
    this.ctx.fillText('Bereit? Das Spiel startet in 3 Sekunden...', this.canvas.width/2, 320);
    
    this.ctx.textAlign = 'left';
    
    setTimeout(() => {
      if (!this.gameRunning) this.start();
    }, 3000);
  }
  
  generateBoxes() {
    const levelInfo = this.levelData[this.currentLevel - 1];
    
    for (let i = 0; i < levelInfo.boxesNeeded; i++) {
      this.boxes.push({
        x: 100 + (i % 6) * 120,
        y: 120 + Math.floor(i / 6) * 100,
        width: 35,
        height: 35,
        collected: false,
        type: Math.random() < 0.1 ? 'special' : 'normal', // 10% special boxes
        value: Math.random() < 0.1 ? 25 : 10,
        glowing: Math.random() < 0.1
      });
    }
  }
  
  generateCoins() {
    const levelInfo = this.levelData[this.currentLevel - 1];
    const coinCount = 8 + this.currentLevel * 2;
    
    for (let i = 0; i < coinCount; i++) {
      this.coins.push({
        x: Math.random() * (this.canvas.width - 40) + 20,
        y: Math.random() * (this.canvas.height - 40) + 20,
        width: 20,
        height: 20,
        collected: false,
        value: Math.floor(Math.random() * 3 + 1) * 10 * levelInfo.coinMultiplier,
        bobOffset: Math.random() * Math.PI * 2,
        type: Math.random() < 0.05 ? 'golden' : 'normal' // 5% golden coins
      });
    }
  }
  
  generateObstacles() {
    const levelInfo = this.levelData[this.currentLevel - 1];
    
    for (let i = 0; i < levelInfo.obstacleCount; i++) {
      this.obstacles.push({
        x: Math.random() * (this.canvas.width - 60) + 30,
        y: Math.random() * (this.canvas.height - 60) + 30,
        width: 45,
        height: 45,
        vx: (Math.random() - 0.5) * levelInfo.difficulty * 2,
        vy: (Math.random() - 0.5) * levelInfo.difficulty * 2,
        type: Math.random() < 0.2 ? 'boss' : 'normal', // 20% boss obstacles
        health: Math.random() < 0.2 ? 2 : 1,
        damage: Math.random() < 0.2 ? 2 : 1
      });
    }
    
    // Spawn initial power-up
    if (Math.random() < 0.3) {
      this.spawnPowerUp();
    }
  }
  
  spawnPowerUp() {
    const types = ['shield', 'magnet', 'turbo', 'life', 'bomb'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    this.powerUps.push({
      x: Math.random() * (this.canvas.width - 40) + 20,
      y: Math.random() * (this.canvas.height - 40) + 20,
      width: 30,
      height: 30,
      type: type,
      duration: 5000, // 5 seconds
      bobOffset: Math.random() * Math.PI * 2,
      spawnTime: Date.now()
    });
  }
  
  start() {
    if (this.gameRunning) return;
    
    this.gameRunning = true;
    
    // Canvas ist bereits in init() initialisiert
    if (!this.canvas) {
      console.error('❌ Canvas nicht gefunden!');
      return;
    }
    
    // Setup responsive canvas
    this.setupResponsiveCanvas();
    
    this.setupMobileControls(); // Mobile Controls initialisieren
    this.setupLevel();
    this.lastUpdate = performance.now();
    this.gameLoop = requestAnimationFrame((timestamp) => this.update(timestamp));
    
    console.log('🎮 Spiel gestartet!');
  }
  
  setupResponsiveCanvas() {
    const canvas = this.canvas;
    const container = canvas.parentElement;
    
    // Set canvas actual size (for game logic)
    const gameWidth = 800;
    const gameHeight = 500;
    
    canvas.width = gameWidth;
    canvas.height = gameHeight;
    
    // Scale canvas for display
    this.scaleCanvas();
    
    // Listen for window resize
    window.addEventListener('resize', () => this.scaleCanvas());
  }
  
  scaleCanvas() {
    const canvas = this.canvas;
    const container = canvas.parentElement;
    
    // Get container size
    const containerWidth = container.clientWidth;
    const maxHeight = window.innerHeight * 0.5; // Max 50% of viewport height
    
    // Calculate scale to fit container width
    const scale = Math.min(containerWidth / 800, maxHeight / 500, 1);
    
    // Apply CSS scaling
    canvas.style.width = (800 * scale) + 'px';
    canvas.style.height = (500 * scale) + 'px';
    
    console.log(`🎮 Canvas responsive skaliert: ${scale.toFixed(2)}x (${canvas.style.width} x ${canvas.style.height})`);
  }
  
  stop() {
    this.gameRunning = false;
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
      this.gameLoop = null;
    }
  }
  
  update(timestamp) {
    if (!this.gameRunning) return;
    
    // FPS-Limitierung für Performance (30 FPS statt 60)
    if (timestamp - this.lastUpdate < 33) {
      this.gameLoop = requestAnimationFrame((timestamp) => this.update(timestamp));
      return;
    }
    
    // Process mobile input
    this.processMobileInput();
    
    const deltaTime = timestamp - this.lastUpdate;
    this.lastUpdate = timestamp;
    
    // Optimierte Update-Reihenfolge (wichtigste zuerst)
    this.updatePlayer(deltaTime);
    this.checkCollisions(); // Frühzeitig prüfen
    this.updateObstacles(deltaTime);
    this.updatePowerUps(deltaTime);
    
    // Weniger kritische Updates nur jedes 2. Frame
    this.frameCount = (this.frameCount || 0) + 1;
    if (this.frameCount % 2 === 0) {
      this.updateParticles(deltaTime);
      this.updateFloatingTexts(deltaTime);
    }
    
    this.updateCamera(deltaTime);
    this.draw();
    
    this.gameLoop = requestAnimationFrame((timestamp) => this.update(timestamp));
  }

  // Handle mobile D-Pad buttons (no-op on Desktop)
  processMobileInput() {
    if (!this.mobileButtons || !this.gameRunning) return;
    const currentSpeed = this.player.turboActive ? this.player.speed * 2 : this.player.speed;
    if (this.mobileButtons.left) {
      this.player.x = Math.max(0, this.player.x - currentSpeed);
    }
    if (this.mobileButtons.right) {
      this.player.x = Math.min(this.canvas.width - this.player.width, this.player.x + currentSpeed);
    }
    if (this.mobileButtons.up) {
      this.player.y = Math.max(0, this.player.y - currentSpeed);
    }
    if (this.mobileButtons.down) {
      this.player.y = Math.min(this.canvas.height - this.player.height, this.player.y + currentSpeed);
    }
  }
  
  updatePlayer(deltaTime) {
    const baseSpeed = this.player.speed;
    const currentSpeed = this.player.turboActive ? baseSpeed * 2 : baseSpeed;
    
    // Mobile controls processing
    this.processMobileInput();
    
    // Keyboard movement
    if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
      this.player.x = Math.max(0, this.player.x - currentSpeed);
    }
    if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
      this.player.x = Math.min(this.canvas.width - this.player.width, this.player.x + currentSpeed);
    }
    if (this.keys['ArrowUp'] || this.keys['w'] || this.keys['W']) {
      this.player.y = Math.max(0, this.player.y - currentSpeed);
    }
    if (this.keys['ArrowDown'] || this.keys['s'] || this.keys['S']) {
      this.player.y = Math.min(this.canvas.height - this.player.height, this.player.y + currentSpeed);
    }
    
    // Update power-up timers
    if (this.player.invulnerableTime > 0) {
      this.player.invulnerableTime -= deltaTime;
      if (this.player.invulnerableTime <= 0) {
        this.player.invulnerable = false;
      }
    }
    
    if (this.player.shieldTime > 0) {
      this.player.shieldTime -= deltaTime;
      if (this.player.shieldTime <= 0) {
        this.player.hasShield = false;
      }
    }
    
    if (this.player.magnetTime > 0) {
      this.player.magnetTime -= deltaTime;
      if (this.player.magnetTime <= 0) {
        this.player.magnetActive = false;
      }
    }
    
    if (this.player.turboTime > 0) {
      this.player.turboTime -= deltaTime;
      if (this.player.turboTime <= 0) {
        this.player.turboActive = false;
      }
    }
    
    // Magnet effect
    if (this.player.magnetActive) {
      this.coins.forEach(coin => {
        if (!coin.collected) {
          const dx = this.player.x - coin.x;
          const dy = this.player.y - coin.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            coin.x += dx * 0.05;
            coin.y += dy * 0.05;
          }
        }
      });
    }
  }
  
  updateObstacles(deltaTime) {
    this.obstacles.forEach(obstacle => {
      obstacle.x += obstacle.vx;
      obstacle.y += obstacle.vy;
      
      // Bounce off walls
      if (obstacle.x <= 0 || obstacle.x >= this.canvas.width - obstacle.width) {
        obstacle.vx = -obstacle.vx;
        obstacle.x = Math.max(0, Math.min(this.canvas.width - obstacle.width, obstacle.x));
      }
      if (obstacle.y <= 0 || obstacle.y >= this.canvas.height - obstacle.height) {
        obstacle.vy = -obstacle.vy;
        obstacle.y = Math.max(0, Math.min(this.canvas.height - obstacle.height, obstacle.y));
      }
    });
  }
  
  updatePowerUps(deltaTime) {
    this.powerUps = this.powerUps.filter(powerUp => {
      // Remove expired power-ups
      if (Date.now() - powerUp.spawnTime > 15000) {
        return false;
      }
      
      // Bobbing animation
      powerUp.bobOffset += deltaTime * 0.005;
      
      return true;
    });
    
    // Spawn new power-ups occasionally
    if (Math.random() < 0.001 && this.powerUps.length < 2) {
      this.spawnPowerUp();
    }
  }
  
  updateParticles(deltaTime) {
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= deltaTime;
      particle.alpha = particle.life / particle.maxLife;
      
      return particle.life > 0;
    });
  }
  
  updateFloatingTexts(deltaTime) {
    this.floatingTexts = this.floatingTexts.filter(text => {
      text.y -= 1;
      text.life -= deltaTime;
      text.alpha = text.life / text.maxLife;
      
      return text.life > 0;
    });
  }
  
  updateCamera(deltaTime) {
    if (this.camera.shake > 0) {
      this.camera.shake -= deltaTime;
      this.camera.x = (Math.random() - 0.5) * this.camera.shake * 0.1;
      this.camera.y = (Math.random() - 0.5) * this.camera.shake * 0.1;
    } else {
      this.camera.x = 0;
      this.camera.y = 0;
    }
  }
  
  checkCollisions() {
    // Boxes
    this.boxes.forEach(box => {
      if (!box.collected && this.collision(this.player, box)) {
        box.collected = true;
        this.boxesCollected++;
        this.score += box.value;
        this.combo++;
        this.energy = Math.min(100, this.energy + 5);
        
        this.sounds.collect?.();
        this.createParticles(box.x + box.width/2, box.y + box.height/2, '#8B4513', 5);
        this.addFloatingText(`+${box.value}`, box.x, box.y, '#ffd91a');
        
        if (this.combo > this.maxCombo) {
          this.maxCombo = this.combo;
        }
        
        if (this.combo >= 10) {
          this.unlockAchievement('speed_demon');
        }
        
        this.updateUI();
        this.checkLevelComplete();
      }
    });
    
    // Coins
    this.coins.forEach(coin => {
      if (!coin.collected && this.collision(this.player, coin)) {
        coin.collected = true;
        this.coinCount++;
        this.score += coin.value;
        this.combo++;
        
        this.sounds.collect?.();
        this.createParticles(coin.x + coin.width/2, coin.y + coin.height/2, '#ffd91a', 3);
        this.addFloatingText(`+${coin.value}`, coin.x, coin.y, '#ffd91a');
        
        if (this.coinCount >= 50) {
          this.unlockAchievement('coin_collector');
        }
        
        this.updateUI();
      }
    });
    
    // Power-ups
    this.powerUps.forEach((powerUp, index) => {
      if (this.collision(this.player, powerUp)) {
        this.activatePowerUp(powerUp.type);
        this.powerUps.splice(index, 1);
        this.sounds.powerup?.();
        this.createParticles(powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2, '#ff6b6b', 8);
      }
    });
    
    // Obstacles
    if (!this.player.invulnerable) {
      this.obstacles.forEach(obstacle => {
        if (this.collision(this.player, obstacle)) {
          if (this.player.hasShield) {
            this.player.hasShield = false;
            this.player.shieldTime = 0;
            this.addFloatingText('Schild!', this.player.x, this.player.y, '#00ff00');
          } else {
            this.takeDamage(obstacle.damage);
          }
        }
      });
    }
    
    // Truck (win condition)
    if (this.boxesCollected >= this.boxesNeeded && this.collision(this.player, this.truck)) {
      this.levelComplete();
    }
  }
  
  collision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  }
  
  activatePowerUp(type) {
    switch (type) {
      case 'shield':
        this.player.hasShield = true;
        this.player.shieldTime = 8000;
        this.addFloatingText('Schutzschild!', this.player.x, this.player.y, '#00ff00');
        break;
      
      case 'magnet':
        this.player.magnetActive = true;
        this.player.magnetTime = 10000;
        this.addFloatingText('Magnet!', this.player.x, this.player.y, '#ff6b6b');
        break;
      
      case 'turbo':
        this.player.turboActive = true;
        this.player.turboTime = 6000;
        this.addFloatingText('Turbo!', this.player.x, this.player.y, '#ffff00');
        break;
      
      case 'life':
        this.lives = Math.min(5, this.lives + 1);
        this.addFloatingText('+1 Leben!', this.player.x, this.player.y, '#ff69b4');
        break;
      
      case 'bomb':
        this.clearNearbyObstacles();
        this.addFloatingText('BOOM!', this.player.x, this.player.y, '#ff4500');
        this.camera.shake = 500;
        break;
    }
  }
  
  clearNearbyObstacles() {
    this.obstacles = this.obstacles.filter(obstacle => {
      const dx = obstacle.x - this.player.x;
      const dy = obstacle.y - this.player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 120) {
        this.createParticles(obstacle.x + obstacle.width/2, obstacle.y + obstacle.height/2, '#ff4500', 10);
        return false;
      }
      return true;
    });
  }
  
  takeDamage(damage = 1) {
    this.lives -= damage;
    this.combo = 0;
    this.energy = Math.max(0, this.energy - 20);
    
    this.player.invulnerable = true;
    this.player.invulnerableTime = 2000;
    
    this.sounds.hurt?.();
    this.camera.shake = 300;
    this.createParticles(this.player.x + this.player.width/2, this.player.y + this.player.height/2, '#ff0000', 6);
    this.addFloatingText(`-${damage} Leben`, this.player.x, this.player.y, '#ff0000');
    
    if (this.lives <= 0) {
      this.gameOver();
    }
    
    this.updateUI();
  }
  
  checkLevelComplete() {
    if (this.boxesCollected >= this.boxesNeeded) {
      // Activate truck glow effect
      this.createParticles(this.truck.x + this.truck.width/2, this.truck.y + this.truck.height/2, '#00ff00', 3);
    }
  }
  
  levelComplete() {
    this.stop();
    this.score += 100 * this.currentLevel;
    this.score += this.lives * 50; // Bonus for remaining lives
    
    this.sounds.levelup?.();
    
    if (this.currentLevel === 1) {
      this.unlockAchievement('first_steps');
    }
    
    if (this.currentLevel >= this.maxLevel) {
      this.unlockAchievement('district_master');
      this.gameWin();
      return;
    }
    
    this.currentLevel++;
    this.showLevelComplete();
  }
  
  showLevelComplete() {
    this.drawBackground();
    this.drawGame();
    
    this.ctx.fillStyle = 'rgba(0, 255, 0, 0.9)';
    this.ctx.fillRect(50, 150, this.canvas.width - 100, 200);
    this.ctx.strokeStyle = '#00aa00';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(50, 150, this.canvas.width - 100, 200);
    
    this.ctx.fillStyle = '#000';
    this.ctx.font = 'bold 20px "Press Start 2P", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('LEVEL GESCHAFFT!', this.canvas.width/2, 190);
    
    this.ctx.font = '14px Arial';
    this.ctx.fillText(`Bezirk erobert: ${this.levelData[this.currentLevel - 2].name}`, this.canvas.width/2, 220);
    this.ctx.fillText(`Bonus: ${100 * (this.currentLevel - 1)} Punkte`, this.canvas.width/2, 245);
    this.ctx.fillText(`Verbleibende Leben: ${this.lives} x 50 = ${this.lives * 50}`, this.canvas.width/2, 270);
    this.ctx.fillText(`Gesamtscore: ${this.score}`, this.canvas.width/2, 295);
    
    this.ctx.font = '12px Arial';
    this.ctx.fillText('Nächster Level startet automatisch...', this.canvas.width/2, 325);
    
    this.ctx.textAlign = 'left';
    
    setTimeout(() => {
      this.setupLevel();
    }, 3000);
  }
  
  gameOver() {
    this.stop();
    this.saveHighScore();
    
    this.drawBackground();
    this.drawGame();
    
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
    this.ctx.fillRect(30, 120, this.canvas.width - 60, 250);
    this.ctx.strokeStyle = '#aa0000';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(30, 120, this.canvas.width - 60, 250);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 24px "Press Start 2P", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', this.canvas.width/2, 160);
    
    this.ctx.font = '14px Arial';
    this.ctx.fillText(`Erreichte Bezirke: ${this.currentLevel - 1}/10`, this.canvas.width/2, 200);
    this.ctx.fillText(`Endpunktzahl: ${this.score}`, this.canvas.width/2, 225);
    this.ctx.fillText(`Max Combo: ${this.maxCombo}`, this.canvas.width/2, 250);
    this.ctx.fillText(`Gesammelte Münzen: ${this.coinCount}`, this.canvas.width/2, 275);
    
    const highScore = this.getHighScore();
    if (this.score === highScore && this.score > 0) {
      this.ctx.fillStyle = '#ffd91a';
      this.ctx.fillText('🏆 NEUER REKORD! 🏆', this.canvas.width/2, 305);
    } else if (highScore > 0) {
      this.ctx.fillStyle = '#ccc';
      this.ctx.fillText(`High Score: ${highScore}`, this.canvas.width/2, 305);
    }
    
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('Drücke SPACE für Neustart', this.canvas.width/2, 340);
    
    this.ctx.textAlign = 'left';
    
    // Enable restart
    const restartHandler = (e) => {
      if (e.key === ' ') {
        document.removeEventListener('keydown', restartHandler);
        this.restart();
      }
    };
    document.addEventListener('keydown', restartHandler);
  }
  
  gameWin() {
    this.stop();
    this.saveHighScore();
    
    this.drawBackground();
    
    this.ctx.fillStyle = 'rgba(255, 215, 0, 0.95)';
    this.ctx.fillRect(20, 100, this.canvas.width - 40, 300);
    this.ctx.strokeStyle = '#ffa500';
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(20, 100, this.canvas.width - 40, 300);
    
    this.ctx.fillStyle = '#000';
    this.ctx.font = 'bold 20px "Press Start 2P", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🏆 WIEN EROBERT! 🏆', this.canvas.width/2, 140);
    
    this.ctx.font = '16px Arial';
    this.ctx.fillText('Alle 10 Bezirke geschafft!', this.canvas.width/2, 180);
    this.ctx.fillText(`Endpunktzahl: ${this.score}`, this.canvas.width/2, 210);
    this.ctx.fillText(`PackQuest Meister!`, this.canvas.width/2, 240);
    
    this.ctx.font = '12px Arial';
    this.ctx.fillText('Du bist ein wahrer Umzugsheld!', this.canvas.width/2, 280);
    this.ctx.fillText('Möchtest du es nochmal versuchen?', this.canvas.width/2, 300);
    this.ctx.fillText('Drücke SPACE für Neustart', this.canvas.width/2, 340);
    
    this.ctx.textAlign = 'left';
    
    const restartHandler = (e) => {
      if (e.key === ' ') {
        document.removeEventListener('keydown', restartHandler);
        this.restart();
      }
    };
    document.addEventListener('keydown', restartHandler);
  }
  
  restart() {
    this.currentLevel = 1;
    this.score = 0;
    this.lives = 3;
    this.energy = 100;
    this.combo = 0;
    this.maxCombo = 0;
    this.coinCount = 0;
    
    this.player.hasShield = false;
    this.player.magnetActive = false;
    this.player.turboActive = false;
    this.player.invulnerable = false;
    
    this.particles = [];
    this.floatingTexts = [];
    
    this.setupLevel();
  }
  
  draw() {
    this.drawBackground();
    this.drawGame();
    this.drawUI();
    this.drawEffects();
  }
  
  
  drawBackground() {
    const levelInfo = this.levelData[this.currentLevel - 1];
    
    // Performance: Cache gradient wenn nicht vorhanden
    if (!this.cachedGradient || this.lastLevel !== this.currentLevel) {
      this.cachedGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      this.cachedGradient.addColorStop(0, levelInfo.background);
      this.cachedGradient.addColorStop(1, '#0a0e16');
      this.lastLevel = this.currentLevel;
    }
    
    this.ctx.fillStyle = this.cachedGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Performance: Weniger background elements rendern
    const visibleElements = this.backgroundElements.filter(element => 
      element.y > -element.size && element.y < this.canvas.height + element.size
    );
    
    // Batch-Rendering für bessere Performance
    this.ctx.fillStyle = '#ffffff';
    visibleElements.forEach(element => {
      element.y += element.speed;
      if (element.y > this.canvas.height) {
        element.y = -element.size;
        element.x = Math.random() * this.canvas.width;
      }
      
      this.ctx.globalAlpha = element.opacity;
      this.ctx.fillRect(element.x, element.y, element.size, element.size);
    });
    
    this.ctx.globalAlpha = 1;
  }
  
  drawGame() {
    this.ctx.save();
    this.ctx.translate(this.camera.x, this.camera.y);
    
    // Draw truck
    this.drawTruck();
    
    // Draw boxes
    this.boxes.forEach(box => {
      if (!box.collected) {
        this.drawBox(box);
      }
    });
    
    // Draw coins
    this.coins.forEach(coin => {
      if (!coin.collected) {
        this.drawCoin(coin);
      }
    });
    
    // Draw obstacles
    this.obstacles.forEach(obstacle => {
      this.drawObstacle(obstacle);
    });
    
    // Draw power-ups
    this.powerUps.forEach(powerUp => {
      this.drawPowerUp(powerUp);
    });
    
    // Draw player
    this.drawPlayer();
    
    // Draw particles
    this.particles.forEach(particle => {
      this.drawParticle(particle);
    });
    
    // Draw floating texts
    this.floatingTexts.forEach(text => {
      this.drawFloatingText(text);
    });
    
    this.ctx.restore();
  }
  
  drawTruck() {
    const glowing = this.boxesCollected >= this.boxesNeeded;
    
    if (glowing) {
      this.ctx.shadowColor = '#00ff00';
      this.ctx.shadowBlur = 20;
    }
    
    if (this.imagesLoaded && this.images.truck && this.images.truck.complete) {
      this.ctx.drawImage(this.images.truck, this.truck.x, this.truck.y, this.truck.width, this.truck.height);
    } else {
      this.ctx.fillStyle = glowing ? '#00ff00' : '#ffd91a';
      this.ctx.fillRect(this.truck.x, this.truck.y, this.truck.width, this.truck.height);
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.truck.x, this.truck.y, this.truck.width, this.truck.height);
    }
    
    this.ctx.shadowBlur = 0;
  }
  
  drawBox(box) {
    if (box.glowing) {
      this.ctx.shadowColor = '#ffd91a';
      this.ctx.shadowBlur = 10;
    }
    
    this.ctx.fillStyle = box.type === 'special' ? '#ff6b6b' : '#8B4513';
        this.ctx.fillRect(box.x, box.y, box.width, box.height);
    
        this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
        this.ctx.strokeRect(box.x, box.y, box.width, box.height);
    
    // Special box indicator
    if (box.type === 'special') {
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('★', box.x + box.width/2, box.y + box.height/2 + 4);
      this.ctx.textAlign = 'left';
    }
    
    this.ctx.shadowBlur = 0;
  }
  
  drawCoin(coin) {
    const bob = Math.sin(coin.bobOffset + performance.now() * 0.005) * 3;
    const y = coin.y + bob;
    
    if (coin.type === 'golden') {
      this.ctx.shadowColor = '#ffd700';
      this.ctx.shadowBlur = 15;
    }
    
    if (this.imagesLoaded && this.images.coin && this.images.coin.complete) {
      this.ctx.drawImage(this.images.coin, coin.x, y, coin.width, coin.height);
        } else {
      this.ctx.fillStyle = coin.type === 'golden' ? '#ffd700' : '#ffd91a';
          this.ctx.beginPath();
      this.ctx.arc(coin.x + coin.width/2, y + coin.height/2, coin.width/2, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
    
    this.ctx.shadowBlur = 0;
  }
  
  drawObstacle(obstacle) {
    if (obstacle.type === 'boss') {
      this.ctx.shadowColor = '#ff0000';
      this.ctx.shadowBlur = 10;
    }
    
    if (this.imagesLoaded && this.images.chair && this.images.chair.complete) {
      this.ctx.drawImage(this.images.chair, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    } else {
      this.ctx.fillStyle = obstacle.type === 'boss' ? '#8B0000' : '#654321';
      this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      
      if (obstacle.type === 'boss') {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('💀', obstacle.x + obstacle.width/2, obstacle.y + obstacle.height/2 + 5);
        this.ctx.textAlign = 'left';
      }
    }
    
    this.ctx.shadowBlur = 0;
  }
  
  drawPowerUp(powerUp) {
    const bob = Math.sin(powerUp.bobOffset + performance.now() * 0.003) * 5;
    const y = powerUp.y + bob;
    
    this.ctx.shadowColor = this.getPowerUpColor(powerUp.type);
    this.ctx.shadowBlur = 15;
    
    this.ctx.fillStyle = this.getPowerUpColor(powerUp.type);
    this.ctx.fillRect(powerUp.x, y, powerUp.width, powerUp.height);
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(powerUp.x, y, powerUp.width, powerUp.height);
    
    // Power-up icon
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.getPowerUpIcon(powerUp.type), powerUp.x + powerUp.width/2, y + powerUp.height/2 + 5);
    this.ctx.textAlign = 'left';
    
    this.ctx.shadowBlur = 0;
  }
  
  getPowerUpColor(type) {
    const colors = {
      shield: '#00ff00',
      magnet: '#ff6b6b',
      turbo: '#ffff00',
      life: '#ff69b4',
      bomb: '#ff4500'
    };
    return colors[type] || '#ffffff';
  }
  
  getPowerUpIcon(type) {
    const icons = {
      shield: '🛡️',
      magnet: '🧲',
      turbo: '⚡',
      life: '❤️',
      bomb: '💣'
    };
    return icons[type] || '?';
  }
  
  drawPlayer() {
    if (this.player.invulnerable && Math.floor(performance.now() / 100) % 2) {
      return; // Blinking effect when invulnerable
    }
    
    // Power-up effects
    if (this.player.hasShield) {
      this.ctx.strokeStyle = '#00ff00';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(this.player.x + this.player.width/2, this.player.y + this.player.height/2, this.player.width/2 + 10, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    
    if (this.player.turboActive) {
      this.ctx.shadowColor = '#ffff00';
      this.ctx.shadowBlur = 20;
    }
    
    if (this.player.magnetActive) {
      this.ctx.strokeStyle = '#ff6b6b';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 75, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    
    // Draw player
    if (this.imagesLoaded && this.images.player && this.images.player.complete) {
      this.ctx.drawImage(this.images.player, this.player.x, this.player.y, this.player.width, this.player.height);
    } else {
      this.ctx.fillStyle = '#1f6feb';
      this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }
    
    this.ctx.shadowBlur = 0;
  }
  
  drawParticle(particle) {
    this.ctx.globalAlpha = particle.alpha;
    this.ctx.fillStyle = particle.color;
    this.ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
    this.ctx.globalAlpha = 1;
  }
  
  drawFloatingText(text) {
    this.ctx.globalAlpha = text.alpha;
    this.ctx.fillStyle = text.color;
    this.ctx.font = 'bold 14px Arial';
      this.ctx.textAlign = 'center';
    this.ctx.fillText(text.text, text.x, text.y);
      this.ctx.textAlign = 'left';
    this.ctx.globalAlpha = 1;
  }
  
  drawUI() {
    // HUD nach oben verlegt, Spielfeld unten komplett sichtbar
    const hudHeight = 40;
    
    // Hintergrundleiste oben
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    this.ctx.fillRect(0, 0, this.canvas.width, hudHeight);
    
    // Leben links
    this.ctx.fillStyle = '#ff6b6b';
    this.ctx.font = 'bold 12px Arial';
    for (let i = 0; i < this.lives; i++) {
      this.ctx.fillText('❤️', 10 + i * 18, 16);
    }
    
    // Energiebalken links unter Herzen
    const energyWidth = 110;
    const energyHeight = 7;
    const energyX = 10;
    const energyY = 26;
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(energyX, energyY, energyWidth, energyHeight);
    this.ctx.fillStyle = this.energy > 30 ? '#00ff00' : '#ff6b6b';
    this.ctx.fillRect(energyX, energyY, (this.energy / 100) * energyWidth, energyHeight);
    
    // Power-up Indikatoren links daneben
    let powerUpX = energyX + energyWidth + 10;
    if (this.player.hasShield) {
      this.ctx.fillStyle = '#00ff00';
      this.ctx.fillText('🛡️', powerUpX, 16);
      powerUpX += 18;
    }
    if (this.player.magnetActive) {
      this.ctx.fillStyle = '#ff6b6b';
      this.ctx.fillText('🧲', powerUpX, 16);
      powerUpX += 18;
    }
    if (this.player.turboActive) {
      this.ctx.fillStyle = '#ffff00';
      this.ctx.fillText('⚡', powerUpX, 16);
      powerUpX += 18;
    }
    
    // Stats rechts
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 12px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Level: ${this.currentLevel}/${this.maxLevel}`, this.canvas.width - 10, 14);
    this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 10, 28);
    this.ctx.textAlign = 'left';
    
    // Kartons Mitte oben
    this.ctx.fillStyle = '#ffd91a';
    this.ctx.textAlign = 'center';
    this.ctx.font = 'bold 12px Arial';
    this.ctx.fillText(`Kartons: ${this.boxesCollected}/${this.boxesNeeded}`, this.canvas.width/2, 26);
    
    // Combo unter der Kartonanzeige (klein)
    if (this.combo > 0) {
      this.ctx.fillStyle = '#ffd91a';
      this.ctx.font = 'bold 11px Arial';
      this.ctx.fillText(`COMBO x${this.combo}`, this.canvas.width/2, 14);
    }
    this.ctx.textAlign = 'left';
  }
  
  drawEffects() {
    // Screen effects for power-ups
    if (this.player.turboActive) {
      this.ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  
  createParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        size: Math.random() * 4 + 2,
        color: color,
        life: 1000,
        maxLife: 1000,
        alpha: 1
      });
    }
  }
  
  addFloatingText(text, x, y, color) {
    this.floatingTexts.push({
      text: text,
      x: x,
      y: y,
      color: color,
      life: 2000,
      maxLife: 2000,
      alpha: 1
    });
  }
  
  unlockAchievement(id) {
    if (!this.unlockedAchievements.includes(id)) {
      this.unlockedAchievements.push(id);
      this.saveAchievements();
      
      const achievement = this.achievements[id];
      this.addFloatingText(`🏆 ${achievement.name}`, this.canvas.width/2, 100, '#ffd700');
      
      // Show achievement notification
      setTimeout(() => {
        this.showAchievementNotification(achievement);
      }, 500);
    }
  }
  
  showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ffd700, #ffed4e);
      color: #000;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: Arial, sans-serif;
      max-width: 300px;
      animation: slideIn 0.5s ease-out;
    `;
    
    notification.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">
        ${achievement.icon} Achievement Unlocked!
      </div>
      <div style="font-size: 14px;">${achievement.name}</div>
      <div style="font-size: 12px; opacity: 0.8;">${achievement.desc}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }
  
  updateUI() {
    const scoreEl = document.getElementById('score');
    const boxesEl = document.getElementById('boxes');
    const coinsEl = document.getElementById('coins');
    
    if (scoreEl) scoreEl.textContent = this.score;
    if (boxesEl) boxesEl.textContent = this.boxesCollected;
    if (coinsEl) coinsEl.textContent = this.coinCount;
  }
  
  // 📱 MOBILE CONTROLS SETUP
  setupMobileControls() {
    // Mobile Button States
    this.mobileButtons = {
      up: false, down: false, left: false, right: false,
      action: false, pause: false
    };
    
    // Button Event Listeners mit Touch Feedback
    const buttons = ['up', 'down', 'left', 'right'];
    buttons.forEach(direction => {
      const btn = document.getElementById(direction + 'Btn');
      if (btn) {
        // Touch Start
        btn.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.mobileButtons[direction] = true;
          btn.style.transform = 'scale(0.95) translateY(2px)';
          btn.style.borderColor = '#ffd91a';
          
          // Haptisches Feedback
          if (navigator.vibrate) navigator.vibrate(50);
        });
        
        // Touch End
        btn.addEventListener('touchend', (e) => {
          e.preventDefault();
          this.mobileButtons[direction] = false;
          btn.style.transform = '';
          btn.style.borderColor = '#1f6feb';
        });
        
        // Prevent context menu
        btn.addEventListener('contextmenu', (e) => e.preventDefault());
      }
    });
    
    // Action Button
    const actionBtn = document.getElementById('actionBtn');
    if (actionBtn) {
      actionBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.mobileButtons.action = true;
        if (navigator.vibrate) navigator.vibrate(75);
      });
      
      actionBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.mobileButtons.action = false;
      });
    }
    
    // Mobile Pause Button
    const pauseMobileBtn = document.getElementById('pauseMobileBtn');
    if (pauseMobileBtn) {
      pauseMobileBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.togglePause();
        if (navigator.vibrate) navigator.vibrate(100);
      });
    }
  }
  
  // Toggle Pause Function
  togglePause() {
    if (this.gameRunning) {
      this.pauseGame();
    } else {
      this.resumeGame();
    }
  }
  
  pauseGame() {
    this.gameRunning = false;
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
    }
    
    // Show pause overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#ffd91a';
    this.ctx.font = 'bold 24px "Press Start 2P", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('PAUSIERT', this.canvas.width/2, this.canvas.height/2);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '12px Arial';
    this.ctx.fillText('Berühre PAUSE um fortzusetzen', this.canvas.width/2, this.canvas.height/2 + 40);
    this.ctx.textAlign = 'left';
  }
  
  resumeGame() {
    this.gameRunning = true;
    this.gameLoop = requestAnimationFrame((timestamp) => this.update(timestamp));
  }
  
  getHighScore() {
    try {
      return parseInt(localStorage.getItem('packquest2_highscore') || '0');
    } catch (e) {
      return 0;
    }
  }
  
  saveHighScore() {
    try {
      const currentHigh = this.getHighScore();
      if (this.score > currentHigh) {
        localStorage.setItem('packquest2_highscore', this.score.toString());
        return true;
      }
    } catch (e) {
      console.warn('LocalStorage nicht verfügbar');
    }
    return false;
  }
  
  loadAchievements() {
    try {
      const saved = localStorage.getItem('packquest2_achievements');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }
  
  saveAchievements() {
    try {
      localStorage.setItem('packquest2_achievements', JSON.stringify(this.unlockedAchievements));
    } catch (e) {
      console.warn('LocalStorage nicht verfügbar');
    }
  }
  
  reset() {
    this.stop();
    this.restart();
  }
}

// Global game instance
let game = null;

function startGame() {
  const gameWrapper = document.getElementById('gameWrapper');
  const gameIntro = document.querySelector('.game-intro');
  
  if (gameIntro) gameIntro.style.display = 'none';
  if (gameWrapper) gameWrapper.style.display = 'block';
  
  if (!game) {
    game = new PackQuestGame();
  }
  
  // Audio erst nach User-Gesture initialisieren
  game.initializeAudio();
  
  // Game Assets vorladen
  if (window.preloadGameAssets) {
    window.preloadGameAssets();
  }
  if (game.audioContext && game.audioContext.state === 'suspended') {
    game.audioContext.resume();
  }
  
  // 🎮 RETRO MOBILE CONTROLS aktivieren
  if (window.initRetroControls && isMobileDevice()) {
    game.retroControls = window.initRetroControls(game);
    console.log('🎮 Retro Mobile Controls aktiviert!');
  }
  
  if (game) {
    game.start();
  }
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 1024 && 'ontouchstart' in window);
}

function resetGame() {
  if (game) {
    game.reset();
  }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('gameCanvas')) {
    game = new PackQuestGame();
  }
});

// Add CSS animation for achievement notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Exponiere Start/Stop für Button-Klicks sicher
window.startGame = window.startGame || function startGame() {
  const gameWrapper = document.getElementById('gameWrapper');
  const gameIntro = document.querySelector('.game-intro');
  if (gameIntro) gameIntro.style.display = 'none';
  if (gameWrapper) gameWrapper.style.display = 'block';
  
  if (!window.game) {
    window.game = new PackQuestGame();
  }
  if (window.game?.audioContext && window.game.audioContext.state === 'suspended') {
    window.game.audioContext.resume();
  }
  window.game?.start?.();
};

window.resetGame = window.resetGame || function resetGame() {
  if (window.game) {
    window.game.restart?.();
    window.game.start?.();
  } else {
    window.startGame();
  }
};

// remove duplicate global declaration (kept earlier)