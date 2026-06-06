# InstancedBufferAttribute

An instanced version of `BufferAttribute`. Holds per-instance data for instanced rendering; each value is used for one or more consecutive instances rather than one per vertex.

Extends: `BufferAttribute`

## Signature / Usage

```js
const instanceColors = new THREE.InstancedBufferAttribute(
  new Float32Array(instanceCount * 3), 3
);
// Set color for each instance
for (let i = 0; i < instanceCount; i++) {
  instanceColors.setXYZ(i, Math.random(), Math.random(), Math.random());
}
geometry.setAttribute('instanceColor', instanceColors);
```

## Constructor

```js
new InstancedBufferAttribute(array, itemSize, normalized?, meshPerAttribute?)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `array` | TypedArray | Data array |
| `itemSize` | number | Components per instance |
| `normalized` | boolean | Normalize integer data. Default: `false` |
| `meshPerAttribute` | number | How many consecutive instances share this value. Default: `1` |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isInstancedBufferAttribute` | boolean (readonly) | Type flag |
| `meshPerAttribute` | number | Number of instances each value is repeated for |

All other properties are inherited from `BufferAttribute`.

## Notes

- Used with `InstancedBufferGeometry` or directly on a `BufferGeometry` for instance-level attributes.
- `meshPerAttribute = 2` means each attribute value spans two consecutive instances.

## Related

- [BufferAttribute](./BufferAttribute.md)
- [InstancedBufferGeometry](./InstancedBufferGeometry.md)
- [InstancedInterleavedBuffer](./InstancedInterleavedBuffer.md)
