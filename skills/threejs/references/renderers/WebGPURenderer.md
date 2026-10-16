# WebGPURenderer

The modern renderer for three.js. Targets WebGPU when available and automatically falls back to WebGL 2. Extends the base `Renderer` class and shares the same API surface.

## Signature / Usage

```js
import WebGPURenderer from 'three/addons/renderers/common/WebGPURenderer.js';

const renderer = new WebGPURenderer({ antialias: true });
await renderer.init(); // required before rendering
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

## Constructor

```js
new WebGPURenderer(parameters)
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `alpha` | boolean | `true` | Transparent framebuffer. |
| `depth` | boolean | `true` | Include depth buffer. |
| `stencil` | boolean | `false` | Include stencil buffer. |
| `antialias` | boolean | `false` | Enable MSAA anti-aliasing. |
| `samples` | number | `0` | MSAA sample count (4 when `antialias` is `true`). |
| `logarithmicDepthBuffer` | boolean | `false` | Enable logarithmic depth buffer. |
| `reversedDepthBuffer` | boolean | `false` | Enable reversed depth buffer. |
| `forceWebGL` | boolean | `false` | Force WebGL 2 backend even if WebGPU is available. |
| `multiview` | boolean | `false` | Enable WebXR multiview for improved XR performance. |
| `outputType` | number | device-preferred | Texture type for canvas output. |
| `outputBufferType` | number | `HalfFloatType` | Output buffer type. Use `UnsignedByteType` to save memory. |
| `getFallback` | function \| null | `null` | Custom fallback backend selection function. |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `isWebGPURenderer` | boolean (readonly) | Always `true`. Used for type testing. |
| `library` | StandardNodeLibrary | Node library for material/light type mapping. |

All other properties and methods are inherited from the base `Renderer` class (see `Renderer` documentation for the full list).

## Key Differences vs WebGLRenderer

| Aspect | WebGLRenderer | WebGPURenderer |
|--------|---------------|----------------|
| Backend | WebGL 2 only | WebGPU (falls back to WebGL 2) |
| Initialization | Synchronous constructor | Requires `await renderer.init()` |
| Compute shaders | Not supported | `renderer.compute(nodes)` |
| TSL / Node materials | Via `setNodesHandler` | Native support |
| `forceWebGL` option | N/A | `forceWebGL: true` forces WebGL 2 |
| Import path | `three` core | `three/addons/renderers/common/WebGPURenderer.js` |
| MSAA control | Via `antialias` option | Via `antialias` + `samples` |

## Notes

- `renderer.init()` is async and must be awaited before the first `render()` call.
- `forceWebGL: true` is useful for testing WebGL 2 compatibility or when WebGPU is unstable.
- Node-based materials (MeshStandardNodeMaterial, etc.) and TSL shaders require WebGPURenderer.
- The `compute()` method for compute shaders is only available with a real WebGPU backend.
- Post-processing goes through `RenderPipeline` (`PostProcessing` is deprecated since r183).
- Migration (r182 → r183): shadows in `WebGPURenderer` were improved; existing shadow bias values that mitigated shadow acne may need to be removed or decreased.
- Migration (r184 → r185): premultiplied alpha handling changed (#33369). On blending problems, configure an opaque `Scene.background` or an opaque clear color via `renderer.setClearColor()`; use transparent backgrounds only when blending with the HTML background is required.
- Migration (r185 → r186): `PCFSoftShadowMap` with `WebGPURenderer` was removed (#33987). Use `PCFShadowMap`, which is now soft as well.

## Related

- [WebGLRenderer](./WebGLRenderer.md)
