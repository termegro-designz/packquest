// PackQuest Website Scripts
// Performance und UX Optimierungen

// Performance Monitoring (optimiert)
if ('performance' in window) {
  window.addEventListener('load', () => {
    // Verwende performance.now() für genauere Messung
    setTimeout(() => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      // Nur warnen wenn extrem langsam (> 8 Sekunden)
      if (loadTime > 8000) {
        console.info('Loading time:', Math.round(loadTime/1000) + 's');
      }
    }, 100); // Kleine Verzögerung für vollständige Ladung
  });
}

// Smooth Scrolling für Ankerlinks
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Lazy Loading für Bilder (optimiert)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    // Performance: Nur wenn 10% sichtbar
    threshold: 0.1,
    // Performance: 50px Vorlaufbereich
    rootMargin: '50px'
  });

  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// Contact Form Enhancement
function enhanceContactForm() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet...';
        
        // Re-enable after 3 seconds (fallback)
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Senden';
        }, 3000);
      }
    });
  });
}

// Game Analytics & Integration
function trackGameInteraction(action, data = {}) {
  // Google Analytics (falls vorhanden)
  if ('gtag' in window) {
    gtag('event', 'game_interaction', {
      'event_category': 'PackQuest Game 2.0',
      'event_label': action,
      'custom_map': data,
      'value': data.score || 1
    });
  }
  
  // Internal Analytics
  try {
    const analytics = JSON.parse(localStorage.getItem('packquest_analytics') || '{}');
    if (!analytics[action]) analytics[action] = 0;
    analytics[action]++;
    analytics.lastPlayed = new Date().toISOString();
    localStorage.setItem('packquest_analytics', JSON.stringify(analytics));
  } catch (e) {
    console.warn('Analytics storage failed:', e);
  }
}

// Update UI elements with game data
function updateGameStats() {
  if (!window.game) return;
  
  const highScoreEl = document.getElementById('highScore');
  const currentLevelEl = document.getElementById('currentLevel');
  const comboEl = document.getElementById('combo');
  const livesEl = document.getElementById('lives');
  
  if (highScoreEl) highScoreEl.textContent = window.game.getHighScore();
  if (currentLevelEl) currentLevelEl.textContent = window.game.currentLevel;
  if (comboEl) comboEl.textContent = window.game.combo;
  if (livesEl) livesEl.textContent = window.game.lives;
}

