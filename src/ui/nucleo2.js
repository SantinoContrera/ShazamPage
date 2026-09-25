/**
 * Shazam 3D Web Infographic — NÚCLEO 2 HUD Component
 * Implements NÚCLEO 2 — PANTALLA 1 (Marcar 2580 Puzzle) and
 * NÚCLEO 2 — PANTALLA 2 (Estado 1: Carga 3.5s -> Estado 2: Carga Completa)
 * Faithful to REFERENCES/NUCLEO_2/PANTALLAS/
 */

import gsap from 'gsap';

export class Nucleo2UI {
  constructor(onCompleteCallback, audioManager = null) {
    this.onCompleteCallback = onCompleteCallback;
    this.audioManager = audioManager;
    this.container = null;
    this.enteredSequence = [];
    this.isResolvedP1 = false;
    this.currentScreen = 1; // 1: Pantalla 1, 2: Pantalla 2 Carga, 3: Pantalla 2 Carga Completa
    this.loadingTimer = null;
    this.eminemAlbumDataUrl = 'references/nucleo_2/eminem_cover.jpg';
  }

  /**
   * Returns high-resolution Eminem album cover asset path
   */
  async loadEminemAlbumPhoto() {
    return 'references/nucleo_2/eminem_cover.jpg';
  }

