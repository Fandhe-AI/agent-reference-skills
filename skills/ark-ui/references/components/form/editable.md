# Editable

Allows users to edit text content in place, toggling between a read-only preview and an editable input field.

## Anatomy

- `Root` — main container
- `Label` — associated label element
- `Area` — wrapper containing input and preview
- `Input` — text input field
- `Preview` — read-only display text
- `Control` — container for action buttons
- `EditTrigger` — button to enter edit mode
- `SubmitTrigger` — button to save changes
- `CancelTrigger` — button to discard changes

## Signature / Usage

```tsx
import { Editable } from '@ark-ui/react/editable'

<Editable.Root>
  <Editable.Label />
  <Editable.Area>
    <Editable.Input />
    <Editable.Preview />
  </Editable.Area>
  <Editable.Control>
    <Editable.EditTrigger />
    <Editable.SubmitTrigger />
    <Editable.CancelTrigger />
  </Editable.Control>
</Editable.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `activationMode` | `'focus' \| 'dblclick' \| 'click' \| 'none'` | Controls how edit mode activates |
| `autoResize` | `boolean` | Auto-grows input as content changes |
| `maxLength` | `number` | Sets character limit |
| `submitMode` | `'enter' \| 'blur' \| 'both' \| 'none'` | Defines what triggers submission |
| `value` | `string` | Controlled value |
| `onValueChange` | `function` | Controlled state callback |
| `disabled` | `boolean` | Disables editing |
| `readOnly` | `boolean` | Prevents modification |
| `required` | `boolean` | Marks as required |

## Notes

- Enter saves and exits edit mode; Escape discards changes and exits
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Field](./field.md)
