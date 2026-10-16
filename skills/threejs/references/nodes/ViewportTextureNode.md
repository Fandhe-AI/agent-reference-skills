# ViewportTextureNode

A special texture node representing the current viewport data as a texture. It extracts data from the currently bound framebuffer with a copy operation, so no extra render pass is needed. Usable as input for effects such as refractive or transmissive materials.

## Signature / Usage

```js
class ViewportTextureNode extends TextureNode {
	constructor( uvNode = screenUV, levelNode = null, framebufferTexture = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `uvNode` | `Node` | `screenUV` | The uv node |
| `levelNode` | `Node` | `null` | The level node |
| `framebufferTexture` | `Texture` | `null` | Framebuffer texture holding the viewport data; created automatically if not provided |
| `defaultFramebuffer` | `FramebufferTexture` | `null` | Reference framebuffer texture for the current render target; a new one is created if the render target changes |
| `generateMipmaps` | `boolean` | `false` | Whether to generate mipmaps |
| `isOutputTextureNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `updateBeforeType` | `string` | `'render'` | `NodeUpdateType.RENDER`; extracts the framebuffer contents on each render call |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getTextureForReference(reference = null)` | `Texture` | Texture for the given `RenderTarget` or `CanvasTarget`; unique framebuffer textures are used per render context to avoid rendering errors |

## Notes

- Source: `src/nodes/display/ViewportTextureNode.js` (three.js r186 docs).
- Inheritance: EventDispatcher > Node > InputNode > UniformNode > TextureNode > ViewportTextureNode.

## Related

- [ViewportSharedTextureNode](./ViewportSharedTextureNode.md)
- [ViewportDepthTextureNode](./ViewportDepthTextureNode.md)
- [TextureNode](./TextureNode.md)
