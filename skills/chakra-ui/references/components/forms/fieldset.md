# Fieldset

Groups related form fields with a legend, helper text, and error message.

## Import

```tsx
import { Fieldset } from "@chakra-ui/react"
```

## Usage

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Shipping Address</Fieldset.Legend>
  <Fieldset.Content>
    <Field.Root>
      <Field.Label>Street</Field.Label>
      <Input />
    </Field.Root>
  </Fieldset.Content>
  <Fieldset.HelperText>All fields are required.</Fieldset.HelperText>
</Fieldset.Root>
```

## Props

### Fieldset.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the fieldset |
| `invalid` | `boolean` | — | Whether the fieldset is invalid |
| `disabled` | `boolean` | — | Whether the fieldset is disabled |

## Sub-parts

`Root`, `Legend`, `Content`, `HelperText`, `ErrorText`

## Variants / Sizes

- **sizes**: `sm`, `md`, `lg`

## Notes

- `Fieldset.ErrorText` only renders visibly when `invalid` is `true`.
- Renders a native `<fieldset>` element for proper form grouping semantics.

## Related

- [field.md](./field.md)
