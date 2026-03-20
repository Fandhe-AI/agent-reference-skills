# Popover

Floating interactive panel anchored to a trigger element.

## Import

```tsx
import { Popover } from "@chakra-ui/react"
```

## Usage

```tsx
<Popover.Root>
  <Popover.Trigger asChild>
    <Button>Open Popover</Button>
  </Popover.Trigger>
  <Portal>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Header>
          <Popover.Title>Title</Popover.Title>
        </Popover.Header>
        <Popover.Body>Popover content goes here.</Popover.Body>
        <Popover.CloseTrigger />
      </Popover.Content>
    </Popover.Positioner>
  </Portal>
</Popover.Root>
```

## Props

### Popover.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the popover |
| `modal` | `boolean` | `false` | Whether to block interaction outside |
| `autoFocus` | `boolean` | `true` | Whether to auto-focus the first interactive element |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnInteractOutside` | `boolean` | `true` | Close on outside click |
| `portalled` | `boolean` | `true` | Whether to render in a portal |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state |
| `positioning` | `PositioningOptions` | `{ placement: "bottom" }` | Floating UI positioning options |
| `lazyMount` | `boolean` | `false` | Mount content only when opened |
| `unmountOnExit` | `boolean` | `false` | Unmount content when closed |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |

## Sub-parts

`Root`, `Trigger`, `Anchor`, `Content`, `Positioner`, `Arrow`, `ArrowTip`, `Body`, `Header`, `Footer`, `Title`, `Description`, `CloseTrigger`, `Indicator`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`

## Notes

- Unlike `Tooltip`, `Popover` supports interactive content (buttons, forms, links) inside.
- Use `Popover.Anchor` to anchor the popover to a different element than the trigger.
- Wrap `Popover.Positioner` in `Portal` to prevent overflow clipping.

## Related

- [tooltip.md](./tooltip.md)
- [hover-card.md](./hover-card.md)
- [dialog.md](./dialog.md)
