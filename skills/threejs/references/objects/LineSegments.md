# LineSegments

Renders vertices as pairs of disconnected line segments: (0,1), (2,3), (4,5), etc.

Inherits from: EventDispatcher → Object3D → Line → LineSegments

## Signature / Usage

```js
const points = [
  new THREE.Vector3(-5, 0, 0),
  new THREE.Vector3(5, 0, 0),   // segment 1
  new THREE.Vector3(0, -5, 0),
  new THREE.Vector3(0, 5, 0),   // segment 2
];
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xffffff });
const segments = new THREE.LineSegments(geometry, material);
scene.add(segments);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `geometry` | BufferGeometry | Vertex data (must be even number of vertices) |
| `material` | LineBasicMaterial \| LineDashedMaterial | Rendering material |
| `isLineSegments` | boolean (readonly) | Always `true`; used for type testing |

## Methods

Inherits all methods from `Line`, including:
- `computeLineDistances(): this` — required for `LineDashedMaterial`

## Notes

- Vertex count must be even; each consecutive pair forms one segment.
- Commonly used internally by helpers such as `BoxHelper` and `GridHelper`.
- Same `linewidth` limitations as `Line` apply.

## Related

- [Line.md](./Line.md)
- [LineLoop.md](./LineLoop.md)
