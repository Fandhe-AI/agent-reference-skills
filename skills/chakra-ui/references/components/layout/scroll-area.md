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
| `ids` | `Partial<{ root, viewport, content, scrollbar, thumb }>` | — | Custom element IDs for composition |
| `unstyled` | `boolean` | — | Remove component styles |

## Notes

- `variant="hover"` shows the scrollbar on hover (default); `variant="always"` keeps it visible. Sizes: `xs`, `sm`, `md`, `lg`
- Scroll shadow: show edge shadows using `mask-image`. Use the `data-overflow-y` attribute to only show shadows when content actually overflows, so they do not appear with a single item or no scrollable content:

```tsx
<ScrollArea.Viewport
  css={{
    "--scroll-shadow-size": "4rem",
    maskImage: "linear-gradient(#000, #000)",
    "&[data-overflow-y]": {
      maskImage:
        "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
      "&[data-at-top]": {
        maskImage:
          "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
      },
      "&[data-at-bottom]": {
        maskImage:
          "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
      },
    },
  }}
>
  <ScrollArea.Content spaceY="4">{/* items */}</ScrollArea.Content>
</ScrollArea.Viewport>
```

- For horizontal scrolling, add `<ScrollArea.Scrollbar orientation="horizontal" />`
- For both directions, include two `Scrollbar` components with different orientations
- Use `useScrollArea()` hook with `RootProvider` for programmatic scrolling
- Supports virtualization with `@tanstack/react-virtual`

## Related

- [Box](./box.md)
- [Splitter](./splitter.md)
