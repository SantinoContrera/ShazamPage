/**
 * Canonical S Geometry Module — Single Source of Truth
 * Derived strictly from shazam_s_reference.jpg
 * 
 * Defines the 3D trajectory of the Shazam electrical S path,
 * its 4 canonical nodes, and parametric interpolation utilities.
 */

import * as THREE from 'three';
import { CONFIG } from '../config/config.js';

// Control points defining the exact S path curve based on shazam_s_reference.jpg
export const CANONICAL_S_CONTROL_POINTS = [
  new THREE.Vector3(-2.2, -2.2, 0.4),  // Node 1: Bottom-Left Orb (Endpoint)
  new THREE.Vector3(-1.0, -2.3, 0.25), // Bottom arc dip
  new THREE.Vector3(0.6, -2.0, 0.1),   // Lower sweep
  new THREE.Vector3(2.2, -1.2, 0.15),  // Node 2: Lower-Right Orb (Corner turn)
  new THREE.Vector3(1.5, -0.4, 0.0),   // Diagonal transition start
  new THREE.Vector3(0.0, 0.1, -0.2),   // Diagonal center crossing
  new THREE.Vector3(-1.2, 0.7, 0.0),   // Upper sweep transition
  new THREE.Vector3(-1.8, 1.5, 0.15),  // Node 3: Upper-Left Orb (Corner turn)
  new THREE.Vector3(-0.6, 2.1, 0.25),  // Top arc sweep
  new THREE.Vector3(0.8, 2.3, 0.35),   // Upper right curve
  new THREE.Vector3(1.8, 2.2, 0.4)     // Node 4: Top-Right Orb (Endpoint)
];

// CatmullRomCurve3 for smooth path interpolation
export const canonicalCurve = new THREE.CatmullRomCurve3(
  CANONICAL_S_CONTROL_POINTS,
  false, // Open curve
  'centripetal', // Centripetal curve for minimal self-intersection
  0.5
);

/**
 * Returns array of Vector3 points sampled uniformly along the canonical S curve.
 * @param {number} count Number of sample points
 */
export function getCanonicalSPoints(count = 120) {
  return canonicalCurve.getSpacedPoints(count);
}

/**
 * Gets a specific 3D point on the canonical S curve at parametric progress t [0, 1].
 * @param {number} t Progress along curve (0.0 to 1.0)
 */
export function getPointAtT(t) {
  return canonicalCurve.getPointAt(Math.max(0, Math.min(1, t)));
}

/**
 * Gets tangent vector on canonical S curve at parametric progress t [0, 1].
 * @param {number} t Progress along curve (0.0 to 1.0)
 */
export function getTangentAtT(t) {
  return canonicalCurve.getTangentAt(Math.max(0, Math.min(1, t)));
}

/**
 * Returns the exact 3D world coordinates and metadata for all 4 canonical nodes
 * taking global sceneScale into account.
 */
export function getCanonicalNodes() {
  const scale = CONFIG.sceneScale || 1.0;
  return CONFIG.nodes.map((nodeDef) => {
    const rawPos = getPointAtT(nodeDef.pathT);
    const scaledPos = rawPos.clone().multiplyScalar(scale);
    return {
      ...nodeDef,
      rawPosition: rawPos.clone(),
      position: scaledPos.clone(),
      anchorWorldPosition: scaledPos.clone(),
    };
  });
}
