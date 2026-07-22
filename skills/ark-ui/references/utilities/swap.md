# Swap

The `Swap` utility animates transitions between two visual states. It renders two indicators stacked in a 1x1 CSS grid, toggled via the `swap` prop with `data-state` attributes driving animations.

## Signature / Usage

```tsx
import { Swap } from '@ark-ui/react/swap'

export const App = () => (
  <Swap.Root swap={isSwapped}>
    <Swap.Indicator type="on">On</Swap.Indicator>
    <Swap.Indicator type="off">Off</Swap.Indicator>
  </Swap.Root>
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `swap` | `boolean` | `false` | Controls the "on" state |
| `lazyMount` | `boolean` | `false` | Enable lazy mounting |
| `unmountOnExit` | `boolean` | `false` | Unmount when not visible |
| `asChild` | `boolean` | — | Use the provided child element as the rendered element |
| `type` (`Swap.Indicator`) | `'on' \| 'off'` | — | Specifies which state the indicator represents |

## Notes

- Target `data-state="open"` / `data-state="closed"` on indicators for custom CSS animations
- Supports fade, flip, rotate, and scale transitions; use `perspective` and `backface-visibility` for flip effects

## Related

- [Presence](./presence.md)
