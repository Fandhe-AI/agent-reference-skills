# UITableView

A view that presents data using rows arranged in a single column, with support for sections, headers, footers, and cell recycling.

```swift
@MainActor
class UITableView: UIScrollView
```

## Signature / Usage

```swift
let tableView = UITableView(frame: bounds, style: .plain)
tableView.register(UITableViewCell.self, forCellReuseIdentifier: "Cell")
tableView.dataSource = self
tableView.delegate = self
```

## Options / Props

### Initialization

| Name | Type | Description |
|------|------|-------------|
| `style` | `UITableView.Style` | `.plain` or `.grouped` visual style |
| `dataSource` | `UITableViewDataSource?` | Object providing data |
| `delegate` | `UITableViewDelegate?` | Object handling interactions |

### Appearance

| Name | Type | Description |
|------|------|-------------|
| `rowHeight` | `CGFloat` | Default row height |
| `estimatedRowHeight` | `CGFloat` | Estimated height for performance |
| `separatorStyle` | `UITableViewCell.SeparatorStyle` | Separator line style |
| `separatorColor` | `UIColor?` | Separator line color |
| `tableHeaderView` | `UIView?` | View above all content |
| `tableFooterView` | `UIView?` | View below all content |

### Selection

| Name | Type | Description |
|------|------|-------------|
| `allowsSelection` | `Bool` | Enables row selection |
| `allowsMultipleSelection` | `Bool` | Enables multi-row selection |
| `indexPathForSelectedRow` | `IndexPath?` | Currently selected row |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Always dequeue cells with `dequeueReusableCell(withIdentifier:for:)` after registering a class or nib
- Provide `estimatedRowHeight` to improve initial scroll performance
- Wrap multiple insertions/deletions in `performBatchUpdates(_:completion:)` for optimal animation
- For modern data management, prefer `UITableViewDiffableDataSource` over manual `beginUpdates`/`endUpdates`

## Related

- [UITableViewDataSource](./uitableviewdatasource.md)
- [UITableViewDelegate](./uitableviewdelegate.md)
- [UITableViewCell](./uitableviewcell.md)
- [UITableViewDiffableDataSource](./uitableviewdiffabledatasource.md)
