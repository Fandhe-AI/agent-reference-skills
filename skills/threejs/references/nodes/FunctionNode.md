# FunctionNode

Represents a native shader function, allowing node material logic to be implemented with raw WGSL/GLSL code. Extends `CodeNode`.

## Signature / Usage

```js
import { wgslFn } from 'three/tsl';

const desaturateWGSLFn = wgslFn( `
	fn desaturate( color:vec3<f32> ) -> vec3<f32> {
		let lum = vec3<f32>( 0.299, 0.587, 0.114 );
		return vec3<f32>( dot( lum, color ) );
	}`
);

material.colorNode = desaturateWGSLFn( { color: texture( map ) } );
```

```js
class FunctionNode extends CodeNode {
	constructor( code = '', includes = [], language = '' ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | `''` | The native shader code |
| `includes` | `Array<Node>` | `[]` | Included function nodes |
| `language` | `'js' \| 'wgsl' \| 'glsl'` | `''` | Shader language of `code` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateNodeType(builder)` | `string` | Return type of the function |
| `getInputs(builder)` | `Array<NodeFunctionInput>` | Function inputs |
| `getMemberType(builder, name)` | `string` | Type of a member |
| `getNodeFunction(builder)` | `NodeFunction` | The underlying node function |

## Notes

- `wgslFn()` and `glslFn()` are the TSL helper functions used to create `FunctionNode` instances instead of calling the constructor directly.
- `includes` allows one native function to call another.

## Related

- [Node](./Node.md)
- [NodeBuilder](./NodeBuilder.md)
