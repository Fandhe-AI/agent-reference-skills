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
| IsBackEnabled | bool | Enables/disables the back button; typically bound to `Frame.CanGoBack`. `BackRequested` is not raised if `IsBackEnabled` is false |
| AutoSuggestBox | AutoSuggestBox | Optional app-level search box hosted in the pane |
| PaneTitle | string | Text shown next to the menu button |
| PaneHeader | object | Non-text header content (for example a logo); if both are set, `PaneTitle` sits closest to the menu button |
| PaneCustomContent | object | Free-form content placed in the pane |
| PaneFooter | object | Free-form footer content; only navigation items belong in `FooterMenuItems` |
| IsPaneToggleButtonVisible | bool | Shows/hides the menu (pane toggle) button; can be hidden on larger windows when the pane is open |
| IsTitleBarAutoPaddingEnabled | bool | Whether NavigationView auto-pads for a custom `Window.SetTitleBar` UIElement |
| DisplayModeChanged | event | Raised when the display mode changes |
| CompactModeThresholdWidth / ExpandedModeThresholdWidth | double | Breakpoints for `Auto` adaptive behavior |

### Top vs. left navigation

Recommend **top** navigation when: there are 5 or fewer top-level categories of equal importance, all options should be visible on screen, more content space is desired, or icons can't clearly describe categories.

Recommend **left** navigation when: there are 5-10 equally important top-level categories, or navigation should be prominent even at the cost of content space.

`Auto` (the default) adapts between `LeftMinimal` (≤640px), `LeftCompact` (641-1007px), and `Left` (≥1008px).

### Hierarchical navigation

Use `NavigationViewItem.MenuItems` (or `MenuItemsSource` bound to child data with `ItemTemplate` set to a `NavigationViewItem`) to nest child items under a parent. NavigationView shows hierarchy in `Top`, `Left`, and `LeftCompact` display modes. Although any number of nested levels is supported, keep the hierarchy to two levels for usability.

### Navigation and backwards navigation

`NavigationView` does not perform navigation automatically — handle `ItemInvoked` (raised whenever an item is tapped, even if already selected) or `SelectionChanged` (raised on a real selection change) to navigate your `Frame`. It has a built-in back button, but you must handle the `BackRequested` event yourself to call `Frame.GoBack()`.

### Pane backgrounds

By default the expanded `Left` pane is solid grey, and the overlay pane in `Top`, `Minimal`, or `Compact` mode uses in-app acrylic. Override these XAML theme resources per display mode:

| Display mode | Theme resource |
| --- | --- |
| Left | NavigationViewExpandedPaneBackground |
| LeftCompact / LeftMinimal | NavigationViewDefaultPaneBackground |
| Top | NavigationViewTopPaneBackground |

When overriding theme resources, always provide "Default" and "HighContrast" theme dictionaries at a minimum, plus "Light" / "Dark" as needed (`ResourceDictionary.ThemeDictionaries`).

### Title bar integration (top whitespace)

Recommended: place a `TitleBar` control above NavigationView (the pattern used by the WinUI 3 Gallery). Set `IsBackButtonVisible="Collapsed"` and `IsPaneToggleButtonVisible="False"` on NavigationView, and forward `TitleBar.PaneToggleRequested` to `NavView.IsPaneOpen` and `TitleBar.BackRequested` to `Frame.GoBack()`. Hide the TitleBar pane toggle when `PaneDisplayMode` is `Top`, using `DisplayModeChanged`.

```xaml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto" />
        <RowDefinition Height="*" />
    </Grid.RowDefinitions>

    <TitleBar x:Name="titleBar"
              Title="My App"
              IsPaneToggleButtonVisible="True"
              PaneToggleRequested="TitleBar_PaneToggleRequested"
              IsBackButtonVisible="{x:Bind contentFrame.CanGoBack, Mode=OneWay}"
              BackRequested="TitleBar_BackRequested" />

    <NavigationView x:Name="NavView"
                    Grid.Row="1"
                    IsBackButtonVisible="Collapsed"
                    IsPaneToggleButtonVisible="False"
                    DisplayModeChanged="NavView_DisplayModeChanged">
        <Frame x:Name="contentFrame" />
    </NavigationView>
</Grid>
```

When the drag region is a custom `Window.SetTitleBar` UIElement instead, NavigationView auto-pads; set `IsTitleBarAutoPaddingEnabled="False"` to turn that off. Override the `NavigationViewHeaderMargin` theme resource to adjust the margin around `NavigationView.Header`.

## Notes

- The official page moved from `/windows/apps/design/controls/navigationview` to `/windows/apps/develop/ui/controls/navigationview` (the Controls docs were moved from Design to Develop); the old URL redirects (confirmed in `.openpublishing.redirection.json`).
- Package: `Microsoft.UI.Xaml.Controls.NavigationView` (WinUI 3). Distinct from React Router's `<nav>`/route components, Jetpack Compose Navigation's `NavHost`, and Apple SwiftUI's `NavigationSplitView`.
- `TitleBar.IsBackButtonEnabled` defaults to `true`, so the official sample binds only `IsBackButtonVisible` to `Frame.CanGoBack` (see the TitleBar.IsBackButtonEnabled API reference: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.titlebar.isbackbuttonenabled).

## Related

- [Navigation basics](./navigation-basics.md)
- [Navigation history and backwards navigation](./navigation-history-and-backwards-navigation.md)
- [Tab View](./tab-view.md)
- [Auto-suggest box (Search)](./auto-suggest-box.md)
