# List Selection

`useListSelection` manages selection state in lists and collections, supporting single and multiple selection modes with operations like select, deselect, toggle, and clear.

## Signature / Usage

```tsx
import { useListSelection } from "@ark-ui/react/collection"

const selection = useListSelection({
  collection,
  selectionMode: "multiple",
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `collection` | `ListCollection<T>` | The collection to manage selection for |
| `selectionMode` | `'single' \| 'multiple' \| 'none'` (default: `'single'`) | The selection mode |
| `deselectable` | `boolean` (default: `true`) | Whether selected items can be deselected |
| `initialSelectedValues` | `string[]` (default: `[]`) | Initial selected values |
| `resetOnCollectionChange` | `boolean` (default: `false`) | Whether to reset selection when the collection changes |

## Return Value

| Name | Type | Description |
|------|------|-------------|
| `selectedValues` | `string[]` | Array of currently selected values |
| `isEmpty` | `boolean` | Whether no items are selected |
| `firstSelectedValue` | `string \| null` | The first selected value in collection order |
| `lastSelectedValue` | `string \| null` | The last selected value in collection order |
| `isSelected(value)` | `(value: string) => boolean` | Checks if a value is selected |
| `canSelect(value)` | `(value: string) => boolean` | Checks if a value can be selected |
| `isAllSelected()` | `() => boolean` | Checks if all items are selected |
| `isSomeSelected()` | `() => boolean` | Checks if some items are selected |
| `select` / `deselect` / `toggle` | `(value: string) => void` | Selection mutation methods |
| `replace` / `extend` | `(values: string[]) => void` | Replace or extend the current selection |
| `setSelectedValues` / `setSelection` | `(values: string[]) => void` | Directly set the selected values |
| `clear()` | `() => void` | Clears the selection |
| `resetSelection()` | `() => void` | Resets selection to its initial values |

## Notes

- Set `deselectable` to `false` to prevent deselecting the current (single-mode) selection.

## Related

- [List Collection](./list-collection.md)
- [Tree Collection](./tree-collection.md)
- [Async List](./async-list.md)
