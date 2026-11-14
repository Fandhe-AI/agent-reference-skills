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
| `getContextAttribute(builder)` | `Node` | Returns the node that provides the value of this attribute in the current context, if any (`null` otherwise) |
| `getShared(builder)` | `Node` | An attribute provided by the context is replaced by the provided node, like an override; otherwise the shared node, or `this` |

## Notes

- Source: https://threejs.org/docs/pages/AttributeNode.html (three.js r187, `src/nodes/core/AttributeNode.js`; JSDoc from tag r187 / commit 7e89746)
- The build context can provide attributes with a `getAttribute( name, builder )` function, e.g. if vertices are pulled from a storage buffer or the surface is reconstructed per fragment; it should return the same node for the same attribute. See [ReferenceAttributeNode](./ReferenceAttributeNode.md) for attributes bound per rendered object.

## Related

- [Node](./Node.md)
- [VaryingNode](./VaryingNode.md)
