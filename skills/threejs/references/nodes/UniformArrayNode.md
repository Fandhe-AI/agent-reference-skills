# UniformArrayNode

Represents array-like data as uniform buffers, like `BufferNode`, but handles more common data types (e.g. three.js primitives) and automatically manages buffer padding. It should be the first choice when working with uniform buffers.

## Signature / Usage

```js
const tintColors = uniformArray( [
	new Color( 1, 0, 0 ),
	new Color( 0, 1, 0 ),
	new Color( 0, 0, 1 )
], 'color' );
const redColor = tintColors.element( 0 );
```

```js
class UniformArrayNode extends BufferNode {
	constructor( value, elementType = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Array<any>` | — | Array holding the buffer data; may hold numbers as well as vectors, matrices or colors |
| `elementType` | `string` | `null` | Data type of an array element |
| `array` | `Array<any>` | — | The array holding the buffer data |
| `paddedType` | `string` | — | Padded type computed to satisfy the uniform buffer layout |
| `isArrayBufferNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `updateType` | `string` | `'render'` | Updated per render |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `element(indexNode)` | `UniformArrayElementNode` | Element access based on `UniformArrayNode` |
| `generateNodeType(builder)` | `string` | Node type inferred from `paddedType` |
| `getElementType(builder)` | `string` | Data type of the array elements |
| `getPaddedType()` | `string` | Padded type based on the element type |
| `onUpdate(callback, updateType)` | `UniformArrayNode` | Composes a user-defined update with the buffer transfer |
| `setup(builder)` | `null` | Creates the value buffer from the array data |
| `updateBuffer()` | `void` | Transfers data from the (complex) objects in the array to the padded value buffer |

## Notes

- Source: https://threejs.org/docs/pages/UniformArrayNode.html (three.js r186, `src/nodes/accessors/UniformArrayNode.js`)
- Inheritance: ... > UniformNode > BufferNode > UniformArrayNode.

## Related

- [UniformNode](./UniformNode.md)
- [StorageBufferNode](./StorageBufferNode.md)
