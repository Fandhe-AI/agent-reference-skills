# UITableViewDiffableDataSource

An object that manages data and provides cells for a table view using automatic diff computation. Conforms to `UITableViewDataSource`.

```swift
@MainActor
class UITableViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType>: NSObject, UITableViewDataSource
    where SectionIdentifierType: Hashable & Sendable,
          ItemIdentifierType: Hashable & Sendable
```

## Signature / Usage

```swift
enum Section { case main }

var dataSource: UITableViewDiffableDataSource<Section, UUID>!

dataSource = UITableViewDiffableDataSource(tableView: tableView) {
    tableView, indexPath, itemID -> UITableViewCell? in
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
    // configure cell using itemID
    return cell
}

// Apply initial data
var snapshot = NSDiffableDataSourceSnapshot<Section, UUID>()
snapshot.appendSections([.main])
snapshot.appendItems(items)
dataSource.apply(snapshot, animatingDifferences: false)
```

## Options / Props

### Initialization

| Name | Description |
|------|-------------|
| `init(tableView:cellProvider:)` | Creates the data source and connects it to the table view |

### Snapshot Operations

| Method | Description |
|--------|-------------|
| `apply(_:animatingDifferences:)` | Updates UI to match snapshot, computing diffs automatically |
| `apply(_:animatingDifferences:completion:)` | Same with completion handler |
| `applySnapshotUsingReloadData(_:)` | Resets UI without diff computation or animation |
| `snapshot()` | Returns current snapshot representing displayed state |

### Item & Section Lookup

| Method | Description |
|--------|-------------|
| `itemIdentifier(for:)` | Returns item identifier at an index path |
| `indexPath(for:)` | Returns index path for an item identifier |
| `sectionIdentifier(for:)` | Returns section identifier at a section index |
| `index(for:)` | Returns section index for a section identifier |

### Animation

| Name | Type | Description |
|------|------|-------------|
| `defaultRowAnimation` | `UITableView.RowAnimation` | Default animation for row insertions/deletions |

## Notes

- Available iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, tvOS 13.0+, visionOS
- Do not change `tableView.dataSource` after connecting a diffable data source; create a new table view if needed
- `SectionIdentifierType` and `ItemIdentifierType` must conform to `Hashable` and `Sendable`
- Use `reconfigureItems(_:)` on a snapshot to update cell content without replacing the cell

## Related

- [UITableView](./uitableview.md)
- [NSDiffableDataSourceSnapshot](./nsdiffabledatasourcesnapshot.md)
- [UITableViewDataSource](./uitableviewdatasource.md)
