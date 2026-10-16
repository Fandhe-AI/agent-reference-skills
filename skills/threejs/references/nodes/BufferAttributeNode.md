# BufferAttributeNode

Defines attribute data on the node level instead of only on geometry level. Especially useful when geometry data is generated via compute shaders.

## Signature / Usage

```js
const geometry = new THREE.PlaneGeometry();
const positionAttribute = geometry.getAttribute( 'position' );
const colors = [];
for ( let i = 0; i < position.count; i ++ ) {
	colors.push( 1, 0, 0 );
}
material.colorNode = bufferAttribute( new THREE.Float32BufferAttribute( colors, 3 ) );
```

Converting a storage buffer into an attribute node:

```js
material.positionNode = positionBuffer.toAttribute();
```

```js
class BufferAttributeNode extends InputNode {
	constructor( value, bufferType = null, bufferStride = 0, bufferOffset = 0 ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `BufferAttribute \| InterleavedBuffer \| TypedArray` | — | The attribute data |
| `bufferType` | `string` | `null` | The buffer type (e.g. `'vec3'`) |
| `bufferStride` | `number` | `0` | The buffer stride |
| `bufferOffset` | `number` | `0` | The buffer offset |
| `attribute` | `BufferAttribute` | `null` | Reference to the buffer attribute |
| `global` | `boolean` | `true` | Overrides `InputNode#global` |
| `instanced` | `boolean` | `false` | Whether the attribute is instanced |
| `isBufferNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `usage` | `number` | `StaticDrawUsage` | Set to `THREE.DynamicDrawUsage` via `.setUsage()` to update the data per frame |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generate(builder)` | `string` | Generates the code snippet |
| `generateNodeType(builder)` | `string` | Node type inferred from the buffer attribute |
| `getHash(builder)` | `string` | Overridden so shared attribute data shares the hash |
| `getInputType(builder)` | `string` | Fixed value `'bufferAttribute'` |
| `setInstanced(value)` | `BufferAttributeNode` | Sets `instanced` |
| `setUsage(value)` | `BufferAttributeNode` | Sets `usage` |
| `setup(builder)` | `void` | If no `BufferAttribute` instance was passed, creates and configures an internal attribute |

## Notes

- Source: `src/nodes/accessors/BufferAttributeNode.js` (three.js r186 docs).

## Related

- [StorageBufferNode](./StorageBufferNode.md)
- [AttributeNode](./AttributeNode.md)
