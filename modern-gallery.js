// Moderne Galerie für PackQuest Projekte
class ModernGallery {
  constructor() {
    this.images = [
      {
        src: 'img/IMG-20250925-WA0022.jpg',
        title: 'Professioneller Umzug Wien',
        description: 'Sorgfältig verpackt, sicher transportiert – Ihr Umzug in besten Händen.',
        tags: ['Umzug', 'Wien']
      },
      {
        src: 'img/IMG-20250925-WA0027.jpg',
        title: 'Optimale LKW-Beladung',
        description: 'Platzsparend beladen – spart Zeit, Nerven und Ihr Geld.',
        tags: ['Transport', 'LKW']
      },
      {
        src: 'img/IMG-20250925-WA0023.jpg',
        title: 'Saubere Entrümpelung',
        description: 'Besenrein übergeben – Hausverwaltungen vertrauen uns.',
        tags: ['Entrümpelung', 'Sauber']
      },
      {
        src: 'img/readybilder/IMG-20240923-WA0089.jpg',
        title: 'Möbelmontage IKEA',
        description: 'Professioneller Aufbau aller IKEA-Möbel – schnell und zuverlässig.',
        tags: ['Montage', 'IKEA']
      },
      {
        src: 'img/readybilder/IMG-20240923-WA0090.jpg',
        title: 'Küchenmontage Komplett',
        description: 'Von der Demontage bis zum fertigen Aufbau – alles aus einer Hand.',
        tags: ['Küche', 'Montage']
      },
      {
        src: 'img/readybilder/IMG-20240923-WA0091.jpg',
        title: 'Schwertransport Klavier',
        description: 'Empfindliche Güter transportieren wir mit spezieller Sorgfalt.',
        tags: ['Klavier', 'Schwertransport']
      },
      {
        src: 'img/readybilder/IMG-20240923-WA0092.jpg',
        title: 'Verpackungsservice',
        description: 'Professionelles Verpacken für maximalen Schutz Ihrer Sachen.',
        tags: ['Verpackung', 'Schutz']
      },
      {
        src: 'img/readybilder/IMG-20240923-WA0093.jpg',
        title: 'Firmenumzug Wien',
        description: 'Büroumzüge über Nacht oder am Wochenende – ohne Betriebsunterbrechung.',
        tags: ['Büro', 'Firma']
      },
      {
        src: 'img/readybilder/IMG-20240923-WA0094.jpg',
        title: 'Seniorenumzug Betreuung',
        description: 'Einfühlsam und geduldig – wir nehmen uns Zeit für Ihre Bedürfnisse.',
        tags: ['Senioren', 'Betreuung']
      },
      {
        src: 'img/readybilder/IMG-20240923-WA0095.jpg',
        title: 'Möbellift Service',
        description: 'Schwere Möbel? Kein Problem mit unserem Außenaufzug-Service.',
        tags: ['Möbellift', 'Schwer']
      },
      {
        src: 'neue_fotos/IMG-20240923-WA0096.jpg',
        title: 'Lagerung Zwischenlager',
        description: 'Sichere Zwischenlagerung in unserem klimatisierten Lager.',
        tags: ['Lager', 'Lagerung']
      },
      {
        src: 'neue_fotos/IMG-20240923-WA0097.jpg',
        title: 'Komplettservice Wien',
        description: 'Rundum-sorglos-Paket: Von der Planung bis zur Endabnahme.',
        tags: ['Komplett', 'Service']
      }
    ];
    
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isAutoPlaying = true;
    
    this.init();
  }
  
  init() {
    this.createGalleryCSS();
    this.renderThumbnails();
    this.bindEvents();
    this.updateDisplay();
    this.startAutoPlay();
  }
  
