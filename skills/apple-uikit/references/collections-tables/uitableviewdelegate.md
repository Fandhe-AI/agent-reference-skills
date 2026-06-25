# UITableViewDelegate

A protocol for managing selections, configuring section headers/footers, editing cells, and handling other table view interactions. All methods are optional.

```swift
@MainActor
protocol UITableViewDelegate: UIScrollViewDelegate
```

## Signature / Usage

```swift
func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    tableView.deselectRow(at: indexPath, animated: true)
    // handle selection
}
```

## Options / Props

### Selection

| Method | Description |
|--------|-------------|
| `tableView(_:willSelectRowAt:)` | Return modified or nil index path to control selection |
| `tableView(_:didSelectRowAt:)` | Called after row is selected |
| `tableView(_:willDeselectRowAt:)` | Return modified or nil index path to control deselection |
| `tableView(_:didDeselectRowAt:)` | Called after row is deselected |
| `tableView(_:shouldBeginMultipleSelectionInteractionAt:)` | Enables swipe-to-select multiple rows |

### Heights

| Method | Description |
|--------|-------------|
| `tableView(_:heightForRowAt:)` | Per-row height |
| `tableView(_:estimatedHeightForRowAt:)` | Estimated per-row height for scroll performance |
| `tableView(_:heightForHeaderInSection:)` | Header height for a section |
| `tableView(_:heightForFooterInSection:)` | Footer height for a section |
| `tableView(_:estimatedHeightForHeaderInSection:)` | Estimated header height |
| `tableView(_:estimatedHeightForFooterInSection:)` | Estimated footer height |

### Headers & Footers

| Method | Description |
|--------|-------------|
| `tableView(_:viewForHeaderInSection:)` | Custom header view for a section |
| `tableView(_:viewForFooterInSection:)` | Custom footer view for a section |
| `tableView(_:willDisplayHeaderView:forSection:)` | Called before header is displayed |
| `tableView(_:willDisplayFooterView:forSection:)` | Called before footer is displayed |

### Editing

| Method | Description |
|--------|-------------|
| `tableView(_:editingStyleForRowAt:)` | Delete or insert style per row |
| `tableView(_:titleForDeleteConfirmationButtonForRowAt:)` | Custom delete button title |
| `tableView(_:leadingSwipeActionsConfigurationForRowAt:)` | Leading swipe actions |
| `tableView(_:trailingSwipeActionsConfigurationForRowAt:)` | Trailing swipe actions |
| `tableView(_:willBeginEditingRowAt:)` | Called before edit mode activates for a row |
| `tableView(_:didEndEditingRowAt:)` | Called after edit mode ends for a row |

### Context Menu

| Method | Description |
|--------|-------------|
| `tableView(_:contextMenuConfigurationForRowAt:point:)` | Returns menu configuration for a row |
| `tableView(_:previewForHighlightingContextMenuWithConfiguration:)` | Custom preview for highlighting |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS
- Inherits from `UIScrollViewDelegate`; all scroll view callbacks are also available
- Provide height estimates to improve initial load and scroll performance

## Related

- [UITableView](./uitableview.md)
- [UITableViewDataSource](./uitableviewdatasource.md)
