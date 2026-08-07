# PostProcessing

A post-processing management module for three.js. Wraps a renderer and an `outputNode` to apply node-based post-processing passes.

## Signature / Usage

```js
new PostProcessing(renderer, outputNode)
```

## Constructor Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `renderer` | Renderer | — | A reference to the renderer. |
| `outputNode` | Node<vec4> | — | Optional output node defining the final composited result. |

## Notes

- Deprecated since r183; replaced by `RenderPipeline`. `PostProcessing` now serves only as a backward-compatibility wrapper and will be removed in a future version.
- Prefer `RenderPipeline` for new node-based post-processing pipelines.

## Related

- [Renderer](./Renderer.md)
