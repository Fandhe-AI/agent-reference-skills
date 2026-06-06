# DataTexture

Creates a texture directly from raw typed array buffer data. Extends `Texture`.

## Signature / Usage

```js
const width = 256, height = 256;
const data = new Uint8Array(width * height * 4); // RGBA
const texture = new THREE.DataTexture(data, width, height);
texture.needsUpdate = true;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | TypedArray | `null` | Raw pixel buffer |
| `width` | number | `1` | Texture width in pixels |
| `height` | number | `1` | Texture height in pixels |
| `format` | number | `RGBAFormat` | Texture format |
| `type` | number | `UnsignedByteType` | Data type |
| `mapping` | number | `Texture.DEFAULT_MAPPING` | Mapping mode |
| `wrapS` | number | `ClampToEdgeWrapping` | Horizontal wrapping |
| `wrapT` | number | `ClampToEdgeWrapping` | Vertical wrapping |
| `magFilter` | number | `NearestFilter` | Magnification filter |
| `minFilter` | number | `NearestFilter` | Minification filter |
| `anisotropy` | number | `Texture.DEFAULT_ANISOTROPY` | Anisotropic filtering |
| `colorSpace` | string | `NoColorSpace` | Color space |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `flipY` | boolean | `false` | Vertical flip on GPU upload (overrides Texture default) |
| `generateMipmaps` | boolean | `false` | Mipmap generation (overrides Texture default) |
| `image` | Object | — | Image object containing the data definition |
| `isDataTexture` | boolean (readonly) | `true` | Type-testing flag |
| `unpackAlignment` | number | `1` | Pixel row memory alignment (overrides Texture default) |

## Notes

- `magFilter` and `minFilter` default to `NearestFilter` (not `LinearFilter` as in the base `Texture`).
- Set `needsUpdate = true` after changing the data buffer.

## Related

- [Texture](./Texture.md)
- [Data3DTexture](./Data3DTexture.md)
- [DataArrayTexture](./DataArrayTexture.md)
