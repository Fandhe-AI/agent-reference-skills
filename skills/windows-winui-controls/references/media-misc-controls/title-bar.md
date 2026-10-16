# TitleBar

Provides a simplified way to create a custom app title bar that identifies the app, hosts system caption buttons, and lets the user drag the window.

## Signature / Usage

```xaml
<Window.SystemBackdrop>
    <MicaBackdrop Kind="Base"/>
</Window.SystemBackdrop>

<TitleBar x:Name="SimpleTitleBar" Title="My App">
    <TitleBar.IconSource>
        <FontIconSource Glyph="&#xF4AA;"/>
    </TitleBar.IconSource>
</TitleBar>
```

```csharp
public MainWindow()
{
    this.InitializeComponent();
    // Hides the default system title bar.
    ExtendsContentIntoTitleBar = true;
    // Replace system title bar with the WinUI TitleBar control.
    SetTitleBar(SimpleTitleBar);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Title / Subtitle | string | Primary and secondary text shown in the title bar. |
| IconSource | IconSource | App icon shown in the title bar. |
| LeftHeader / Content / RightHeader | object | Slots for custom content (e.g. `AutoSuggestBox`, `PersonPicture`). |
| IsBackButtonVisible / IsBackButtonEnabled / BackRequested | bool / bool / event | Built-in back button for navigation. |
| IsPaneToggleButtonVisible / PaneToggleRequested | bool / event | Pane-toggle button, intended for use with `NavigationView`. |
| TitleBar.IsDragRegion (attached) | bool? | Windows App SDK 2.1.3+. `null` (unset): the control decides (interactive controls clickable, others draggable). `True`: draggable even if interactive. `False`: clickable. Set on a panel, it applies to the children. |
| AutoRefreshDragRegions | bool | Windows App SDK 2.1.3+. Default `False`. When `True`, drag regions are recomputed after every layout pass; can affect performance. |
| RecomputeDragRegions() | method | Windows App SDK 2.1.3+. Call after adding, removing, or resizing title bar content at run time. |
| SetIsDragRegion / GetIsDragRegion / IsDragRegionProperty | method / method / DependencyProperty | Code access to `IsDragRegion`; `GetIsDragRegion` returns `null` when unset. Reset with `ClearValue(TitleBar.IsDragRegionProperty)`. |

Override the drag behavior of an element (make a group clickable as a whole):

```xaml
<StackPanel Orientation="Horizontal" Spacing="8" TitleBar.IsDragRegion="False">
    <ComboBox PlaceholderText="Font" />
    <ComboBox PlaceholderText="Size" />
    <ToggleButton Content="Bold" />
</StackPanel>
```

## Notes

- Windows App SDK 2.1.3 (released 2026-05-21): the control walks the content tree and excludes only interactive controls (buttons, text boxes, combo boxes) from the drag region. Empty space and non-interactive elements such as `TextBlock` are draggable by default; earlier versions let empty space in the content area block window dragging. This is the runtime compatibility change `TitleBar_ContentDragRegions`, which can be turned off with `RuntimeCompatibilityOptions.DisabledChanges`.
- The control updates drag regions when content is set or replaced, loads, the title bar resizes, or `IsDragRegion` changes. Drag regions affect pointer input only, not keyboard focus or UI Automation.
- Set `IsDragRegion` on the smallest element that needs it.

- Package: `Microsoft.UI.Xaml.Controls.TitleBar` (WinUI 3). System caption buttons themselves are not part of this control — space is reserved for them but their behavior/customization comes from `Microsoft.UI.Windowing.AppWindowTitleBar`. Distinct from `System.Windows.Window` chrome (WPF) and Android/Apple window title bars.
- Requires `Window.ExtendsContentIntoTitleBar = true` and `Window.SetTitleBar(titleBarElement)` to replace the default system title bar.
- Can be styled with Mica theming and integrated with `NavigationView` (hide the nav view's own back/pane-toggle buttons and drive them via the `TitleBar` instead).
- Layout mirrors when `FlowDirection` is `RightToLeft`.

## Related

- [PersonPicture](./person-picture.md)
- [MediaPlayerElement](./media-player-element.md)
