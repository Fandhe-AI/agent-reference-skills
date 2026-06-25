# UICollectionViewDiffableDataSource

An object that manages data and provides cells for a collection view using automatic diff computation. Conforms to `UICollectionViewDataSource`.

```swift
@MainActor
class UICollectionViewDiffableDataSource<SectionIdentifierType, ItemIdentifierType>: NSObject, UICollectionViewDataSource
    where SectionIdentifierType: Hashable & Sendable,
          ItemIdentifierType: Hashable & Sendable
```

## Signature / Usage

```swift
enum Section { case main }

var dataSource: UICollectionViewDiffableDataSource<Section, UUID>!

dataSource = UICollectionViewDiffableDataSource(collectionView: collectionView) {
    collectionView, indexPath, itemID -> UICollectionViewCell? in
    return collectionView.dequeueConfiguredReusableCell(
        using: cellRegistration, for: indexPath, item: itemID)
}

// Apply initial data
var snapshot = NSDiffableDataSourceSnapshot<Section, UUID>()
snapshot.appendSections([.main])
snapshot.appendItems(allItems)
dataSource.apply(snapshot, animatingDifferences: false)
```

## Options / Props

### Initialization

| Name | Description |
|------|-------------|
| `init(collectionView:cellProvider:)` | Creates the data source and connects it to the collection view |

### Snapshot Operations

| Method | Description |
|--------|-------------|
| `apply(_:animatingDifferences:)` | Updates UI to match snapshot with diff computation |
| `apply(_:animatingDifferences:completion:)` | Same with completion handler |
| `applySnapshotUsingReloadData(_:)` | Resets UI without diff or animation |
| `snapshot()` | Returns current snapshot |

### Per-Section Snapshots

| Method | Description |
|--------|-------------|
| `snapshot(for:)` | Returns section snapshot for a specific section |
| `apply(_:to:animatingDifferences:)` | Updates a specific section using a section snapshot |

### Supplementary Views

| Name | Type | Description |
|------|------|-------------|
| `supplementaryViewProvider` | `SupplementaryViewProvider?` | Closure configuring headers/footers |

### Item & Section Lookup

| Method | Description |
|--------|-------------|
| `itemIdentifier(for:)` | Returns item identifier at an index path |
| `indexPath(for:)` | Returns index path for an item identifier |
| `sectionIdentifier(for:)` | Returns section identifier at a section index |
| `index(for:)` | Returns section index for a section identifier |

## Notes

- Available iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, tvOS 13.0+, visionOS
- Do not change `collectionView.dataSource` after connecting; create a new collection view if a different data source is needed
- `SectionIdentifierType` and `ItemIdentifierType` must conform to `Hashable` and `Sendable`
- For hierarchical data (e.g., outline views), use `NSDiffableDataSourceSectionSnapshot` with per-section `apply(_:to:)`

## Related

- [UICollectionView](./uicollectionview.md)
- [NSDiffableDataSourceSnapshot](./nsdiffabledatasourcesnapshot.md)
- [UICollectionViewDataSource](./uicollectionviewdatasource.md)
