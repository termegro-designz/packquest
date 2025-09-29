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
    // Remove all onclick handlers and replace with our system
    const hamburgerButtons = document.querySelectorAll('.hamburger button');
    
    hamburgerButtons.forEach(button => {
      // Get menu ID from onclick attribute
      const onclickAttr = button.getAttribute('onclick');
      if (onclickAttr) {
        const menuId = onclickAttr.match(/getElementById\('([^']+)'\)/)?.[1];
        
        // Remove old onclick
        button.removeAttribute('onclick');
        
        // Add new event listener
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const menu = document.getElementById(menuId);
          if (menu) {
            this.toggleMenu(menu);
          }
        });
      }
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
    // Direkte Navigation - Links sollen normal funktionieren
    document.addEventListener('click', (e) => {
      const navLink = e.target.closest('.menu a');
      
      if (navLink && this.isOpen) {
        // Prüfe ob es ein interner Link ist
        const href = navLink.getAttribute('href');
        
        if (href && !href.startsWith('#')) {
          // Externer/Page Link - Menu schließen und navigieren
          this.closeMenu();
          // Browser navigiert automatisch durch den Link
        } else if (href && href.startsWith('#')) {
          // Anker Link - Menu schließen aber auf gleicher Seite bleiben
          setTimeout(() => {
            this.closeMenu();
          }, 100);
        }
      }
    });

    // Touch feedback
    document.addEventListener('touchstart', (e) => {
      const navLink = e.target.closest('.menu a');
      if (navLink && this.isOpen) {
        // Visuelles Touch-Feedback
        navLink.style.background = 'rgba(255,217,26,0.4)';
        navLink.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
          navLink.style.background = '';
          navLink.style.transform = '';
        }, 200);
      }
    });
    
    // Stelle sicher, dass Links wirklich klickbar sind
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
      link.style.pointerEvents = 'auto';
      link.style.position = 'relative';
      link.style.zIndex = '1003';
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileNavigation();
});
