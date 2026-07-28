# Icon Elements: FontIcon, SymbolIcon, BitmapIcon, PathIcon, ImageIcon, AnimatedIcon

Six `IconElement`/`IconSource` pairs let you add an icon to a Windows app UI. Choose based on whether you need a font glyph, a shared resource, a bitmap, a vector path, or motion.

## Signature / Usage

```xaml
<!-- SymbolIcon: predefined Symbol enum glyph -->
<SymbolIcon Symbol="Play"/>

<!-- FontIcon: any glyph from any font -->
<AppBarButton Label="Send">
    <AppBarButton.Icon>
        <FontIcon Glyph="&#xE725;"/>
    </AppBarButton.Icon>
</AppBarButton>

<!-- PathIcon: vector geometry -->
<PathIcon Data="F1 M 16,12 20,2L 20,16 1,16"/>

<!-- BitmapIcon: monochrome-by-default bitmap -->
<BitmapIcon UriSource="ms-appx:///Assets/icon.png" ShowAsMonochrome="False"/>

<!-- ImageIcon: full-color image / SVG -->
<ImageIcon Source="ms-appx:///Assets/icon.svg"/>
```

## Options / Props

| Element (IconElement / IconSource) | Description |
|-------------------------------------|--------------|
| `FontIcon` / `FontIconSource` | Glyph from a specified font. Falls back to `SymbolThemeFontFamily` if no `FontFamily` is set or the requested font is unavailable. |
| `SymbolIcon` / `SymbolIconSource` | Glyph from the `Symbol` enum, drawn from `SymbolThemeFontFamily`. Only settable via XAML attribute syntax (`Icon="Send"`); other icon types require property-element syntax. |
| `BitmapIcon` / `BitmapIconSource` | Bitmap image as icon content. Strips color and renders non-transparent pixels in `Foreground` by default (monochrome); set `ShowAsMonochrome="False"` for full color. SVG not supported. |
| `PathIcon` / `PathIconSource` | Vector path (`Geometry`) as icon content; always sharp at any size, but authoring the geometry is manual. |
| `ImageIcon` / `ImageIconSource` | Any `ImageSource` (including `SVGImageSource`) as icon content; ignores `Foreground`, so it doesn't respond to visual-state color changes. Only the first frame of multi-frame images is used. |
| `AnimatedIcon` / `AnimatedIconSource` | Lottie-based vector icon that animates in response to interaction/state changes; supports a `FallbackIconSource` for platforms without animation support. |
| `IconSourceElement` | Wraps an `IconSource` so it can be used anywhere an `IconElement` is expected; the only way to reuse an `IconSource` defined as a shared `ResourceDictionary` resource. |

## Notes

- `IconElement` is a `FrameworkElement` — usable directly in the XAML tree but not shareable via `ResourceDictionary`. `IconSource` is not a `FrameworkElement` — shareable as a resource but not directly placeable; wrap it in `IconSourceElement` to place it.
- Recommended priority: `SymbolIcon` (if the glyph exists in the `Symbol` enum) → `FontIcon` (any other Segoe Fluent Icons glyph) → `PathIcon`/`AnimatedIcon` for custom vector/motion → `BitmapIcon`/`ImageIcon` only when no other option is available, since bitmaps blur when scaled down and pixelate when scaled up.
- Common `icon` properties: `AppBarButton.Icon`, `AppBarToggleButton.Icon`, `MenuFlyoutItem.Icon`, `NavigationViewItem.Icon` (IconElement); `SwipeItem.IconSource`, `TabViewItem.IconSource`, `InfoBar.IconSource`, `TeachingTip.IconSource` (IconSource).
- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3) / `Windows.UI.Xaml.Controls` (UWP). Distinct from SF Symbols Image views (apple-swiftui), the JS `@ark-ui/react` / `@chakra-ui/react` Icon primitives, and Jetpack Compose `Icon`/`ImageVector`.

## Related

- [Segoe Fluent Icons Font](./segoe-fluent-icons-font.md)
- [Typography](./typography.md)
