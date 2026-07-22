# Drawer

A panel that slides in from the edge of the screen, typically used for navigation or forms. It follows the Dialog WAI-ARIA design pattern and shares similar accessibility behavior with Dialog.

## Anatomy

- `Drawer.Root` - container
- `Drawer.Trigger` - button that opens the drawer
- `Drawer.Backdrop` - overlay behind the content
- `Drawer.Positioner` - positioning wrapper
- `Drawer.Content` - main drawer container
- `Drawer.Grabber` / `Drawer.GrabberIndicator` - drag handle
- `Drawer.Title` - heading element
- `Drawer.Description` - description text
- `Drawer.CloseTrigger` - close button
- `Drawer.IndentBackground` / `Drawer.Indent` - stacked-drawer visual layering

## Signature / Usage

```jsx
import { Drawer } from '@ark-ui/react'

<Drawer.Root>
  <Drawer.Trigger />
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Grabber>
        <Drawer.GrabberIndicator />
      </Drawer.Grabber>
      <Drawer.Title />
      <Drawer.Description />
      <Drawer.CloseTrigger />
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| open | boolean | — | Controlled open state |
| onOpenChange | function | — | Callback when open state changes |
| swipeDirection | 'up' \| 'down' \| 'left' \| 'right' | 'down' | Edge the drawer enters/exits from |
| snapPoints | array | — | Intermediate positions the drawer can snap to |
| modal | boolean | true | Prevents background interaction when true |
| draggable | boolean | true | Enables drag-to-dismiss |
| closeOnEscape | boolean | true | Allow Escape key to close |
| closeOnInteractOutside | boolean | true | Allow outside clicks to close |

## Notes

- Focus traps inside the drawer by default.
- Supports nested drawers with visual layering via `IndentBackground` / `Indent`.
- Direction-aware styling is available through the `data-swipe-direction` attribute.
- Prevents overdrag gaps through CSS pseudo-elements.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Dialog](./dialog.md)
