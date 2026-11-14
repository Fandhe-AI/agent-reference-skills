# ReferenceAttributeNode

Binds a buffer attribute that is a property of the rendered object, like the matrices of an instanced mesh. Unlike `BufferAttributeNode`, the attribute is not part of the program: each object binds its own attribute, so objects can share a program. Matrices are bound as columns; storage buffer attributes are bound as storage buffers.

## Signature / Usage

Adapted (not in the official docs): the `import` line is added; the two `referenceAttribute()` lines are the JSDoc example.

```js
import { referenceAttribute } from 'three/tsl';

const matrix = referenceAttribute( 'instanceMatrix', 'mat4' );
const color = referenceAttribute( 'instanceColor' );
```

```js
class ReferenceAttributeNode extends Node {
	constructor( property, nodeType = null, object = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `property` | `string` | — | The name of the property the node refers to |
| `nodeType` | `string` | `null` | The node type; inferred from the attribute if not set |
| `object` | `Object` | `null` | The object the property belongs to; the rendered object if `null` |
| `properties` | `Array<string>` | — | The hierarchy of the dot-separated property name, so nested properties can be referred |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getValueFromReference(object)` | `?(BufferAttribute \| InterleavedBufferAttribute)` | Returns the value of the referred property of the given object |
| `getAttribute(object)` | `?(BufferAttribute \| InterleavedBufferAttribute)` | Returns the attribute the node binds when rendering the given object |
| `generateNodeType(builder)` | `string` | Returns the node type, inferred from the attribute if not set |
| `setup(builder)` | `Node` | Sets up the attribute nodes; throws if the attribute is not found |

## Notes

- New in r187: instanced meshes share builds by binding their instance data (`instanceMatrix`, `instanceColor`, and the previous-frame matrices for motion vectors) through `referenceAttribute()` (https://github.com/mrdoob/three.js/pull/35007).
- A `mat4` / `mat3` type is bound as `vec4` / `vec3` columns of the attribute; a `StorageBufferAttribute` / `StorageInstancedBufferAttribute` is bound with `storage()` and read at `vertexIndex` / `instanceIndex`.
- Source: https://threejs.org/docs/pages/ReferenceAttributeNode.html (three.js r187, `src/nodes/accessors/ReferenceAttributeNode.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [BufferAttributeNode](./BufferAttributeNode.md)
- [ReferenceNode](./ReferenceNode.md)
- [AttributeNode](./AttributeNode.md)
