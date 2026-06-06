# CubeTexture

Creates a cube map texture made up of six images (one per face). Commonly used for environment maps, skyboxes, and reflections. Extends `Texture`.

## Signature / Usage

```js
const loader = new THREE.CubeTextureLoader();
loader.setPath('textures/cube/pisa/');
const textureCube = loader.load(['px.png','nx.png','py.png','ny.png','pz.png','nz.png']);

const material = new THREE.MeshBasicMaterial({ envMap: textureCube });
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `images` | Array\<Image\> | `[]` | Six images, one per cube face |
| `mapping` | number | `CubeReflectionMapping` | Mapping mode |
| `wrapS` | number | `ClampToEdgeWrapping` | Horizontal wrapping |
| `wrapT` | number | `ClampToEdgeWrapping` | Vertical wrapping |
| `magFilter` | number | `LinearFilter` | Magnification filter |
| `minFilter` | number | `LinearMipmapLinearFilter` | Minification filter |
| `format` | number | `RGBAFormat` | Texture format |
| `type` | number | `UnsignedByteType` | Data type |
| `anisotropy` | number | `Texture.DEFAULT_ANISOTROPY` | Anisotropic filtering |
| `colorSpace` | string | `NoColorSpace` | Color space |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `flipY` | boolean | `false` | Vertical flip on GPU upload (overrides Texture default) |
| `images` | Array\<Image\> | — | Alias for `CubeTexture#image` |
| `isCubeTexture` | boolean (readonly) | `true` | Type-testing flag |

## Notes

- Image order: `[+X, -X, +Y, -Y, +Z, -Z]` (right, left, top, bottom, front, back).
- `flipY` defaults to `false` for cube textures (unlike base `Texture`).

## Related

- [Texture](./Texture.md)
- [CubeDepthTexture](./CubeDepthTexture.md)
- [CompressedCubeTexture](./CompressedCubeTexture.md)
