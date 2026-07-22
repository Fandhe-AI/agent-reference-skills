# Avatar

A graphical representation of the user, often used in profile sections. Displays a user's profile image and falls back to a placeholder (initials, icon) when the image fails to load.

## Signature / Usage

```tsx
import { Avatar } from '@ark-ui/react/avatar'

export const Basic = () => (
  <Avatar.Root>
    <Avatar.Fallback>NM</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar.Root>
)
```

## Anatomy

- `Avatar.Root` — main container (`<div>`)
- `Avatar.Image` — the actual image element (`<img>`)
- `Avatar.Fallback` — displayed when the image fails to load or is loading (`<span>`)

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ids` | `Partial<Record<string, string>>` | Custom ids for internal elements |
| `onStatusChange` | `(details: { status: "loading" \| "loaded" \| "error" }) => void` | Callback fired when the image loading status changes |
| `asChild` (Root/Image/Fallback) | `boolean` | Renders the provided child element instead of the default one, merging its own props |

## Notes

- `data-state` (`"hidden"` \| `"visible"`) on `Image`/`Fallback` tracks which part is currently shown.
- `useAvatar` / `RootProvider` allow externalizing state: exposes `loaded`, `setSrc()`, `setLoaded()`, `setError()`.
- Works well with framework-specific image components (e.g. Next.js `Image`) by managing visibility via `data-state`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Clipboard](./clipboard.md)
