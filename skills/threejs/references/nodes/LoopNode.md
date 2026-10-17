# LoopNode

Implements loops in TSL, with multiple parameterization forms (count, start/end/type/condition, nested, boolean while-like condition).

## Signature / Usage

```js
import { Loop } from 'three/tsl';

Loop( count, ( { i } ) => {
	// loop body
} );
```

```js
class LoopNode extends Node {
	constructor( params ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `params` | `Array<LoopNode~Params \| loopBodyCallback>` | Loop parameterization values, depending on the loop form used |

### Type Definitions

`LoopNode~Params`: the parameters of a loop. A number or int/uint node defines the loop's end value, a bool node defines a `while` loop, and an object (`LoopNode~ObjectParams`) allows a more detailed configuration.

`LoopNode~ObjectParams`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `start` | `number \| Node<int> \| Node<uint>` | `0` | Initial value of the loop variable |
| `end` | `number \| Node<int> \| Node<uint>` | — | Value the loop variable is compared against. If omitted, the loop counts down from `start - 1` to `0` |
| `name` | `string` | — | Name of the loop variable. Defaults to `i`, `j`, `k` and so on |
| `type` | `string` | `'int'` | Data type of the loop variable |
| `condition` | `'<' \| '<=' \| '>' \| '>='` | — | Comparison operator; the loop runs as long as it is true. Inferred from `start` and `end` if not set |
| `update` | `string \| number \| function \| Node` | — | How the loop variable is updated after each iteration. Inferred from `condition` and `type` if not set |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getProperties(builder)` | `Object` | Returns node properties |
| `getVarName(index)` | `string` | Loop variable name for an index (`0`→`i`, `1`→`j`, `2`→`k`, ...) |

## Usage

```js
// start/end/type/condition
Loop( { start: int( 0 ), end: int( 10 ), type: 'int', condition: '<' }, ( { i } ) => {} );

// nested loops (compact form)
Loop( 10, 5, ( { i, j } ) => {} );

// boolean condition (while-like)
const value = float( 0 ).toVar();
Loop( value.lessThan( 10 ), () => {
	value.addAssign( 1 );
} );
```

## Notes

- `Break()` and `Continue()` TSL expressions control loop flow.

## Related

- [ConditionalNode](./ConditionalNode.md)
