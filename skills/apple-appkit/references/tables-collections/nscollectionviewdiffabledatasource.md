# NSCollectionViewDiffableDataSource

A type-safe, snapshot-based data source for `NSCollectionView` that automatically animates item insertions, deletions, and moves.

## Signature / Usage

```swift
class NSCollectionViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType>
    where SectionIdentifierType: Hashable, ItemIdentifierType: Hashable
```

```swift
var dataSource: NSCollectionViewDiffableDataSource<Int, UUID>!

dataSource = NSCollectionViewDiffableDataSource<Int, UUID>(collectionView: collectionView) {
    (collectionView, indexPath, itemID) -> NSCollectionViewItem? in
    let item = collectionView.makeItem(
        withIdentifier: NSUserInterfaceItemIdentifier("item"),
        for: indexPath) as! MyItem
    item.configure(with: self.itemStore[itemID])
    return item
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
| `init(collectionView:itemProvider:)` | Initialize and connect to a collection view with an item-configuration closure |
| `snapshot()` | Returns the current `NSDiffableDataSourceSnapshot` |
| `apply(_:animatingDifferences:completion:)` | Apply a new snapshot, optionally animating changes |
| `itemIdentifier(for:)` | Returns the item identifier for a given index path |
| `indexPath(for:)` | Returns the index path for a given item identifier |
| `supplementaryViewProvider` | Closure to configure supplementary views (headers/footers) |

## Notes

- macOS 10.15.1+.
- Conforms to `NSCollectionViewDataSource`; set it as the collection view's `dataSource`.
- Item and section identifier types must be `Hashable` (typically `String`, `Int`, or a custom `Hashable` struct/enum).
- Calling `apply` replaces the previous snapshot; the framework diffs the two and animates the minimal set of changes.
- Use `animatingDifferences: false` for the initial load or when the UI is not visible.

## Related

- [NSCollectionView](./nscollectionview.md)
- [NSCollectionViewDataSource](./nscollectionviewdatasource.md)
- [NSTableViewDiffableDataSource](./nstableviewdiffabledatasource.md)
