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
| `multiview` | boolean | `false` | Enable multiview rendering |

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
