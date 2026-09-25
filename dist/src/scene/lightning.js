/**
 * Procedural Supernatural Lightning & Node Energy System
 * Replicates the intense electric S bolt, secondary branching tendrils,
 * node plasma spheres, and energy spark particles from shazam_s_reference.jpg.
 */

import * as THREE from 'three';
import { CONFIG } from '../config/config.js';
import { canonicalCurve, getCanonicalNodes } from './shazamPath.js';

export class LightningSystem {
  constructor(scene) {
    this.scene = scene;
    this.config = CONFIG.lightning;
    
    // Core graphics objects & Group container
    this.lightningGroup = new THREE.Group();
    this.lightningGroup.name = 'lightningGroup';

    this.mainLightningMesh = null;
    this.mainLightningGeo = null;
    this.secondaryLightningLines = null;
    this.secondaryLightningGeo = null;
    
    this.nodeOrbGroups = [];
    this.sparkParticles = null;
    this.sparkPositions = null;
    this.sparkVelocities = [];

    // Internal state
    this.nodes = getCanonicalNodes();
    this.basePoints = [];
    this.jitteredPoints = [];
    this.maxUnlockedIndex = 0;
  }

  init() {
    // Apply global sceneScale to the lightning group container
    const scale = CONFIG.sceneScale || 1.0;
    this.lightningGroup.scale.setScalar(scale);
    this.scene.add(this.lightningGroup);

    this.sampleBasePoints();
    this.createMainLightning();
    this.createSecondaryBranches();
    this.createNodePlasmaOrbs();
    this.createSparkParticles();
  }

  sampleBasePoints() {
    const segments = this.config.segmentCount;
    this.basePoints = canonicalCurve.getSpacedPoints(segments);
    this.jitteredPoints = this.basePoints.map(p => p.clone());
  }

