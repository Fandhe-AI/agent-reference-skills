# Dialog

Modal dialog with backdrop, focus trapping, and multiple size/placement options.

## Import

```tsx
import { Dialog } from "@chakra-ui/react"
```

## Usage

```tsx
<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Confirm Action</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>Are you sure you want to proceed?</Dialog.Body>
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
```

## Props

### Dialog.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full" \| "cover"` | `"md"` | The size of the dialog |
| `placement` | `"center" \| "top" \| "bottom"` | `"center"` | Vertical placement of the dialog |
| `scrollBehavior` | `"inside" \| "outside"` | `"outside"` | Where overflow content scrolls |
| `motionPreset` | `"scale" \| "slide-in-bottom" \| "slide-in-top" \| "none"` | `"scale"` | Enter/exit animation |
| `role` | `"dialog" \| "alertdialog"` | `"dialog"` | ARIA role |
| `modal` | `boolean` | `true` | Whether to block interaction outside |
| `trapFocus` | `boolean` | `true` | Whether to trap focus inside |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnInteractOutside` | `boolean` | `true` | Close on outside click |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |
| `lazyMount` | `boolean` | `false` | Mount content only when opened |
| `unmountOnExit` | `boolean` | `false` | Unmount content when closed |

## Sub-parts

`Root`, `Trigger`, `Backdrop`, `Positioner`, `Content`, `Header`, `Body`, `Footer`, `Title`, `Description`, `CloseTrigger`, `ActionTrigger`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`, `xl`, `full`, `cover`
- **placements**: `center`, `top`, `bottom`

## Notes

- Always wrap `Dialog.Backdrop` and `Dialog.Positioner` in `Portal` to ensure correct stacking.
- Use `role="alertdialog"` for destructive confirmations — this prevents closing on outside click by default.
- `Dialog.ActionTrigger` closes the dialog when clicked.

## Related

- [drawer.md](./drawer.md)
- [popover.md](./popover.md)
