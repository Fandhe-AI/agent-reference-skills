# CompressedCubeTexture

Creates a cube map texture from compressed data. Extends `CompressedTexture`.

## Signature / Usage

```js
// Typically loaded via CompressedTextureLoader
const loader = new THREE.CompressedTextureLoader();
const texture = loader.load(['px.ktx2','nx.ktx2','py.ktx2','ny.ktx2','pz.ktx2','nz.ktx2']);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `images` | Array\<CompressedTexture\> | — | Array of 6 compressed textures, one per cube face |
| `format` | number | `RGBAFormat` | Texture format |
| `type` | number | `UnsignedByteType` | Data type |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isCompressedCubeTexture` | boolean (readonly) | `true` | Type-testing flag |
| `isCubeTexture` | boolean (readonly) | `true` | Cube texture type-testing flag |

## Notes

- Inherits all restrictions from `CompressedTexture`: no mipmap generation, no vertical flipping.

## Related

- [CompressedTexture](./CompressedTexture.md)
- [CubeTexture](./CubeTexture.md)
- [CubeDepthTexture](./CubeDepthTexture.md)
