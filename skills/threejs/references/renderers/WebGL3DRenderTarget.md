# WebGL3DRenderTarget

A render target that renders to a 3D (volume) texture. For use with WebGLRenderer.

## Signature / Usage

```js
const renderTarget = new THREE.WebGL3DRenderTarget(width, height, depth);

renderer.setRenderTarget(renderTarget);
renderer.render(scene, camera);
renderer.setRenderTarget(null);

// renderTarget.texture is a Data3DTexture
volumeMaterial.map = renderTarget.texture;
```

## Constructor

```js
new THREE.WebGL3DRenderTarget(width, height, depth, options)
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | `1` | Width of the render target. |
| `height` | number | `1` | Height of the render target. |
| `depth` | number | `1` | Depth (number of slices) of the 3D texture. |
| `options` | RenderTarget~Options | — | Configuration object. |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `isWebGL3DRenderTarget` | boolean (readonly) | Always `true`. Used for type testing. |
| `texture` | Data3DTexture | The 3D texture. Overrides `WebGLRenderTarget#texture` type. |

Inheritance chain: `EventDispatcher` → `RenderTarget` → `WebGLRenderTarget` → `WebGL3DRenderTarget`.

## Notes

- Specifically designed for volumetric rendering and advanced GPU techniques requiring 3D textures.
- For array textures (layers of 2D textures) use `WebGLArrayRenderTarget` instead.

## Related

- [WebGLRenderTarget](./WebGLRenderTarget.md)
- [WebGLArrayRenderTarget](./WebGLArrayRenderTarget.md)
