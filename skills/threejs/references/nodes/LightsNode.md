# LightsNode

Represents the scene's lighting and manages the lighting model's life cycle for the current build 3D object. Responsible for computing the total outgoing light in a given lighting context.

## Signature / Usage

```js
class LightsNode extends Node {
	constructor() {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `global` | `boolean` | `true` | Overrides `Node#global` |
| `hasLights` | `boolean` | — | Whether the scene has lights |
| `outgoingLightNode` | `Node<vec3>` | — | The outgoing light |
| `totalDiffuseNode` | `Node<vec3>` | — | The total diffuse light |
| `totalSpecularNode` | `Node<vec3>` | — | The total specular light |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `analyze(builder)` | `void` | Analyzes dependencies by building all nested light nodes and the output node |
| `customCacheKey()` | `number` | Includes light data in the cache key |
| `getBuiltinLights()` | `Array<Light>` | The scene's lights; light variations are shader-dependent, so if this array changes the shader must be recreated |
| `getHash(builder)` | `string` | Hash identifying the current light nodes setup |
| `getLights()` | `Array<Light>` | The scene's lights |
| `setLights(lights)` | `LightsNode` | Configures this node with an array of lights |
| `setup(builder)` | `Node<vec3>` | Ensures each light has a light node, builds them and evaluates the lighting model to compute the outgoing light |
| `setupDirectLight(builder, lightNode, lightData)` | `void` | Sets up a direct light in the lighting model |
| `setupDirectRectAreaLight(builder, lightNode, lightData)` | `void` | Sets up a direct rect area light in the lighting model |
| `setupLights(builder, lightNodes)` | `void` | Builds all respective light nodes |
| `setupLightsNode(builder)` | `Array<LightingNode>` | Creates lighting nodes for each scene light |

## Notes

- Source: https://threejs.org/docs/pages/LightsNode.html (three.js r186, `src/nodes/lighting/LightsNode.js`)

## Related

- [ShadowNode](./ShadowNode.md)
- [EnvironmentNode](./EnvironmentNode.md)
- [LightingModel](./LightingModel.md)
