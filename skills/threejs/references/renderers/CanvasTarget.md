# CanvasTarget

Represents the final output destination of the renderer.

## Signature / Usage

```js
new CanvasTarget( domElement: HTMLCanvasElement | OffscreenCanvas )
```

`setDrawingBufferSize()` computes the drawing buffer size with:

```js
size.x = width * pixelRatio;
size.y = height * pixelRatio;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| domElement | HTMLCanvasElement \| OffscreenCanvas | Constructor parameter. The canvas element to render to; also a reference to the canvas the renderer draws to (created automatically by the renderer). |
| colorTexture | FramebufferTexture | The color texture of the default framebuffer. |
| depthTexture | DepthTexture | The depth texture of the default framebuffer. |

## Methods

| Name | Description |
|------|-------------|
| `.dispose()` | Frees GPU-related resources. Fires `RenderTarget#event:dispose`. |
| `.getDrawingBufferSize( target: Vector2 ) : Vector2` | Drawing buffer size in physical pixels (honors pixel ratio). |
| `.getPixelRatio() : number` | Returns the pixel ratio. |
| `.getScissor( target: Vector4 ) : Vector4` | Returns the scissor rectangle. |
| `.getScissorTest() : boolean` | Whether the scissor test is enabled. |
| `.getSize( target: Vector2 ) : Vector2` | Size in logical pixels (does not honor pixel ratio). |
| `.getViewport( target: Vector4 ) : Vector4` | Returns the viewport definition. |
| `.setDrawingBufferSize( width, height, pixelRatio )` | Defines the drawing buffer size from logical width, height and pixel ratio. |
| `.setPixelRatio( value: number )` | Sets the pixel ratio and resizes the canvas if necessary. Default `1`. |
| `.setScissor( x: number \| Vector4, y, width, height )` | Defines the scissor rectangle (logical pixels, lower left corner origin). |
| `.setScissorTest( boolean )` | Defines the scissor test. |
| `.setSize( width, height, updateStyle )` | Sets the renderer size in logical pixels. `updateStyle` (default `true`) updates the canvas `style` attribute. |
| `.setViewport( x: number \| Vector4, y, width, height, minDepth, maxDepth )` | Defines the viewport. `minDepth` (default `0`) and `maxDepth` (default `1`) are WebGPU only. |

## Notes

- Inherits from `EventDispatcher`.
- Source: `src/renderers/common/CanvasTarget.js` (three.js r186).

## Related

- [Renderer](./Renderer.md)
- [WebGPURenderer](./WebGPURenderer.md)
