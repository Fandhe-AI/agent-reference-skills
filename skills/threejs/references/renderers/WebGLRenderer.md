# WebGLRenderer

The primary renderer for three.js. Uses WebGL 2 to display scenes in a web browser. WebGL 1 is not supported since r163.

## Signature / Usage

```js
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
```

## Constructor Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `canvas` | HTMLCanvasElement \| OffscreenCanvas | `null` | Canvas element for output. New canvas created if omitted. |
| `context` | WebGL2RenderingContext | `null` | Existing WebGL2 context to attach to. |
| `precision` | `'highp'` \| `'mediump'` \| `'lowp'` | `'highp'` | Default shader precision. |
| `alpha` | boolean | `false` | Whether clear alpha is 0 (`true`) or 1 (`false`). |
| `premultipliedAlpha` | boolean | `true` | Whether renderer assumes colors have premultiplied alpha. |
| `antialias` | boolean | `false` | Enable MSAA anti-aliasing. |
| `stencil` | boolean | `false` | Whether drawing buffer has ≥8-bit stencil buffer. |
| `preserveDrawingBuffer` | boolean | `false` | Preserve buffer until manually cleared. |
| `powerPreference` | `'default'` \| `'low-power'` \| `'high-performance'` | `'default'` | GPU configuration hint for the browser. |
| `failIfMajorPerformanceCaveat` | boolean | `false` | Fail if low-performance rendering is detected. |
| `depth` | boolean | `true` | Whether drawing buffer has ≥16-bit depth buffer. |
| `logarithmicDepthBuffer` | boolean | `false` | Use logarithmic depth buffer (useful for huge scale differences). |
| `reversedDepthBuffer` | boolean | `false` | Use reverse depth buffer (requires `EXT_clip_control`). |
| `outputBufferType` | number | `UnsignedByteType` | Output buffer type. Use `HalfFloatType` for HDR output. |

## Properties

### Clearing & Rendering Control

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `autoClear` | boolean | `true` | Auto-clear output before each `render()`. |
| `autoClearColor` | boolean | `true` | Auto-clear color buffer (when `autoClear` is true). |
| `autoClearDepth` | boolean | `true` | Auto-clear depth buffer (when `autoClear` is true). |
| `autoClearStencil` | boolean | `true` | Auto-clear stencil buffer (when `autoClear` is true). |
| `sortObjects` | boolean | `true` | Sort objects for correct transparency rendering. |

### Output & Color

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `outputColorSpace` | `SRGBColorSpace` \| `LinearSRGBColorSpace` | `SRGBColorSpace` | Output color space. |
| `toneMapping` | ToneMappingMode | `NoToneMapping` | Tone mapping mode (NoToneMapping, LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping, AgXToneMapping, NeutralToneMapping, CustomToneMapping). |
| `toneMappingExposure` | number | `1` | Exposure level for tone mapping. |
| `transmissionResolutionScale` | number | `1` | Resolution scale for transmission render target (fraction of viewport). |

### Rendering State

| Name | Type | Description |
|------|------|-------------|
| `domElement` | HTMLCanvasElement \| OffscreenCanvas | The canvas element used for output. |
| `capabilities` | WebGLRenderer~Capabilities | Details about the rendering context capabilities (see below). |
| `clippingPlanes` | Plane[] | Global clipping planes in world space. |
| `localClippingEnabled` | boolean | Whether to respect object-level clipping planes. |
| `coordinateSystem` | WebGLCoordinateSystem | Always `WebGLCoordinateSystem` for WebGLRenderer. |
| `debug` | Object | `{ checkShaderErrors: boolean, onShaderError: function }` |
| `extensions` | Object | `{ get(name): object|null, has(name): boolean }` for WebGL extension queries. |
| `info` | WebGLRenderer~Info | GPU memory and rendering statistics. |
| `isWebGLRenderer` | boolean (readonly) | Always `true`. |
| `properties` | Object | Internal WebGL object property tracking. |
| `shadowMap` | WebGLRenderer~ShadowMap | Shadow map configuration (see below). |
| `xr` | WebXRManager | Reference to the WebXR manager. |

