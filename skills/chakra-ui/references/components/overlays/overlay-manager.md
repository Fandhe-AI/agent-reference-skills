# Overlay Manager

Programmatic API for opening, closing, and updating overlays (dialogs, drawers, etc.) imperatively.

## Usage

```tsx
import { createOverlay } from "@chakra-ui/react"

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
  await overlay.open("confirm-delete", { title: "Confirm Delete", onConfirm: doDelete })
}
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `createOverlay` | `createOverlay<Props, TReturn>(Component) => overlay` | Creates an overlay controller |
| `overlay.Viewport` | React component | The root component that renders all active overlays; render it once in the app |
| `overlay.open` | `(id, props) => Promise` | Opens a new overlay with the given id and props; the promise resolves with the value passed to `close()` |
| `overlay.close` | `(id, value) => Promise` | Closes the overlay with the given id; the promise resolves when closed |
| `overlay.update` | `(id, props) => void` | Updates the props of the overlay with the given id |
| `overlay.remove` | `(id) => void` | Removes the overlay with the given id |
| `overlay.removeAll` | `() => void` | Removes all overlays |
| `overlay.get` | `(id) => props` | Gets the props of the overlay with the given id |
| `overlay.getSnapshot` | `() => snapshot` | Gets the current snapshot of the overlays |
| `overlay.waitForExit` | `(id) => Promise` | Waits for the exit animation to complete for the overlay with the given id |
| `overlay.has` | `has(...)` | Added in 3.36.1 (the docs page does not document its signature) |

### Return Value

Awaiting the result of `.open()` returns the value passed to `.close()`. Use the `TReturn` generic (3.37.0) to type it:

```ts
interface DialogResult {
  message: string
}

const dialog = createOverlay<DialogProps, DialogResult>(Component)

const result = await dialog.open("id", props)
if (result) {
  console.log(result.message)
}
```

## Notes

- The component passed to `createOverlay` automatically receives `open`, `onOpenChange` and `onExitComplete` props injected by the overlay controller.
- Awaiting `overlay.open(id, props)` resolves when the overlay closes with the value passed to `close(id, value)` — useful for `await`-style confirmation flows.
- Place `<overlay.Viewport />` once near the root of the app (e.g., in a layout or provider).
- 3.37.0: `createOverlay<Props, TReturn>` — `TReturn` defaults to `unknown`, so untyped `open()` calls may need narrowing. The result can also be `undefined`, since `close(id, value)` doesn't require a value.
- 3.36.1: `createOverlay` return value gained `has()`.
- 3.35.0: fixed `document.body` scroll lock and `pointer-events` not being restored when overlays are used under React `StrictMode`.

## Related

- [dialog.md](./dialog.md)
- [drawer.md](./drawer.md)
