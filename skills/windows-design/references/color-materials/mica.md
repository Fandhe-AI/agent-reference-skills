# Mica / Mica Alt

Mica is an opaque, dynamic material that incorporates the user's theme and desktop wallpaper to paint the backdrop of long-lived windows such as apps and settings. Mica Alt is a variant with stronger tinting, used for a deeper visual hierarchy (e.g. tabbed title bars).

## Signature / Usage

```xaml
<!-- Backdrop is set on the Window, not on individual UI elements -->
<Window ...>
    <Window.SystemBackdrop>
        <MicaBackdrop Kind="Base"/> <!-- or Kind="BaseAlt" for Mica Alt -->
    </Window.SystemBackdrop>
</Window>
```

```xaml
<!-- Content layer on top of Mica: use a transparent background plus LayerFillColorDefaultBrush -->
<Grid Background="{ThemeResource LayerFillColorDefaultBrush}"> ... </Grid>
```

## Options / Props

| Concept | Description |
|------|-------------|
| Mica | Base opaque backdrop; recommended as the app's foundation layer. Fallback color: `SolidBackgroundFillColorBase`. |
| Mica Alt | Stronger-tinted variant; recommended when the title bar needs contrast against commanding areas (e.g. tabbed title bar). Fallback color: `SolidBackgroundFillColorBaseAlt`. Requires Windows App SDK 1.1+ on Windows 11 22000+. |
| `LayerFillColorDefaultBrush` | Low-opacity solid brush for the content layer sitting on top of Mica (standard or card pattern). |
| `LayerOnMicaBaseAltFillColorDefaultBrush` | Low-opacity solid brush for the commanding layer (menus, navigation) sitting on top of Mica Alt. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.MicaBackdrop` / `Microsoft.UI.Composition.SystemBackdrops` (WinUI 3 / Windows App SDK). Distinct from any JS/Compose backdrop or blur APIs.
- Mica/Mica Alt fall back to a solid color in High Contrast mode, when transparency is off, in Battery Saver, on low-end hardware, on an inactive desktop window, or below Windows build 22000.
- Do not apply Mica/Mica Alt more than once in an app, and do not apply it directly to a UI element — set all intervening layer backgrounds to transparent so the window backdrop shows through.
- To keep a seamless look, extend Mica/Mica Alt into the title bar by using a transparent custom title bar (see Title bar guidance).

## Related

- [Materials overview](./materials-overview.md)
- [Acrylic](./acrylic.md)
- [Background material selection](./background-material-selection.md)
