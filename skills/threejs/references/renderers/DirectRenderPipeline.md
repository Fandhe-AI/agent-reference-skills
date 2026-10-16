# DirectRenderPipeline

An alternative render pipeline (extends `RenderPipeline`) that applies output processing directly in material shaders. This avoids the intermediate framebuffer and output pass used by `Renderer`, but changes blending and is not compatible with materials that sample the framebuffer, such as transmissive materials.

## Signature / Usage

```js
const renderPipeline = new DirectRenderPipeline( renderer );
renderPipeline.render( scene, camera );
```

```js
new DirectRenderPipeline( renderer: Renderer, outputNode: Node<vec4> )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| renderer | Renderer | A reference to the renderer (constructor parameter). |
| outputNode | Node<vec4> | Optional output node (constructor parameter). |
| isDirectRenderPipeline | boolean (readonly) | Type-test flag. Default `true`. |

## Methods

| Name | Description |
|------|-------------|
| `.render( scene: Object3D, camera: Camera )` | Renders the scene with output processing applied directly in material shaders. Overrides `RenderPipeline#render`. |

## Notes

- This module can only be used with `WebGPURenderer`.
- Inherits from `RenderPipeline`.
- Source: https://threejs.org/docs/pages/DirectRenderPipeline.html (three.js r186, `src/renderers/common/DirectRenderPipeline.js`)

## Related

- [RenderPipeline](./RenderPipeline.md)
- [Renderer](./Renderer.md)
- [WebGPURenderer](./WebGPURenderer.md)
