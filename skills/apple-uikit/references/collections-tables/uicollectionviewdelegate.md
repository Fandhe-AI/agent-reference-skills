# UICollectionViewDelegate

A protocol for managing user interactions with items in a collection view. All methods are optional.

```swift
@MainActor
protocol UICollectionViewDelegate: UIScrollViewDelegate
```

## Signature / Usage

```swift
func collectionView(_ collectionView: UICollectionView,
                    didSelectItemAt indexPath: IndexPath) {
    collectionView.deselectItem(at: indexPath, animated: true)
    // handle selection
}
```

## Options / Props

### Selection

| Method | Description |
|--------|-------------|
| `collectionView(_:shouldSelectItemAt:)` | Return `false` to prevent selection |
| `collectionView(_:didSelectItemAt:)` | Called after item is selected |
| `collectionView(_:shouldDeselectItemAt:)` | Return `false` to prevent deselection |
| `collectionView(_:didDeselectItemAt:)` | Called after item is deselected |

### Highlighting

| Method | Description |
|--------|-------------|
| `collectionView(_:shouldHighlightItemAt:)` | Return `false` to suppress highlight |
| `collectionView(_:didHighlightItemAt:)` | Called when highlight is applied |
| `collectionView(_:didUnhighlightItemAt:)` | Called when highlight is removed |

### Display Lifecycle

| Method | Description |
|--------|-------------|
| `collectionView(_:willDisplay:forItemAt:)` | Cell is about to be displayed |
| `collectionView(_:didEndDisplaying:forItemAt:)` | Cell was removed from view |
| `collectionView(_:willDisplaySupplementaryView:forElementKind:at:)` | Supplementary view about to display |

### Context Menu

| Method | Description |
|--------|-------------|
| `collectionView(_:contextMenuConfigurationForItemsAt:point:)` | Returns menu configuration |
| `collectionView(_:willDisplayContextMenu:animator:)` | Context menu will appear |
| `collectionView(_:willEndContextMenuInteraction:animator:)` | Context menu will disappear |

### Focus

| Method | Description |
|--------|-------------|
| `collectionView(_:canFocusItemAt:)` | Whether an item can receive focus |
| `indexPathForPreferredFocusedView(in:)` | Preferred focused index path |
| `collectionView(_:selectionFollowsFocusForItemAt:)` | Whether selection tracks focus |

## Notes

- Available iOS 6.0+, iPadOS 6.0+, Mac Catalyst 13.1+, tvOS, visionOS
- Inherits from `UIScrollViewDelegate`; all scroll view callbacks are available
- `UICollectionViewDelegateFlowLayout` extends this protocol with size/spacing methods for flow layouts

## Related

- [UICollectionView](./uicollectionview.md)
- [UICollectionViewDataSource](./uicollectionviewdatasource.md)
