# NSOutlineView

A view that displays hierarchical data in a row-and-column format with expandable and collapsible items. Inherits from `NSTableView`.

## Signature / Usage

```swift
class NSOutlineView: NSTableView
```

```swift
outlineView.dataSource = myDataSource
outlineView.delegate = myDelegate
outlineView.reloadData()

// Expand root-level items
outlineView.expandItem(nil, expandChildren: false)
```

## Options / Props

**Expand / Collapse:**

| Method | Description |
|---|---|
| `expandItem(_:)` | Expand a single item |
| `expandItem(_:expandChildren:)` | Expand an item and optionally all descendants |
| `collapseItem(_:)` | Collapse a single item |
| `collapseItem(_:collapseChildren:)` | Collapse an item and optionally all descendants |
| `isExpandable(_:)` | Whether the item can be expanded |
| `isItemExpanded(_:)` | Whether the item is currently expanded |

**Hierarchy navigation:**

| Method | Description |
|---|---|
| `parent(forItem:)` | Returns the parent of an item |
| `child(_:ofItem:)` | Returns the child at a given index |
| `childIndex(forItem:)` | Returns index of an item within its parent |
| `numberOfChildren(ofItem:)` | Number of children for an item |
| `level(forItem:)` | Indentation level of an item |
| `level(forRow:)` | Indentation level for a row index |

**Row / Item conversion:**

| Method | Description |
|---|---|
| `item(atRow:)` | Returns the item displayed at a given row |
| `row(forItem:)` | Returns the row displaying a given item (-1 if not visible) |

**Display:**

| Property | Type | Description |
|---|---|---|
| `indentationPerLevel` | `CGFloat` | Horizontal indent per hierarchy level |
| `indentationMarkerFollowsCell` | `Bool` | Whether the disclosure triangle follows cell content |
| `autoresizesOutlineColumn` | `Bool` | Automatically resize the outline column |
| `outlineTableColumn` | `NSTableColumn?` | Column that displays the disclosure triangle |

## Notes

- macOS only.
- Passing `nil` as the item argument refers to the root (top-level) of the hierarchy.
- Each item object must be unique and maintain stable pointer identity across reloads to preserve expansion state.
- Data source methods may be called before `awakeFromNib()`; return `0` from `numberOfChildrenOfItem:` until initialized.

## Related

- [NSOutlineViewDataSource](./nsoutlineviewdatasource.md)
- [NSTableView](./nstableview.md)
- [NSTableViewDelegate](./nstableviewdelegate.md)
