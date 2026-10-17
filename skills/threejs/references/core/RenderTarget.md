# RenderTarget

An off-screen render buffer. The renderer draws a scene into this target instead of the canvas, making the result available as a texture for post-processing or other effects.

## Signature / Usage

```js
const renderTarget = new THREE.RenderTarget(512, 512, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
});

// Render scene into target
renderer.setRenderTarget(renderTarget);
renderer.render(scene, camera);
renderer.setRenderTarget(null);

// Use the result as a texture
material.map = renderTarget.texture;
```

## Constructor

```js
new RenderTarget(width?, height?, options?)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | number | `1` | Width in pixels |
| `height` | number | `1` | Height in pixels |
| `options` | Object | — | Configuration (see below) |

### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `depthBuffer` | boolean | `true` | Allocate depth buffer |
| `stencilBuffer` | boolean | `false` | Allocate stencil buffer |
| `samples` | number | `0` | MSAA sample count (0 = no MSAA) |
| `magFilter` | number | `LinearFilter` | Texture magnification filter |
| `minFilter` | number | `LinearFilter` | Texture minification filter |
| `format` | number | `RGBAFormat` | Texture format |
| `type` | number | `UnsignedByteType` | Texture data type |
| `wrapS/T` | number | `ClampToEdgeWrapping` | Texture wrap modes |
| `colorSpace` | string | `NoColorSpace` | Color space |
| `depthTexture` | DepthTexture | `null` | Use texture for depth instead of renderbuffer |
| `count` | number | `1` | Number of color attachments (MRT) |
| `multiview` | boolean | `false` | Enable multiview rendering (WebGL OVR_multiview2 extension) |
| `resolveColorBuffer` | boolean | `true` | Resolve the color buffer. Only relevant for multisampled render targets |
| `resolveDepthBuffer` | boolean | `true` | Resolve the depth buffer. Only relevant for multisampled render targets |
| `resolveStencilBuffer` | boolean | `true` | Resolve the stencil buffer. Only relevant for multisampled render targets |
| `storeMultisampledColorBuffer` | boolean | `true` | Store the multisampled color buffer; `false` saves memory bandwidth when the multisampled data are not needed after a render pass |
| `storeMultisampledDepthBuffer` | boolean | `true` | Same for the multisampled depth buffer |
| `storeMultisampledStencilBuffer` | boolean | `true` | Same for the multisampled stencil buffer |
| `useArrayDepthTexture` | boolean | `false` | Create the depth texture as an array texture for per-layer depth testing; separate from `multiview` |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `width` | number | Width in pixels |
| `height` | number | Height in pixels |
| `depth` | number | Depth (3D targets). Default: `1` |
| `texture` | Texture | Default color attachment |
| `textures` | Texture[] | All color attachments (MRT) |
| `depthTexture` | DepthTexture \| null | Depth texture attachment |
| `depthBuffer` | boolean | Whether depth buffer is allocated |
| `stencilBuffer` | boolean | Whether stencil buffer is allocated |
| `samples` | number | MSAA sample count |
| `resolveColorBuffer` | boolean | When `false`, color attachments do not receive the resolved (single-sampled) output; content is only accessible within the render pass. Multisampled targets only. Default: `true` |
| `resolveDepthBuffer` | boolean | When `false`, the depth texture does not receive the resolved depth output (saves memory bandwidth). Only relevant for multisampled targets in WebGL; WebGPU does not resolve depth. Default: `true` |
| `resolveStencilBuffer` | boolean | Analogous to `resolveDepthBuffer` for stencil. Default: `true` |
| `storeMultisampledColorBuffer` | boolean | When `false`, multisampled color data are discarded at the end of a render pass after being resolved. Default: `true` |
| `storeMultisampledDepthBuffer` | boolean | When `false`, multisampled depth data are discarded at the end of a render pass. Must stay `true` in WebGPU when the depth texture of a multisampled target is sampled. Default: `true` |
| `storeMultisampledStencilBuffer` | boolean | Analogous to `storeMultisampledDepthBuffer` for stencil. Default: `true` |
| `useArrayDepthTexture` | boolean | Create the depth texture as an array texture for per-layer depth testing. Default: `false` |
| `multiview` | boolean | Whether the target is used for multiview rendering (WebGL OVR_multiview2). Default: `false` |
| `viewport` | Vector4 | Render viewport |
| `scissor` | Vector4 | Scissor region |
| `scissorTest` | boolean | Enable scissor test |
| `isRenderTarget` | boolean (readonly) | Type flag |

## Methods

| Method | Description |
|--------|-------------|
| `setSize(width, height, depth?)` | Resize the render target |
| `clone()` | Return a copy of this target |
| `copy(source)` | Copy settings from another target |
| `dispose()` | Free GPU resources; fires `dispose` event |

## Notes

- Call `dispose()` when the target is no longer needed to free GPU memory.
- For cube-map targets use `WebGLCubeRenderTarget`; for 3D textures use `RenderTarget3D`.

## Related

- [RenderTarget3D](./RenderTarget3D.md)
