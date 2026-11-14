# EnvironmentNode

Represents a physical model for Image-based lighting (IBL). The environment is defined by an equirectangular or cube texture. Intended for PBR materials like `MeshStandardNodeMaterial`.

## Signature / Usage

```js
class EnvironmentNode extends LightingNode {
	constructor( envNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `envNode` | `Node` | `null` | A node representing the environment |

## Notes

- Source: https://threejs.org/docs/pages/EnvironmentNode.html (three.js r187, `src/nodes/lighting/EnvironmentNode.js`; JSDoc from tag r187 / commit 7e89746)
- Inheritance: EventDispatcher > Node > LightingNode > EnvironmentNode.
- Migration (r186 → r187): the environment texture (including the one of a material reference environment) is resolved in `updateBefore()` before rendering, since materials with different environments can share a shader (https://github.com/mrdoob/three.js/pull/35036). The PMREM is based on a cube render target now (see [PMREMNode](./PMREMNode.md)).

## Related

- [PMREMNode](./PMREMNode.md)
- [LightsNode](./LightsNode.md)
