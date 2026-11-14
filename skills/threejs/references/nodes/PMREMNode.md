# PMREMNode

Represents a PMREM, a special type of preprocessed environment map intended for PBR materials.

## Signature / Usage

```js
const material = new MeshStandardNodeMaterial();
material.envNode = pmremTexture( envMap );
```

```js
class PMREMNode extends Node {
	constructor( value, uvNode = null, levelNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Texture` | — | The input texture (the node's texture value) |
| `uvNode` | `Node<vec3>` | `null` | The uv node (the sampling direction) |
| `levelNode` | `Node<float>` | `null` | The level node |
| `updateBeforeType` | `string` | `'render'` | `NodeUpdateType.RENDER` (overrides `Node#updateBeforeType`) |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `updateFromTexture(texture)` | `void` | Uses the given PMREM texture to update internal values |

## Notes

- Source: https://threejs.org/docs/pages/PMREMNode.html (three.js r187, `src/nodes/pmrem/PMREMNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): extends `Node` instead of `TempNode`; `TempNode` is deprecated in r187 ("Extend Node instead").
- Migration (r186 → r187): PMREMs are based on cube render targets now; `CubeUVReflectionMapping` has been removed and the quality of PMREMs improved, so materials look slightly different (https://github.com/mrdoob/three.js/pull/34585). Internally the node samples a `CubeTextureNode` using the mip level from `roughnessToMip( roughness, maxLod )` instead of the cubeUV atlas; `uvNode` is a `vec3` direction.

## Related

- [EnvironmentNode](./EnvironmentNode.md)
- [TextureNode](./TextureNode.md)
