# NSTableColumn

Represents the display characteristics and identifier of a single column in an `NSTableView`, including width, resizing behavior, editability, and header appearance.

## Signature / Usage

```swift
class NSTableColumn: NSObject
```

```swift
let column = NSTableColumn(identifier: NSUserInterfaceItemIdentifier("name"))
column.title = "Name"
column.width = 200
column.minWidth = 50
column.maxWidth = 400
column.isEditable = false
tableView.addTableColumn(column)
```

## Options / Props

| Property | Type | Description |
|---|---|---|
| `identifier` | `NSUserInterfaceItemIdentifier` | Unique identifier used to look up the column |
| `title` | `String` | Text displayed in the column header |
| `headerCell` | `NSTableHeaderCell` | Cell that draws the column header |
| `width` | `CGFloat` | Current width in points |
| `minWidth` | `CGFloat` | Minimum allowed width |
| `maxWidth` | `CGFloat` | Maximum allowed width |
| `resizingMask` | `NSTableColumn.ResizingOptions` | Specifies resizing behavior |
| `isHidden` | `Bool` | Whether the column is hidden |
| `isEditable` | `Bool` | Whether cells in this column allow user editing (cell-based) |
| `sortDescriptorPrototype` | `NSSortDescriptor?` | Template sort descriptor; triggers `tableView(_:sortDescriptorsDidChange:)` |
| `tableView` | `NSTableView?` | The owning table view |

**Key method:**

| Method | Description |
|---|---|
| `sizeToFit()` | Resize the column to fit its header cell |

## Notes

- macOS only.
- `resizingMask` supports `.autoresizingMask`, `.userResizingMask`, or neither.
- Setting `sortDescriptorPrototype` enables user-driven sorting; the data source must respond to `tableView(_:sortDescriptorsDidChange:)`.

## Related

- [NSTableView](./nstableview.md)
- [NSTableViewDataSource](./nstableviewdatasource.md)
