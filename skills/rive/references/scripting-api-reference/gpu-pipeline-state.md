# GPU Pipeline Fixed-Function State

Fixed-function state descriptors and enums used when building a [GPUPipeline](./gpu-core.md): blending, depth/stencil, culling, topology, and per-attachment load/store behavior.

## Signature / Usage

```lua
local pipeline = GPUPipeline.new({
  vertex = self.shader,
  fragment = self.shader,
  buffers = { self.vertexLayout },
  colorTargets = {
    { format = 'rgba8unorm', blend = {
      srcColor = 'srcAlpha', dstColor = 'one-minus-src-alpha', colorOp = 'add',
      srcAlpha = 'one', dstAlpha = 'one-minus-src-alpha', alphaOp = 'add',
    } },
  },
  cullMode = 'back',
  topology = 'triangle-list',
})
```

## Options / Props

| Type | Members | Description |
| --- | --- | --- |
| `ColorTarget` | `format`, `blend?: BlendState` | Color target format and optional blend state, passed to `GPUPipeline.new` |
| `BlendState` | `srcColor`, `dstColor`, `colorOp`, `srcAlpha`, `dstAlpha`, `alphaOp` (all `BlendFactor`/`BlendOp`) | Blend equation for one color target |
| `BlendFactor` (enum) | src/dst color and alpha blend factor (WebGPU canonical strings; exact list not published on the docs page) | |
| `BlendOp` (enum) | blend equation operator (exact list not published) | |
| `DepthStencilState` | `format`, `compare: CompareFunction`, `write` (default `false`), `depthBias`, `depthBiasSlopeScale` | Depth/stencil fixed-function state; omit entirely to disable depth testing |
| `CompareFunction` (enum) | depth comparison function for depth-stencil state / shadow samplers (exact list not published) | |
| `CullMode` (enum) | triangle face culling mode (exact list not published) | |
| `PrimitiveTopology` (enum) | primitive assembly topology, e.g. triangle-list style (exact list not published) | |
| `LoadOp` (enum) | `'clear'` (fill with `clearColor`/`depthClearValue`), `'load'` (preserve existing contents; expensive on tile-based GPUs) | Attachment behavior at render-pass start |
| `StoreOp` (enum) | `'discard'` (MSAA color/depth resolved or unused), `'store'` (retain contents) | Attachment behavior at render-pass end |
| `VertexFormat` (enum) | per-vertex attribute format (WebGPU canonical strings; exact list not published) | Used in `VertexAttribute.format` (see [gpu-buffers.md](./gpu-buffers.md)) |

## Related

- [gpu-core.md](./gpu-core.md)
- [gpu-buffers.md](./gpu-buffers.md)
- [gpu-textures.md](./gpu-textures.md)
