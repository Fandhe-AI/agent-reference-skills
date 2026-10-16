# EnvironmentNode

Represents a physical model for Image-based lighting (IBL). The environment is defined via environment maps in equirectangular, cube map or cubeUV (PMREM) format. Intended for PBR materials like `MeshStandardNodeMaterial`.

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

- Source: `src/nodes/lighting/EnvironmentNode.js` (three.js r186 docs).
- Inheritance: EventDispatcher > Node > LightingNode > EnvironmentNode.

## Related

- [PMREMNode](./PMREMNode.md)
- [LightsNode](./LightsNode.md)
