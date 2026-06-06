# InterleavedBufferAttribute

Exposes a slice of an `InterleavedBuffer` as a named vertex attribute. Multiple `InterleavedBufferAttribute` instances share one `InterleavedBuffer` via different offsets.

## Signature / Usage

```js
const buf = new THREE.InterleavedBuffer(data, 5); // stride 5
geometry.setAttribute('position',
  new THREE.InterleavedBufferAttribute(buf, 3, 0)); // 3 components at offset 0
geometry.setAttribute('uv',
  new THREE.InterleavedBufferAttribute(buf, 2, 3)); // 2 components at offset 3
```

## Constructor

```js
new InterleavedBufferAttribute(interleavedBuffer, itemSize, offset, normalized?)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `interleavedBuffer` | InterleavedBuffer | The shared buffer |
| `itemSize` | number | Number of components |
| `offset` | number | Byte offset into the buffer stride |
| `normalized` | boolean | Normalize integer data. Default: `false` |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `array` | TypedArray | The underlying data array |
| `count` | number (readonly) | Item count |
| `data` | InterleavedBuffer | The shared interleaved buffer |
| `isInterleavedBufferAttribute` | boolean (readonly) | Type flag |
| `itemSize` | number | Components per vertex |
| `name` | string | Attribute name |
| `needsUpdate` | boolean | Flag GPU re-upload |
| `normalized` | boolean | Whether data is normalized |
| `offset` | number | Offset into the buffer stride |

## Methods

**Component access:** `getComponent(index, component)`, `getX/Y/Z/W(index)`

**Component setting:** `setComponent(index, component, value)`, `setX/Y/Z/W`, `setXY`, `setXYZ`, `setXYZW`

**Transforms:** `applyMatrix4(m)`, `applyNormalMatrix(m)`, `transformDirection(m)` (all require `itemSize = 3`)

**Utilities:** `clone(data?)` — de-interleaves to a plain `BufferAttribute` if no data object is passed; `toJSON(data?)`

## Related

- [InterleavedBuffer](./InterleavedBuffer.md)
- [BufferAttribute](./BufferAttribute.md)
