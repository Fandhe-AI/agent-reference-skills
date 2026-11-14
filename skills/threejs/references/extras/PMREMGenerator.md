# PMREMGenerator

Generates a Prefiltered, Mipmapped Radiance Environment Map (PMREM) for image-based lighting from a cubemap, equirectangular texture or scene. The result is a cube render target whose mip levels store GGX-filtered radiance at increasing roughness, from a mirror at level 0 to roughness 1. Filtering assumes the view direction equals the surface normal; sharp levels use GGX visible normal sampling (Heitz, 2018) while rough levels integrate a lower-resolution source cubemap.

## Signature / Usage

```js
new PMREMGenerator( renderer : WebGLRenderer )

.fromCubemap( cubemap : Texture, renderTarget : WebGLCubeRenderTarget ) : WebGLCubeRenderTarget
.fromEquirectangular( equirectangular : Texture, renderTarget : WebGLCubeRenderTarget ) : WebGLCubeRenderTarget
.fromScene( scene : Scene, sigma : number, near : number, far : number, options : Object ) : WebGLCubeRenderTarget
PMREMGenerator.lodToRoughness( lod : number, maxLod : number ) : number
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fromScene()` `scene` | Scene | — | The scene to be captured |
| `fromScene()` `sigma` | number | `0` | Blur radius in radians; when greater than `0` a Gaussian blur is applied before GGX filtering |
| `fromScene()` `near` | number | `0.1` | Near plane distance |
| `fromScene()` `far` | number | `100` | Far plane distance |
| `fromScene()` `options` | Object | `{}` | Configuration options |
| `fromScene()` `options.size` | number | `256` | Texture size of the PMREM, rounded down to a power of two and at least 256 |
| `fromScene()` `options.position` | Vector3 | origin | Position of the internal cube camera that renders the scene |

## Methods

- `compileCubemapShader()`: pre-compiles the cubemap shader; invoke during the texture's network fetch for faster start-up.
- `compileEquirectangularShader()`: pre-compiles the equirectangular shader; same purpose.
- `dispose()`: disposes the generator's internal memory. The PMREMs it returned belong to the caller and are not disposed.
- `static lodToRoughness(lod, maxLod)`: returns the roughness a mip level of a PMREM has been prefiltered for (`maxLod > 0 ? 1 - Math.sqrt( 1 - lod / maxLod ) : 0`). The inverse mapping is used by the renderers when sampling a PMREM.
- `fromCubemap(cubemap, renderTarget = null)`: PMREM from an LDR or HDR cubemap. The cube face size matches the input, rounded down to a power of two and at least 256.
- `fromEquirectangular(equirectangular, renderTarget = null)`: PMREM from an LDR or HDR equirectangular texture. The cube face size is one quarter of the image width, rounded down to a power of two and at least 256.
- `fromScene(scene, sigma, near, far, options)`: PMREM from a scene, optionally blurred by `sigma` before GGX filtering.

All `from*` methods return the resulting PMREM as a `WebGLCubeRenderTarget`.

## Notes

- Since r187 the PMREM is a cube render target (mip levels = roughness levels) instead of a CubeUV atlas packed into a 2D render target; `CubeUVReflectionMapping` was removed.
- `PMREMGenerator` as exported from the WebGPU builds (`src/renderers/common/extras/PMREMGenerator.js`) takes a `Renderer`, returns `CubeRenderTarget`, accepts `options.renderTarget` in `fromScene()`, and has async `compileCubemapShader()` / `compileEquirectangularShader()`. Its `from*()` methods require an initialized renderer (`await renderer.init()`); the `from*Async()` variants are deprecated (since r181).
- Migration (r186 → r187): PMREMs are now based on cube render targets and `CubeUVReflectionMapping` has been removed; the quality of PMREMs has been improved, so materials look slightly different (https://github.com/mrdoob/three.js/pull/34585).
- Source: https://threejs.org/docs/pages/PMREMGenerator.html (three.js r187, `src/extras/PMREMGenerator.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [CubeTexture](../textures/CubeTexture.md)
- [WebGLRenderTarget](../renderers/WebGLRenderTarget.md)
- [PMREMNode](../nodes/PMREMNode.md)
