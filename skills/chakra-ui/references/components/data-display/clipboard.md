# Clipboard

A component that copies text to the clipboard with visual feedback.

## Import

```tsx
import { Clipboard } from "@chakra-ui/react"
```

## Usage

```tsx
<Clipboard.Root value="https://chakra-ui.com">
  <Clipboard.Trigger asChild>
    <IconButton variant="surface" size="xs">
      <Clipboard.Indicator />
    </IconButton>
  </Clipboard.Trigger>
</Clipboard.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value to copy |
| `defaultValue` | `string` | — | Initial value (uncontrolled) |
| `timeout` | `number` | `3000` | Duration in ms to show "copied" state |
| `onStatusChange` | `(details: CopyStatusDetails) => void` | — | Callback when copy status changes |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when value changes |

### Indicator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `copied` | `ReactNode` | — | Content shown after copying (e.g. a checkmark icon or "Copied") |

## Notes

- `Clipboard.Trigger` wraps the clickable element; use `asChild` to render as a custom button
- `Clipboard.Indicator` toggles between its children (idle state) and `copied` prop (copied state)
- `Clipboard.Input` renders a read-only input showing the value; use `asChild` to render as a custom input
- `Clipboard.ValueText` displays the current value as text
- Use `useClipboard({ value })` for a headless imperative API (`clipboard.copy()`, `clipboard.copied`)

## Related

- [Tag](./tag.md)
