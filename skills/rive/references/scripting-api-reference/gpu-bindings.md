# GPU Bindings: GPUBindGroup / GPUBindGroupLayout / SamplerEntry / TextureEntry

Resource-binding types that connect buffers, textures, and samplers to a shader's `@group(N)` slots in the scripting GPU surface.

## Signature / Usage

```lua
-- Automatic layout (mirrors WebGPU's layout: 'auto')
local layout = self.pipeline:getBindGroupLayout(0)
local bindGroup = GPUBindGroup.new({
  layout = layout,
  ubos = { { slot = 0, buffer = self.ubo, offset = 0, size = 64 } },
  textures = { { slot = 1, view = self.textureView } },
  samplers = { { slot = 2, sampler = self.sampler } },
})

pass:setBindGroup(0, bindGroup)
```

## Options / Props

| Type | Members | Description |
| --- | --- | --- |
| `GPUBindGroup` | `GPUBindGroup.new(desc: BindGroupDesc)` | Pre-baked resource bindings for reuse across draw calls; holds strong references to bound resources |
| `BindGroupDesc` | `layout`, `ubos: {UBOEntry}`, `textures: {TextureEntry}`, `samplers: {SamplerEntry}` | Descriptor for `GPUBindGroup.new` |
| `GPUBindGroupLayout` | `GPUBindGroupLayout.new(desc: BindGroupLayoutDesc)` | The contract a BindGroup conforms to and a Pipeline references for a `@group(N)` slot; usually obtained automatically via `pipeline:getBindGroupLayout(N)` rather than constructed directly |
| `BindGroupLayoutDesc` | `shader` (required), `groupIndex` (0-3, which `@group(N)`), `dynamicUBOs` (WGSL `@binding` values with `hasDynamicOffset`), `label` | Descriptor for `GPUBindGroupLayout.new`, auto-derived from shader reflection |
| `SamplerEntry` | `slot`, `sampler` | Binds a `GPUSampler` into a `BindGroup` |
| `TextureEntry` | `slot`, `view: GPUTextureView` | Binds a texture view into a `BindGroup` |

## Notes

- Explicit `GPUBindGroupLayout`s can be shared across multiple `GPUPipeline`s (e.g. shared per-frame camera/light data), avoiding per-pipeline BindGroup duplication — pass via `bindGroupLayouts` at pipeline construction.

## Related

- [gpu-core.md](./gpu-core.md)
- [gpu-buffers.md](./gpu-buffers.md)
- [gpu-textures.md](./gpu-textures.md)
