// PackQuest Pixel Game - Vereinfacht
class PackQuestGame {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.gameRunning = false;
    this.gameLoop = null;
    
    // Game state - Angepasst für größeres Canvas (800x500)
    this.player = { x: 50, y: 50, width: 40, height: 40, speed: 4 };
    this.boxes = [];
    this.coins = [];
    this.chairs = [];
    this.truck = { x: 700, y: 400, width: 80, height: 60 };
    
    this.score = 0;
    this.boxesCollected = 0;
    this.totalBoxes = 5; // Mehr Boxen für größeres Spiel
    this.keys = {};
    
    // SVG Images
    this.images = {};
    this.imagesLoaded = false;
    
    this.init();
  }
  
  init() {
    this.canvas = document.getElementById('gameCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    
    // Event listeners
    document.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
    
    this.loadImages();
  }
  
  loadImages() {
    const imageUrls = {
      player: 'charakter_pq-01.svg',
      coin: 'coin_pq.svg', 
      truck: 'lkw_pq-01.svg',
      chair: 'stuhl_simple.svg'
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
        loadedCount++;
        if (loadedCount === totalImages) {
          this.imagesLoaded = true;
          this.setupLevel();
        }
      };
      img.src = imageUrls[key];
      this.images[key] = img;
    });
  }
  
  setupLevel() {
    // Reset game state
    this.player.x = 20;
    this.player.y = 20;
    this.score = 0;
    this.boxesCollected = 0;
    this.coinCount = 0;
    this.boxes = [];
    this.coins = [];
    this.chairs = [];
    

    
    // Create boxes - Größer verteilt für 800x500 Canvas
    for (let i = 0; i < this.totalBoxes; i++) {
      this.boxes.push({
        x: 100 + i * 120,
        y: 150 + (i % 2) * 80,
        width: 30,
        height: 30,
        collected: false
      });
    }
    
    // Create coins - Mehr und besser verteilt
    for (let i = 0; i < 6; i++) {
      this.coins.push({
        x: 50 + i * 110,
        y: 320 + (i % 2) * 50,
        width: 20,
        height: 20,
        collected: false
      });
    }
    
    // Create chairs (Möbel) - DEUTLICH SICHTBAR positioniert
    this.chairs.push({
      x: 150,
      y: 100,
      width: 50,
      height: 50,
      vx: 0.5,
      vy: 0.3
    });
    this.chairs.push({
      x: 350,
      y: 200,
      width: 50,
      height: 50,
      vx: -0.4,
      vy: 0.6
    });
    
    this.updateUI();
  }
  
  start() {
    if (this.gameRunning) return;
    
    this.gameRunning = true;
    this.setupLevel();
    this.gameLoop = setInterval(() => this.update(), 1000/60);
    this.draw();
  }
  
  stop() {
    this.gameRunning = false;
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
  }
  
  update() {
    if (!this.gameRunning) return;
    
    // Player movement
    if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
      this.player.x = Math.max(0, this.player.x - this.player.speed);
    }
    if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
      this.player.x = Math.min(this.canvas.width - this.player.width, this.player.x + this.player.speed);
    }
    if (this.keys['ArrowUp'] || this.keys['w'] || this.keys['W']) {
      this.player.y = Math.max(0, this.player.y - this.player.speed);
    }
    if (this.keys['ArrowDown'] || this.keys['s'] || this.keys['S']) {
      this.player.y = Math.min(this.canvas.height - this.player.height, this.player.y + this.player.speed);
    }
    
    // Move chairs
    this.chairs.forEach(chair => {
      chair.x += chair.vx;
      chair.y += chair.vy;
      
      // Bounce off walls
      if (chair.x <= 0 || chair.x >= this.canvas.width - chair.width) {
        chair.vx = -chair.vx;
      }
      if (chair.y <= 0 || chair.y >= this.canvas.height - chair.height) {
        chair.vy = -chair.vy;
      }
      
      chair.x = Math.max(0, Math.min(this.canvas.width - chair.width, chair.x));
      chair.y = Math.max(0, Math.min(this.canvas.height - chair.height, chair.y));
    });
    
    // Check collisions
    this.checkCollisions();
    this.draw();
  }
  
  checkCollisions() {
    // Boxes
    this.boxes.forEach(box => {
      if (!box.collected && this.collision(this.player, box)) {
        box.collected = true;
        this.boxesCollected++;
        this.score += 10;
        this.updateUI();
      }
    });
    
    // Coins
    this.coins.forEach(coin => {
      if (!coin.collected && this.collision(this.player, coin)) {
        coin.collected = true;
        this.coinCount++;
        this.score += 50;
        this.updateUI();
      }
    });
    
    // Chairs (game over)
    this.chairs.forEach(chair => {
      if (this.collision(this.player, chair)) {
        this.gameOver();
      }
    });
    
    // Truck (win condition)
    if (this.boxesCollected >= this.totalBoxes && this.collision(this.player, this.truck)) {
      this.levelComplete();
    }
  }
  
  collision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  }
  
  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#1a1f2e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw truck - Mit SVG wenn verfügbar
    if (this.imagesLoaded && this.images.truck && this.images.truck.complete) {
      this.ctx.drawImage(this.images.truck, this.truck.x, this.truck.y, this.truck.width, this.truck.height);
    } else {
      this.ctx.fillStyle = '#ffd91a';
      this.ctx.fillRect(this.truck.x, this.truck.y, this.truck.width, this.truck.height);
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(this.truck.x, this.truck.y, this.truck.width, this.truck.height);
    }
    
    // Draw boxes (Kartons)
    this.boxes.forEach(box => {
      if (!box.collected) {
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(box.x, box.y, box.width, box.height);
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(box.x, box.y, box.width, box.height);
        
        // Karton-Details
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(box.x + 5, box.y + 5, box.width - 10, 5);
        this.ctx.fillRect(box.x + 5, box.y + box.height - 10, box.width - 10, 5);
      }
    });
    
    // Draw coins - Mit SVG wenn verfügbar
    this.coins.forEach(coin => {
      if (!coin.collected) {
        if (this.imagesLoaded && this.images.coin && this.images.coin.complete) {
          this.ctx.drawImage(this.images.coin, coin.x, coin.y, coin.width, coin.height);
        } else {
          this.ctx.fillStyle = '#ffd91a';
          this.ctx.beginPath();
          this.ctx.arc(coin.x + coin.width/2, coin.y + coin.height/2, coin.width/2, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.strokeStyle = '#000';
          this.ctx.stroke();
        }
      }
    });
    
    // Draw chairs - Verbesserte SVG-Darstellung
    this.chairs.forEach(chair => {
      if (this.imagesLoaded && this.images.chair && this.images.chair.complete && this.images.chair.naturalWidth > 0) {
        // SVG erfolgreich geladen - zeichne es
        this.ctx.save();
        this.ctx.drawImage(this.images.chair, chair.x, chair.y, chair.width, chair.height);
        this.ctx.restore();
      } else {
        // Fallback: SEHR SICHTBARER Stuhl mit auffälliger Farbe
        this.ctx.fillStyle = '#FF4444'; // Rote Farbe für maximale Sichtbarkeit
        this.ctx.fillRect(chair.x, chair.y, chair.width, chair.height);
        
        // Stuhlrückenlehne
        this.ctx.fillStyle = '#CC0000';
        this.ctx.fillRect(chair.x + 8, chair.y, chair.width - 16, 12);
        
        // Sitzfläche
        this.ctx.fillStyle = '#FF6666';
        this.ctx.fillRect(chair.x + 5, chair.y + chair.height - 15, chair.width - 10, 10);
        
        // Stuhlbeine (4 dicke Rechtecke)
        this.ctx.fillStyle = '#990000';
        this.ctx.fillRect(chair.x + 5, chair.y + chair.height - 5, 6, 5);
        this.ctx.fillRect(chair.x + chair.width - 11, chair.y + chair.height - 5, 6, 5);
        
        // Dicke schwarze Umrandung
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(chair.x, chair.y, chair.width, chair.height);
        
        // Text "STUHL" zur Identifikation
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '8px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('STUHL', chair.x + chair.width/2, chair.y + chair.height/2);
        this.ctx.textAlign = 'left';
      }
    });
    
    // Draw player - Mit SVG wenn verfügbar
    if (this.imagesLoaded && this.images.player && this.images.player.complete) {
      this.ctx.drawImage(this.images.player, this.player.x, this.player.y, this.player.width, this.player.height);
    } else {
      this.ctx.fillStyle = '#1f6feb';
      this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }
    
    // Instructions
    if (!this.gameRunning) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.fillStyle = '#ffd91a';
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('PackQuest Mini', this.canvas.width/2, this.canvas.height/2 - 20);
      this.ctx.font = '10px Arial';
      this.ctx.fillText('Pfeiltasten = Bewegung', this.canvas.width/2, this.canvas.height/2);
      this.ctx.fillText('Sammle Kartons, meide Stühle!', this.canvas.width/2, this.canvas.height/2 + 15);
      this.ctx.textAlign = 'left';
    }
    
    // UI oben zeichnen (LKW bleibt sichtbar!)
    if (this.gameRunning) {
      this.drawGameUI();
    }
  }
  
  gameOver() {
    this.stop();
    this.ctx.fillStyle = 'rgba(255, 46, 139, 0.9)';
    this.ctx.fillRect(30, 70, 240, 60);
    this.ctx.strokeStyle = '#000';
    this.ctx.strokeRect(30, 70, 240, 60);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', this.canvas.width/2, 95);
    this.ctx.font = '10px Arial';
    this.ctx.fillText('Score: ' + this.score, this.canvas.width/2, 115);
    this.ctx.textAlign = 'left';
  }
  
  levelComplete() {
    this.stop();
    this.score += 100;
    this.updateUI();
    
    this.ctx.fillStyle = 'rgba(255, 217, 26, 0.9)';
    this.ctx.fillRect(30, 70, 240, 60);
    this.ctx.strokeStyle = '#000';
    this.ctx.strokeRect(30, 70, 240, 60);
    
    this.ctx.fillStyle = '#000';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('LEVEL COMPLETE!', this.canvas.width/2, 95);
    this.ctx.font = '10px Arial';
    this.ctx.fillText('Score: ' + this.score, this.canvas.width/2, 115);
    this.ctx.textAlign = 'left';
  }
  
  updateUI() {
    const scoreEl = document.getElementById('score');
    const boxesEl = document.getElementById('boxes');
    const coinsEl = document.getElementById('coins');
    if (scoreEl) scoreEl.textContent = this.score;
    if (boxesEl) boxesEl.textContent = this.boxesCollected;
    if (coinsEl) coinsEl.textContent = this.coinCount;
  }
  
  // FIX: UI oben positionieren damit LKW sichtbar bleibt
  drawGameUI() {
    // Kompakte Top-UI statt Bottom-UI
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    this.ctx.fillRect(0, 0, this.canvas.width, 40);
    
    // Score oben links
    this.ctx.fillStyle = '#ffd91a';
    this.ctx.font = 'bold 11px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 8, 16);
    this.ctx.fillText(`Kartons: ${this.boxesCollected}/${this.totalBoxes}`, 8, 30);
    
    // Level oben rechts
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(`Level: 1`, this.canvas.width - 8, 16);
    this.ctx.fillText(`Münzen: ${this.coinCount}`, this.canvas.width - 8, 30);
    
    this.ctx.textAlign = 'left';
  }
  
  reset() {
    this.stop();
    this.setupLevel();
    this.draw();
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
  
  if (game) {
    game.start();
  }
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