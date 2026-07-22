# List Collection

A list collection is based on an array of items. It is created by passing an array of items to `createListCollection`, and is the backing data structure used by components such as Select, Combobox, and Menu.

## Signature / Usage

```tsx
import { createListCollection } from "@ark-ui/react/collection"

const collection = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `items` | `T[]` | Array of items backing the collection |
| `itemToString` | `(item: T) => string` | Custom function converting an item to a display string |
| `itemToValue` | `(item: T) => string` | Custom function extracting the value identifier from an item |
| `isItemDisabled` | `(item: T) => boolean` | Custom function marking an item as disabled (defaults to checking a `disabled` property) |

## Methods

| Name | Description |
|------|-------------|
| `find(value)` | Retrieves a single item matching the given value |
| `findMany(values)` | Returns multiple items for an array of values |
| `getNextValue(value)` | Returns the value following the given value |
| `getPreviousValue(value)` | Returns the value preceding the given value |
| `has(value)` | Checks whether a value exists in the collection |
| `reorder(fromIndex, toIndex)` | Rearranges items by index position |
| `firstValue` | The first item's value (computed property) |
| `lastValue` | The last item's value (computed property) |

## Notes

- Default item shape is `{ label, value }`; use `itemToString` / `itemToValue` / `isItemDisabled` to work with non-standard object structures.

## Related

- [Tree Collection](./tree-collection.md)
- [Async List](./async-list.md)
- [List Selection](./list-selection.md)
