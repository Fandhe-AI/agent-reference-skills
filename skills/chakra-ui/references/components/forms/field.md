# Field

Wraps form controls with a label, helper text, and error message with proper accessibility associations.

## Import

```tsx
import { Field } from "@chakra-ui/react"
```

## Usage

```tsx
<Field.Root required invalid>
  <Field.Label>Email</Field.Label>
  <Input placeholder="you@example.com" />
  <Field.HelperText>We'll never share your email.</Field.HelperText>
  <Field.ErrorText>Email is required.</Field.ErrorText>
</Field.Root>
```

## Props

### Field.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | — | Disables the field and its control |
| `invalid` | `boolean` | — | Marks the field as invalid |
| `readOnly` | `boolean` | — | Marks the field as read-only |
| `required` | `boolean` | — | Marks the field as required |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Layout orientation |

## Sub-parts

`Root`, `Label`, `HelperText`, `ErrorText`, `ErrorIcon`, `RequiredIndicator`

## Notes

- `Field.ErrorText` is only visible when `invalid` is `true`.
- `Field.RequiredIndicator` renders a `*` marker when `required` is `true`.
- Accessibility attributes (`aria-describedby`, `aria-invalid`, etc.) are applied automatically to child form elements.

## Related

- [fieldset.md](./fieldset.md)
- [input.md](./input.md)
