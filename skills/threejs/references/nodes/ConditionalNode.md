# ConditionalNode

Represents a logical if/else statement; an alternative to the `If()`/`Else()` TSL syntax, invoked in chaining style via `select()`.

## Signature / Usage

```js
velocity = position.greaterThanEqual( limit ).select( velocity.negate(), velocity );
```

```js
class ConditionalNode extends Node {
	constructor( condNode, ifNode, elseNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `condNode` | `Node` | — | The condition node |
| `ifNode` | `Node` | — | Evaluated when the condition is `true` |
| `elseNode` | `Node` | `null` | Evaluated when the condition is `false` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateNodeType(builder)` | `string` | Infers the node type from the if/else nodes (overrides `Node#generateNodeType`) |

## Related

- [MathNode](./MathNode.md)
- [LoopNode](./LoopNode.md)
