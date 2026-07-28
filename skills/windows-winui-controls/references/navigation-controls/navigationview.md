# NavigationView

Adaptive top-level navigation control that supports both *top* and *left* navigation styles, and adapts to different window sizes.

## Signature / Usage

```xaml
<NavigationView x:Name="NavView"
                 ItemInvoked="NavView_ItemInvoked"
                 BackRequested="NavView_BackRequested">
    <NavigationView.MenuItems>
        <NavigationViewItem Content="Home" Icon="Home" Tag="HomePage"/>
        <NavigationViewItemSeparator/>
        <NavigationViewItem Content="Apps" Tag="AppsPage"/>
    </NavigationView.MenuItems>

    <Frame x:Name="ContentFrame"/>
</NavigationView>
```

```csharp
private void NavView_ItemInvoked(NavigationView sender, NavigationViewItemInvokedEventArgs args)
{
    if (args.InvokedItemContainer != null)
    {
        Type navPageType = Type.GetType(args.InvokedItemContainer.Tag.ToString());
        ContentFrame.Navigate(navPageType);
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `PaneDisplayMode` | `NavigationViewPaneDisplayMode` | `Auto` (default), `Left`, `LeftCompact`, `LeftMinimal`, `Top`. Controls pane position/collapse behavior. |
| `MenuItems` | `IList<object>` | Navigation items shown at the start of the pane (`NavigationViewItem`, `NavigationViewItemSeparator`, `NavigationViewItemHeader`). |
| `MenuItemsSource` | `object` | Data-bound alternative to `MenuItems`; use with `MenuItemTemplate`. |
| `FooterMenuItems` | `IList<object>` | Navigation items placed at the end of the pane, before `Settings`. |
| `SelectedItem` | `object` | Gets/sets the currently selected navigation item. |
| `IsSettingsVisible` | `bool` | Shows/hides the built-in Settings entry (default `true`). |
| `IsPaneOpen` | `bool` | Gets/sets whether the pane is expanded. |
| `IsPaneToggleButtonVisible` | `bool` | Shows/hides the pane toggle (hamburger) button. |
| `IsBackButtonVisible` | `NavigationViewBackButtonVisible` | Shows/hides the back button (`Auto` by default). |
| `IsBackEnabled` | `bool` | Enables/disables the back button; typically bound to `Frame.CanGoBack`. |
| `AlwaysShowHeader` | `bool` | Whether the `Header` area stays visible outside `Minimal` mode. |
| `Header` | `object` | Content shown in the header area (typically the current page title). |
| `PaneTitle` | `string` | Text shown next to the menu button. |
| `PaneHeader` / `PaneFooter` / `PaneCustomContent` | `UIElement` | Free-form content areas in the pane. |
| `AutoSuggestBox` | `AutoSuggestBox` | Optional search box shown in the pane. |
| `CompactModeThresholdWidth` / `ExpandedModeThresholdWidth` | `double` | Width breakpoints for `Auto` adaptive behavior. |

## Events

- `ItemInvoked` — raised whenever the user taps a navigation item (even if already selected).
- `SelectionChanged` — raised when the selected item changes (user or programmatic).
- `BackRequested` — raised when the user taps the back button; back navigation is not automatic.
- `Expanding` / `Collapsed` — raised for hierarchical menu items with children.

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` navigation primitives, and Jetpack Compose `NavigationBar`/`NavigationRail` (android-navigation).
- NavigationView doesn't perform navigation automatically; handle `ItemInvoked` (or `SelectionChanged`) and call `Frame.Navigate`.
- Supports hierarchical navigation via nested `MenuItems`/`MenuItemsSource` on `NavigationViewItem`.
- The Pivot control's guidance recommends NavigationView (or TabView) instead for Windows 11 design patterns.

## Related

- [NavigationViewItem](./navigationviewitem.md)
- [Frame](./frame.md)
- [TabView](./tabview.md)
