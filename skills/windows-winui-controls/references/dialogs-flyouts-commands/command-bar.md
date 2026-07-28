# CommandBar

A general-purpose, flexible app bar that gives users easy access to an app's most common tasks, showing app-level or page-specific commands via `AppBarButton`, `AppBarToggleButton`, and `AppBarSeparator` elements.

## Signature / Usage

```xaml
<CommandBar>
    <AppBarToggleButton Icon="Shuffle" Label="Shuffle" Click="AppBarButton_Click" />
    <AppBarToggleButton Icon="RepeatAll" Label="Repeat" Click="AppBarButton_Click"/>
    <AppBarSeparator/>
    <AppBarButton Icon="Back" Label="Back" Click="AppBarButton_Click"/>
    <AppBarButton Icon="Play" Label="Play" Click="AppBarButton_Click"/>

    <CommandBar.SecondaryCommands>
        <AppBarButton Label="Like" Click="AppBarButton_Click"/>
        <AppBarButton Label="Dislike" Click="AppBarButton_Click"/>
    </CommandBar.SecondaryCommands>

    <CommandBar.Content>
        <TextBlock Text="Now playing..." Margin="12,14"/>
    </CommandBar.Content>
</CommandBar>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| PrimaryCommands | IObservableVector\<ICommandBarElement\> | Commands shown in the primary command area (right-aligned); default collection for items added directly |
| SecondaryCommands | IObservableVector\<ICommandBarElement\> | Commands shown in the overflow menu when the bar is open |
| Content | object | Content shown left-aligned in the bar (inherited from `ContentControl`) |
| DefaultLabelPosition | CommandBarDefaultLabelPosition | Position of app bar button labels, e.g. `Bottom` (default) or `Right` |
| ClosedDisplayMode | AppBarClosedDisplayMode | Closed-state appearance: `Compact` (default), `Minimal`, or `Hidden` |
| IsOpen | bool | Whether the bar is showing its open state (labels + overflow menu) |
| IsSticky | bool | If `true`, disables light-dismiss so the bar stays open until explicitly closed |
| IsDynamicOverflowEnabled | bool | Whether primary commands automatically move into the overflow menu when space is limited |
| OverflowButtonVisibility | CommandBarOverflowButtonVisibility | Controls visibility of the "see more" [...] button |

Both `PrimaryCommands` and `SecondaryCommands` accept only types implementing `ICommandBarElement` (`AppBarButton`, `AppBarToggleButton`, `AppBarSeparator`). Wrap other elements in `AppBarElementContainer` to include them.

## Events

| Name | Description |
|------|-------------|
| Opening / Opened | Occur before/after the bar transitions to its open state |
| Closing / Closed | Occur before/after the bar transitions to its closed state |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.ToolBar` (WPF) and Jetpack Compose `TopAppBar`/`BottomAppBar`.
- On small screens (320 epx width), a maximum of 4 primary commands fit in the bar; excess primary commands overflow into secondary automatically unless `IsDynamicOverflowEnabled` is `false`.
- Assign to `Page.BottomAppBar` to keep the bar visible above the on-screen keyboard (SIP); otherwise place it inline or at the top/bottom of the window.
- For contextual commands tied to a specific canvas element (rather than app-wide), prefer `CommandBarFlyout`.

## Related

- [CommandBarFlyout](./command-bar-flyout.md)
- [AppBarButton](./app-bar-button.md)
- [AppBarToggleButton](./app-bar-toggle-button.md)
- [AppBarSeparator](./app-bar-separator.md)
