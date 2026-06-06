# WebGLRenderTarget

An off-screen render target for WebGLRenderer. Renders to a texture instead of the canvas.

## Signature / Usage

```js
const renderTarget = new THREE.WebGLRenderTarget(width, height, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
});

renderer.setRenderTarget(renderTarget);
renderer.render(scene, camera);
renderer.setRenderTarget(null); // restore canvas output

// Use the texture
mesh.material.map = renderTarget.texture;
```

## Constructor

```js
new THREE.WebGLRenderTarget(width, height, options)
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | `1` | Width of the render target in pixels. |
| `height` | number | `1` | Height of the render target in pixels. |
| `options` | RenderTarget~Options | — | Configuration object (texture format, type, wrapping, etc.) |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `isWebGLRenderTarget` | boolean (readonly) | Always `true`. Used for type testing. |
| `texture` | Texture | The render target's color texture. Access after rendering to use as input to materials. |
| `depthTexture` | DepthTexture \| null | Optional depth texture (set manually). |
| `width` | number | Width of the render target. |
| `height` | number | Height of the render target. |
| `depth` | number | Number of layers (for array/3D targets). |

Inherits all properties from `RenderTarget` (which extends `EventDispatcher`).

## Methods

| Method | Description |
|--------|-------------|
| `setSize(width, height, depth?)` | Resize the render target. |
| `clone()` | Return a copy of this render target. |
| `copy(source)` | Copy settings from another render target. |
| `dispose()` | Free GPU resources and dispatch a `dispose` event. |

## Notes

- Call `dispose()` when the render target is no longer needed to avoid GPU memory leaks.
- To use a depth texture, assign a `THREE.DepthTexture` to `renderTarget.depthTexture` before rendering.
- For cube map rendering use `WebGLCubeRenderTarget`. For array textures use `WebGLArrayRenderTarget`.

## Related

- [WebGLCubeRenderTarget](./WebGLCubeRenderTarget.md)
- [WebGL3DRenderTarget](./WebGL3DRenderTarget.md)
- [WebGLArrayRenderTarget](./WebGLArrayRenderTarget.md)
- [WebGLRenderer](./WebGLRenderer.md)
