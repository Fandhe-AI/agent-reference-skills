# Dialog

A modal window that appears on top of the main content, used for focused interactions or confirmations.

## Anatomy

- `Dialog.Root` - container wrapping the entire component
- `Dialog.Trigger` - button that opens the dialog
- `Dialog.Backdrop` - overlay behind the dialog content
- `Dialog.Positioner` - positioning wrapper
- `Dialog.Content` - main dialog container
- `Dialog.Title` - heading element
- `Dialog.Description` - description text
- `Dialog.CloseTrigger` - close button

## Signature / Usage

```jsx
import { Dialog } from '@ark-ui/react'

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Dialog content here</Dialog.Description>
      <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| open | boolean | — | Controlled open state |
| onOpenChange | function | — | Callback when open state changes |
| closeOnEscape | boolean | true | Allow Escape key to close |
| closeOnInteractOutside | boolean | true | Allow outside clicks to close |
| modal | boolean | true | Trap focus and block outside interaction |
| role | 'dialog' \| 'alertdialog' | 'dialog' | Semantic role |
| initialFocusEl | function | — | Element to receive focus on open |
| lazyMount | boolean | false | Render content only when opened |

## Notes

- Prefer `lazyMount` with `unmountOnExit` to free resources when closed, rather than conditionally rendering `Dialog.Root`.
- Alert dialogs (`role="alertdialog"`) automatically focus the cancel button and cannot close via outside clicks.
- Focus trapping is enabled by default; disable with `modal={false}` for non-modal dialogs.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Drawer](./drawer.md)
- [Popover](./popover.md)
