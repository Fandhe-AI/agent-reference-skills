# Renderer

Base class for the modern node-based renderers (`WebGPURenderer`, `WebGLRenderer` when using the WebGPU-backend build). Handles rendering scenes/objects to a canvas or render target via a pluggable `backend` (WebGPU or WebGL 2).

## Signature / Usage

```js
new Renderer(backend, parameters)
```

## Constructor Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `backend` | Backend | — | The backend the renderer targets (WebGPU or WebGL 2). |
| `logarithmicDepthBuffer` | boolean | `false` | Enable logarithmic depth buffer. |
| `reversedDepthBuffer` | boolean | `false` | Enable reversed depth buffer. |
| `alpha` | boolean | `true` | Whether the default framebuffer is transparent. |
| `depth` | boolean | `true` | Whether the default framebuffer has a depth buffer. |
| `stencil` | boolean | `false` | Whether the default framebuffer has a stencil buffer. |
| `antialias` | boolean | `false` | Enable MSAA anti-aliasing. |
| `samples` | number | `0` | MSAA sample count. |
| `getFallback` | function \| null | `null` | Custom fallback backend selection function. |
| `outputBufferType` | number | `HalfFloatType` | Output buffer type. |
| `multiview` | boolean | `false` | Enable WebXR multiview. |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `backend` | Backend | Reference to the current backend. |
| `domElement` | HTMLCanvasElement | The canvas element used for output. |
| `alpha` | boolean | Whether default framebuffer is transparent (default `true`). |
| `depth` | boolean | Whether default framebuffer has depth buffer (default `true`). |
| `stencil` | boolean | Whether default framebuffer has stencil buffer (default `false`). |
| `autoClear` / `autoClearColor` / `autoClearDepth` / `autoClearStencil` | boolean | Auto-clear behavior before render calls. |
| `opaque` | boolean | Render opaque objects (default `true`). |
| `transparent` | boolean | Render transparent objects (default `true`). |
| `sortObjects` | boolean | Sort render lists for transparency (default `true`). |
| `outputColorSpace` | ColorSpace | Output color space (default `SRGBColorSpace`). |
| `toneMapping` / `toneMappingExposure` | ToneMappingMode / number | Tone mapping mode and exposure. |
| `info` | Info | GPU memory and rendering statistics (see `Info`). |
| `shadowMap` | Object | Shadow map configuration. |
| `xr` | Object | XR manager. |

## Methods

| Method | Description |
|--------|-------------|
| `init()` | Initialize the renderer (backend setup). |
| `render(scene, camera)` | Render scene with camera. |
| `renderAsync(scene, camera)` | Async render. |
| `compute(computeNodes, dispatchSize)` | Execute compute nodes (requires a WebGPU backend). |
| `compileAsync(scene, camera, targetScene?)` | Precompile materials. |
| `clear(color?, depth?, stencil?)` / `clearColor()` / `clearDepth()` / `clearStencil()` | Clear buffers. |
| `setSize(width, height, updateStyle?)` | Set renderer size. |
| `setPixelRatio(value)` | Set device pixel ratio. |
| `setAnimationLoop(callback)` | Define animation loop. |
| `setRenderTarget(renderTarget)` / `getOutputRenderTarget()` | Set/get render target. |
| `setViewport(x, y, width, height)` / `setScissor(x, y, width, height)` / `setScissorTest(boolean)` | Viewport and scissor control. |
| `initTexture(texture)` / `copyTextureToTexture(srcTexture, dstTexture)` / `readRenderTargetPixelsAsync()` | Texture and buffer utilities. |
| `hasFeature(name)` | Check backend feature support. |
| `getClearColor()` / `getClearAlpha()` / `getClearDepth()` / `setClearColor(color, alpha)` | Clear value accessors. |
| `dispose()` | Free all internal resources. |

## Notes

- `Renderer` is the shared base class for `WebGPURenderer`; `render()`/`init()` are async-capable and `init()` must be awaited before the first render.
- Concrete renderers (`WebGPURenderer`) extend this class and add backend-specific properties (e.g. `forceWebGL`); see the subclass page for the full option/property diff.
- Not to be confused with `WebGLRenderer`, which is a separate, WebGL-2-only renderer class with its own independent API surface.

## Related

- [WebGPURenderer](./WebGPURenderer.md)
- [WebGLRenderer](./WebGLRenderer.md)
- [Info](./Info.md)
