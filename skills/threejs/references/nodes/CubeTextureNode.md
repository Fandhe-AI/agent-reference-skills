# CubeTextureNode

Uniform node type representing a cube texture. Extends `TextureNode`.

## Signature / Usage

```js
import { cubeTexture } from 'three/tsl';

material.envNode = cubeTexture( myCubeTexture );
```

```js
class CubeTextureNode extends TextureNode {
	constructor( value, uvNode = null, levelNode = null, biasNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `CubeTexture` | — | The cube texture |
| `uvNode` | `Node<vec3>` | `null` | The uv node |
| `levelNode` | `Node<int>` | `null` | Mip level |
| `biasNode` | `Node<float>` | `null` | LOD bias |
| `isCubeTextureNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Description |
|--------|-------------|
| `generateUV(builder, cubeUV)` | Generates the uv code snippet |
| `getDefaultUV()` | Default UVs based on the cube texture mapping type |
| `setupUV(builder, uvNode)` | Backend-specific uv setup |
| `setUpdateMatrix(value)` | No-op; the UV transform matrix does not apply to cube textures |

## Notes

- The UV transform matrix is not applied to cube textures.

## Related

- [TextureNode](./TextureNode.md)
