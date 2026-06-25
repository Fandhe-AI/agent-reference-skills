# NSCollectionViewDataSource

A protocol that provides item counts and configured item/supplementary views to an `NSCollectionView`.

## Signature / Usage

```swift
protocol NSCollectionViewDataSource: NSObjectProtocol
```

```swift
class MyDataSource: NSObject, NSCollectionViewDataSource {
    var items: [[Photo]] = []  // sections of items

    func numberOfSections(in collectionView: NSCollectionView) -> Int {
        return items.count
    }

    func collectionView(_ collectionView: NSCollectionView,
                        numberOfItemsInSection section: Int) -> Int {
        return items[section].count
    }

    func collectionView(_ collectionView: NSCollectionView,
                        itemForRepresentedObjectAt indexPath: IndexPath) -> NSCollectionViewItem {
        let item = collectionView.makeItem(
            withIdentifier: NSUserInterfaceItemIdentifier("item"),
            for: indexPath) as! PhotoItem
        item.imageView?.image = items[indexPath.section][indexPath.item].thumbnail
        return item
    }
}
```

## Options / Props

**Required:**

| Method | Description |
|---|---|
| `collectionView(_:numberOfItemsInSection:)` | Number of items in the specified section |
| `collectionView(_:itemForRepresentedObjectAt:)` | Configured `NSCollectionViewItem` for the given index path |

**Optional:**

| Method | Description |
|---|---|
| `numberOfSections(in:)` | Total section count (defaults to 1 if not implemented) |
| `collectionView(_:viewForSupplementaryElementOfKind:at:)` | Configured supplementary view (header/footer) for the given index path |

## Notes

- macOS only.
- Always register items (and supplementary views) before returning them from data source methods.
- Return a fully configured item; the collection view displays it immediately.
- Call `reloadData()` or use batch update methods when the underlying data changes.

## Related

- [NSCollectionView](./nscollectionview.md)
- [NSCollectionViewItem](./nscollectionviewitem.md)
- [NSCollectionViewDiffableDataSource](./nscollectionviewdiffabledatasource.md)
