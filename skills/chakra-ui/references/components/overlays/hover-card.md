# Hover Card

Popover-style card triggered on hover, for previewing content without navigation.

## Import

```tsx
import { HoverCard } from "@chakra-ui/react"
```

## Usage

```tsx
<HoverCard.Root>
  <HoverCard.Trigger asChild>
    <Link href="#">@username</Link>
  </HoverCard.Trigger>
  <Portal>
    <HoverCard.Positioner>
      <HoverCard.Content>
        <HoverCard.Arrow>
          <HoverCard.ArrowTip />
        </HoverCard.Arrow>
        <Text>User profile information</Text>
      </HoverCard.Content>
    </HoverCard.Positioner>
  </Portal>
</HoverCard.Root>
```

## Props

### HoverCard.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the card |
| `openDelay` | `number` | `600` | Delay in ms before opening |
| `closeDelay` | `number` | `300` | Delay in ms before closing |
| `disabled` | `boolean` | — | Whether the hover card is disabled |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state |
| `positioning` | `PositioningOptions` | — | Floating UI positioning options |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |

## Sub-parts

`Root`, `Trigger`, `Content`, `Positioner`, `Arrow`, `ArrowTip`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`

## Notes

- Renders via `Portal` by default — wrap `Positioner` in `Portal` to avoid clipping.
- Not keyboard-navigable by default; for interactive content use `Popover` instead.

## Related

- [popover.md](./popover.md)
- [tooltip.md](./tooltip.md)
