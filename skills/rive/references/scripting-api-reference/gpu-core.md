# GPU Core: Canvas / GPUCanvas / Shader / GPUPipeline / Render Passes

Core rendering-target and pipeline types for the [WGSL Shaders](./wgsl-shaders.md) scripting surface, obtained through [Context](./interface-context.md) (`context:canvas()`, `context:gpuCanvas()`, `context:shader()`).

## Signature / Usage

```lua
function init(self: MyShaderNode, context: Context): boolean
  self.shader = context:shader('myEffect')
  self.gpuCanvas = context:gpuCanvas()
  return true
end

function drawCanvas(self: MyShaderNode)
  local pass = self.gpuCanvas:beginRenderPass({ color = { clearColor = { 0, 0, 0, 1 } } })
  pass:setPipeline(self.pipeline)
  pass:draw(3)
  pass:finish()
end

function draw(self: MyShaderNode, renderer: Renderer)
  renderer:drawImage(self.gpuCanvas.image, self.sampler, 'srcOver', 1)
end
```

## Options / Props

| Type | Members | Description |
| --- | --- | --- |
| `Canvas` | `image`, `width`, `height`; `resize(w, h)`, `beginFrame(desc?) -> Renderer`, `endFrame()` | 2D Renderer target; `.image` used with `renderer:drawImage()`; frame pattern `beginFrame` → draws → `endFrame` |
| `GPUCanvas` | `image`, `width`, `height`, `format` (always `'rgba8unorm'`); `resize(w, h)`, `colorView() -> GPUTextureView`, `beginRenderPass(desc: RenderPassDesc) -> GPURenderPass` | GPU rendering target analogous to a WebGPU surface texture |
| `Shader` | opaque | Compiled shader module from `context:shader(name)` (editor asset name, no `.wgsl` extension); raw WGSL source strings are not accepted at runtime |
| `GPUPipeline` | `new({...})`; `getBindGroupLayout(groupIndex) -> GPUBindGroupLayout` | Compiled pipeline combining vertex/fragment `PipelineStage`s, vertex buffer layouts, bind group layouts, color targets, depth-stencil state, cull mode, topology, sample count |
| `PipelineStage` | a `Shader`, or `{ module = Shader, entryPoint = name }` | Entry points come from `@vertex`/`@fragment` WGSL functions; omitted `entryPoint` uses the first matching stage function |
| `RenderPassDesc` | `color`, `depthStencil` | Descriptor for `gpuCanvas:beginRenderPass`; needs at least one attachment; sampleCount inferred from views |
| `GPURenderPass` | `setPipeline(p)`, `setVertexBuffer(slot, buf)`, `setIndexBuffer(buf, format?)`, `setBindGroup(i, bg, dynamicOffsets?)`, `setViewport(x,y,w,h)`, `setScissorRect(x,y,w,h)`, `setStencilReference(ref)`, `setBlendColor(r,g,b,a)`, `draw(vertexCount, instanceCount?, firstVertex?)`, `drawIndexed(indexCount, instanceCount?, firstIndex?)`, `finish()` | Active render pass for issuing draw calls |
| `ColorAttachment` | `view?` (defaults to canvas `colorView()`), `resolveTarget?` (MSAA 1x target), `loadOp`, `storeOp` (`'discard'` after MSAA resolve, else `'store'`), `clearColor` | Color target descriptor for a render pass |
| `DepthStencilAttachment` | `view` (required, from `GPUTexture:view()`), `depthLoadOp`, `depthStoreOp` (required: `'discard'`/`'store'`), `depthClearValue` | Depth/stencil target descriptor |
| `GPUColor` | 4-component `{r,g,b,a}`, 0-1 range (HDR allows >1 on float targets) | Use `Color.toFloat()` to convert from a packed ARGB `Color` |
| `GPUFeatures` | compressed-format flags (`bc`/`etc2`/`astc`), `texture3D`, `textureArrays`, size limits (`maxTextureSize2D/Cube/3D`), `colorBufferFloat`/`colorBufferHalfFloat`, `perTargetBlend`/`perTargetWriteMask`, `maxColorAttachments`, `maxSamples` (power-of-two, up to 8), `anisotropicFiltering`, `drawBaseInstance`, `depthBiasClamp`, `maxUniformBufferSize`, `maxSamplers` | GPU capability query result from `context:features()` |

## Notes

- MSAA workflows require manually creating `GPUTexture` objects with a matching sample count and using the `GPUCanvas`'s `colorView()` as the resolve target.
- This scripting-internal GPU surface is unrelated to platform GPU APIs in `apple-graphics` / `nvidia-cuda` / `windows-graphics-media`.

## Related

- [wgsl-shaders.md](./wgsl-shaders.md)
- [gpu-buffers.md](./gpu-buffers.md)
- [gpu-bindings.md](./gpu-bindings.md)
- [gpu-textures.md](./gpu-textures.md)
- [gpu-pipeline-state.md](./gpu-pipeline-state.md)
