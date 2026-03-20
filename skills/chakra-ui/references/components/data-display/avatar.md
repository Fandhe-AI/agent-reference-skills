# Avatar

A component that represents a user with an image or fallback initials/icon.

## Import

```tsx
import { Avatar, AvatarGroup } from "@chakra-ui/react"
```

## Usage

```tsx
<Avatar.Root>
  <Avatar.Fallback name="Segun Adebayo" />
  <Avatar.Image src="https://bit.ly/sage-adebayo" />
</Avatar.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"full" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Size of the avatar |
| `variant` | `"solid" \| "subtle" \| "outline"` | `"subtle"` | Visual variant |
| `shape` | `"square" \| "rounded" \| "full"` | `"full"` | Shape of the avatar |
| `borderless` | `"true" \| "false"` | — | Whether to remove border |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette for fallback background |
| `onStatusChange` | `(details: StatusChangeDetails) => void` | — | Callback when image load status changes |

### Fallback

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Name to derive initials from; omit to show generic icon |

## Variants / Sizes

- **variant**: `"subtle"` (default), `"solid"`, `"outline"`
- **shape**: `"full"` (default), `"rounded"`, `"square"`
- **size**: `"2xs"`, `"xs"`, `"sm"`, `"md"` (default), `"lg"`, `"xl"`, `"2xl"`, `"full"`

## Notes

- `Avatar.Image` renders the photo; `Avatar.Fallback` shows when the image fails or has no `src`
- `AvatarGroup` stacks multiple avatars with overlap; use `stacking="last-on-top"` or `"first-on-top"`
- Place a `Float` + `Circle` on `Avatar.Root` to add an online/offline badge overlay
- Use `useAvatar()` hook with `Avatar.RootProvider` for external state control

## Related

- [Badge](./badge.md)
- [Tag](./tag.md)
