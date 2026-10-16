# NormalMapNode

Applies normal maps to materials.

## Signature / Usage

```js
material.normalNode = normalMap( texture( normalTex ) );
```

```js
class NormalMapNode extends TempNode {
	constructor( node, scaleNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `node` | `Node<vec3>` | — | The normal map data |
| `scaleNode` | `Node<vec2>` | `null` | Controls the intensity of the effect |
| `normalMapType` | `TangentSpaceNormalMap \| ObjectSpaceNormalMap` | `TangentSpaceNormalMap` | The normal map type |
| `unpackNormalMode` | `string` | `NoNormalPacking` | How to unpack the sampled normal map values |

## Notes

- Source: `src/nodes/display/NormalMapNode.js` (three.js r186 docs).

## Related

- [BumpMapNode](./BumpMapNode.md)
- [TextureNode](./TextureNode.md)