  createGalleryCSS() {
    const style = document.createElement('style');
    style.textContent = `
      .modern-gallery {
        max-width: 1000px;
        margin: 0 auto;
        background: linear-gradient(135deg, rgba(15, 19, 27, 0.95), rgba(31, 35, 50, 0.9));
        border-radius: 20px;
        padding: 24px;
        border: 2px solid rgba(31,111,235,0.3);
        box-shadow: 0 15px 35px rgba(0,0,0,0.4);
      }
      
      .gallery-main {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 24px;
        margin-bottom: 20px;
      }
      
      .main-image-container {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        background: #000;
      }
      
      .main-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        display: block;
        transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .image-counter {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(0,0,0,0.8);
        color: #fff;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        backdrop-filter: blur(4px);
      }
      
      .navigation-arrows {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        pointer-events: none;
      }
      
      .nav-arrow {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: rgba(0,0,0,0.7);
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s ease;
        pointer-events: auto;
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .nav-arrow:hover {
        background: rgba(31,111,235,0.8);
        transform: scale(1.1);
      }
      
      .image-info {
        padding: 20px;
        background: rgba(255,255,255,0.02);
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      
      .image-info h3 {
        margin: 0 0 12px;
        color: #ffd91a;
        font-size: 18px;
        font-weight: bold;
      }
      
      .image-info p {
        margin: 0 0 16px;
        color: #e6edf3;
        line-height: 1.5;
        font-size: 14px;
      }
      
      .image-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      
      .tag {
        background: linear-gradient(135deg, #1f6feb, #0969da);
        color: #fff;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: bold;
      }
      
      .thumbnail-strip {
        overflow: hidden;
        border-radius: 12px;
      }
      
      .thumbnails {
        display: flex;
        gap: 8px;
        padding: 12px;
        background: rgba(255,255,255,0.05);
        overflow-x: auto;
        scroll-behavior: smooth;
      }
      
      .thumbnails::-webkit-scrollbar {
        height: 4px;
      }
      
      .thumbnails::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.1);
        border-radius: 2px;
      }
      
      .thumbnails::-webkit-scrollbar-thumb {
        background: #ffd91a;
        border-radius: 2px;
      }
      
      .thumbnail {
        min-width: 80px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        opacity: 0.7;
      }
      
      .thumbnail.active {
        border-color: #ffd91a;
        opacity: 1;
        transform: scale(1.05);
      }
      
      .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      /* Mobile Responsive */
      @media (max-width: 768px) {
        .gallery-main {
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        .image-info {
          padding: 16px;
        }
        
        .main-image {
          height: 300px;
        }
        
        .nav-arrow {
          width: 40px;
          height: 40px;
          font-size: 20px;
        }
        
        .modern-gallery {
          padding: 16px;
        }
      }
      
      @media (max-width: 480px) {
        .main-image {
          height: 250px;
        }
        
        .thumbnail {
          min-width: 60px;
          height: 45px;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  renderThumbnails() {
    const thumbnailsContainer = document.getElementById('thumbnails');
    if (!thumbnailsContainer) return;
    
    thumbnailsContainer.innerHTML = this.images.map((image, index) => `
      <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
        <img src="${image.src}" alt="${image.title}" loading="lazy" />
      </div>
    `).join('');
  }
  
  bindEvents() {
    // Navigation Arrows
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.previous());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    
    // Thumbnail Clicks
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previous();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === ' ') {
        e.preventDefault();
        this.toggleAutoPlay();
      }
    });
    
    // Pause on hover
    const gallery = document.getElementById('modernGallery');
    if (gallery) {
      gallery.addEventListener('mouseenter', () => this.pauseAutoPlay());
      gallery.addEventListener('mouseleave', () => this.resumeAutoPlay());
    }
    
    // Touch/Swipe Support
    this.addTouchSupport();
  }
  
  addTouchSupport() {
    const mainImage = document.getElementById('mainImage');
    if (!mainImage) return;
    
    let startX = 0;
    let startY = 0;
    
    mainImage.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });
    
    mainImage.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // Nur horizontale Swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.previous();
        } else {
          this.next();
        }
      }
    });
  }
  
  updateDisplay() {
    const image = this.images[this.currentIndex];
    if (!image) return;
    
    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = image.src;
        mainImage.alt = image.title;
        mainImage.style.opacity = '1';
      }, 200);
    }
    
    // Update info
    const title = document.getElementById('imageTitle');
    const description = document.getElementById('imageDescription');
    const tag1 = document.getElementById('imageTag1');
    const tag2 = document.getElementById('imageTag2');
    
    if (title) title.textContent = image.title;
    if (description) description.textContent = image.description;
    if (tag1) tag1.textContent = image.tags[0];
    if (tag2) tag2.textContent = image.tags[1] || '';
    
    // Update counter
    const currentNumber = document.getElementById('currentImageNumber');
    const totalImages = document.getElementById('totalImages');
    
    if (currentNumber) currentNumber.textContent = this.currentIndex + 1;
    if (totalImages) totalImages.textContent = this.images.length;
    
    // Update thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentIndex);
    });
    
    // Scroll thumbnail into view
    const activeThumbnail = document.querySelector('.thumbnail.active');
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest', 
        inline: 'center' 
      });
    }
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateDisplay();
  }
  
  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateDisplay();
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateDisplay();
  }
  
  startAutoPlay() {
    this.pauseAutoPlay();
    if (this.isAutoPlaying) {
      this.autoPlayInterval = setInterval(() => {
        this.next();
      }, 5000);
    }
  }
  
  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  resumeAutoPlay() {
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }
  
  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    } else {
      this.pauseAutoPlay();
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ModernGallery();
});
