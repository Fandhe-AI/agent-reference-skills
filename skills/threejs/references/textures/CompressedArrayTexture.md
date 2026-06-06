# CompressedArrayTexture

Creates a 2D array texture from compressed data. Supports per-layer updates. Extends `CompressedTexture`.

## Signature / Usage

```js
// Typically loaded via CompressedTextureLoader
const loader = new THREE.CompressedTextureLoader();
const texture = loader.load('texture_array.ktx2');
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mipmaps` | Array\<Object\> | — | Mipmap data array (including base mip) |
| `width` | number | — | Texture width |
| `height` | number | — | Texture height |
| `depth` | number | — | Number of array layers |
| `format` | number | `RGBAFormat` | Compressed texture format constant |
| `type` | number | `UnsignedByteType` | Data type |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `image` | Object | — | Dimensions of the compressed texture (overrides CompressedTexture#image) |
| `isCompressedArrayTexture` | boolean (readonly) | `true` | Type-testing flag |
| `layerUpdates` | Set\<number\> | — | Layers pending GPU update |
| `wrapR` | number | `ClampToEdgeWrapping` | Wrapping along depth axis (W in UVW) |

## Methods

| Signature | Description |
|-----------|-------------|
| `.addLayerUpdate(layerIndex)` | Mark a single layer for GPU update (transmits only that layer's mipmaps) |
| `.clearLayerUpdates()` | Reset the layer update registry |

## Notes

- More efficient than re-uploading the full array when only some layers change.

## Related

- [CompressedTexture](./CompressedTexture.md)
- [CompressedCubeTexture](./CompressedCubeTexture.md)
- [DataArrayTexture](./DataArrayTexture.md)
