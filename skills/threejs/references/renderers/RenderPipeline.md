# RenderPipeline

Manages the rendering pipeline setup in apps. Usually a single instance is created and used to define the output of the render pipeline and the post-processing effect chain.

## Signature / Usage

```js
const renderPipeline = new RenderPipeline( renderer );
const scenePass = pass( scene, camera );
renderPipeline.outputNode = scenePass;
```

```js
new RenderPipeline( renderer: Renderer, outputNode: Node<vec4> )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| renderer | Renderer | A reference to the renderer (constructor parameter; also a property). |
| outputNode | Node<vec4> | Optional output node (constructor parameter). As a property: defines the final output of the pipeline, usually the last node in a chain of effect nodes. |
| isRenderPipeline | boolean (readonly) | Type-test flag. Default `true`. |
| needsUpdate | Node<vec4> | Must be set to `true` when the output node changes. |
| outputColorTransform | boolean | Whether the default output tone mapping and color space transformation is enabled. Enabled by default. |

## Methods

| Name | Description |
|------|-------------|
| `.dispose()` | Frees internal resources. |
| `.render()` | Must be used inside the animation loop instead of the renderer's `render()` when a RenderPipeline is applied. |
| `.renderAsync()` : Promise | (async, deprecated) Async version of `render()`. Resolves when the render has been finished. |

## Notes

- This module can only be used with `WebGPURenderer`.
- `outputColorTransform` must be disabled for effects that expect to run after tone mapping and color space conversion (typical example: FXAA, which requires sRGB input). When `false`, the app must control the output transformation with `RenderOutputNode`:

```js
const outputPass = renderOutput( scenePass );
```

- `renderAsync()` is marked deprecated in r186.
- `PostProcessing` (see PostProcessing.md) is deprecated since r183 in favor of this class.
- Source: `src/renderers/common/RenderPipeline.js` (three.js r186).

## Related

- [DirectRenderPipeline](./DirectRenderPipeline.md)
- [PostProcessing](./PostProcessing.md)
- [Renderer](./Renderer.md)
- [WebGPURenderer](./WebGPURenderer.md)
