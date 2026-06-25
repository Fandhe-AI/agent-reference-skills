# UITableViewCell

The visual representation of a single row in a table view. Manages content, selection, accessory views, and editing state for one table row.

```swift
@MainActor
class UITableViewCell: UIView
```

## Signature / Usage

```swift
// Modern API using content configuration
let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
var content = cell.defaultContentConfiguration()
content.text = "Row title"
content.image = UIImage(systemName: "star")
cell.contentConfiguration = content
```

## Options / Props

### Content

| Name | Type | Description |
|------|------|-------------|
| `contentConfiguration` | `UIContentConfiguration?` | Modern content descriptor (preferred) |
| `contentView` | `UIView` | Container for custom subviews |
| `automaticallyUpdatesContentConfiguration` | `Bool` | Auto-update on state change |

### Background

| Name | Type | Description |
|------|------|-------------|
| `backgroundConfiguration` | `UIBackgroundConfiguration?` | Modern background descriptor |
| `automaticallyUpdatesBackgroundConfiguration` | `Bool` | Auto-update on state change |

### Selection & Highlighting

| Name | Type | Description |
|------|------|-------------|
| `isSelected` | `Bool` | Current selection state |
| `isHighlighted` | `Bool` | Current highlight state |
| `selectionStyle` | `UITableViewCell.SelectionStyle` | Visual style when selected |

### Accessory

| Name | Type | Description |
|------|------|-------------|
| `accessoryType` | `UITableViewCell.AccessoryType` | Built-in trailing accessory |
| `accessoryView` | `UIView?` | Custom trailing accessory view |
| `editingAccessoryType` | `UITableViewCell.AccessoryType` | Accessory shown during editing |

### Editing & Indentation

| Name | Type | Description |
|------|------|-------------|
| `isEditing` | `Bool` | Current editing state |
| `editingStyle` | `UITableViewCell.EditingStyle` | Delete or insert style |
| `indentationLevel` | `Int` | Indentation level |
| `indentationWidth` | `CGFloat` | Width per indentation level |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Override `prepareForReuse()` to reset custom state before cell is requeued
- Avoid the deprecated `textLabel`, `detailTextLabel`, and `imageView` properties; use `contentConfiguration` instead
- Add custom subviews to `contentView`, not directly to the cell

## Related

- [UITableView](./uitableview.md)
- [UIListContentConfiguration](./uilistcontentconfiguration.md)
