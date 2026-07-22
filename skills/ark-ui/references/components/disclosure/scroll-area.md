# Scroll Area

A custom scrollable area component with styled scrollbars, letting you create scrollable content regions with customizable scrollbar styling.

## Signature / Usage

```tsx
import { ScrollArea } from '@ark-ui/react/scroll-area'

<ScrollArea.Root>
  <ScrollArea.Viewport>
    <ScrollArea.Content />
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar>
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea.Root>
```

## Anatomy

- `ScrollArea.Root` — container wrapper
- `ScrollArea.Viewport` — holds the scrollable content area
- `ScrollArea.Content` — the actual scrollable content
- `ScrollArea.Scrollbar` — the scrollbar track (vertical or horizontal orientation)
- `ScrollArea.Thumb` — the draggable slider element within the scrollbar
- `ScrollArea.Corner` — appears at the intersection of horizontal and vertical scrollbars

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `asChild` | `boolean` | Enables composition by using a provided child element as the default rendered element |
| `ids` | `Partial<object>` | Customizable identifiers for root, viewport, content, scrollbar, and thumb elements |

## Notes

- The native scrollbar on `Viewport` must be hidden via CSS: `scrollbar-width: none` and `&::-webkit-scrollbar { display: none; }` on `[data-scope='scroll-area'][data-part='viewport']`.
- Supports horizontal scrolling, bidirectional scrolling, and nested scroll areas.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Splitter](./splitter.md)
