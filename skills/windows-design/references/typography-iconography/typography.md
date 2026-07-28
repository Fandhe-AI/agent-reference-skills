# Typography

Segoe UI Variable is the default system font for Windows apps. The Windows type ramp defines a consistent hierarchy (Caption through Display) built on top of it, with automatic effective-pixel scaling across screen sizes.

## Signature / Usage

```xaml
<TextBlock Text="Title" Style="{StaticResource TitleTextBlockStyle}"/>
<TextBlock TextAlignment="Left" TextWrapping="WrapWholeWords" TextTrimming="Clip"/>
```

## Options / Props

### Type ramp (Windows 11)

| Style | Weight | Size/line height (effective px) |
|-------|--------|----------------------------------|
| Caption | Text | 12/16 |
| Body | Text | 14/20 |
| Body Strong | Text semibold | 14/20 |
| Body Large | Text | 18/24 |
| Body Large Strong | Text semibold | 18/24 |
| Subtitle | Display semibold | 20/28 |
| Title | Display semibold | 28/36 |
| Title Large | Display semibold | 40/52 |
| Display | Display semibold | 68/92 |

These styles are exposed as XAML static resources (for example `TitleTextBlockStyle`) following the XAML type ramp conventions.

### Segoe UI Variable axes

| Axis | Tag | Range | Notes |
|------|-----|-------|-------|
| Weight | `wght` | Thin (100) – Bold (700) | Incremental; Light 300, Semilight 350, Regular 400, Semibold 600, Bold 700 |
| Optical size | `opsz` | 8pt – 36pt | Automatic; matches requested font-size to prioritize legibility at small sizes and personality at large sizes |

### Attributes

| Attribute | Value | Notes |
|-----------|-------|-------|
| Weight | Regular, Semibold | Regular for most text, Semibold for titles |
| Alignment | Left, Center | Left by default; Center only in rare cases (e.g. text below icons) |
| Minimum sizes | 14px Semibold, 12px Regular | Smaller sizes are illegible in some languages |
| Casing | Sentence case | Applies to all UI text including titles |
| Truncation | Ellipses, clipping | Ellipses in most cases; clipping only in rare cases |

## Notes

- `TextAlignment` default is `Left`; ragged-right (flush-left) is preferred over centered text except for text placed below icons.
- For clipping, use `TextWrapping="WrapWholeWords" TextTrimming="Clip"` — the default behavior of most WinUI text controls; avoid ellipses unless containers are not well-defined or there is a "see more" link.
- Bold and Italic are not part of the Windows type ramp; use Semibold for emphasis. Italic is excluded because it reduces legibility, particularly for people with dyslexia.
- Keep 50–60 characters per line for readability; avoid fewer than 20 or more than 60.
- Non-Latin languages fall back to dedicated UI fonts: Ebrima (African scripts), Gadugi (North American scripts), Leelawadee UI (Southeast Asian scripts), Malgun Gothic (Korean), Microsoft JhengHei UI (Traditional Chinese), Microsoft YaHei UI (Simplified Chinese), Myanmar Text, Nirmala UI (South Asian scripts), Segoe UI (Arabic, Armenian, Georgian, Hebrew), Yu Gothic UI (Japanese).
- Use the `LanguageFont` font-mapping APIs (`Windows.Globalization.Fonts.LanguageFont`) for programmatic access to the recommended font family/size/weight/style per language and content category (UI headers, notifications, body text, document body).
- Package: guidance applies to WinUI 3 / UWP XAML apps (`Microsoft.UI.Xaml` / `Windows.UI.Xaml`). Distinct from the Typography concept in Fluent 2 web/Figma tokens, and unrelated to SwiftUI/Compose text style APIs.

## Related

- [Segoe Fluent Icons Font](./segoe-fluent-icons-font.md)
- [Icon Elements](./icon-elements.md)
