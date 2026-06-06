# Texture

Base class for all textures in Three.js. Extends `EventDispatcher`.

## Signature / Usage

```js
const texture = new THREE.Texture(
  image,      // Object (default: Texture.DEFAULT_IMAGE)
  mapping,    // number (default: Texture.DEFAULT_MAPPING)
  wrapS,      // number (default: ClampToEdgeWrapping)
  wrapT,      // number (default: ClampToEdgeWrapping)
  magFilter,  // number (default: LinearFilter)
  minFilter,  // number (default: LinearMipmapLinearFilter)
  format,     // number (default: RGBAFormat)
  type,       // number (default: UnsignedByteType)
  anisotropy, // number (default: Texture.DEFAULT_ANISOTROPY)
  colorSpace  // string (default: NoColorSpace)
);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `image` | Object | `Texture.DEFAULT_IMAGE` | Image holding texture data |
| `mapping` | number | `Texture.DEFAULT_MAPPING` | How the texture is applied to the object (e.g. `UVMapping`) |
| `wrapS` | number | `ClampToEdgeWrapping` | Horizontal wrapping mode |
| `wrapT` | number | `ClampToEdgeWrapping` | Vertical wrapping mode |
| `magFilter` | number | `LinearFilter` | Filter when texel covers more than one pixel |
| `minFilter` | number | `LinearMipmapLinearFilter` | Filter when texel covers less than one pixel |
| `format` | number | `RGBAFormat` | Texture format |
| `type` | number | `UnsignedByteType` | Data type |
| `anisotropy` | number | `Texture.DEFAULT_ANISOTROPY` | Anisotropic filtering samples |
| `colorSpace` | string | `NoColorSpace` | Color space; use `SRGBColorSpace` or `LinearSRGBColorSpace` for color data |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | number (readonly) | — | Unique texture ID |
| `uuid` | string | — | UUID of the texture |
| `name` | string | `''` | Optional name |
| `source` | Source | — | Underlying data source; can be shared across textures |
| `width` | number | — | Width in pixels |
| `height` | number | — | Height in pixels |
| `depth` | number | — | Depth in pixels |
| `offset` | Vector2 | `(0,0)` | UV offset per repetition |
| `repeat` | Vector2 | `(1,1)` | Repetition count |
| `rotation` | number | `0` | Rotation around `center` in radians |
| `center` | Vector2 | `(0,0)` | Rotation center (0.5, 0.5 = texture center) |
| `matrix` | Matrix3 | — | UV transformation matrix |
| `matrixAutoUpdate` | boolean | `true` | Auto-update matrix from offset/repeat/rotation/center |
| `generateMipmaps` | boolean | `true` | Generate mipmaps if possible |
| `premultiplyAlpha` | boolean | `false` | Multiply alpha into RGB channels |
| `flipY` | boolean | `true` | Flip vertically on GPU upload |
| `unpackAlignment` | number | `4` | Pixel row alignment: 1, 2, 4, or 8 |
| `colorSpace` | string | `NoColorSpace` | Color space annotation |
| `needsUpdate` | boolean | `false` | Set to `true` to trigger GPU re-upload |
| `version` | number (readonly) | `0` | Increments each time `needsUpdate` is set |
| `isTexture` | boolean (readonly) | `true` | Type-testing flag |
| `channel` | number | `0` | UV attribute index (0=uv, 1=uv1, 2=uv2, 3=uv3) |
| `userData` | Object | `{}` | Arbitrary custom data |

### Static Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `DEFAULT_ANISOTROPY` | number | `1` | Default anisotropy for all textures |
| `DEFAULT_IMAGE` | Image | `null` | Default image |
| `DEFAULT_MAPPING` | number | `UVMapping` | Default mapping mode |

## Methods

| Signature | Description |
|-----------|-------------|
| `.addUpdateRange(start, count)` | Add a GPU update range for data textures |
| `.clearUpdateRanges()` | Clear all update ranges |
| `.updateMatrix()` | Recompute the UV transformation matrix |
| `.transformUv(uv)` | Apply UV transform to a Vector2 |
| `.clone()` | Return a copy of this texture |
| `.copy(source)` | Copy values from another texture |
| `.toJSON(meta)` | Serialize to JSON |
| `.dispose()` | Free GPU resources; fires `dispose` event |

## Notes

- After initial use, a texture's `dimensions`, `format`, and `type` cannot be changed. Call `.dispose()` and create a new instance instead.
- Always call `.dispose()` when a texture is no longer needed to free GPU memory.
- Set `needsUpdate = true` after modifying texture data to trigger re-upload.

## Related

- [Source](./Source.md)
- [CanvasTexture](./CanvasTexture.md)
- [DataTexture](./DataTexture.md)
- [VideoTexture](./VideoTexture.md)
