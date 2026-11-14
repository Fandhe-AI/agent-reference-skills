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

- Source: https://threejs.org/docs/pages/ViewportDepthNode.html (three.js r187, `src/nodes/display/ViewportDepthNode.js`; JSDoc from tag r187 / commit 7e89746)
- `projectionDepth( depth, near, far )` (TSL function, new in r187): returns the depth value as produced by the camera's projection matrix; with `logarithmicDepthBuffer` it converts the stored logarithmic depth back to perspective depth, otherwise it returns `depth` unchanged. It is named `projectionDepth()` (not `getProjectionDepth()`) (https://github.com/mrdoob/three.js/pull/35230).
- In r187 the `DEPTH` and `LINEAR_DEPTH` scopes treat every camera that is not an `OrthographicCamera` as perspective (previously `isPerspectiveCamera` was tested), and the logarithmic depth conversion uses `EPSILON` as its minimum near value.

## Related

- [ViewportDepthTextureNode](./ViewportDepthTextureNode.md)
- [PassNode](./PassNode.md)
