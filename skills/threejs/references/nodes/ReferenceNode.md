# ReferenceNode

Establishes a reference to a property of another object, so the node's value is automatically linked to the referenced object's value. Reference nodes internally represent the linked value as a uniform.

## Signature / Usage

```js
class ReferenceNode extends Node {
	constructor( property, uniformType, object = null, count = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `property` | `string` | — | Name of the property the node refers to; may contain dots for nested properties |
| `uniformType` | `string` | — | Uniform type used to represent the property value |
| `object` | `Object` | `null` | The object the property belongs to |
| `count` | `number` | `null` | Length when the linked property is array-like |
| `group` | `UniformGroupNode` | `null` | Uniform group of the internal uniform |
| `name` | `string` | `null` | Optional label of the internal uniform node |
| `node` | `UniformNode` | `null` | Uniform node holding the value |
| `properties` | `Array<string>` | — | Hierarchy of the dotted property name |
| `reference` | `Object` | `null` | The current referred object; may be updated by calling code |
| `updateType` | `string` | `'object'` | Updated per object |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `element(indexNode)` | `ReferenceElementNode` | Access elements via an index node when the property is array-like |
| `generateNodeType(builder)` | `string` | Node type inferred from the reference node's type |
| `getValueFromReference(object = this.reference)` | `any` | Property value from the given object |
| `label(name)` | `ReferenceNode` | Sets the label of the internal uniform (deprecated) |
| `setGroup(group)` | `ReferenceNode` | Sets the uniform group |
| `setName(name)` | `ReferenceNode` | Sets the name of the internal uniform |
| `setNodeType(uniformType)` | `void` | Sets the node type, which defines the internal uniform type |
| `setup(builder)` | `UniformNode` | Output is the internal uniform node |
| `update(frame)` | `void` | Updates the internal uniform value |
| `updateReference(state)` | `Object` | Updates the reference from the given state; the state is only evaluated when `object` is not set |
| `updateValue()` | `void` | Retrieves the property value and updates the internal uniform |

## Notes

- `label()` is marked deprecated in the r186 docs; use `setName()`.
- Source: https://threejs.org/docs/pages/ReferenceNode.html (three.js r186, `src/nodes/accessors/ReferenceNode.js`)

## Related

- [MaterialReferenceNode](./MaterialReferenceNode.md)
- [UniformNode](./UniformNode.md)
