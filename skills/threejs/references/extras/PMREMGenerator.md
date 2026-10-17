# PMREMGenerator

Generates a Prefiltered, Mipmapped Radiance Environment Map (PMREM) from a cubemap, equirectangular texture or scene, so blur levels can be sampled quickly by material roughness. Uses GGX VNDF importance sampling (Heitz, 2018) and a CubeUV packing.

## Signature / Usage

```js
new PMREMGenerator( renderer : WebGLRenderer )

.fromCubemap( cubemap : Texture, renderTarget : WebGLRenderTarget ) : WebGLRenderTarget
.fromEquirectangular( equirectangular : Texture, renderTarget : WebGLRenderTarget ) : WebGLRenderTarget
.fromScene( scene : Scene, sigma : number, near : number, far : number, options : Object ) : WebGLRenderTarget
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fromScene()` `scene` | Scene | — | The scene to be captured |
| `fromScene()` `sigma` | number | `0` | Blur radius in radians |
| `fromScene()` `near` | number | `0.1` | Near plane distance |
| `fromScene()` `far` | number | `100` | Far plane distance |
| `fromScene()` `options` | Object | `{}` | Configuration options |
| `fromScene()` `options.size` | number | `256` | Texture size of the PMREM |
| `fromScene()` `options.position` | Vector3 | origin | Position of the internal cube camera that renders the scene |

## Methods

- `compileCubemapShader()`: pre-compiles the cubemap shader; invoke during the texture's network fetch for faster start-up.
- `compileEquirectangularShader()`: pre-compiles the equirectangular shader; same purpose.
- `dispose()`: disposes the generator's internal memory.
- `fromCubemap(cubemap, renderTarget = null)`: PMREM from an LDR or HDR cubemap. Ideal input is 256 x 256; minimum is 16 x 16 per face.
- `fromEquirectangular(equirectangular, renderTarget = null)`: PMREM from an LDR or HDR equirectangular texture. Ideal input is 1k (1024 x 512); minimum is 64 x 32.
- `fromScene(scene, sigma, near, far, options)`: PMREM from a scene; can be faster than an image when bandwidth is low.

All `from*` methods return the resulting PMREM as a `WebGLRenderTarget`.

## Notes

- PMREMGenerator is a static class; more than one instance should not be needed. Calling `dispose()` on one makes any others unusable.
- Only goes down to the LOD_MIN level, then creates extra more-filtered "mips" at that resolution for higher roughness.
- Source: https://threejs.org/docs/pages/PMREMGenerator.html (three.js r186, `src/extras/PMREMGenerator.js`)

## Related

- [CubeTexture](../textures/CubeTexture.md)
- [WebGLRenderTarget](../renderers/WebGLRenderTarget.md)
- [PMREMNode](../nodes/PMREMNode.md)
