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
| `isArrayBufferNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `updateType` | `string` | `'render'` | Updated per render |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `element(indexNode)` | `UniformArrayElementNode` | Element access based on `UniformArrayNode` |
| `generateNodeType(builder)` | `string` | Node type inferred from `getPaddedType( builder )` |
| `getElementType(builder)` | `string` | Data type of the array elements |
| `getPaddedType(builder)` | `string` | Padded type based on the element type (r187: takes the builder; `mat2` is padded to `vec4` with the WebGL backend) |
| `onUpdate(callback, updateType)` | `UniformArrayNode` | Composes a user-defined update with the buffer transfer |
| `setup(builder)` | `null` | Creates the value buffer from the array data |
| `updateBuffer()` | `void` | Transfers data from the (complex) objects in the array to the padded value buffer |

## Notes

- Source: https://threejs.org/docs/pages/UniformArrayNode.html (three.js r187, `src/nodes/accessors/UniformArrayNode.js`; JSDoc from tag r187 / commit 7e89746)
- Inheritance: ... > UniformNode > BufferNode > UniformArrayNode.
- Migration (r186 → r187): the `paddedType` property has been removed. Call `getPaddedType( builder )`, which depends on the backend: `mat2` elements use the padded type `vec4` with `WebGLBackend` and `mat2` otherwise (https://github.com/mrdoob/three.js/pull/34587).

## Related

- [UniformNode](./UniformNode.md)
- [StorageBufferNode](./StorageBufferNode.md)
