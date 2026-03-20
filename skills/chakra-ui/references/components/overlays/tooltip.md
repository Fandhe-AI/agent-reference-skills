# Tooltip

Small informational label that appears on hover or focus of a trigger element.

## Import

```tsx
import { Tooltip } from "@chakra-ui/react"
```

## Usage

```tsx
<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Portal>
    <Tooltip.Positioner>
      <Tooltip.Content>
        <Tooltip.Arrow>
          <Tooltip.ArrowTip />
        </Tooltip.Arrow>
        Helpful information
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Portal>
</Tooltip.Root>
```

## Props

### Tooltip.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `openDelay` | `number` | `400` | Delay in ms before opening |
| `closeDelay` | `number` | `150` | Delay in ms before closing |
| `disabled` | `boolean` | — | Whether the tooltip is disabled |
| `interactive` | `boolean` | `false` | Whether the tooltip content is interactive (hoverable) |
| `closeOnClick` | `boolean` | `true` | Close on trigger click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnPointerDown` | `boolean` | `true` | Close on pointer down |
| `closeOnScroll` | `boolean` | — | Close when the page scrolls |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state |
| `positioning` | `PositioningOptions` | — | Floating UI positioning options |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |

## Sub-parts

`Root`, `Trigger`, `Content`, `Positioner`, `Arrow`, `ArrowTip`

## Notes

- Tooltip content should be purely informational — do not place interactive elements inside unless `interactive={true}`.
- Wrap `Tooltip.Positioner` in `Portal` to prevent clipping by overflow containers.
- For a click-triggered tooltip-style element, use `ToggleTip` instead.

## Related

- [toggle-tip.md](./toggle-tip.md)
- [hover-card.md](./hover-card.md)
- [popover.md](./popover.md)
