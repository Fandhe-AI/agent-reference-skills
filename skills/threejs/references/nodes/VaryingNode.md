# VaryingNode

Represents a shader varying: data passed from the vertex shader to the fragment shader, created from an existing node.

## Signature / Usage

```js
const positionLocal = positionGeometry.toVarying( 'vPositionLocal' );
```

```js
class VaryingNode extends Node {
	constructor( node, name = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `node` | `Node` | — | The node from which the varying is created |
| `name` | `string` | `null` | Varying name in the shader; auto-generated if omitted |
| `interpolationType` | `string` | `null` | Interpolation type of the varying data |
| `interpolationSampling` | `string` | `null` | Interpolation sampling type |
| `global` | `boolean` | `true` | Overrides `Node#global` |
| `isVaryingNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `setInterpolation(type, sampling = null)` | `VaryingNode` | Sets the interpolation type/sampling |
| `setupVarying(builder)` | `NodeVarying` | Performs setup with the current `NodeBuilder` |

## Related

- [AttributeNode](./AttributeNode.md)
- [Node](./Node.md)
