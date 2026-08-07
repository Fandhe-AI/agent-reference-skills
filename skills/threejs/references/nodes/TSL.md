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
- Import from `three/tsl` (or `three/webgpu` for renderer + TSL together), not from `three` directly.

## Related

- [Node](./Node.md)
- [NodeBuilder](./NodeBuilder.md)
- [FunctionNode](./FunctionNode.md)
