# Badge

A small label component used to highlight an item's status or category.

## Import

```tsx
import { Badge } from "@chakra-ui/react"
```

## Usage

```tsx
<Badge colorPalette="green">Success</Badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"solid" \| "subtle" \| "outline" \| "surface" \| "plain"` | `"subtle"` | Visual variant |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"sm"` | Size of the badge |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **variant**: `"subtle"` (default), `"solid"`, `"outline"`, `"surface"`, `"plain"`
- **size**: `"xs"`, `"sm"` (default), `"md"`, `"lg"`

## Notes

- Icons can be placed as direct children of `Badge` alongside text
- Use `Group attached` to combine two badges into a pill-style compound badge
- `BadgePropsProvider` sets default props for all descendant `Badge` components

## Related

- [Tag](./tag.md)
- [Status](../feedback/status.md)
