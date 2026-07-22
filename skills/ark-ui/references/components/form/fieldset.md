# Fieldset

Organizes a set of form controls optionally grouped under a common name, providing shared `invalid`/`disabled` context for child form elements.

## Anatomy

- `Root` — the main `<fieldset>` wrapper element
- `Legend` — a `<legend>` element for the fieldset title
- `HelperText` — a `<span>` for supplementary information
- `ErrorText` — a `<span>` for validation messages

## Signature / Usage

```tsx
import { Fieldset } from '@ark-ui/react/fieldset'

<Fieldset.Root>
  <Fieldset.Legend />
  <Fieldset.HelperText />
  <Fieldset.ErrorText />
</Fieldset.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `invalid` | `boolean` | Marks fieldset as invalid |
| `asChild` (all sub-parts) | `boolean` | Composition support, uses provided child as rendered element |

## Notes

- Works with both native HTML elements (via the `Field` component) and Ark UI components
- State management is accessible via `RootProvider` and the `useFieldset` hook for external control
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Field](./field.md)
- [Checkbox](./checkbox.md)
