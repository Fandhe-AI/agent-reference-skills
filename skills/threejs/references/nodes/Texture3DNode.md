# Texture3DNode

A uniform node that represents a 3D texture.

## Signature / Usage

```js
class Texture3DNode extends TextureNode {
	constructor( value, uvNode = null, levelNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Data3DTexture` | — | The 3D texture |
| `uvNode` | `Node<vec2 \| vec3>` | `null` | The uv node |
| `levelNode` | `Node<int>` | `null` | The level node |
| `isTexture3DNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateOffset(builder, offsetNode)` | `string` | Generates the offset code snippet |
| `generateUV(builder, uvNode)` | `string` | Generates the uv code snippet |
| `getDefaultUV()` | `Node<vec3>` | Default uv node; three-dimensional for 3D textures |
| `getInputType(builder)` | `string` | Fixed value `'texture3D'` |
| `normal(uvNode)` | `Node<vec3>` | Normal for the given uv: the slope/gradient of scalar data inside the 3D texture, not a geometric normal |
| `setUpdateMatrix(value)` | `void` | Empty implementation; `updateMatrix` is ignored for 3D textures |

## Notes

- Source: `src/nodes/accessors/Texture3DNode.js` (three.js r186 docs).

## Related

- [TextureNode](./TextureNode.md)
- [StorageTexture3DNode](./StorageTexture3DNode.md)
