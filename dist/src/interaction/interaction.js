/**
 * Interaction & Raycasting Module
 * Handles mouse/pointer movements, raycasting hit-tests on unlocked node plasma orbs,
 * hover scaling feedback, click selection, and event dispatching.
 */

import * as THREE from 'three';

export class InteractionManager {
  constructor(camera, scene, container) {
    this.camera = camera;
    this.scene = scene;
    this.container = container;
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-100, -100);
    this.nodeOrbGroups = [];
    this.maxUnlockedIndex = 0;

    this.hoveredNodeIndex = -1;
    this.selectedNodeIndex = -1;

    // Callbacks
    this.onNodeSelectCallback = null;
    this.onNodeHoverCallback = null;
    this.onBackgroundClickCallback = null;
  }

  init(nodeOrbGroups) {
    this.nodeOrbGroups = nodeOrbGroups;

    // Bind Pointer Events
    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('click', this.onPointerClick.bind(this));
  }

  setMaxUnlockedIndex(maxUnlockedIndex) {
    this.maxUnlockedIndex = maxUnlockedIndex;
  }

  onPointerMove(event) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.checkHover();
  }

  checkHover() {
    if (!this.camera || this.nodeOrbGroups.length === 0) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Raycast against all meshes inside node orb groups
    const targets = [];
    this.nodeOrbGroups.forEach(group => {
      // Only hit-test UNLOCKED nodes!
      if (group.userData.nodeIndex <= this.maxUnlockedIndex) {
        group.traverse(child => {
          if (child.isMesh) targets.push(child);
        });
      }
    });

    const intersects = this.raycaster.intersectObjects(targets, false);

    if (intersects.length > 0) {
      let hitGroup = intersects[0].object;
      while (hitGroup.parent && !hitGroup.userData.nodeId) {
        hitGroup = hitGroup.parent;
      }

      if (hitGroup && hitGroup.userData) {
        const hitIndex = hitGroup.userData.nodeIndex;

        // Ensure node is unlocked
        if (hitIndex <= this.maxUnlockedIndex && this.hoveredNodeIndex !== hitIndex) {
          this.hoveredNodeIndex = hitIndex;
          this.container.style.cursor = 'pointer';
          
          this.nodeOrbGroups.forEach((g, idx) => {
            if (idx === hitIndex) {
              g.userData.targetScale = 1.35;
            } else if (idx <= this.maxUnlockedIndex && idx !== this.selectedNodeIndex) {
              g.userData.targetScale = 1.0;
            }
          });

          if (this.onNodeHoverCallback) {
            this.onNodeHoverCallback(hitIndex);
          }
        }
      }
    } else {
      if (this.hoveredNodeIndex !== -1) {
        this.hoveredNodeIndex = -1;
        this.container.style.cursor = 'default';

        this.nodeOrbGroups.forEach((g, idx) => {
          if (idx <= this.maxUnlockedIndex && idx !== this.selectedNodeIndex) {
            g.userData.targetScale = 1.0;
          } else if (idx > this.maxUnlockedIndex) {
            g.userData.targetScale = 0.75;
          }
        });

        if (this.onNodeHoverCallback) {
          this.onNodeHoverCallback(-1);
        }
      }
    }
  }

  onPointerClick(event) {
    if (event.target.tagName === 'BUTTON' || event.target.closest('.ui-control')) {
      return;
    }

    if (this.hoveredNodeIndex !== -1 && this.hoveredNodeIndex <= this.maxUnlockedIndex) {
      this.selectedNodeIndex = this.hoveredNodeIndex;
      
      this.nodeOrbGroups.forEach((g, idx) => {
        if (idx === this.selectedNodeIndex) {
          g.userData.targetScale = 1.5;
        } else if (idx <= this.maxUnlockedIndex) {
          g.userData.targetScale = 0.85;
        } else {
          g.userData.targetScale = 0.75;
        }
      });

      if (this.onNodeSelectCallback) {
        this.onNodeSelectCallback(this.selectedNodeIndex);
      }
    } else {
      if (this.selectedNodeIndex !== -1) {
        this.selectedNodeIndex = -1;
        
        this.nodeOrbGroups.forEach((g, idx) => {
          g.userData.targetScale = idx <= this.maxUnlockedIndex ? 1.0 : 0.75;
        });

        if (this.onBackgroundClickCallback) {
          this.onBackgroundClickCallback();
        }
      }
    }
  }

  onNodeSelect(cb) {
    this.onNodeSelectCallback = cb;
  }

  onNodeHover(cb) {
    this.onNodeHoverCallback = cb;
  }

  onBackgroundClick(cb) {
    this.onBackgroundClickCallback = cb;
  }
}
