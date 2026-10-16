# StorageTextureNode

A special texture node used to write data into a storage texture with a compute shader. Can only be used with a WebGPU backend.

## Signature / Usage

```js
const storageTexture = new THREE.StorageTexture( width, height );
const computeTexture = Fn( ( { storageTexture } ) => {
	const posX = instanceIndex.mod( width );
	const posY = instanceIndex.div( width );
	const indexUV = uvec2( posX, posY );
	// generate RGB values
	const r = 1;
	const g = 1;
	const b = 1;
	textureStore( storageTexture, indexUV, vec4( r, g, b, 1 ) ).toWriteOnly();
} );
const computeNode = computeTexture( { storageTexture } ).compute( width * height );
renderer.computeAsync( computeNode );
```

```js
class StorageTextureNode extends TextureNode {
	constructor( value, uvNode, storeNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `StorageTexture` | — | The storage texture |
| `uvNode` | `Node<vec2 \| vec3>` | — | The uv node |
| `storeNode` | `Node` | `null` | The value node to store in the texture |
| `access` | `string` | `'writeOnly'` | The access type of the texture node |
| `mipLevel` | `number` | `0` | The mip level to write to |
| `isStorageTextureNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generate(builder, output)` | `string` | Generates the code snippet; if no `storeNode` is defined, generated as a normal texture |
| `generateSnippet(builder, textureProperty, uvSnippet, levelSnippet, biasSnippet, depthSnippet, compareSnippet, gradSnippet, offsetSnippet)` | `string` | Generates the snippet for the storage texture |
| `generateStore(builder)` | `void` | Generates the store code snippet |
| `getInputType(builder)` | `string` | Fixed value `'storageTexture'` |
| `getTransformedUV(uvNode)` | `Node` | Returns the unmodified uv node (texel coordinates are not transformed by the texture uv matrix) |
| `setAccess(value)` | `StorageTextureNode` | Defines the node access |
| `setMipLevel(level)` | `StorageTextureNode` | Sets the mip level to write to |
| `store(uvNode, storeNode = null)` | `StorageTextureNode` | Stores a value at the given coordinates |
| `toReadOnly()` | `StorageTextureNode` | Configures read-only access |
| `toReadWrite()` | `StorageTextureNode` | Configures read/write access |
| `toWriteOnly()` | `StorageTextureNode` | Configures write-only access |

## Notes

- WebGPU backend only.
- Source: https://threejs.org/docs/pages/StorageTextureNode.html (three.js r186, `src/nodes/accessors/StorageTextureNode.js`)

## Related

- [StorageTexture3DNode](./StorageTexture3DNode.md)
- [TextureNode](./TextureNode.md)
- [ComputeNode](./ComputeNode.md)
