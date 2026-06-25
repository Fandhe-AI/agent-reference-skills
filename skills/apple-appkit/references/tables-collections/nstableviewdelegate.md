# NSTableViewDelegate

A protocol that customizes the behavior of an `NSTableView` — providing cell views, controlling row height and selection, managing column behavior, and responding to user interactions. All methods are optional.

## Signature / Usage

```swift
protocol NSTableViewDelegate: NSControlTextEditingDelegate
```

```swift
class MyViewController: NSViewController, NSTableViewDelegate {
    func tableView(_ tableView: NSTableView,
                   viewFor tableColumn: NSTableColumn?,
                   row: Int) -> NSView? {
        let id = NSUserInterfaceItemIdentifier("cell")
        let cell = tableView.makeView(withIdentifier: id, owner: self) as? NSTableCellView
        cell?.textField?.stringValue = items[row]
        return cell
    }

    func tableView(_ tableView: NSTableView, heightOfRow row: Int) -> CGFloat {
        return 30.0
    }
}
```

## Options / Props

**View provision:**

| Method | Description |
|---|---|
| `tableView(_:viewFor:row:)` | Return an `NSView` for a cell (view-based tables) |
| `tableView(_:rowViewForRow:)` | Return a custom `NSTableRowView` for a row |

**Row sizing:**

| Method | Description |
|---|---|
| `tableView(_:heightOfRow:)` | Return the height for a row |
| `tableView(_:sizeToFitWidthOfColumn:)` | Return width for column double-click-to-fit |

**Selection:**

| Method | Description |
|---|---|
| `selectionShouldChange(in:)` | Allow or prevent selection change |
| `tableView(_:shouldSelectRow:)` | Allow or deny selection of a specific row |
| `tableView(_:selectionIndexesForProposedSelection:)` | Override proposed selection |
| `tableViewSelectionDidChange(_:)` | Respond after selection changes |
| `tableViewSelectionIsChanging(_:)` | Respond while selection is changing |

**Column management:**

| Method | Description |
|---|---|
| `tableView(_:shouldReorderColumn:toColumn:)` | Allow or deny column reorder |
| `tableViewColumnDidResize(_:)` | Respond to column resize |
| `tableViewColumnDidMove(_:)` | Respond to column move |
| `tableView(_:userCanChangeVisibilityOf:)` | Allow user to hide/show columns |

**Editing & interaction:**

| Method | Description |
|---|---|
| `tableView(_:shouldEdit:row:)` | Allow or deny cell editing |
| `tableView(_:rowActionsForRow:edge:)` | Provide swipe row actions (macOS 10.11+) |
| `tableView(_:didClick:)` | Respond to column header click |
| `tableView(_:toolTipFor:rect:tableColumn:row:mouseLocation:)` | Return tooltip string |

## Notes

- macOS only.
- In view-based tables, `tableView(_:viewFor:row:)` is the primary method for providing content.
- Row actions (`rowActionsForRow:edge:`) require swipe gesture support enabled on the table view.

## Related

- [NSTableView](./nstableview.md)
- [NSTableViewDataSource](./nstableviewdatasource.md)
- [NSTableCellView](./nstablecellview.md)