  async render(targetEl) {
    this.container = targetEl;
    if (!this.container) return;

    const albumSrc = await this.loadEminemAlbumPhoto();

    this.container.innerHTML = `
      <div class="nucleo-card nucleo2-card">
        <!-- Header -->
        <div class="nucleo-card-header">
          <span id="n2-header-title" class="nucleo-header-title">ORIGENES: ¿COMO FUNCIONABA?</span>
        </div>
        <div class="nucleo-header-line"></div>

        <!-- Body Content -->
        <div class="nucleo-card-body">
          <!-- PANTALLA 1: Puzzle 2580 -->
          <div id="n2-screen-1" class="n2-screen active">
            <p class="n2-description">
              Antes de la existencia de los smartphones ya existía un sistema que te permitía reconocer la canción que estabas escuchando. <span class="highlight-purple">¡Probemos como funciona!</span>
            </p>

            <div class="n2-interactive-layout">
              <!-- Overlay SVG for Precise Component-to-Component Connectors -->
              <svg class="n2-overlay-svg" viewBox="0 0 800 270">
                <!-- Connector 1: Dot sitting below "Marcar 2580" -> Keypad Left Border -->
                <circle cx="54" cy="42" r="4.5" fill="#00f0ff" />
                <path d="M 54 42 L 54 135 L 230 135" fill="none" stroke="#00f0ff" stroke-width="2.5" />
                <circle cx="230" cy="135" r="4.5" fill="#00f0ff" />

                <!-- Connector 2: Keypad Right Border -> Cellphone CTA Button Left Border (left: 558px) -->
                <circle cx="434" cy="135" r="4.5" id="n2-dot-2a" fill="rgba(0, 240, 255, 0.35)" />
                <path d="M 434 135 L 558 135" fill="none" stroke="rgba(0, 240, 255, 0.35)" stroke-width="2.5" id="n2-line-2-path" />
                <circle cx="558" cy="135" r="4.5" id="n2-dot-2b" fill="rgba(0, 240, 255, 0.35)" />
              </svg>

              <!-- Left Component: Instruction Title -->
              <div class="n2-instruction-box">
                <div class="n2-instruction-title">Marcar “2580”</div>
              </div>

              <!-- Center Component: Keypad Frame -->
              <div class="n2-keypad-box">
                <div class="keypad-grid">
                  <button class="keypad-btn" data-key="1">1</button>
                  <button class="keypad-btn" data-key="2">2</button>
                  <button class="keypad-btn" data-key="3">3</button>
                  <button class="keypad-btn" data-key="4">4</button>
                  <button class="keypad-btn" data-key="5">5</button>
                  <button class="keypad-btn" data-key="6">6</button>
                  <button class="keypad-btn" data-key="7">7</button>
                  <button class="keypad-btn" data-key="8">8</button>
                  <button class="keypad-btn" data-key="9">9</button>
                  <button class="keypad-btn" data-key="*">*</button>
                  <button class="keypad-btn" data-key="0">0</button>
                  <button class="keypad-btn" data-key="#">#</button>
                </div>
              </div>

              <!-- Right Component: Cellphone CTA Button (SIGUIENTE) -->
              <div class="n2-cellphone-box">
                <button id="n2-cellphone-btn" class="cellphone-btn disabled" disabled title="Ingresa la combinación '2580' para continuar">
                  <img id="n2-phone-icon-img" src="./references/nucleo_2/phone-icon-off.png" alt="Phone Icon" class="phone-icon-img" />
                </button>
              </div>
            </div>
          </div>

          <!-- PANTALLA 2 — ESTADO 1: Carga (3.5 Segundos / 3500ms) -->
          <div id="n2-screen-2-carga" class="n2-screen" style="display: none;">
            <div class="n2-loading-layout">
              <!-- Left Column: Description + Loading Indicators -->
              <div class="n2-loading-left-col">
                <p class="n2-description">
                  El teléfono <span class="highlight-purple">al reconocer la música de fondo</span> te enviaba el resultado en formato de mensaje de texto, que contenía <span class="highlight-purple">el título de la canción y su autor</span>
                </p>

                <div class="n2-loading-indicators">
                  <!-- Phone Listening Icon Pill (Handset + Ear + Sound Waves) -->
                  <div class="phone-listening-pill">
                    <img src="./references/nucleo_2/phone-icon-listening.png" alt="Phone Listening Icon" class="phone-icon-img" />
                  </div>

                  <!-- Circular Ring Loader (30 sec label, 3500ms automatic timer) -->
                  <div class="ring-loader-box">
                    <div class="ring-loader-spinner"></div>
                    <span class="ring-loader-text">30 sec</span>
                  </div>
                </div>
              </div>

              <!-- Right Column: Feature Phone Outline Illustration -->
              <div class="n2-phone-illustration-box">
                <div class="phone-outer-frame">
                  <div class="phone-screen-display"></div>
                  <div class="phone-keypad-grid">
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- PANTALLA 2 — ESTADO 2: Carga Completa (Resultado Final) -->
          <div id="n2-screen-2-completa" class="n2-screen" style="display: none;">
            <div class="n2-result-layout">
              <!-- Left Column: Description Text + Listening Pill + SMS Bubble + Arrow -->
              <div class="n2-loading-left-col n2-result-left-col">
                <p class="n2-description">
                  El teléfono <span class="highlight-purple">al reconocer la música de fondo</span> te enviaba el resultado en formato de mensaje de texto, que contenía <span class="highlight-purple">el título de la canción y su autor</span>
                </p>

                <div class="n2-result-center-group">
                  <!-- Phone Listening Pill -->
                  <div class="phone-listening-pill">
                    <img src="./references/nucleo_2/phone-icon-listening.png" alt="Phone Listening Icon" class="phone-icon-img" />
                  </div>

                  <!-- Text Message SMS Icon Box + Arrow -->
                  <div class="n2-sms-arrow-box">
                    <div class="sms-icon-box">
                      <svg viewBox="0 0 48 48" width="36" height="36">
                        <path d="M 8 10 C 5.8 10, 4 11.8, 4 14 L 4 30 C 4 32.2, 5.8 34, 8 34 L 14 34 L 14 41 L 21 34 L 40 34 C 42.2 34, 44 32.2, 44 30 L 44 14 C 44 11.8, 42.2 10, 40 10 Z" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linejoin="round" />
                        <circle cx="16" cy="22" r="2.2" fill="#00f0ff" />
                        <circle cx="24" cy="22" r="2.2" fill="#00f0ff" />
                        <circle cx="32" cy="22" r="2.2" fill="#00f0ff" />
                      </svg>
                    </div>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Right Column: Feature Phone Outline with Screen, Eminem Album, Hover Overlay & Result Speech Bubble -->
              <div class="n2-phone-illustration-box result-phone">
                <div class="phone-outer-frame">
                  <!-- Phone Screen Display with Album & Hover Overlay -->
                  <div class="phone-screen-display result-screen" id="eminemScreenContainer">
                    <img id="eminemAlbumImg" src="${albumSrc}" class="eminem-cover-photo" alt="Eminem - Cleanin' Out My Closet" />
                    <div class="eminem-hover-overlay">
                      <button id="eminemPlayBtn" class="eminem-play-btn" title="Reproducir muestra de audio">
                        <svg id="eminemPlayIcon" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                          <polygon points="7 4 19 12 7 20 7 4"></polygon>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Phone Keypad Grid -->
                  <div class="phone-keypad-grid">
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                    <div class="phone-key-btn"></div>
                  </div>
                </div>

                <!-- Speech Bubble Result Pill (placed outside masked frame so it never gets clipped) -->
                <div class="n2-song-bubble-pill">
                  Tu cancion es: <span class="purple-song-title">“Cleanin' out my closet”</span> de Eminem
                </div>
              </div>
            </div>

            <!-- Footer Navigation Controls -->
            <div class="nucleo-card-footer">
              <button id="n2-prev-btn" class="nucleo-next-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n2-final-next-btn" class="nucleo-next-btn">
                <span>ACTUALIDAD</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.resetState();
  }

  bindEvents() {
    const keypadBtns = this.container.querySelectorAll('.keypad-btn');
    keypadBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.dataset.key;
        this.onKeyPress(key, btn);
      });
    });

    // Cellphone CTA click -> Advances to Pantalla 2 Estado 1 (Carga 3.5s)
    const cellphoneBtn = this.container.querySelector('#n2-cellphone-btn');
    if (cellphoneBtn) {
      cellphoneBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.isResolvedP1) {
          this.startPantalla2Carga();
        }
      });
    }

    // Eminem song playback toggle & hover play icon
    const screenContainer = this.container.querySelector('#eminemScreenContainer');
    const playBtn = this.container.querySelector('#eminemPlayBtn');
    const playIcon = this.container.querySelector('#eminemPlayIcon');
    const albumImg = this.container.querySelector('#eminemAlbumImg');
    const hoverOverlay = this.container.querySelector('.eminem-hover-overlay');

    const updatePlayIconState = (isPlaying) => {
      if (playIcon) {
        if (isPlaying) {
          playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1" fill="#000000"/><rect x="14" y="4" width="4" height="16" rx="1" fill="#000000"/>';
        } else {
          playIcon.innerHTML = '<polygon points="7 4 19 12 7 20 7 4" fill="#000000"></polygon>';
        }
      }
      if (playBtn) {
        playBtn.title = isPlaying ? 'Pausar música' : 'Reproducir muestra de audio';
      }
      if (screenContainer) {
        if (isPlaying) {
          screenContainer.classList.add('playing-audio');
        } else {
          screenContainer.classList.remove('playing-audio');
        }
      }
    };

    const handlePlayToggle = (e) => {
      e.stopPropagation();
      console.log('🎤 Eminem song component clicked! audioManager:', this.audioManager);
      if (this.audioManager) {
        this.audioManager.toggleEminemAudio();
      } else {
        console.warn('⚠️ audioManager is not set on Nucleo2UI!');
      }
    };

    if (screenContainer) screenContainer.addEventListener('click', handlePlayToggle);
    if (playBtn) playBtn.addEventListener('click', handlePlayToggle);
    if (albumImg) albumImg.addEventListener('click', handlePlayToggle);
    if (hoverOverlay) hoverOverlay.addEventListener('click', handlePlayToggle);

    // Sync state changes from AudioManager to play button icon & visual playing state
    if (this.audioManager) {
      this.audioManager.onEminemStateChange = (isPlaying) => {
        updatePlayIconState(isPlaying);
      };
    }

    // Previous Button in Pantalla 2 Estado 2
    const prevBtn = this.container.querySelector('#n2-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.audioManager) this.audioManager.cleanupNucleo2Audio();
        this.resetState();
      });
    }

    // Final Next Button in Pantalla 2 Estado 2
    const finalNextBtn = this.container.querySelector('#n2-final-next-btn');
    if (finalNextBtn) {
      finalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.audioManager) this.audioManager.cleanupNucleo2Audio();
        if (this.onCompleteCallback) {
          console.log('⚡ Nucleus 2 Complete -> Triggering transition');
          this.onCompleteCallback();
        }
      });
    }
  }

  /**
   * Keypad press handler
   */
  onKeyPress(key, btnEl) {
    if (this.isResolvedP1) return;

    btnEl.classList.add('selected-key');
    gsap.fromTo(btnEl, { scale: 1.12 }, { scale: 1, duration: 0.2, ease: 'power1.out' });

    this.enteredSequence.push(key);
    if (this.enteredSequence.length > 4) {
      this.enteredSequence.shift();
    }

    const seqStr = this.enteredSequence.join('');
    if (seqStr === '2580') {
      this.transitionToResolvedStateP1();
    } else {
      const cellphoneBtn = this.container.querySelector('#n2-cellphone-btn');
      if (cellphoneBtn) {
        cellphoneBtn.classList.remove('enabled');
        cellphoneBtn.classList.add('disabled');
        cellphoneBtn.disabled = true;
      }
      const phoneImg = this.container.querySelector('#n2-phone-icon-img');
      if (phoneImg) {
        phoneImg.src = './references/nucleo_2/phone-icon-off.png';
      }
    }
  }

  /**
   * Highlight 2, 5, 8, 0 keys and enable Cellphone CTA button
   */
  transitionToResolvedStateP1() {
    this.isResolvedP1 = true;

    const keysToHighlight = ['2', '5', '8', '0'];
    keysToHighlight.forEach((key) => {
      const btn = this.container.querySelector(`.keypad-btn[data-key="${key}"]`);
      if (btn) {
        btn.classList.remove('selected-key');
        btn.classList.add('active');
        gsap.fromTo(btn, { scale: 1.18 }, { scale: 1, duration: 0.4, ease: 'back.out(1.8)' });
      }
    });

    const line2Path = this.container.querySelector('#n2-line-2-path');
    const dot2a = this.container.querySelector('#n2-dot-2a');
    const dot2b = this.container.querySelector('#n2-dot-2b');

    if (line2Path) {
      line2Path.setAttribute('stroke', '#00f0ff');
      line2Path.style.filter = 'drop-shadow(0 0 8px #00f0ff)';
    }
    if (dot2a) dot2a.setAttribute('fill', '#00f0ff');
    if (dot2b) dot2b.setAttribute('fill', '#00f0ff');

    const cellphoneBtn = this.container.querySelector('#n2-cellphone-btn');
    if (cellphoneBtn) {
      cellphoneBtn.classList.remove('disabled');
      cellphoneBtn.classList.add('enabled');
      cellphoneBtn.disabled = false;
      cellphoneBtn.title = 'Continuar a reconocimiento de audio';

      gsap.fromTo(
        cellphoneBtn,
        { scale: 0.88 },
        { scale: 1.1, duration: 0.55, ease: 'back.out(2)', yoyo: true, repeat: 1 }
      );
    }

    const phoneImg = this.container.querySelector('#n2-phone-icon-img');
    if (phoneImg) {
      phoneImg.src = './references/nucleo_2/phone-icon-on.png';
    }
  }

  /**
   * Starts Pantalla 2 — Estado 1 (Carga 3.5s / 3500ms)
   * Automatically transitions to Estado 2 (Carga Completa) after 3500ms
   */
  startPantalla2Carga() {
    this.currentScreen = 2;

    const p1 = this.container.querySelector('#n2-screen-1');
    const p2Carga = this.container.querySelector('#n2-screen-2-carga');
    const p2Completa = this.container.querySelector('#n2-screen-2-completa');

    if (p1) p1.style.display = 'none';
    if (p2Completa) p2Completa.style.display = 'none';

    if (p2Carga) {
      p2Carga.style.display = 'block';
      gsap.fromTo(p2Carga, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
    }

    // Set 3.5s (3500ms) automatic loading timer
    if (this.loadingTimer) clearTimeout(this.loadingTimer);
    this.loadingTimer = setTimeout(() => {
      this.transitionToPantalla2Completa();
    }, 3500);
  }

  /**
   * Displays Pantalla 2 — Estado 2 (Carga Completa) with Eminem song result
   */
  transitionToPantalla2Completa() {
    this.currentScreen = 3;

    const p2Carga = this.container.querySelector('#n2-screen-2-carga');
    const p2Completa = this.container.querySelector('#n2-screen-2-completa');

    if (p2Carga) {
      gsap.to(p2Carga, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          p2Carga.style.display = 'none';
          if (p2Completa) {
            p2Completa.style.display = 'block';
            gsap.fromTo(p2Completa, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 });
          }
        },
      });
    }
  }

  /**
   * Resets screen state to Pantalla 1 Neutral State whenever Nucleus 2 is re-entered
   */
  resetState() {
    this.enteredSequence = [];
    this.isResolvedP1 = false;
    this.currentScreen = 1;

    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
      this.loadingTimer = null;
    }

    if (!this.container) return;

    const p1 = this.container.querySelector('#n2-screen-1');
    const p2Carga = this.container.querySelector('#n2-screen-2-carga');
    const p2Completa = this.container.querySelector('#n2-screen-2-completa');

    if (p1) {
      p1.style.display = 'block';
      gsap.set(p1, { opacity: 1 });
    }
    if (p2Carga) p2Carga.style.display = 'none';
    if (p2Completa) p2Completa.style.display = 'none';

    // Reset keypad buttons
    const keypadBtns = this.container.querySelectorAll('.keypad-btn');
    keypadBtns.forEach((btn) => {
      btn.classList.remove('active', 'selected-key');
      gsap.set(btn, { scale: 1, x: 0 });
    });

    // Reset Connector 2 to dark cyan
    const line2Path = this.container.querySelector('#n2-line-2-path');
    const dot2a = this.container.querySelector('#n2-dot-2a');
    const dot2b = this.container.querySelector('#n2-dot-2b');

    if (line2Path) {
      line2Path.setAttribute('stroke', 'rgba(0, 240, 255, 0.35)');
      line2Path.style.filter = 'none';
    }
    if (dot2a) dot2a.setAttribute('fill', 'rgba(0, 240, 255, 0.35)');
    if (dot2b) dot2b.setAttribute('fill', 'rgba(0, 240, 255, 0.35)');

    // Reset Cellphone CTA button to disabled
    const cellphoneBtn = this.container.querySelector('#n2-cellphone-btn');
    if (cellphoneBtn) {
      cellphoneBtn.classList.remove('enabled');
      cellphoneBtn.classList.add('disabled');
      cellphoneBtn.disabled = true;
      cellphoneBtn.title = "Ingresa la combinación '2580' para continuar";
      gsap.set(cellphoneBtn, { scale: 1 });
    }

    const phoneImg = this.container.querySelector('#n2-phone-icon-img');
    if (phoneImg) {
      phoneImg.src = './references/nucleo_2/phone-icon-off.png';
    }

    const playIcon = this.container.querySelector('#eminemPlayIcon');
    const playBtn = this.container.querySelector('#eminemPlayBtn');
    const screenContainer = this.container.querySelector('#eminemScreenContainer');
    if (playIcon) {
      playIcon.innerHTML = '<polygon points="7 4 19 12 7 20 7 4" fill="#000000"></polygon>';
    }
    if (playBtn) {
      playBtn.title = 'Reproducir muestra de audio';
    }
    if (screenContainer) {
      screenContainer.classList.remove('playing-audio');
    }
  }
}
