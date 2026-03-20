# Icon

A wrapper component for rendering SVG icons with consistent sizing and color.

## Import

```tsx
import { Icon } from "@chakra-ui/react"
```

## Usage

```tsx
<Icon size="lg" color="pink.700">
  <HiHeart />
</Icon>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"inherit" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"inherit"` | Size of the icon |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |
| `as` | `React.ElementType` | — | Render as a specific component (e.g. an icon component directly) |
| `asChild` | `boolean` | — | Use child element as the root, merging props |

## Variants / Sizes

- **size**: `"inherit"` (default), `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"2xl"`

## Notes

- Pass an icon component as a child: `<Icon><HiHeart /></Icon>`
- Alternatively use `as` prop: `<Icon as={HiHeart} size="lg" />`
- Use `asChild` with a custom SVG: `<Icon asChild><svg>...</svg></Icon>`
- Use `createIcon()` to define reusable custom icons with a `path` and `viewBox`

## Related

- [Badge](./badge.md)