  createMainLightning() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.basePoints.length * 3);
    const colors = new Float32Array(this.basePoints.length * 3);

    const baseColor = new THREE.Color(CONFIG.colors.electricBlue);
    const coreColor = new THREE.Color(CONFIG.colors.coreWhite);

    for (let i = 0; i < this.basePoints.length; i++) {
      positions[i * 3] = this.basePoints[i].x;
      positions[i * 3 + 1] = this.basePoints[i].y;
      positions[i * 3 + 2] = this.basePoints[i].z;

      const mixRatio = Math.sin((i / this.basePoints.length) * Math.PI);
      const c = baseColor.clone().lerp(coreColor, 0.4 + mixRatio * 0.5);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      linewidth: 3,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    this.mainLightningGeo = geometry;
    this.mainLightningMesh = new THREE.Line(geometry, material);
    this.lightningGroup.add(this.mainLightningMesh);

    const glowMat = new THREE.LineBasicMaterial({
      color: CONFIG.colors.electricCyan,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    this.mainLightningGlow = new THREE.Line(geometry, glowMat);
    this.lightningGroup.add(this.mainLightningGlow);
  }

  createSecondaryBranches() {
    const branchCount = 35;
    const maxBranchPoints = 6;
    const positions = new Float32Array(branchCount * maxBranchPoints * 6);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.LineBasicMaterial({
      color: CONFIG.colors.electricCyan,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    this.secondaryLightningGeo = geometry;
    this.secondaryLightningLines = new THREE.LineSegments(geometry, material);
    this.lightningGroup.add(this.secondaryLightningLines);
  }

  createNodePlasmaOrbs() {
    this.nodes.forEach((node, idx) => {
      const group = new THREE.Group();
      group.position.copy(node.rawPosition);
      group.name = `nodeOrbGroup_${idx}`;

      const isInitiallyUnlocked = idx === 0;

      // 1. Swirling Plasma Wireframe Sphere
      const sphereGeo = new THREE.IcosahedronGeometry(0.38, 2);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: isInitiallyUnlocked ? CONFIG.colors.electricBlue : CONFIG.colors.nodeLockedCyan,
        wireframe: true,
        transparent: true,
        opacity: isInitiallyUnlocked ? 0.75 : 0.45,
        blending: THREE.AdditiveBlending,
      });
      const orbMesh = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(orbMesh);

      // 2. Inner Glowing Core Flare
      const coreGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: isInitiallyUnlocked ? CONFIG.colors.coreWhite : CONFIG.colors.nodeLockedCore,
        transparent: true,
        opacity: isInitiallyUnlocked ? 0.95 : 0.55,
        blending: THREE.AdditiveBlending,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // 3. Surrounding Plasma Ring Torus
      const ringGeo = new THREE.TorusGeometry(0.48, 0.02, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isInitiallyUnlocked ? CONFIG.colors.electricCyan : CONFIG.colors.nodeLockedCyan,
        transparent: true,
        opacity: isInitiallyUnlocked ? 0.65 : 0.35,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      group.add(ringMesh);

      group.userData = {
        orbMesh,
        coreMesh,
        ringMesh,
        baseScale: 1.0,
        targetScale: isInitiallyUnlocked ? 1.0 : 0.85,
        nodeId: node.id,
        nodeIndex: idx,
        isUnlocked: isInitiallyUnlocked,
      };

      this.lightningGroup.add(group);
      this.nodeOrbGroups.push(group);
    });
  }

  setMaxUnlockedIndex(maxUnlockedIndex) {
    this.maxUnlockedIndex = maxUnlockedIndex;
    this.nodeOrbGroups.forEach((group, idx) => {
      const isUnlocked = idx <= this.maxUnlockedIndex;
      group.userData.isUnlocked = isUnlocked;

      const { orbMesh, coreMesh, ringMesh } = group.userData;
      if (isUnlocked) {
        // Bright, active, electric cyan/white glowing unlocked visual state
        orbMesh.material.color.setHex(CONFIG.colors.electricBlue);
        orbMesh.material.opacity = 0.75;

        coreMesh.material.color.setHex(CONFIG.colors.coreWhite);
        coreMesh.material.opacity = 0.95;

        ringMesh.material.color.setHex(CONFIG.colors.electricCyan);
        ringMesh.material.opacity = 0.65;

        if (group.userData.targetScale < 1.0) group.userData.targetScale = 1.0;
      } else {
        // Cool desaturated slate GREY, slightly dimmer but clearly visible locked visual state
        orbMesh.material.color.setHex(CONFIG.colors.nodeLockedCyan);
        orbMesh.material.opacity = 0.45;

        coreMesh.material.color.setHex(CONFIG.colors.nodeLockedCore);
        coreMesh.material.opacity = 0.55;

        ringMesh.material.color.setHex(CONFIG.colors.nodeLockedCyan);
        ringMesh.material.opacity = 0.35;

        group.userData.targetScale = 0.85;
      }
    });
  }

  createSparkParticles() {
    const count = this.config.particleDensity;
    const geometry = new THREE.BufferGeometry();
    this.sparkPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const baseColor = new THREE.Color(CONFIG.colors.electricBlue);
    const cyanColor = new THREE.Color(CONFIG.colors.electricCyan);

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const pt = canonicalCurve.getPointAt(t);

      const spread = 0.6;
      const px = pt.x + (Math.random() - 0.5) * spread;
      const py = pt.y + (Math.random() - 0.5) * spread;
      const pz = pt.z + (Math.random() - 0.5) * spread;

      this.sparkPositions[i * 3] = px;
      this.sparkPositions[i * 3 + 1] = py;
      this.sparkPositions[i * 3 + 2] = pz;

      this.sparkVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      );

      const c = baseColor.clone().lerp(cyanColor, Math.random());
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(this.sparkPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    this.sparkParticles = new THREE.Points(geometry, material);
    this.lightningGroup.add(this.sparkParticles);
  }

  update(time, deltaTime) {
    const positions = this.mainLightningGeo.attributes.position.array;
    const jitterAmount = this.config.jitter;
    const speed = this.config.animationSpeed;

    for (let i = 0; i < this.basePoints.length; i++) {
      const isEndpoint = i === 0 || i === this.basePoints.length - 1;
      const isNode = i === Math.floor(this.basePoints.length * 0.33) || i === Math.floor(this.basePoints.length * 0.67);

      if (!isEndpoint && !isNode) {
        const noiseX = (Math.sin(time * speed * 8 + i * 0.5) * 0.5 + (Math.random() - 0.5)) * jitterAmount;
        const noiseY = (Math.cos(time * speed * 9 + i * 0.6) * 0.5 + (Math.random() - 0.5)) * jitterAmount;
        const noiseZ = (Math.sin(time * speed * 7 + i * 0.4) * 0.5 + (Math.random() - 0.5)) * jitterAmount * 0.5;

        positions[i * 3] = this.basePoints[i].x + noiseX;
        positions[i * 3 + 1] = this.basePoints[i].y + noiseY;
        positions[i * 3 + 2] = this.basePoints[i].z + noiseZ;
      } else {
        positions[i * 3] = this.basePoints[i].x;
        positions[i * 3 + 1] = this.basePoints[i].y;
        positions[i * 3 + 2] = this.basePoints[i].z;
      }
    }
    this.mainLightningGeo.attributes.position.needsUpdate = true;

    if (this.secondaryLightningGeo) {
      const branchPos = this.secondaryLightningGeo.attributes.position.array;
      let ptr = 0;
      const step = Math.floor(this.basePoints.length / 25);

      for (let i = 0; i < this.basePoints.length; i += step) {
        if (ptr + 6 >= branchPos.length) break;

        const px = positions[i * 3];
        const py = positions[i * 3 + 1];
        const pz = positions[i * 3 + 2];

        branchPos[ptr] = px;
        branchPos[ptr + 1] = py;
        branchPos[ptr + 2] = pz;

        const angle = (time * 5 + i) % (Math.PI * 2);
        const len = 0.2 + Math.sin(time * 10 + i) * 0.15;
        branchPos[ptr + 3] = px + Math.cos(angle) * len;
        branchPos[ptr + 4] = py + Math.sin(angle) * len;
        branchPos[ptr + 5] = pz + (Math.random() - 0.5) * 0.3;

        ptr += 6;
      }
      this.secondaryLightningGeo.attributes.position.needsUpdate = true;
    }

    this.nodeOrbGroups.forEach((group, idx) => {
      const { orbMesh, ringMesh, targetScale } = group.userData;
      
      const currentScale = group.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      group.scale.setScalar(newScale);

      orbMesh.rotation.y = time * (1.2 + idx * 0.2);
      orbMesh.rotation.z = time * 0.8;
      ringMesh.rotation.z = -time * 1.5;
    });

    if (this.sparkPositions) {
      const count = this.sparkPositions.length / 3;
      for (let i = 0; i < count; i++) {
        this.sparkPositions[i * 3] += this.sparkVelocities[i].x;
        this.sparkPositions[i * 3 + 1] += this.sparkVelocities[i].y;
        this.sparkPositions[i * 3 + 2] += this.sparkVelocities[i].z;

        if (Math.abs(this.sparkPositions[i * 3]) > 7) {
          const pt = canonicalCurve.getPointAt(Math.random());
          this.sparkPositions[i * 3] = pt.x;
          this.sparkPositions[i * 3 + 1] = pt.y;
          this.sparkPositions[i * 3 + 2] = pt.z;
        }
      }
      this.sparkParticles.geometry.attributes.position.needsUpdate = true;
    }
  }

  getNodeOrbGroups() {
    return this.nodeOrbGroups;
  }
}
