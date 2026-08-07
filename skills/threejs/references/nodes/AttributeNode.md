# AttributeNode

Base class for representing shader attributes (per-vertex geometry data) as TSL nodes.

## Signature / Usage

```js
class AttributeNode extends Node {
	constructor( attributeName, nodeType = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `attributeName` | `string` | — | Name of the geometry attribute |
| `nodeType` | `string` | `null` | The node's result type |
| `global` | `boolean` | `true` | Overrides `Node#global`; `AttributeNode` is global by default |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getAttributeName(builder)` | `string` | Returns the attribute name; overridable for computed names |
| `setAttributeName(attributeName)` | `AttributeNode` | Sets the attribute name |

## Related

- [Node](./Node.md)
- [VaryingNode](./VaryingNode.md)
