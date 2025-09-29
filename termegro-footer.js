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
        <svg viewBox="0 0 646 762" xmlns="http://www.w3.org/2000/svg">
          <!-- ORIGINAL TERMEGRO DESIGNS LOGO -->
          <defs>
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Original Logo Paths -->
          <path d="M0 0 C213.18 0 426.36 0 646 0 C646 251.46 646 502.92 646 762 C432.82 762 219.64 762 0 762 C0 510.54 0 259.08 0 0 Z " fill="#095423" transform="translate(0,0)" class="logo-bg"/>
          <path d="M0 0 C3.16310761 1.36322483 4.90573236 2.7765657 6.99609375 5.5 C7.54813477 6.21317383 8.10017578 6.92634766 8.66894531 7.66113281 C9.25256836 8.43295898 9.83619141 9.20478516 10.4375 10 C11.05077148 10.80018555 11.66404297 11.60037109 12.29589844 12.42480469 C16.52673683 17.97547363 20.66060685 23.59458643 24.75 29.25 C25.28794189 29.98774658 25.82588379 30.72549316 26.38012695 31.4855957 C28.93416408 35.01453369 31.37865265 38.55822996 33.6484375 42.27734375 C37.45734882 49.00983474 37.45734882 49.00983474 43.81640625 52.671875 C46.73314989 52.43377348 49.19735134 51.82760096 52 51 C57.81189066 49.94458918 63.48887933 49.81506632 69.375 49.8125 C70.34018555 49.8024292 71.30537109 49.7923584 72.29980469 49.78198242 C77.77222108 49.78062742 82.76037884 50.2453711 88.10522461 51.38232422 C91.62929194 52.08914341 94.38369256 52.35034195 98 52 C101.98273506 48.97333989 104.30797601 45.29264725 106.78125 41.03857422 C108.91706664 37.46604438 111.3897847 34.13132397 113.8125 30.75 C114.81913266 29.3125856 115.82564137 27.87508439 116.83203125 26.4375 C121.5799458 19.72683549 126.59529444 13.21218772 131.65234375 6.73242188 C132.86647702 5.17164476 134.05959054 3.59457089 135.25 2.015625 C135.8275 1.35046875 136.405 0.6853125 137 0 C137.66 0 138.32 0 139 0 C151.88691761 23.70567376 161.37034013 45.85426784 165.08154297 72.6315918 C168.50735296 97.23022337 178.71320945 124.52684811 198.81689453 140.43798828 C201.91834233 142.74511519 205.0835637 144.94217626 208.2890625 147.1015625 C209.18367188 147.72804687 210.07828125 148.35453125 211 149 C211 149.33 211 149.66 211 150 C193.20103598 150.90503207 177.56354858 143.42995279 163 134 C162.34 133.67 161.68 133.34 161 133 C168.5670857 146.33323659 176.4723156 158.45926871 186.95703125 169.74609375 C188.34204609 171.27411204 189.67248435 172.85307134 190.94921875 174.47265625 C193.13937931 177.17176841 195.50934163 179.57852659 198 182 C197.05870239 182.02187378 197.05870239 182.02187378 196.09838867 182.04418945 C158.2219387 183.0205111 120.56837992 191.20717079 90.22265625 215.25 C88 217 88 217 86 218 C86.01571045 216.81784912 86.0314209 215.63569824 86.04760742 214.41772461 C86.43946936 182.06221782 86.17014794 151.44839607 73.33203125 121.19921875 C72.06975221 118.16752804 70.99825777 115.12724353 70 112 C69.34 112 68.68 112 68 112 C67.443125 113.7325 67.443125 113.7325 66.875 115.5 C65.66244436 119.18938729 64.28891303 122.78577155 62.84521484 126.39038086 C60.24841503 132.97471826 58.21854218 139.50998277 56.75 146.4375 C56.59926025 147.13858887 56.44852051 147.83967773 56.29321289 148.56201172 C53.11602534 164.55701444 52.73726094 180.30799208 52.875 196.5625 C52.88506058 198.65299045 52.89418093 200.74348565 52.90234375 202.83398438 C52.92408876 207.88944296 52.95844494 212.94466705 53 218 C49.1049698 215.79714717 45.42919826 213.66238533 41.875 210.9375 C28.91918868 201.77363346 14.0695484 194.87032624 -1 190 C-2.70349609 189.43539062 -2.70349609 189.43539062 -4.44140625 188.859375 C-21.95001139 183.6165748 -40.81993543 182.67333572 -59 182 C-56.88820551 179.27132738 -55.03081544 177.0243657 -52.3125 174.875 C-39.02312495 164.11693449 -29.47924893 146.62363222 -21 132 C-24.16008428 133.48197056 -26.93186043 135.28532416 -29.8125 137.25 C-42.51025289 145.37656185 -57.82501406 150.9064704 -73 150 C-70.64661317 147.4504976 -68.17080184 145.34426692 -65.375 143.3125 C-39.87529689 124.28216601 -29.94523418 97.81554903 -25.48120117 67.18115234 C-23.76951984 55.61095997 -20.89081146 44.90442676 -16.5 34.0625 C-16.07219238 32.99652588 -15.64438477 31.93055176 -15.20361328 30.83227539 C-10.8326454 20.18583519 -5.58771475 10.05179553 0 0 Z " fill="#E1E4D9" transform="translate(261,32)" class="logo-element"/>
          <path d="M0 0 C212.85 0 425.7 0 645 0 C645 14.19 645 28.38 645 43 C432.15 43 219.3 43 0 43 C0 28.81 0 14.62 0 0 Z " fill="#DEE1D6" transform="translate(0,678)" class="logo-element"/>
          <path d="M0 0 C212.85 0 425.7 0 645 0 C645 13.53 645 27.06 645 41 C432.15 41 219.3 41 0 41 C0 27.47 0 13.94 0 0 Z " fill="#93271D" transform="translate(0,721)" class="logo-element"/>
          <path d="M0 0 C0.680625 -0.01417969 1.36125 -0.02835938 2.0625 -0.04296875 C4 0.1875 4 0.1875 7 2.1875 C7 3.1775 7 4.1675 7 5.1875 C3.5962478 7.45666813 1.01789311 7.85770855 -2.94140625 8.52734375 C-5.3723586 9.0712067 -5.3723586 9.0712067 -7 12.1875 C-7.2813129 15.41630763 -7.2813129 15.41630763 -7.1875 19 C-7.17783203 20.80404297 -7.17783203 20.80404297 -7.16796875 22.64453125 C-7.01321998 25.90865056 -6.61369191 28.98157346 -6 32.1875 C-5.06933716 31.65008179 -5.06933716 31.65008179 -4.11987305 31.10180664 C-1.31069425 29.48172328 1.50086602 27.86581835 4.3125 26.25 C5.28896484 25.68603516 6.26542969 25.12207031 7.27148438 24.54101562 C8.20927734 24.00283203 9.14707031 23.46464844 10.11328125 22.91015625 C10.97735596 22.41265869 11.84143066 21.91516113 12.73168945 21.40258789 C15 20.1875 15 20.1875 18 19.1875 C18.72112977 17.54366482 19.37999674 15.8720825 20 14.1875 C21.00041576 12.55728883 22.04239953 10.95183112 23.125 9.375 C23.66382813 8.58480469 24.20265625 7.79460938 24.7578125 6.98046875 C25.16773438 6.38878906 25.57765625 5.79710937 26 5.1875 C27.32 5.5175 28.64 5.8475 30 6.1875 C30.53805491 11.84148685 28.79251795 15.30275135 26.1875 20.125 C20.515122 30.0927497 20.515122 30.0927497 19 41.1875 C20.80569922 41.92793464 20.80569922 41.92793464 23 42.1875 C31.70841108 37.73453928 38.26505237 29.18643668 43.51953125 21.2265625 C45 19.1875 45 19.1875 47 18.1875 C45.125 22.9375 45.125 22.9375 44 25.1875 C43.64830932 26.51610925 43.31229724 27.84908328 43 29.1875 C42.67 28.8575 42.34 28.5275 42 28.1875 C39.85432087 29.91605926 39.85432087 29.91605926 38 32.1875 C37.9853761 34.3810345 37.9853761 34.3810345 39 36.1875 C39.66 36.5175 40.32 36.8475 41 37.1875 C41.33 36.1975 41.66 35.2075 42 34.1875 C42.97753644 33.16553008 43.9805881 32.16770375 45 31.1875 C46.01800576 29.86786291 47.02248365 28.53740354 48 27.1875 C47.855625 27.868125 47.71125 28.54875 47.5625 29.25 C46.93054091 32.55023082 46.45686059 35.85894426 46 39.1875 C47.32 39.8475 48.64 40.5075 50 41.1875 C47 42.1875 47 42.1875 44 42.1875 C43.01 43.1775 43.01 43.1775 42 44.1875 C43.00836062 45.42017348 43.00836062 45.42017348 45.06640625 45.28515625 C46.30197266 45.26775391 46.30197266 45.26775391 47.5625 45.25 C48.38878906 45.24097656 49.21507812 45.23195313 50.06640625 45.22265625 C50.70449219 45.21105469 51.34257812 45.19945312 52 45.1875 C50 47.1875 50 47.1875 46.125 47.625 C42.7064623 47.5441982 42.18664826 47.35548344 39.5 44.9375 C38 42.1875 38 42.1875 38 38.1875 C37.34 38.1875 36.68 38.1875 36 38.1875 C35.7525 38.78175781 35.505 39.37601563 35.25 39.98828125 C33.80937117 42.52288759 32.3603228 43.68719565 30 45.375 C29.29875 45.88417969 28.5975 46.39335938 27.875 46.91796875 C23.75061095 49.71052384 19.8868801 49.85103968 15 49.1875 C11.67583518 46.17497564 11.04927708 42.91433689 10.75 38.5 C10.78410186 33.9047741 12.20129151 30.38448647 14 26.1875 C13.28714844 26.71859375 12.57429688 27.2496875 11.83984375 27.796875 C3.08002091 34.25768646 3.08002091 34.25768646 -0.9375 36.1875 C-4.50942039 38.52018271 -5.50720167 40.42453807 -7.078125 44.28515625 C-9.19272379 48.6487563 -12.4196934 50.08565295 -16.80859375 51.61328125 C-21.23830987 52.774009 -25.26393384 53.01213142 -29.5 51 C-31.46148905 48.6298674 -31.11766325 47.18301018 -31 44.1875 C-29.78441406 43.69378906 -28.56882812 43.20007813 -27.31640625 42.69140625 C-25.7317169 42.04440291 -24.14708441 41.3972603 -22.5625 40.75 C-21.76005859 40.42451172 -20.95761719 40.09902344 -20.13085938 39.76367188 C-18.98520508 39.29477539 -18.98520508 39.29477539 -17.81640625 38.81640625 C-17.10943604 38.52838135 -16.40246582 38.24035645 -15.67407227 37.94360352 C-14.00167233 37.30696155 -14.00167233 37.30696155 -13 36.1875 C-12.82451729 31.71269101 -13.14309068 27.57916027 -14 23.1875 C-14.66 23.1875 -15.32 23.1875 -16 23.1875 C-16.23203125 23.75082031 -16.4640625 24.31414063 -16.703125 24.89453125 C-22.86925415 35.79669333 -39.17469263 45.47361512 -50.6875 49.6015625 C-55.76466283 50.88800578 -60.09633998 50.99756809 -64.9375 48.9375 C-67.71692277 46.57920189 -68.75694535 44.4565464 -69.44140625 40.8828125 C-69.9139938 30.85176064 -65.25611056 21.89965419 -59.0625 14.1875 C-53.73247534 8.55899395 -46.75137291 2.86626756 -38.9375 1.75 C-35.03774271 2.33081492 -33.486445 3.09828046 -31 6.1875 C-30.41555636 10.1709448 -31.12178003 13.6041399 -33.0703125 17.1171875 C-37.53432935 22.85663774 -44.75445328 27.93179768 -52 29.1875 C-53.41534778 29.25206879 -54.83337689 29.27361039 -56.25 29.25 C-58.10625 29.2190625 -58.10625 29.2190625 -60 29.1875 C-60.98329211 33.24357995 -61.23600253 37.01812202 -61 41.1875 C-59.02197339 43.6291409 -59.02197339 43.6291409 -55.1875 43.25 C-43.40426064 41.5909199 -29.7552374 31.86585469 -22.02734375 22.8984375 C-19.4071192 19.10547818 -17.46862008 15.09620993 -15.5 10.9375 C-13.31161622 6.39836847 -11.17258603 3.99946015 -7 1.1875 C-4.35559361 0.3060312 -2.71939248 0.02575182 0 0 Z " fill="#DFE3D8" transform="translate(321,518.8125)" class="logo-element"/>
        </svg>
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
        }

        .termegro-logo svg {
          width: 100%;
          height: 100%;
        }

        .logo-bg {
          animation: logoPulse 3s ease-in-out infinite;
        }

        .logo-element {
          animation: logoGlow 2s ease-in-out infinite alternate;
        }

        .logo-accent {
          animation: logoSparkle 1.5s ease-in-out infinite alternate;
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
