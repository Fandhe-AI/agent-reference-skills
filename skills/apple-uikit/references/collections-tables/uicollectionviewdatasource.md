# UICollectionViewDataSource

A protocol that an object adopts to manage data and provide cells for a collection view.

```swift
@MainActor
protocol UICollectionViewDataSource: NSObjectProtocol
```

## Signature / Usage

```swift
func collectionView(_ collectionView: UICollectionView,
                    numberOfItemsInSection section: Int) -> Int {
    return items.count
}

func collectionView(_ collectionView: UICollectionView,
                    cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
    let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath)
    // configure cell
    return cell
}
```

## Options / Props

### Required Methods

| Name | Description |
|------|-------------|
| `collectionView(_:numberOfItemsInSection:)` | Returns number of items in the given section |
| `collectionView(_:cellForItemAt:)` | Returns a configured cell for the given index path |

### Optional Methods

| Name | Description |
|------|-------------|
| `numberOfSections(in:)` | Returns total section count (default: 1) |
| `collectionView(_:viewForSupplementaryElementOfKind:at:)` | Provides header or footer supplementary views |
| `collectionView(_:canMoveItemAt:)` | Whether an item can be interactively reordered |
| `collectionView(_:moveItemAt:to:)` | Updates model after an item is moved |
| `indexTitles(for:)` | Index titles shown in the right margin |
| `collectionView(_:indexPathForIndexTitle:at:)` | Maps index title to index path |

## Notes

- Available iOS 6.0+, iPadOS 6.0+, Mac Catalyst 13.1+, tvOS, visionOS
- Only `numberOfItemsInSection` and `cellForItemAt` are required
- Consider using `UICollectionViewDiffableDataSource` instead of a custom implementation for automatic diff-driven updates
- Supplementary views (headers/footers) require both this method and layout configuration

## Related

- [UICollectionView](./uicollectionview.md)
- [UICollectionViewDiffableDataSource](./uicollectionviewdiffabledatasource.md)
