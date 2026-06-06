# InterleavedBuffer

Stores multiple vertex attributes (position, normal, UV, color, etc.) packed into a single typed array. Reduces memory overhead and can improve GPU cache performance compared to separate buffers.

## Signature / Usage

```js
// Interleaved: position (3 floats) + uv (2 floats) per vertex = stride 5
const data = new Float32Array([
  // x,  y,  z,  u,  v
  -1, -1, 0, 0, 0,
   1, -1, 0, 1, 0,
   1,  1, 0, 1, 1,
]);

const interleavedBuffer = new THREE.InterleavedBuffer(data, 5);

geometry.setAttribute('position',
  new THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0));
geometry.setAttribute('uv',
  new THREE.InterleavedBufferAttribute(interleavedBuffer, 2, 3));
```

## Constructor

```js
new InterleavedBuffer(array: TypedArray, stride: number)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `array` | TypedArray | Typed array holding all interleaved attribute data |
| `stride` | number | Number of typed-array elements per vertex |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `array` | TypedArray | The shared data array |
| `count` | number (readonly) | Total element count |
| `isInterleavedBuffer` | boolean (readonly) | Type flag |
| `needsUpdate` | boolean | Set `true` to trigger GPU re-upload |
| `stride` | number | Elements per vertex |
| `updateRanges` | Array | Partial update ranges |
| `usage` | Usage constant | Buffer usage hint. Default: `StaticDrawUsage` |
| `uuid` | string (readonly) | UUID |
| `version` | number | Increments on `needsUpdate` |

## Methods

| Method | Description |
|--------|-------------|
| `addUpdateRange(start, count)` | Mark a range for partial GPU update |
| `clearUpdateRanges()` | Clear all update ranges |
| `clone(data)` | Return a cloned instance |
| `copy(source)` | Copy values from another `InterleavedBuffer` |
| `copyAt(i1, buffer, i2)` | Copy a vertex block from another buffer |
| `onUpload(callback)` | Callback after GPU upload |
| `set(value, offset)` | Set array data at offset |
| `setUsage(value)` | Set usage hint (cannot change after initial upload) |
| `toJSON(data)` | Serialize to JSON |

## Notes

- `usage` cannot be changed after the buffer has been uploaded to the GPU.
- Pair with `InterleavedBufferAttribute` to expose individual attributes from the shared buffer.

## Related

- [InterleavedBufferAttribute](./InterleavedBufferAttribute.md)
- [InstancedInterleavedBuffer](./InstancedInterleavedBuffer.md)
