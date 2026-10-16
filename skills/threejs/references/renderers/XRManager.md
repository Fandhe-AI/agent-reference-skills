# XRManager

The XR manager is built on top of the WebXR Device API to manage XR sessions with renderer backends (the `Renderer` / `WebGPURenderer` counterpart of `WebXRManager`).

## Signature / Usage

```js
new XRManager( renderer: Renderer, multiview: boolean )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| renderer | Renderer | Constructor parameter. The renderer. |
| multiview | boolean | Constructor parameter. Enables multiview if the device supports it. Default `false`. |
| cameraAutoUpdate | boolean | Whether the XR camera is updated automatically. Default `true`. |
| enabled | boolean | Globally enables XR rendering. Default `false`. |
| isPresenting | boolean (readonly) | Whether the XR device is currently presenting. Default `false`. |

## Methods

| Name | Description |
|------|-------------|
| `.createCylinderLayer( radius, centralAngle, aspectratio, translation, quaternion, pixelwidth, pixelheight, rendercall, attributes ) : Mesh` | Creates a cylindrical layer presenting a separate rendered scene. `attributes.samples` sets the MSAA sample count (defaults to the renderer's). Add the returned mesh to the XR scene. |
| `.createQuadLayer( width, height, translation, quaternion, pixelwidth, pixelheight, rendercall, attributes ) : Mesh` | Creates a quadratic layer presenting a separate rendered scene. Add the returned mesh to the XR scene. |
| `.foveateBoundTexture( renderTarget: RenderTarget )` | Applies WebXR fixed foveation to the internal post-processing render target used by the first XR render pass before compositing into a projection layer. Browser-side `XRWebGLBinding.foveateBoundTexture()` failures are non-fatal. |
| `.getBaseLayer() : XRWebGLLayer \| XRProjectionLayer` | `XRProjectionLayer` when the device supports the WebXR Layers API, else `XRWebGLLayer`. |
| `.getBinding() : XRWebGLBinding` | Creates a new binding if needed and possible; `null` if one cannot be created. |
| `.getCamera() : ArrayCamera` | Returns the XR camera. |
| `.getController( index: number ) : Group` | Group for the controller in target ray space. |
| `.getControllerGrip( index: number ) : Group` | Group for the controller in grip space. |
| `.getHand( index: number ) : Group` | Group for the controller in hand space. |
| `.getEnvironmentBlendMode() : 'opaque' \| 'additive' \| 'alpha-blend' \| undefined` | `undefined` outside an XR session. |
| `.getFoveation() : number \| undefined` | Returns the foveation value. |
| `.getFrame() : XRFrame` | `null` outside an XR session. |
| `.getFramebufferScaleFactor() : number` | Returns the framebuffer scale factor. |
| `.getReferenceSpace() : XRReferenceSpace` | Returns the XR reference space. |
| `.getReferenceSpaceType() : XRReferenceSpaceType` | Returns the reference space type. |
| `.getSession() : XRSession` | `null` outside an XR session. |
| `.getWebGPUBinding() : XRGPUBinding` | Creates a new binding if needed and possible; `null` if one cannot be created. |
| `.renderLayers()` | Renders XR layers previously added to the scene. Usually called in the animation loop before `renderer.render( scene, camera );`. |
| `.setFoveation( foveation: number )` | Range `[0,1]`: `0` no foveation (full resolution), `1` maximum foveation. |
| `.setFramebufferScaleFactor( factor: number )` | Cannot be used during an XR session. |
| `.setReferenceSpace( space: XRReferenceSpace )` | Sets a custom XR reference space. |
| `.setReferenceSpaceType( type: XRReferenceSpaceType )` | Cannot be used during an XR session. |
| `.setSession( session: XRSession ) : Promise` | (async) Injects a requested XR session (usually from a `*Button` module) into the renderer and starts XR rendering. |
| `.updateCamera( camera: PerspectiveCamera )` | Called by the renderer per frame; updates the XR camera and its sub cameras from the given user camera. |
| `.useMultiview() : boolean` | Whether the engine renders to a multiview target. |

## Notes

- Inherits from `EventDispatcher`.
- Source: `src/renderers/common/XRManager.js` (three.js r186).

## Related

- [WebXRManager](./WebXRManager.md)
- [Renderer](./Renderer.md)
- [WebGPURenderer](./WebGPURenderer.md)
