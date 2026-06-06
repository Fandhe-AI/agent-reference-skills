# Points

Renders vertices as individual points. Used for point clouds, particle systems, and star fields.

Inherits from: EventDispatcher → Object3D → Points

## Signature / Usage

```js
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(300); // 100 points × 3 components
for (let i = 0; i < 300; i++) positions[i] = (Math.random() - 0.5) * 20;
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: 0x888888, size: 0.1 });
const points = new THREE.Points(geometry, material);
scene.add(points);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `geometry` | BufferGeometry | Vertex positions |
| `material` | PointsMaterial | Controls point size, color, and texture |
| `isPoints` | boolean (readonly) | Always `true`; used for type testing |

## Methods

- `raycast(raycaster, intersects): void` — intersection test per point

## Notes

- Points have no faces or edges; only vertex positions are rendered.
- `PointsMaterial.sizeAttenuation` controls whether point size scales with camera distance.
- For large point counts with per-point color or size variation, add `color` or `size` buffer attributes to the geometry and enable `vertexColors` / `sizeAttenuation` in the material.

## Related

- [Sprite.md](./Sprite.md)
