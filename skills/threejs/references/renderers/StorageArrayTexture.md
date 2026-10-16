# StorageArrayTexture

A special texture intended for compute shaders. It can be used to compute the data of an array texture with a compute shader.

## Signature / Usage

```js
new StorageArrayTexture( width: number, height: number, depth: number )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| width | number | Constructor parameter. Storage texture width. Default `1`. |
| height | number | Constructor parameter. Storage texture height. Default `1`. |
| depth | number | Constructor parameter. Storage texture depth. Default `1`. |
| image | Object | The image object which just represents the texture's dimension. Overrides `Texture#image`. |
| isStorageTexture | boolean (readonly) | Type-test flag. Default `true`. |
| magFilter | number | Default is `THREE.LinearFilter`. Overrides `Texture#magFilter`. |
| minFilter | number | Default is `THREE.LinearFilter`. Overrides `Texture#minFilter`. |

## Methods

| Name | Description |
|------|-------------|
| `.setSize( width: number, height: number, depth: number )` | Sets the size of the storage array texture. |

## Notes

- Can only be used with `WebGPURenderer` and a WebGPU backend.
- Inherits from `EventDispatcher` -> `Texture`.
- Source: `src/renderers/common/StorageArrayTexture.js` (three.js r186).

## Related

- [Storage3DTexture](./Storage3DTexture.md)
- [WebGPURenderer](./WebGPURenderer.md)
