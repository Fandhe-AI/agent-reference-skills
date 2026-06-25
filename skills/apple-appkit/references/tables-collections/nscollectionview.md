# NSCollectionView

An ordered collection of data items displayed in a customizable layout. Items are organized in sections, and layout is fully pluggable via `NSCollectionViewLayout` subclasses.

## Signature / Usage

```swift
class NSCollectionView: NSView
```

```swift
collectionView.dataSource = self
collectionView.delegate = self
collectionView.collectionViewLayout = NSCollectionViewFlowLayout()
collectionView.register(MyItem.self,
                        forItemWithIdentifier: NSUserInterfaceItemIdentifier("item"))
collectionView.reloadData()
```

## Options / Props

**Configuration:**

| Property | Type | Description |
|---|---|---|
| `dataSource` | `NSCollectionViewDataSource?` | Object providing items and supplementary views |
| `delegate` | `NSCollectionViewDelegate?` | Object handling selection and drag-and-drop |
| `collectionViewLayout` | `NSCollectionViewLayout` | Layout object controlling item positions |
| `isSelectable` | `Bool` | Whether items can be selected |
| `allowsMultipleSelection` | `Bool` | Whether multiple items can be selected simultaneously |
| `allowsEmptySelection` | `Bool` | Whether selection can be empty |
| `selectionIndexPaths` | `Set<IndexPath>` | Currently selected index paths |
| `backgroundView` | `NSView?` | View rendered behind all items |
| `backgroundColors` | `[NSColor]` | Background color(s) |

**Registration:**

| Method | Description |
|---|---|
| `register(_:forItemWithIdentifier:)` | Register a class for item reuse |
| `register(_:forItemWithIdentifier:)` | Register a nib for item reuse (nib overload) |
| `register(_:forSupplementaryViewOfKind:withIdentifier:)` | Register a supplementary view class |
| `makeItem(withIdentifier:for:)` | Dequeue or create an item |
| `makeSupplementaryView(ofKind:withIdentifier:for:)` | Dequeue or create a supplementary view |

**Reload:**

| Method | Description |
|---|---|
| `reloadData()` | Reload all sections and items |
| `reloadSections(_:)` | Reload specific sections |
| `reloadItems(at:)` | Reload items at specific index paths |

**Batch updates:**

| Method | Description |
|---|---|
| `performBatchUpdates(_:completionHandler:)` | Animate multiple insert/delete/move operations together |
| `insertItems(at:)` | Insert items at index paths |
| `deleteItems(at:)` | Delete items at index paths |
| `moveItem(at:to:)` | Move an item |
| `insertSections(_:)` | Insert sections |
| `deleteSections(_:)` | Delete sections |
| `moveSection(_:toSection:)` | Move a section |

**Selection:**

| Method | Description |
|---|---|
| `selectItems(at:scrollPosition:)` | Programmatically select items |
| `deselectItems(at:)` | Deselect items |

**State queries:**

| Method | Description |
|---|---|
| `numberOfSections` | Total number of sections |
| `numberOfItems(inSection:)` | Item count in a section |
| `item(at:)` | Item at an index path (visible only) |
| `indexPathForItem(at:)` | Index path for an item at a point |
| `visibleItems()` | All currently visible items |

## Notes

- macOS 10.5+. Layouts added in macOS 10.11.
- Always update the data source before calling insert/delete/move.
- Do not store `NSCollectionViewItem` references — items are recycled.
- Use `performBatchUpdates` to animate coordinated changes.
- Supplementary views (headers/footers) depend on the layout supporting them (e.g., `NSCollectionViewFlowLayout`).

## Related

- [NSCollectionViewDataSource](./nscollectionviewdatasource.md)
- [NSCollectionViewItem](./nscollectionviewitem.md)
- [NSCollectionViewLayout](./nscollectionviewlayout.md)
- [NSCollectionViewDiffableDataSource](./nscollectionviewdiffabledatasource.md)
