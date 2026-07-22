# Clipboard

Enables users to copy text to the clipboard, with built-in copy status feedback and a customizable timeout duration.

## Signature / Usage

```tsx
import { Clipboard } from '@ark-ui/react/clipboard'

export const Basic = () => (
  <Clipboard.Root value="https://ark-ui.com">
    <Clipboard.Label>Copy this link</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Input />
      <Clipboard.Trigger>
        <Clipboard.Indicator copied="Copied" fallback="Copy" />
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
)
```

## Anatomy

- `Clipboard.Root` — container element
- `Clipboard.Label` — text labeling the clipboard input
- `Clipboard.Control` — wrapper for input and trigger
- `Clipboard.Input` — text input field for clipboard content
- `Clipboard.Trigger` — button that initiates the copy action
- `Clipboard.Indicator` — shows copy status/feedback
- `Clipboard.ValueText` — renders the current clipboard value

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Initial value (uncontrolled mode) |
| `timeout` | `number` | `3000` | Duration (ms) the copy status is displayed |
| `onValueChange` | `(details: { value: string }) => void` | — | Callback fired when the value updates |
| `onStatusChange` | `(details: { copied: boolean }) => void` | — | Callback fired on copy operation |

## Notes

- Use `RootProvider` with the `useClipboard` hook, or `useClipboardContext`, to access `copied`, `value`, `setValue()`, `copy()` externally.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [QR Code](./qr-code.md)
