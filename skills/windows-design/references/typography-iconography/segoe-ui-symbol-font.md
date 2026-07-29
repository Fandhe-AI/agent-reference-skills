# Segoe MDL2 Assets Font

Segoe MDL2 Assets is the symbol icon font that replaced Segoe UI Symbol in Windows 10; it has since been superseded by Segoe Fluent Icons on Windows 11 but remains available for backward compatibility.

## Signature / Usage

```xaml
<FontIcon FontFamily="Segoe MDL2 Assets" Glyph="&#xE700;"/>
```

## Options / Props

| Property | Detail |
|----------|--------|
| Glyph mapping | Most glyphs map to the Unicode Private Use Area (PUA); the font must be explicitly specified since there is no fallback, so glyphs are unsuitable for inline text or tile notifications |
| Design | Fixed glyph width, consistent height, and a left origin point per glyph; supports layering/colorization and mirrored variants for RTL languages |
| Availability | Included by default on Windows 10+; on macOS, download separately (`aka.ms/SegoeFonts`) |

## Notes

- Superseded by Segoe Fluent Icons on Windows 11 — prefer that font (via `{ThemeResource SymbolThemeFontFamily}`) for new apps; this page is for legacy/back-compat reference only.
- Glyph prefixes E0–E5 (e.g. `E001`, `E5B1`) are legacy/deprecated even within this font and should not be used in new applications.
- Package: font asset referenced from WinUI 3 / UWP XAML (`Microsoft.UI.Xaml.Controls.FontIcon`). Distinct from SF Symbols (apple-swiftui/apple-uikit) and Material Symbols (android-compose-*).

## Related

- [Segoe Fluent Icons Font](./segoe-fluent-icons-font.md)
- [Icon Elements](./icon-elements.md)
