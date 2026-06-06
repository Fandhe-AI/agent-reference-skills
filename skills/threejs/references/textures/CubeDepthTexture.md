# CubeDepthTexture

Automatically saves depth information from a cube rendering (e.g. for `PointLight` shadows) into a cube texture with depth format. Extends `DepthTexture`.

## Signature / Usage

```js
const depthTexture = new THREE.CubeDepthTexture(512);
const renderTarget = new THREE.WebGLCubeRenderTarget(512);
renderTarget.depthTexture = depthTexture;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | number | — | Width and height of each cube face |
| `type` | number | `UnsignedIntType` | Texture data type |
| `mapping` | number | `CubeReflectionMapping` | Mapping mode |
| `wrapS` | number | `ClampToEdgeWrapping` | Horizontal wrapping |
| `wrapT` | number | `ClampToEdgeWrapping` | Vertical wrapping |
| `magFilter` | number | `NearestFilter` | Magnification filter |
| `minFilter` | number | `NearestFilter` | Minification filter |
| `anisotropy` | number | `Texture.DEFAULT_ANISOTROPY` | Anisotropic filtering |
| `format` | number | `DepthFormat` | Texture format |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `images` | Array\<Image\> | — | Alias for the cube face images |
| `isCubeDepthTexture` | boolean (readonly) | `true` | Type-testing flag |
| `isCubeTexture` | boolean (readonly) | `true` | Enables cube texture handling in WebGLTextures |

## Notes

- Primarily used internally for `PointLight` shadow maps.
- Inherits `compareFunction` and other depth properties from `DepthTexture`.

## Related

- [DepthTexture](./DepthTexture.md)
- [CubeTexture](./CubeTexture.md)
