# ScrollArea

A custom scrollable container with styled scrollbars. Composed of `ScrollArea.Root`, `ScrollArea.Viewport`, `ScrollArea.Content`, `ScrollArea.Scrollbar`, `ScrollArea.Thumb`, and `ScrollArea.Corner`.

## Import

```tsx
import { ScrollArea } from "@chakra-ui/react"
```

## Usage

```tsx
<ScrollArea.Root height="8.5rem" maxW="lg">
  <ScrollArea.Viewport>
    <ScrollArea.Content spaceY="4" textStyle="sm">
      {/* content */}
    </ScrollArea.Content>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar>
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea.Root>
```

## Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"hover" \| "always"` | `"hover"` | When to show the scrollbar |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Scrollbar size |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `ids` | `Partial<{...}>` | — | Custom element IDs for composition |
| `unstyled` | `boolean` | — | Remove component styles |

## Variants / Sizes

- `variant="hover"` — scrollbar appears on hover (default)
- `variant="always"` — scrollbar always visible
- Sizes: `xs`, `sm`, `md`, `lg`

## Notes

- For horizontal scrolling, add `<ScrollArea.Scrollbar orientation="horizontal" />`
- For both directions, include two `Scrollbar` components with different orientations
- Use `useScrollArea()` hook with `RootProvider` for programmatic scrolling
- Supports virtualization with `@tanstack/react-virtual`

## Related

- [Box](./box.md)
- [Splitter](./splitter.md)
