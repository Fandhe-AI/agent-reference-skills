# ColorSpaceNode

Represents a color space conversion: converts a color value from a source to a target color space.

## Signature / Usage

```js
class ColorSpaceNode extends TempNode {
	constructor( colorNode, source, target ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `colorNode` | `Node` | The color to convert |
| `source` | `string` | The source color space |
| `target` | `string` | The target color space |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `resolveColorSpace(builder, colorSpace)` | `string` | Resolves the constants `WORKING_COLOR_SPACE` and `OUTPUT_COLOR_SPACE` based on the current color management and renderer configuration |

## Notes

- Source: `src/nodes/display/ColorSpaceNode.js` (three.js r186 docs).

## Related

- [RenderOutputNode](./RenderOutputNode.md)
- [ToneMappingNode](./ToneMappingNode.md)
