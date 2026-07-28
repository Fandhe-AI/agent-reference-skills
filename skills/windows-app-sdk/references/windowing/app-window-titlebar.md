# AppWindowTitleBar

Represents the title bar of an app window (`Microsoft.UI.Windowing.AppWindowTitleBar`), accessed via `AppWindow.TitleBar`. Lets you customize colors, icon behavior, and extend app content into the title bar area.

## Signature / Usage

```csharp
using Microsoft.UI.Windowing;

if (AppWindowTitleBar.IsCustomizationSupported())
{
    var titleBar = appWindow.TitleBar;
    titleBar.ForegroundColor = Colors.White;
    titleBar.BackgroundColor = Colors.Green;
    titleBar.ExtendsContentIntoTitleBar = true;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ExtendsContentIntoTitleBar` | `bool` | Whether app content extends into the title bar area (full customization). |
| `BackgroundColor` / `ForegroundColor` | `Color?` | Title bar background/foreground color (active state). |
| `InactiveBackgroundColor` / `InactiveForegroundColor` | `Color?` | Colors when the window is inactive. |
| `ButtonBackgroundColor` / `ButtonForegroundColor` | `Color?` | Caption button colors. |
| `ButtonHoverBackgroundColor` / `ButtonHoverForegroundColor` | `Color?` | Caption button colors on hover. |
| `ButtonPressedBackgroundColor` / `ButtonPressedForegroundColor` | `Color?` | Caption button colors when pressed. |
| `ButtonInactiveBackgroundColor` / `ButtonInactiveForegroundColor` | `Color?` | Caption button colors when the window is inactive. |
| `Height` | `int` (read-only) | Height of the title bar in client coordinates. |
| `LeftInset` / `RightInset` | `int` (read-only) | Width of the system-reserved caption-button region on each side. |
| `IconShowOptions` | `IconShowOptions` | Controls whether the system icon and system menu are shown. |
| `PreferredHeightOption` | `TitleBarHeightOption` | `Standard` (default) or `Tall`; only valid when `ExtendsContentIntoTitleBar` is `true`. |
| `PreferredTheme` | `TitleBarTheme` | Theme used in the title bar. |

**Methods**: `IsCustomizationSupported()` (static) — whether customization is supported on the current OS; `ResetToDefault()` — resets to default settings; `SetDragRectangles(RectInt32[])` — sets drag regions.

## Notes

- Color customization is ignored on Windows 10; check `AppWindowTitleBar.IsCustomizationSupported()` before relying on it (fully supported on Windows 11).
- Setting a color property to `null` resets it to the default system color; transparent colors (alpha channel) are ignored except for `ButtonBackgroundColor`, `ButtonHoverBackgroundColor`, `ButtonPressedBackgroundColor`, `ButtonInactiveBackgroundColor` when `ExtendsContentIntoTitleBar` is `true`.
- `PreferredHeightOption` can only be set after `ExtendsContentIntoTitleBar` is `true`; otherwise it throws.
- Since Windows App SDK 1.4, the XAML `Window` and `AppWindow` share the same `AppWindowTitleBar` instance.
- Package: `Microsoft.UI.Windowing` (Windows App SDK / WinUI 3).

## Related

- [Title bar customization](./title-bar-customization.md)
- [AppWindow](./app-window.md)
- [Microsoft.UI.Xaml.Window](./xaml-window.md)
