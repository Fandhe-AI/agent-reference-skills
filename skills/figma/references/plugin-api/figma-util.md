# figma.util

Sub-API providing convenience helpers for creating colors and paints from common encodings, and for normalizing markdown strings.

## Signature / Usage

```ts
// Parse a CSS color string to RGB
const red = figma.util.rgb('#FF0000');

// Create a SolidPaint from a hex color
node.fills = [figma.util.solidPaint('#0078FF')];

// Update fill hue while keeping other paint properties
const updatedFill = figma.util.solidPaint('#FF00FF88', node.fills[0] as SolidPaint);

// Normalize markdown for Figma rich-text fields
const md = figma.util.normalizeMarkdown('# Title\n**Bold**');
component.descriptionMarkdown = md;
```

## Options / Props

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `rgb()` | `(color: string \| RGBWithColorSpace \| RGBAWithColorSpace \| ColorWithColorSpace) => RGBWithColorSpace` | Parse color to `RGB` (with optional `sourceColor`); alpha is discarded; throws on invalid input |
| `rgba()` | `(color: string \| RGBWithColorSpace \| RGBAWithColorSpace \| ColorWithColorSpace, alphaOverride?: number) => RGBAWithColorSpace` | Parse color to `RGBA` (with optional `sourceColor`); alpha defaults to `1` if omitted |
| `solidPaint()` | `(color: string \| RGBWithColorSpace \| RGBAWithColorSpace \| ColorWithColorSpace, overrides?: Partial<SolidPaint>) => SolidPaint` | Create a `SolidPaint`; optional overrides preserve other paint fields |
| `normalizeMarkdown()` | `(markdown: string) => string` | Normalize markdown to match what Figma's rich-text editors will render |

## Notes

- `rgb()` and `rgba()` accept CSS strings: hex (`#RGB`, `#RRGGBB`, `#RRGGBBAA`), `rgb()`, `hsl()`, `lab()`, named colors.
- Since Update 141 (typings v1.142.0), colors can be given in `SRGB`, `DISPLAY_P3`, `HSL`, `HSB`, `OKLAB`, or `OKLCH` via `ColorWithColorSpace`, and results carry the original color in `sourceColor?` (see data-types)
- `solidPaint()` is especially useful for updating a fill's color while preserving `blendMode`, `opacity`, etc.
- `normalizeMarkdown()` should be used before assigning to `descriptionMarkdown` to avoid unexpected rendering.

## Related

- [data-types: Paint](./data-types.md)
- [figma global object](./figma-global.md)
