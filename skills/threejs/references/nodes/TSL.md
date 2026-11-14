# TSL (Three.js Shading Language)

TSL is Three.js's node-based shader system: a JavaScript API for composing vertex, fragment, and compute shaders without writing raw GLSL/WGSL. Node graphs compile to WGSL (WebGPU) or GLSL (WebGL) automatically.

## Signature / Usage

```js
import * as THREE from 'three';
import { texture, uv, mul, vec3 } from 'three/tsl';

const material = new THREE.MeshStandardNodeMaterial();
material.colorNode = mul( texture( myTexture, uv() ), vec3( 1.2, 0.9, 0.8 ) );
```

## Categories

| Category | Examples |
|------|-------------|
| Constants / properties | `PI`, `time`, `cameraPosition`, `positionLocal`, `normalView`, `screenUV` |
| Math functions | `sin()`, `cos()`, `pow()`, `mix()`, `clamp()`, `dot()`, `cross()`, `normalize()` |
| Texture / sampling | `texture()`, `cubeTexture()`, `textureLod()`, `textureGrad()` |
| Lighting / shading | `ao()`, `normalMap()`, `bumpMap()`, light accessor functions |
| Post-processing | `bloom()`, `gaussianBlur()`, `dof()`, `fxaa()`, `film()` |
| Tone mapping | `acesFilmicToneMapping()`, `agxToneMapping()` |
| Procedural | `checker()`, `hash()`, `curlNoise()` |
| Control flow | `If().ElseIf().Else()`, `Switch().Case()`, `Loop()`, `Break()`, `Continue()` |
| Variables | `Var()`, `Const()` |
| Compute / GPGPU | `compute()`, `instancedArray()`, `atomicAdd()`, `barrier()` |

## Notes

- TSL functions build a graph of `Node` subclasses (see [Node](./Node.md)); the graph is compiled by a `NodeBuilder` (see [NodeBuilder](./NodeBuilder.md)) into WGSL or GLSL depending on the active renderer backend.
- Assign TSL node graphs to `*NodeMaterial` properties (`colorNode`, `positionNode`, `normalNode`, etc.) instead of setting plain uniforms.
- Renamed in r185: `directionToColor()` is now `packNormalToRGB()` and `colorToDirection()` is now `unpackRGBToNormal()` (https://github.com/mrdoob/three.js/pull/33715).
- In `material.positionNode`, `positionLocal` does not reflect internal vertex transformations such as `SkinnedMesh`; use `positionGeometry` to get the vertices from the pre-transformed geometry (r185 migration note).
- Import from `three/tsl` (or `three/webgpu` for renderer + TSL together), not from `three` directly.
- Migration (r186 → r187): operands and parameters of math functions and operators are implicitly coerced to broader common types (type promotion); weak constants (plain numbers) adopt the type of the explicit operands (https://github.com/mrdoob/three.js/pull/33695).
- Migration (r186 → r187): struct storage buffers are always arrays, even with one element: use `storage( buffer, StructType ).element( 0 ).get( 'member' )` instead of `storage.get( 'member' )` (https://github.com/mrdoob/three.js/pull/34807).
- Migration (r186 → r187): the `pixelSize` parameter of `pixelationPass()` (`three/addons/tsl/display/PixelationPassNode.js`) is a plain `Number`; node objects are no longer supported (https://github.com/mrdoob/three.js/pull/34543).
- Migration (r186 → r187): `TempNode` is deprecated, nodes extend `Node` and are their own variable intents. The TSL functions `VarIntent()`, `nodeProxyIntent()`, `nodeObjectIntent()` and the chaining method `toVarIntent()` are replaced by `nodeProxyAssignable()`, `nodeObjectAssignable()` and `toAssignable()`; the deprecated `transformedNormalView`, `transformedNormalWorld` and `transformedClearcoatNormalView` (deprecated since r178) are removed, use `normalView`, `normalWorld` and `clearcoatNormalView`.
- New in r187: `referenceAttribute()` ([ReferenceAttributeNode](./ReferenceAttributeNode.md)), `projectionDepth()` (renamed from `getProjectionDepth()`, https://github.com/mrdoob/three.js/pull/35230), `isBackgroundDepth()`, `morphColor()` (color morph targets, https://github.com/mrdoob/three.js/pull/35141), `materialDiffuseRoughness`, `diffuseRoughness`, `BRDF_EON` / `EON_DirectionalAlbedo` (EON rough diffuse, https://github.com/mrdoob/three.js/pull/34379), `workingLuminanceCoefficients`; `grayscale()` and `saturation()` take an optional `luminanceCoefficients` argument (default: the luminance coefficients of the working color space); `bumpMap()` takes an optional third `normalNode` argument; `overrideNodes()` takes an optional `shaderStage` argument.
- `three/tsl` is unchanged for users: `Three.TSL.js` now just re-exports `./nodes/TSL.js` (`export * from './nodes/TSL.js'`) instead of listing each export.

## Related

- [Node](./Node.md)
- [NodeBuilder](./NodeBuilder.md)
- [FunctionNode](./FunctionNode.md)
