# Field

A flexible container that organizes form inputs alongside labels and contextual helper or error text, supporting multiple input types.

## Anatomy

- `Root` — main container wrapper
- `Label` — label element for the input
- `Input` — standard input field
- `Textarea` — text area element
- `Select` — dropdown selection element
- `HelperText` — supplementary guidance text
- `ErrorText` — validation error messaging
- `RequiredIndicator` — visual marker for required fields

## Signature / Usage

```tsx
import { Field } from '@ark-ui/react/field'

<Field.Root>
  <Field.Label />
  <Field.Input />
  <Field.HelperText />
  <Field.ErrorText />
</Field.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `disabled` | `boolean` | Disables the entire field |
| `invalid` | `boolean` | Marks field as invalid |
| `required` | `boolean` | Indicates required status |
| `readOnly` | `boolean` | Sets read-only mode |
| `ids` | `ElementIds` | Custom ID configuration |
| `autoresize` (`Field.Textarea`) | `boolean` | Auto-expands textarea as user types, default `false` |
| `asChild` (all sub-parts) | `boolean` | Replaces component with provided child element |

## Notes

- `Field.Root` distributes context states (`invalid`, `disabled`, `required`, `readOnly`) to child form elements, enabling coordinated validation and interaction across different input types
- Works with `Fieldset` and most form components (Checkbox, Radio Group, etc.) for enhanced form handling
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Fieldset](./fieldset.md)
- [Checkbox](./checkbox.md)
- [Editable](./editable.md)
