# BundleGroup

A specialized group which gives applications access to the Render Bundle API of WebGPU. The group with all its descendant nodes is considered one render bundle and processed as such by the renderer.

## Signature / Usage

```js
new BundleGroup()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| isBundleGroup | boolean (readonly) | Type-test flag. Default `true`. |
| needsUpdate | boolean | Set to `true` when the bundle group has changed. Default `false`. |
| static | boolean | Whether the bundle is static. When `true`, the structure is assumed not to change (e.g. no new objects added). An update can still be forced with `needsUpdate = true`. Default `true`. Overrides `Group#static`. |
| type | string (readonly) | Used for type detection during serialization. Default `'BundleGroup'`. |
| version | number (readonly) | The bundle group's version. Default `0`. |

## Notes

- Only renderable 3D objects are allowed in a bundle group. Lights and other types are not supported and must be added to the scene outside the group.
- Fully supported only by `WebGPURenderer` with a WebGPU backend. With a WebGL backend the group can technically be rendered but without performance improvements.
- Inherits from `EventDispatcher` -> `Object3D` -> `Group`.
- Source: `src/renderers/common/BundleGroup.js` (three.js r186).

## Related

- [WebGPURenderer](./WebGPURenderer.md)
- [Renderer](./Renderer.md)
