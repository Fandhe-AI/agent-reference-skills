# BumpMapNode

Applies bump maps to materials.

## Signature / Usage

```js
material.normalNode = bumpMap( texture( bumpTex ) );
```

```js
class BumpMapNode extends TempNode {
	constructor( textureNode, scaleNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `textureNode` | `Node<float>` | — | The bump map data |
| `scaleNode` | `Node<float>` | `null` | Controls the intensity of the bump effect |

## Notes

- Source: `src/nodes/display/BumpMapNode.js` (three.js r186 docs).

## Related

- [NormalMapNode](./NormalMapNode.md)
- [TextureNode](./TextureNode.md)
