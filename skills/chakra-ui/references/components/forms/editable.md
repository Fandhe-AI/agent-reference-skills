# Editable

Inline text editing that toggles between a display and an input state.

## Import

```tsx
import { Editable } from "@chakra-ui/react"
```

## Usage

```tsx
<Editable.Root defaultValue="Click to edit">
  <Editable.Preview />
  <Editable.Input />
  <Editable.Control>
    <Editable.EditTrigger>Edit</Editable.EditTrigger>
    <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
    <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
  </Editable.Control>
</Editable.Root>
```

## Props

### Editable.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the editable |
| `defaultValue` | `string` | — | Initial value |
| `value` | `string` | — | Controlled value |
| `activationMode` | `"focus" \| "dblclick" \| "none"` | `"focus"` | How editing is activated |
| `submitMode` | `"blur" \| "enter" \| "none" \| "both"` | `"enter"` | When to submit the value |
| `autoResize` | `boolean` | `false` | Whether input auto-resizes |
| `disabled` | `boolean` | — | Whether the editable is disabled |
| `readOnly` | `boolean` | — | Whether the editable is read-only |
| `invalid` | `boolean` | — | Whether the editable is invalid |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when value changes |
| `onValueCommit` | `(details: ValueChangeDetails) => void` | — | Callback when value is committed |

## Sub-parts

`Root`, `Preview`, `Input`, `Textarea`, `Control`, `EditTrigger`, `CancelTrigger`, `SubmitTrigger`

## Variants / Sizes

- **sizes**: `sm`, `md`, `lg`

## Notes

- Use `Editable.Textarea` instead of `Editable.Input` for multiline editing.
- `activationMode: "none"` disables click-to-edit; use `EditTrigger` to control it programmatically.

## Related

- [input.md](./input.md)
- [textarea.md](./textarea.md)
