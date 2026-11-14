# OperatorNode

Represents basic mathematical and logical operations (addition, subtraction, comparisons, etc.). Extends `Node`.

## Signature / Usage

```js
import { add, mul } from 'three/tsl';

const result = add( a, mul( b, c ) );
```

```js
class OperatorNode extends Node {
	constructor( op, aNode, bNode, ...params ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `op` | `string` | The operator |
| `aNode` | `Node` | First input |
| `bNode` | `Node` | Second input |
| `isOperatorNode` | `boolean` (readonly) | Type-testing flag, `true` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateNodeType(builder, output)` | `string` | Infers the node type from the operator and input types |
| `getOperatorMethod(builder, output)` | `string` | Returns the operator method name |

## Notes

- Source: https://threejs.org/docs/pages/OperatorNode.html (three.js r187, `src/nodes/math/OperatorNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): extends `Node` instead of `TempNode`; `TempNode` is deprecated in r187 ("Extend Node instead").
- Migration (r186 → r187): in TSL, operands and parameters of operators are implicitly coerced to broader common types now; weak (implicit number) constants adopt the type of the explicit operands (https://github.com/mrdoob/three.js/pull/33695).

## Related

- [MathNode](./MathNode.md)
- [ConditionalNode](./ConditionalNode.md)
