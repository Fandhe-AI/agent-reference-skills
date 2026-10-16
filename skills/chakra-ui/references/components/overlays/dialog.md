# Dialog

Modal dialog with backdrop, focus trapping, and multiple size/placement options.

## Usage

```tsx
import { Dialog } from "@chakra-ui/react"

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

### Multiple Triggers

Don't mount a dialog per row. Put `value` on each `Trigger` under one `Root`. Read `triggerValue` from context to fill the title and body.

```tsx
<Dialog.Root>
  {Object.entries(people).map(([id, name]) => (
    <Dialog.Trigger asChild key={id} value={id}>
      <Button variant="outline" size="sm">Edit {name}</Button>
    </Dialog.Trigger>
  ))}
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Context>
          {(api) => {
            const name = people[api.triggerValue as keyof typeof people]
            return (
              <Dialog.Header>
                <Dialog.Title>Edit {name}</Dialog.Title>
              </Dialog.Header>
            )
          }}
        </Dialog.Context>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
```

### Initial Focus

Add `data-autofocus` and `data-no-autofocus` to pick what gets focus when the dialog opens, without `initialFocusEl` and a ref. Mark chrome like the close button to skip it, or mark the real target directly.

```tsx
<Dialog.Content>
  <Dialog.CloseTrigger data-no-autofocus />
  <input data-autofocus />
  <button>Save</button>
</Dialog.Content>
```

Focus goes to `initialFocusEl`, then `[data-autofocus]`, then the first tabbable element without `[data-no-autofocus]`, then the content root.

## Options / Props

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
| `hideMode` | `"display-none" \| "activity"` | `"display-none"` | How kept-mounted content is hidden when closed. `"activity"` uses React 19 `Activity` and pauses effects (requires React 19+); ignored with `unmountOnExit` |
| `triggerValue` | `string` | — | Controlled active trigger value (multiple triggers) |
| `onTriggerValueChange` | `(details: TriggerValueChangeDetails) => void` | — | Called when the active trigger changes |
| `finalFocusEl` | `() => MaybeElement` | — | Element to receive focus when the dialog is closed |
| `restoreFocus` | `boolean` | — | Whether to restore focus to the element that had focus before the dialog was opened |
| `persistentElements` | `(() => Element \| null)[]` | — | Elements that should not have pointer-events disabled and should not trigger the dismiss event |

### Dialog.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | The value that identifies this specific trigger |

## Notes

- Sub-parts: `Root`, `Trigger`, `Backdrop`, `Positioner`, `Content`, `Header`, `Body`, `Footer`, `Title`, `Description`, `CloseTrigger`, `ActionTrigger`.
- Sizes: `xs`, `sm`, `md`, `lg`, `xl`, `full`, `cover`. Placements: `center`, `top`, `bottom`.
- Always wrap `Dialog.Backdrop` and `Dialog.Positioner` in `Portal` to ensure correct stacking.
- Use `role="alertdialog"` for destructive confirmations — this prevents closing on outside click by default.
- `Dialog.ActionTrigger` closes the dialog when clicked.
- 3.37.0: `Dialog.ActionTrigger` now runs the `onClick` handler passed to it before the dialog closes, and has `type="button"` (no unintended form submission inside a `<form>`).
- 3.37.0: scroll lock now works on layouts where `<html>` is the scroll container (it previously targeted `<body>` only).
- 3.37.0: Next.js 15 production builds no longer fail on the optional React `Activity` export; `hideMode="activity"` falls back to `display-none` when the React build does not expose it.

## Related

- [drawer.md](./drawer.md)
- [popover.md](./popover.md)
