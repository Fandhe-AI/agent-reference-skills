# UICollectionViewListCell

A collection view cell with built-in list features, default styling, separators, and support for accessories. Designed for use with compositional list layouts.

```swift
@MainActor
class UICollectionViewListCell: UICollectionViewCell
```

## Signature / Usage

```swift
let cellRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, Item> { cell, indexPath, item in
    var content = cell.defaultContentConfiguration()
    content.text = item.title
    content.image = UIImage(systemName: item.symbolName)
    cell.contentConfiguration = content
    cell.accessories = [.disclosureIndicator()]
}
```

## Options / Props

### Content Configuration

| Method | Description |
|--------|-------------|
| `defaultContentConfiguration()` | Returns pre-styled `UIListContentConfiguration` for the current list appearance |

### Accessories

| Name | Type | Description |
|------|------|-------------|
| `accessories` | `[UICellAccessory]` | Array of accessories decorating the cell (disclosure indicators, checkmarks, etc.) |

### Layout & Separators

| Name | Type | Description |
|------|------|-------------|
| `indentationLevel` | `Int` | Indentation depth |
| `indentationWidth` | `CGFloat` | Width per indentation level |
| `indentsAccessories` | `Bool` | Whether accessories indent along with content |
| `separatorLayoutGuide` | `UILayoutGuide` | Layout guide for aligning separators to primary content |

## Notes

- Available iOS 14.0+, iPadOS 14.0+, Mac Catalyst 14.0+, tvOS 14.0+, visionOS 1.0+
- Intended for use in list sections created with `NSCollectionLayoutSection.list(using:layoutEnvironment:)` or `UICollectionViewCompositionalLayout.list(using:)`
- `separatorLayoutGuide` allows the separator to align with the leading edge of text content rather than the cell edge
- Supports leading and trailing swipe actions when used in a list section

## Related

- [UICollectionViewCell](./uicollectionviewcell.md)
- [UIListContentConfiguration](./uilistcontentconfiguration.md)
- [UICollectionViewCompositionalLayout](./uicollectionviewcompositionallayout.md)
