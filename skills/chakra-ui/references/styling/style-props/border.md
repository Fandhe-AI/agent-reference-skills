# Border Style Props

JSX style props for styling borders and border radii, including logical property support for RTL layouts.

## Props

### Border

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `border` | `border` | — |
| `borderWidth` | `border-width` | `borderWidths` |
| `borderStyle` | `border-style` | — |
| `borderColor` | `border-color` | `colors` |
| `borderTop` | `border-top` | — |
| `borderRight` | `border-right` | — |
| `borderBottom` | `border-bottom` | — |
| `borderLeft` | `border-left` | — |
| `borderX` | `border-inline` | — |
| `borderY` | `border-block` | — |

### Border Radius

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `rounded`, `borderRadius` | `border-radius` | `radii` |
| `roundedTop`, `borderTopRadius` | `border-top-radius` | `radii` |
| `roundedBottom`, `borderBottomRadius` | `border-bottom-radius` | `radii` |
| `roundedLeft`, `borderLeftRadius` | `border-left-radius` | `radii` |
| `roundedRight`, `borderRightRadius` | `border-right-radius` | `radii` |
| `roundedStart`, `borderStartRadius` | `border-start-start-radius`, `border-end-start-radius` | `radii` |
| `roundedEnd`, `borderEndRadius` | `border-start-end-radius`, `border-end-end-radius` | `radii` |
| `roundedTopLeft`, `borderTopLeftRadius` | `border-top-left-radius` | `radii` |
| `roundedTopRight`, `borderTopRightRadius` | `border-top-right-radius` | `radii` |
| `roundedBottomRight`, `borderBottomRightRadius` | `border-bottom-right-radius` | `radii` |
| `roundedBottomLeft`, `borderBottomLeftRadius` | `border-bottom-left-radius` | `radii` |

## Examples

```tsx
<Box border="1px solid" borderColor="gray.200" rounded="md" />

// Logical (RTL-friendly)
<Box roundedStart="md" roundedEnd="md" />
```

## Related

- [Effects Style Props](./effects.md)
