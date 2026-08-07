# OperatorNode

Represents basic mathematical and logical operations (addition, subtraction, comparisons, etc.). Extends `TempNode`.

## Signature / Usage

```js
import { add, mul } from 'three/tsl';

const result = add( a, mul( b, c ) );
```

```js
class OperatorNode extends TempNode {
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

## Related

- [MathNode](./MathNode.md)
- [ConditionalNode](./ConditionalNode.md)
