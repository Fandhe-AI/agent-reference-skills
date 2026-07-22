# Toggle

A two-state button that can be toggled on or off, with controlled state management and a visual indicator for pressed/unpressed states.

## Signature / Usage

```tsx
import { Toggle } from '@ark-ui/react/toggle'

<Toggle.Root pressed={isPressed} onPressedChange={setIsPressed}>
  <Toggle.Indicator fallback="Off">On</Toggle.Indicator>
</Toggle.Root>
```

## Anatomy

- `Toggle.Root` — the main button container
- `Toggle.Indicator` — visual element that displays state-based content

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `asChild` | `boolean` | Use the provided child element as the rendered element, merging props and behavior |
| `defaultPressed` | `boolean` | Sets the initial pressed state (uncontrolled) |
| `onPressedChange` | `(pressed: boolean) => void` | Callback triggered when pressed state changes |
| `pressed` | `boolean` | Controls the current pressed state |

## Notes

- Data attributes: `[data-scope="toggle"]`, `[data-part="root"]`, `[data-state]` (`"on" | "off"`), `[data-pressed]`, `[data-disabled]`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Toggle Group](./toggle-group.md)
