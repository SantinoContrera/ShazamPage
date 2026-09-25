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

    this.mainLightningMesh1 = null;
    this.mainLightningGeo1 = null;
    this.mainLightningMesh2 = null;
    this.mainLightningGeo2 = null;

    this.secondaryLightningLines = null;
    this.secondaryLightningGeo = null;
    
    this.nodeOrbGroups = [];
    this.sparkParticles = null;
    this.sparkPositions = null;
    this.sparkVelocities = [];

    // Internal state
    this.nodes = getCanonicalNodes();
    this.basePoints1 = [];
    this.basePoints2 = [];
    this.curve1 = null;
    this.curve2 = null;
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
    const totalSegments = this.config.segmentCount || 120;
    const half = Math.floor(totalSegments / 2);
    this.basePoints1 = [];
    this.basePoints2 = [];

    if (this.nodes && this.nodes.length >= 4) {
      const n1 = this.nodes[0].rawPosition;
      const n2 = this.nodes[1].rawPosition;
      const n3 = this.nodes[2].rawPosition;
      const n4 = this.nodes[3].rawPosition;

      // Curved Bezier segment N1 -> N2 (Lower Shazam S stripe, control point shifted left to 3.65, Y fixed at -1.20)
      const ctrl1 = new THREE.Vector3(3.65, -1.20, 0.2);
      this.curve1 = new THREE.QuadraticBezierCurve3(n1, ctrl1, n2);
      for (let i = 0; i < half; i++) {
        const t = i / (half - 1);
        this.basePoints1.push(this.curve1.getPoint(t));
      }

      // Curved Bezier segment N3 -> N4 (Upper Shazam S stripe, X fixed at -3.15, Y shifted further down to 1.20)
      const ctrl2 = new THREE.Vector3(-3.15, 1.20, 0.2);
      this.curve2 = new THREE.QuadraticBezierCurve3(n3, ctrl2, n4);
      for (let i = 0; i < half; i++) {
        const t = i / (half - 1);
        this.basePoints2.push(this.curve2.getPoint(t));
      }
    } else {
      this.curve1 = canonicalCurve;
      this.basePoints1 = canonicalCurve.getSpacedPoints(half);
      this.basePoints2 = [];
    }
  }

  createMainLightning() {
    const baseColor = new THREE.Color(CONFIG.colors.electricBlue);
    const coreColor = new THREE.Color(CONFIG.colors.coreWhite);
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      linewidth: 3,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    // 1. Ray 1: N1 -> N2
    const geo1 = new THREE.BufferGeometry();
    const pos1 = new Float32Array(this.basePoints1.length * 3);
    const col1 = new Float32Array(this.basePoints1.length * 3);

    for (let i = 0; i < this.basePoints1.length; i++) {
      pos1[i * 3] = this.basePoints1[i].x;
      pos1[i * 3 + 1] = this.basePoints1[i].y;
      pos1[i * 3 + 2] = this.basePoints1[i].z;

      const mixRatio = Math.sin((i / this.basePoints1.length) * Math.PI);
      const c = baseColor.clone().lerp(coreColor, 0.4 + mixRatio * 0.5);
      col1[i * 3] = c.r;
      col1[i * 3 + 1] = c.g;
      col1[i * 3 + 2] = c.b;
    }

    geo1.setAttribute('position', new THREE.BufferAttribute(pos1, 3));
    geo1.setAttribute('color', new THREE.BufferAttribute(col1, 3));
    this.mainLightningGeo1 = geo1;
    this.mainLightningMesh1 = new THREE.Line(geo1, material);
    this.lightningGroup.add(this.mainLightningMesh1);

    // 2. Ray 2: N3 -> N4
    if (this.basePoints2.length > 0) {
      const geo2 = new THREE.BufferGeometry();
      const pos2 = new Float32Array(this.basePoints2.length * 3);
      const col2 = new Float32Array(this.basePoints2.length * 3);

      for (let i = 0; i < this.basePoints2.length; i++) {
        pos2[i * 3] = this.basePoints2[i].x;
        pos2[i * 3 + 1] = this.basePoints2[i].y;
        pos2[i * 3 + 2] = this.basePoints2[i].z;

        const mixRatio = Math.sin((i / this.basePoints2.length) * Math.PI);
        const c = baseColor.clone().lerp(coreColor, 0.4 + mixRatio * 0.5);
        col2[i * 3] = c.r;
        col2[i * 3 + 1] = c.g;
        col2[i * 3 + 2] = c.b;
      }

      geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
      geo2.setAttribute('color', new THREE.BufferAttribute(col2, 3));
      this.mainLightningGeo2 = geo2;
      this.mainLightningMesh2 = new THREE.Line(geo2, material);
      this.lightningGroup.add(this.mainLightningMesh2);
    }
  }

  createSecondaryBranches() {
    const branchCount = 36;
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
      const sphereGeo = new THREE.IcosahedronGeometry(0.28, 2);
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
      const coreGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: isInitiallyUnlocked ? CONFIG.colors.coreWhite : CONFIG.colors.nodeLockedCore,
        transparent: true,
        opacity: isInitiallyUnlocked ? 0.95 : 0.55,
        blending: THREE.AdditiveBlending,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // 3. Surrounding Plasma Ring Torus
      const ringGeo = new THREE.TorusGeometry(0.36, 0.015, 8, 32);
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
        // Nodes 0 & 1 use Electric Cyan, Nodes 2 & 3 (Nuclei 3 & 4) use Electric Purple (0xb545ff)
        const isPurpleNode = idx >= 2;
        const mainColor = isPurpleNode ? 0xb545ff : CONFIG.colors.electricBlue;
        const ringColor = isPurpleNode ? 0xb545ff : CONFIG.colors.electricCyan;

        orbMesh.material.color.setHex(mainColor);
        orbMesh.material.opacity = 0.75;

        coreMesh.material.color.setHex(CONFIG.colors.coreWhite);
        coreMesh.material.opacity = 0.95;

        ringMesh.material.color.setHex(ringColor);
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
      const isRay2 = Math.random() > 0.5 && this.curve2;
      const curve = isRay2 ? this.curve2 : this.curve1;
      const t = Math.random();
      const pt = curve.getPoint(t);

      const spread = 0.5;
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
      size: 0.07,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });

    this.sparkParticles = new THREE.Points(geometry, material);
    this.lightningGroup.add(this.sparkParticles);
  }

  update(time, deltaTime) {
    const jitterAmount = this.config.jitter;
    const speed = this.config.animationSpeed;

    // Update Ray 1 (N1 -> N2)
    if (this.mainLightningGeo1) {
      const positions1 = this.mainLightningGeo1.attributes.position.array;
      const len1 = this.basePoints1.length;
      for (let i = 0; i < len1; i++) {
        const isEndpoint = i === 0 || i === len1 - 1;
        if (!isEndpoint) {
          const noiseX = (Math.sin(time * speed * 8 + i * 0.5) * 0.5 + (Math.random() - 0.5)) * jitterAmount;
          const noiseY = (Math.cos(time * speed * 9 + i * 0.6) * 0.5 + (Math.random() - 0.5)) * jitterAmount;
          const noiseZ = (Math.sin(time * speed * 7 + i * 0.4) * 0.5 + (Math.random() - 0.5)) * jitterAmount * 0.5;
          positions1[i * 3] = this.basePoints1[i].x + noiseX;
          positions1[i * 3 + 1] = this.basePoints1[i].y + noiseY;
          positions1[i * 3 + 2] = this.basePoints1[i].z + noiseZ;
        } else {
          positions1[i * 3] = this.basePoints1[i].x;
          positions1[i * 3 + 1] = this.basePoints1[i].y;
          positions1[i * 3 + 2] = this.basePoints1[i].z;
        }
      }
      this.mainLightningGeo1.attributes.position.needsUpdate = true;
    }

    // Update Ray 2 (N3 -> N4)
    if (this.mainLightningGeo2) {
      const positions2 = this.mainLightningGeo2.attributes.position.array;
      const len2 = this.basePoints2.length;
      for (let i = 0; i < len2; i++) {
        const isEndpoint = i === 0 || i === len2 - 1;
        if (!isEndpoint) {
          const noiseX = (Math.sin(time * speed * 8 + i * 0.5 + 2) * 0.5 + (Math.random() - 0.5)) * jitterAmount;
          const noiseY = (Math.cos(time * speed * 9 + i * 0.6 + 2) * 0.5 + (Math.random() - 0.5)) * jitterAmount;
          const noiseZ = (Math.sin(time * speed * 7 + i * 0.4 + 2) * 0.5 + (Math.random() - 0.5)) * jitterAmount * 0.5;
          positions2[i * 3] = this.basePoints2[i].x + noiseX;
          positions2[i * 3 + 1] = this.basePoints2[i].y + noiseY;
          positions2[i * 3 + 2] = this.basePoints2[i].z + noiseZ;
        } else {
          positions2[i * 3] = this.basePoints2[i].x;
          positions2[i * 3 + 1] = this.basePoints2[i].y;
          positions2[i * 3 + 2] = this.basePoints2[i].z;
        }
      }
      this.mainLightningGeo2.attributes.position.needsUpdate = true;
    }

    // Update Secondary Branches along Ray 1 and Ray 2
    if (this.secondaryLightningGeo) {
      const branchPos = this.secondaryLightningGeo.attributes.position.array;
      let ptr = 0;
      const allPoints = [...this.basePoints1, ...this.basePoints2];
      const step = Math.floor(allPoints.length / 18);

      for (let i = 0; i < allPoints.length; i += step) {
        if (ptr + 6 >= branchPos.length) break;

        const pt = allPoints[i];
        branchPos[ptr] = pt.x;
        branchPos[ptr + 1] = pt.y;
        branchPos[ptr + 2] = pt.z;

        const angle = (time * 5 + i) % (Math.PI * 2);
        const len = 0.2 + Math.sin(time * 10 + i) * 0.15;
        branchPos[ptr + 3] = pt.x + Math.cos(angle) * len;
        branchPos[ptr + 4] = pt.y + Math.sin(angle) * len;
        branchPos[ptr + 5] = pt.z + (Math.random() - 0.5) * 0.3;

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
          const isRay2 = Math.random() > 0.5 && this.curve2;
          const curve = isRay2 ? this.curve2 : this.curve1;
          const pt = curve.getPoint(Math.random());
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
