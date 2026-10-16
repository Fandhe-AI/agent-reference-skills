# StorageInstancedBufferAttribute

A special instanced buffer attribute intended for compute shaders. Compute shaders can compute the attribute data on the GPU instead of the CPU. Create an instance and provide it as input to `StorageBufferNode`.

## Signature / Usage

```js
new StorageInstancedBufferAttribute( count: number | TypedArray, itemSize: number, typeClass: TypedArray.constructor )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| count | number \| TypedArray | Constructor parameter. The item count. A typed array is also valid; the subsequent parameters are then obsolete. |
| itemSize | number | Constructor parameter. The item size. |
| typeClass | TypedArray.constructor | Constructor parameter. A typed array constructor. Default `Float32Array`. |
| isStorageInstancedBufferAttribute | boolean (readonly) | Type-test flag. Default `true`. |

## Notes

- Can only be used with `WebGPURenderer`.
- Inherits from `BufferAttribute` -> `InstancedBufferAttribute`.
- Source: https://threejs.org/docs/pages/StorageInstancedBufferAttribute.html (three.js r186, `src/renderers/common/StorageInstancedBufferAttribute.js`)

## Related

- [StorageBufferAttribute](./StorageBufferAttribute.md)
- [IndirectStorageBufferAttribute](./IndirectStorageBufferAttribute.md)
- [WebGPURenderer](./WebGPURenderer.md)
