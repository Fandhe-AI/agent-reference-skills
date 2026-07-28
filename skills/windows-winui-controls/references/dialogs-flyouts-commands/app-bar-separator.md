# AppBarSeparator

A vertical line element used to visually separate items in an `AppBar`, `CommandBar`, or `CommandBarFlyout`.

## Signature / Usage

```xaml
<CommandBar>
    <AppBarButton Icon="Back" Label="Back"/>
    <AppBarSeparator/>
    <AppBarButton Icon="Play" Label="Play"/>
</CommandBar>
```

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).
- Implements `ICommandBarElement`, so it can be added directly to `CommandBar` / `CommandBarFlyout` primary/secondary command collections alongside `AppBarButton` and `AppBarToggleButton`.
- Has no interactive behavior or content properties beyond standard `Control` styling members (`Background`, `Foreground`, etc.).

## Related

- [AppBarButton](./app-bar-button.md)
- [AppBarToggleButton](./app-bar-toggle-button.md)
- [CommandBar](./command-bar.md)
