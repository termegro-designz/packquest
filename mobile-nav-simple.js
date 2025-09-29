// 📱 Einfache Mobile Navigation - Funktioniert garantiert!
document.addEventListener('DOMContentLoaded', function() {
  
  // Create overlay for mobile menu
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.addEventListener('click', closeMobileMenu);
  document.body.appendChild(overlay);
  
  // Mobile menu close function
  function closeMobileMenu() {
    const openMenus = document.querySelectorAll('.menu.open');
    openMenus.forEach(menu => {
      menu.classList.remove('open');
    });
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove any close buttons
    document.querySelectorAll('.menu-close').forEach(btn => btn.remove());
  }
  
  // Enhance all hamburger buttons
  const hamburgerButtons = document.querySelectorAll('.hamburger button');
  hamburgerButtons.forEach(button => {
    const originalOnclick = button.getAttribute('onclick');
    
    button.addEventListener('click', function(e) {
      // Execute original onclick logic
      if (originalOnclick) {
        try {
          eval(originalOnclick);
        } catch (err) {
          console.warn('Onclick execution failed:', err);
        }
      }
      
      // Add our enhancements
      const menu = document.querySelector('.menu.open');
      if (menu) {
        // Menu was opened
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add close button
        if (!menu.querySelector('.menu-close')) {
          const closeBtn = document.createElement('button');
          closeBtn.className = 'menu-close';
          closeBtn.innerHTML = '✕';
          closeBtn.onclick = closeMobileMenu;
          menu.appendChild(closeBtn);
        }
      } else {
        // Menu was closed
        closeMobileMenu();
      }
    });
  });
  
  // Make sure nav links work in mobile menu
  document.addEventListener('click', function(e) {
    const navLink = e.target.closest('.menu a');
    
    if (navLink) {
      const menu = navLink.closest('.menu');
      const isOpen = menu && menu.classList.contains('open');
      
      if (isOpen) {
        // Visual feedback
        navLink.style.background = 'rgba(255,217,26,0.4)';
        navLink.style.color = '#111';
        
        // Close menu after navigation
        setTimeout(closeMobileMenu, 100);
      }
    }
  });
  
  // Escape key support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
  
});
