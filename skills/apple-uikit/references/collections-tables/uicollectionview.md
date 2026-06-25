# UICollectionView

An object that manages an ordered collection of data items and presents them using customizable layouts.

```swift
@MainActor
class UICollectionView: UIScrollView
```

## Signature / Usage

```swift
let layout = UICollectionViewFlowLayout()
let collectionView = UICollectionView(frame: bounds, collectionViewLayout: layout)
collectionView.register(MyCell.self, forCellWithReuseIdentifier: "Cell")
collectionView.dataSource = self
collectionView.delegate = self
```

## Options / Props

### Initialization

| Name | Type | Description |
|------|------|-------------|
| `collectionViewLayout` | `UICollectionViewLayout` | Current layout object |
| `dataSource` | `UICollectionViewDataSource?` | Object providing data |
| `delegate` | `UICollectionViewDelegate?` | Object handling interactions |

### Cell Registration & Dequeuing

| Method | Description |
|--------|-------------|
| `register(_:forCellWithReuseIdentifier:)` | Registers a class for cell dequeuing |
| `register(_:forSupplementaryViewOfKind:withReuseIdentifier:)` | Registers class for supplementary views |
| `dequeueReusableCell(withReuseIdentifier:for:)` | Returns a reusable cell |
| `dequeueConfiguredReusableCell(using:for:item:)` | Modern typed dequeue using `CellRegistration` |

### Selection

| Name | Type | Description |
|------|------|-------------|
| `allowsSelection` | `Bool` | Enables item selection |
| `allowsMultipleSelection` | `Bool` | Enables multi-item selection |
| `indexPathsForSelectedItems` | `[IndexPath]?` | Currently selected items |

### Data Updates

| Method | Description |
|--------|-------------|
| `performBatchUpdates(_:completion:)` | Animates multiple insertions/deletions together |
| `insertItems(at:)` | Inserts items at specified index paths |
| `deleteItems(at:)` | Deletes items at specified index paths |
| `moveItem(at:to:)` | Moves an item |
| `reloadData()` | Reloads all data |
| `reconfigureItems(at:)` | Updates item data without replacing cells |

### Layout

| Method | Description |
|--------|-------------|
| `setCollectionViewLayout(_:animated:)` | Transitions to a new layout |
| `scrollToItem(at:at:animated:)` | Scrolls to reveal a specific item |

### Drag & Drop

| Name | Type | Description |
|------|------|-------------|
| `dragDelegate` | `UICollectionViewDragDelegate?` | Handles drag operations |
| `dropDelegate` | `UICollectionViewDropDelegate?` | Handles drop operations |
| `dragInteractionEnabled` | `Bool` | Enables drag interaction |

## Notes

- Available iOS 6.0+, iPadOS 6.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Always register cell classes/nibs and dequeue; never create cells directly
- Use `UICollectionViewDiffableDataSource` for simplified, diff-driven data management
- Cell prefetching is enabled by default for smoother scrolling

## Related

- [UICollectionViewDataSource](./uicollectionviewdatasource.md)
- [UICollectionViewDelegate](./uicollectionviewdelegate.md)
- [UICollectionViewCell](./uicollectionviewcell.md)
- [UICollectionViewDiffableDataSource](./uicollectionviewdiffabledatasource.md)
- [UICollectionViewCompositionalLayout](./uicollectionviewcompositionallayout.md)
- [UICollectionViewFlowLayout](./uicollectionviewflowlayout.md)
