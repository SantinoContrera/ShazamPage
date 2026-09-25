/**
 * Shazam 3D Web Infographic - Central Configuration
 * Master parameters for Canonical S, Lightning, Camera, Nodes, Frame & Post-Processing.
 */

export const CONFIG = {
  // Global Scene Scale parameter - compact size (~35-40% viewport width)
  sceneScale: 0.55,

  // Subtle Atmospheric Shazam Logo Circle Opacity (Extremely low ~4%)
  shazamLogoOpacity: 0.04,

  // Visual & Color Palette
  colors: {
    background: 0x030308,
    spaceNebula: 0x050d1a,
    electricBlue: 0x00e5ff,
    electricCyan: 0x80ffff,
    coreWhite: 0xffffff,
    plasmaGlow: 0x1a8cff,
    nodeNormal: 0x00d2ff,
    nodeHover: 0x00ffff,
    nodeSelected: 0xffffff,
    nodeLocked: 0x3a4556,
    nodeLockedCyan: 0x3a4556,
    nodeLockedCore: 0x64748b,
    ctaDisabled: 0x475569,
    ctaActive: 0x00e5ff,
    frameMetal: 0x4a5568,
    frameDark: 0x1a202c,
    frameHighlight: 0xa0aec0,
  },

  // Lightning Procedural System Parameters
  lightning: {
    thickness: 0.18,
    branchDensity: 0.4,
    branchLength: 1.2,
    jitter: 0.12,
    glowIntensity: 2.2,
    animationSpeed: 3.5,
    segmentCount: 120,
    particleDensity: 600,
    pulseSpeed: 2.0,
  },

  // Canonical S Path Control Points & 4 Infographic Nodes
  nodes: [
    {
      id: 'node-1',
      index: 0,
      title: '01. AUDIO FINGERPRINTING',
      subtitle: 'Acoustic Landmarks & Time-Frequency Peaks',
      pathT: 0.0,
      cameraOffset: { x: -0.5, y: 0.25, z: 2.8 },
      focusTargetOffset: { x: -1.2, y: -1.2, z: 0.2 },
      unlocked: true,
    },
    {
      id: 'node-2',
      index: 1,
      title: '02. SPECTROGRAM HASHING',
      subtitle: 'Combinatorial Hash Pairs & Peak Extraction',
      pathT: 0.33,
      cameraOffset: { x: 0.5, y: -0.1, z: 2.8 },
      focusTargetOffset: { x: 1.2, y: -0.7, z: 0.1 },
      unlocked: false,
    },
    {
      id: 'node-3',
      index: 2,
      title: '03. DATABASE MATCHING',
      subtitle: 'Sub-Second Inverted Index Search',
      pathT: 0.67,
      cameraOffset: { x: -0.5, y: 0.1, z: 2.8 },
      focusTargetOffset: { x: -1.0, y: 0.8, z: 0.1 },
      unlocked: false,
    },
    {
      id: 'node-4',
      index: 3,
      title: '04. GLOBAL SCALE & EVOLUTION',
      subtitle: 'Over 100 Billion Shazam Identifications',
      pathT: 1.0,
      cameraOffset: { x: 0.5, y: 0.25, z: 2.8 },
      focusTargetOffset: { x: 1.0, y: 1.2, z: 0.2 },
      unlocked: false,
    },
  ],

  // Camera Cinematic Settings
  camera: {
    fov: 50,
    near: 0.1,
    far: 100,
    overviewPosition: { x: 0, y: 1.2, z: 18.0 },
    overviewTarget: { x: 0, y: -1.8, z: 0 },
    topDownPosition: { x: 0, y: -1.0, z: 18.0 },
    topDownTarget: { x: 0, y: -1.0, z: 0 },
    transitionDuration: 1.8,
    transitionEase: 'power3.inOut',
  },

  // Metallic Frame Proportions
  frame: {
    outerRadius: 6.2,
    innerRadius: 5.1,
    depth: 0.8,
    bevelSize: 0.15,
  },

  // Post-Processing UnrealBloomPass Settings
  bloom: {
    strength: 1.6,
    radius: 0.65,
    threshold: 0.2,
  },
};
