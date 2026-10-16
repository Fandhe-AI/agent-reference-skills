# LightShadow

Abstract base class for light shadow classes. These classes represent the shadow configuration for different light types.

## Signature / Usage

```js
const light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;

// light.shadow is a LightShadow subclass instance
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.bias = -0.0001;
```

Constructor: `new LightShadow( camera : Camera )` (abstract). `camera` is the light's view of the world.

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `.autoUpdate` | `boolean` | `true` | Enables automatic updates of the light's shadow. If you do not require dynamic lighting / shadows, you may set this to `false` |
| `.bias` | `number` | `0` | Shadow map bias, how much to add or subtract from the normalized depth when deciding whether a surface is in shadow. Very tiny adjustments (in the order of `0.0001`) may help reduce artifacts |
| `.biasNode` | `Node.<float>` | `null` | A node version of `bias`. Only supported with `WebGPURenderer`. If defined, `bias` has no effect |
| `.blurSamples` | `number` | `8` | The amount of samples to use when blurring a VSM shadow map |
| `.camera` | `Camera` | — | The light's view of the world |
| `.intensity` | `number` | `1` | The intensity of the shadow. Valid values are in the range `[0, 1]` |
| `.map` | `RenderTarget` | `null` | The depth map generated using the internal camera; a location beyond a pixel's depth is in shadow. Computed internally during rendering |
| `.mapPass` | `RenderTarget` | `null` | The distribution map generated using the internal camera; an occlusion is calculated based on the distribution of depths. Computed internally during rendering |
| `.mapSize` | `Vector2` | `(512,512)` | Width and height of the shadow map. Higher values give better quality shadows at the cost of computation time. Values must be powers of two |
| `.mapType` | `number` | `UnsignedByteType` | The type of shadow texture |
| `.matrix` | `Matrix4` | — | Model to shadow camera space, to compute location and depth in shadow map. Computed internally during rendering |
| `.needsUpdate` | `boolean` | `false` | When `true`, shadow maps will be updated in the next `render` call. If `autoUpdate` is `false`, set this to `true` and then make a render call to update the shadow |
| `.normalBias` | `number` | `0` | How much the position used to query the shadow map is offset along the object normal. Increasing it can reduce shadow acne, especially in large scenes where light shines onto geometry at a shallow angle. The cost is that shadows may appear distorted |
| `.radius` | `number` | `1` | Values greater than 1 blur the edges of the shadow. High values cause banding; a greater map size allows a higher value. No effect when the shadow map type is `BasicShadowMap` |

## Methods

| Name | Returns | Description |
|------|---------|-------------|
| `.clone()` | `LightShadow` | Returns a new light shadow instance with copied values from this instance |
| `.copy( source : LightShadow )` | `LightShadow` | Copies the values of the given light shadow instance to this instance; returns a reference to this instance |
| `.dispose()` | — | Frees the GPU-related resources allocated by this instance. Call whenever this instance is no longer used in your app |
| `.getCamera( viewportIndex : number )` | `Camera` | Used internally by the renderer to get the camera that renders the given viewport (`viewportIndex` default `0`) |
| `.getFrameExtents()` | `Vector2` | Returns the frame extends |
| `.getFrustum()` | `Frustum` | Gets the shadow camera's frustum. Used internally by the renderer to cull objects |
| `.getViewport( viewportIndex : number )` | `Vector4` | Returns a viewport definition for the given viewport index |
| `.getViewportCount()` | `number` | Used internally by the renderer to get the number of viewports that need to be rendered for this shadow |
| `.toJSON()` | `Object` | Serializes the light shadow into JSON (see `ObjectLoader#parse`) |
| `.updateMatrices( light : Light )` | — | Update the matrices for the camera and shadow, used internally by the renderer |

## Notes

- Abstract; instances are created automatically as `.shadow` of lights such as `DirectionalLight`, `SpotLight`, `PointLight`.
- Source: `src/lights/LightShadow.js`.

## Related

- [DirectionalLightShadow](./DirectionalLightShadow.md)
- [SpotLightShadow](./SpotLightShadow.md)
- [PointLightShadow](./PointLightShadow.md)
- [Light](./Light.md)
