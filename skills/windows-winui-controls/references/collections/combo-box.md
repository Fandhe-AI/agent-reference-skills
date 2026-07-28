# ComboBox

A drop-down list: starts collapsed showing the current selection (or empty), and expands to show selectable items. Derives from `Selector` like `ListView`/`GridView`. Supports optional free-text entry via `IsEditable`.

## Signature / Usage

```xaml
<ComboBox x:Name="FontsCombo" Header="Fonts" Width="296"
          ItemsSource="{x:Bind fonts}" DisplayMemberPath="Source"
          SelectionChanged="ColorComboBox_SelectionChanged"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | Data source collection; items wrapped in `ComboBoxItem` containers. Mutually exclusive with populating `Items` directly. |
| `DisplayMemberPath` | `string` | Property shown as text when no `ItemTemplate` is used. |
| `SelectedItem` / `SelectedIndex` | `object` / `int` | Selected item/index (inherited from `Selector`). Set only after `Items` is populated (e.g., in the `Loaded` handler) unless items are declared in XAML. |
| `SelectedValue` / `SelectedValuePath` | `object` / `string` | Gets a specific property value of the selected item. |
| `SelectionChangedTrigger` | `ComboBoxSelectionChangedTrigger` | `Committed` (default) fires `SelectionChanged` only on commit; `Always` fires it live while navigating the open list with arrow keys. |
| `IsTextSearchEnabled` | `bool` | Default `true`; type-ahead jumps to matching items in the (open or closed) list. |
| `IsEditable` | `bool` | Allows free-text entry not present in the list. |
| `Text` | `string` | Current text when editable. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from WPF `ComboBox` and HTML `<select>`.
- Use a drop-down list only for single-line text options; use `ListView`/`GridView` for multi-line or image content, and `RadioButtons`/`CheckBox` when there are fewer than five options.
- `SelectionChanged` fires on commit (click/tap/Enter) by default; the open list's arrow-key navigation does not change selection unless `SelectionChangedTrigger="Always"`.
- Editable mode: handle `TextSubmitted` (fires when `IsEditable="true"`, entered text doesn't match an existing item, and the user presses Enter or moves focus). Set `e.Handled = true` to keep the combo box in editing state and prevent `SelectedItem` from updating (e.g., to reject invalid input and revert `Text`).

## Related

- [ListBox](./list-box.md)
- [SelectorBar](./selector-bar.md)
