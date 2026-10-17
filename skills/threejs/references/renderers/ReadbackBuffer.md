# ReadbackBuffer

A readback buffer transfers data from the GPU to the CPU. It is primarily used to read back compute shader results.

## Signature / Usage

```js
new ReadbackBuffer( maxByteLength: number )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| maxByteLength | number | Constructor parameter and property. The maximum size of the buffer to be read back. |
| buffer | ArrayBuffer \| null | The mapped, read back array buffer. |
| isReadbackBuffer | boolean (readonly) | Type-test flag. Default `true`. |
| name | string | Name used for debugging purposes. |

## Methods

| Name | Description |
|------|-------------|
| `.dispose()` | Frees internal resources. |
| `.release()` | Releases the mapped buffer data so the GPU buffer can be used by the GPU again. |

## Notes

- After calling `release()`, any `ArrayBuffer` data associated with this readback buffer is removed and no longer accessible.
- Inherits from `EventDispatcher`.
- Source: https://threejs.org/docs/pages/ReadbackBuffer.html (three.js r186, `src/renderers/common/ReadbackBuffer.js`)

## Related

- [StorageBufferAttribute](./StorageBufferAttribute.md)
- [WebGPURenderer](./WebGPURenderer.md)
