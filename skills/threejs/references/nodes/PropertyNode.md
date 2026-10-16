# PropertyNode

Represents a shader property. Used to explicitly define a property and assign a value to it. The engine uses `PropertyNode` to predefine common material properties for TSL code.

## Signature / Usage

```js
const threshold = property( 'float', 'threshold' ).assign( THRESHOLD );
```

```js
class PropertyNode extends Node {
	constructor( nodeType, name = null, varying = false, placeholderNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `nodeType` | `string` | — | The type of the node |
| `name` | `string` | `null` | Property name in the shader; auto-generated if not defined |
| `varying` | `boolean` | `false` | Whether this property is a varying |
| `placeholderNode` | `Node` | `null` | Placeholder node if not assigned |
| `global` | `boolean` | `true` | Flag used for global cache (overrides `Node#global`) |
| `isPropertyNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Notes

- Source: https://threejs.org/docs/pages/PropertyNode.html (three.js r186, `src/nodes/core/PropertyNode.js`)

## Related

- [VarNode](./VarNode.md)
- [VaryingNode](./VaryingNode.md)
