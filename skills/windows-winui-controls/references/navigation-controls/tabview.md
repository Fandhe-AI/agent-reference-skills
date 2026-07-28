# TabView

Displays a set of tabs and their content. Supports document-style tabs (dynamically added/closed/reordered/torn out) and static tabs (fixed set, no add/close).

## Signature / Usage

```xaml
<TabView VerticalAlignment="Stretch"
         AddTabButtonClick="TabView_AddTabButtonClick"
         TabCloseRequested="TabView_TabCloseRequested">
    <TabViewItem Header="Home" IsClosable="False">
        <TabViewItem.IconSource>
            <SymbolIconSource Symbol="Home" />
        </TabViewItem.IconSource>
        <TabViewItem.Content>
            <TextBlock Text="TabView content"/>
        </TabViewItem.Content>
    </TabViewItem>
</TabView>
```

```csharp
private void TabView_AddTabButtonClick(TabView sender, object args)
{
    var newTab = new TabViewItem { Header = $"New Document {sender.TabItems.Count}" };
    sender.TabItems.Add(newTab);
    sender.SelectedItem = newTab;
}

private void TabView_TabCloseRequested(TabView sender, TabViewTabCloseRequestedEventArgs args)
{
    sender.TabItems.Remove(args.Tab);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TabItems` | `IList<object>` | Collection of `TabViewItem` (or other objects) hosted by the TabView. |
| `SelectedItem` | `object` | Currently selected tab. |
| `TabWidthMode` | `TabViewWidthMode` | `Equal` (default), `SizeToContent`, `Compact`. |
| `CloseButtonOverlayMode` | `TabViewCloseButtonOverlayMode` | `Always` (default) or `OnPointerOver`. |
| `IsAddTabButtonVisible` | `bool` | Shows/hides the add-tab (+) button; set `false` for static tabs. |
| `CanReorderTabs` | `bool` | Whether the user can drag-reorder tabs. |
| `CanTearOutTabs` | `bool` | Enables tab tear-out into a new window (Windows App SDK 1.6+). |
| `TabStripFooter` / `TabStripHeader` | `UIElement` | Free-form content at either end of the tab strip; required as a draggable region when tabs sit in the title bar. |

## Events

- `AddTabButtonClick` — raised when the user clicks the add-tab button.
- `TabCloseRequested` — raised when the user requests to close a tab (Ctrl+F4 or the close button).
- `SelectionChanged` — raised when the selected tab changes.
- `TabTearOutWindowRequested` / `TabTearOutRequested` / `ExternalTornOutTabsDropping` / `ExternalTornOutTabsDropped` — tab tear-out lifecycle events (only raised when `CanTearOutTabs` is `true`).

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). For more than a few static navigation items, prefer `NavigationView` instead.
- `Width` is ignored on `TabViewItem`; use `TabWidthMode` to control sizing.
- Supports Ctrl+T / Ctrl+W / Ctrl+Tab / Ctrl+1-9 keyboard conventions when implemented manually via `KeyboardAccelerator`.

## Related

- [TabViewItem](./tabviewitem.md)
- [NavigationView](./navigationview.md)
