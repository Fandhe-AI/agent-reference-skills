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
| `onReorder` | function | Callback receiving the new order; use it to update state |
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

## Related

- [motion](./motion.md)
- [AnimatePresence](./animate-presence.md)
