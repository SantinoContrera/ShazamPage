/**
 * Camera System & Cinematic GSAP Navigation Module
 * Manages PerspectiveCamera, top-down validation view, 
 * cinematic camera positioning, targets, and smooth transitions.
 */

import * as THREE from 'three';
import gsap from 'gsap';
import { CONFIG } from '../config/config.js';
import { getCanonicalNodes } from '../scene/shazamPath.js';

export class CameraSystem {
  constructor() {
    this.camera = null;
    this.nodes = getCanonicalNodes();
    this.currentMode = 'OVERVIEW'; // 'OVERVIEW' | 'NODE_FOCUS' | 'TOP_DOWN'
    this.activeNodeIndex = -1;

    // Camera target vector tracked during GSAP animations
    this.targetVector = new THREE.Vector3(
      CONFIG.camera.overviewTarget.x,
      CONFIG.camera.overviewTarget.y,
      CONFIG.camera.overviewTarget.z
    );

    // Active GSAP tween instances
    this.posTween = null;
    this.targetTween = null;
  }

  init(aspectRatio) {
    this.camera = new THREE.PerspectiveCamera(
      CONFIG.camera.fov,
      aspectRatio,
      CONFIG.camera.near,
      CONFIG.camera.far
    );

    // Initial Overview Position
    this.camera.position.set(
      CONFIG.camera.overviewPosition.x,
      CONFIG.camera.overviewPosition.y,
      CONFIG.camera.overviewPosition.z
    );
    this.camera.lookAt(this.targetVector);
  }

  /**
   * Updates camera aspect ratio on window resize.
   */
  updateAspectRatio(aspectRatio) {
    if (this.camera) {
      this.camera.aspect = aspectRatio;
      this.camera.updateProjectionMatrix();
    }
  }

  /**
   * Smoothly transitions camera to Overview mode showing full S lightning structure.
   */
  transitionToOverview() {
    this.currentMode = 'OVERVIEW';
    this.activeNodeIndex = -1;

    const targetPos = CONFIG.camera.overviewPosition;
    const targetLookAt = CONFIG.camera.overviewTarget;

    this.animateCamera(targetPos, targetLookAt);
  }

  /**
   * Smoothly transitions camera to a specific node focus view.
   * @param {number} nodeIndex 0 to 3
   */
  transitionToNode(nodeIndex) {
    if (nodeIndex < 0 || nodeIndex >= this.nodes.length) return;

    this.currentMode = 'NODE_FOCUS';
    this.activeNodeIndex = nodeIndex;

    const node = this.nodes[nodeIndex];
    
    // Calculate focused 3D camera position maintaining spatial context
    const cameraPos = {
      x: node.position.x + node.cameraOffset.x,
      y: node.position.y + node.cameraOffset.y,
      z: node.position.z + node.cameraOffset.z,
    };

    const targetLookAt = {
      x: node.position.x,
      y: node.position.y,
      z: node.position.z,
    };

    this.animateCamera(cameraPos, targetLookAt);
  }

  /**
   * Sets top-down camera view for visual silhouette verification against shazam_s_reference.jpg.
   */
  setTopDownView() {
    this.currentMode = 'TOP_DOWN';
    this.activeNodeIndex = -1;

    const targetPos = CONFIG.camera.topDownPosition;
    const targetLookAt = CONFIG.camera.topDownTarget;

    this.animateCamera(targetPos, targetLookAt);
  }

  /**
   * Core GSAP Animation Driver for position and lookAt interpolation.
   */
  animateCamera(targetPos, targetLookAt) {
    // Kill existing tweens to prevent stutter
    if (this.posTween) this.posTween.kill();
    if (this.targetTween) this.targetTween.kill();

    const duration = CONFIG.camera.transitionDuration;
    const ease = CONFIG.camera.transitionEase;

    // 1. Animate Camera Position
    this.posTween = gsap.to(this.camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: duration,
      ease: ease,
    });

    // 2. Animate Camera Target Vector
    this.targetTween = gsap.to(this.targetVector, {
      x: targetLookAt.x,
      y: targetLookAt.y,
      z: targetLookAt.z,
      duration: duration,
      ease: ease,
      onUpdate: () => {
        this.camera.lookAt(this.targetVector);
      },
    });
  }

  /**
   * Updates camera lookAt on each frame tick.
   */
  update() {
    if (this.camera) {
      this.camera.lookAt(this.targetVector);
    }
  }

  getCamera() {
    return this.camera;
  }
}
