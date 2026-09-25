/**
 * Shazam 3D Web Infographic — NÚCLEO 3 HUD Component (EVOLUCIÓN / ACTUALIDAD)
 * Implements NÚCLEO 3 — Pantallas 1 to 6
 * Faithful to REFERENCES/NUCLEO_3/PANTALLAS/
 */

import gsap from 'gsap';

export class Nucleo3UI {
  constructor(onCompleteCallback, audioManager = null) {
    this.onCompleteCallback = onCompleteCallback;
    this.audioManager = audioManager;
    this.container = null;
    this.currentScreen = 1; // 1 to 6
    this.robinSchulzAlbumDataUrl = 'references/nucleo_3/prayer_in_c_cover.jpg';

    // Explicit Data Mapping Structure for Pantalla 6 Radar Graph
    this.graphData = {
      top: {
        title: "Canciones en el catalogo",
        cyan: "+20 millones (2002)",
        purple: "+100.000 millones (2026)"
      },
      left: {
        title: "Tiempo de procesado",
        cyan: "15-30 segundos (2002)",
        purple: "3-7 segundos (2026)"
      },
      right: {
        title: "Usuarios activos",
        cyan: "500.000 usuarios (2002)",
        purple: "+300 millones (2026)"
      }
    };
  }

  /**
   * Returns high-resolution Robin Schulz album cover asset path
   */
  async loadRobinSchulzAlbumPhoto() {
    return 'references/nucleo_3/prayer_in_c_cover.jpg';
  }

