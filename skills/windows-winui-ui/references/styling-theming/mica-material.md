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
- Falls back to a solid color (`SolidBackgroundFillColorBase` for Mica, `SolidBackgroundFillColorBaseAlt` for Mica Alt) under High Contrast, when transparency is disabled in Settings, Battery Saver is active, on low-end hardware, when the window is deactivated, or on Windows versions below build 22000.
- Content layered on top of Mica should use `LayerFillColorDefaultBrush` (standard/card pattern) as its low-opacity background so it visually picks up the material behind it; with Mica Alt, use `LayerOnMicaBaseAltFillColorDefaultBrush` for a commanding layer plus `LayerFillColorDefaultBrush` for the content layer above that.
- Set backgrounds to `Transparent` on every layer between the window and where you want Mica to show through; don't apply backdrop material more than once per app, and never apply it directly to a UI element (only window/backdrop-hosting surfaces show it).

## Related

- [System Backdrops (SystemBackdrop, MicaBackdrop, DesktopAcrylicBackdrop)](./system-backdrops.md)
- [Brushes (SolidColorBrush, LinearGradientBrush, AcrylicBrush, RevealBrush)](./brushes.md)
