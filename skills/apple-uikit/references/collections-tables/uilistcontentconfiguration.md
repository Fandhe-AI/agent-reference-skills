# UIListContentConfiguration

A content configuration that describes the styling and content for list cells, headers, and footers in table views and collection view list layouts.

```swift
struct UIListContentConfiguration: UIContentConfiguration, Hashable
```

## Signature / Usage

```swift
var content = cell.defaultContentConfiguration()
content.image = UIImage(systemName: "star")
content.text = "Favorites"
content.secondaryText = "42 items"
content.imageProperties.tintColor = .purple
cell.contentConfiguration = content
```

## Options / Props

### Factory Methods (Cell)

| Method | Description |
|--------|-------------|
| `cell()` | Standard list cell |
| `subtitleCell()` | Cell with subtitle below primary text |
| `valueCell()` | Cell with secondary text trailing (value style) |
| `sidebarCell()` | Sidebar-styled cell |
| `sidebarSubtitleCell()` | Sidebar cell with subtitle |
| `accompaniedSidebarCell()` | Accompanied sidebar cell |

### Factory Methods (Header / Footer)

| Method | Description |
|--------|-------------|
| `plainHeader()` / `plainFooter()` | Plain list style |
| `groupedHeader()` / `groupedFooter()` | Grouped list style |
| `prominentInsetGroupedHeader()` | Prominent inset-grouped header |
| `sidebarHeader()` | Sidebar section header |

### Content Properties

| Name | Type | Description |
|------|------|-------------|
| `text` | `String?` | Primary label text |
| `attributedText` | `NSAttributedString?` | Attributed primary text |
| `secondaryText` | `String?` | Secondary label text |
| `image` | `UIImage?` | Leading image |

### Appearance Properties

| Name | Type | Description |
|------|------|-------------|
| `imageProperties` | `ImageProperties` | Tint, size, corner radius, and reserved layout size for the image |
| `textProperties` | `TextProperties` | Font, color, alignment, and transform for primary text |
| `secondaryTextProperties` | `TextProperties` | Font, color, alignment for secondary text |
| `alpha` | `CGFloat` | Overall opacity |
| `prefersSideBySideTextAndSecondaryText` | `Bool` | Lay out text and secondary text horizontally |

### Layout Properties

| Name | Type | Description |
|------|------|-------------|
| `directionalLayoutMargins` | `NSDirectionalEdgeInsets` | Content margins |
| `imageToTextPadding` | `CGFloat` | Spacing between image and text |
| `textToSecondaryTextVerticalPadding` | `CGFloat` | Vertical spacing between text labels |

## Notes

- Available iOS 14.0+, iPadOS 14.0+, Mac Catalyst, tvOS 14.0+, visionOS
- Obtain an instance via `cell.defaultContentConfiguration()` to get system-appropriate default styling
- Conforms to `UIContentConfiguration`; assign to `cell.contentConfiguration` to apply
- Use `ImageProperties.reservedLayoutSize` to ensure consistent image column alignment across cells

## Related

- [UICollectionViewListCell](./uicollectionviewlistcell.md)
- [UITableViewCell](./uitableviewcell.md)
- [UICollectionViewCell](./uicollectionviewcell.md)
