/**
 * Shazam 3D Web Infographic — Main Application Orchestrator
 * Integrates Scene, Camera, Lightning, Interaction, World-Space Anchors,
 * Start Screen, Progression Tracking, Conclusion CTA, and Translucent Panel.
 */

import * as THREE from 'three';
import { AppScene } from './scene/scene.js';
import { CameraSystem } from './camera/camera.js';
import { LightningSystem } from './scene/lightning.js';
import { InteractionManager } from './interaction/interaction.js';
import { WorldSpaceAnchorManager } from './anchors/anchors.js';
import { Nucleo1UI } from './ui/nucleo1.js';
import { Nucleo2UI } from './ui/nucleo2.js';
import { Nucleo3UI } from './ui/nucleo3.js';
import { Nucleo4UI } from './ui/nucleo4.js';
import { Nucleo5UI } from './ui/nucleo5.js';
import { GlobalHUD } from './ui/globalHUD.js';
import { AudioManager } from './audio/audio.js';

class ShazamApp {
  constructor() {
    this.container = document.getElementById('app');
    this.appScene = null;
    this.cameraSystem = null;
    this.lightningSystem = null;
    this.interactionManager = null;
    this.anchorManager = null;
    this.globalHUD = null;
    this.audioManager = new AudioManager();

    this.clock = new THREE.Clock();
    this.isInitialized = false;

    // HUD Infographic Controllers
    this.nucleo1UI = null;
    this.nucleo2UI = null;
    this.nucleo3UI = null;
    this.nucleo4UI = null;
    this.nucleo5UI = null;

    // Progression & State Management
    this.maxUnlockedIndex = 0;
    this.visitedNodes = new Set();
    this.isConclusionUnlocked = false;
    this.isExperienceCompleted = false;

    // DOM UI Anchors
    this.startScreen = document.getElementById('startScreen');
    this.startCTA = document.getElementById('startCTA');
    this.conclusionCTA = document.getElementById('conclusionCTA');
    this.conclusionPanel = document.getElementById('conclusionPanel');
    this.panelCloseBtn = document.getElementById('panelCloseBtn');
  }

  init() {
    if (this.isInitialized) return;

    // 1. Initialize Master Three.js Scene
    this.appScene = new AppScene(this.container);
    this.appScene.init();

    // 2. Initialize Perspective Camera System
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    const aspectRatio = width / height;

    this.cameraSystem = new CameraSystem();
    this.cameraSystem.init(aspectRatio);

    // 3. Initialize Supernatural Lightning & Node Plasma System
    this.lightningSystem = new LightningSystem(this.appScene.scene);
    this.lightningSystem.init();

    // 4. Initialize Raycasting & Interaction Manager
    this.interactionManager = new InteractionManager(
      this.cameraSystem.getCamera(),
      this.appScene.scene,
      this.container
    );
    this.interactionManager.init(this.lightningSystem.getNodeOrbGroups());

    // 5. Initialize World-Space HTML Anchors with 3D Node Orb Groups
    this.anchorManager = new WorldSpaceAnchorManager(
      this.cameraSystem.getCamera(),
      this.container
    );
    this.anchorManager.init(
      document.getElementById('anchors-layer'),
      this.lightningSystem.getNodeOrbGroups()
    );

    // 6. Initialize Global Persistent HUD (Top-Left Shazam Navigator)
    this.globalHUD = new GlobalHUD(
      () => this.getNucleus1Title(),
      (nodeIdx) => this.handleNodeSelection(nodeIdx)
    );
    this.globalHUD.init();
    this.globalHUD.hide();

    // 7. Initialize HUD Controllers for Nucleus 1, 2, and 3
    this.initHUDControllers();

    // 7. Apply initial progressive unlock state
    this.syncUnlockedState();

    // 8. Bind Start Screen, Conclusion CTA & UI Events
    this.setupStartScreen();
    this.setupConclusionUI();
    this.setupInteractions();
    this.setupDevShortcuts();
    window.addEventListener('resize', this.onResize.bind(this));

    this.isInitialized = true;
    console.log('⚡ Shazam 3D Stage Initialized with Nucleus 1, 2, & 3 HUD Flow');

    // Force instant frame 0 update & render tick for 3D stars/particles
    if (this.lightningSystem) this.lightningSystem.update(0, 0);
    if (this.appScene) {
      this.appScene.update(0);
      if (this.cameraSystem) {
        this.appScene.render(this.cameraSystem.getCamera());
      }
    }

    // 9. Start Render Loop
    this.animate();
  }

