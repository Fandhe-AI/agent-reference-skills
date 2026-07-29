# NavigationView

An adaptive control that implements top-level navigation for an app, supporting both *top* and *left* navigation styles, hierarchical navigation, and a built-in back button.

## Signature / Usage

```xaml
<NavigationView x:Name="NavView"
                 ItemInvoked="NavView_ItemInvoked"
                 BackRequested="NavView_BackRequested">
    <NavigationView.MenuItems>
        <NavigationViewItem Tag="App.HomePage" Icon="Home" Content="Home"/>
        <NavigationViewItem Content="Collections" Icon="Keyboard">
            <NavigationViewItem.MenuItems>
                <NavigationViewItem Tag="App.NotesPage" Content="Notes" Icon="Page"/>
                <NavigationViewItem Tag="App.MailPage" Content="Mail" Icon="Mail"/>
            </NavigationViewItem.MenuItems>
        </NavigationViewItem>
    </NavigationView.MenuItems>
    <Frame x:Name="ContentFrame"/>
</NavigationView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| PaneDisplayMode | enum | `Top`, `Left`, `LeftCompact`, `LeftMinimal`, or `Auto` (default) — controls where and how the pane is shown |
| MenuItems / MenuItemsSource | collection | Navigation items shown at the start of the pane |
| FooterMenuItems | collection | Navigation items placed at the end of the pane, before Settings |
| IsSettingsVisible | bool | Shows/hides the built-in Settings entry |
| IsBackButtonVisible | NavigationViewBackButtonVisible | Shows/hides the back button (default `Auto`) |
| IsBackEnabled | bool | Enables/disables the back button; typically bound to `Frame.CanGoBack` |
| AutoSuggestBox | AutoSuggestBox | Optional app-level search box hosted in the pane |
| CompactModeThresholdWidth / ExpandedModeThresholdWidth | double | Breakpoints for `Auto` adaptive behavior |

### Top vs. left navigation

Recommend **top** navigation when: there are 5 or fewer top-level categories of equal importance, all options should be visible on screen, more content space is desired, or icons can't clearly describe categories.

Recommend **left** navigation when: there are 5-10 equally important top-level categories, or navigation should be prominent even at the cost of content space.

`Auto` (the default) adapts between `LeftMinimal` (≤640px), `LeftCompact` (641-1007px), and `Left` (≥1008px).

### Hierarchical navigation

Use `NavigationViewItem.MenuItems` (or `MenuItemsSource` bound to child data with `ItemTemplate` set to a `NavigationViewItem`) to nest child items under a parent. NavigationView shows hierarchy in `Top`, `Left`, and `LeftCompact` display modes. Although any number of nested levels is supported, keep the hierarchy to two levels for usability.

### Navigation and backwards navigation

`NavigationView` does not perform navigation automatically — handle `ItemInvoked` (raised whenever an item is tapped, even if already selected) or `SelectionChanged` (raised on a real selection change) to navigate your `Frame`. It has a built-in back button, but you must handle the `BackRequested` event yourself to call `Frame.GoBack()`.

## Notes

- Package: `Microsoft.UI.Xaml.Controls.NavigationView` (WinUI 3). Distinct from React Router's `<nav>`/route components, Jetpack Compose Navigation's `NavHost`, and Apple SwiftUI's `NavigationSplitView`.

## Related

- [Navigation basics](./navigation-basics.md)
- [Navigation history and backwards navigation](./navigation-history-and-backwards-navigation.md)
- [Tab View](./tab-view.md)
- [Auto-suggest box (Search)](./auto-suggest-box.md)
