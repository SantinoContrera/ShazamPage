/**
 * Shazam 3D Web Infographic — NÚCLEO 1 HUD Component
 * Implements Screen 1 (Orígenes: ¿Qué es Shazam? 1/2) and Screen 2 (Orígenes: Fundador 2/2)
 * faithful to REFERENCES/NUCLEO_1/PANTALLAS/
 */

import gsap from 'gsap';

export class Nucleo1UI {
  constructor(onCompleteCallback) {
    this.onCompleteCallback = onCompleteCallback; // Callback to trigger transition to Nucleo 2
    this.currentScreen = 1;
    this.isAnimating = false;
    this.container = null;
    this.averyWangDataUrl = null;
  }

  /**
   * Generates DataURL for Dr. Avery Wang's cropped photo from nucleo1_pantalla2.png reference using HTML Canvas
   */
  async loadAveryPhoto() {
    if (this.averyWangDataUrl) return this.averyWangDataUrl;

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = 'references/nucleo_1/pantallas/nucleo1_pantalla2.png';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // nucleo1_pantalla2.png reference is 1920x1080
        const scaleX = img.naturalWidth / 1920;
        const scaleY = img.naturalHeight / 1080;

        // Crop bounding box for Dr. Avery Wang's photo inside the mockup
        const cropX = 566 * scaleX;
        const cropY = 320 * scaleY;
        const cropW = 260 * scaleX;
        const cropH = 260 * scaleY;

        canvas.width = cropW;
        canvas.height = cropH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        this.averyWangDataUrl = canvas.toDataURL('image/png');
        resolve(this.averyWangDataUrl);
      };
      img.onerror = () => {
        console.warn('Could not load nucleo1_pantalla2.png for cropping, using fallback path');
        resolve('references/nucleo_1/pantallas/nucleo1_pantalla2.png');
      };
    });
  }

  /**
   * Injects the HTML structure into the target DOM element (#node-content-0)
   */
  async render(targetEl) {
    this.container = targetEl;
    if (!this.container) return;

    const photoSrc = await this.loadAveryPhoto();

    this.container.innerHTML = `
      <div class="nucleo-card nucleo1-card">
        <!-- Header -->
        <div class="nucleo-card-header">
          <span id="n1-header-title" class="nucleo-header-title">ORÍGENES: ¿QUE ES SHAZAM? 1/2</span>
        </div>
        <div class="nucleo-header-line"></div>

        <!-- Content Area -->
        <div class="nucleo-card-body">
          <!-- Screen 1 -->
          <div id="n1-screen-1" class="n1-screen active">
            <p class="n1-description">
              Shazam es una <span class="highlight-purple">aplicación móvil</span> y un <span class="highlight-purple">servicio en línea</span> diseñado para identificar en pocos segundos cualquier canción que esté sonando en tu entorno.
            </p>

            <div class="n1-team-box">
              <div class="n1-team-title">Equipo shazam en 2002</div>
              <div class="n1-silhouettes-container" id="n1-silhouettes-s1">
                <!-- 5 Silhouettes in 2 rows (3 top, 2 bottom) -->
                <div class="silhouette sil-top-left" data-id="1">
                  <svg viewBox="0 0 100 100" class="sil-svg">
                    <circle cx="50" cy="32" r="18" fill="none" stroke="#00f0ff" stroke-width="3" />
                    <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="#00f0ff" stroke-width="3" />
                  </svg>
                </div>
                <div class="silhouette sil-top-center" data-id="2">
                  <svg viewBox="0 0 100 100" class="sil-svg">
                    <circle cx="50" cy="32" r="18" fill="none" stroke="#00f0ff" stroke-width="3" />
                    <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="#00f0ff" stroke-width="3" />
                  </svg>
                </div>
                <div class="silhouette sil-top-right" data-id="3">
                  <svg viewBox="0 0 100 100" class="sil-svg">
                    <circle cx="50" cy="32" r="18" fill="none" stroke="#00f0ff" stroke-width="3" />
                    <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="#00f0ff" stroke-width="3" />
                  </svg>
                </div>
                <div class="silhouette sil-bottom-left" data-id="4">
                  <svg viewBox="0 0 100 100" class="sil-svg">
                    <circle cx="50" cy="32" r="18" fill="none" stroke="#00f0ff" stroke-width="3" />
                    <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="#00f0ff" stroke-width="3" />
                  </svg>
                </div>
                <div class="silhouette sil-bottom-right" data-id="5">
                  <svg viewBox="0 0 100 100" class="sil-svg">
                    <circle cx="50" cy="32" r="18" fill="none" stroke="#00f0ff" stroke-width="3" />
                    <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="#00f0ff" stroke-width="3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Screen 2 -->
          <div id="n1-screen-2" class="n1-screen">
            <div class="n1-s2-layout">
              <!-- Left: 2026 Silhouettes Box -->
              <div class="n1-s2-left-box">
                <div class="n1-s2-silhouettes-container">
                  <div class="sil-mini sil-mini-1">
                    <svg viewBox="0 0 100 100" class="sil-svg-dim">
                      <circle cx="50" cy="32" r="18" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="3" />
                      <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="3" />
                    </svg>
                  </div>
                  <div class="sil-mini sil-mini-2 active">
                    <span class="label-2026">2026</span>
                    <svg viewBox="0 0 100 100" class="sil-svg-active">
                      <circle cx="50" cy="32" r="18" fill="none" stroke="#00f0ff" stroke-width="3.5" />
                      <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="#00f0ff" stroke-width="3.5" />
                    </svg>
                  </div>
                  <div class="sil-mini sil-mini-3">
                    <svg viewBox="0 0 100 100" class="sil-svg-dim">
                      <circle cx="50" cy="32" r="18" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="3" />
                      <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="3" />
                    </svg>
                  </div>
                  <div class="sil-mini sil-mini-4">
                    <svg viewBox="0 0 100 100" class="sil-svg-dim">
                      <circle cx="50" cy="32" r="18" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="3" />
                      <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="3" />
                    </svg>
                  </div>
                  <div class="sil-mini sil-mini-5">
                    <svg viewBox="0 0 100 100" class="sil-svg-dim">
                      <circle cx="50" cy="32" r="18" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="3" />
                      <path d="M 15 85 C 15 58, 32 50, 50 50 C 68 50, 85 58, 85 85" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="3" />
                    </svg>
                  </div>
                </div>

                <!-- Connecting Line SVG with Intermediate Centered Pointer Path matching nucleo1_pantalla2.png -->
                <svg class="connecting-line-svg">
                  <path d="M 145 74 L 145 165 L 294 165" fill="none" stroke="#00f0ff" stroke-width="2.5" />
                  <circle cx="294" cy="165" r="4.5" fill="#00f0ff" />
                </svg>
              </div>

              <!-- Center: Dr. Avery Wang Photo -->
              <div class="n1-s2-photo-box">
                <img id="averyWangImg" src="${photoSrc}" class="avery-photo" alt="Dr. Avery Wang" />
              </div>

              <!-- Right: Description -->
              <div class="n1-s2-text-box">
                <p class="n1-description-s2">
                  El <span class="highlight-purple">Dr. Avery Wang</span> es el único miembro del equipo original que continúa la compañía y es el <span class="highlight-purple">líder científico de Shazam</span>. Tras la adquisición de Shazam por parte de <span class="highlight-purple">Apple</span>, Avery es actualmente Científico de Investigación Principal en Apple.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="nucleo-card-footer">
          <div class="pagination-dots">
            <span id="n1-dot-1" class="dot active"></span>
            <span id="n1-dot-2" class="dot"></span>
          </div>
          <button id="n1-next-btn" class="nucleo-next-btn">
            <span>SIGUIENTE</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
    this.resetState();
  }

  bindEvents() {
    const nextBtn = this.container.querySelector('#n1-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onNextClick();
      });
    }
  }

  /**
   * Reset UI to Screen 1 initial state when entering Node 1
   */
  resetState() {
    this.currentScreen = 1;
    this.isAnimating = false;

    const s1 = this.container.querySelector('#n1-screen-1');
    const s2 = this.container.querySelector('#n1-screen-2');
    const title = this.container.querySelector('#n1-header-title');
    const dot1 = this.container.querySelector('#n1-dot-1');
    const dot2 = this.container.querySelector('#n1-dot-2');

    if (s1) {
      s1.classList.add('active');
      gsap.set(s1, { opacity: 1, display: 'block' });
    }
    if (s2) {
      s2.classList.remove('active');
      gsap.set(s2, { opacity: 0, display: 'none' });
    }

    if (title) title.textContent = 'ORÍGENES: ¿QUE ES SHAZAM? 1/2';
    if (dot1) dot1.classList.add('active');
    if (dot2) dot2.classList.remove('active');

    // Reset silhouettes in screen 1
    const silhouettes = this.container.querySelectorAll('.silhouette');
    silhouettes.forEach((el) => {
      gsap.set(el, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' });
    });
  }

  /**
   * Handles clicking SIGUIENTE button
   */
  onNextClick() {
    if (this.isAnimating) return;

    if (this.currentScreen === 1) {
      this.transitionToScreen2();
    } else if (this.currentScreen === 2) {
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }
  }

  /**
   * Transition from Screen 1 to Screen 2:
   * Plays the disappearance animation of the 5 people silhouettes
   * Timing is configured to be smooth, slow, and cinematic (Requirement 3).
   */
  transitionToScreen2() {
    this.isAnimating = true;
    const s1 = this.container.querySelector('#n1-screen-1');
    const s2 = this.container.querySelector('#n1-screen-2');
    const title = this.container.querySelector('#n1-header-title');
    const dot1 = this.container.querySelector('#n1-dot-1');
    const dot2 = this.container.querySelector('#n1-dot-2');

    // Select the 4 outer silhouettes (top-left, top-right, bottom-left, bottom-right)
    const outerSilhouettes = this.container.querySelectorAll('.sil-top-left, .sil-top-right, .sil-bottom-left, .sil-bottom-right');
    const centerSilhouette = this.container.querySelector('.sil-top-center');

    const tl = gsap.timeline({
      onComplete: () => {
        this.currentScreen = 2;
        this.isAnimating = false;
      },
    });

    // 1. Slow & paused fade out & scale down of 4 outer silhouettes
    tl.to(outerSilhouettes, {
      opacity: 0,
      scale: 0.5,
      y: -20,
      filter: 'blur(6px)',
      duration: 1.4,
      stagger: 0.22,
      ease: 'power2.inOut',
    });

    // 2. Slow pulse of center silhouette
    tl.to(centerSilhouette, {
      scale: 1.2,
      filter: 'drop-shadow(0 0 16px #00f0ff)',
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.4');

    // 3. Smooth fade out of Screen 1 body
    tl.to(s1, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        s1.style.display = 'none';
        s1.classList.remove('active');
        s2.style.display = 'block';
        s2.classList.add('active');

        if (title) title.textContent = 'ORÍGENES: FUNDADOR 2/2';
        if (dot1) dot1.classList.remove('active');
        if (dot2) dot2.classList.add('active');
      },
    });

    // 4. Smooth fade in of Screen 2 body
    tl.fromTo(s2, {
      opacity: 0,
      y: 12,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power2.out',
    });
  }
}
