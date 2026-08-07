# MathNode

Represents math methods available in shaders: single-input (`sin`, `cos`, `normalize`), two-input (`dot`, `cross`, `pow`), and three-input (`mix`, `clamp`, `smoothstep`) methods. Extends `TempNode`.

## Signature / Usage

```js
import { mix, clamp, dot } from 'three/tsl';

const value = clamp( mix( a, b, t ), 0, 1 );
```

```js
class MathNode extends TempNode {
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

## Related

- [OperatorNode](./OperatorNode.md)
- [ConditionalNode](./ConditionalNode.md)
