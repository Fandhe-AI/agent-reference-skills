# Typography Style Props

JSX style props for controlling text appearance including font, size, weight, spacing, and decoration.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `fontFamily` | `font-family` | `fonts` |
| `fontSize` | `font-size` | `fontSizes` |
| `fontWeight` | `font-weight` | `fontWeights` |
| `fontStyle` | `font-style` | — |
| `fontVariantNumeric` | `font-variant-numeric` | — |
| `lineHeight` | `line-height` | `lineHeights` |
| `letterSpacing` | `letter-spacing` | `letterSpacings` |
| `textAlign` | `text-align` | — |
| `textDecoration` | `text-decoration` | — |
| `textDecorationColor` | `text-decoration-color` | `colors` |
| `textTransform` | `text-transform` | — |
| `textOverflow` | `text-overflow` | — |
| `textShadow` | `text-shadow` | `shadows` |
| `textStyle` | — (composition) | `textStyles` |
| `truncate` | `overflow` + `text-overflow` | — |
| `whiteSpace` | `white-space` | — |
| `wordBreak` | `word-break` | — |
| `noOfLines` | `overflow` + `-webkit-line-clamp` | — |

## Examples

```tsx
// Individual props
<Text fontSize="4xl" fontWeight="semibold" letterSpacing="tight">
  Heading
</Text>

// Font family token
<Text fontFamily="mono">console.log("hello")</Text>

// Composition via textStyle
<Text textStyle="2xl">Large styled text</Text>

// Truncate text
<Text truncate maxW="200px">Long text that will be truncated...</Text>

// Line clamp
<Text noOfLines={2}>
  Multi-line text that clamps after two lines...
</Text>
```

## Notes

- `textStyle` applies a predefined combination of font size, line height, and letter spacing from the theme
- `truncate` is a utility prop that sets `overflow: hidden` and `text-overflow: ellipsis`
- `noOfLines` uses `-webkit-line-clamp` for multi-line truncation

## Related

- [Text Styles](../compositions/text-styles.md)
- [List Style Props](./list.md)
