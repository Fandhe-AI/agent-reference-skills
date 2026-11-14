# Reorder

Drag-to-reorder lists and grids with automatic layout animations. `Reorder.Group` wraps the list and manages ordering; `Reorder.Item` represents each draggable element.

## Signature / Usage

```tsx
import { Reorder } from "motion/react"
import { useState } from "react"

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      {items.map((item) => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

## Options / Props

### Reorder.Group

| Name | Type | Description |
|------|------|-------------|
| `values` | array | The array being reordered; each entry maps to a `Reorder.Item` value |
| `onReorder` | function | Callback receiving the new order (`newOrder`); use it to update state. Since 14.5.0 it also receives `moved` as a second argument (CHANGELOG only; not described on the docs page) |
| `axis` | "x" \| "y" \| "xy" | Axis used for dragging and reorder detection. Auto-detected by default: `"x"` for a row, `"y"` for a column, `"xy"` for grids and wrapped layouts. Set to override |
| `as` | string | HTML element to render as (default `"ul"`) |

### Reorder.Item

| Name | Type | Description |
|------|------|-------------|
| `value` | any | Identifies which entry in `values` this item represents |
| `as` | string | HTML element to render as (default `"li"`) |

## Notes

- Added in 13.1.0 (CHANGELOG): multidimensional reorder, automatic axis detection, and RTL support.
- Items automatically animate to new positions when reordered, added, or removed.
- Pair with `AnimatePresence` for entry/exit effects.
- Lists inside scrollable containers auto-scroll while dragging.
- Dragged items elevate above siblings via z-index; items require non-static positioning.
- Keyboard accessibility: tabbing into the `Reorder.Group` focuses the first item (14.9.0). Arrow keys move focus (or, when grabbed, move the item one place); Home / End focus the first / last item (or move a grabbed item to the start / end); Space grabs or drops; Escape drops and restores the order from before the grab; Enter does nothing. While grabbed with the keyboard, `whileDrag` is active but `onDragStart` / `onDrag` / `onDragEnd` don't fire.
- A `LazyMotion`-compatible `Reorder` import was added in 14.7.0 and Reorder auto-scroll speed no longer depends on refresh rate in 14.6.0 (CHANGELOG: https://github.com/motiondivision/motion/blob/v14.14.0/CHANGELOG.md). The import path is not documented on the docs page.
- Source: https://motion.dev/docs/react-reorder (fetched 2026-11-14).

## Related

- [motion](./motion.md)
- [AnimatePresence](./animate-presence.md)
