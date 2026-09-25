/**
 * Nucleo 5 UI Controller — Conclusión (Single Source of Truth)
 * Uses master component images from REFERENCES/conclusion:
 * - Pantalla 1: REFERENCES/conclusion/componente_conclusiones_1.png
 * - Pantalla 2: REFERENCES/conclusion/componente_conclusiones_2.png
 */

import gsap from 'gsap';

export class Nucleo5UI {
  /**
   * @param {Function} onFinalizeCallback Called when user clicks VOLVER/FINALIZAR on Pantalla 2
   */
  constructor(onFinalizeCallback) {
    this.onFinalizeCallback = onFinalizeCallback;
    this.overlayEl = null;
    this.currentScreen = 1;
  }

  show() {
    this.destroy();

    // Semi-transparent Backdrop Overlay
    this.overlayEl = document.createElement('div');
    this.overlayEl.id = 'conclusion-overlay';
    this.overlayEl.style.cssText = `
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9000;
      background: rgba(2, 6, 16, 0.82);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      padding: 20px;
      box-sizing: border-box;
    `;

    // Inner Card Container
    const card = document.createElement('div');
    card.id = 'conclusion-card';
    card.style.cssText = `
      position: relative;
      width: min(880px, 94vw);
      max-height: 92vh;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `;

    card.innerHTML = `
      <div id="conclusion-content-wrapper" style="width: 100%; position: relative;">
        <!-- PANTALLA 1: Component Image + SIGUIENTE Overlay Button -->
        <div id="conclusion-screen-1" class="conclusion-screen" style="display: block; width: 100%; position: relative;">
          <div class="conclusion-component-container" style="position: relative; width: 100%;">
            <img 
              src="REFERENCES/conclusion/componente_conclusiones_1.png" 
              alt="Conclusiones Pantalla 1 Componente" 
              class="conclusion-component-img" 
              style="position: relative; z-index: 1; pointer-events: none; width: 100%; height: auto; display: block;"
              draggable="false"
            />
            <!-- Interactive Button: SIGUIENTE (Abajo a la derecha) -->
            <button type="button" class="conclusion-nav-btn conclusion-btn-siguiente" id="conclusion-next-1" title="Avanzar a Conclusiones 2" style="position: absolute; bottom: 26px; right: 32px; z-index: 60; pointer-events: auto;">
              <span>SIGUIENTE</span>
            </button>
          </div>
        </div>

        <!-- PANTALLA 2: Component Image + VOLVER & FINALIZAR Overlay Buttons -->
        <div id="conclusion-screen-2" class="conclusion-screen" style="display: none; width: 100%; position: relative;">
          <div class="conclusion-component-container" style="position: relative; width: 100%;">
            <img 
              src="REFERENCES/conclusion/componente_conclusiones_2.png" 
              alt="Conclusiones Pantalla 2 Componente" 
              class="conclusion-component-img" 
              style="position: relative; z-index: 1; pointer-events: none; width: 100%; height: auto; display: block;"
              draggable="false"
            />
            <!-- Interactive Button: VOLVER (Abajo a la izquierda) -->
            <button type="button" class="conclusion-nav-btn conclusion-btn-volver" id="conclusion-prev-2" title="Volver a Pantalla 1" style="position: absolute; bottom: 26px; left: 32px; z-index: 60; pointer-events: auto;">
              <span>VOLVER</span>
            </button>
            <!-- Interactive Button: FINALIZAR (Abajo a la derecha) -->
            <button type="button" class="conclusion-nav-btn conclusion-btn-finalizar" id="conclusion-finalize-btn" title="Finalizar y volver al Overview" style="position: absolute; bottom: 26px; right: 32px; z-index: 60; pointer-events: auto;">
              <span>FINALIZAR</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.overlayEl.appendChild(card);
    document.body.appendChild(this.overlayEl);

    this.bindEvents();

    // Entrance animation
    gsap.fromTo(
      card,
      { opacity: 0, scale: 0.95, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }

  bindEvents() {
    if (!this.overlayEl) return;

    const screen1 = this.overlayEl.querySelector('#conclusion-screen-1');
    const screen2 = this.overlayEl.querySelector('#conclusion-screen-2');

    const nextBtn1 = this.overlayEl.querySelector('#conclusion-next-1');
    const prevBtn2 = this.overlayEl.querySelector('#conclusion-prev-2');
    const finalizeBtn2 = this.overlayEl.querySelector('#conclusion-finalize-btn');

    // Pantalla 1 -> Pantalla 2 (SIGUIENTE)
    if (nextBtn1) {
      nextBtn1.addEventListener('click', (e) => {
        e.stopPropagation();
        if (screen1 && screen2) {
          gsap.to(screen1, {
            opacity: 0,
            duration: 0.22,
            onComplete: () => {
              screen1.style.display = 'none';
              screen2.style.display = 'block';
              this.currentScreen = 2;
              gsap.fromTo(screen2, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power1.out', clearProps: 'transform' });
            }
          });
        }
      });
    }

    // Pantalla 2 -> Pantalla 1 (VOLVER)
    if (prevBtn2) {
      prevBtn2.addEventListener('click', (e) => {
        e.stopPropagation();
        if (screen1 && screen2) {
          gsap.to(screen2, {
            opacity: 0,
            duration: 0.22,
            onComplete: () => {
              screen2.style.display = 'none';
              screen1.style.display = 'block';
              this.currentScreen = 1;
              gsap.fromTo(screen1, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power1.out', clearProps: 'transform' });
            }
          });
        }
      });
    }

    // Pantalla 2 -> OVERVIEW (FINALIZAR)
    if (finalizeBtn2) {
      finalizeBtn2.addEventListener('click', (e) => {
        e.stopPropagation();
        this.destroy();
        if (this.onFinalizeCallback) {
          this.onFinalizeCallback();
        }
      });
    }
  }

  destroy() {
    if (this.overlayEl && this.overlayEl.parentNode) {
      this.overlayEl.parentNode.removeChild(this.overlayEl);
    }
    this.overlayEl = null;
    this.currentScreen = 1;
  }
}
