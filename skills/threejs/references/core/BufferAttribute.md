# BufferAttribute

Stores attribute data (vertex positions, face indices, normals, colors, UVs, or custom attributes) associated with a `BufferGeometry` for efficient GPU transmission.

## Signature / Usage

```js
const positions = new Float32Array([0, 0, 0, 1, 0, 0, 1, 1, 0]);
const attr = new THREE.BufferAttribute(positions, 3);
geometry.setAttribute('position', attr);

// Update data
positions[0] = 0.5;
attr.needsUpdate = true;
```

## Constructor

```js
new BufferAttribute(array: TypedArray, itemSize: number, normalized?: boolean)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `array` | TypedArray | Typed array holding attribute data |
| `itemSize` | number | Number of values per vertex (e.g., 3 for position, 2 for UV) |
| `normalized` | boolean | Map integer data to float range. Default: `false` |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `array` | TypedArray | The underlying typed array |
| `count` | number (readonly) | `array.length / itemSize` |
| `gpuType` | FloatType \| IntType | GPU type for shaders. Default: `FloatType` |
| `id` | number (readonly) | Unique identifier |
| `isBufferAttribute` | boolean (readonly) | Type flag, always `true` |
| `itemSize` | number | Values per vertex |
| `name` | string | Attribute name |
| `needsUpdate` | boolean | Set `true` to trigger GPU re-upload |
| `normalized` | boolean | Whether integer data is normalized |
| `updateRanges` | Array | Partial update ranges |
| `usage` | Usage constant | Buffer usage hint. Default: `StaticDrawUsage` |
| `version` | number | Increments each time `needsUpdate` is set to `true` |

## Methods

**Data access:** `getX/Y/Z/W(index)`, `setX/Y/Z/W(index, value)`, `setXY`, `setXYZ`, `setXYZW`, `getComponent`, `setComponent`, `set(value, offset)`, `copyAt(i1, attr, i2)`, `copyArray(array)`

**Transforms:** `applyMatrix3(m)`, `applyMatrix4(m)`, `applyNormalMatrix(m)`, `transformDirection(m)`

**Update management:** `addUpdateRange(start, count)`, `clearUpdateRanges()`, `setUsage(value)`

**Utilities:** `clone()`, `copy(source)`, `onUpload(callback)`, `dispose()` (WebGPURenderer only), `toJSON()`

## Notes

- Set `needsUpdate = true` after modifying `array` to sync with GPU.
- `usage` cannot be changed after initial GPU upload; create a new instance instead.
- For partial updates of large buffers, use `addUpdateRange()`.
- Use typed convenience subclasses (`Float32BufferAttribute`, `Uint16BufferAttribute`, etc.) when creating from plain arrays — see [TypedBufferAttributes](./TypedBufferAttributes.md).

## Related

- [BufferGeometry](./BufferGeometry.md)
- [InterleavedBuffer](./InterleavedBuffer.md)
- [InterleavedBufferAttribute](./InterleavedBufferAttribute.md)
- [TypedBufferAttributes](./TypedBufferAttributes.md)
