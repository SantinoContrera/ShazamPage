/**
 * Three.js Master Scene Module
 * Configures WebGLRenderer, Lighting, Environment Frame, Post-Processing Bloom,
 * and standard animation render loops.
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { CONFIG } from '../config/config.js';
import { EnvironmentFrame } from './frame.js';

export class AppScene {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.renderer = null;
    this.composer = null;
    this.bloomPass = null;
    this.environmentFrame = null;
    this.nodePointLights = [];
  }

  init() {
    // 1. Initialize Three.js Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(CONFIG.colors.background);
    this.scene.fog = new THREE.FogExp2(CONFIG.colors.background, 0.035);

    // 2. Initialize WebGLRenderer
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // Append canvas
    this.container.appendChild(this.renderer.domElement);

    // 3. Initialize Lighting
    this.setupLighting();

    // 4. Initialize Metallic Environment Frame
    this.environmentFrame = new EnvironmentFrame(this.scene);
    this.environmentFrame.init();

    // 5. Initialize Post-Processing Bloom Pipeline
    this.setupPostProcessing(width, height);
  }

  /**
   * Configures key lights, rim lights, and dynamic point lights at node coordinates.
   */
  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x1a2638, 1.2);
    this.scene.add(ambientLight);

    // Key directional light for metallic frame specular reflections
    const keyLight = new THREE.DirectionalLight(0xa0c8ff, 2.5);
    keyLight.position.set(5, 8, 10);
    this.scene.add(keyLight);

    // Cool blue rim light
    const rimLight = new THREE.DirectionalLight(0x00d2ff, 3.0);
    rimLight.position.set(-6, -5, 5);
    this.scene.add(rimLight);

    // Dynamic point lights for each of the 4 electrical nodes
    CONFIG.nodes.forEach((node) => {
      const pointLight = new THREE.PointLight(CONFIG.colors.electricBlue, 2.0, 6);
      pointLight.position.set(node.cameraOffset.x, node.cameraOffset.y, 0.5);
      this.scene.add(pointLight);
      this.nodePointLights.push(pointLight);
    });
  }

  /**
   * Configures EffectComposer with UnrealBloomPass.
   */
  setupPostProcessing(width, height) {
    try {
      this.composer = new EffectComposer(this.renderer);
      const renderPass = new RenderPass(this.scene, null);
      this.composer.addPass(renderPass);

      const resolution = new THREE.Vector2(width, height);
      this.bloomPass = new UnrealBloomPass(
        resolution,
        CONFIG.bloom.strength,
        CONFIG.bloom.radius,
        CONFIG.bloom.threshold
      );
      this.composer.addPass(this.bloomPass);
    } catch (e) {
      console.warn('Post-processing bloom fallback enabled:', e);
      this.composer = null;
    }
  }

  /**
   * Updates environment frame animations on each tick.
   */
  update(time) {
    if (this.environmentFrame) {
      this.environmentFrame.update(time);
    }
  }

  /**
   * Renders a frame using EffectComposer or fallback WebGLRenderer.
   * @param {THREE.Camera} camera 
   */
  render(camera) {
    if (this.composer && camera) {
      this.composer.passes[0].camera = camera;
      this.composer.render();
    } else if (this.renderer && this.scene && camera) {
      this.renderer.render(this.scene, camera);
    }
  }

  /**
   * Handles window resizing and renderer resolution updates.
   */
  onResize(width, height) {
    if (this.renderer) {
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    if (this.composer) {
      this.composer.setSize(width, height);
    }
  }
}
