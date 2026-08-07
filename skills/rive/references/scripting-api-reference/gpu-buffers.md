# GPU Buffers: GPUBuffer / VertexAttribute / VertexBufferLayout / UBOEntry

Vertex, index, and uniform buffer types used with [GPUPipeline](./gpu-core.md) and [GPURenderPass](./gpu-core.md) in the scripting GPU surface.

## Signature / Usage

```lua
local vbo = GPUBuffer.new({
  size = 12 * 3,
  usage = 'vertex',
  data = vertexData,
})

pass:setVertexBuffer(0, vbo)

vbo:write(newData, 0)
```

## Options / Props

| Type | Members | Description |
| --- | --- | --- |
| `GPUBuffer` | `size`; `GPUBuffer.new(desc: GPUBufferDesc)`; `write(data: buffer, offset?, srcOffset?, byteLength?)` | GPU buffer for vertex/index/uniform data; `write` copies CPU data in |
| `GPUBufferDesc` | `size`, `usage: BufferUsageArg`, `data?` (required if `immutable`), `immutable?`, `label?` | Descriptor passed to `GPUBuffer.new` |
| `BufferUsage` (enum) | e.g. `'vertex'`, `'index'`, `'uniform'` (exact value set per docs; used with `GPUBuffer.new`) | How the buffer will be used |
| `BufferUsageArg` | a single `BufferUsage`, or an array (reserved for future multi-usage; only one usage supported today) | Usage argument type accepted by `GPUBufferDesc.usage` |
| `VertexAttribute` | `format`, `slot`, `offset` (default 0) | A per-vertex attribute; for interleaved layouts set `offset` explicitly per attribute (e.g. position float3 = 12 bytes, then normal at offset 12) |
| `VertexBufferLayout` | `stride`, `stepMode` (`'vertex'` default or per-instance), `attributes: {VertexAttribute}` | Describes how one vertex buffer feeds the vertex shader |
| `UBOEntry` | `slot`, `buffer`, `offset`, `size` | Binds a uniform buffer into a `BindGroup`; dynamic offsets declared via `BindGroupLayoutEntry.hasDynamicOffset` |
| `GPUTextureView` | `format` | View into a `GPUTexture`/canvas backing store, used as attachment/sampler handle; MSAA view and resolve target formats must match |

## Related

- [gpu-core.md](./gpu-core.md)
- [gpu-bindings.md](./gpu-bindings.md)
- [mat4.md](./mat4.md)
