/**
 * Nucleo 4 UI Controller — Actualidad: Records de Shazams
 * Renders REFERENCES/nucleo_4/pantalla1_componente.png and pantalla2_componente.png
 * directly as pure untouched visual component images, with HTML interactive
 * music overlay buttons aligned 1:1 over each album cover photo.
 */

import gsap from 'gsap';

export class Nucleo4UI {
  constructor(onCompleteCallback, onBackCallback, audioManager = null) {
    this.onCompleteCallback = onCompleteCallback;
    this.onBackCallback = onBackCallback;
    this.audioManager = audioManager;
    this.container = null;
    this.currentScreen = 1;
  }

  async render(targetEl) {
    this.container = targetEl;
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="nucleo-card nucleo4-card">
        <div class="nucleo-card-body" style="padding: 0; margin: 0;">

          <!-- PANTALLA 1: Component Image + Music Overlays -->
          <div id="n4-screen-1" class="n4-screen active">
            <div class="n4-component-container">
              <!-- Untouched Master Component Image -->
              <img 
                src="references/nucleo_4/pantalla1_componente.png" 
                alt="N4 Pantalla 1 Componente" 
                class="n4-component-img" 
                style="position: relative; z-index: 1; pointer-events: none; width: 100%; height: auto; display: block;"
                draggable="false"
              />

              <!-- Interactive Music Play Overlay: Eminem (2002) -->
              <div class="n4-music-overlay n4-music-eminem-p1" id="n4-node-eminem-p1" title="Reproducir Eminem - Cleanin' out my closet">
                <div class="n4-play-btn-circle">
                  <svg class="n4-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                    <polygon points="7 4 19 12 7 20 7 4"></polygon>
                  </svg>
                </div>
              </div>

              <!-- Interactive Music Play Overlay: Ke$ha - Tik Tok (2010) -->
              <div class="n4-music-overlay n4-music-tiktok-p1" id="n4-node-kesha-p1" title="Reproducir Ke$ha - TikTok">
                <div class="n4-play-btn-circle">
                  <svg class="n4-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                    <polygon points="7 4 19 12 7 20 7 4"></polygon>
                  </svg>
                </div>
              </div>

              <!-- Interactive Button: AVANZAR -->
              <button type="button" class="n4-btn-overlay n4-btn-avanzar-p1" id="n4-next-1" title="Avanzar a Pantalla 2" style="position: absolute; z-index: 50; pointer-events: auto;">
                <span>AVANZAR</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 2: Component Image + Music Overlays -->
          <div id="n4-screen-2" class="n4-screen" style="display: none;">
            <div class="n4-component-container">
              <!-- Untouched Master Component Image -->
              <img 
                src="references/nucleo_4/pantalla2_componente.png" 
                alt="N4 Pantalla 2 Componente" 
                class="n4-component-img" 
                style="position: relative; z-index: 1; pointer-events: none; width: 100%; height: auto; display: block;"
                draggable="false"
              />

              <!-- Interactive Music Play Overlay: Eminem (2002) -->
              <div class="n4-music-overlay n4-music-eminem-p2" id="n4-node-eminem-p2" title="Reproducir Eminem - Cleanin' out my closet">
                <div class="n4-play-btn-circle">
                  <svg class="n4-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                    <polygon points="7 4 19 12 7 20 7 4"></polygon>
                  </svg>
                </div>
              </div>

              <!-- Interactive Music Play Overlay: Ke$ha - Tik Tok (2010) -->
              <div class="n4-music-overlay n4-music-tiktok-p2" id="n4-node-kesha-p2" title="Reproducir Ke$ha - TikTok">
                <div class="n4-play-btn-circle">
                  <svg class="n4-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                    <polygon points="7 4 19 12 7 20 7 4"></polygon>
                  </svg>
                </div>
              </div>

              <!-- Interactive Music Play Overlay: Gotye (2012) -->
              <div class="n4-music-overlay n4-music-gotye-p2" id="n4-node-gotye-p2" title="Reproducir Gotye - Somebody that i used to know">
                <div class="n4-play-btn-circle">
                  <svg class="n4-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                    <polygon points="7 4 19 12 7 20 7 4"></polygon>
                  </svg>
                </div>
              </div>

              <!-- Interactive Music Play Overlay: Robin Schulz - Prayer in C (2015) -->
              <div class="n4-music-overlay n4-music-prayer-p2" id="n4-node-robin-p2" title="Reproducir Robin Schulz - Prayer in C">
                <div class="n4-play-btn-circle">
                  <svg class="n4-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                    <polygon points="7 4 19 12 7 20 7 4"></polygon>
                  </svg>
                </div>
              </div>

              <!-- Interactive Button: VOLVER -->
              <button type="button" class="n4-btn-overlay n4-btn-volver-p2" id="n4-prev-2" title="Volver a Pantalla 1" style="position: absolute; z-index: 50; pointer-events: auto;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>VOLVER</span>
              </button>

              <!-- Interactive Button: CONCLUSIÓN -->
              <button type="button" class="n4-btn-overlay n4-btn-conclusion-p2" id="n4-conclusion-btn" title="Ir a Conclusión" style="position: absolute; z-index: 50; pointer-events: auto;">
                <span>CONCLUSIÓN</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
    this.goToScreen(1);
  }

