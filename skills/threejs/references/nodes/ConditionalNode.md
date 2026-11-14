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

## Notes

- Source: https://threejs.org/docs/pages/ConditionalNode.html (three.js r187, `src/nodes/math/ConditionalNode.js`; JSDoc from tag r187 / commit 7e89746)
- When the condition is a vector (e.g. the `bvec3` of `value.greaterThan( vec3( 1.0 ) )`), `select()` resolves per component: each output lane picks independently from its own condition component, like WGSL `select()` / GLSL `mix( x, y, bvecN )`. The condition and values are converted to the largest vector width and scalar values are broadcast (https://github.com/mrdoob/three.js/pull/34425).

## Related

- [MathNode](./MathNode.md)
- [LoopNode](./LoopNode.md)
