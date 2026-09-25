/**
 * Metallic Frame, Atmospheric Shazam Ghost Logo & Space Environment Module
 * Replicates the authoritative metallic squircle/diamond frame and space atmosphere
 * from shazam_s_reference.jpg, with smooth anti-aliased ghost Shazam logo integration.
 */

import * as THREE from 'three';
import { CONFIG } from '../config/config.js';

export class EnvironmentFrame {
  constructor(scene) {
    this.scene = scene;
    this.frameMesh = null;
    this.innerBezelMesh = null;
    this.ghostLogoMesh = null;
    this.starfield = null;
    this.nebulaMesh = null;
    this.frameGroup = null;
  }

  init() {
    this.createMetallicFrame();
    this.createAtmosphericGhostLogo();
    this.createSpaceEnvironment();
  }

  /**
   * Constructs the procedural squircle diamond outer frame and circular inner bezel.
   */
  createMetallicFrame() {
    this.frameGroup = new THREE.Group();
    this.frameGroup.name = 'metallicFrameGroup';

    // 1. Create Diamond Squircle Shape with Inner Circular Hole
    const frameShape = new THREE.Shape();
    const size = CONFIG.frame.outerRadius;
    const cornerRadius = 1.4;

    // Diamond squircle vertices with rounded corners (Top, Right, Bottom, Left)
    frameShape.moveTo(0, size - cornerRadius);
    frameShape.quadraticCurveTo(0, size, cornerRadius, size - 0.4);
    frameShape.lineTo(size - 0.4, cornerRadius);
    frameShape.quadraticCurveTo(size, 0, size - 0.4, -cornerRadius);
    frameShape.lineTo(cornerRadius, -size + 0.4);
    frameShape.quadraticCurveTo(0, -size, -cornerRadius, -size + 0.4);
    frameShape.lineTo(-size + 0.4, -cornerRadius);
    frameShape.quadraticCurveTo(-size, 0, -size + 0.4, cornerRadius);
    frameShape.lineTo(-cornerRadius, size - 0.4);
    frameShape.quadraticCurveTo(0, size, 0, size - cornerRadius);

    // Inner circular cutout hole
    const holePath = new THREE.Path();
    const holeRadius = CONFIG.frame.innerRadius;
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    frameShape.holes.push(holePath);

    // Extrude geometry for 3D bevel & depth
    const extrudeSettings = {
      steps: 2,
      depth: CONFIG.frame.depth,
      bevelEnabled: true,
      bevelThickness: 0.25,
      bevelSize: 0.2,
      bevelOffset: 0,
      bevelSegments: 5,
    };

    const frameGeometry = new THREE.ExtrudeGeometry(frameShape, extrudeSettings);
    frameGeometry.center();

    // High-end metallic physical material (Brushed Steel / Dark Titanium)
    const frameMaterial = new THREE.MeshPhysicalMaterial({
      color: CONFIG.colors.frameMetal,
      metalness: 0.92,
      roughness: 0.28,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
      side: THREE.DoubleSide,
    });

    this.frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    this.frameMesh.position.z = -0.6; // Slightly recessed behind the S lightning
    this.frameGroup.add(this.frameMesh);

    // 2. Inner Metallic Ring Bezel (Polished chrome rim)
    const bezelGeo = new THREE.TorusGeometry(holeRadius, 0.12, 16, 100);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: CONFIG.colors.frameHighlight,
      metalness: 0.98,
      roughness: 0.15,
      envMapIntensity: 1.5,
    });

    this.innerBezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    this.innerBezelMesh.position.z = -0.3;
    this.frameGroup.add(this.innerBezelMesh);

    // Apply global sceneScale to frame structure
    const scale = CONFIG.sceneScale || 1.0;
    this.frameGroup.scale.setScalar(scale);

    this.scene.add(this.frameGroup);
  }

  /**
   * Constructs the smooth anti-aliased ghost Shazam logo circle behind the S lightning.
   * Scales up the inner S symbol to occupy 90-95% of the circle inner diameter with a fine clean margin.
   */
  createAtmosphericGhostLogo() {
    const res = 2048; // High-resolution 2K canvas for ultra-sharp anti-aliased output
    const canvas = document.createElement('canvas');
    canvas.width = res;
    canvas.height = res;
    const ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;

    // Load authentic shazam_logo.jpg asset directly
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, res, res);

      // Crop dimension scaled so the inner white S symbol fills ~92% of the circle diameter
      const minDim = Math.min(img.width, img.height);
      const cropDim = minDim * 0.58; 
      const sx = (img.width - cropDim) / 2;
      const sy = (img.height - cropDim) / 2;

      ctx.drawImage(img, sx, sy, cropDim, cropDim, 0, 0, res, res);

      // Sub-pixel alpha feathering to eliminate jagged sawtooth edges
      const imgData = ctx.getImageData(0, 0, res, res);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = r * 0.299 + g * 0.587 + b * 0.114;

        if (lum > 240) {
          data[i + 3] = 0; // Pure white background -> fully transparent
        } else if (lum > 185) {
          const factor = (240 - lum) / 55.0; // Smooth sub-pixel alpha blend
          data[i + 3] = Math.round(data[i + 3] * factor);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      texture.needsUpdate = true;
    };
    const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : './';
    img.src = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}shazam_logo.jpg`;

    // Plane geometry matching the inner circle of the metallic frame
    const logoSize = CONFIG.frame.innerRadius * 1.65; // ~8.41 units
    const logoGeo = new THREE.PlaneGeometry(logoSize, logoSize);

    const logoMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: CONFIG.shazamLogoOpacity || 0.04, // ~4% Subliminal Opacity
      alphaTest: 0.001,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
    });

    this.ghostLogoMesh = new THREE.Mesh(logoGeo, logoMat);
    // Positioned aligned behind the S lightning at z = -0.42, centered with the frame
    this.ghostLogoMesh.position.set(0, 0, -0.42);

    if (this.frameGroup) {
      this.frameGroup.add(this.ghostLogoMesh);
    }
  }

  /**
   * Constructs atmospheric background nebula and 3D starfield particles.
   */
  createSpaceEnvironment() {
    const starCount = 800;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    const baseColor = new THREE.Color(CONFIG.colors.electricCyan);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      const radius = 10 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5;

      const mixRatio = Math.random();
      const finalColor = baseColor.clone().lerp(whiteColor, mixRatio);
      colors[i * 3] = finalColor.r;
      colors[i * 3 + 1] = finalColor.g;
      colors[i * 3 + 2] = finalColor.b;

      sizes[i] = 0.03 + Math.random() * 0.08;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.28,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    this.starfield = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.starfield);

    const backdropGeo = new THREE.PlaneGeometry(45, 45);
    const backdropMat = new THREE.MeshBasicMaterial({
      color: CONFIG.colors.spaceNebula,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    this.nebulaMesh = new THREE.Mesh(backdropGeo, backdropMat);
    this.nebulaMesh.position.z = -12;
    this.scene.add(this.nebulaMesh);
  }

  update(time) {
    if (this.starfield) {
      this.starfield.rotation.z = time * 0.015;
    }
  }
}
