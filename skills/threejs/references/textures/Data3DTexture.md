# Data3DTexture

Creates a three-dimensional (volumetric) texture from raw typed array data. Extends `Texture`.

## Signature / Usage

```js
const texture = new THREE.Data3DTexture(data, width, height, depth);
texture.needsUpdate = true;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | TypedArray | `null` | Raw buffer data |
| `width` | number | `1` | Width in pixels |
| `height` | number | `1` | Height in pixels |
| `depth` | number | `1` | Depth (number of slices) |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `flipY` | boolean | `false` | Vertical flip on GPU upload |
| `generateMipmaps` | boolean | `false` | Mipmap generation |
| `image` | Object | — | Image definition |
| `isData3DTexture` | boolean (readonly) | `true` | Type-testing flag |
| `magFilter` | number | `NearestFilter` | Magnification filter |
| `minFilter` | number | `NearestFilter` | Minification filter |
| `unpackAlignment` | number | `1` | Pixel row memory alignment |
| `wrapR` | number | `ClampToEdgeWrapping` | Wrapping along depth axis (W in UVW) |

## Notes

- Use `wrapR` for wrapping along the depth axis, in addition to `wrapS` / `wrapT`.
- Suitable for volume rendering and 3D noise/LUT textures.

## Related

- [Texture](./Texture.md)
- [DataTexture](./DataTexture.md)
- [DataArrayTexture](./DataArrayTexture.md)
