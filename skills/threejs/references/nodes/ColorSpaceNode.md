# ColorSpaceNode

Represents a color space conversion: converts a color value from a source to a target color space.

## Signature / Usage

```js
class ColorSpaceNode extends Node {
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

- Source: https://threejs.org/docs/pages/ColorSpaceNode.html (three.js r187, `src/nodes/display/ColorSpaceNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): extends `Node` instead of `TempNode`; `TempNode` is deprecated in r187 ("Extend Node instead").

## Related

- [RenderOutputNode](./RenderOutputNode.md)
- [ToneMappingNode](./ToneMappingNode.md)
