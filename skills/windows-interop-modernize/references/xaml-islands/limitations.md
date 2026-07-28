# Limitations and known issues

Constraints to be aware of when hosting WinUI 3 (or legacy UWP XAML) content via XAML Islands in a WPF, WinForms, or Win32 host application.

## Notes

- **Windowing APIs**: inside hosted content, do not rely on `CoreWindow`, `ApplicationView`, or `Window` for bounds/visibility — they return meaningless values (e.g. 1x1 size, always invisible) when the XAML tree is hosted in an island. Use `XamlRoot` (UWP) or the standard WinUI 3 windowing APIs instead.
- **Runtime requirement**: the host process needs the Windows App SDK runtime available at run time (via the bootstrapper API, framework package, or self-contained deployment) for `Microsoft.UI.Xaml.Hosting` types to function.
- **Focus handoff is manual**: Tab/Shift+Tab navigation across the host-window/island boundary does not happen automatically; the host must handle `TakeFocusRequested` and call `NavigateFocus`.
- **Sizing/DPI is manual**: the child HWND created by `DesktopWindowXamlSource`/`DesktopChildSiteBridge` does not auto-resize with the host window; the host must call `MoveAndResize` on every relevant layout/DPI change.
- **Legacy UWP XAML Islands limitations** (apply when using the older `Windows.UI.Xaml.Hosting` API, not the WinUI 3 one):
  - Only supported in WPF/WinForms apps targeting .NET Core 3.x (not .NET Framework).
  - Hosted UWP XAML content does not respond to light/dark theme changes at run time (high-contrast changes are respected).
  - `Windows.UI.Xaml.Controls.WebView` (the legacy XAML `WebView`) cannot be hosted.
  - `MediaPlayer`/`MediaPlayerElement` do not support full-screen mode when hosted.
  - Handwriting-view text input and `@Places`/`@People` content links are not supported.
  - A `ContentDialog` containing a text-input control (`TextBox`, `RichEditBox`, `AutoSuggestBox`) does not respond correctly to key presses; host a `Popup` with the input control instead.
  - `SvgImageSource` / SVG images are not supported in hosted `Image` controls; convert to a raster format (JPG/PNG).
  - `x:Bind` is not supported with hosted controls; declare data models in a .NET Standard library instead.
  - Hosting WinUI 2 (WinUI for UWP) controls is supported only conditionally — MSIX-packaged apps can use the `Microsoft.UI.Xaml` NuGet package normally; unpackaged apps need a prerelease `Microsoft.UI.Xaml` package or the Dynamic Dependencies API.

## Related

- [XAML Islands overview](./overview.md)
- [UWP XAML Islands vs WinUI 3 XAML Islands](./uwp-vs-winui3-migration.md)
- [Input and focus navigation](./input-focus-navigation.md)
- [DPI and sizing](./dpi-and-sizing.md)
