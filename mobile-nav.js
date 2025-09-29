// 📱 Mobile Navigation Handler
class MobileNavigation {
  constructor() {
    this.overlay = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    // Create overlay element
    this.createOverlay();
    
    // Add event listeners to all hamburger buttons
    this.initHamburgerButtons();
    
    // Add navigation link listeners for mobile
    this.initMobileNavLinks();
    
    // Add escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'nav-overlay';
    this.overlay.addEventListener('click', () => this.closeMenu());
    document.body.appendChild(this.overlay);
  }

  initHamburgerButtons() {
    // Find all hamburger buttons and menu elements
    const hamburgerButtons = document.querySelectorAll('.hamburger button');
    
    hamburgerButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the corresponding menu
        const menuId = button.getAttribute('onclick')?.match(/getElementById\('([^']+)'\)/)?.[1];
        if (menuId) {
          const menu = document.getElementById(menuId);
          if (menu) {
            this.toggleMenu(menu);
          }
        }
      });
    });
  }

  toggleMenu(menu) {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu(menu);
    }
  }

  openMenu(menu) {
    this.isOpen = true;
    menu.classList.add('open');
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add close button if it doesn't exist
    if (!menu.querySelector('.menu-close')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'menu-close';
      closeBtn.innerHTML = '×';
      closeBtn.addEventListener('click', () => this.closeMenu());
      menu.appendChild(closeBtn);
    }
  }

  closeMenu() {
    this.isOpen = false;
    const openMenus = document.querySelectorAll('.menu.open');
    openMenus.forEach(menu => menu.classList.remove('open'));
    this.overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  initMobileNavLinks() {
    // Direkte Navigation ohne Event-Prevention
    document.addEventListener('click', (e) => {
      const navLink = e.target.closest('.menu a');
      if (navLink && this.isOpen) {
        // Visuelles Feedback
        navLink.style.background = 'rgba(255,217,26,0.3)';
        
        // Menu nach kurzer Verzögerung schließen (für Animation)
        setTimeout(() => {
          this.closeMenu();
        }, 150);
        
        // Link normal funktionieren lassen (nicht preventDefault!)
      }
    });

    // Touch feedback für mobile
    document.addEventListener('touchstart', (e) => {
      const navLink = e.target.closest('.menu a');
      if (navLink) {
        navLink.style.background = 'rgba(31,111,235,0.3)';
        setTimeout(() => {
          navLink.style.background = '';
        }, 200);
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileNavigation();
});
