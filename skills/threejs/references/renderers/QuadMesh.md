# QuadMesh

A helper for passes which need to render a full screen effect, which is common in post processing. Intended usage: reuse a single quad mesh for subsequent passes by reassigning the `material` reference.

## Signature / Usage

```js
new QuadMesh( material: NodeMaterial )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| material | NodeMaterial | Constructor parameter. The material to render the quad mesh with. |
| camera | OrthographicCamera (readonly) | The camera to render the quad mesh with. |
| isQuadMesh | boolean (readonly) | Type-test flag. Default `true`. |

## Methods

| Name | Description |
|------|-------------|
| `.render( renderer: Renderer )` | Renders the quad mesh. |
| `.renderAsync( renderer: Renderer ) : Promise` | (async, deprecated) Async version of `render()`. Resolves when the render has been finished. |

## Notes

- Can only be used with `WebGPURenderer`.
- `renderAsync()` is marked deprecated in r186.
- Inherits from `EventDispatcher` -> `Object3D` -> `Mesh`.
- Source: `src/renderers/common/QuadMesh.js` (three.js r186).

## Related

- [RenderPipeline](./RenderPipeline.md)
- [WebGPURenderer](./WebGPURenderer.md)