  /**
   * Initializes HTML/CSS HUD Infographic Controllers for Node 1, Node 2, and Node 3
   */
  async initHUDControllers() {
    // Nucleus 1 UI (Orígenes: Screen 1 -> Screen 2 -> Transition to Nucleus 2)
    this.nucleo1UI = new Nucleo1UI(() => {
      console.log('⚡ Nucleus 1 Screen 2 complete -> Navigating to Nucleus 2');
      this.handleNodeSelection(1);
    });
    const node1ContentEl = document.getElementById('node-content-0');
    if (node1ContentEl) {
      await this.nucleo1UI.render(node1ContentEl);
    }

    // Nucleus 2 UI (¿Cómo funcionaba?)
    this.nucleo2UI = new Nucleo2UI(
      () => {
        console.log('⚡ Nucleus 2 complete -> Navigating to Nucleus 3 (if unlocked)');
        if (this.audioManager) this.audioManager.cleanupNucleo2Audio();
        if (this.maxUnlockedIndex >= 2) {
          this.handleNodeSelection(2);
        } else {
          this.cameraSystem.transitionToOverview();
          this.resetActiveSelection();
        }
      },
      this.audioManager
    );
    const node2ContentEl = document.getElementById('node-content-1');
    if (node2ContentEl) {
      await this.nucleo2UI.render(node2ContentEl);
    }

    // Nucleus 3 UI (Evolución / Actualidad)
    this.nucleo3UI = new Nucleo3UI(
      () => {
        console.log('⚡ Nucleus 3 complete -> Navigating to Nucleus 4 (if unlocked)');
        if (this.audioManager) this.audioManager.cleanupNucleo3Audio();
        if (this.maxUnlockedIndex >= 3) {
          this.handleNodeSelection(3);
        } else {
          this.cameraSystem.transitionToOverview();
          this.resetActiveSelection();
        }
      },
      this.audioManager
    );
    const node3ContentEl = document.getElementById('node-content-2');
    if (node3ContentEl && this.nucleo3UI) {
      await this.nucleo3UI.render(node3ContentEl);
    }

    // Nucleus 4 UI (Actualidad: Records de Shazams)
    this.nucleo4UI = new Nucleo4UI(
      () => {
        console.log('⚡ Nucleus 4 complete → Opening Conclusion');
        this.showConclusion();
      },
      () => {
        console.log('⚡ Nucleus 4 -> Navigating back to Nucleus 3');
        this.handleNodeSelection(2);
      },
      this.audioManager
    );
    const node4ContentEl = document.getElementById('node-content-3');
    if (node4ContentEl) {
      await this.nucleo4UI.render(node4ContentEl);
    }
  }

  /**
   * Start Screen Overlay Handling
   */
  setupStartScreen() {
    this.overviewUI = document.getElementById('overviewUI');

    // Attach listeners to trigger background audio loop on user interaction
    const triggerAudio = () => {
      if (this.audioManager) {
        this.audioManager.startBackgroundMusic();
      }
    };

    window.addEventListener('click', triggerAudio, { once: true });
    window.addEventListener('pointerdown', triggerAudio, { once: true });

    if (this.startCTA && this.startScreen) {
      this.startCTA.addEventListener('click', () => {
        console.log('⚡ Starting 3D Infographic Stage');
        triggerAudio();
        this.startScreen.classList.add('hidden');
        if (this.overviewUI) {
          this.overviewUI.classList.remove('hidden');
        }
        if (this.globalHUD) {
          this.globalHUD.show();
        }
        this.cameraSystem.transitionToOverview();
      });
    }
  }

  /**
   * Conclusion CTA & Overview Handlers
   */
  setupConclusionUI() {
    if (this.conclusionCTA) {
      this.conclusionCTA.setAttribute('title', 'CONCLUSIÓN');
      this.conclusionCTA.addEventListener('click', () => {
        if (this.isConclusionUnlocked) {
          console.log('⚡ Opening Conclusion from Overview CTA');
          this.showConclusion();
        }
      });
    }
  }

  /**
   * Unlocks the conclusion right-side CTA persistent state
   */
  unlockConclusion() {
    if (!this.isConclusionUnlocked) {
      this.isConclusionUnlocked = true;
      console.log('🎉 CONCLUSION UNLOCKED! Enabling Cyan Conclusion CTA');
    }
    if (this.conclusionCTA) {
      this.conclusionCTA.classList.remove('disabled');
      this.conclusionCTA.classList.add('unlocked');
      this.conclusionCTA.setAttribute('title', 'CONCLUSIÓN');
    }
  }

