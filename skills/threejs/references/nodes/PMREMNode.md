# PMREMNode

Represents a PMREM, a special type of preprocessed environment map intended for PBR materials.

## Signature / Usage

```js
const material = new MeshStandardNodeMaterial();
material.envNode = pmremTexture( envMap );
```

```js
class PMREMNode extends TempNode {
	constructor( value, uvNode = null, levelNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Texture` | — | The input texture (the node's texture value) |
| `uvNode` | `Node<vec2>` | `null` | The uv node |
| `levelNode` | `Node<float>` | `null` | The level node |
| `updateBeforeType` | `string` | `'render'` | `NodeUpdateType.RENDER` (overrides `TempNode#updateBeforeType`) |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `updateFromTexture(texture)` | `void` | Uses the given PMREM texture to update internal values |

## Notes

- Source: `src/nodes/pmrem/PMREMNode.js` (three.js r186 docs).

## Related

- [EnvironmentNode](./EnvironmentNode.md)
- [TextureNode](./TextureNode.md)
