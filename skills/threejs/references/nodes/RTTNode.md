# RTTNode

Takes another node and uses it with a `QuadMesh` to render into a texture (RTT). Relevant in post processing where certain nodes require texture input. The helper function `convertToTexture()`, based on this module, lets the node system ensure texture input automatically.

## Signature / Usage

```js
class RTTNode extends TextureNode {
	constructor( node, width = null, height = null, options = {} ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `node` | `Node` | — | The node to render a texture with |
| `width` | `number` | `null` | Width of the internal render target; if not applied, it is resized automatically |
| `height` | `number` | `null` | Height of the internal render target |
| `options.type` | `number` | `HalfFloatType` | The texture type |
| `options.autoUpdate` | `boolean` | `true` | Whether the texture updates automatically |
| `options.resolutionScale` | `number` | `1` | The resolution scale |
| `autoResize` | `boolean` (readonly) | `true` | Whether the render target is resized automatically |
| `autoUpdate` | `boolean` | `true` | Whether the texture updates automatically |
| `textureNeedsUpdate` | `boolean` | `true` | Whether the texture requires an update |
| `renderTarget` | `RenderTarget` | — | The render target |
| `value` | `Texture` | — | Texture of the internal render target (overrides `TextureNode#value`) |
| `isRTTNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `updateBeforeType` | `string` | `'frame'` | `NodeUpdateType.FRAME`; the texture is updated once per frame in `updateBefore` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `dispose()` | `void` | Frees internal resources |
| `getResolutionScale()` | `number` | Gets the resolution scale |
| `setResolutionScale(resolutionScale)` | `RTTNode` | Sets the factor multiplied with the renderer's width and height |
| `setSize(width, height)` | `void` | Sets the size of the internal render target |
| `updateBefore(frame)` | `void` | Renders the node's output into the render target; resizes when `autoResize` is on and skips rendering if neither `textureNeedsUpdate` nor `autoUpdate` is true |

## Notes

- Source: https://threejs.org/docs/pages/RTTNode.html (three.js r186, `src/nodes/utils/RTTNode.js`)
- The docs list `width` / `height` as properties with default `null`.

## Related

- [TextureNode](./TextureNode.md)
- [PassNode](./PassNode.md)
