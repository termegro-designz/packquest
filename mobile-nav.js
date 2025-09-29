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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileNavigation();
});
