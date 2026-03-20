# Link

A styled anchor element for navigation.

## Import

```tsx
import { Link } from "@chakra-ui/react"
```

## Usage

```tsx
<Link href="#">Visit Chakra UI</Link>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"underline" \| "plain"` | `"plain"` | Visual style |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `as` | `React.ElementType` | `a` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

Accepts all standard HTML anchor attributes (`href`, `target`, `rel`, etc.).

## Variants / Sizes

- `variant="plain"` — no underline by default (default)
- `variant="underline"` — always underlined

## Notes

- Use `asChild` with router `Link` components for client-side navigation:
  ```tsx
  <Link asChild><NextLink href="/page">Page</NextLink></Link>
  ```
- For clickable card/container areas, use [`LinkOverlay`](./link-overlay.md) + `LinkBox`

## Related

- [LinkOverlay](./link-overlay.md)
- [Text](./text.md)
