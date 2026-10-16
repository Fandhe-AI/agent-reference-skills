# Materials in Windows apps

Materials are visual effects applied to UI surfaces to create depth, hierarchy, and visual interest. WinUI 3 provides four mechanisms, each suited to a different scenario.

## Signature / Usage

```csharp
Window.SystemBackdrop = new MicaBackdrop();
Window.SystemBackdrop = new DesktopAcrylicBackdrop();
```

```xaml
<Grid Background="{ThemeResource AcrylicInAppFillColorDefaultBrush}">
```

## Options / Props

| Scenario | Material | API |
|----------|----------|-----|
| App window with a Mica background (wallpaper-tinted) | Mica | `Window.SystemBackdrop = new MicaBackdrop()` |
| App window with a see-through frosted-glass background | Desktop Acrylic | `Window.SystemBackdrop = new DesktopAcrylicBackdrop()` |
| Flyout, popup, or context menu with an Acrylic background | System backdrop on a surface | Set `SystemBackdrop` on `FlyoutBase`, `Popup`, etc. |
| Sidebar, panel, or element with Mica or Acrylic (not the whole window) | SystemBackdropElement | `<SystemBackdropElement>` control |
| Navigation pane or content panel with an in-app blur effect | In-app Acrylic | `{ThemeResource AcrylicInAppFillColorDefaultBrush}` |

## Notes

- `AcrylicBrush` is in-app acrylic only: it blurs XAML content within the app window and does not show the desktop or other windows. For desktop-see-through effects use `Window.SystemBackdrop` or `SystemBackdropElement`.
- No material (default): the window background is a solid color from the active light or dark theme.
- Mica: `MicaKind.Base` (default) or `MicaKind.BaseAlt` (lighter, for secondary surfaces). Windows 11 only; falls back to a solid theme color on Windows 10.
- Desktop Acrylic: `DesktopAcrylicKind.Base` (more opaque) or `DesktopAcrylicKind.Thin` (more transparent). Windows 10 (build 17763) and later. Can also be applied to transient surfaces via `SystemBackdrop` on `FlyoutBase`, `Popup`, `MenuFlyoutPresenter`, or `CommandBarFlyoutCommandBar`.
- `SystemBackdropElement` requires Windows App SDK 2.0 or later.
- The UWP `BackgroundSource = HostBackdrop` property is not available in WinUI 3.
- Fallback to a solid color happens automatically (no app detection needed) in these cases: Remote Desktop / virtual machines; insufficient graphics hardware (Mica and Desktop Acrylic require DirectX 11 and adequate GPU memory); *Transparency effects* off in Settings > Personalization > Colors (all `SystemBackdrop` materials and `AcrylicBrush`); Battery Saver (disables `DesktopAcrylicBackdrop` and `AcrylicBrush`, Mica unaffected); high contrast mode (all materials suppressed). Make sure any `FallbackColor` or theme background reads well as a plain solid color.
- Source page last updated 2026-08-19 (en-us). Distinct from CSS `backdrop-filter` in `ark-ui` / `chakra-ui` and from macOS vibrancy in `apple-swiftui` / `apple-appkit`.

## Related

- [System Backdrops](./system-backdrops.md)
- [Mica Material](./mica-material.md)
- [Acrylic Material](./acrylic-material.md)
- [In-app acrylic](./in-app-acrylic.md)
