# LineLoop

A continuous line where the last vertex connects back to the first, forming a closed loop.

Inherits from: EventDispatcher → Object3D → Line → LineLoop

## Signature / Usage

```js
const points = [
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(10, 0, 0),
  new THREE.Vector3(0, -10, 0),
];
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
const lineLoop = new THREE.LineLoop(geometry, material);
scene.add(lineLoop);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `geometry` | BufferGeometry | Vertex data for the loop |
| `material` | LineBasicMaterial | Rendering material |
| `isLineLoop` | boolean (readonly) | Always `true`; used for type testing |

## Notes

- The final vertex automatically connects back to vertex 0; no need to repeat the first point.
- Inherits `computeLineDistances()` from `Line` for use with `LineDashedMaterial`.
- Same `linewidth` limitations apply as with `Line`.

## Related

- [Line.md](./Line.md)
- [LineSegments.md](./LineSegments.md)
