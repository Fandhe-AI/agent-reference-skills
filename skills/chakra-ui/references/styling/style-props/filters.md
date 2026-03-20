# Filters Style Props

JSX style props for applying CSS filter functions to elements.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `filter` | `filter` | — |
| `blur` | `--blur` | `blurs` |
| `contrast` | `--contrast` | — |
| `dropShadow` | `--drop-shadow` | — |
| `grayscale` | `--grayscale` | — |
| `hueRotate` | `--hue-rotate` | — |
| `invert` | `--invert` | — |
| `saturate` | `--saturate` | — |

## Examples

```tsx
// Direct CSS filter
<Box filter="blur(5px)" />
<Box filter="grayscale(80%)" />

// Using filter="auto" with individual props
<Box filter="auto" blur="sm" />
<Box filter="auto" blur="5px" />
<Box filter="auto" contrast="0.3" />
<Box filter="auto" dropShadow="0px 0px 10px rgba(0,0,0,0.5)" />
<Box filter="auto" hueRotate="30deg" />
<Box filter="auto" grayscale="80%" />
```

## Notes

- Individual filter props (`blur`, `contrast`, `grayscale`, etc.) require `filter="auto"` to take effect
- The `blur` prop supports token values from the `blurs` token category (e.g., `"sm"`, `"md"`)

## Related

- [Effects Style Props](./effects.md)
- [Transforms Style Props](./transforms.md)
