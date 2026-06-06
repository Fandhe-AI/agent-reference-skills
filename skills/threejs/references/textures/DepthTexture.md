# DepthTexture

Automatically saves depth information from a rendering into a texture. Used for post-processing, shadow mapping, and depth-based effects. Extends `Texture`.

## Signature / Usage

```js
const depthTexture = new THREE.DepthTexture(width, height);
const renderTarget = new THREE.WebGLRenderTarget(width, height);
renderTarget.depthTexture = depthTexture;

renderer.render(scene, camera);
// depthTexture now contains the depth buffer
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | — | Texture width |
| `height` | number | — | Texture height |
| `type` | number | `UnsignedIntType` | Data type |
| `mapping` | number | `Texture.DEFAULT_MAPPING` | Mapping mode |
| `wrapS` | number | `ClampToEdgeWrapping` | Horizontal wrapping |
| `wrapT` | number | `ClampToEdgeWrapping` | Vertical wrapping |
| `magFilter` | number | `LinearFilter` | Magnification filter |
| `minFilter` | number | `LinearFilter` | Minification filter |
| `anisotropy` | number | `Texture.DEFAULT_ANISOTROPY` | Anisotropic filtering |
| `format` | number | `DepthFormat` | Texture format (`DepthFormat` or `DepthStencilFormat`) |
| `depth` | number | `1` | Texture depth |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `compareFunction` | number \| null | `null` | Depth comparison function constant (e.g. `LessEqualCompare`) |
| `flipY` | boolean | `false` | Vertical flip on GPU upload (overrides Texture default) |
| `generateMipmaps` | boolean | `false` | Mipmap generation (overrides Texture default) |
| `isDepthTexture` | boolean (readonly) | `true` | Type-testing flag |

## Notes

- Attach to a `WebGLRenderTarget` via `renderTarget.depthTexture`.
- Use `DepthFormat` for depth-only or `DepthStencilFormat` for combined depth+stencil.
- Setting `compareFunction` enables hardware depth comparison (useful for shadow sampling).

## Related

- [Texture](./Texture.md)
- [CubeDepthTexture](./CubeDepthTexture.md)
- [FramebufferTexture](./FramebufferTexture.md)
