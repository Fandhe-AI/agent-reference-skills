# MaterialNode

Simplifies node access to material properties via internal reference nodes, so changes to material properties are reflected automatically in predefined TSL objects like `materialColor`.

## Signature / Usage

```js
import { materialColor, materialRoughness } from 'three/tsl';

material.colorNode = materialColor;
```

```js
class MaterialNode extends Node {
	constructor( scope ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scope` | `string` | The material property scope this node refers to |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getCache(property, type)` | `MaterialReferenceNode` | Cached reference node for a property/type |
| `getColor(property)` | `MaterialReferenceNode<color>` | Color-typed reference node |
| `getFloat(property)` | `MaterialReferenceNode<float>` | Float-typed reference node |
| `getTexture(property)` | `MaterialReferenceNode` | Texture-typed reference node |
| `setup(builder)` | `Node` | Builds the node depending on `scope` (overrides `Node#setup`) |

## Related

- [TextureNode](./TextureNode.md)
