# TextureNode

Uniform node type representing a 2D texture, with sampling modes, mip levels, bias, and gradients. Extends `UniformNode`.

## Signature / Usage

```js
import { texture, uv } from 'three/tsl';

material.colorNode = texture( myTexture, uv() );
```

```js
class TextureNode extends UniformNode {
	constructor( value = EmptyTexture, uvNode = null, levelNode = null, biasNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Texture` | `EmptyTexture` | The texture |
| `uvNode` | `Node<vec2\|vec3>` | `null` | Texture coordinates |
| `levelNode` | `Node<int>` | `null` | Mip level selection |
| `biasNode` | `Node<float>` | `null` | LOD bias |
| `compareNode` | `Node<float>` | `null` | Comparison reference value |
| `depthNode` | `Node<int>` | `null` | Layer selection for texture arrays |
| `gradNode` | `Array<Node<vec2>>` | `null` | Explicit sampling gradients |
| `offsetNode` | `Node<ivec2\|ivec3>` | `null` | Texel offset |
| `gatherNode` | `Node<int>` | `null` | Optional index constant of the channel to gather; must be in range [0, 3] and a compile-time constant |
| `sampler` | `boolean` | `true` | Sample (filtered) vs. fetch mode |
| `updateMatrix` | `boolean` | `false` | Auto-update the UV transform matrix |
| `mergeable` | `boolean` | `true` | Whether the uniform may be merged with other uniforms at compile-time (`uniformTexture()` creates a non-mergeable node) |
| `isTextureNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Description |
|--------|-------------|
| `sample(uvNode)` | Sample with a given UV node |
| `level(levelNode)` / `bias(biasNode)` / `grad(x, y)` / `blur(amount)` | Sampling variants |
| `load(uvNode)` | Fetch texels without interpolation |
| `offset(offsetNode)` / `depth(depthNode)` / `compare(compareNode)` / `gather(gatherNode)` | Sampling modifiers |
| `gather(gatherNode: Node<int>)` | Gathers four texels from the texture; returns `TextureNode` |
| `isSampleCompare()` | Returns `true` if the texture is sampled with a depth comparison (the node must be bound with a comparison sampler) |
| `generateSnippet(...)` | Code generation; in r186 its snippet parameters include `gatherSnippet` and `flipYSnippet` (alongside `uvSnippet`, `levelSnippet`, `biasSnippet`, `depthSnippet`, `compareSnippet`, `gradSnippet`, `offsetSnippet`) |
| `clone()` / `size(levelNode)` / `getBase()` | Utility accessors |
| `customCacheKey()` | Overwritten since the texture's type and filters influence the generated shader code |

## Notes

- Source: https://threejs.org/docs/pages/TextureNode.html (three.js r187, `src/nodes/accessors/TextureNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): `uniformTexture()` creates a non-mergeable uniform texture node, and `TextureNode` has a `mergeable` property (https://github.com/mrdoob/three.js/pull/34450). The uniform hash is the texture UUID when mergeable, otherwise it depends on the reference node.
- Migration (r186 → r187): `TextureNode` no longer uses `updateType` / `update()` for the UV transformation matrix and flipY; the matrix and flipY uniforms are shared by all nodes of the same base texture node (https://github.com/mrdoob/three.js/pull/34552).
- The build context can provide analytic uv gradients with `getTextureGradient( textureNode, builder )`. It is used when the node samples with the default uv (no `uvNode`, level, bias or explicit gradient) and `sampler` is `true`, e.g. when the uv is reconstructed per fragment; the gradients are transformed by the texture matrix if `updateMatrix` is `true` (https://github.com/mrdoob/three.js/pull/35121).

## Related

- [UniformNode](./UniformNode.md)
- [CubeTextureNode](./CubeTextureNode.md)
