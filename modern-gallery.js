// 🖼️ PACKQUEST PROJEKT GALERIE - Nur existierende Bilder!
class ModernGallery {
  constructor() {
    // NUR BILDER DIE WIRKLICH EXISTIEREN!
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
        src: 'img/IMG-20250925-WA0028.jpg',
        title: 'Möbelmontage Profi',
        description: 'Professioneller Aufbau aller Möbel – schnell und zuverlässig.',
        tags: ['Montage', 'Möbel']
      },
      {
        src: 'img/IMG-20250925-WA0029.jpg',
        title: 'Küchenmontage Premium',
        description: 'Maßgenaue Küchenplanung und professionelle Montage.',
        tags: ['Küche', 'Montage']
      },
      {
        src: 'img/readybilder/klavier_umzug_wien.png',
        title: 'Klaviertransport Wien',
        description: 'Sensible Instrumente sicher transportiert – Ihre Musik in sicheren Händen.',
        tags: ['Klavier', 'Transport']
      },
      {
        src: 'img/readybilder/umzug_wien.png',
        title: 'Umzug Wien Profi',
        description: 'Von A bis Z – komplette Wohnungsumzüge durch unsere Experten.',
        tags: ['Umzug', 'Wien']
      },
      {
        src: 'img/readybilder/räumung_wien.png',
        title: 'Räumung Wien',
        description: 'Professionelle Entrümpelung – besenrein übergeben.',
        tags: ['Räumung', 'Entrümpelung']
      },
      {
        src: 'img/readybilder/lkw_vorher_nachher_1.png',
        title: 'LKW Beladung Vorher-Nachher',
        description: 'Optimale Raumnutzung – Effizienz die sich auszahlt.',
        tags: ['LKW', 'Effizienz']
      },
      {
        src: 'img/readybilder/lkw_vorher_nachher_2.png',
        title: 'Professionelle Beladung',
        description: 'Jeder Zentimeter wird optimal genutzt für Ihren Umzug.',
        tags: ['Beladung', 'Profi']
      },
      {
        src: 'img/IMG-20250828-WA0008.jpg',
        title: 'Wohnungsübergabe',
        description: 'Perfekt vorbereitet für die Schlüsselübergabe.',
        tags: ['Übergabe', 'Sauber']
      },
      {
        src: 'img/IMG-20250828-WA0009.jpg',
        title: 'Komplette Einrichtung',
        description: 'Vollständige Wohnungseinrichtung durch unser erfahrenes Team.',
        tags: ['Einrichtung', 'Komplett']
      },
      {
        src: 'img/IMG-20250828-WA0010.jpg',
        title: 'Präzise Verpackung',
        description: 'Sicher verpackt für den Transport – Schutz für Ihre Wertsachen.',
        tags: ['Verpackung', 'Schutz']
      },
      {
        src: 'img/IMG-20250828-WA0011.jpg',
        title: 'Teamarbeit Umzug',
        description: 'Unser eingespieltes Team arbeitet Hand in Hand.',
        tags: ['Team', 'Zusammenarbeit']
      },
      {
        src: 'img/IMG-20250828-WA0012.jpg',
        title: 'Schwere Möbel',
        description: 'Auch schwere Möbelstücke transportieren wir sicher.',
        tags: ['Schwer', 'Möbel']
      },
      {
        src: 'img/IMG-20250828-WA0013.jpg',
        title: 'Komplettumzug Wien',
        description: 'Von der ersten Kiste bis zum letzten Möbelstück.',
        tags: ['Komplett', 'Wien']
      }
    ];

    this.currentIndex = 0;
    this.isPlaying = false;
    this.intervalId = null;
    
    this.init();
  }

  init() {
    this.createGallery();
    this.bindEvents();
    this.startAutoplay();
    console.log('🖼️ Gallery loaded with', this.images.length, 'images');
  }

  createGallery() {
    const galleryHTML = `
      <div class="modern-gallery">
        <div class="gallery-header">
          <h1>📸 Unsere Projektreferenzen</h1>
          <p>Überzeugen Sie sich von der Qualität unserer Arbeit</p>
        </div>
        
        <div class="gallery-main">
          <div class="gallery-display">
            <div class="image-container">
              <img id="galleryImage" src="${this.images[0].src}" alt="${this.images[0].title}" loading="lazy">
              <div class="image-overlay">
                <h3 id="imageTitle">${this.images[0].title}</h3>
                <p id="imageDescription">${this.images[0].description}</p>
                <div class="image-tags" id="imageTags">
                  ${this.images[0].tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
              </div>
            </div>
            
            <div class="gallery-controls">
              <button class="control-btn prev-btn" id="prevBtn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <div class="gallery-info">
                <span id="imageCounter">${this.currentIndex + 1} / ${this.images.length}</span>
                <button class="play-pause-btn" id="playPauseBtn">
                  <svg class="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <svg class="pause-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="display: none;">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                </button>
              </div>
              
              <button class="control-btn next-btn" id="nextBtn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="gallery-thumbnails">
            <div class="thumbnails-container" id="thumbnailsContainer">
              ${this.images.map((img, index) => `
                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                  <img src="${img.src}" alt="${img.title}" loading="lazy">
                  <div class="thumbnail-overlay">
                    <span>${img.title}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="cta-section">
          <h2>🎯 Überzeugt von unserer Qualität?</h2>
          <p>Lassen Sie uns auch Ihr Projekt zum Erfolg machen!</p>
          <div class="cta-buttons">
            <a href="kontakt.html#anfrage" class="cta-btn primary">
              📞 Jetzt kostenloses Angebot anfordern
            </a>
            <a href="tel:06641101057" class="cta-btn secondary">
              📱 Sofort anrufen: 0664 1101057
            </a>
          </div>
        </div>
      </div>
    `;

    // Insert into page
    const container = document.querySelector('.container') || document.body;
    container.innerHTML = galleryHTML;
  }

  bindEvents() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const thumbnails = document.querySelectorAll('.thumbnail');

    prevBtn.addEventListener('click', () => this.previousImage());
    nextBtn.addEventListener('click', () => this.nextImage());
    playPauseBtn.addEventListener('click', () => this.toggleAutoplay());

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => this.goToImage(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousImage();
      if (e.key === 'ArrowRight') this.nextImage();
      if (e.key === ' ') {
        e.preventDefault();
        this.toggleAutoplay();
      }
    });
  }

  goToImage(index) {
    this.currentIndex = index;
    this.updateDisplay();
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateDisplay();
  }

  previousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateDisplay();
  }

  updateDisplay() {
    const img = this.images[this.currentIndex];
    
    document.getElementById('galleryImage').src = img.src;
    document.getElementById('galleryImage').alt = img.title;
    document.getElementById('imageTitle').textContent = img.title;
    document.getElementById('imageDescription').textContent = img.description;
    document.getElementById('imageCounter').textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    
    // Update tags
    document.getElementById('imageTags').innerHTML = 
      img.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Update thumbnails
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentIndex);
    });
  }

  startAutoplay() {
    this.isPlaying = true;
    this.intervalId = setInterval(() => this.nextImage(), 4000);
    this.updatePlayPauseButton();
  }

  stopAutoplay() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.updatePlayPauseButton();
  }

  toggleAutoplay() {
    if (this.isPlaying) {
      this.stopAutoplay();
    } else {
      this.startAutoplay();
    }
  }

  updatePlayPauseButton() {
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (this.isPlaying) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }
}

// Styles für die Galerie
const galleryStyles = `
<style>
.modern-gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.gallery-header {
  text-align: center;
  margin-bottom: 3rem;
}

.gallery-header h1 {
  font-size: 2.5rem;
  color: #ffd91a;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.gallery-header p {
  font-size: 1.2rem;
  color: #ccc;
}

.gallery-main {
  margin-bottom: 3rem;
}

.gallery-display {
  margin-bottom: 2rem;
}

.image-container {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.image-container img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  padding: 2rem;
  color: white;
}

.image-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ffd91a;
}

