# Switch

A control element that allows for a binary selection, functioning as a toggle for form submissions and state management.

## Anatomy

- `Root` — wrapper label element
- `Control` — container span for the toggle mechanism
- `Thumb` — moving indicator span
- `Label` — text description span
- `HiddenInput` — native input element for form data

## Signature / Usage

```tsx
import { Switch } from '@ark-ui/react/switch'

<Switch.Root>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label />
  <Switch.HiddenInput />
</Switch.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `checked` | `boolean` | Controlled checked state |
| `onCheckedChange` | `function` | Callback handler for toggle events |
| `disabled` | `boolean` | Disables interaction |
| `name` | `string` | Form submission name |
| `value` | `string` | Form submission value |
| `required` | `boolean` | Marks as required in forms |
| `readOnly` | `boolean` | Prevents modification |

## Notes

- `Root` renders as a `<label>` for proper form association and accessibility
- Use `asChild` with caution — ensure the label remains a direct `Root` child
- Supports controlled and uncontrolled patterns via `RootProvider` + `useSwitch` hook
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Checkbox](./checkbox.md)
