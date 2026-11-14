# ToneMappingNode

Represents a tone mapping operation.

## Signature / Usage

```js
class ToneMappingNode extends Node {
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
| `customCacheKey()` | `number` | Overrides `Node#customCacheKey()` to include the tone mapping type in the cache key |
| `getToneMapping()` | `number` | Gets the tone mapping type |
| `setToneMapping(value)` | `ToneMappingNode` | Sets the tone mapping type |

## Notes

- Source: https://threejs.org/docs/pages/ToneMappingNode.html (three.js r187, `src/nodes/display/ToneMappingNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): extends `Node` instead of `TempNode`; `TempNode` is deprecated in r187 ("Extend Node instead").

## Related

- [RenderOutputNode](./RenderOutputNode.md)
- [ColorSpaceNode](./ColorSpaceNode.md)
