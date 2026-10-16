# Popover

An overlay that displays additional information or options when triggered, positioned relative to a trigger element.

## Anatomy

- `Popover.Root` - container wrapper
- `Popover.Trigger` - button that opens/closes the popover
- `Popover.Anchor` - alternative positioning reference element
- `Popover.Positioner` - container for positioning logic
- `Popover.Arrow` / `Popover.ArrowTip` - visual pointer elements
- `Popover.Content` - main overlay container
- `Popover.Title` / `Popover.Description` - content sections
- `Popover.CloseTrigger` - dismiss button
- `Popover.Indicator` - state display element

## Signature / Usage

```jsx
import { Popover } from '@ark-ui/react'

<Popover.Root>
  <Popover.Trigger />
  <Popover.Positioner>
    <Popover.Arrow>
      <Popover.ArrowTip />
    </Popover.Arrow>
    <Popover.Content>
      <Popover.Title />
      <Popover.Description />
      <Popover.CloseTrigger />
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| open | boolean | — | Controlled open state |
| onOpenChange | function | — | Callback when open state changes |
| modal | boolean | false | Traps focus and blocks outside interaction |
| closeOnEscape | boolean | true | Close on Escape key press |
| closeOnInteractOutside | boolean | true | Close when clicking outside |
| autoFocus | boolean | true | Focus first element on open |
| lazyMount | boolean | false | Defer mounting until opened |
| portalled | boolean | true | Render content in a portal layer |
| initialFocusEl | () => HTMLElement \| null \| false | — | Element to focus when the popover opens. May return `false` to skip moving focus (5.39.3) |
| hideMode | HideMode | 'display-none' | How to hide content when mounted but not present. `'display-none'`: HTML `hidden` attribute, effects stay alive. `'activity'`: React 19 `<Activity mode="hidden">`, effects pause, requires React 19+ |
| persistentElements | (() => Element \| null)[] | — | Returns the persistent elements that should not have pointer-events disabled and should not trigger the dismiss event |
| positioning | PositioningOptions | — | Placement configuration, including placement direction and `sameWidth` to match trigger width |

## Notes

- `positioning` accepts `PositioningOptions` (Floating UI-based), including placement side/alignment and `sameWidth` for matching trigger dimensions.
- `initialFocusEl` may return `false` to open without moving focus; returning `null` still uses the default (5.39.3). 5.39.3 also fixed `autoFocus={false}` being ignored for modal popovers.
- The 5.39.3 CHANGELOG added the `false` return value, but the generated types.json still shows `() => HTMLElement | null`; the type above follows the CHANGELOG.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Hover Card](./hover-card.md)
- [Tooltip](./tooltip.md)
