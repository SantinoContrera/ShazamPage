/**
 * Global HUD Manager — Shazam Interactive 3D Infographic
 * Manages top-level persistent elements:
 * Top-Left Shazam Global Navigator (#shazam-global-navigator)
 */

export class GlobalHUD {
  /**
   * @param {Function} getNucleus1Title Function returning active Nucleus 1 title.
   * @param {Function} onNodeSelect Callback when a navigator badge is clicked (nodeIndex).
   */
  constructor(getNucleus1Title, onNodeSelect) {
    this.getNucleus1Title = getNucleus1Title || (() => 'ORÍGENES');
    this.onNodeSelect = onNodeSelect || (() => {});
    this.navigatorEl = null;
    this.badges = [];
    this.maxUnlockedIndex = 0;
  }

  init() {
    // Remove legacy top-right map if present in DOM
    const oldMap = document.getElementById('global-nuclei-map');
    if (oldMap) oldMap.remove();

    // Create Top-Left Shazam Global Navigator
    this.createNavigator();
  }

  /**
   * Creates the Top-Left Shazam Global Navigator (#shazam-global-navigator)
   */
  createNavigator() {
    if (document.getElementById('shazam-global-navigator')) {
      this.navigatorEl = document.getElementById('shazam-global-navigator');
      return;
    }

    this.navigatorEl = document.createElement('div');
    this.navigatorEl.id = 'shazam-global-navigator';
    this.navigatorEl.style.cssText = `
      position: fixed;
      top: 24px;
      left: 28px;
      z-index: 9500;
      display: flex;
      align-items: center;
      gap: 12px;
      pointer-events: auto;
      font-family: 'Roboto Mono', monospace;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    // Shazam Logo (Reusing start menu asset references/menu_inicio/Shazam_Logo.png)
    const logoImg = document.createElement('img');
    const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : './';
    logoImg.src = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}references/menu_inicio/Shazam_Logo.png`;
    logoImg.alt = 'Shazam';
    logoImg.style.cssText = `
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 0 16px rgba(0, 240, 255, 0.85);
      display: block;
      cursor: default;
    `;

    // Badges Container (1, 2, 3, 4)
    const badgesContainer = document.createElement('div');
    badgesContainer.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
    `;

    // Dynamic Title Display Text
    const titleDisplayEl = document.createElement('span');
    titleDisplayEl.id = 'nav-title-display';
    titleDisplayEl.style.cssText = `
      font-family: 'Roboto Mono', monospace;
      font-size: 0.82rem;
      font-weight: 700;
      color: #00f0ff;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-left: 8px;
      opacity: 0;
      transition: opacity 0.25s ease;
      white-space: nowrap;
      text-shadow: 0 0 10px rgba(0, 240, 255, 0.7);
    `;

    const nucleusTitles = {
      1: () => this.getNucleus1Title(),
      2: () => '¿CÓMO FUNCIONABA?',
      3: () => '¿COMO FUNCIONA?',
      4: () => 'ACTUALIDAD: RECORDS DE SHAZAMS',
    };

    this.badges = [];
    [1, 2, 3, 4].forEach((num) => {
      const idx = num - 1;
      const badge = document.createElement('div');
      badge.className = `nav-badge nav-badge-${idx}`;
      badge.textContent = num;
      badge.style.cssText = `
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-family: 'Roboto Mono', monospace;
        font-size: 0.85rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      `;

      badge.addEventListener('mouseenter', () => {
        if (idx <= this.maxUnlockedIndex) {
          const mainCol = idx >= 2 ? '#5E00FF' : '#00f0ff';
          badge.style.borderColor = mainCol;
          badge.style.boxShadow = `0 0 14px ${mainCol}`;
        }
        const text = nucleusTitles[num] ? nucleusTitles[num]() : '';
        titleDisplayEl.textContent = text;
        titleDisplayEl.style.opacity = '1';
      });

      badge.addEventListener('mouseleave', () => {
        this.updateSingleBadgeStyle(badge, idx);
        titleDisplayEl.style.opacity = '0';
      });

      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        if (idx <= this.maxUnlockedIndex && this.onNodeSelect) {
          this.onNodeSelect(idx);
        }
      });

      this.badges.push(badge);
      badgesContainer.appendChild(badge);
    });

    this.navigatorEl.appendChild(logoImg);
    this.navigatorEl.appendChild(badgesContainer);
    this.navigatorEl.appendChild(titleDisplayEl);
    document.body.appendChild(this.navigatorEl);

    this.updateUnlockedState(this.maxUnlockedIndex);
  }

  /**
   * Helper to set badge styling based on unlock status
   */
  updateSingleBadgeStyle(badge, idx) {
    const isUnlocked = idx <= this.maxUnlockedIndex;
    const isPurple = idx >= 2;

    if (isUnlocked) {
      const borderCol = isPurple ? '#5E00FF' : '#00f0ff';
      const bgCol = isPurple ? 'rgba(94, 0, 255, 0.35)' : 'rgba(0, 240, 255, 0.3)';
      badge.style.opacity = '1.0';
      badge.style.border = `1.5px solid ${borderCol}`;
      badge.style.background = bgCol;
      badge.style.color = '#ffffff';
      badge.style.boxShadow = `0 0 10px ${borderCol}`;
      badge.style.cursor = 'pointer';
    } else {
      badge.style.opacity = '0.4';
      badge.style.border = '1.5px solid rgba(255, 255, 255, 0.2)';
      badge.style.background = 'rgba(10, 20, 35, 0.6)';
      badge.style.color = 'rgba(255, 255, 255, 0.35)';
      badge.style.boxShadow = 'none';
      badge.style.cursor = 'not-allowed';
    }
  }

  /**
   * Updates top-left navigator badge visual highlights based on real unlocked state (maxUnlockedIndex)
   */
  updateUnlockedState(maxUnlockedIndex) {
    this.maxUnlockedIndex = maxUnlockedIndex;
    this.badges.forEach((badge, idx) => {
      this.updateSingleBadgeStyle(badge, idx);
    });
  }

  show() {
    if (this.navigatorEl) {
      this.navigatorEl.style.opacity = '1';
      this.navigatorEl.style.visibility = 'visible';
    }
  }

  hide() {
    if (this.navigatorEl) {
      this.navigatorEl.style.opacity = '0';
      this.navigatorEl.style.visibility = 'hidden';
    }
  }
}
