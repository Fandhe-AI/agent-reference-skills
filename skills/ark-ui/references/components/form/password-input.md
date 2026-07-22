# Password Input

A secure text entry component for sensitive information like passwords and API keys, with built-in visibility toggling and password manager integration controls.

## Anatomy

- `Root` — container wrapper
- `Label` — associated text label
- `Control` — input wrapper housing the field and trigger
- `Input` — the actual text input element
- `VisibilityTrigger` — button to toggle password visibility
- `Indicator` — visual feedback showing current visibility state

## Signature / Usage

```tsx
import { PasswordInput } from '@ark-ui/react/password-input'

<PasswordInput.Root>
  <PasswordInput.Label />
  <PasswordInput.Control>
    <PasswordInput.Input />
    <PasswordInput.VisibilityTrigger>
      <PasswordInput.Indicator />
    </PasswordInput.VisibilityTrigger>
  </PasswordInput.Control>
</PasswordInput.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `autoComplete` | `string` | `'current-password'` or `'new-password'` |
| `visible` | `boolean` | Controlled password visibility state |
| `onVisibilityChange` | `function` | Visibility change callback |
| `invalid` | `boolean` | Marks input as validation failed |
| `disabled` | `boolean` | Disables the entire component |
| `ignorePasswordManagers` | `boolean` | Blocks password managers (1Password, LastPass, Bitwarden, etc.) |

## Notes

- Supports controlled and uncontrolled visibility modes
- Can integrate with password strength libraries for real-time validation feedback
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Pin Input](./pin-input.md)
