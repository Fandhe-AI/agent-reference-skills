# NSTableView

A view that displays a set of related records in rows and columns, where rows represent individual records and columns represent attributes. Inherits from `NSControl`; subclassed by `NSOutlineView`.

## Signature / Usage

```swift
class NSTableView: NSControl
```

```swift
let tableView = NSTableView(frame: frame)
tableView.dataSource = myDataSource
tableView.delegate = myDelegate
tableView.reloadData()
```

## Options / Props

| Property / Method | Type | Description |
|---|---|---|
| `dataSource` | `NSTableViewDataSource?` | Object providing data to the table |
| `delegate` | `NSTableViewDelegate?` | Object customizing table behavior |
| `numberOfRows` | `Int` | Total number of rows |
| `numberOfColumns` | `Int` | Total number of columns |
| `tableColumns` | `[NSTableColumn]` | All columns in display order |
| `selectedRow` | `Int` | Index of the last selected row (-1 if none) |
| `selectedRowIndexes` | `IndexSet` | All selected row indexes |
| `rowHeight` | `CGFloat` | Default height of each row |
| `usesAutomaticRowHeights` | `Bool` | Let Auto Layout determine row height |
| `usesAlternatingRowBackgroundColors` | `Bool` | Alternate row background colors |
| `style` | `NSTableView.Style` | Visual style (macOS 11+) |
| `selectionHighlightStyle` | `NSTableView.SelectionHighlightStyle` | Style for row selection highlight |
| `allowsMultipleSelection` | `Bool` | Whether multiple rows can be selected |
| `allowsEmptySelection` | `Bool` | Whether selection can be empty |
| `allowsColumnReordering` | `Bool` | Whether columns can be reordered |
| `allowsColumnResizing` | `Bool` | Whether columns can be resized |
| `headerView` | `NSTableHeaderView?` | The column header view |

**Key methods:**

| Method | Description |
|---|---|
| `reloadData()` | Reload all data from data source |
| `reloadData(forRowIndexes:columnIndexes:)` | Reload specific cells |
| `insertRows(at:withAnimation:)` | Insert rows with animation |
| `removeRows(at:withAnimation:)` | Remove rows with animation |
| `moveRow(at:to:)` | Move a row to a new position |
| `makeView(withIdentifier:owner:)` | Dequeue or create a cell view |
| `view(atColumn:row:makeIfNecessary:)` | Get view at specific position |
| `rowView(atRow:makeIfNecessary:)` | Get row view at specific row |
| `register(_:forIdentifier:)` | Register a nib for reuse |
| `scrollRowToVisible(_:)` | Scroll to make a row visible |
| `selectRowIndexes(_:byExtendingSelection:)` | Programmatically select rows |

## Notes

- macOS only. Does not store data itself; data source is a weak reference.
- Use view-based tables (`makeView(withIdentifier:owner:)` pattern) in modern apps; cell-based is legacy.
- Data source methods may be called before `awakeFromNib()`: return `0` from `numberOfRows(in:)` until initialized, then call `reloadData()` in `awakeFromNib()`.
- Subclassing is rarely needed; use data source and delegate instead.

## Related

- [NSTableViewDataSource](./nstableviewdatasource.md)
- [NSTableViewDelegate](./nstableviewdelegate.md)
- [NSTableCellView](./nstablecellview.md)
- [NSTableColumn](./nstablecolumn.md)
- [NSTableViewDiffableDataSource](./nstableviewdiffabledatasource.md)
- [NSOutlineView](./nsoutlineview.md)
