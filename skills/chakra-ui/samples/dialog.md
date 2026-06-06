# Dialog

Open a modal dialog with backdrop, focus trapping, and configurable size/placement.

```tsx
import { Button, Dialog, Portal } from "@chakra-ui/react"

export function ConfirmDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button colorPalette="red" variant="outline">Delete Account</Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete Account</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              This action cannot be undone. All your data will be permanently removed.
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red">Delete</Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

// Controlled dialog
import { useState } from "react"

export function ControlledDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>Controlled content</Dialog.Body>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
```

## Notes

- Always wrap `Dialog.Backdrop` and `Dialog.Positioner` in `Portal` for correct z-index stacking
- `Dialog.ActionTrigger` closes the dialog automatically when clicked
- Use `role="alertdialog"` for destructive confirmations — prevents closing on outside click by default
- `lazyMount` + `unmountOnExit` reduce DOM size when dialog is closed
