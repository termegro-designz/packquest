/**
 * 📱 PACKQUEST MOBILE NAVBAR - 100% FUNKTIONAL
 * Einfaches System das garantiert funktioniert
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Mobile Navbar initialisiert');
  
  // Mobile Navigation State
  let mobileMenuOpen = false;
  
  // KEIN OVERLAY! Das blockiert die Klicks!
  
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
      // Open menu - OHNE OVERLAY!
      menu.classList.add('mobile-open');
      document.body.style.overflow = 'hidden';
      hamburger.innerHTML = '✕';
      hamburger.setAttribute('aria-label', 'Menü schließen');
    } else {
      // Close menu
      menu.classList.remove('mobile-open');
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
  
  // Click outside menu to close
  document.addEventListener('click', function(e) {
    if (mobileMenuOpen && !menu.contains(e.target) && !hamburger.contains(e.target)) {
      console.log('🌙 Clicked outside menu - closing');
      toggleMobileMenu();
    }
  });
  
  // Menu link clicks - DIREKTES HANDLING
  function setupMenuLinks() {
    const menuLinks = menu.querySelectorAll('a');
    console.log('🔗 Found', menuLinks.length, 'menu links');
    
    menuLinks.forEach((link, index) => {
      // Remove any existing listeners
      link.removeEventListener('click', handleLinkClick);
      
      // Add fresh listener
      link.addEventListener('click', handleLinkClick);
      
      // Force clickable styles
      link.style.pointerEvents = 'auto';
      link.style.zIndex = '1006';
      link.style.position = 'relative';
      
      console.log(`📎 Link ${index + 1} setup:`, link.textContent.trim());
    });
  }
  
  function handleLinkClick(e) {
    console.log('🎯 LINK CLICKED:', this.href, this.textContent.trim());
    
    // Visual feedback
    this.style.background = 'rgba(255,217,26,0.8)';
    this.style.color = '#111';
    this.style.transform = 'scale(0.95)';
    
    // Close menu immediately
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
    
    // Let browser handle navigation normally
    // DON'T prevent default!
  }
  
  // Setup links initially
  setupMenuLinks();
  
  // Escape key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuOpen) {
      console.log('⌨️ Escape pressed - closing menu');
      toggleMobileMenu();
    }
  });
  
  // Einfaches mobiles CSS - KEIN OVERLAY!
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
        padding: 20px 24px !important;
        margin: 6px 0 !important;
        border-radius: 12px !important;
        transition: all 0.2s ease !important;
        background: rgba(255,255,255,0.08) !important;
        border: 1px solid rgba(255,217,26,0.4) !important;
        color: #fff !important;
      }
      
      .menu.mobile-open a:hover,
      .menu.mobile-open a:active,
      .menu.mobile-open a:focus {
        background: rgba(255,217,26,0.6) !important;
        color: #111 !important;
        transform: translateX(8px) !important;
        border-color: rgba(255,217,26,0.8) !important;
      }
      
      .hamburger button {
        font-size: 20px !important;
        padding: 14px !important;
        border-radius: 8px !important;
        background: rgba(255,217,26,0.2) !important;
        color: #ffd91a !important;
        border: 2px solid rgba(255,217,26,0.5) !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }
      
      .hamburger button:hover,
      .hamburger button:active {
        background: rgba(255,217,26,0.5) !important;
        transform: scale(0.95) !important;
      }
    }
  `;
  document.head.appendChild(mobileCSS);
  
  console.log('✅ Mobile Navbar vollständig geladen!');
});
