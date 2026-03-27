import * as THREE from "three";

// Futuristic pin geometry: a glowing vertical cylinder with a floating ring
export function createFuturisticPinMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: "#00ffe7",
    emissive: "#00ffe7",
    emissiveIntensity: 2.2,
    metalness: 0.7,
    roughness: 0.18,
    transmission: 0.7,
    thickness: 0.22,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    ior: 1.4,
    transparent: true,
    opacity: 0.92,
  });
}

export function createFuturisticPinGroup() {
  // Pin body: vertical cylinder
  const bodyGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.12, 18, 1);
  const bodyMaterial = createFuturisticPinMaterial();
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.06;

  // Floating ring: torus
  const ringGeometry = new THREE.TorusGeometry(0.022, 0.006, 12, 32);
  const ringMaterial = new THREE.MeshPhysicalMaterial({
    color: "#00ffe7",
    emissive: "#00ffe7",
    emissiveIntensity: 1.5,
    metalness: 0.6,
    roughness: 0.12,
    transparent: true,
    opacity: 0.7,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.y = 0.13;
  ring.rotation.x = Math.PI / 2;

  // Group
  const group = new THREE.Group();
  group.add(body);
  group.add(ring);
  return group;
}
