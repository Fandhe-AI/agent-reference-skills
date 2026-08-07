# UniformNode

Represents a uniform value in the TSL node-based material system. Extends `InputNode`.

## Signature / Usage

```js
class UniformNode extends InputNode {
	constructor( value, nodeType = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any` | — | JS primitive or three.js object (vector, matrix, color, texture) |
| `nodeType` | `string` | `null` | Explicit type; inferred from `value` if omitted |
| `groupNode` | `UniformGroupNode` | — | Uniform group; groups can be updated per frame/render call instead of per object |
| `isUniformNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `name` | `string` | `''` | Overrides `InputNode#name` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getGroup()` | `UniformGroupNode` | Returns the uniform's group |
| `getUniformHash(builder)` | `string` | Returns the uniform's hash |
| `setGroup(group)` | `UniformNode` | Sets `groupNode` |
| `setName(name)` | `UniformNode` | Sets `name` |
| `label(name)` | `UniformNode` | Deprecated alias for `setName()` |

## Related

- [Node](./Node.md)
- [TextureNode](./TextureNode.md)