  bindEvents() {
    // Navigation Button Overlays
    const next1 = this.container.querySelector('#n4-next-1');
    if (next1) {
      next1.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToScreen(2);
      });
    }

    const prev2 = this.container.querySelector('#n4-prev-2');
    if (prev2) {
      prev2.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToScreen(1);
      });
    }

    const conclusionBtn = this.container.querySelector('#n4-conclusion-btn');
    if (conclusionBtn) {
      conclusionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.audioManager) this.audioManager.cleanupNucleo4Audio();
        if (this.onCompleteCallback) {
          this.onCompleteCallback();
        }
      });
    }

    // Audio Playback Event Attachments
    const eminemNodeP1 = this.container.querySelector('#n4-node-eminem-p1');
    const eminemNodeP2 = this.container.querySelector('#n4-node-eminem-p2');
    const handleEminemClick = (e) => {
      e.stopPropagation();
      if (this.audioManager) this.audioManager.toggleEminemAudio();
    };
    if (eminemNodeP1) eminemNodeP1.addEventListener('click', handleEminemClick);
    if (eminemNodeP2) eminemNodeP2.addEventListener('click', handleEminemClick);

    const keshaNodeP1 = this.container.querySelector('#n4-node-kesha-p1');
    const keshaNodeP2 = this.container.querySelector('#n4-node-kesha-p2');
    const handleKeshaClick = (e) => {
      e.stopPropagation();
      if (this.audioManager) this.audioManager.toggleKeshaAudio();
    };
    if (keshaNodeP1) keshaNodeP1.addEventListener('click', handleKeshaClick);
    if (keshaNodeP2) keshaNodeP2.addEventListener('click', handleKeshaClick);

    const gotyeNodeP2 = this.container.querySelector('#n4-node-gotye-p2');
    if (gotyeNodeP2) {
      gotyeNodeP2.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.audioManager) this.audioManager.toggleGotyeAudio();
      });
    }

    const robinNodeP2 = this.container.querySelector('#n4-node-robin-p2');
    if (robinNodeP2) {
      robinNodeP2.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.audioManager) this.audioManager.togglePrayerInCAudio();
      });
    }

    // Sync Audio State Callbacks to UI Visual Play / Pause Icons
    if (this.audioManager) {
      const updateNodeUI = (nodes, isPlaying) => {
        nodes.forEach((node) => {
          if (!node) return;
          const playIcon = node.querySelector('.n4-play-icon');
          if (isPlaying) {
            node.classList.add('playing-audio');
            if (playIcon) {
              playIcon.innerHTML = '<rect x="5" y="3" width="3.5" height="10" fill="#ffffff"/><rect x="11.5" y="3" width="3.5" height="10" fill="#ffffff"/>';
            }
          } else {
            node.classList.remove('playing-audio');
            if (playIcon) {
              playIcon.innerHTML = '<polygon points="7 4 19 12 7 20 7 4" fill="#ffffff"></polygon>';
            }
          }
        });
      };

      this.audioManager.onEminemStateChange = (isPlaying) => {
        updateNodeUI([eminemNodeP1, eminemNodeP2], isPlaying);
      };

      this.audioManager.onKeshaStateChange = (isPlaying) => {
        updateNodeUI([keshaNodeP1, keshaNodeP2], isPlaying);
      };

      this.audioManager.onGotyeStateChange = (isPlaying) => {
        updateNodeUI([gotyeNodeP2], isPlaying);
      };

      this.audioManager.onPrayerInCStateChange = (isPlaying) => {
        updateNodeUI([robinNodeP2], isPlaying);
      };
    }
  }

  goToScreen(screenNum) {
    if (this.audioManager) {
      this.audioManager.cleanupNucleo4Audio();
    }
    this.currentScreen = screenNum;

    for (let i = 1; i <= 2; i++) {
      const screenEl = this.container.querySelector(`#n4-screen-${i}`);
      if (screenEl) {
        if (i === screenNum) {
          screenEl.style.display = 'block';
          gsap.fromTo(screenEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 });
        } else {
          screenEl.style.display = 'none';
        }
      }
    }
  }

  resetState() {
    if (this.audioManager) {
      this.audioManager.cleanupNucleo4Audio();
    }
    this.goToScreen(1);
  }
}
