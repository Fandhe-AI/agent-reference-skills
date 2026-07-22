# Tooltip

A label that provides information on hover or focus, complying with the WAI-ARIA tooltip design pattern.

## Anatomy

- `Tooltip.Root` - container
- `Tooltip.Trigger` - activator element
- `Tooltip.Positioner` - positioning wrapper
- `Tooltip.Arrow` / `Tooltip.ArrowTip` - optional directional indicator
- `Tooltip.Content` - message display area

## Signature / Usage

```jsx
import { Tooltip } from '@ark-ui/react'

<Tooltip.Root>
  <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>I am a Tooltip!</Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| open | boolean | — | Controlled open state |
| openDelay | number | 400 | Milliseconds delay before showing |
| closeDelay | number | 150 | Milliseconds delay before hiding |
| closeOnClick | boolean | true | Close on click behavior |
| closeOnEscape | boolean | true | Escape key closes the tooltip |
| interactive | boolean | false | Keep content open while hovering it |
| positioning | PositioningOptions | — | Placement configuration |
| disabled | boolean | — | Disable the tooltip |

## Notes

- Multiple triggers can share one tooltip via the `value` prop.
- Set `positioning.strategy` to `"fixed"` for fixed-container scenarios.
- Keyboard: Tab opens/closes; Escape closes when open.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Popover](./popover.md)
- [Hover Card](./hover-card.md)
