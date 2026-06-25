# NSCollectionViewItem

A view controller that manages the views for a single data element in an `NSCollectionView`. Inherits from `NSViewController`.

## Signature / Usage

```swift
class NSCollectionViewItem: NSViewController
```

```swift
// Register and dequeue
collectionView.register(MyCollectionViewItem.self,
                        forItemWithIdentifier: NSUserInterfaceItemIdentifier("item"))

// In NSCollectionViewDataSource
func collectionView(_ collectionView: NSCollectionView,
                    itemForRepresentedObjectAt indexPath: IndexPath) -> NSCollectionViewItem {
    let item = collectionView.makeItem(
        withIdentifier: NSUserInterfaceItemIdentifier("item"),
        for: indexPath) as! MyCollectionViewItem
    item.textField?.stringValue = data[indexPath.item].title
    return item
}
```

## Options / Props

| Property | Type | Description |
|---|---|---|
| `imageView` | `NSImageView?` | Outlet for displaying an image |
| `textField` | `NSTextField?` | Outlet for displaying a string |
| `isSelected` | `Bool` | Whether the item is currently selected |
| `highlightState` | `NSCollectionViewItem.HighlightState` | Current highlight state (`.none`, `.forSelection`, `.forDeselection`, `.asDropTarget`) |
| `collectionView` | `NSCollectionView?` | The parent collection view |
| `draggingImageComponents` | `[NSDraggingImageComponent]` | Components used for multi-image drag |

## Notes

- macOS 10.5+.
- Items must be registered before use via `register(_:forItemWithIdentifier:)` (class or nib).
- Subclass to add custom outlets and configure them in `viewDidLoad()` or on reuse.
- Items are recycled by the collection view; reset state on reuse.

## Related

- [NSCollectionView](./nscollectionview.md)
- [NSCollectionViewDataSource](./nscollectionviewdatasource.md)
