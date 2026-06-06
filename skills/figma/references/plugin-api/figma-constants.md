# figma.constants

Sub-API exposing constant values such as FigJam color palettes.

## Signature / Usage

```ts
// Access FigJam base color palette
const base      = figma.constants.colors.figJamBase;
const baseLight = figma.constants.colors.figJamBaseLight;

// Use a color value
const hexColor = base['yellow']; // e.g. '#FFD966'
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `colors` | `ColorPalettes` | Maps palette names to color-name-to-hex-code records |

### ColorPalettes keys

| Key | Description |
|-----|-------------|
| `figJamBase` | FigJam base color palette |
| `figJamBaseLight` | FigJam base light variant palette |

## Notes

- The `colors` property is primarily useful in FigJam plugins when applying standard palette colors to sticky notes, shapes, and connectors.
- Color values are hex strings (e.g. `'#FFD966'`).

## Related

- [figma global object](./figma-global.md)
- [data-types: ColorPalette](./data-types.md)
