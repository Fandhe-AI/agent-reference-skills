# ViewportDepthTextureNode

Represents the depth of the current viewport as a texture. Can be combined with the viewport texture for effects that require depth evaluation.

## Signature / Usage

```js
class ViewportDepthTextureNode extends ViewportTextureNode {
	constructor( uvNode = screenUV, levelNode = null, depthTexture = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `uvNode` | `Node` | `screenUV` | The uv node |
| `levelNode` | `Node` | `null` | The level node |
| `depthTexture` | `DepthTexture` | `null` | A depth texture; a shared depth texture is used if not provided |

## Notes

- Source: https://threejs.org/docs/pages/ViewportDepthTextureNode.html (three.js r186, `src/nodes/display/ViewportDepthTextureNode.js`)
- Inheritance: EventDispatcher > Node > InputNode > UniformNode > TextureNode > ViewportTextureNode > ViewportDepthTextureNode.

## Related

- [ViewportTextureNode](./ViewportTextureNode.md)
- [ViewportDepthNode](./ViewportDepthNode.md)
