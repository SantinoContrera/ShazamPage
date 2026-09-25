/**
 * World-Space Anchors Module — HTML/CSS Bridge
 * Projects 3D node world coordinates (X, Y, Z) to 2D Screen Space (PX, PY)
 * dynamically on every frame, supporting progressive unlock visibility.
 */

import * as THREE from 'three';
import { getCanonicalNodes } from '../scene/shazamPath.js';

export class WorldSpaceAnchorManager {
  constructor(camera, container) {
    this.camera = camera;
    this.container = container;
    this.nodes = getCanonicalNodes();
    this.anchorElements = [];
    this.nodeOrbGroups = [];
    this.projVector = new THREE.Vector3();
    this.maxUnlockedIndex = 0;
    this.activeNodeIndex = -1;
  }

  init(overlayContainer, nodeOrbGroups) {
    this.overlayContainer = overlayContainer || document.getElementById('anchors-layer');
    this.nodeOrbGroups = nodeOrbGroups || [];
    if (!this.overlayContainer) return;

    // Create 4 DOM Anchor Elements
    this.nodes.forEach((node, idx) => {
      const el = document.createElement('div');
      el.className = 'node-anchor';
      if (idx > this.maxUnlockedIndex) {
        el.classList.add('locked');
      }
      el.dataset.nodeIndex = idx;
      el.dataset.nodeId = node.id;
      
      // Node indicator marker, header label & contextual HTML/CSS content slot
      el.innerHTML = `
        <div class="anchor-ring"></div>
        <div class="anchor-label">
          <span class="node-num">0${idx + 1}</span>
          <span class="node-title">${node.title}</span>
        </div>
        <div class="node-content-container" id="node-content-${idx}" data-node-index="${idx}">
          <!-- Contextual 2D HTML/CSS Content Container Slot for Node 0${idx + 1} -->
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (idx <= this.maxUnlockedIndex && this.onAnchorClickCallback) {
          this.onAnchorClickCallback(idx);
        }
      });

      this.overlayContainer.appendChild(el);
      this.anchorElements.push(el);
    });
  }

  onAnchorClick(cb) {
    this.onAnchorClickCallback = cb;
  }

  setMaxUnlockedIndex(maxUnlockedIndex) {
    this.maxUnlockedIndex = maxUnlockedIndex;
    this.anchorElements.forEach((el, idx) => {
      if (idx <= this.maxUnlockedIndex) {
        el.classList.remove('locked');
      } else {
        el.classList.add('locked');
      }
    });
  }

  /**
   * Projects 3D node position onto 2D screen space on every frame tick.
   */
  update() {
    if (!this.camera || this.anchorElements.length === 0) return;

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.nodes.forEach((node, idx) => {
      const el = this.anchorElements[idx];
      if (!el) return;

      // Get precise 3D world position from nodeOrbGroup if available, or static position
      if (this.nodeOrbGroups[idx]) {
        this.nodeOrbGroups[idx].getWorldPosition(this.projVector);
      } else {
        this.projVector.copy(node.position);
      }

      // Project 3D vector to Normalized Device Coordinates (NDC: -1 to +1)
      this.projVector.project(this.camera);

      // Check if point is in front of the camera frustum (NDC Z < 1.0)
      const isVisible = this.projVector.z < 1.0;

      if (isVisible) {
        // Convert NDC to pixel coordinates
        const x = (this.projVector.x * 0.5 + 0.5) * width;
        const y = (-this.projVector.y * 0.5 + 0.5) * height;

        el.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
      } else {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
      }
    });
  }

  /**
   * Enforces strict contextual activeNode visibility: ONLY the currently selected node
   * shows its label and HTML/CSS content container overlay.
   */
  setActiveNode(activeIndex) {
    this.activeNodeIndex = activeIndex;
    this.anchorElements.forEach((el, idx) => {
      const isSelectedNode = idx === activeIndex && idx <= this.maxUnlockedIndex;
      if (isSelectedNode) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  setActiveAnchor(activeIndex) {
    this.setActiveNode(activeIndex);
  }
}
