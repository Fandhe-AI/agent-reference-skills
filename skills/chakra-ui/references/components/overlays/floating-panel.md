# Floating Panel

Non-modal floating window that supports drag, resize, and stage (minimize/maximize) interactions.

## Usage

```tsx
import { FloatingPanel } from "@chakra-ui/react"

<FloatingPanel.Root>
  <FloatingPanel.Trigger />
  <FloatingPanel.Positioner>
    <FloatingPanel.Content>
      <FloatingPanel.Header>
        <FloatingPanel.DragTrigger>
          <FloatingPanel.Title />
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Control>
          <FloatingPanel.StageTrigger />
          <FloatingPanel.CloseTrigger />
        </FloatingPanel.Control>
      </FloatingPanel.Header>
      <FloatingPanel.Body />
      <FloatingPanel.ResizeTriggers />
    </FloatingPanel.Content>
  </FloatingPanel.Positioner>
</FloatingPanel.Root>
```

## Options / Props

### FloatingPanel.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `draggable` | `boolean` | `true` | Enable panel dragging |
| `resizable` | `boolean` | `true` | Enable panel resizing |
| `allowOverflow` | `boolean` | `true` | Allow the panel to overflow viewport boundaries |
| `gridSize` | `number` | `1` | Snap grid size for positioning |
| `strategy` | `"absolute" \| "fixed"` | `"fixed"` | Positioning strategy |
| `lazyMount` | `boolean` | `true` | Defer mounting until open |
| `unmountOnExit` | `boolean` | `true` | Remove from DOM when closed |
| `closeOnEscape` | `boolean` | — | Dismiss on Escape key |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state |
| `position` | `Point` | — | Controlled panel position |
| `defaultPosition` | `Point` | — | Initial panel position |
| `size` | `Size` | — | Controlled panel dimensions |
| `defaultSize` | `Size` | — | Initial panel dimensions |
| `minSize` / `maxSize` | `Size` | — | Resize constraints |
| `lockAspectRatio` | `boolean` | — | Maintain aspect ratio when resizing |
| `persistRect` | `boolean` | — | Preserve size/position when closed |
| `getAnchorPosition` | `(details) => Point` | — | Custom initial positioning logic |
| `getBoundaryEl` | `() => HTMLElement` | — | Boundary container reference |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Fires on open/close |
| `onPositionChange` / `onPositionChangeEnd` | `function` | — | Fires during/after drag |
| `onSizeChange` / `onSizeChangeEnd` | `function` | — | Fires during/after resize |
| `onStageChange` | `function` | — | Fires on minimize/maximize/restore |
| `hideMode` | `"display-none" \| "activity"` | `"display-none"` | How kept-mounted content is hidden when closed. `"activity"` uses React 19 `Activity` and pauses effects (requires React 19+) |

## Notes

- Sub-parts: `Root`, `Trigger`, `Positioner`, `Content`, `Header`, `DragTrigger`, `Title`, `Control`, `StageTrigger`, `CloseTrigger`, `Body`, `ResizeTriggers`.
- Stages: `default`, `minimized`, `maximized` — toggled via `StageTrigger`.
- `ResizeTriggers` auto-renders all 8 directional resize handles; use individual `ResizeTrigger` with an `axis` prop for a single handle.
- Pair with `FloatingPanel.RootProvider` and `useFloatingPanel` for external/imperative control.
- 3.36.1: `FloatingPanel.Root` defaults `minSize` to `{ width: 240, height: 100 }` so the panel cannot be resized to zero. Pass your own `minSize` to override it.
- 3.37.0: fixed a closed panel staying on the stack (the next panel now becomes topmost) and stack order not being applied to the positioner (focusing a panel raises it above its siblings).
- Ark UI equivalent: `@ark-ui/react` `FloatingPanel` — this page documents the Chakra UI v3 styled import (`@chakra-ui/react`), not `@ark-ui/react`.

## Related

- [dialog.md](./dialog.md)
- [popover.md](./popover.md)
