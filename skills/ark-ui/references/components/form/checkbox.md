# Checkbox

A form control element that enables multiple selections within a defined set of options.

## Anatomy

- `Root` — container, renders as `<label>`
- `Control` — visual checkbox container (`<div>`)
- `Indicator` — checked/unchecked visual indicator (`<div>`)
- `Label` — text label (`<span>`)
- `HiddenInput` — native input for form submission

## Signature / Usage

```tsx
import { Checkbox } from '@ark-ui/react/checkbox'

<Checkbox.Root>
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label />
  <Checkbox.HiddenInput />
</Checkbox.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `checked` | `CheckedState` | Controlled checked state |
| `defaultChecked` | `CheckedState` | Initial uncontrolled state |
| `disabled` | `boolean` | Disables interaction |
| `indeterminate` | `boolean` | Partially checked state |
| `invalid` | `boolean` | Validation indicator |
| `name` | `string` | Form submission identifier |
| `value` | `string` | Value submitted with the form, default `'on'` |

## Notes

- Data attributes: `[data-state]` (`checked` \| `unchecked` \| `indeterminate`), `[data-disabled]`, `[data-invalid]`, `[data-focus]`, `[data-readonly]`, `[data-required]`
- `Checkbox.Group` manages multiple checkboxes with collective state, including "select all" and maximum-selection patterns
- Complies with the Checkbox WAI-ARIA design pattern; supports Space key to toggle
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Field](./field.md)
- [Radio Group](./radio-group.md)
