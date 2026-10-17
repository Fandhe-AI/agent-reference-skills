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

- Source: https://threejs.org/docs/pages/BumpMapNode.html (three.js r186, `src/nodes/display/BumpMapNode.js`)

## Related

- [NormalMapNode](./NormalMapNode.md)
- [TextureNode](./TextureNode.md)
