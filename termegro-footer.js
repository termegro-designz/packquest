/**
 * 🚀 PREMIUM TERMEGRO DESIGNS FOOTER
 * Professioneller Footer mit Animationen und Logo
 */

class TermegroFooter {
  constructor() {
    this.initialized = false;
    this.init();
  }

  init() {
    if (this.initialized) return;
    
    this.createFooter();
    this.addStyles();
    this.bindAnimations();
    
    this.initialized = true;
    console.log('🚀 TERMEGRO DESIGNS Premium Footer geladen!');
  }

  createFooter() {
    // Footer HTML mit Logo und Animationen
    const footerHTML = `
      <footer id="termegroFooter" class="termegro-footer">
        <div class="footer-container">
          
          <!-- TERMEGRO DESIGNS BRANDING SECTION -->
          <div class="termegro-brand-section">
            <div class="termegro-logo-container">
              ${this.getTermegroLogo()}
              <div class="brand-text">
                <h2 class="brand-title">TERMEGRO DESIGNS</h2>
                <p class="brand-tagline">Premium Web Development & Digital Solutions</p>
              </div>
            </div>
            
            <div class="brand-description">
              <p>Spezialisiert auf moderne Webentwicklung, Gaming-Lösungen und digitale Innovationen. 
              Von der Konzeption bis zur Umsetzung - wir bringen Ihre digitalen Visionen zum Leben.</p>
            </div>
          </div>

          <!-- SERVICES SHOWCASE -->
          <div class="services-showcase">
            <h3>Unsere Expertise</h3>
            <div class="services-grid">
              <div class="service-item" data-service="web">
                <div class="service-icon">🌐</div>
                <span>Web Development</span>
              </div>
              <div class="service-item" data-service="game">
                <div class="service-icon">🎮</div>
                <span>Gaming Solutions</span>
              </div>
              <div class="service-item" data-service="ui">
                <div class="service-icon">🎨</div>
                <span>UI/UX Design</span>
              </div>
              <div class="service-item" data-service="mobile">
                <div class="service-icon">📱</div>
                <span>Mobile Apps</span>
              </div>
              <div class="service-item" data-service="performance">
                <div class="service-icon">⚡</div>
                <span>Performance</span>
              </div>
              <div class="service-item" data-service="seo">
                <div class="service-icon">📈</div>
                <span>SEO Optimization</span>
              </div>
            </div>
          </div>

          <!-- CONTACT SECTION -->
          <div class="contact-section">
            <h3>Kontakt aufnehmen</h3>
            <div class="contact-methods">
              <a href="https://wa.me/4368110608125" class="contact-method whatsapp" target="_blank">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
                  </svg>
                </div>
                <div class="contact-text">
                  <span class="contact-label">WhatsApp</span>
                  <span class="contact-value">+43 681 10608125</span>
                </div>
              </a>
              
              <a href="mailto:termegro.office@gmail.com" class="contact-method email">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div class="contact-text">
                  <span class="contact-label">E-Mail</span>
                  <span class="contact-value">termegro.office@gmail.com</span>
                </div>
              </a>
            </div>
            
            <div class="availability-notice">
              <span class="availability-indicator"></span>
              <span>Nur per WhatsApp oder E-Mail erreichbar</span>
            </div>
          </div>

          <!-- FLOATING PARTICLES -->
          <div class="particle-container">
            <div class="particle" style="--delay: 0s; --duration: 8s;"></div>
            <div class="particle" style="--delay: 2s; --duration: 12s;"></div>
            <div class="particle" style="--delay: 4s; --duration: 10s;"></div>
            <div class="particle" style="--delay: 6s; --duration: 14s;"></div>
          </div>

        </div>
        
        <!-- COPYRIGHT BAR -->
        <div class="copyright-bar">
          <div class="copyright-container">
            <span>&copy; 2025 TERMEGRO DESIGNS. Alle Rechte vorbehalten.</span>
            <span class="powered-by">Powered by Innovation & Passion</span>
          </div>
        </div>
      </footer>
    `;

    // Füge Footer vor dem schließenden </body> Tag ein
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  getTermegroLogo() {
    return `
      <div class="termegro-logo">
        <img src="img/termegro_designs_logo.svg" alt="TERMEGRO DESIGNS Logo" />
      </div>
    `;
  }

  addStyles() {
    const styles = `
      <style id="termegroFooterStyles">
        .termegro-footer {
          background: linear-gradient(135deg, 
            rgba(26,26,42,0.98) 0%, 
            rgba(17,17,30,0.98) 50%, 
            rgba(11,14,20,0.98) 100%);
          border-top: 3px solid;
          border-image: linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1) 1;
          position: relative;
          overflow: hidden;
          padding: 60px 0 0;
          margin-top: 60px;
          backdrop-filter: blur(10px);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 60px;
          position: relative;
          z-index: 2;
        }

        /* TERMEGRO BRANDING */
        .termegro-brand-section {
          text-align: left;
        }

        .termegro-logo-container {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .termegro-logo {
          width: 80px;
          height: 80px;
          animation: logoFloat 4s ease-in-out infinite;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 217, 26, 0.2);
          transition: all 0.3s ease;
          filter: drop-shadow(0 8px 25px rgba(9, 84, 35, 0.3));
        }

        .termegro-logo:hover {
          transform: scale(1.05) rotate(2deg);
          border-color: rgba(255, 217, 26, 0.6);
          filter: drop-shadow(0 12px 35px rgba(9, 84, 35, 0.5));
        }

        .termegro-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .termegro-logo:hover img {
          transform: scale(1.05);
        }

        .brand-text .brand-title {
          font-size: 28px;
          font-weight: 900;
          background: linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 8px 0;
          text-shadow: 0 0 20px rgba(255,107,107,0.3);
          animation: titleShine 3s ease-in-out infinite;
        }

        .brand-tagline {
          color: #B8B8D1;
          font-size: 14px;
          font-weight: 500;
          margin: 0;
          opacity: 0.9;
        }

        .brand-description {
          color: #9B9BB7;
          line-height: 1.6;
          font-size: 15px;
          max-width: 350px;
        }

        /* SERVICES SHOWCASE */
        .services-showcase h3 {
          color: #4ECDC4;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .service-item {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(76,205,196,0.2);
          border-radius: 12px;
          padding: 16px 12px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .service-item::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(76,205,196,0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.6s ease;
          opacity: 0;
        }

        .service-item:hover::before {
          opacity: 1;
          animation: shimmer 1.5s ease-in-out;
        }

        .service-item:hover {
          transform: translateY(-4px);
          border-color: rgba(76,205,196,0.6);
          box-shadow: 0 8px 25px rgba(76,205,196,0.2);
        }

        .service-icon {
          font-size: 24px;
          margin-bottom: 8px;
          animation: iconBob 2s ease-in-out infinite;
        }

        .service-item span {
          color: #E8E8F3;
          font-size: 12px;
          font-weight: 600;
        }

        /* CONTACT SECTION */
        .contact-section h3 {
          color: #45B7D1;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .contact-method {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(69,183,209,0.2);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .contact-method::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }

        .contact-method:hover::after {
          left: 100%;
        }

        .contact-method:hover {
          transform: translateX(8px);
          border-color: rgba(69,183,209,0.6);
          box-shadow: 0 4px 15px rgba(69,183,209,0.2);
        }

        .contact-method.whatsapp:hover {
          border-color: rgba(37,211,102,0.6);
          box-shadow: 0 4px 15px rgba(37,211,102,0.2);
        }

        .contact-icon {
          width: 24px;
          height: 24px;
          color: #4ECDC4;
        }

        .contact-method.whatsapp .contact-icon {
          color: #25D366;
        }

        .contact-text {
          display: flex;
          flex-direction: column;
        }

        .contact-label {
          color: #B8B8D1;
          font-size: 12px;
          font-weight: 500;
        }

        .contact-value {
          color: #E8E8F3;
          font-size: 14px;
          font-weight: 600;
        }

        .availability-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          color: #9B9BB7;
          font-size: 12px;
          font-style: italic;
        }

        .availability-indicator {
          width: 8px;
          height: 8px;
          background: #4ECDC4;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        /* PARTICLES */
        .particle-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #4ECDC4, transparent);
          border-radius: 50%;
          animation: particleFloat var(--duration) linear infinite;
          animation-delay: var(--delay);
          opacity: 0.6;
        }

        /* COPYRIGHT BAR */
        .copyright-bar {
          background: rgba(11,14,20,0.95);
          border-top: 1px solid rgba(76,205,196,0.2);
          padding: 20px 0;
          margin-top: 60px;
        }

        .copyright-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #9B9BB7;
          font-size: 14px;
        }

        .powered-by {
          font-style: italic;
          opacity: 0.8;
        }

        /* ANIMATIONS */
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes logoPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }

        @keyframes logoGlow {
          0% { filter: drop-shadow(0 0 5px rgba(255,255,255,0.3)); }
          100% { filter: drop-shadow(0 0 15px rgba(255,255,255,0.8)); }
        }

        @keyframes logoSparkle {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes titleShine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(300%) rotate(45deg); }
        }

        @keyframes iconBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        @keyframes particleFloat {
          0% { 
            transform: translateY(100vh) translateX(0px); 
            opacity: 0; 
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { 
            transform: translateY(-20px) translateX(100px); 
            opacity: 0; 
          }
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          
          .termegro-brand-section {
            grid-column: 1 / -1;
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 0 16px;
          }
          
          .termegro-logo-container {
            justify-content: center;
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
          
          .brand-text .brand-title {
            font-size: 24px;
          }
          
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          
          .service-item {
            padding: 12px 8px;
          }
          
          .service-icon {
            font-size: 20px;
          }
          
          .service-item span {
            font-size: 10px;
          }
          
          .copyright-container {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }

  bindAnimations() {
    // Service Item Hover Effects
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.animationPlayState = 'paused';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.animationPlayState = 'running';
      });
    });

    // Logo Click Animation
    const logo = document.querySelector('.termegro-logo');
    if (logo) {
      logo.addEventListener('click', () => {
        logo.style.animation = 'none';
        setTimeout(() => {
          logo.style.animation = 'logoFloat 4s ease-in-out infinite';
        }, 10);
      });
    }

    // Parallax Particles on Scroll
    window.addEventListener('scroll', () => {
      const particles = document.querySelectorAll('.particle');
      const scrolled = window.pageYOffset;
      
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });

    console.log('✨ Footer Animationen aktiviert!');
  }

  // Public method to trigger special animations
  celebrateContact() {
    const footer = document.getElementById('termegroFooter');
    if (footer) {
      footer.style.animation = 'none';
      footer.style.borderImage = 'linear-gradient(90deg, #FF6B6B, #FFD93D, #4ECDC4, #45B7D1, #9B59B6) 1';
      
      setTimeout(() => {
        footer.style.borderImage = 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1) 1';
      }, 2000);
    }
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new TermegroFooter();
});

// Export for external use
window.TermegroFooter = TermegroFooter;

console.log('🚀 TERMEGRO DESIGNS Footer System geladen!');
