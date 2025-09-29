/**
 * 🎮 PACKQUEST RETRO MOBILE CONTROLS
 * Coole Retro-Gaming Mobile Steuerung für PackQuest
 */

class RetroMobileControls {
  constructor(game) {
    this.game = game;
    this.isActive = this.isMobile();
    this.dpadPressed = { up: false, down: false, left: false, right: false };
    this.actionPressed = { action: false, pause: false };
    this.hapticSupported = 'vibrate' in navigator;
    this.touchStartPositions = {};
    
    if (this.isActive) {
      this.createControls();
      this.bindEvents();
      console.log('🎮 Retro Mobile Controls aktiviert!');
    }
  }

  isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 1024 && 'ontouchstart' in window);
  }

  createControls() {
    // Remove existing controls
    const existing = document.getElementById('retroMobileControls');
    if (existing) existing.remove();

    const controlsHTML = `
      <div id="retroMobileControls" class="retro-mobile-controls">
        <!-- D-PAD (Links) -->
        <div class="control-section left-controls">
          <div class="dpad-container">
            <div class="dpad-center"></div>
            <button class="dpad-btn dpad-up" data-direction="up">
              <div class="dpad-arrow">▲</div>
            </button>
            <button class="dpad-btn dpad-down" data-direction="down">
              <div class="dpad-arrow">▼</div>
            </button>
            <button class="dpad-btn dpad-left" data-direction="left">
              <div class="dpad-arrow">◄</div>
            </button>
            <button class="dpad-btn dpad-right" data-direction="right">
              <div class="dpad-arrow">►</div>
            </button>
          </div>
          <div class="control-label">BEWEGEN</div>
        </div>

        <!-- ACTION BUTTONS (Rechts) -->
        <div class="control-section right-controls">
          <div class="action-buttons">
            <button class="action-btn pause-btn" data-action="pause">
              <div class="btn-icon">⏸</div>
              <div class="btn-label">PAUSE</div>
            </button>
            <button class="action-btn dash-btn" data-action="dash">
              <div class="btn-icon">⚡</div>
              <div class="btn-label">DASH</div>
            </button>
          </div>
          <div class="control-label">AKTIONEN</div>
        </div>

        <!-- STATS OVERLAY (Oben) -->
        <div class="mobile-stats">
          <div class="stat-item">
            <span class="stat-icon">💰</span>
            <span class="stat-value" id="mobileScore">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">❤️</span>
            <span class="stat-value" id="mobileLives">3</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">📦</span>
            <span class="stat-value" id="mobileBoxes">0/5</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⚡</span>
            <span class="stat-value" id="mobileEnergy">100</span>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', controlsHTML);
    this.addControlStyles();
  }

  addControlStyles() {
    const styles = `
      <style id="retroMobileControlsCSS">
        .retro-mobile-controls {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 1000;
          font-family: 'Courier New', monospace;
        }

        .control-section {
          position: absolute;
          pointer-events: auto;
        }

        .left-controls {
          bottom: 20px;
          left: 20px;
        }

        .right-controls {
          bottom: 20px;
          right: 20px;
        }

        /* D-PAD STYLING */
        .dpad-container {
          position: relative;
          width: 120px;
          height: 120px;
          background: linear-gradient(145deg, #2a2a3a, #1a1a2a);
          border-radius: 20px;
          border: 3px solid #ffd91a;
          box-shadow: 
            0 8px 16px rgba(0,0,0,0.6),
            inset 0 2px 4px rgba(255,217,26,0.3);
        }

        .dpad-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          background: radial-gradient(circle, #ffd91a, #ffed4a);
          border-radius: 50%;
          border: 2px solid #1a1a2a;
          box-shadow: 0 2px 8px rgba(255,217,26,0.5);
        }

        .dpad-btn {
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(145deg, #3a3a4a, #2a2a3a);
          border: 2px solid #555;
          border-radius: 8px;
          color: #ffd91a;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.1s ease;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dpad-up {
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
        }

        .dpad-down {
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
        }

        .dpad-left {
          left: 5px;
          top: 50%;
          transform: translateY(-50%);
        }

        .dpad-right {
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }

        .dpad-btn:active,
        .dpad-btn.pressed {
          background: linear-gradient(145deg, #ffd91a, #ffed4a);
          color: #1a1a2a;
          box-shadow: 
            inset 0 2px 8px rgba(0,0,0,0.3),
            0 0 12px rgba(255,217,26,0.6);
          transform: scale(0.95);
        }

        .dpad-up:active,
        .dpad-up.pressed {
          transform: translateX(-50%) scale(0.95);
        }

        .dpad-down:active,
        .dpad-down.pressed {
          transform: translateX(-50%) scale(0.95);
        }

        .dpad-left:active,
        .dpad-left.pressed {
          transform: translateY(-50%) scale(0.95);
        }

        .dpad-right:active,
        .dpad-right.pressed {
          transform: translateY(-50%) scale(0.95);
        }

        /* ACTION BUTTONS */
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .action-btn {
          width: 80px;
          height: 80px;
          background: linear-gradient(145deg, #1f6feb, #0066cc);
          border: 3px solid #4a9eff;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: all 0.1s ease;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 6px 12px rgba(31,111,235,0.4),
            inset 0 2px 4px rgba(255,255,255,0.2);
        }

        .action-btn:active,
        .action-btn.pressed {
          background: linear-gradient(145deg, #0066cc, #1f6feb);
          transform: scale(0.9);
          box-shadow: 
            inset 0 4px 12px rgba(0,0,0,0.4),
            0 0 16px rgba(31,111,235,0.6);
        }

        .pause-btn {
          background: linear-gradient(145deg, #ff6b6b, #e74c3c);
          border-color: #ff9999;
        }

        .pause-btn:active,
        .pause-btn.pressed {
          background: linear-gradient(145deg, #e74c3c, #ff6b6b);
          box-shadow: 
            inset 0 4px 12px rgba(0,0,0,0.4),
            0 0 16px rgba(255,107,107,0.6);
        }

        .btn-icon {
          font-size: 20px;
          line-height: 1;
        }

        .btn-label {
          font-size: 8px;
          font-weight: bold;
          margin-top: 2px;
          letter-spacing: 0.5px;
        }

        /* CONTROL LABELS */
        .control-label {
          text-align: center;
          margin-top: 8px;
          font-size: 10px;
          font-weight: bold;
          color: #ffd91a;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          letter-spacing: 1px;
        }

        /* MOBILE STATS */
        .mobile-stats {
          position: fixed;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          background: linear-gradient(145deg, rgba(26,26,42,0.95), rgba(17,17,30,0.95));
          padding: 10px 20px;
          border-radius: 25px;
          border: 2px solid #ffd91a;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          pointer-events: auto;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: bold;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        }

        .stat-icon {
          font-size: 14px;
        }

        .stat-value {
          font-size: 12px;
          color: #ffd91a;
          min-width: 25px;
        }

        /* RESPONSIVE */
        @media (max-width: 480px) {
          .left-controls {
            bottom: 15px;
            left: 15px;
          }

          .right-controls {
            bottom: 15px;
            right: 15px;
          }

          .dpad-container {
            width: 100px;
            height: 100px;
          }

          .dpad-btn {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }

          .action-btn {
            width: 65px;
            height: 65px;
          }

          .btn-icon {
            font-size: 16px;
          }

          .btn-label {
            font-size: 7px;
          }

          .mobile-stats {
            top: 10px;
            gap: 10px;
            padding: 8px 15px;
          }

          .stat-icon {
            font-size: 12px;
          }

          .stat-value {
            font-size: 10px;
          }
        }

        /* LANDSCAPE MODE */
        @media (orientation: landscape) and (max-height: 500px) {
          .mobile-stats {
            top: 5px;
            padding: 6px 12px;
            gap: 8px;
          }

          .left-controls {
            bottom: 10px;
            left: 10px;
          }

          .right-controls {
            bottom: 10px;
            right: 10px;
          }
        }

        /* HIDE ON DESKTOP */
        @media (min-width: 1025px) {
          .retro-mobile-controls {
            display: none !important;
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }

  bindEvents() {
    // D-Pad Events
    const dpadButtons = document.querySelectorAll('.dpad-btn');
    dpadButtons.forEach(btn => {
      const direction = btn.getAttribute('data-direction');
      
      // Touch Events (Primary for mobile)
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.handleDpadPress(direction, true);
      }, { passive: false });
      
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.handleDpadPress(direction, false);
      }, { passive: false });
      
      // Mouse Events (Fallback)
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.handleDpadPress(direction, true);
      });
      
      btn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        this.handleDpadPress(direction, false);
      });
    });

    // Action Button Events
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
      const action = btn.getAttribute('data-action');
      
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.handleActionPress(action, true);
      }, { passive: false });
      
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.handleActionPress(action, false);
      }, { passive: false });
      
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.handleActionPress(action, true);
      });
      
      btn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        this.handleActionPress(action, false);
      });
    });

    // Prevent context menu on long press
    document.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.retro-mobile-controls')) {
        e.preventDefault();
      }
    });

    // Update stats periodically
    setInterval(() => this.updateStats(), 100);
  }

  handleDpadPress(direction, isPressed) {
    this.dpadPressed[direction] = isPressed;
    
    // Update game input
    if (this.game && this.game.mobileButtons) {
      this.game.mobileButtons[direction] = isPressed;
    }
    
    // Visual feedback
    const btn = document.querySelector(`[data-direction="${direction}"]`);
    if (btn) {
      btn.classList.toggle('pressed', isPressed);
    }
    
    // Haptic feedback
    if (isPressed && this.hapticSupported) {
      navigator.vibrate(30);
    }
    
    console.log(`🎮 D-Pad ${direction}: ${isPressed ? 'PRESSED' : 'RELEASED'}`);
  }

  handleActionPress(action, isPressed) {
    this.actionPressed[action] = isPressed;
    
    // Visual feedback
    const btn = document.querySelector(`[data-action="${action}"]`);
    if (btn) {
      btn.classList.toggle('pressed', isPressed);
    }
    
    // Haptic feedback
    if (isPressed && this.hapticSupported) {
      navigator.vibrate(50);
    }
    
    // Handle specific actions
    if (isPressed) {
      switch (action) {
        case 'pause':
          if (this.game && this.game.togglePause) {
            this.game.togglePause();
          }
          break;
        case 'dash':
          // Dash functionality (speed boost)
          if (this.game && this.game.player) {
            this.game.player.turboActive = true;
            this.game.player.turboTime = 1000; // 1 second dash
          }
          break;
      }
    }
    
    console.log(`🎮 Action ${action}: ${isPressed ? 'PRESSED' : 'RELEASED'}`);
  }

  updateStats() {
    if (!this.game) return;
    
    const scoreEl = document.getElementById('mobileScore');
    const livesEl = document.getElementById('mobileLives');
    const boxesEl = document.getElementById('mobileBoxes');
    const energyEl = document.getElementById('mobileEnergy');
    
    if (scoreEl) scoreEl.textContent = this.game.score || 0;
    if (livesEl) livesEl.textContent = this.game.lives || 0;
    if (boxesEl) boxesEl.textContent = `${this.game.boxesCollected || 0}/${this.game.boxesNeeded || 5}`;
    if (energyEl) energyEl.textContent = Math.round(this.game.energy || 100);
  }

  show() {
    const controls = document.getElementById('retroMobileControls');
    if (controls) {
      controls.style.display = 'block';
    }
  }

  hide() {
    const controls = document.getElementById('retroMobileControls');
    if (controls) {
      controls.style.display = 'none';
    }
  }

  destroy() {
    const controls = document.getElementById('retroMobileControls');
    const styles = document.getElementById('retroMobileControlsCSS');
    
    if (controls) controls.remove();
    if (styles) styles.remove();
    
    console.log('🎮 Retro Mobile Controls entfernt');
  }
}

// Auto-initialize when game is available
let retroControls = null;

function initRetroControls(gameInstance) {
  if (retroControls) {
    retroControls.destroy();
  }
  
  retroControls = new RetroMobileControls(gameInstance);
  return retroControls;
}

// Export for global use
window.RetroMobileControls = RetroMobileControls;
window.initRetroControls = initRetroControls;

console.log('🎮 Retro Mobile Controls System geladen!');
