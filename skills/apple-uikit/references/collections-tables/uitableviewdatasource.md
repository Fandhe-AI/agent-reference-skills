# UITableViewDataSource

A protocol that an object adopts to manage data and provide cells for a table view.

```swift
@MainActor
protocol UITableViewDataSource: NSObjectProtocol
```

## Signature / Usage

```swift
func tableView(_ tableView: UITableView,
               numberOfRowsInSection section: Int) -> Int {
    return items.count
}

func tableView(_ tableView: UITableView,
               cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
    var content = cell.defaultContentConfiguration()
    content.text = items[indexPath.row]
    cell.contentConfiguration = content
    return cell
}
```

## Options / Props

### Required Methods

| Name | Description |
|------|-------------|
| `tableView(_:numberOfRowsInSection:)` | Returns number of rows in the given section |
| `tableView(_:cellForRowAt:)` | Returns a configured cell for the given index path |

### Optional Methods

| Name | Description |
|------|-------------|
| `numberOfSections(in:)` | Returns total number of sections (default: 1) |
| `tableView(_:titleForHeaderInSection:)` | String title for a section header |
| `tableView(_:titleForFooterInSection:)` | String title for a section footer |
| `tableView(_:commit:forRowAt:)` | Commits insert or delete for a row; enables swipe-to-delete |
| `tableView(_:canEditRowAt:)` | Whether a row is editable |
| `tableView(_:canMoveRowAt:)` | Whether a row can be reordered |
| `tableView(_:moveRowAt:to:)` | Updates model after a row is moved |
| `sectionIndexTitles(for:)` | Index titles shown in the right margin |
| `tableView(_:sectionForSectionIndexTitle:at:)` | Maps index title to section index |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS
- Only `numberOfRowsInSection` and `cellForRowAt` are required
- Implement `tableView(_:commit:forRowAt:)` with `editingStyle == .delete` to enable swipe-to-delete
- Consider using `UITableViewDiffableDataSource` for automatic diff-driven updates

## Related

- [UITableView](./uitableview.md)
- [UITableViewDiffableDataSource](./uitableviewdiffabledatasource.md)
