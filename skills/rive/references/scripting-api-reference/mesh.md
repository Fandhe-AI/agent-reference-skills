# MeshInstances / VertexBuffer / TriangleBuffer

Buffers used with image meshes. `VertexBuffer` stores 2D vertex positions, `TriangleBuffer` stores triangle indices, and `MeshInstances` holds per-instance data for `Renderer:drawImageMeshInstanced`.

## Signature / Usage

```lua
local vb = VertexBuffer()
vb:add(Vector.xy(0, 0), Vector.xy(1, 0), Vector.xy(1, 1))

local tb = TriangleBuffer()
tb:add(1, 2, 3)

local mi = MeshInstances(2)
mi:set(0, Mat2D.withTranslation(Vector.xy(10, 20)))
mi:set(1, Mat2D.identity(), 0.5, 0, Vector.xy(0, 0), Vector.xy(0.5, 0.5))
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `VertexBuffer:add` | `add(...Vector) -> ()` | Adds one or more vertices to the buffer |
| `VertexBuffer:reset` | `reset() -> ()` | Clears all vertices from the buffer |
| `TriangleBuffer:add` | `add(v1: number, v2: number, v3: number) -> ()` | Adds a triangle defined by three vertex indices |
| `TriangleBuffer:reset` | `reset() -> ()` | Clears all triangle indices from the buffer |
| `MeshInstances:resize` | `resize(count: number) -> ()` | Sets the number of instances |
| `MeshInstances:set` | `set(index: number, transform: Mat2D, opacity: number?, additiveness: number?, uvTranslate: Vector?, uvScale: Vector?) -> ()` | Writes the instance at `index` (zero based). Everything past `transform` is optional |

## Notes

- Unlike the mesh buffers, `MeshInstances` is meant to be rewritten every frame.
- `MeshInstances:set` indices are zero based; the source `TriangleBuffer:add` example uses 1, 2, 3 as vertex indices.

## Related

- [renderer.md](./renderer.md)
- [image.md](./image.md)
- [mat2d.md](./mat2d.md)
- [vector.md](./vector.md)

Source: https://rive.app/docs/scripting/api-reference/mesh/mesh-instances, https://rive.app/docs/scripting/api-reference/mesh/vertex-buffer, https://rive.app/docs/scripting/api-reference/mesh/triangle-buffer (fetched 2026-10)
