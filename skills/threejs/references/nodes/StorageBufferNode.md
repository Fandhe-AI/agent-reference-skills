# StorageBufferNode

Defines storage buffers for compute shader contexts: buffers are created, populated by compute shaders, and converted to attribute nodes for rendering. Extends `BufferNode`.

## Signature / Usage

```js
import { instancedArray } from 'three/tsl';

const positionBuffer = instancedArray( particleCount, 'vec3' ); // storage buffer node

const computeInit = Fn( () => {
	const position = positionBuffer.element( instanceIndex );
	position.x = 1;
	position.y = 1;
	position.z = 1;
} )().compute( particleCount );

const particleMaterial = new THREE.SpriteNodeMaterial();
particleMaterial.positionNode = positionBuffer.toAttribute();
renderer.computeAsync( computeInit );
```

```js
class StorageBufferNode extends BufferNode {
	constructor( value, bufferType = null, bufferCount = 0 ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `StorageBufferAttribute \| StorageInstancedBufferAttribute \| BufferAttribute` | — | The buffer data |
| `bufferType` | `string \| Struct` | `null` | Buffer type, e.g. `'vec3'` |
| `bufferCount` | `number` | `0` | Buffer element count |
| `access` | `string` | `'readWrite'` | Buffer access mode |
| `isAtomic` | `boolean` | `false` | Whether the node is atomic |
| `isPBO` | `boolean` | `false` | Whether the node is a PBO (WebGL only) |
| `global` | `boolean` | `true` | Overrides `Node#global` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `element(indexNode)` | `StorageArrayElementNode` | Element access by index |
| `setAccess(value)` / `setAtomic(value)` / `setPBO(value)` | `StorageBufferNode` | Chainable configuration |
| `toAtomic()` / `toReadOnly()` | `StorageBufferNode` | Convenience access-mode helpers |

## Notes

- Typically created via the convenience functions `attributeArray()` or `instancedArray()` rather than the constructor directly.
- Convert to an attribute node with `.toAttribute()` before assigning to a material's `positionNode`/etc. for rendering.

## Related

- [ComputeNode](./ComputeNode.md)
