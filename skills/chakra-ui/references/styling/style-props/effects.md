# Effects Style Props

JSX style props for styling box shadows, opacity, and blend modes.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `shadow`, `boxShadow` | `box-shadow` | `shadows` |
| `shadowColor` | `--shadow-color` | `colors` |
| `opacity` | `opacity` | `opacity` |
| `mixBlendMode` | `mix-blend-mode` | — |

## Examples

```tsx
// Token-based shadow
<Box shadow="lg" />

// Custom shadow
<Box shadow="12px 12px 2px 1px rgba(0, 0, 255, .2)" />

// Shadow with color token
<Box shadow="60px -16px var(--shadow-color)" shadowColor="red.400" />

// Opacity
<Box opacity="0.5" />

// Mix blend mode
<Box mixBlendMode="multiply" />
```

## Related

- [Background Style Props](./background.md)
- [Filters Style Props](./filters.md)
