# Segoe Fluent Icons Font

Segoe Fluent Icons is the recommended symbol icon font for Windows 11 apps, replacing Segoe MDL2 Assets. It provides 1,000+ glyphs mapped to the Unicode Private Use Area (PUA), with a fixed width, consistent height, and left origin point per glyph.

## Signature / Usage

```xaml
<FontIcon FontFamily="Segoe Fluent Icons" Glyph="&#xE700;"/>

<!-- Preferred: use the theme resource so Windows 10 falls back automatically -->
<FontIcon FontFamily="{ThemeResource SymbolThemeFontFamily}" Glyph="&#xE700;"/>
```

## Options / Props

| Recommended size (px) | Notes |
|------------------------|-------|
| 16, 20, 24, 32, 40, 48, 64 | Use these exact sizes for crispness; other sizes may render blurry |

## Notes

- Icons are standalone symbols, not designed for inline use within text flow.
- Glyphs can be layered/colorized by stacking multiple `FontIcon` elements with different `Foreground` colors on top of each other.
- Glyph prefixes E0–E5 (e.g. `E001`, `E5B1`) are legacy/deprecated; avoid them for new icons.
- Mirrored glyph variants exist for RTL languages (Arabic, Dari, Persian, Hebrew).
- Included by default on Windows 11. On Windows 10 version 20H2 or earlier the font is unavailable, and `SymbolThemeFontFamily` falls back to Segoe MDL2 Assets automatically — prefer the theme resource over hardcoding `FontFamily="Segoe Fluent Icons"` to get this fallback for free.
- Package: font asset referenced from WinUI 3 / UWP XAML (`Microsoft.UI.Xaml.Controls.FontIcon`, `Microsoft.UI.Xaml.Controls.SymbolIcon`). Distinct from SF Symbols (apple-swiftui/apple-uikit) and Material Symbols (android-compose-*).

## Related

- [Icon Elements](./icon-elements.md)
- [Typography](./typography.md)
- [Segoe MDL2 Assets Font](./segoe-ui-symbol-font.md)
