# BumpMapNode

Applies bump maps to materials.

## Signature / Usage

```js
material.normalNode = bumpMap( texture( bumpTex ) );
```

```js
class BumpMapNode extends Node {
	constructor( textureNode, scaleNode = null, normalNode = normalView ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `textureNode` | `Node<float>` | — | The bump map data |
| `scaleNode` | `Node<float>` | `null` | Controls the intensity of the bump effect |
| `normalNode` | `Node<vec3>` | `normalView` | The view-space normal to perturb |

## Notes

- Source: https://threejs.org/docs/pages/BumpMapNode.html (three.js r187, `src/nodes/display/BumpMapNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): extends `Node` instead of `TempNode`; `TempNode` is deprecated in r187 ("Extend Node instead").
- Migration (r186 → r187): the `bumpMap()` TSL function accepts a third argument, `normalNode`, the view-space normal to perturb (defaults to `normalView`) (https://github.com/mrdoob/three.js/pull/35101).

## Related

- [NormalMapNode](./NormalMapNode.md)
- [TextureNode](./TextureNode.md)
