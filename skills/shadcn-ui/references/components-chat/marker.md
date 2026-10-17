---
source: https://ui.shadcn.com/docs/components/base/marker
---

# Marker

Displays an inline status, system note, bordered row, or labeled separator in a conversation. Compose it with Message in a conversation thread.

## Signature / Usage

```bash
npx shadcn@latest add marker
```

Manual install: copy the component source into `components/ui/marker.tsx` and update the import paths.

```tsx
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
```

```tsx
<Marker>
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>
```

Composition:

```text
Marker
├── MarkerIcon
└── MarkerContent
```

Streaming status (announced by assistive tech):

```tsx
<Marker role="status">
  <MarkerIcon>
    <Spinner />
  </MarkerIcon>
  <MarkerContent>Compacting conversation</MarkerContent>
</Marker>
```

## Options / Props

### Marker

The file also exports `markerVariants` for composing the marker styles into custom components.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "border" \| "separator"` | `"default"` | The marker layout. |
| `render` | `ReactElement \| function` | - | Render as a different element, such as a link. |
| `className` | `string` | - | Additional classes to apply to the root element. |

### MarkerIcon

A decorative icon slot, hidden from assistive tech with `aria-hidden`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | Additional classes to apply to the icon slot. |

### MarkerContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | Additional classes to apply to the content slot. |

### Variants

| Variant | Description |
| --- | --- |
| `default` | An inline marker for status, notes, and actions. |
| `border` | A default marker with a bottom border under the row. |
| `separator` | A centered label with divider lines on each side. |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- `Marker` is presentational by default. For streaming or progress markers set `role="status"`; `Marker` forwards `role` to the underlying element.
- A labeled separator needs no role. Do not add `role="separator"` to a labeled divider: a separator takes its accessible name from `aria-label`, so the visible label would not be announced.
- For an icon-only marker provide an `aria-label` or visible text. Interactive markers should use `render` with a real `<a>` or `<button>`.
- Add the `shimmer` utility class to `MarkerContent` for an animated streaming-text effect (the utility ships with the `shadcn` package; see the shimmer page of the theming category). Use `className="flex-col"` on `Marker` to stack the icon above the content.
- A Checkpoint (AI Elements) is a separator with a button that restores the thread to that point.
- Base UI uses `render`; the Radix variant (https://ui.shadcn.com/docs/components/radix/marker) uses `asChild` in its examples. A React Aria variant exists at https://ui.shadcn.com/docs/components/aria/marker.

## Related

- [message.md](./message.md)
- [message-scroller.md](./message-scroller.md)
