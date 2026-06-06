# Line

A continuous line connecting vertices in sequence. Each vertex connects to the next, forming a polyline.

Inherits from: EventDispatcher → Object3D → Line

## Signature / Usage

```js
const points = [
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(10, 0, 0),
];
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const line = new THREE.Line(geometry, material);
scene.add(line);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `geometry` | BufferGeometry | Vertex data for the line |
| `material` | LineBasicMaterial \| LineDashedMaterial | Rendering material |
| `isLine` | boolean (readonly) | Always `true`; used for type testing |

## Methods

- `computeLineDistances(): this` — computes per-vertex distances required by `LineDashedMaterial`
- `raycast(raycaster, intersects): void`

## Notes

- Vertex order: 0→1→2→3→…→n (all connected). For disconnected pairs, use `LineSegments`. For a closed loop, use `LineLoop`.
- `linewidth` in `LineBasicMaterial` is not reliably supported across WebGL implementations; it is effectively fixed at 1 on most platforms.
- For variable-width lines, use `Line2` from the `three/addons` module.

## Related

- [LineLoop.md](./LineLoop.md)
- [LineSegments.md](./LineSegments.md)
