# Toggle Group

A set of two-state buttons that can be toggled on or off, letting users switch between active and inactive states across multiple button options.

## Signature / Usage

```tsx
import { ToggleGroup } from '@ark-ui/react/toggle-group'

<ToggleGroup.Root value={value} onValueChange={(details) => setValue(details.value)}>
  <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
  <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
</ToggleGroup.Root>
```

## Anatomy

- `ToggleGroup.Root` — container wrapper (`<div>`)
- `ToggleGroup.Item` — individual toggle button (`<button>`)

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `string[]` | Controlled selected value of the toggle group |
| `defaultValue` | `string[]` | Initial selection when uncontrolled |
| `multiple` | `boolean` | Enables multiple toggles to be selected at once |
| `deselectable` | `boolean` (default: `true`) | Allows empty selection |
| `disabled` | `boolean` | Disables the entire group |
| `orientation` | `'horizontal' \| 'vertical'` | Layout direction (default: `'horizontal'`) |
| `rovingFocus` | `boolean` (default: `true`) | Uses roving tab index for focus management |
| `loopFocus` | `boolean` (default: `true`) | Loops focus within the group |
| `onValueChange` | `function` | Callback triggered when selection changes |

## Notes

- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Toggle](./toggle.md)
- [Tabs](./tabs.md)
