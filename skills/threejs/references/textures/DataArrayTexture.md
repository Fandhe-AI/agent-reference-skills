# DataArrayTexture

Creates a 2D array texture from raw typed array buffer data. Supports per-layer updates for efficient streaming. Extends `Texture`.

## Signature / Usage

```js
const texture = new THREE.DataArrayTexture(data, width, height, depth);
texture.needsUpdate = true;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | TypedArray | `null` | Raw buffer data |
| `width` | number | `1` | Width in pixels |
| `height` | number | `1` | Height in pixels |
| `depth` | number | `1` | Number of array layers |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `flipY` | boolean | `false` | Vertical flip on GPU upload |
| `generateMipmaps` | boolean | `false` | Mipmap generation |
| `image` | Object | — | Image definition |
| `isDataArrayTexture` | boolean (readonly) | `true` | Type-testing flag |
| `layerUpdates` | Set\<number\> | — | Layers pending GPU update |
| `magFilter` | number | `NearestFilter` | Magnification filter |
| `minFilter` | number | `NearestFilter` | Minification filter |
| `unpackAlignment` | number | `1` | Pixel row memory alignment |
| `wrapR` | number | `ClampToEdgeWrapping` | Wrapping along depth axis (W in UVW) |

## Methods

| Signature | Description |
|-----------|-------------|
| `.addLayerUpdate(layerIndex)` | Mark a single layer for GPU update instead of the full array |
| `.clearLayerUpdates()` | Reset the layer update registry |

## Notes

- Use `addLayerUpdate()` to update only specific layers, which is more efficient than re-uploading the entire array.

## Related

- [Texture](./Texture.md)
- [DataTexture](./DataTexture.md)
- [Data3DTexture](./Data3DTexture.md)
- [CompressedArrayTexture](./CompressedArrayTexture.md)
