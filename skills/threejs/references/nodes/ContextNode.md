# ContextNode

A context management component for another node. `NodeBuilder` builds nodes in a specific context and this node allows modifying that context. A typical use case is overriding `getUV()`.

## Signature / Usage

```js
node.context( { getUV: () => customCoord } );
// or
material.contextNode = context( { getUV: () => customCoord } );
// or
renderer.contextNode = context( { getUV: () => customCoord } );
// or
scenePass.contextNode = context( { getUV: () => customCoord } );
```

```js
class ContextNode extends Node {
	constructor( node = null, value = {} ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `node` | `Node` | `null` | The node whose context should be modified |
| `value` | `Object` | `{}` | The modified context data |
| `isContextNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateNodeType(builder)` | `string` | Returns the type of `ContextNode#node` |
| `getFlowContextData()` | `Object` | Gathers the context data from all parent context nodes |
| `getMemberType(builder, name)` | `string` | Returns the member type of `ContextNode#node` |
| `getScope()` | `Node` | Returns the reference to `ContextNode#node` |

## Notes

- Source: https://threejs.org/docs/pages/ContextNode.html (three.js r186, `src/nodes/core/ContextNode.js`)

## Related

- [PassNode](./PassNode.md)
- [NodeBuilder](./NodeBuilder.md)
