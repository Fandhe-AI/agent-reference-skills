# UICollectionViewCell

A single data item when that item is within the collection view's visible bounds.

```swift
@MainActor
class UICollectionViewCell: UICollectionReusableView
```

## Signature / Usage

```swift
// Register and dequeue using CellRegistration (modern API)
let cellRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, Item> { cell, indexPath, item in
    var content = cell.defaultContentConfiguration()
    content.text = item.title
    cell.contentConfiguration = content
}

let cell = collectionView.dequeueConfiguredReusableCell(
    using: cellRegistration, for: indexPath, item: item)
```

## Options / Props

### Content

| Name | Type | Description |
|------|------|-------------|
| `contentConfiguration` | `(any UIContentConfiguration)?` | Modern content descriptor |
| `contentView` | `UIView` | Container for custom subviews |
| `automaticallyUpdatesContentConfiguration` | `Bool` | Auto-update on state change |

### Background

| Name | Type | Description |
|------|------|-------------|
| `backgroundConfiguration` | `UIBackgroundConfiguration?` | Modern background descriptor |
| `backgroundView` | `UIView?` | Background shown in normal state |
| `selectedBackgroundView` | `UIView?` | Background shown when selected |
| `automaticallyUpdatesBackgroundConfiguration` | `Bool` | Auto-update on state change |

### State

| Name | Type | Description |
|------|------|-------------|
| `isSelected` | `Bool` | Whether the cell is selected |
| `isHighlighted` | `Bool` | Whether the cell is highlighted |
| `configurationState` | `UICellConfigurationState` | Combined state for configuration |
| `configurationUpdateHandler` | `ConfigurationUpdateHandler?` | Closure called on state change |

## Notes

- Available iOS 6.0+, iPadOS 6.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Add custom subviews to `contentView`, not directly to the cell
- Use `defaultBackgroundConfiguration()` to get a pre-configured background with system defaults
- The cell manages layered views: content view, background view, and selected background view

## Related

- [UICollectionView](./uicollectionview.md)
- [UICollectionViewListCell](./uicollectionviewlistcell.md)
- [UIListContentConfiguration](./uilistcontentconfiguration.md)
