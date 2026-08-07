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
| `params` | `Array<any>` | Loop parameterization values, depending on the loop form used |

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
