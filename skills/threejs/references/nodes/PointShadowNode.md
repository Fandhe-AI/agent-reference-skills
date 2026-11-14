# PointShadowNode

Represents the shadow implementation for point light nodes.

## Signature / Usage

```js
class PointShadowNode extends ShadowNode {
	constructor( light, shadow = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `light` | `PointLight` | — | The shadow casting point light |
| `shadow` | `PointLightShadow` | `null` | An optional point light shadow |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getShadowFilterFn(type)` | `function` | Overrides `ShadowNode#getShadowFilterFn` to return point light specific filtering functions |
| `renderShadow(frame)` | `void` | Overrides the default with point light specific rendering code |
| `setupRenderTarget(shadow, builder)` | `Object` | Creates a CubeRenderTarget with CubeDepthTexture; returns an object containing the shadow map and depth texture |
| `setupShadowCoord(builder, shadowPosition)` | `Node<vec3>` | Uses the unaltered shadow position |
| `setupShadowFilter(builder, inputs)` | `Node<float>` | Uses only point light specific shadow filter functions; `inputs` has `filterFn`, `depthTexture`, `shadowCoord`, `shadow` |

## Notes

- Source: https://threejs.org/docs/pages/PointShadowNode.html (three.js r187, `src/nodes/lighting/PointShadowNode.js`; JSDoc from tag r187 / commit 7e89746)
- Inheritance: EventDispatcher > Node > ShadowBaseNode > ShadowNode > PointShadowNode.
- Migration (r186 → r187): the `PointShadowFilter` TSL function takes `{ depthTexture, bd3D, distance, shadow }` (the distance from the light to the fragment) instead of `dp` (the depth value to compare against) and is called with the builder; the cube shadow depth is derived from the largest absolute component of the direction.

## Related

- [ShadowNode](./ShadowNode.md)
- [LightsNode](./LightsNode.md)
