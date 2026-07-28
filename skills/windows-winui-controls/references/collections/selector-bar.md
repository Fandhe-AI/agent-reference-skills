# SelectorBar

A lightweight bar that lets a user switch between a small, fixed number of sets/views of data (icon + text items), with exactly one item selected at a time. Does not adapt/rearrange items for different window sizes.

## Signature / Usage

```xaml
<SelectorBar x:Name="SelectorBar" SelectionChanged="SelectorBar_SelectionChanged">
    <SelectorBarItem x:Name="SelectorBarItemRecent" Text="Recent" Icon="Clock"/>
    <SelectorBarItem x:Name="SelectorBarItemShared" Text="Shared" Icon="Share"/>
    <SelectorBarItem x:Name="SelectorBarItemFavorites" Text="Favorites" Icon="Favorite"/>
</SelectorBar>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Items` | `IVector<SelectorBarItem>` | Populated in XAML or code. No `ItemsSource` — intended for a small, fixed set of options only. |
| `SelectedItem` | `SelectorBarItem` | Get/set the active item; synchronized with the item's `IsSelected`. Auto-set to the first focusable item when the bar gets focus with no selection. Setting an item not in `Items` throws. |
| `SelectionChanged` | event | Raised on UI Automation, tab focus, arrow-key navigation, tap/click, or programmatic selection. |

### SelectorBarItem (an ItemContainer)

| Name | Type | Description |
|------|------|-------------|
| `Text` | `string` | Item label (recommended to always set). |
| `Icon` | `IconElement` | `AnimatedIcon`, `BitmapIcon`, `FontIcon`, `IconSourceElement`, `ImageIcon`, `PathIcon`, or `SymbolIcon`. |
| `IsSelected` | `bool` | Inherited from `ItemContainer`; synchronized with `SelectorBar.SelectedItem`. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3), added in WinUI 3.1.5. Not available in UWP/WinUI 2. Distinct from web/other-framework "tab" or "segmented control" primitives.
- There is no `SelectedIndex` property — compute it with `selectorBar.Items.IndexOf(selectorBar.SelectedItem)`.
- Choose `SelectorBar` over alternatives based on scenario: `NavigationView` for adaptive top-level app navigation, `TabView` when views can be opened/closed/rearranged/torn off, `PipsPager` for simple pagination, `RadioButtons` when no default selection and context is unrelated to page navigation.
- Typical pattern: handle `SelectionChanged`, look up `sender.Items.IndexOf(sender.SelectedItem)`, and either `Frame.Navigate` to a different page or swap the `ItemsSource` of a paired `ItemsView`/`ListView`.

## Related

- [ItemContainer](./item-container.md)
- [ItemsView](./items-view.md)
