# CubeRenderTarget

A cube render target. A special version of `WebGLCubeRenderTarget` which is compatible with `WebGPURenderer`.

## Signature / Usage

```js
new CubeRenderTarget( size: number, options: RenderTarget~Options )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| size | number | Constructor parameter. The size of the render target. Default `1`. |
| options | RenderTarget~Options | Constructor parameter. The configuration object. |
| isCubeRenderTarget | boolean (readonly) | Type-test flag. Default `true`. |
| texture | DataArrayTexture | Overwritten with a different texture type. Overrides `RenderTarget#texture`. |

## Methods

| Name | Description |
|------|-------------|
| `.clear( renderer: Renderer, color: boolean, depth: boolean, stencil: boolean )` | Clears this cube render target. `color`, `depth`, `stencil` default to `true`. |
| `.fromEquirectangularTexture( renderer: Renderer, texture: Texture ) : CubeRenderTarget` | Converts the given equirectangular texture to a cube map. Returns a reference to this cube render target. |

## Notes

- Inherits from `EventDispatcher` -> `RenderTarget`.
- Use `WebGLCubeRenderTarget` with `WebGLRenderer`; this class is the `WebGPURenderer`-compatible counterpart.
- Source: `src/renderers/common/CubeRenderTarget.js` (three.js r186).

## Related

- [WebGLCubeRenderTarget](./WebGLCubeRenderTarget.md)
- [WebGPURenderer](./WebGPURenderer.md)
