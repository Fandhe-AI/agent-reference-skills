# InstancedInterleavedBuffer

An instanced version of `InterleavedBuffer`. Holds interleaved per-instance data; each value block repeats across `meshPerAttribute` consecutive instances.

Extends: `InterleavedBuffer`

## Constructor

```js
new InstancedInterleavedBuffer(array, stride, meshPerAttribute?)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `array` | TypedArray | Typed array with a shared buffer storing attribute data |
| `stride` | number | Number of typed-array elements per vertex |
| `meshPerAttribute` | number | How many consecutive instances share each value. Default: `1` |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isInstancedInterleavedBuffer` | boolean (readonly) | Type flag |
| `meshPerAttribute` | number | Instance repetition count per value |

All other properties are inherited from `InterleavedBuffer`.

## Related

- [InterleavedBuffer](./InterleavedBuffer.md)
- [InstancedBufferAttribute](./InstancedBufferAttribute.md)
