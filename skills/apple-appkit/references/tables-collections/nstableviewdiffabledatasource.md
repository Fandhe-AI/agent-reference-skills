# NSTableViewDiffableDataSource

A type-safe, snapshot-based data source for `NSTableView` that automatically animates row insertions, deletions, and moves.

## Signature / Usage

```swift
class NSTableViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType>
    where SectionIdentifierType: Hashable, ItemIdentifierType: Hashable
```

```swift
var dataSource: NSTableViewDiffableDataSource<Int, UUID>!

dataSource = NSTableViewDiffableDataSource<Int, UUID>(tableView: tableView) {
    (tableView, tableColumn, row, itemID) -> NSView? in
    let cell = tableView.makeView(
        withIdentifier: NSUserInterfaceItemIdentifier("cell"),
        owner: nil) as? NSTableCellView
    cell?.textField?.stringValue = self.itemStore[itemID]?.title ?? ""
    return cell
}

// Apply initial snapshot
var snapshot = NSDiffableDataSourceSnapshot<Int, UUID>()
snapshot.appendSections([0])
snapshot.appendItems(itemIDs, toSection: 0)
dataSource.apply(snapshot, animatingDifferences: false)
```

## Options / Props

| Member | Description |
|---|---|
| `init(tableView:cellProvider:)` | Initialize and connect to a table view with a cell-configuration closure |
| `snapshot()` | Returns the current `NSDiffableDataSourceSnapshot` |
| `apply(_:animatingDifferences:completion:)` | Apply a new snapshot, optionally animating changes |
| `itemIdentifier(forRow:)` | Returns item identifier for a given row index |
| `row(forItemIdentifier:)` | Returns row index for a given item identifier |
| `sectionIdentifier(forRow:)` | Returns section identifier for a given row |
| `row(forSectionIdentifier:)` | Returns the row index of a section header |
| `rowViewProvider` | Closure to provide custom `NSTableRowView` instances |
| `sectionHeaderViewProvider` | Closure to provide section header views |
| `defaultRowAnimation` | Default animation used when applying snapshots |

## Notes

- macOS 11.0+.
- Conforms to `NSTableViewDataSource`; set it as the table view's `dataSource`.
- Item and section identifier types must be `Hashable`.
- Calling `apply` replaces the previous snapshot; the framework diffs and animates the minimal set of changes.
- Use `animatingDifferences: false` for the initial load or when the view is off-screen.

## Related

- [NSTableView](./nstableview.md)
- [NSTableViewDataSource](./nstableviewdatasource.md)
- [NSCollectionViewDiffableDataSource](./nscollectionviewdiffabledatasource.md)
