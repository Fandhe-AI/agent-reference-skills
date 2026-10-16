# StorageBufferAttribute

A special buffer attribute intended for compute shaders. Instead of updating attribute data on the CPU and uploading it, compute shaders can compute the attribute data on the GPU. Create an instance and provide it as input to `StorageBufferNode`.

## Signature / Usage

```js
new StorageBufferAttribute( count: number | TypedArray, itemSize: number, typeClass: TypedArray.constructor )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| count | number \| TypedArray | Constructor parameter. The item count. A typed array is also valid; the subsequent parameters are then obsolete. |
| itemSize | number | Constructor parameter. The item size. |
| typeClass | TypedArray.constructor | Constructor parameter. A typed array constructor. Default `Float32Array`. |
| isStorageBufferAttribute | boolean (readonly) | Type-test flag. Default `true`. |

## Notes

- Can only be used with `WebGPURenderer`.
- Inherits from `BufferAttribute`.
- Source: `src/renderers/common/StorageBufferAttribute.js` (three.js r186).

## Related

- [StorageInstancedBufferAttribute](./StorageInstancedBufferAttribute.md)
- [IndirectStorageBufferAttribute](./IndirectStorageBufferAttribute.md)
- [ReadbackBuffer](./ReadbackBuffer.md)
- [WebGPURenderer](./WebGPURenderer.md)