  /**
   * Shows the conclusion modal (Nucleus 5).
   * Resets camera to overview so the 3D scene is visible behind the modal.
   */
  showConclusion() {
    // Persistent unlock when reaching conclusion
    this.unlockConclusion();

    // Return 3D camera to overview so zoom is cancelled
    this.cameraSystem.transitionToOverview();
    this.resetActiveSelection();

    // Re-create Nucleo5 overlay with single source of truth component
    if (this.nucleo5UI) {
      this.nucleo5UI.destroy();
    }
    this.nucleo5UI = new Nucleo5UI(
      () => this.handleFinalize()
    );
    this.nucleo5UI.show();
  }

  /**
   * Called when user clicks FINALIZAR in Conclusiones (Pantalla 2):
   * - Marks experience as completed (`isExperienceCompleted = true`).
   * - Unlocks all 4 nuclei (`maxUnlockedIndex = 3`).
   * - Updates Node 1 title permanently to "¿QUE ES SHAZAM?".
   * - Returns camera to Overview preserving all progression.
   */
  handleFinalize() {
    console.log('⚡ Experience completed! Finalizing and returning to Overview with full progress preserved.');
    this.isExperienceCompleted = true;

    // Destroy conclusion overlay if present
    if (this.nucleo5UI) {
      this.nucleo5UI.destroy();
      this.nucleo5UI = null;
    }

    // Unlock all 4 nuclei persistently
    this.maxUnlockedIndex = 3;

    // Update Node 1 title to "¿QUE ES SHAZAM?"
    this.updateNucleus1Title();

    // Sync unlocked state across scene, anchors, raycaster & buttons
    this.syncUnlockedState();

    // Transition camera to Overview and show Overview UI
    this.cameraSystem.transitionToOverview();
    this.resetActiveSelection();
  }

  getNucleus1Title() {
    return this.isExperienceCompleted ? '¿QUE ES SHAZAM?' : 'ORÍGENES';
  }

  updateNucleus1Title() {
    const titleText = this.getNucleus1Title();
    // Update Overview node 0 button text
    const btn0Text = document.querySelector('#overviewNode0Btn .btn-text');
    if (btn0Text) {
      btn0Text.textContent = titleText;
    }
    // Update anchor 0 title
    if (this.anchorManager) {
      this.anchorManager.updateNodeTitle(0, titleText);
    }
  }

  /**
   * Clears active node selection when returning to Overview.
   * Cumulative node unlocks and progression are preserved persistently.
   */
  resetActiveSelection() {
    this.activeNodeIndex = -1;
    if (this.audioManager) {
      this.audioManager.cleanupNucleo2Audio();
      this.audioManager.cleanupNucleo3Audio();
      this.audioManager.cleanupNucleo4Audio();
    }
    if (this.interactionManager) {
      this.interactionManager.setSelectedNodeIndex(-1);
    }
    this.syncUnlockedState();
    if (this.anchorManager) {
      this.anchorManager.setActiveNode(-1);
      this.anchorManager.setHoveredNode(-1);
    }
    if (this.overviewUI) {
      this.overviewUI.classList.remove('hidden');
    }
  }

  /**
   * Checks if user has completed full sequence 1 -> 2 -> 3 -> 4 and performed return navigation.
   */
  checkConclusionUnlockCondition() {
    const hasCompletedFullSequence =
      this.visitedNodes.has(0) &&
      this.visitedNodes.has(1) &&
      this.visitedNodes.has(2) &&
      this.visitedNodes.has(3);

    if (hasCompletedFullSequence && !this.isConclusionUnlocked) {
      this.unlockConclusion();
    }
  }

  /**
   * Synchronizes maxUnlockedIndex across Anchor, Lightning, and Raycast systems.
   */
  syncUnlockedState() {
    if (this.anchorManager) {
      this.anchorManager.setMaxUnlockedIndex(this.maxUnlockedIndex);
    }
    if (this.lightningSystem) {
      this.lightningSystem.setMaxUnlockedIndex(this.maxUnlockedIndex);
    }
    if (this.interactionManager) {
      this.interactionManager.setMaxUnlockedIndex(this.maxUnlockedIndex);
    }
    if (this.globalHUD) {
      this.globalHUD.updateUnlockedState(this.maxUnlockedIndex);
    }

    // Apply Purple styling to overview buttons for Node 3 and Node 4 when unlocked
    const btn2 = document.getElementById('overviewNode2Btn');
    if (btn2 && this.maxUnlockedIndex >= 2) {
      btn2.classList.add('purple-node-btn');
    }
    const btn3 = document.getElementById('overviewNode3Btn');
    if (btn3 && this.maxUnlockedIndex >= 3) {
      btn3.classList.add('purple-node-btn');
    }

    // Ensure Nucleus 1 title matches current completion state
    this.updateNucleus1Title();
  }

