# SVG Style Props

JSX style props for styling SVG elements using Chakra's design token system.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `fill` | `fill` | `colors` |
| `stroke` | `stroke` | `colors` |
| `strokeWidth` | `stroke-width` | `borderWidths` |

## Examples

```tsx
// Fill color
<chakra.svg fill="blue.500">
  <path d="..." />
</chakra.svg>

// Stroke color
<chakra.svg stroke="blue.500">
  <path d="..." />
</chakra.svg>

// Stroke width
<chakra.svg strokeWidth="1px">
  <path d="..." />
</chakra.svg>

// Combined
<chakra.svg fill="none" stroke="currentColor" strokeWidth="2px">
  <path d="..." />
</chakra.svg>
```

## Related

- [Background Style Props](./background.md)
- [Border Style Props](./border.md)
