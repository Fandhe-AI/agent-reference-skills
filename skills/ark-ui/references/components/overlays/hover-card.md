# Hover Card

Displays content when a user hovers over a trigger element, typically used for previews of linked content.

## Anatomy

- `HoverCard.Root` - container
- `HoverCard.Trigger` - hover target
- `HoverCard.Positioner` - positioning wrapper
- `HoverCard.Arrow` / `HoverCard.ArrowTip` - optional pointer
- `HoverCard.Content` - displayed content

## Signature / Usage

```jsx
import { HoverCard } from '@ark-ui/react'

<HoverCard.Root>
  <HoverCard.Trigger />
  <HoverCard.Positioner>
    <HoverCard.Arrow>
      <HoverCard.ArrowTip />
    </HoverCard.Arrow>
    <HoverCard.Content />
  </HoverCard.Positioner>
</HoverCard.Root>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| open | boolean | — | Controlled open state |
| openDelay | number | 600 | Milliseconds before the hover card opens |
| closeDelay | number | 300 | Milliseconds before the hover card closes |
| disabled | boolean | — | Disables the component |
| hideMode | HideMode | 'display-none' | How to hide content when mounted but not present. `'display-none'`: HTML `hidden` attribute, effects stay alive. `'activity'`: React 19 `<Activity mode="hidden">`, effects pause, requires React 19+ (5.38.0) |
| positioning | PositioningOptions | — | Controls placement and distance from trigger |

## Notes

- Multiple triggers can share one hover card.
- Context is accessible via the `useHoverCardContext` hook.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Popover](./popover.md)
- [Tooltip](./tooltip.md)
