# IndirectStorageBufferAttribute

A special buffer attribute intended for compute shaders. It can be used to encode draw parameters for indirect draw calls.

## Signature / Usage

```js
new IndirectStorageBufferAttribute( count: number | Uint32Array, itemSize: number )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| count | number \| Uint32Array | Constructor parameter. The item count. A `Uint32Array` is also valid; the subsequent parameter is then obsolete. |
| itemSize | number | Constructor parameter. The item size. |
| isIndirectStorageBufferAttribute | boolean (readonly) | Type-test flag. Default `true`. |

## Notes

- Can only be used with `WebGPURenderer` and a WebGPU backend.
- Inherits from `BufferAttribute` -> `StorageBufferAttribute`.
- Source: https://threejs.org/docs/pages/IndirectStorageBufferAttribute.html (three.js r186, `src/renderers/common/IndirectStorageBufferAttribute.js`)

## Related

- [StorageBufferAttribute](./StorageBufferAttribute.md)
- [WebGPURenderer](./WebGPURenderer.md)
