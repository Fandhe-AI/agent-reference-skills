# Mica Material

Mica is an opaque, dynamic material that samples the desktop wallpaper and current theme once to paint the background of long-lived windows (apps, settings), creating a personalized, performant window backdrop. Mica Alt is a stronger-tinted variant suited to tabbed title bars.

## Signature / Usage

```xaml
<Window ...>
    <Window.SystemBackdrop>
        <MicaBackdrop/>
    </Window.SystemBackdrop>
</Window>
```

```xaml
<!-- Mica Alt variant -->
<Window ...>
    <Window.SystemBackdrop>
        <MicaBackdrop Kind="BaseAlt"/>
    </Window.SystemBackdrop>
</Window>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| MicaBackdrop.Kind | `MicaKind` | `Base` (default, standard Mica) or `BaseAlt` (Mica Alt, stronger tint; requires Windows App SDK 1.1+ on Windows 11 22000+). |

## Notes

- Package: `Microsoft.UI.Xaml.Media` (WinUI 3, `MicaBackdrop`); design guidance at `design/style/mica`. Distinct from macOS vibrancy materials (`apple-swiftui`) and unrelated to any web/CSS backdrop-filter usage in `ark-ui`/`chakra-ui`.
- Apply Mica as the base layer only, and prioritize showing it in the title bar area (requires a transparent custom title bar extending into the non-client area).
- Falls back to a solid color (`SolidBackgroundFillColorBase` for Mica, `SolidBackgroundFillColorBaseAlt` for Mica Alt) under High Contrast, when transparency is disabled in Settings, on low-end hardware, (per the Mica design guidance, also when Battery Saver is active; see the Materials overview note below), when the window is deactivated, or on Windows versions below build 22000.
- Content layered on top of Mica should use `LayerFillColorDefaultBrush` (standard/card pattern) as its low-opacity background so it visually picks up the material behind it; with Mica Alt, use `LayerOnMicaBaseAltFillColorDefaultBrush` for a commanding layer plus `LayerFillColorDefaultBrush` for the content layer above that.
- Set backgrounds to `Transparent` on every layer between the window and where you want Mica to show through; don't apply backdrop material more than once per app. Mica is shown only on window/backdrop-hosting surfaces; Windows App SDK 2.0 or later adds `SystemBackdropElement`, which applies Mica or Desktop Acrylic to a specific XAML element (sidebar, panel, card). It is independent of `Window.SystemBackdrop` and can be combined with it.
- Mica is Windows 11 only; on Windows 10 it falls back to a solid theme color (Materials overview).
- Fallback conditions differ by source. The design guidance above lists Battery Saver as a fallback trigger for Mica. The WinUI Materials overview states that Battery Saver disables acrylic (`DesktopAcrylicBackdrop` and `AcrylicBrush`) but Mica is not affected, and also lists Remote Desktop or virtual machines as automatic `SystemBackdrop` fallback cases. Both are recorded; test on target devices.

## Related

- [System Backdrops (SystemBackdrop, MicaBackdrop, DesktopAcrylicBackdrop)](./system-backdrops.md)
- [Materials overview](./materials-overview.md)
- [Brushes (SolidColorBrush, LinearGradientBrush, AcrylicBrush, RevealBrush)](./brushes.md)
