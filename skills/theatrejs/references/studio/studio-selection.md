# studio.selection

Provides read and write access to the current selection of sheets and sheet objects in Studio.

## Signature / Usage

```ts
// Read current selection
const selected = studio.selection // ISheetObject[] | ISheet[]

// Subscribe to selection changes
const unsubscribe = studio.onSelectionChange((newSelection) => {
  console.log(newSelection)
})

// Programmatically set selection
studio.setSelection([obj])
```

## Options / Props

### studio.selection

| Name | Type | Description |
|------|------|-------------|
| `studio.selection` | `Array<ISheet \| ISheetObject>` | Read-only array of currently selected items |

### studio.onSelectionChange

| Name | Type | Description |
|------|------|-------------|
| `callback` | `(selection: Array<ISheet \| ISheetObject>) => void` | Called whenever selection changes |
| returns | `() => void` | Unsubscribe function |

### studio.setSelection

| Name | Type | Description |
|------|------|-------------|
| `selection` | `Array<ISheet \| ISheetObject>` | Items to select; replaces the current selection |

## Notes

- `studio.selection` is a snapshot; use `onSelectionChange` to react to changes
- Passing an empty array to `setSelection([])` clears the selection
- Typically used in extensions to sync a custom editor pane with the selected object

## Related

- [studio.transaction](./studio-transaction.md)
- [Authoring Extensions](./authoring-extensions.md)
