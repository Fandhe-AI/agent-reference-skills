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
| `getFlowContextData()` | `Object` | Gathers the context data from all parent context nodes; the data and the node overrides of nested contexts are merged with `mergeContext()` |
| `getMemberType(builder, name)` | `string` | Returns the member type of `ContextNode#node` |
| `getScope()` | `Node` | Returns the reference to `ContextNode#node` |

## Notes

- Source: https://threejs.org/docs/pages/ContextNode.html (three.js r187, `src/nodes/core/ContextNode.js`; JSDoc from tag r187 / commit 7e89746)
- `mergeContext( target, source )` (`NodeUtils`, new in r187) merges two node build contexts into a new one: the data of `source` takes precedence, and the `overrideNodes` maps of both contexts are merged, so the overrides of `target` still apply unless `source` overrides the same node (https://github.com/mrdoob/three.js/pull/35108).
- `overrideNodes( overrides, flowNode, shaderStage )` (`OverrideContextNode`, r187) accepts an optional `shaderStage` (default `null`: all stages); the overrides then apply only in that stage, and with `'fragment'` all varyings of the context are evaluated in the fragment stage, e.g. if the surface is reconstructed per fragment (https://github.com/mrdoob/three.js/pull/35109). `OverrideContextNode` no longer overrides `getFlowContextData()`.

## Related

- [PassNode](./PassNode.md)
- [NodeBuilder](./NodeBuilder.md)
