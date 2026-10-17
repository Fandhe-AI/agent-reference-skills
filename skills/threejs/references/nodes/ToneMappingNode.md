# ToneMappingNode

Represents a tone mapping operation.

## Signature / Usage

```js
class ToneMappingNode extends TempNode {
	constructor( toneMapping, exposureNode, colorNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `toneMapping` | `number` | — | The tone mapping type |
| `exposureNode` | `Node` | `null` | The tone mapping exposure |
| `colorNode` | `Node` | `null` | The color to process |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `customCacheKey()` | `number` | Overrides `TempNode#customCacheKey()` to include the tone mapping type in the cache key |
| `getToneMapping()` | `number` | Gets the tone mapping type |
| `setToneMapping(value)` | `ToneMappingNode` | Sets the tone mapping type |

## Notes

- Source: https://threejs.org/docs/pages/ToneMappingNode.html (three.js r186, `src/nodes/display/ToneMappingNode.js`)

## Related

- [RenderOutputNode](./RenderOutputNode.md)
- [ColorSpaceNode](./ColorSpaceNode.md)
