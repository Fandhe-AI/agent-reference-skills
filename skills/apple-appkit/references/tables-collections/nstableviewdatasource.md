# NSTableViewDataSource

A protocol that provides data to an `NSTableView` and optionally supports editing, sorting, and drag-and-drop.

## Signature / Usage

```swift
protocol NSTableViewDataSource: NSObjectProtocol
```

```swift
class MyDataSource: NSObject, NSTableViewDataSource {
    var items: [String] = []

    func numberOfRows(in tableView: NSTableView) -> Int {
        return items.count
    }

    func tableView(_ tableView: NSTableView,
                   objectValueFor tableColumn: NSTableColumn?,
                   row: Int) -> Any? {
        return items[row]
    }
}
```

## Options / Props

**Required (without Cocoa Bindings):**

| Method | Description |
|---|---|
| `numberOfRows(in:)` | Returns total number of rows |
| `tableView(_:objectValueFor:row:)` | Returns data object for a cell (cell-based only) |

**Optional:**

| Method | Description |
|---|---|
| `tableView(_:setObjectValue:for:row:)` | Handle user edits (cell-based only; do not use in view-based) |
| `tableView(_:sortDescriptorsDidChange:)` | Respond to sort descriptor changes |
| `tableView(_:pasteboardWriterForRow:)` | Enable multi-item drag |
| `tableView(_:validateDrop:proposedRow:proposedDropOperation:)` | Validate a drop target |
| `tableView(_:acceptDrop:row:dropOperation:)` | Handle accepted drop |
| `tableView(_:draggingSession:willBeginAt:forRowIndexes:)` | Respond to drag session start |
| `tableView(_:draggingSession:endedAt:operation:)` | Respond to drag session end |
| `tableView(_:updateDraggingItemsForDrag:)` | Update drag items mid-drag |

## Notes

- macOS only.
- For view-based tables, configure cell values directly in the view returned by `NSTableViewDelegate.tableView(_:viewFor:row:)` rather than using `objectValueFor`.
- `numberOfRows(in:)` and `objectValueFor` are called frequently; keep them efficient.

## Related

- [NSTableView](./nstableview.md)
- [NSTableViewDelegate](./nstableviewdelegate.md)
- [NSTableViewDiffableDataSource](./nstableviewdiffabledatasource.md)
