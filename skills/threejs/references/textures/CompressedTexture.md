# CompressedTexture

Creates a texture from pre-compressed data (e.g. DXT, ETC, ASTC, PVRTC). Mipmaps must be embedded in the source data. Extends `Texture`.

## Signature / Usage

```js
// Typically loaded via CompressedTextureLoader
const loader = new THREE.CompressedTextureLoader();
const texture = loader.load('texture.dds');
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mipmaps` | Array\<Object\> | `[]` | Array of mipmap objects (data + dimensions), including base mip (optional since r187) |
| `width` | number | — | Texture width |
| `height` | number | — | Texture height |
| `format` | number | `RGBAFormat` | Compressed texture format constant |
| `type` | number | `UnsignedByteType` | Data type |
| `mapping` | number | `Texture.DEFAULT_MAPPING` | Mapping mode |
| `wrapS` | number | `ClampToEdgeWrapping` | Horizontal wrapping |
| `wrapT` | number | `ClampToEdgeWrapping` | Vertical wrapping |
| `magFilter` | number | `LinearFilter` | Magnification filter |
| `minFilter` | number | `LinearMipmapLinearFilter` | Minification filter |
| `anisotropy` | number | `Texture.DEFAULT_ANISOTROPY` | Anisotropic filtering |
| `colorSpace` | string | `NoColorSpace` | Color space |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `flipY` | boolean (readonly) | `false` | Always `false`; flipping is not supported for compressed textures |
| `generateMipmaps` | boolean (readonly) | `false` | Always `false`; mipmaps must be in the file |
| `image` | Object | — | Dimensions only (overrides Texture#image) |
| `isCompressedTexture` | boolean (readonly) | `true` | Type-testing flag |
| `mipmaps` | Array\<Object\> | — | Mipmap data array (overrides Texture#mipmaps) |

## Notes

- Mipmaps cannot be generated at runtime; they must be embedded in the compressed file.
- Vertical flipping is not supported for compressed textures.
- Use `CompressedTextureLoader` (or format-specific loaders like `DDSLoader`) to load these files.
- Migration (r186 → r187): the `mipmaps` constructor argument is optional and defaults to an empty array (https://github.com/mrdoob/three.js/pull/35081).
- Source: https://threejs.org/docs/pages/CompressedTexture.html (three.js r187, `src/textures/CompressedTexture.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [Texture](./Texture.md)
- [CompressedArrayTexture](./CompressedArrayTexture.md)
- [CompressedCubeTexture](./CompressedCubeTexture.md)