.image-overlay p {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.image-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(255,217,26,0.2);
  color: #ffd91a;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255,217,26,0.3);
}

.gallery-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(11,14,20,0.9);
  border-radius: 12px;
  margin-top: 1rem;
}

.control-btn {
  background: rgba(255,217,26,0.2);
  border: 1px solid rgba(255,217,26,0.5);
  color: #ffd91a;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: rgba(255,217,26,0.4);
  transform: scale(1.05);
}

.gallery-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
}

.play-pause-btn {
  background: rgba(31,111,235,0.2);
  border: 1px solid rgba(31,111,235,0.5);
  color: #1f6feb;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.play-pause-btn:hover {
  background: rgba(31,111,235,0.4);
}

.gallery-thumbnails {
  background: rgba(11,14,20,0.5);
  border-radius: 12px;
  padding: 1rem;
}

.thumbnails-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.thumbnail {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail.active {
  border-color: #ffd91a;
  transform: scale(1.05);
}

.thumbnail img {
  width: 100%;
  height: 80px;
  object-fit: cover;
}

.thumbnail-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  padding: 0.5rem;
  color: white;
  font-size: 0.8rem;
}

.cta-section {
  text-align: center;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  padding: 3rem 2rem;
  border-radius: 16px;
  border: 2px solid rgba(255,217,26,0.3);
}

.cta-section h2 {
  color: #ffd91a;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  border: 2px solid;
}

.cta-btn.primary {
  background: linear-gradient(135deg, #ffd91a, #ffed4a);
  color: #111;
  border-color: #ffd91a;
}

.cta-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255,217,26,0.4);
}

.cta-btn.secondary {
  background: transparent;
  color: #1f6feb;
  border-color: #1f6feb;
}

.cta-btn.secondary:hover {
  background: rgba(31,111,235,0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .modern-gallery {
    padding: 1rem;
  }
  
  .gallery-header h1 {
    font-size: 2rem;
  }
  
  .image-container img {
    height: 250px;
  }
  
  .gallery-controls {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .thumbnails-container {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
`;

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add styles to head
  document.head.insertAdjacentHTML('beforeend', galleryStyles);
  
  // Initialize gallery
  new ModernGallery();
  
  console.log('✅ ModernGallery initialisiert - Nur existierende Bilder!');
});