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
| `logarithmicDepthBuffer` | boolean | `false` | Enable logarithmic depth buffer. Ignored when a reversed depth buffer is in use. |
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
| `drawingPipeline` | StandardDrawingPipeline | Decides which objects of a scene are rendered and how they are submitted to the render list. Assigning a pipeline binds it to the renderer. Default `StandardDrawingPipeline`. Experimental (see `StandardDrawingPipeline`). |
| `lighting` | Lighting | The lighting manager. Its `dispose()` frees the lights nodes it created; `Renderer#dispose()` calls it. |
| `onError` | function | Called when an uncaptured backend error is reported (e.g. a WebGPU validation / out-of-memory / internal error raised outside an error scope). Override to surface errors in your own UI without escalating to a device loss. Default logs to the console. |
| `currentSamples` | number | Current MSAA sample count. When rendering to a custom render target, that target's samples are used. It is 0 when the renderer needs an internal framebuffer target for tone mapping or color space conversion, or when rendering a fullscreen quad to screen. |

## Methods

| Method | Description |
|--------|-------------|
| `init()` | Initialize the renderer (backend setup). |
| `render(scene, camera)` | Render scene with camera. |
| `renderAsync(scene, camera)` | Async render. |
| `compute(computeNodes, dispatchSize)` | Execute compute nodes (requires a WebGPU backend). Throws if `dispatchSize` is passed for compute nodes created with `compute( count )` (use `computeKernel()` instead); throws if an element is not a `ComputeNode`. |
| `compileAsync(scene, camera, targetScene?, onProgress?)` | Precompile materials. `onProgress` is executed while the compilation is in progress. Returns a Promise. |
| `compile(scene, camera, targetScene?, onProgress?)` | Alias for `compileAsync()`. |
| `compileComputeAsync(computeNodes, onProgress)` | Compile compute programs ahead of time. Returns a Promise. |
| `resetState()` | Resets the backend's internal state cache; useful when the rendering context is shared with other libraries that change the state. No-op for the WebGPU backend. |
| `clear(color?, depth?, stencil?)` / `clearColor()` / `clearDepth()` / `clearStencil()` | Clear buffers. |
| `setSize(width, height, updateStyle?)` | Set renderer size. |
| `setPixelRatio(value)` | Set device pixel ratio. |
| `setAnimationLoop(callback)` | Define animation loop (async; initializes the renderer if needed). Passing `null` does not start the animation loop. |
| `getAnimationLoop()` | Returns the current animation loop callback or `null`. |
| `setRenderTarget(renderTarget)` / `getOutputRenderTarget()` | Set/get render target. |
| `setViewport(x, y, width, height)` / `setScissor(x, y, width, height)` / `setScissorTest(boolean)` | Viewport and scissor control. |
| `initTexture(texture)` / `copyTextureToTexture(srcTexture, dstTexture)` / `readRenderTargetPixelsAsync()` | Texture and buffer utilities. `readRenderTargetPixelsAsync()` takes a `faceIndex` (cube face, depth slice or array layer index, default `0`). |
| `hasFeature(name)` | Check backend feature support. |
| `getClearColor()` / `getClearAlpha()` / `getClearDepth()` / `setClearColor(color, alpha)` | Clear value accessors. |
| `dispose()` | Free all internal resources (async). Waits for a pending `init()`, then disposes the drawing pipeline, lighting, inspector, animation, objects, geometries, attributes, pipelines, nodes, bindings, render lists/contexts, canvas targets, textures and info, and finally the backend. |
| `getArrayBufferAsync(attribute, target?, offset?, count?)` | Reads a storage buffer attribute back to the CPU. `target` (`ReadbackBuffer` or `ArrayBuffer`, default `null` = new `ArrayBuffer`), `offset` (bytes, multiple of 4, default `0`) and `count` (bytes, multiple of 4, default `-1` = to the end) are optional. Resolves with an `ArrayBuffer` or `ReadbackBuffer`. |

## Notes

- `Renderer` is the shared base class for `WebGPURenderer`; `render()`/`init()` are async-capable and `init()` must be awaited before the first render.
- Concrete renderers (`WebGPURenderer`) extend this class and add backend-specific properties (e.g. `forceWebGL`); see the subclass page for the full option/property diff.
- Migration (r186 → r187): registering a light node changed from `renderer.library.addLight( CustomLightNode, CustomLight )` to `CustomLight.registerNode( CustomLightNode )`. `NodeLibrary#addLight()` and `getLightNodeClass()` are deprecated since r187 (https://github.com/mrdoob/three.js/pull/34622).
- Migration (r186 → r187): `compute()` throws when `dispatchSize` is combined with a compute node created via `compute( count )` (https://github.com/mrdoob/three.js/pull/34813).
- Migration (r186 → r187): `setAnimationLoop( null )` no longer starts the animation loop (https://github.com/mrdoob/three.js/pull/35279). The scene traversal moved into the drawing pipeline (https://github.com/mrdoob/three.js/pull/35191).
- Migration (r186 → r187): internal managers track textures, geometries and attributes via `WeakRef` / `FinalizationRegistry` and free them in `dispose()` (https://github.com/mrdoob/three.js/pull/34368).
- Source: https://threejs.org/docs/pages/Renderer.html (three.js r187, `src/renderers/common/Renderer.js`; JSDoc from tag r187 / commit 7e89746)
- Not to be confused with `WebGLRenderer`, which is a separate, WebGL-2-only renderer class with its own independent API surface.

## Related

- [WebGPURenderer](./WebGPURenderer.md)
- [WebGLRenderer](./WebGLRenderer.md)
- [Info](./Info.md)
- [StandardDrawingPipeline](./StandardDrawingPipeline.md)
