# Overlay Manager

Programmatic API for opening, closing, and updating overlays (dialogs, drawers, etc.) imperatively.

## Import

```tsx
import { createOverlay } from "@chakra-ui/react"
```

## Usage

```tsx
// 1. Create an overlay instance (once, at module level or in a provider)
const overlay = createOverlay(
  (props: { title: string; onConfirm: () => void }) => (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{props.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Footer>
              <Button onClick={props.onConfirm}>Confirm</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
)

// 2. Render the viewport in your app root
function App() {
  return (
    <>
      <overlay.Viewport />
      {/* rest of app */}
    </>
  )
}

// 3. Use imperatively anywhere
async function handleDelete() {
  await overlay.open({ title: "Confirm Delete", onConfirm: doDelete })
}
```

## API

| Method | Signature | Description |
|--------|-----------|-------------|
| `createOverlay` | `(Component) => overlay` | Creates an overlay controller |
| `overlay.open` | `(props?) => Promise<void>` | Opens the overlay, returns promise that resolves on close |
| `overlay.close` | `() => void` | Closes the overlay |
| `overlay.update` | `(props) => void` | Updates the overlay's props while open |
| `overlay.waitForExit` | `() => Promise<void>` | Waits for exit animation to complete |
| `overlay.Viewport` | React component | Must be rendered in the app to mount overlays |

## Notes

- The component passed to `createOverlay` automatically receives `open` and `onOpenChange` props injected by the overlay controller.
- `overlay.open()` returns a `Promise` that resolves when the overlay closes — useful for `await`-style confirmation flows.
- Place `<overlay.Viewport />` once near the root of the app (e.g., in a layout or provider).

## Related

- [dialog.md](./dialog.md)
- [drawer.md](./drawer.md)
