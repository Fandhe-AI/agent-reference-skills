# Renderer

Draws paths and images, manages clipping, and applies transforms during a Node/Layout script's `draw(self, renderer)` call.

## Signature / Usage

```lua
function draw(self: MyNode, renderer: Renderer)
  renderer:save()
  renderer:transform(Mat2D.withTranslation(self.x, self.y))
  renderer:drawPath(self.path, self.paint)
  renderer:restore()
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `drawPath(path: Path, paint: Paint)` | Draws a `Path` with the given `Paint` |
| `drawImage(image: Image, sampler: ImageSampler, blendMode: BlendMode, opacity: number)` | Draws an `Image` with sampling, blending, opacity |
| `drawImageMesh(image, sampler, vertices, uvs, triangles, blendMode, opacity)` | Draws an image using mesh vertex/UV/triangle buffers |
| `drawImageMeshInstanced(image, sampler, vertices: VertexBuffer, uvs: VertexBuffer, triangles: TriangleBuffer, instances: MeshInstances)` | Draws one mesh once per entry of a `MeshInstances`, in a single call. Blend mode is always `srcOver`; opacity and the UV transform come from each instance |
| `modulateOpacity(opacity: number)` | Multiplies the opacity of subsequent draw calls by `opacity` (0..1); stacks multiplicatively and is captured by `save()` / `restore()` |
| `modulateColor(color: Color)` | Multiplies `color` into subsequent draw calls, channel by channel; stacks and is captured by `save()` / `restore()` like `modulateOpacity` |
| `setColorModulation(color: Color)` | Sets the modulation color outright rather than multiplying, so an inner scope can undo an outer one (e.g. draw an artboard under black, then set the color for drawables that keep their paint). Captured by `save()` / `restore()`; inside a draw visitor it ends with the visit |
| `clipPath(path: Path)` | Restricts subsequent drawing to the path's area until the next `restore()` |
| `save()` | Preserves the current rendering state (transform + clip) |
| `restore()` | Reapplies the most recently saved state |
| `transform(transform: Mat2D)` | Applies a transform cumulatively until restored |

## Notes

- Usually called only within a `draw()` lifecycle function; use `save()`/`restore()` pairs to nest transforms and clip regions.

## Related

- [path.md](./path.md)
- [paint.md](./paint.md)
- [image.md](./image.md)
- [protocol-node-scripts.md](./protocol-node-scripts.md)
