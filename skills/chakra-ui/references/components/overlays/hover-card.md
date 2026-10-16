# Hover Card

Popover-style card triggered on hover, for previewing content without navigation.

## Usage

```tsx
import { HoverCard } from "@chakra-ui/react"

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

### Multiple Triggers

Don't mount a hover card per link. Put `value` on each `Trigger` under one `Root`. Hover another trigger and the same card moves to it.

```tsx
<HoverCard.Root size="sm">
  <HoverCard.Trigger asChild value="ananya">
    <Link href="#">@ananya</Link>
  </HoverCard.Trigger>
  <HoverCard.Trigger asChild value="jules">
    <Link href="#">@jules</Link>
  </HoverCard.Trigger>
  <Portal>
    <HoverCard.Positioner>
      <HoverCard.Content maxWidth="240px">
        <HoverCard.Arrow />
        <HoverCard.Context>
          {(api) => <Text textStyle="sm">{people[api.triggerValue as keyof typeof people]}</Text>}
        </HoverCard.Context>
      </HoverCard.Content>
    </HoverCard.Positioner>
  </Portal>
</HoverCard.Root>
```

## Options / Props

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
| `hideMode` | `"display-none" \| "activity"` | `"display-none"` | How kept-mounted content is hidden when closed. `"activity"` uses React 19 `Activity` and pauses effects (requires React 19+) |
| `triggerValue` | `string` | — | Controlled trigger value (multiple triggers) |
| `onTriggerValueChange` | `(details: TriggerValueChangeDetails) => void` | — | Called when the trigger value changes |

### HoverCard.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | The value that identifies this specific trigger |

## Notes

- Sub-parts: `Root`, `Trigger`, `Content`, `Positioner`, `Arrow`, `ArrowTip`.
- Sizes: `xs`, `sm`, `md`, `lg`.
- Renders via `Portal` by default — wrap `Positioner` in `Portal` to avoid clipping.
- Not keyboard-navigable by default; for interactive content use `Popover` instead.

## Related

- [popover.md](./popover.md)
- [tooltip.md](./tooltip.md)
