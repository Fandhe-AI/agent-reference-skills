# GPU Textures: GPUTexture / GPUSampler / Formats

Texture resource, sampler, and pixel-format types for the scripting GPU surface.

## Signature / Usage

```lua
local tex = GPUTexture.new({ width = 512, height = 512, format = 'rgba8unorm' })
local view = tex:view()

local sampler = GPUSampler.new({ min = 'linear', mag = 'linear', wrapU = 'clamp', wrapV = 'clamp' })
```

## Options / Props

| Type | Members | Description |
| --- | --- | --- |
| `GPUTexture` | `width`, `height`, `format`; `GPUTexture.new(desc)` (dimensions, format, type, render-target capability, mipmaps, layers, sample count, label); `view(desc?) -> GPUTextureView` (sub-range view; prefer creating once at init); `upload(desc)` (transfer pixel data to a mip/layer) | 2D/cube/3D/array GPU texture |
| `GPUSampler` | `GPUSampler.new({ min?, mag?, mipmap?: Filter, wrapU?, wrapV?: WrapMode, compare?: CompareFunction, maxAnisotropy?: number })` | Describes how a texture is sampled in a shader; all fields optional |
| `Filter` (enum) | texture filtering mode (values not published on the docs page; used for `min`/`mag`/`mipmap`) | |
| `WrapMode` (enum) | texture address/wrap mode outside `[0,1]`, e.g. clamp / repeat / mirror-style semantics (exact value strings not published) | Used for `wrapU`/`wrapV` |
| `TextureAspect` (enum) | which plane(s) of a depth/stencil texture a view exposes; use `'depth-only'` for depth textures sampled as `texture_depth_2d` in WGSL | |
| `TextureFormat` | Any pixel format; use `ColorFormat` or `DepthFormat` for a more specific context | |
| `ColorFormat` (enum) | Color pixel formats for render targets/sampling (WebGPU canonical strings; exact list not published on the docs page) | |
| `DepthFormat` (enum) | Depth and depth/stencil buffer formats (exact list not published) | |
| `CompressedFormat` (enum) | Block-compressed texture formats; availability is GPU-dependent — check `context:features()` (see [GPUFeatures](./gpu-core.md)) before use | |

## Notes

- `GPUTextureView` is defined in the shared `rive/gpu_types` builtin module so `Image` and the GPU render APIs share consistent nominal typing; see [gpu-buffers.md](./gpu-buffers.md) for its fields.

## Related

- [gpu-core.md](./gpu-core.md)
- [gpu-bindings.md](./gpu-bindings.md)
- [image.md](./image.md)
