# Storage3DTexture

A special texture intended for compute shaders. It can be used to compute the data of a 3D texture with a compute shader.

## Signature / Usage

```js
new Storage3DTexture( width: number, height: number, depth: number )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| width | number | Constructor parameter. Storage texture width. Default `1`. |
| height | number | Constructor parameter. Storage texture height. Default `1`. |
| depth | number | Constructor parameter. Storage texture depth. Default `1`. |
| image | Object | The image object which just represents the texture's dimension. Overrides `Texture#image`. |
| is3DTexture | boolean | Indicates whether this texture is a 3D texture. |
| isStorageTexture | boolean (readonly) | Type-test flag. Default `true`. |
| magFilter | number | Default is `THREE.LinearFilter`. Overrides `Texture#magFilter`. |
| minFilter | number | Default is `THREE.LinearFilter`. Overrides `Texture#minFilter`. |
| mipmapsAutoUpdate | boolean | Whether the renderer regenerates the mipmaps automatically. Overwritten and set to `false` by default since the WebGPU backend does not support mipmap generation for 3D textures. Default `false`. Overrides `Texture#mipmapsAutoUpdate`. |
| wrapR | number | How the texture is wrapped in the depth direction; corresponds to W in UVW mapping. |

## Methods

| Name | Description |
|------|-------------|
| `.copy( source: Storage3DTexture ) : Storage3DTexture` | Copies the values of the given texture to this instance. Overrides `Texture#copy`. |
| `.setSize( width: number, height: number, depth: number )` | Sets the size of the storage 3D texture. |

## Notes

- Can only be used with `WebGPURenderer` and a WebGPU backend.
- Inherits from `EventDispatcher` -> `Texture`.
- Source: https://threejs.org/docs/pages/Storage3DTexture.html (three.js r187, `src/renderers/common/Storage3DTexture.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): `mipmapsAutoUpdate` is now overwritten on this class and defaults to `false`.

## Related

- [StorageArrayTexture](./StorageArrayTexture.md)
- [WebGPURenderer](./WebGPURenderer.md)
