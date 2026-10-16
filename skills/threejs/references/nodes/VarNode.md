# VarNode

Represents shader variables as nodes. Variables are created from existing nodes.

## Signature / Usage

```js
const depth = sampleDepth( uvNode ).toVar( 'depth' );
```

```js
class VarNode extends Node {
	constructor( node, name = null, readOnly = false ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `node` | `Node` | — | The node for which a variable should be created |
| `name` | `string` | `null` | Variable name in the shader; auto-generated if not defined |
| `readOnly` | `boolean` | `false` | The read-only flag |
| `global` | `boolean` | `true` | Overrides `Node#global` |
| `intent` | `boolean` | `false` | Indicates the node is used for intent |
| `parents` | `boolean` | `true` | Indicates this node requires parents (overrides `Node#parents`) |
| `isVarNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getIntent()` | `boolean` | Returns the intent flag |
| `isIntent(builder)` | `boolean` | Checks if this node is used for intent |
| `setIntent(value)` | `VarNode` | Marks the node as a variable intent: it is not built directly and is useful for assigning variables without creating a new variable node |

## Notes

- Source: `src/nodes/core/VarNode.js` (three.js r186 docs).

## Related

- [PropertyNode](./PropertyNode.md)
- [VaryingNode](./VaryingNode.md)
