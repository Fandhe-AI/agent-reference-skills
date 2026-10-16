# StorageTexture3DNode

A special texture node used to write data into a 3D storage texture with a compute shader.

## Signature / Usage

```js
class StorageTexture3DNode extends StorageTextureNode {
	constructor( value, uvNode, storeNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Storage3DTexture` | — | The 3D storage texture |
| `uvNode` | `Node<vec3>` | — | The uv node |
| `storeNode` | `Node` | `null` | The value node to store in the texture |
| `isStorageTexture3DNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateOffset(builder, offsetNode)` | `string` | Generates the offset code snippet |
| `generateUV(builder, uvNode)` | `string` | Generates the uv code snippet |
| `getDefaultUV()` | `Node<vec3>` | Default uv node; three-dimensional for 3D textures |
| `setUpdateMatrix(value)` | `void` | Empty implementation; the `updateMatrix` flag is ignored and the uv matrix is not applied to 3D textures |

## Notes

- Source: `src/nodes/accessors/StorageTexture3DNode.js` (three.js r186 docs).
- Inheritance: ... > TextureNode > StorageTextureNode > StorageTexture3DNode.

## Related

- [StorageTextureNode](./StorageTextureNode.md)
- [Texture3DNode](./Texture3DNode.md)