  handleNodeSelection(nodeIndex) {
    if (nodeIndex <= this.maxUnlockedIndex) {
      console.log(`Navigating to 3D Node [${nodeIndex + 1}]`);
      this.activeNodeIndex = nodeIndex;
      if (this.interactionManager) {
        this.interactionManager.setSelectedNodeIndex(nodeIndex);
      }
      this.visitedNodes.add(nodeIndex);

      // Play Node transition sound effect
      if (this.audioManager) {
        this.audioManager.playNodeSfx();
      }

      // Hide OVERVIEW UI and general overview title during node entry
      if (this.overviewUI) {
        this.overviewUI.classList.add('hidden');
      }
      if (this.anchorManager) {
        this.anchorManager.setHoveredNode(-1);
      }

      this.cameraSystem.transitionToNode(nodeIndex);
      this.anchorManager.setActiveNode(nodeIndex);

      // Reset Nucleus 1 state to Screen 1 whenever Node 0 is entered
      if (nodeIndex === 0 && this.nucleo1UI) {
        this.nucleo1UI.resetState();
      }

      // Reset Nucleus 2 state to Neutral State A whenever Node 1 is entered
      if (nodeIndex === 1 && this.nucleo2UI) {
        this.nucleo2UI.resetState();
      }

      // Reset Nucleus 3 state to Screen 1 whenever Node 2 is entered
      if (nodeIndex === 2 && this.nucleo3UI) {
        this.nucleo3UI.resetState();
      }

      // Reset Nucleus 4 state to Screen 1 whenever Node 3 is entered
      if (nodeIndex === 3 && this.nucleo4UI) {
        this.nucleo4UI.resetState();
      }

      // Unlock next node sequentially (1 -> 2 -> 3 -> 4)
      if (nodeIndex === this.maxUnlockedIndex && this.maxUnlockedIndex < 3) {
        this.maxUnlockedIndex += 1;
        console.log(`⚡ Unlocked Next Node [${this.maxUnlockedIndex + 1}]`);
        this.syncUnlockedState();
      }

      // Check if return navigation triggers conclusion unlock
      this.checkConclusionUnlockCondition();
    }
  }

  setupInteractions() {
    const onSelect = (idx) => this.handleNodeSelection(idx);

    // 3D Mesh Raycast Click Handler
    this.interactionManager.onNodeSelect(onSelect);

    // 2D HTML Anchor DOM Click Handler
    if (this.anchorManager) {
      this.anchorManager.onAnchorClick(onSelect);
    }

    // OVERVIEW Node HTML Buttons (0, 1, 2, 3)
    [0, 1, 2, 3].forEach((idx) => {
      const btn = document.getElementById(`overviewNode${idx}Btn`);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          onSelect(idx);
        });
      }
    });

    // Node Hover Handler: Passes hover state to anchorManager for OVERVIEW nuclei title display
    this.interactionManager.onNodeHover((hoverIndex) => {
      if (this.anchorManager) {
        this.anchorManager.setHoveredNode(hoverIndex);
      }
    });

    // Click Background Handler -> Return to Overview Camera, Hide Active Node Content & Preserve Unlocked Progression
    this.interactionManager.onBackgroundClick(() => {
      console.log('Returning to Overview Camera — Preserving Unlocked Nodes');
      this.cameraSystem.transitionToOverview();
      this.resetActiveSelection();

      // Check conclusion unlock on return navigation
      this.checkConclusionUnlockCondition();
    });
  }

  /**
   * Secret keyboard shortcuts for internal developer validation.
   */
  setupDevShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 't') {
        console.log('[DEV] Top-Down Silhouette Validation View');
        this.cameraSystem.setTopDownView();
        this.anchorManager.setActiveAnchor(-1);
      } else if (e.key.toLowerCase() === 'o') {
        console.log('[DEV] Overview Camera');
        this.cameraSystem.transitionToOverview();
        this.resetActiveSelection();
      }
    });
  }

  onResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    const aspectRatio = width / height;

    if (this.cameraSystem) {
      this.cameraSystem.updateAspectRatio(aspectRatio);
    }
    if (this.appScene) {
      this.appScene.onResize(width, height);
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = this.clock.getDelta();

    if (this.lightningSystem) {
      this.lightningSystem.update(elapsedTime, deltaTime);
    }
    if (this.appScene) {
      this.appScene.update(elapsedTime);
    }
    if (this.cameraSystem) {
      this.cameraSystem.update();
    }
    if (this.anchorManager && this.cameraSystem) {
      this.anchorManager.update();
    }
    if (this.appScene && this.cameraSystem) {
      this.appScene.render(this.cameraSystem.getCamera());
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new ShazamApp();
  app.init();
});
