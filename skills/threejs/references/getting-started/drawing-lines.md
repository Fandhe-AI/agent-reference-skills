# Drawing Lines

Render line geometry using `BufferGeometry`, `LineBasicMaterial`, and the `Line` object.

## Signature / Usage

```js
import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

// Material
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// Geometry from array of points
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
scene.add(line);

renderer.render(scene, camera);
```

## Notes

- Use `LineBasicMaterial` for solid lines or `LineDashedMaterial` for dashed lines.
- Lines are drawn between consecutive vertex pairs; the shape is **not closed** automatically (no edge from last vertex back to first).
- `BufferGeometry.setFromPoints(points)` is a convenience method that populates the position attribute from a `Vector3` array.

## Related

- [Creating a scene](./creating-a-scene.md)
