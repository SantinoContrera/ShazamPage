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

class ShazamApp {
  constructor() {
    this.container = document.getElementById('app');
    this.appScene = null;
    this.cameraSystem = null;
    this.lightningSystem = null;
    this.interactionManager = null;
    this.anchorManager = null;

    this.clock = new THREE.Clock();
    this.isInitialized = false;

    // Progression & State Management
    this.maxUnlockedIndex = 0;
    this.visitedNodes = new Set();
    this.isConclusionUnlocked = false;

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

    // 6. Apply initial progressive unlock state
    this.syncUnlockedState();

    // 7. Bind Start Screen, Conclusion CTA & UI Events
    this.setupStartScreen();
    this.setupConclusionUI();
    this.setupInteractions();
    this.setupDevShortcuts();
    window.addEventListener('resize', this.onResize.bind(this));

    this.isInitialized = true;
    console.log('⚡ Shazam 3D Stage Initialized with Start Screen & Conclusion Flow');

    // 8. Start Render Loop
    this.animate();
  }

  /**
   * Start Screen Overlay Handling (Pantalla 1 -> Pantalla 2 Transition)
   */
  setupStartScreen() {
    if (this.startCTA && this.startScreen) {
      this.startCTA.addEventListener('click', () => {
        console.log('⚡ Starting 3D Infographic Stage');
        this.startScreen.classList.add('hidden');
        this.cameraSystem.transitionToOverview();
      });
    }
  }

  /**
   * Conclusion CTA & Translucent Panel UI Handlers
   */
  setupConclusionUI() {
    if (this.conclusionCTA) {
      this.conclusionCTA.addEventListener('click', () => {
        if (this.isConclusionUnlocked && this.conclusionPanel) {
          console.log('Opening Conclusion Panel');
          this.conclusionPanel.classList.add('active');
        }
      });
    }

    if (this.panelCloseBtn && this.conclusionPanel) {
      this.panelCloseBtn.addEventListener('click', () => {
        console.log('Closing Conclusion Panel');
        this.conclusionPanel.classList.remove('active');
      });
    }
  }

  /**
   * Resets progression state back to Node 1 unlocked, Nodes 2-4 locked.
   * Called whenever returning to Overview.
   */
  resetProgression() {
    this.maxUnlockedIndex = 0;
    this.activeNodeIndex = -1;
    this.syncUnlockedState();
    if (this.anchorManager) {
      this.anchorManager.setActiveNode(-1);
    }
    console.log('⚡ Overview Progression Reset: Node 1 Unlocked, Nodes 2-4 Locked');
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
      this.isConclusionUnlocked = true;
      console.log('🎉 CONCLUSION UNLOCKED! Enabling Cyan Conclusion CTA');

      if (this.conclusionCTA) {
        this.conclusionCTA.classList.remove('disabled');
        this.conclusionCTA.classList.add('unlocked');
        this.conclusionCTA.title = 'Abrir Conclusión del Estudio';
      }
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
  }

  setupInteractions() {
    const handleNodeSelection = (nodeIndex) => {
      if (nodeIndex <= this.maxUnlockedIndex) {
        console.log(`Navigating to 3D Node [${nodeIndex + 1}]`);
        this.activeNodeIndex = nodeIndex;
        this.visitedNodes.add(nodeIndex);
        this.cameraSystem.transitionToNode(nodeIndex);
        this.anchorManager.setActiveNode(nodeIndex);

        // Unlock next node sequentially (1 -> 2 -> 3 -> 4)
        if (nodeIndex === this.maxUnlockedIndex && this.maxUnlockedIndex < 3) {
          this.maxUnlockedIndex += 1;
          console.log(`⚡ Unlocked Next Node [${this.maxUnlockedIndex + 1}]`);
          this.syncUnlockedState();
        }

        // Check if return navigation triggers conclusion unlock
        this.checkConclusionUnlockCondition();
      }
    };

    // 3D Mesh Raycast Click Handler
    this.interactionManager.onNodeSelect(handleNodeSelection);

    // 2D HTML Anchor DOM Click Handler
    if (this.anchorManager) {
      this.anchorManager.onAnchorClick(handleNodeSelection);
    }

    // Node Hover Handler: 3D Orb feedback handled by InteractionManager without altering active node content
    this.interactionManager.onNodeHover(() => {
      // Hover only affects 3D orb scale, active selected node content remains unchanged
    });

    // Click Background Handler -> Return to Overview Camera, Hide Node Content & Reset Progression
    this.interactionManager.onBackgroundClick(() => {
      console.log('Returning to Overview Camera — Resetting Progression');
      this.activeNodeIndex = -1;
      this.cameraSystem.transitionToOverview();
      this.resetProgression();
      this.anchorManager.setActiveNode(-1);

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
        this.resetProgression();
        this.anchorManager.setActiveAnchor(-1);
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
