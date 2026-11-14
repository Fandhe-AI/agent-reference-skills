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
- Source: https://threejs.org/docs/pages/CubeTextureNode.html (three.js r187, `src/nodes/accessors/CubeTextureNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): `uniformCubeTexture()` creates a non-mergeable uniform cube texture node (https://github.com/mrdoob/three.js/pull/34450).

## Related

- [TextureNode](./TextureNode.md)
