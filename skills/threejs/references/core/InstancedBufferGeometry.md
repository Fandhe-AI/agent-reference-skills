# InstancedBufferGeometry

An instanced version of `BufferGeometry` for rendering multiple copies of the same geometry. Add per-instance attributes via `InstancedBufferAttribute`.

Extends: `BufferGeometry`

## Signature / Usage

```js
const geometry = new THREE.InstancedBufferGeometry();
geometry.instanceCount = 100;

// Copy index and base attributes from a template geometry
geometry.setIndex(baseGeometry.getIndex());
geometry.setAttribute('position', baseGeometry.getAttribute('position'));

// Per-instance offset attribute
const offsets = new THREE.InstancedBufferAttribute(
  new Float32Array(100 * 3), 3
);
geometry.setAttribute('instanceOffset', offsets);
```

## Constructor

```js
new InstancedBufferGeometry()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `instanceCount` | number | Number of instances to render. Default: `Infinity` |
| `isInstancedBufferGeometry` | boolean (readonly) | Type flag |

All other properties are inherited from `BufferGeometry`.

## Notes

- Set `instanceCount` to limit rendered instances below the total data count.
- Inherits all `BufferGeometry` methods (`setAttribute`, `computeBoundingBox`, `dispose`, etc.).

## Related

- [BufferGeometry](./BufferGeometry.md)
- [InstancedBufferAttribute](./InstancedBufferAttribute.md)
