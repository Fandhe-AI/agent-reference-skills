# Tag

A small interactive label component used for categorization or filtering, with optional close button.

## Import

```tsx
import { Tag } from "@chakra-ui/react"
```

## Usage

```tsx
<Tag.Root>
  <Tag.StartElement>
    <LuCircleUser />
  </Tag.StartElement>
  <Tag.Label>Profile</Tag.Label>
  <Tag.EndElement>
    <Tag.CloseTrigger />
  </Tag.EndElement>
</Tag.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"subtle" \| "solid" \| "outline" \| "surface"` | `"surface"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size of the tag |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **variant**: `"surface"` (default), `"subtle"`, `"solid"`, `"outline"`
- **size**: `"sm"`, `"md"` (default), `"lg"`, `"xl"`

## Notes

- `Tag.Label` is the main text content
- `Tag.StartElement` / `Tag.EndElement` wrap icons or avatars placed before/after the label
- `Tag.CloseTrigger` is a close button placed inside `Tag.EndElement`
- Use `asChild` on `Tag.Root` to render as a `<button>` or other element
- Use `rounded="full"` for pill-shaped tags with avatar `size="full"` inside `Tag.StartElement`

## Related

- [Badge](./badge.md)
- [Avatar](./avatar.md)
