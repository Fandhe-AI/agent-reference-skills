# Floating Panel

Displays content in a non-modal floating window, supporting drag, resize, and stage (minimize/maximize) interactions.

## Anatomy

- `FloatingPanel.Root` - main container
- `FloatingPanel.Trigger` - opens the panel
- `FloatingPanel.Positioner` - manages positioning
- `FloatingPanel.Content` - panel container with state attributes
- `FloatingPanel.DragTrigger` - enables dragging
- `FloatingPanel.Header` - top section with title and controls
- `FloatingPanel.Title` - panel heading
- `FloatingPanel.Control` - button group area
- `FloatingPanel.StageTrigger` - minimize/maximize button
- `FloatingPanel.CloseTrigger` - close button
- `FloatingPanel.Body` - main content area
- `FloatingPanel.ResizeTrigger` - resize handle

## Signature / Usage

```jsx
import { FloatingPanel } from '@ark-ui/react'

<FloatingPanel.Root>
  <FloatingPanel.Trigger />
  <FloatingPanel.Positioner>
    <FloatingPanel.Content>
      <FloatingPanel.DragTrigger>
        <FloatingPanel.Header>
          <FloatingPanel.Title />
          <FloatingPanel.Control>
            <FloatingPanel.StageTrigger />
            <FloatingPanel.CloseTrigger />
          </FloatingPanel.Control>
        </FloatingPanel.Header>
      </FloatingPanel.DragTrigger>
      <FloatingPanel.Body />
      <FloatingPanel.ResizeTrigger />
    </FloatingPanel.Content>
  </FloatingPanel.Positioner>
</FloatingPanel.Root>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| open | boolean | — | Controlled open state |
| position | Point | — | Controlled panel position |
| size | Size | — | Panel dimensions |
| draggable | boolean | true | Enable dragging |
| resizable | boolean | true | Enable resizing |
| minSize / maxSize | Size | — | Resize constraints |
| lazyMount | boolean | false | Defer rendering until opened |
| closeOnEscape | boolean | true | Close on Escape key |
| initialFocusEl | function | — | Element to focus when the panel opens. May return `false` to skip moving focus (5.39.3) |
| hideMode | HideMode | 'display-none' | How to hide content when mounted but not present. `'display-none'`: HTML `hidden` attribute, effects stay alive. `'activity'`: React 19 `<Activity mode="hidden">`, effects pause, requires React 19+ |
| allowOverflow | boolean | true | Allow the panel to overflow viewport boundaries |
| getAnchorPosition | function | — | Custom initial positioning |
| onOpenChange / onPositionChange / onSizeChange | function | — | Event callbacks |

## Notes

- Supports controlled and uncontrolled modes for position, size, and open state.
- Exposes CSS custom properties for positioning: `--x`, `--y`, `--width`, `--height`.
- Data attributes reflect states such as dragging, minimized, maximized, and topmost.
- Context hook available: `useFloatingPanelContext`.
- `initialFocusEl` may return `false` to open without moving focus; returning `null` still uses the default (5.39.3).
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Dialog](./dialog.md)
