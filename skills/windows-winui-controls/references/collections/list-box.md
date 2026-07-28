# ListBox

Lets a user choose one or multiple items from a collection that is always fully expanded (no compact/collapsed state, unlike `ComboBox`). Items scroll if they don't fit the available space.

## Signature / Usage

```xaml
<ListBox SelectionMode="Extended" ItemsSource="{x:Bind Colors}"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | Data source collection; items are wrapped in `ListBoxItem` containers. |
| `Items` | collection | Direct item collection, alternative to `ItemsSource`. |
| `ItemTemplate` | `DataTemplate` | Visual for each item; limit content to a single line of text (use `ListView`/`GridView` instead for multi-line/image content). |
| `SelectionMode` | `ListBoxSelectionMode`/selector mode | Supports single and multiple selection (via inherited `Selector`/multi-select APIs). |
| `SelectedItem` / `SelectedIndex` | `object` / `int` | Selected item and index (single-selection). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from WPF `ListBox` and web `<select multiple>`/listbox patterns.
- Prefer `ListBox` when the full set of alternatives should be prominently visible at all times; prefer `ComboBox` when the selection is secondary and screen space should be conserved.
- Ideal item count for a list box is roughly 3–9; for very few items (2–4) consider `RadioButtons` instead, and for very large collections use `ListView`/`GridView` (with semantic zoom for long grouped lists).
- Don't use a list box to trigger commands or dynamically show/hide other controls — it's for selection only.

## Related

- [ComboBox](./combo-box.md)
- [ListView](./list-view.md)
