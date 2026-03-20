# Layer Styles

Pre-configured design compositions combining multiple CSS properties into reusable semantic style sets.

## Built-in Layer Styles

### Fill Styles

Apply background fills with corresponding text colors using the color palette system.

| Style | Description |
|-------|-------------|
| `fill.muted` | Muted palette background with foreground text |
| `fill.subtle` | Subtle palette background with foreground text |
| `fill.surface` | Subtle background with a 1px border shadow effect |
| `fill.solid` | Solid palette background with contrasting text |

### Outline Styles

Outline variants are also available in the `outline.*` namespace.

## Usage

```tsx
<Box layerStyle="fill.muted" colorPalette="blue" />
<Box layerStyle="fill.surface" />
```

## Notes

- Layer styles leverage Chakra's CSS variable system
- Fill styles use `background: var(--chakra-colors-color-palette-[variant])` and `color: var(--chakra-colors-color-palette-fg)`
- Implement flexbox layouts for centering content
- Applied through the `layerStyle` prop

## Related

- [Text Styles](./text-styles.md)
- [Colors](../design-tokens/colors.md)
