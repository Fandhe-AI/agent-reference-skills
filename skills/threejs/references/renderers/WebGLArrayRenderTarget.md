# WebGLArrayRenderTarget

A render target that renders to a texture array (multiple 2D texture layers). For use with WebGLRenderer.

## Signature / Usage

```js
const renderTarget = new THREE.WebGLArrayRenderTarget(width, height, depth);

renderer.setRenderTarget(renderTarget, 0); // render to layer 0
renderer.render(scene, camera);
renderer.setRenderTarget(null);

// renderTarget.texture is a DataArrayTexture
material.map = renderTarget.texture;
```

## Constructor

```js
new THREE.WebGLArrayRenderTarget(width, height, depth, options)
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | `1` | Width of each texture layer. |
| `height` | number | `1` | Height of each texture layer. |
| `depth` | number | `1` | Number of layers in the texture array. |
| `options` | RenderTarget~Options | — | Configuration object. |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `isWebGLArrayRenderTarget` | boolean (readonly) | Always `true`. Used for type testing. |
| `texture` | DataArrayTexture | The texture array. Overrides `WebGLRenderTarget#texture` type. |

Inheritance chain: `EventDispatcher` → `RenderTarget` → `WebGLRenderTarget` → `WebGLArrayRenderTarget`.

## Notes

- Each layer is a separate 2D texture accessible by index in shaders (`sampler2DArray`).
- For volumetric (3D) textures use `WebGL3DRenderTarget` instead.

## Related

- [WebGLRenderTarget](./WebGLRenderTarget.md)
- [WebGL3DRenderTarget](./WebGL3DRenderTarget.md)
