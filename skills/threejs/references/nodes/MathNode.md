# MathNode

Represents math methods available in shaders: single-input (`sin`, `cos`, `normalize`), two-input (`dot`, `cross`, `pow`), and three-input (`mix`, `clamp`, `smoothstep`) methods. Extends `Node`.

## Signature / Usage

```js
import { mix, clamp, dot } from 'three/tsl';

const value = clamp( mix( a, b, t ), 0, 1 );
```

```js
class MathNode extends Node {
	constructor( method, aNode, bNode = null, cNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `method` | `string` | — | The method name |
| `aNode` | `Node` | — | First input |
| `bNode` | `Node` | `null` | Second input |
| `cNode` | `Node` | `null` | Third input |
| `isMathNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateNodeType(builder)` | `string` | Determines the node type from method and input types |
| `getInputType(builder)` | `string` | Infers the input type from the input nodes |

## Notes

- Source: https://threejs.org/docs/pages/MathNode.html (three.js r187, `src/nodes/math/MathNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): extends `Node` instead of `TempNode`; `TempNode` is deprecated in r187 ("Extend Node instead").
- Migration (r186 → r187): in TSL, operands and parameters of math functions are implicitly coerced to broader common types now; weak (implicit number) constants adopt the type of the explicit operands (https://github.com/mrdoob/three.js/pull/33695).

## Related

- [OperatorNode](./OperatorNode.md)
- [ConditionalNode](./ConditionalNode.md)
