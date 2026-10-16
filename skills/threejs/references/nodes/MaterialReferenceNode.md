# MaterialReferenceNode

A special reference node linking material properties with node values. When `material.opacity` changes, the value of `opacityNode` is updated automatically.

## Signature / Usage

```js
const opacityNode = materialReference( 'opacity', 'float', material );
```

```js
class MaterialReferenceNode extends ReferenceNode {
	constructor( property, inputType, material = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `property` | `string` | — | Name of the property the node refers to |
| `inputType` | `string` | — | Uniform type used to represent the property value |
| `material` | `Material` | `null` | The material the property belongs to; when not set, the node refers to the material of the currently rendered object |
| `isMaterialReferenceNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `updateReference(state)` | `Object` | Updates the reference from the state; evaluated only when `material` is not set |

## Notes

- Source: `src/nodes/accessors/MaterialReferenceNode.js` (three.js r186 docs).

## Related

- [ReferenceNode](./ReferenceNode.md)
- [MaterialNode](./MaterialNode.md)