// Achievement Toast Notifications
function showAchievementToast(achievement) {
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #000;
    padding: 15px 20px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(255,215,0,0.4);
    z-index: 10001;
    font-family: 'Press Start 2P', monospace;
    font-size: 10px;
    max-width: 320px;
    animation: slideInToast 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border: 2px solid #ffa500;
  `;
  
  toast.innerHTML = `
    <div style="display: flex; align-items: center; margin-bottom: 8px;">
      <span style="font-size: 16px; margin-right: 8px;">${achievement.icon}</span>
      <strong>ACHIEVEMENT UNLOCKED!</strong>
    </div>
    <div style="font-size: 9px; margin-bottom: 4px;">${achievement.name}</div>
    <div style="font-size: 8px; opacity: 0.8;">${achievement.desc}</div>
  `;
  
  document.body.appendChild(toast);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOutToast 0.5s ease-in-out forwards';
    setTimeout(() => toast.remove(), 500);
  }, 5000);
  
  // Click to dismiss
  toast.addEventListener('click', () => {
    toast.style.animation = 'slideOutToast 0.3s ease-in-out forwards';
    setTimeout(() => toast.remove(), 300);
  });
}

// Add achievement animation CSS
const achievementCSS = `
  @keyframes slideInToast {
    from {
      transform: translateX(100%) scale(0.8);
      opacity: 0;
    }
    to {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
  }
  
  @keyframes slideOutToast {
    from {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
    to {
      transform: translateX(100%) scale(0.8);
      opacity: 0;
    }
  }
  
  .achievement-toast {
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .achievement-toast:hover {
    transform: scale(1.05);
  }
`;

// Game Event Listeners
function setupGameEventListeners() {
  // Listen for game events
  document.addEventListener('gameEvent', function(e) {
    const { type, data } = e.detail;
    
    switch (type) {
      case 'levelComplete':
        trackGameInteraction('level_complete', { level: data.level, score: data.score });
        showLevelCompleteEffect();
        break;
      case 'gameOver':
        trackGameInteraction('game_over', { level: data.level, score: data.score });
        break;
      case 'achievementUnlocked':
        trackGameInteraction('achievement', { achievement: data.id });
        showAchievementToast(data);
        break;
      case 'powerUpCollected':
        trackGameInteraction('powerup', { type: data.type });
        break;
    }
    
    updateGameStats();
  });
}

function showLevelCompleteEffect() {
  // Create confetti effect
  for (let i = 0; i < 50; i++) {
    setTimeout(() => createConfetti(), i * 20);
  }
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: ${['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 5)]};
    top: -10px;
    left: ${Math.random() * 100}vw;
    z-index: 9999;
    pointer-events: none;
    border-radius: 50%;
  `;
  
  document.body.appendChild(confetti);
  
  const animation = confetti.animate([
    { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
    { transform: `translateY(${window.innerHeight + 10}px) rotate(360deg)`, opacity: 0 }
  ], {
    duration: 3000,
    easing: 'cubic-bezier(0.5, 0, 0.5, 1)'
  });
  
  animation.onfinish = () => confetti.remove();
}

// Page Visibility API für Game Pause
document.addEventListener('visibilitychange', function() {
  if (document.hidden && window.game && window.game.gameRunning) {
    window.game.stop();
  }
});

// Local Storage für Game High Score
function saveHighScore(score) {
  try {
    const currentHigh = parseInt(localStorage.getItem('packquest_highscore') || '0');
    if (score > currentHigh) {
      localStorage.setItem('packquest_highscore', score.toString());
      return true; // Neuer Rekord
    }
  } catch (e) {
    console.warn('LocalStorage nicht verfügbar');
  }
  return false;
}

function getHighScore() {
  try {
    return parseInt(localStorage.getItem('packquest_highscore') || '0');
  } catch (e) {
    return 0;
  }
}

// Cookie Consent (DSGVO konform)
function checkCookieConsent() {
  if (!localStorage.getItem('cookieConsent')) {
    const banner = document.createElement('div');
    banner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #1a1f2e;
      color: white;
      padding: 16px;
      text-align: center;
      z-index: 10000;
      border-top: 2px solid #1f6feb;
    `;
    banner.innerHTML = `
      <p style="margin: 0 0 8px 0;">Diese Website verwendet Cookies zur Verbesserung der Benutzererfahrung. 
      <a href="datenschutz.html" style="color: #ffd91a;">Datenschutz</a></p>
      <button onclick="acceptCookies()" style="background: #1f6feb; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
        Akzeptieren
      </button>
    `;
    document.body.appendChild(banner);
  }
}

function acceptCookies() {
  try {
    localStorage.setItem('cookieConsent', 'true');
    const banner = document.querySelector('[style*="z-index: 10000"]');
    if (banner) banner.remove();
  } catch (e) {
    console.warn('LocalStorage nicht verfügbar');
  }
}

// Error Handling
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);
  // Optional: Send to error tracking service
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  enhanceContactForm();
  setupGameEventListeners();
  
  // Add achievement CSS
  const style = document.createElement('style');
  style.textContent = achievementCSS;
  document.head.appendChild(style);
  
  // Cookie Consent nach 2 Sekunden
  setTimeout(checkCookieConsent, 2000);
  
  // High Score anzeigen
  const highScore = getHighScore();
  if (highScore > 0) {
    console.log('PackQuest 2.0 High Score:', highScore);
  }
  
  // Update game stats weniger häufig für Performance
  setInterval(updateGameStats, 2000);
  
  // Game assets werden erst beim Spiel-Start geladen
  setupContactSubmission();
});

// Preload kritische Ressourcen (nur beim Game-Start)
function preloadGameAssets() {
  if (window.gameAssetsPreloaded) return;
  
  const criticalImages = [
    'charakter_pq-01.svg',
    'lkw_pq-01.svg', 
    'coin_pq.svg',
    'sessel_pq.svg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src; // Immediate load ohne preload warning
  });
  
  window.gameAssetsPreloaded = true;
}

// Kontaktformular: AJAX Submit an Serverless API
function setupContactSubmission() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('contactStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (status) status.textContent = '';

    // Mindestens E-Mail ODER Telefon erforderlich
    const formData = new FormData(form);
    const email = (formData.get('email') || '').toString().trim();
    const telefon = (formData.get('telefon') || '').toString().trim();
    const name = (formData.get('name') || '').toString().trim();
    const websiteHoneypot = (formData.get('website') || '').toString().trim();

    if (websiteHoneypot) {
      if (status) status.textContent = 'Anfrage blockiert.';
      return;
    }
    if (!email && !telefon) {
      if (status) status.textContent = 'Bitte E-Mail oder Telefon angeben.';
      return;
    }
    if (!name) {
      if (status) status.textContent = 'Bitte Name angeben.';
      return;
    }

    submitBtn && (submitBtn.disabled = true);
    submitBtn && (submitBtn.textContent = 'Wird gesendet...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          telefon,
          leistung: (formData.get('leistung') || '').toString(),
          nachricht: (formData.get('nachricht') || '').toString(),
          origin: window.location.href
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        if (status) status.textContent = 'Danke! Ihre Anfrage wurde gesendet.';
        form.reset();
      } else {
        if (status) status.textContent = data.error || 'Senden fehlgeschlagen. Bitte später erneut versuchen.';
      }
    } catch (err) {
      if (status) status.textContent = 'Netzwerkfehler. Bitte später erneut versuchen.';
    } finally {
      submitBtn && (submitBtn.disabled = false);
      submitBtn && (submitBtn.textContent = 'Anfrage senden');
    }
  });
}

// Service Worker Registration (für Offline)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registered: ', registration.scope);
      })
      .catch(function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}