# NSTableCellView

A reusable container view that displays content for a single cell in a view-based `NSTableView`. Inherits from `NSView`.

## Signature / Usage

```swift
class NSTableCellView: NSView
```

```swift
// In NSTableViewDelegate
func tableView(_ tableView: NSTableView,
               viewFor tableColumn: NSTableColumn?,
               row: Int) -> NSView? {
    let id = NSUserInterfaceItemIdentifier("cell")
    guard let cell = tableView.makeView(withIdentifier: id, owner: self) as? NSTableCellView else {
        return nil
    }
    cell.textField?.stringValue = items[row].title
    cell.imageView?.image = items[row].icon
    return cell
}
```

## Options / Props

| Property | Type | Description |
|---|---|---|
| `textField` | `NSTextField?` | Outlet for the cell's primary text label |
| `imageView` | `NSImageView?` | Outlet for the cell's image |
| `objectValue` | `Any?` | Data object the cell represents; set automatically by the table view |
| `backgroundStyle` | `NSView.BackgroundStyle` | Indicates background appearance (set by the enclosing row view) |
| `rowSizeStyle` | `NSTableView.RowSizeStyle` | Mirrors the table view's effective row size style |
| `draggingImageComponents` | `[NSDraggingImageComponent]` | Components used during drag operations |

## Notes

- macOS 10.7+.
- `textField` and `imageView` are typically wired in Interface Builder or set in `init`.
- Subclass `NSTableCellView` to add additional outlets or properties for custom layouts.
- `objectValue` is set when using `NSTableViewDataSource.tableView(_:objectValueFor:row:)`; custom views without this property should implement it to receive updates.

## Related

- [NSTableView](./nstableview.md)
- [NSTableViewDelegate](./nstableviewdelegate.md)
