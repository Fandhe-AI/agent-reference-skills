# Typed BufferAttribute Subclasses

Convenience subclasses of `BufferAttribute` for specific numeric types. Each wraps a typed array of the corresponding kind, inheriting all `BufferAttribute` properties and methods.

## Classes

| Class | Typed Array | Description |
|-------|-------------|-------------|
| `Float16BufferAttribute` | `Uint16Array` (FP16 encoded) | 16-bit float; handles conversion automatically |
| `Float32BufferAttribute` | `Float32Array` | 32-bit float; most common for positions/normals |
| `Int8BufferAttribute` | `Int8Array` | Signed 8-bit integer |
| `Int16BufferAttribute` | `Int16Array` | Signed 16-bit integer |
| `Int32BufferAttribute` | `Int32Array` | Signed 32-bit integer |
| `Uint8BufferAttribute` | `Uint8Array` | Unsigned 8-bit integer |
| `Uint8ClampedBufferAttribute` | `Uint8ClampedArray` | Unsigned 8-bit clamped integer |
| `Uint16BufferAttribute` | `Uint16Array` | Unsigned 16-bit integer; typical for index buffers |
| `Uint32BufferAttribute` | `Uint32Array` | Unsigned 32-bit integer; large index buffers |

All extend `BufferAttribute`.

## Signature / Usage

```js
// Float32 positions (most common)
geometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0, 1, 1, 0], 3)
);

// Uint16 index buffer
geometry.setIndex(new THREE.Uint16BufferAttribute([0, 1, 2], 1));

// Float16 for memory-sensitive attributes
geometry.setAttribute(
  'uv',
  new THREE.Float16BufferAttribute([0, 0, 1, 0, 1, 1], 2)
);
```

## Constructor (all variants)

```js
new Float32BufferAttribute(array, itemSize, normalized?)
new Uint16BufferAttribute(array, itemSize, normalized?)
// ... same signature for all variants
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `array` | Typed array or plain `Array` | The attribute data |
| `itemSize` | number | Components per vertex |
| `normalized` | boolean | Normalize integer data. Default: `false` |

## Notes

- `Float16BufferAttribute` automatically converts from plain `Array` or `Uint16Array` to FP16, working around incomplete `Float16Array` browser support.
- Choose `Uint16BufferAttribute` for index buffers with fewer than 65 536 vertices; use `Uint32BufferAttribute` for larger meshes.
- All inherited `BufferAttribute` update semantics apply (`needsUpdate`, `addUpdateRange`, etc.).

## Related

- [BufferAttribute](./BufferAttribute.md)
