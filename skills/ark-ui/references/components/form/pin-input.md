# Pin Input

A component for pin or verification codes with auto-focus transfer and masking options.

## Anatomy

- `Root` — container element
- `Label` — associated label
- `Control` — wrapper for input fields
- `Input` — individual pin input fields
- `HiddenInput` — hidden input for form submission

## Signature / Usage

```tsx
import { PinInput } from '@ark-ui/react/pin-input'

<PinInput.Root>
  <PinInput.Label />
  <PinInput.Control>
    <PinInput.Input />
  </PinInput.Control>
  <PinInput.HiddenInput />
</PinInput.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `count` | `number` | Number of inputs to render |
| `type` | `'numeric' \| 'alphanumeric' \| 'alphabetic'` | Value type |
| `mask` | `boolean` | Masks values like a password input |
| `otp` | `boolean` | Enables "one-time-code" autocomplete |
| `blurOnComplete` | `boolean` | Blurs input when all fields complete |
| `placeholder` | `string` | Field placeholder, default `'○'` |
| `onValueChange` | `function` | Fires on value change |
| `onValueComplete` | `function` | Fires when all fields filled |
| `onValueInvalid` | `function` | Fires on invalid input |

## Notes

- Auto-focus transfer between fields, paste support (Ctrl+V), and keyboard navigation (Arrow keys, Backspace)
- Form integration via the `Field` component or `RootProvider`
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Password Input](./password-input.md)
