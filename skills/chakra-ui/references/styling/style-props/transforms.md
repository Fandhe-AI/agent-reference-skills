# Transforms Style Props

JSX style props for transforming elements via scale, rotate, and translate.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `scale` | `scale` | — |
| `scaleX` | `--scale-x` | — |
| `scaleY` | `--scale-y` | — |
| `rotate` | `rotate` | — |
| `rotateX` | `--rotate-x` | — |
| `rotateY` | `--rotate-y` | — |
| `translate` | `translate` | — |
| `translateX` | `--translate-x` | — |
| `translateY` | `--translate-y` | — |
| `transformOrigin` | `transform-origin` | — |
| `transform` | `transform` | — |

## Examples

```tsx
// Scale
<Box scale="1.2" />
<Box scale="auto" scaleX="1.3" scaleY="0.4" />

// Rotate
<Box rotate="45deg" />
<Box rotateX="45deg" />
<Box rotateY="45deg" />

// Translate
<Box translate="40px" />
<Box translate="50% -40%" />
<Box translate="auto" translateX="50%" translateY="-10px" />
```

## Notes

- `scaleX` and `scaleY` require `scale="auto"` to take effect
- `translateX` and `translateY` require `translate="auto"` to take effect

## Related

- [Transitions Style Props](./transitions.md)
- [Filters Style Props](./filters.md)
