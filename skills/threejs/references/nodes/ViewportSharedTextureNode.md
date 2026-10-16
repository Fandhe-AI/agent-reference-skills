# ViewportSharedTextureNode

`ViewportTextureNode` creates an internal texture per node instance. This node shares one texture across all `ViewportSharedTextureNode` instances and should be the first choice when using default/screen framebuffer data, for performance reasons.

## Signature / Usage

```js
class ViewportSharedTextureNode extends ViewportTextureNode {
	constructor( uvNode = screenUV, levelNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `uvNode` | `Node` | `screenUV` | The uv node |
| `levelNode` | `Node` | `null` | The level node |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getTextureForReference()` | `FramebufferTexture` | Overridden to always return the unique shared framebuffer texture |

## Notes

- Source: https://threejs.org/docs/pages/ViewportSharedTextureNode.html (three.js r186, `src/nodes/display/ViewportSharedTextureNode.js`)

## Related

- [ViewportTextureNode](./ViewportTextureNode.md)