### shadowMap Object

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shadowMap.enabled` | boolean | `false` | Enable shadow maps. |
| `shadowMap.autoUpdate` | boolean | `true` | Auto-update shadows each frame. |
| `shadowMap.needsUpdate` | boolean | `false` | Force shadow map update on next render. |
| `shadowMap.type` | ShadowMapType | `PCFShadowMap` | Shadow filtering: BasicShadowMap, PCFShadowMap, VSMShadowMap. |

### capabilities Object

| Name | Type | Description |
|------|------|-------------|
| `getMaxAnisotropy()` | number | Maximum anisotropy level. |
| `getMaxPrecision(shaderType)` | string | Maximum precision for given shader type. |
| `logarithmicDepthBuffer` | boolean | Whether logarithmic depth buffer is active. |
| `maxAttributes` | number | Maximum vertex attributes. |
| `maxCubemapSize` | number | Maximum cube map texture size. |
| `maxFragmentUniforms` | number | Maximum fragment shader uniforms. |
| `maxSamples` | number | Maximum MSAA samples. |
| `maxTextures` | number | Maximum texture units. |
| `maxTextureSize` | number | Maximum texture size. |
| `maxVaryings` | number | Maximum varyings. |
| `maxVertexTextures` | number | Maximum vertex texture units. |
| `maxVertexUniforms` | number | Maximum vertex shader uniforms. |
| `precision` | string | Actual shader precision in use. |
| `reversedDepthBuffer` | boolean | Whether reversed depth buffer is active. |

### info Object

| Name | Type | Description |
|------|------|-------------|
| `autoReset` | boolean | Auto-reset stats after each render (default: `true`). Set `false` for multi-pass frames and call `info.reset()` manually. |
| `memory.geometries` | number | Number of allocated geometries. |
| `memory.textures` | number | Number of allocated textures. |
| `render.frame` | number | Current frame count. |
| `render.calls` | number | Draw calls in current frame. |
| `render.triangles` | number | Triangles rendered in current frame. |
| `render.points` | number | Points rendered in current frame. |
| `render.lines` | number | Lines rendered in current frame. |
| `programs` | WebGLProgram[] | List of compiled shader programs. |
| `reset()` | void | Manually reset render stats. |

## Methods

### Rendering

| Method | Description |
|--------|-------------|
| `render(scene, camera)` | Render the scene with the given camera. Respects `autoClear` settings. |
| `setAnimationLoop(callback)` | Set animation loop callback. Recommended over `requestAnimationFrame`; required for WebXR. Pass `null` to stop. |

### Clear Operations

| Method | Description |
|--------|-------------|
| `clear(color?, depth?, stencil?)` | Clear specified buffers. |
| `clearColor()` | Clear color buffer only. |
| `clearDepth()` | Clear depth buffer only. |
| `clearStencil()` | Clear stencil buffer only. |
| `setClearColor(color, alpha?)` | Set clear color and alpha. |
| `getClearColor(target)` | Get current clear color into `target`. |
| `setClearAlpha(alpha)` | Set clear alpha (0–1). |
| `getClearAlpha()` | Get current clear alpha. |

### Compilation

| Method | Description |
|--------|-------------|
| `compile(scene, camera, targetScene?)` | Precompile all materials in scene. Returns `Set<Material>`. |
| `compileAsync(scene, camera, targetScene?)` | Async compilation using `KHR_parallel_shader_compile`. Returns `Promise`. |

### Render Target

| Method | Description |
|--------|-------------|
| `setRenderTarget(target, activeCubeFace?, activeMipmapLevel?)` | Set active render target (`null` = canvas). |
| `getRenderTarget()` | Get current render target (`null` = canvas). |
| `initRenderTarget(target)` | Initialize render target GPU resources. |

### Texture Operations

| Method | Description |
|--------|-------------|
| `initTexture(texture)` | Preload texture to GPU to avoid decode stall on first render. |
| `copyFramebufferToTexture(texture, position?, level?)` | Copy current framebuffer into a `FramebufferTexture`. |
| `copyTextureToTexture(srcTexture, dstTexture, srcRegion?, dstPosition?, srcLevel?, dstLevel?)` | Copy pixels from one texture to another. Both must be initialized if render targets. |
| `readRenderTargetPixels(target, x, y, width, height, buffer, activeCubeFaceIndex, textureIndex?)` | Read pixel data synchronously from render target into typed array. |
| `readRenderTargetPixelsAsync(target, x, y, width, height, buffer, activeCubeFaceIndex, textureIndex?)` | Non-blocking async version. Returns `Promise<TypedArray>`. |

### Viewport & Scissor

| Method | Description |
|--------|-------------|
| `setViewport(x\|Vector4, y?, width?, height?)` | Set viewport region. |
| `getViewport(target)` | Get viewport into `target` Vector4. |
| `setScissor(x\|Vector4, y?, width?, height?)` | Set scissor region. |
| `getScissor(target)` | Get scissor region into `target` Vector4. |
| `setScissorTest(enabled)` | Enable/disable scissor test. |
| `getScissorTest()` | Get scissor test state. |

### Size & Pixel Ratio

| Method | Description |
|--------|-------------|
| `setSize(width, height, updateStyle?)` | Resize canvas. `updateStyle` (default `true`) controls CSS size update. |
| `getSize(target)` | Get logical canvas size (ignores pixel ratio) into `target` Vector2. |
| `setPixelRatio(value)` | Set device pixel ratio. |
| `getPixelRatio()` | Get device pixel ratio. |
| `setDrawingBufferSize(width, height, pixelRatio)` | Set drawing buffer size directly. |
| `getDrawingBufferSize(target)` | Get physical drawing buffer size (honors pixel ratio) into `target` Vector2. |

### Context & WebGL

| Method | Description |
|--------|-------------|
| `getContext()` | Get underlying `WebGL2RenderingContext`. |
| `getContextAttributes()` | Get WebGL context creation attributes. |
| `resetState()` | Reset internal WebGL state (for shared/external contexts). |
| `forceContextLoss()` | Simulate WebGL context loss (requires `WEBGL_lose_context`). |
| `forceContextRestore()` | Restore WebGL context (requires `WEBGL_lose_context`). |
| `getActiveCubeFace()` | Get current active cube face index. |
| `getActiveMipmapLevel()` | Get current active mipmap level. |

### Sorting

| Method | Description |
|--------|-------------|
| `setOpaqueSort(method\|null)` | Set custom opaque sort function. `null` restores default `painterSortStable`. |
| `setTransparentSort(method\|null)` | Set custom transparent sort function. `null` restores default `reversePainterSortStable`. |

### Other

| Method | Description |
|--------|-------------|
| `setEffects(effects)` | Set post-processing effects array. |
| `setNodesHandler(nodesHandler)` | Set `WebGLNodesHandler` for TSL material compatibility. |
| `dispose()` | Free all GPU resources. Call when renderer is no longer needed. |

## Notes

- Use `setAnimationLoop` instead of `requestAnimationFrame` — it is required for WebXR sessions.
- Always call `renderer.dispose()` and `renderer.forceContextLoss()` when destroying a renderer to free GPU memory.
- For multi-pass rendering pipelines, set `renderer.info.autoReset = false` and call `renderer.info.reset()` once per logical frame.
- `setSize` also updates the CSS size by default. Pass `updateStyle: false` to skip the CSS update (e.g. when using a fixed CSS size).
- Shadow maps are disabled by default. Enable with `renderer.shadowMap.enabled = true` and set `castShadow`/`receiveShadow` on objects.
- `toneMapping` defaults to `NoToneMapping`; for PBR scenes use `ACESFilmicToneMapping` or `AgXToneMapping`.

## Related

- [WebGLRenderTarget](./WebGLRenderTarget.md)
- [WebGLCubeRenderTarget](./WebGLCubeRenderTarget.md)
- [WebGPURenderer](./WebGPURenderer.md)
- [WebXRManager](./WebXRManager.md)
