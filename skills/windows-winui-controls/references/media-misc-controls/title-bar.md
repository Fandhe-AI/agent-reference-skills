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

## Notes

- Package: `Microsoft.UI.Xaml.Controls.TitleBar` (WinUI 3). System caption buttons themselves are not part of this control — space is reserved for them but their behavior/customization comes from `Microsoft.UI.Windowing.AppWindowTitleBar`. Distinct from `System.Windows.Window` chrome (WPF) and Android/Apple window title bars.
- Requires `Window.ExtendsContentIntoTitleBar = true` and `Window.SetTitleBar(titleBarElement)` to replace the default system title bar.
- Can be styled with Mica theming and integrated with `NavigationView` (hide the nav view's own back/pane-toggle buttons and drive them via the `TitleBar` instead).
- Layout mirrors when `FlowDirection` is `RightToLeft`.

## Related

- [PersonPicture](./person-picture.md)
- [MediaPlayerElement](./media-player-element.md)
