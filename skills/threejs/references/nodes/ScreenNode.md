# ScreenNode

Provides a collection of screen related metrics. Depending on `scope`, the node represents resolution or viewport data as well as fragment or uv coordinates.

## Signature / Usage

```js
class ScreenNode extends Node {
	constructor( scope ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scope` | `'coordinate' \| 'viewport' \| 'size' \| 'uv'` | Selects the metric the node represents |
| `isViewportNode` | `boolean` (readonly) | Type-testing flag, `true` |

Scopes:

- `ScreenNode.COORDINATE`: window-relative coordinates of the current fragment according to WebGPU standards.
- `ScreenNode.VIEWPORT`: the current viewport as a four-dimensional vector.
- `ScreenNode.SIZE`: the dimensions of the current bound framebuffer.
- `ScreenNode.UV`: normalized coordinates.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateNodeType()` | `'vec2' \| 'vec4'` | Overridden since the node type depends on the scope |
| `update(frame)` | `void` | Retrieves viewport and size information from the current renderer |

## Notes

- Source: https://threejs.org/docs/pages/ScreenNode.html (three.js r186, `src/nodes/display/ScreenNode.js`)

## Related

- [ViewportTextureNode](./ViewportTextureNode.md)
