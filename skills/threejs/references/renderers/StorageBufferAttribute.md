# StorageBufferAttribute

A special buffer attribute intended for compute shaders. Instead of updating attribute data on the CPU and uploading it, compute shaders can compute the attribute data on the GPU. Create an instance and provide it as input to `StorageBufferNode`.

## Signature / Usage

```js
new StorageBufferAttribute( count: number | TypedArray, itemSize: number, typeClass: TypedArray.constructor )

// With a typed array (itemSize still required)
new StorageBufferAttribute( new Float32Array( count * 4 ), 4 )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| count | number \| TypedArray | Constructor parameter. The item count. A typed array is also valid; `typeClass` is then ignored, but `itemSize` is still required. |
| itemSize | number | Constructor parameter. The item size. |
| typeClass | TypedArray.constructor | Constructor parameter. A typed array constructor. Default `Float32Array`. |
| isStorageBufferAttribute | boolean (readonly) | Type-test flag. Default `true`. |

## Notes

- Can only be used with `WebGPURenderer`.
- Inherits from `BufferAttribute`.
- Source: https://threejs.org/docs/pages/StorageBufferAttribute.html (three.js r186, `src/renderers/common/StorageBufferAttribute.js`)

## Related

- [StorageInstancedBufferAttribute](./StorageInstancedBufferAttribute.md)
- [IndirectStorageBufferAttribute](./IndirectStorageBufferAttribute.md)
- [ReadbackBuffer](./ReadbackBuffer.md)
- [WebGPURenderer](./WebGPURenderer.md)
