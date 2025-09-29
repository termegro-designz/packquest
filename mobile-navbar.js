/**
 * 📱 PACKQUEST MOBILE NAVBAR - 100% FUNKTIONAL
 * Einfaches System das garantiert funktioniert
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Mobile Navbar initialisiert');
  
  // Mobile Navigation State
  let mobileMenuOpen = false;
  
  // Create mobile overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  `;
  document.body.appendChild(overlay);
  
  // Find hamburger and menu
  const hamburger = document.querySelector('.hamburger button');
  const menu = document.querySelector('.menu');
  
  if (!hamburger || !menu) {
    console.error('❌ Hamburger oder Menu nicht gefunden!');
    return;
  }
  
  console.log('✅ Hamburger und Menu gefunden');
  
  // Remove any existing onclick
  hamburger.removeAttribute('onclick');
  
  // Mobile menu toggle function
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    console.log('📱 Menu toggle:', mobileMenuOpen);
    
    if (mobileMenuOpen) {
      // Open menu
      menu.classList.add('mobile-open');
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';
      hamburger.innerHTML = '✕';
      hamburger.setAttribute('aria-label', 'Menü schließen');
    } else {
      // Close menu
      menu.classList.remove('mobile-open');
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      document.body.style.overflow = '';
      hamburger.innerHTML = '☰';
      hamburger.setAttribute('aria-label', 'Menü öffnen');
    }
  }
  
  // Hamburger click event
  hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('🍔 Hamburger clicked!');
    toggleMobileMenu();
  });
  
  // Overlay click to close
  overlay.addEventListener('click', function() {
    console.log('🌙 Overlay clicked - closing menu');
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  });
  
  // Menu link clicks
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      console.log('🔗 Menu link clicked:', this.href);
      
      // Visual feedback
      this.style.background = 'rgba(255,217,26,0.6)';
      this.style.transform = 'scale(0.95)';
      
      // Close menu after short delay
      setTimeout(() => {
        if (mobileMenuOpen) {
          toggleMobileMenu();
        }
      }, 200);
    });
  });
  
  // Escape key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuOpen) {
      console.log('⌨️ Escape pressed - closing menu');
      toggleMobileMenu();
    }
  });
  
  // Add mobile-specific CSS
  const mobileCSS = document.createElement('style');
  mobileCSS.textContent = `
    @media (max-width: 1024px) {
      .menu.mobile-open {
        transform: translateX(0) !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }
      
      .menu.mobile-open a {
        pointer-events: auto !important;
        cursor: pointer !important;
        display: block !important;
        padding: 18px 24px !important;
        margin: 4px 0 !important;
        border-radius: 12px !important;
        transition: all 0.2s ease !important;
        background: rgba(255,255,255,0.1) !important;
        border: 1px solid rgba(255,217,26,0.3) !important;
      }
      
      .menu.mobile-open a:hover,
      .menu.mobile-open a:active,
      .menu.mobile-open a:focus {
        background: rgba(255,217,26,0.4) !important;
        color: #111 !important;
        transform: translateX(8px) scale(0.98) !important;
        border-color: rgba(255,217,26,0.6) !important;
      }
      
      .hamburger button {
        font-size: 18px !important;
        padding: 12px !important;
        border-radius: 8px !important;
        background: rgba(255,217,26,0.2) !important;
        color: #ffd91a !important;
        border: 1px solid rgba(255,217,26,0.5) !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }
      
      .hamburger button:hover,
      .hamburger button:active {
        background: rgba(255,217,26,0.4) !important;
        transform: scale(0.95) !important;
      }
    }
  `;
  document.head.appendChild(mobileCSS);
  
  console.log('✅ Mobile Navbar vollständig geladen!');
});
