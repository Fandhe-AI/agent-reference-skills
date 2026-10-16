# ShadowNode

Represents the default shadow implementation for lighting nodes.

## Signature / Usage

```js
class ShadowNode extends ShadowBaseNode {
	constructor( light, shadow = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `light` | `Light` | — | The shadow casting light |
| `shadow` | `LightShadow` | `null` | Defines the properties of the light's shadow |
| `depthLayer` | `number` (readonly) | — | Index usable when overriding `setupRenderTarget` with a RenderTarget Array to specify the depth layer |
| `isShadowNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `shadowMap` | `RenderTarget` | `null` | Reference to the shadow map |
| `vsmMaterialHorizontal` | `NodeMaterial` | `null` | VSM only: material for the second VSM pass |
| `vsmMaterialVertical` | `NodeMaterial` | `null` | VSM only: material for the first VSM pass |
| `vsmShadowMapHorizontal` | `RenderTarget` | `null` | VSM only: render target for the second pass |
| `vsmShadowMapVertical` | `RenderTarget` | `null` | VSM only: render target for the first pass |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `dispose()` | `void` | Frees internal resources |
| `getShadowFilterFn(type)` | `function` | Shadow filtering function for the shadow type |
| `renderShadow(frame)` | `void` | Renders the shadow; separate from `updateShadow` so specialized nodes can override shadow map rendering |
| `setup(builder)` | `ShaderCallNodeInternal` | Sets up the output node; only produces output if shadow mapping is globally enabled in the renderer |
| `setupShadow(builder)` | `Node<vec3>` | Sets up the shadow output node |
| `setupShadowCoord(builder, shadowPosition)` | `Node<vec3>` | Sets up the shadow coordinates |
| `setupShadowFilter(builder, inputs)` | `Node<float>` | Sets up shadow filtering; `inputs` has `filterFn`, `depthTexture`, `shadowCoord`, `shadow` |
| `updateBefore(frame)` | `void` | Updates the shadow map if necessary |
| `updateShadow(frame)` | `void` | Updates the shadow |
| `vsmPass(renderer)` | `void` | Additional render passes required for VSM |

## Notes

- Source: `src/nodes/lighting/ShadowNode.js` (three.js r186 docs).
- Inheritance: EventDispatcher > Node > ShadowBaseNode > ShadowNode.

## Related

- [PointShadowNode](./PointShadowNode.md)
- [LightsNode](./LightsNode.md)
