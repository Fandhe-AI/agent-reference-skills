# PassNode

Represents a render pass (sometimes called beauty pass) in context of post processing. This pass produces a render for the given scene and camera and can provide multiple outputs via MRT for further processing.

## Signature / Usage

```js
const postProcessing = new RenderPipeline( renderer );
const scenePass = pass( scene, camera );
postProcessing.outputNode = scenePass;
```

```js
class PassNode extends TempNode {
	constructor( scope, scene, camera, options ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scope` | `'color' \| 'depth'` | — | Whether the node outputs color or depth |
| `scene` | `Scene` | — | A reference to the scene |
| `camera` | `Camera` | — | A reference to the camera |
| `options` | `Object` | — | Options for the internal render target |
| `autoClear` | `boolean` | `true` | Whether the renderer should automatically clear before rendering the pass |
| `autoClearColor` | `boolean` | `true` | Whether the color buffer should be cleared |
| `autoClearDepth` | `boolean` | `true` | Whether the depth buffer should be cleared |
| `autoClearStencil` | `boolean` | `true` | Whether the stencil buffer should be cleared |
| `contextNode` | `ContextNode \| null` | — | An optional global context for the pass |
| `global` | `boolean` | `true` | Flag used for global cache (overrides `TempNode#global`) |
| `isPassNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `opaque` | `boolean` | `true` | Whether the pass is opaque |
| `transparent` | `boolean` | `false` | Whether the pass is transparent |
| `overrideMaterial` | `Material \| null` | — | An optional override material for the pass |
| `renderTarget` | `RenderTarget` | — | The pass's render target |
| `updateBeforeType` | `string` | `'frame'` | `NodeUpdateType.FRAME`; the scene is rendered once per frame in `updateBefore` |
| `PassNode.COLOR` / `PassNode.DEPTH` | `'color'` / `'depth'` | — | Static scope constants |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `compileAsync(renderer)` | `Promise` | Precompiles the pass; call after configuration (`setMRT()`, `getTextureNode()`) is complete |
| `dispose()` | `void` | Frees internal resources |
| `getLayers()` | `Layers` | Gets the current layer configuration |
| `setLayers(layers)` | `PassNode` | Sets the layers used when rendering the pass |
| `getLinearDepthNode(name = 'depth')` | `Node` | Linear depth node of this pass |
| `getViewZNode(name = 'depth')` | `Node` | viewZ node of this pass |
| `getMRT()` | `MRTNode` | Returns the current MRT node |
| `setMRT(mrt)` | `PassNode` | Sets the MRT node for this pass |
| `getTexture(name)` | `Texture` | Texture for the given output name |
| `getTextureNode(name = 'output')` | `TextureNode` | Texture node for the given output name |
| `getPreviousTexture(name)` | `Texture` | Texture holding the previous frame's data for the output name |
| `getPreviousTextureNode(name = 'output')` | `TextureNode` | Previous texture node for the output name |
| `toggleTexture(name)` | `void` | Switches current and previous textures for the output name |
| `getResolutionScale()` | `number` | Current resolution scale (`1` = full resolution) |
| `setResolutionScale(resolutionScale)` | `PassNode` | Sets the factor multiplied with the renderer's width and height |
| `getResolution()` | `number` | Deprecated since r181; use `getResolutionScale()` |
| `setResolution(resolution)` | `PassNode` | Deprecated since r181; use `setResolutionScale()` |
| `setScissor(x, y, width, height)` | `void` | Defines the scissor rectangle; call with `null` to return to auto-sizing |
| `setViewport(x, y, width, height)` | `void` | Defines the viewport; call with `null` to return to auto-sizing |
| `setSize(width, height)` | `void` | Sets the render target size, honoring the pixel ratio |

## Notes

- Source: https://threejs.org/docs/pages/PassNode.html (three.js r186, `src/nodes/display/PassNode.js`)
- Inheritance: EventDispatcher > Node > TempNode > PassNode.
- `getResolution()` / `setResolution()` are deprecated since r181.

## Related

- [MRTNode](./MRTNode.md)
- [ContextNode](./ContextNode.md)
- [TextureNode](./TextureNode.md)
