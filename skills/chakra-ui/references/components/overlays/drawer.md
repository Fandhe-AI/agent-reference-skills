# Drawer

Slide-in panel from any edge of the viewport, similar to Dialog.

## Usage

```tsx
import { Drawer } from "@chakra-ui/react"

<Drawer.Root placement="end">
  <Drawer.Trigger asChild>
    <Button>Open Drawer</Button>
  </Drawer.Trigger>
  <Portal>
    <Drawer.Backdrop />
    <Drawer.Positioner>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Settings</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>Drawer content here.</Drawer.Body>
        <Drawer.Footer>
          <Button>Save</Button>
        </Drawer.Footer>
        <Drawer.CloseTrigger />
      </Drawer.Content>
    </Drawer.Positioner>
  </Portal>
</Drawer.Root>
```

### Initial Focus

Add `data-autofocus` and `data-no-autofocus` to pick what gets focus when the drawer opens. Focus goes to `initialFocusEl`, then `[data-autofocus]`, then the first tabbable element without `[data-no-autofocus]`, then the content root.

```tsx
<Drawer.Content>
  <Drawer.CloseTrigger data-no-autofocus />
  <input data-autofocus />
</Drawer.Content>
```

## Options / Props

### Drawer.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | The size (width/height) of the drawer |
| `placement` | `"start" \| "end" \| "top" \| "bottom"` | `"end"` | Which edge the drawer slides in from |
| `contained` | `boolean` | `false` | Constrain the drawer within its parent element |
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
| `finalFocusEl` | `() => MaybeElement` | — | Element to receive focus when the drawer is closed |
| `restoreFocus` | `boolean` | — | Whether to restore focus to the element that had focus before the drawer was opened |
| `persistentElements` | `(() => Element \| null)[]` | — | Elements that should not have pointer-events disabled and should not trigger the dismiss event |

### Drawer.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | The value that identifies this specific trigger |

## Notes

- Sub-parts: `Root`, `Trigger`, `Backdrop`, `Positioner`, `Content`, `Header`, `Body`, `Footer`, `Title`, `Description`, `CloseTrigger`, `ActionTrigger`.
- Sizes: `xs`, `sm`, `md`, `lg`, `xl`, `full`. Placements: `start`, `end`, `top`, `bottom`.
- Shares sub-part structure with `Dialog`.
- Set `contained={true}` to render the drawer within a positioned parent container rather than the viewport.
- 3.37.0: `Drawer.ActionTrigger` now runs the `onClick` handler passed to it before the drawer closes, and has `type="button"`.
- 3.37.0: scroll lock now works on layouts where `<html>` is the scroll container.

## Related

- [dialog.md](./dialog.md)
