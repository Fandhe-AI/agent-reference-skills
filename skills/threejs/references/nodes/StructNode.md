# StructNode

Creates custom structures with multiple members. Can also be used to define structures in attribute and uniform data.

## Signature / Usage

```js
// Define a custom struct
const BoundingBox = struct( { min: 'vec3', max: 'vec3' } );

// Create a new instance of the struct
const bb = BoundingBox( vec3( 0 ), vec3( 1 ) ); // style 1
// const bb = BoundingBox( { min: vec3( 0 ), max: vec3( 1 ) } ); // style 2 (alternative)

// Access the struct members
const min = bb.get( 'min' );

// Assign a new value to a member
min.assign( vec3() );
```

```js
class StructNode extends Node {
	constructor() {}
}
```

## Notes

- The r186 docs page documents only the constructor (no listed properties or methods).
- The r186 docs example lists both creation styles in the same scope (two `const bb` declarations); here the style 2 line is commented out as an alternative so the snippet is valid JavaScript.
- Source: https://threejs.org/docs/pages/StructNode.html (three.js r186, `src/nodes/core/StructNode.js`)

## Related

- [Node](./Node.md)
- [TSL](./TSL.md)