  async render(targetEl) {
    this.container = targetEl;
    if (!this.container) return;

    const albumSrc = await this.loadRobinSchulzAlbumPhoto();

    this.container.innerHTML = `
      <div class="nucleo-card nucleo3-card">
        <!-- Header -->
        <div class="nucleo-card-header">
          <span id="n3-header-title" class="nucleo-header-title purple-title">¿COMO FUNCIONA ACTUA?</span>
        </div>
        <div class="nucleo-header-line purple-line"></div>

        <!-- Body Content -->
        <div class="nucleo-card-body">

          <!-- PANTALLA 1: Disclaimer & Sound Photo Concept -->
          <div id="n3-screen-1" class="n3-screen active">
            <p class="n3-description">
              ¿Sabías que Shazam no escucha la canción? Lo que hace es sacarle una foto al sonido
            </p>

            <div class="n3-p1-layout">
              <!-- celularshazam.png — Asset principal interactivo -->
              <div class="n3-celular-frame" id="n3-p1-phone" title="Haz clic en el celular para continuar">
                <img src="references/nucleo_3/assets_mockups/celularshazam.png" alt="Shazam en celular" class="n3-celular-img" />
              </div>
            </div>
          </div>

          <!-- PANTALLA 2: Espectrograma (Audio a Imagen) -->
          <div id="n3-screen-2" class="n3-screen" style="display: none;">
            <p class="n3-description">
              Esa foto se llama espectrograma: el audio convertido en imagen.
            </p>

            <div class="n3-p2-layout">
              <div class="n3-espectrograma-wrapper" id="n3-espectrogramaWrapper">
                <img src="references/nucleo_3/assets_mockups/celularfoto.png" alt="Espectrograma: el audio convertido en imagen" class="n3-espectrograma-img" />
                <div class="n3-espectrograma-hotspot" id="n3EspectrogramaHotspot">
                  <div class="n3-scan-line"></div>
                </div>
                <!-- Cartel indicador: desaparece al primer hover -->
                <div class="n3-espectrograma-hint" id="n3EspectrogramaHint">
                  Pasar mouse para ver espectrograma real
                </div>
                <div class="n3-espectrograma-popover" id="n3EspectrogramaPopover">
                  <img src="./references/nucleo_3/espectrogramareal.png" alt="Espectrograma real" class="n3-popover-real-img" />
                </div>
              </div>
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-2" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-next-2" class="nucleo-next-btn purple-btn">
                <span>Y luego?</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 3: Filtrado de Picos Intensos -->
          <div id="n3-screen-3" class="n3-screen" style="display: none;">
            <p class="n3-description">
              De esa imagen Shazam borra casi todo, solo guarda los puntos más intensos, los picos.
            </p>

            <div class="n3-p3-layout">
              <img src="references/nucleo_3/assets_mockups/celularpicos.png" alt="Filtrado de picos: puntos más intensos del espectrograma" class="n3-picos-img" />
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-3" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-next-3" class="nucleo-next-btn purple-btn">
                <span>Y luego?</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 4: Huella Digital de la Canción -->
          <div id="n3-screen-4" class="n3-screen" style="display: none;">
            <p class="n3-description">
              Esos picos son la huella digital de la canción
            </p>

            <div class="n3-p4-layout">
              <img src="references/nucleo_3/assets_mockups/celularpicoshuella.png" alt="Huella digital: picos convertidos en huella de la canción" class="n3-huella-img" />
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-4" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-next-4" class="nucleo-next-btn purple-btn">
                <span>Y luego?</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 5: Búsqueda en Base de Datos & Resultado (Prayer in C) -->
          <div id="n3-screen-5" class="n3-screen" style="display: none;">
            <p class="n3-description">
              Una vez obtenida la huella la aplicación la busca entre <span class="highlight-purple">millones de canciones</span>, proceso que solo tarda <span class="highlight-purple">milisegundos</span>.
            </p>

            <div class="n3-p5-layout">
              <!-- Left: Huella y flecha integrada -->
              <div class="n3-huellaflecha-frame">
                <img src="references/nucleo_3/assets_mockups/huellaflecha.png" alt="Huella y flecha hacia la canción" class="n3-huellaflecha-img" />
              </div>

              <!-- Right: Robin Schulz Album Cover & Song Details (Prayer in C Interactive Audio) -->
              <div class="n3-song-card-box" id="prayerScreenContainer">
                <div class="robin-album-frame">
                  <img id="prayerAlbumImg" src="${albumSrc}" class="robin-cover-photo" alt="Robin Schulz - Prayer in C" />
                  <div class="prayer-hover-overlay">
                    <button id="prayerPlayBtn" class="prayer-play-btn" title="Reproducir muestra de audio">
                      <svg id="prayerPlayIcon" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                        <polygon points="7 4 19 12 7 20 7 4"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="song-details-text">
                  <div class="song-title-line">Tu cancion es: <span class="purple-song-title">“Prayer in C”</span> de Robin Schulz</div>
                  <div class="shazam-count-line">20 millones Shazams (2015).</div>
                </div>
              </div>
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-5" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-next-5" class="nucleo-next-btn purple-btn">
                <span>Entendido</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 6: Comparativas Antes vs Hoy (Gráfico Triangular) -->
          <div id="n3-screen-6" class="n3-screen" style="display: none;">
            <div class="n3-p6-layout">
              <!-- Left Legend -->
              <div class="p6-legend-box">
                <div class="legend-item">
                  <span class="legend-dot cyan-dot"></span>
                  <span class="legend-label">Estadisticas en 2002</span>
                </div>
                <div class="legend-item">
                  <span class="legend-dot purple-dot"></span>
                  <span class="legend-label">Estadisticas en 2026</span>
                </div>
              </div>

              <!-- Center Triangular Spectro-Radar Graph -->
              <div class="p6-graph-container">
                <!-- Top Axis Data: Canciones en el catálogo -->
                <div class="vertex-block v-top">
                  <div class="vertex-title">Canciones en el catalogo</div>
                  <div class="val-cyan">+20 millones (2002)</div>
                  <div class="val-purple">+100.000 millones (2026)</div>
                </div>

                <!-- Central Radar Triangle SVG -->
                <svg class="radar-triangle-svg" viewBox="0 0 360 250">
                  <!-- Outer Base Triangle (Purple Boundary) -->
                  <polygon points="180,45 65,215 295,215" fill="rgba(94, 0, 255, 0.08)" stroke="#5E00FF" stroke-width="2.5" style="pointer-events: none;" />

                  <!-- Inner Grid Triangle -->
                  <polygon points="180,102 122,187 238,187" fill="none" stroke="rgba(94, 0, 255, 0.3)" stroke-dasharray="3,3" stroke-width="1.2" style="pointer-events: none;" />

                  <!-- 3 Center Axis Lines -->
                  <line x1="180" y1="158" x2="180" y2="45" stroke="rgba(94, 0, 255, 0.4)" stroke-dasharray="3,3" stroke-width="1.5" style="pointer-events: none;" />
                  <line x1="180" y1="158" x2="65" y2="215" stroke="rgba(94, 0, 255, 0.4)" stroke-dasharray="3,3" stroke-width="1.5" style="pointer-events: none;" />
                  <line x1="180" y1="158" x2="295" y2="215" stroke="rgba(94, 0, 255, 0.4)" stroke-dasharray="3,3" stroke-width="1.5" style="pointer-events: none;" />

                  <!-- Series 2002 Polygon (Cyan) -->
                  <polygon points="180,110 82,204 225,180" fill="rgba(0, 240, 255, 0.18)" stroke="#00f0ff" stroke-width="2.5" style="pointer-events: none;" />

                  <!-- Series 2026 Polygon (Purple/Periwinkle) -->
                  <polygon points="180,45 150,172 295,215" fill="rgba(129, 140, 248, 0.18)" stroke="#818cf8" stroke-width="2.5" style="pointer-events: none;" />

                  <!-- Interactive Dots (Rendered ON TOP of all background polygons) -->
                  <!-- Series 2002 Dots (Cyan) -->
                  <g class="graph-dot-group" data-val="+20 millones" data-cx="180" data-cy="110" data-theme="cyan">
                    <circle cx="180" cy="110" r="5" fill="#00f0ff" class="graph-visible-dot" />
                    <circle cx="180" cy="110" r="18" fill="transparent" class="graph-hit-dot" style="cursor: pointer;" />
                  </g>
                  <g class="graph-dot-group" data-val="15-30 segundos" data-cx="82" data-cy="204" data-theme="cyan">
                    <circle cx="82" cy="204" r="5" fill="#00f0ff" class="graph-visible-dot" />
                    <circle cx="82" cy="204" r="18" fill="transparent" class="graph-hit-dot" style="cursor: pointer;" />
                  </g>
                  <g class="graph-dot-group" data-val="500.000 usuarios" data-cx="225" data-cy="180" data-theme="cyan">
                    <circle cx="225" cy="180" r="5" fill="#00f0ff" class="graph-visible-dot" />
                    <circle cx="225" cy="180" r="18" fill="transparent" class="graph-hit-dot" style="cursor: pointer;" />
                  </g>

                  <!-- Series 2026 Dots (Purple/Periwinkle) -->
                  <g class="graph-dot-group" data-val="+100.000 millones" data-cx="180" data-cy="45" data-theme="purple">
                    <circle cx="180" cy="45" r="6" fill="#818cf8" class="graph-visible-dot" />
                    <circle cx="180" cy="45" r="18" fill="transparent" class="graph-hit-dot" style="cursor: pointer;" />
                  </g>
                  <g class="graph-dot-group" data-val="3-7 segundos" data-cx="150" data-cy="172" data-theme="purple">
                    <circle cx="150" cy="172" r="6" fill="#818cf8" class="graph-visible-dot" />
                    <circle cx="150" cy="172" r="18" fill="transparent" class="graph-hit-dot" style="cursor: pointer;" />
                  </g>
                  <g class="graph-dot-group" data-val="+300 millones" data-cx="295" data-cy="215" data-theme="purple">
                    <circle cx="295" cy="215" r="6" fill="#818cf8" class="graph-visible-dot" />
                    <circle cx="295" cy="215" r="18" fill="transparent" class="graph-hit-dot" style="cursor: pointer;" />
                  </g>
                </svg>

                <!-- Interactive Floating Tooltip Pill -->
                <div id="p6-graph-tooltip" class="graph-tooltip" style="opacity: 0; display: none;"></div>

                <!-- Bottom-Left Axis Data: Tiempo de procesado -->
                <div class="vertex-block v-left">
                  <div class="vertex-title">Tiempo de procesado</div>
                  <div class="val-cyan">15-30 segundos (2002)</div>
                  <div class="val-purple">3-7 segundos (2026)</div>
                </div>

                <!-- Bottom-Right Axis Data: Usuarios activos -->
                <div class="vertex-block v-right">
                  <div class="vertex-title">Usuarios activos</div>
                  <div class="val-cyan">500.000 usuarios (2002)</div>
                  <div class="val-purple">+300 millones (2026)</div>
                </div>
              </div>
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-6" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-final-next-btn" class="nucleo-next-btn purple-btn">
                <span>Records</span>
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
    this.goToScreen(1);
  }

  bindEvents() {
    // Screen 1: Al hacer clic sobre el celular se avanza a la Pantalla 2
    const phoneP1 = this.container.querySelector('#n3-p1-phone');
    if (phoneP1) {
      phoneP1.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToScreen(2);
      });
    }

    // Screen 2: Hover tooltip / popover interactivo sobre el hotspot del espectrograma
    const hotspotP2 = this.container.querySelector('#n3EspectrogramaHotspot');
    const popoverP2 = this.container.querySelector('#n3EspectrogramaPopover');
    const wrapperP2 = this.container.querySelector('#n3-espectrogramaWrapper');
    const hintP2 = this.container.querySelector('#n3EspectrogramaHint');

    if (hotspotP2 && popoverP2 && wrapperP2) {
      const updatePopoverPos = (e) => {
        const rect = wrapperP2.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const popWidth = popoverP2.offsetWidth || 280;
        const popHeight = popoverP2.offsetHeight || 160;

        // Posicionar ligeramente por encima del cursor
        let posX = x;
        let posY = y - 18;

        if (posY - popHeight < -40) {
          // Si está demasiado cerca del borde superior, ubicar debajo del cursor
          popoverP2.style.transform = 'translate(-50%, 18px) scale(1)';
          popoverP2.style.top = `${y}px`;
        } else {
          popoverP2.style.transform = 'translate(-50%, -100%) scale(1)';
          popoverP2.style.top = `${posY}px`;
        }

        // Restringir horizontalmente para mantenerlo dentro del área visible
        posX = Math.max(popWidth / 2, Math.min(rect.width - popWidth / 2, posX));
        popoverP2.style.left = `${posX}px`;
      };

      hotspotP2.addEventListener('mouseenter', (e) => {
        // Ocultar el cartel mientras el mouse esté sobre el espectrograma
        if (hintP2) {
          hintP2.classList.add('hidden-hover');
        }
        popoverP2.classList.add('visible');
        updatePopoverPos(e);
      });

      hotspotP2.addEventListener('mousemove', (e) => {
        updatePopoverPos(e);
      });

      hotspotP2.addEventListener('mouseleave', () => {
        // Al quitar el mouse, el cartel vuelve a mostrarse normalmente
        if (hintP2) {
          hintP2.classList.remove('hidden-hover');
        }
        popoverP2.classList.remove('visible');
        popoverP2.style.left = '';
        popoverP2.style.top = '';
        popoverP2.style.transform = '';
      });
    }

    const next2 = this.container.querySelector('#n3-next-2');
    if (next2) next2.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(3); });

    const next3 = this.container.querySelector('#n3-next-3');
    if (next3) next3.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(4); });

    const next4 = this.container.querySelector('#n3-next-4');
    if (next4) next4.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(5); });

    const next5 = this.container.querySelector('#n3-next-5');
    if (next5) next5.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(6); });

    // Previous Buttons
    const prev2 = this.container.querySelector('#n3-prev-2');
    if (prev2) prev2.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(1); });

    const prev3 = this.container.querySelector('#n3-prev-3');
    if (prev3) prev3.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(2); });

    const prev4 = this.container.querySelector('#n3-prev-4');
    if (prev4) prev4.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(3); });

    const prev5 = this.container.querySelector('#n3-prev-5');
    if (prev5) prev5.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(4); });

    const prev6 = this.container.querySelector('#n3-prev-6');
    if (prev6) prev6.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(5); });

    // Final Next Button on Screen 6 -> Unlocks Node 4
    const finalNextBtn = this.container.querySelector('#n3-final-next-btn');
    if (finalNextBtn) {
      finalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.audioManager) this.audioManager.cleanupNucleo3Audio();
        if (this.onCompleteCallback) {
          console.log('⚡ Nucleus 3 Complete -> Triggering transition to Node 4');
          this.onCompleteCallback();
        }
      });
    }

    // Prayer in C song playback toggle & hover play icon
    const prayerScreenContainer = this.container.querySelector('#prayerScreenContainer');
    const prayerPlayBtn = this.container.querySelector('#prayerPlayBtn');
    const prayerPlayIcon = this.container.querySelector('#prayerPlayIcon');
    const prayerAlbumImg = this.container.querySelector('#prayerAlbumImg');
    const prayerHoverOverlay = this.container.querySelector('.prayer-hover-overlay');

    const handlePrayerPlayToggle = (e) => {
      e.stopPropagation();
      console.log('🎵 Prayer in C song component clicked! audioManager:', this.audioManager);
      if (this.audioManager) {
        this.audioManager.togglePrayerInCAudio();
      } else {
        console.warn('⚠️ audioManager is not set on Nucleo3UI!');
      }
    };

    if (prayerScreenContainer) prayerScreenContainer.addEventListener('click', handlePrayerPlayToggle);
    if (prayerPlayBtn) prayerPlayBtn.addEventListener('click', handlePrayerPlayToggle);
    if (prayerAlbumImg) prayerAlbumImg.addEventListener('click', handlePrayerPlayToggle);
    if (prayerHoverOverlay) prayerHoverOverlay.addEventListener('click', handlePrayerPlayToggle);

    const updatePrayerPlayIconState = (isPlaying) => {
      if (prayerPlayIcon) {
        if (isPlaying) {
          prayerPlayIcon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1" fill="#ffffff"/><rect x="14" y="4" width="4" height="16" rx="1" fill="#ffffff"/>';
        } else {
          prayerPlayIcon.innerHTML = '<polygon points="7 4 19 12 7 20 7 4" fill="#ffffff"></polygon>';
        }
      }
      if (prayerPlayBtn) {
        prayerPlayBtn.title = isPlaying ? 'Pausar música' : 'Reproducir muestra de audio';
      }
      if (prayerScreenContainer) {
        if (isPlaying) {
          prayerScreenContainer.classList.add('playing-audio');
        } else {
          prayerScreenContainer.classList.remove('playing-audio');
        }
      }
    };

    // Sync state changes from AudioManager to play button icon & visual playing state
    if (this.audioManager) {
      this.audioManager.onPrayerInCStateChange = (isPlaying) => {
        updatePrayerPlayIconState(isPlaying);
      };
    }

    // Pantalla 6 Interactive Graph Node Hover Tooltip
    const tooltip = this.container.querySelector('#p6-graph-tooltip');
    const dotGroups = this.container.querySelectorAll('.graph-dot-group');

    dotGroups.forEach((dotGroup) => {
      const showTooltip = (e) => {
        e.stopPropagation();
        const val = dotGroup.dataset.val;
        const cx = parseFloat(dotGroup.dataset.cx);
        const cy = parseFloat(dotGroup.dataset.cy);
        const theme = dotGroup.dataset.theme;

        if (tooltip) {
          tooltip.textContent = val;
          tooltip.className = `graph-tooltip ${theme}-theme`;
          tooltip.style.left = `${(cx / 360) * 100}%`;
          tooltip.style.top = `${(cy / 250) * 100}%`;
          tooltip.style.display = 'block';

          gsap.killTweensOf(tooltip);
          gsap.fromTo(
            tooltip,
            { opacity: 0, scale: 0.85, y: 5 },
            { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: 'back.out(1.8)' }
          );
        }

        const visibleDot = dotGroup.querySelector('.graph-visible-dot');
        if (visibleDot) {
          gsap.to(visibleDot, { r: 9, duration: 0.2, ease: 'power1.out' });
        }
      };

      const hideTooltip = (e) => {
        e.stopPropagation();
        if (tooltip) {
          gsap.to(tooltip, {
            opacity: 0,
            scale: 0.85,
            duration: 0.18,
            ease: 'power1.in',
            onComplete: () => {
              tooltip.style.display = 'none';
            }
          });
        }

        const visibleDot = dotGroup.querySelector('.graph-visible-dot');
        if (visibleDot) {
          const originalR = dotGroup.dataset.theme === 'purple' ? 6 : 5;
          gsap.to(visibleDot, { r: originalR, duration: 0.2, ease: 'power1.out' });
        }
      };

      dotGroup.addEventListener('mouseenter', showTooltip);
      dotGroup.addEventListener('mouseleave', hideTooltip);
    });
  }

  goToScreen(screenNum) {
    if (this.audioManager) {
      this.audioManager.cleanupNucleo3Audio();
    }
    this.currentScreen = screenNum;

    // Reset prayer play icon if leaving screen 5
    const prayerPlayIcon = this.container?.querySelector('#prayerPlayIcon');
    const prayerPlayBtn = this.container?.querySelector('#prayerPlayBtn');
    const prayerScreenContainer = this.container?.querySelector('#prayerScreenContainer');
    if (prayerPlayIcon) {
      prayerPlayIcon.innerHTML = '<polygon points="7 4 19 12 7 20 7 4" fill="#ffffff"></polygon>';
    }
    if (prayerPlayBtn) {
      prayerPlayBtn.title = 'Reproducir muestra de audio';
    }
    if (prayerScreenContainer) {
      prayerScreenContainer.classList.remove('playing-audio');
    }

    // Update Header Title depending on Screen
    const headerTitle = this.container.querySelector('#n3-header-title');
    if (headerTitle) {
      if (screenNum === 6) {
        headerTitle.textContent = 'COMPARATIVAS: ANTES VS HOY';
      } else {
        headerTitle.textContent = '¿COMO FUNCIONA ACTUA?';
      }
    }

    // Toggle Screen Elements
    for (let i = 1; i <= 6; i++) {
      const screenEl = this.container.querySelector(`#n3-screen-${i}`);
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
      this.audioManager.cleanupNucleo3Audio();
    }
    this.goToScreen(1);
  }
}
