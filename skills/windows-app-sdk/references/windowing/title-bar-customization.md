# Custom title bar

Guide for building a fully custom title bar by extending app content into the title bar area with `AppWindowTitleBar.ExtendsContentIntoTitleBar` (or `Window.ExtendsContentIntoTitleBar`), and defining interactive/drag regions with `InputNonClientPointerSource`.

## Signature / Usage

```csharp
public sealed partial class MainWindow : Window
{
    private AppWindow m_AppWindow;

    public MainWindow()
    {
        InitializeComponent();
        m_AppWindow = this.AppWindow;
        AppTitleBar.Loaded += AppTitleBar_Loaded;
        AppTitleBar.SizeChanged += AppTitleBar_SizeChanged;

        ExtendsContentIntoTitleBar = true; // hide system title bar
        m_AppWindow.TitleBar.PreferredHeightOption = TitleBarHeightOption.Tall;
    }

    private void SetRegionsForCustomTitleBar()
    {
        double scale = AppTitleBar.XamlRoot.RasterizationScale;
        RightPaddingColumn.Width = new GridLength(m_AppWindow.TitleBar.RightInset / scale);
        LeftPaddingColumn.Width = new GridLength(m_AppWindow.TitleBar.LeftInset / scale);

        var rects = new[] { GetRect(TitleBarSearchBox, scale), GetRect(PersonPic, scale) };
        InputNonClientPointerSource.GetForWindowId(m_AppWindow.Id)
            .SetRegionRects(NonClientRegionKind.Passthrough, rects);
    }
}
```

```xaml
<Grid x:Name="AppTitleBar" Height="48">
    <Grid.ColumnDefinitions>
        <ColumnDefinition x:Name="LeftPaddingColumn" Width="0"/>
        <ColumnDefinition x:Name="TitleColumn" Width="Auto"/>
        <ColumnDefinition x:Name="RightPaddingColumn" Width="0"/>
    </Grid.ColumnDefinitions>
    <TextBlock x:Name="TitleBarTextBlock" Text="App title" Grid.Column="1"/>
</Grid>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Window.ExtendsContentIntoTitleBar` / `AppWindowTitleBar.ExtendsContentIntoTitleBar` | `bool` | Hides the system title bar; app content covers the whole window. |
| `Window.SetTitleBar(UIElement)` | method | Registers a XAML element as the default drag region (simple case, no interactive content). |
| `InputNonClientPointerSource.SetRegionRects(NonClientRegionKind, RectInt32[])` | method | Marks rectangles as `Passthrough` so interactive controls receive input instead of being treated as drag area. |
| `AppWindowTitleBar.LeftInset` / `RightInset` | `int` | Reserved caption-button widths, used to size padding columns. |
| `AppWindowTitleBar.PreferredHeightOption` | `TitleBarHeightOption` | `Tall` recommended when the title bar hosts interactive controls. |

## Notes

- `ExtendsContentIntoTitleBar` shows in XAML IntelliSense for `Window` but must be set in code, not XAML — setting it in XAML causes an error.
- Caption buttons (minimize/maximize/close) remain system-drawn even in full customization; you cannot place interactive UI under them (input is not delivered there), though you can paint background under them.
- Recalculate interactive regions on `AppTitleBar.SizeChanged` (not on `AppWindow.Changed`), since window maximize/minimize can fire `Changed` before the title bar element resizes.
- `AppWindow` uses physical pixels; XAML uses effective pixels — convert with `XamlRoot.RasterizationScale` when computing `LeftInset`/`RightInset`/interactive rectangles.
- Handle `AppWindow.Changed` with `DidPresenterChange` to show/hide the custom title bar when switching to `FullScreen` / `CompactOverlay` presenters.
- Since Windows App SDK 1.7, a higher-level `TitleBar` control simplifies this process (separate from `AppWindowTitleBar`).
- Windows App SDK 2.1.3 (compatibility ID `TitleBar_ContentDragRegions`): `TitleBar` now walks the visual tree of `TitleBar.Content` and excludes only interactive controls from the drag region; empty gaps and non-interactive visuals are draggable by default. New APIs (2.0 moniker only): attached `TitleBar.IsDragRegion` (nullable bool: `True` = draggable, `False` = clickable, unset = framework decides), `TitleBar.AutoRefreshDragRegions` (`bool`, default `false`; `true` refreshes regions on layout updates), and `TitleBar.RecomputeDragRegions()` (manual recompute after dynamic content changes). This applies to the `TitleBar` control, not to the manual `InputNonClientPointerSource` approach above.
- Package: `Microsoft.UI.Windowing` / `Microsoft.UI.Input` (Windows App SDK / WinUI 3).
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/title-bar
- Source (2.1.3 TitleBar drag regions): https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/release-notes/windows-app-sdk-2-0

## Related

- [AppWindowTitleBar](./app-window-titlebar.md)
- [AppWindow](./app-window.md)
- [Microsoft.UI.Xaml.Window](./xaml-window.md)
