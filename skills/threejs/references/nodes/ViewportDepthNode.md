# ViewportDepthNode

Offers depth logic features in the fragment shader. Depending on `scope`, it defines a depth value for the current fragment or is used for depth evaluation.

## Signature / Usage

```js
class ViewportDepthNode extends Node {
	constructor( scope, valueNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scope` | `'depth' \| 'depthBase' \| 'linearDepth'` | — | Selects the node's behavior |
| `valueNode` | `Node` | `null` | Custom depth value; ignored in the `ViewportDepthNode.DEPTH` scope |
| `isViewportDepthNode` | `boolean` (readonly) | `true` | Type-testing flag |

Scopes:

- `ViewportDepthNode.DEPTH_BASE`: defines a value for the current fragment's depth.
- `ViewportDepthNode.DEPTH`: the depth value for the current fragment (`valueNode` is ignored).
- `ViewportDepthNode.LINEAR_DEPTH`: the linear (orthographic) depth of the current fragment; with a `valueNode` set it converts perspective depth data to linear data.

## Notes

- Source: https://threejs.org/docs/pages/ViewportDepthNode.html (three.js r186, `src/nodes/display/ViewportDepthNode.js`)

## Related

- [ViewportDepthTextureNode](./ViewportDepthTextureNode.md)
- [PassNode](./PassNode.md)
