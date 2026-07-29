# Icon Elements (IconElement / IconSource family)

Base classes for icons in `Microsoft.UI.Xaml.Controls`. Every icon type has two forms: an `IconElement` (a `FrameworkElement`, usable directly in the visual tree) and a matching `IconSource` (not a `FrameworkElement`, so it can be shared via `ResourceDictionary`); `IconSourceElement` bridges an `IconSource` into a place that expects an `IconElement`.

## Signature / Usage

```xaml
<!-- IconElement used directly -->
<AppBarButton Label="Send">
    <AppBarButton.Icon>
        <FontIcon Glyph="&#xE725;"/>
    </AppBarButton.Icon>
</AppBarButton>

<!-- IconSource shared as a resource, consumed via IconSourceElement -->
<Application.Resources>
    <FontIconSource x:Key="CertIconSource" Glyph="&#xEB95;"/>
</Application.Resources>

<StackPanel Orientation="Horizontal">
    <IconSourceElement IconSource="{StaticResource CertIconSource}"/>
    <TextBlock Text="Certificate is expired" Margin="4,0,0,0"/>
</StackPanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| AnimatedIcon / AnimatedIconSource | IconElement / IconSource | Displays and controls a visual that can animate in response to user interaction and visual state changes. See [AnimatedIcon](./animated-icon.md). |
| BitmapIcon / BitmapIconSource | IconElement / IconSource | Uses a bitmap as its content. By default strips color and renders non-transparent pixels in `Foreground` (monochrome); set `ShowAsMonochrome="False"` to render in original color. SVG not supported. |
| FontIcon / FontIconSource | IconElement / IconSource | Uses a glyph from a specified font (`Glyph`, `FontFamily`). Falls back to the `SymbolThemeFontFamily` theme resource (Segoe Fluent Icons, or Segoe MDL2 Assets pre-Windows 10 20H2) when no `FontFamily` is set. |
| SymbolIcon / SymbolIconSource | IconElement / IconSource | Uses a glyph from the `Symbol` enumeration, a curated subset of `SymbolThemeFontFamily` glyphs. Settable via XAML attribute syntax with a `Symbol` name (e.g. `Icon="Send"`), unlike other icon types which require property-element syntax. |
| PathIcon / PathIconSource | IconElement / IconSource | Uses a vector path as its content (`Data`, a `Geometry`), so it always looks sharp regardless of scale. |
| ImageIcon / ImageIconSource | IconElement / IconSource | Shows an image from an `ImageSource`-derived class (e.g. `BitmapSource`, `SVGImageSource`). Ignores `Foreground` (always shows original colors, doesn't respond to visual-state changes); only the first frame of a multi-frame image (e.g. animated GIF) is used. |
| IconSourceElement | IconElement | Wraps an `IconSource` so it can be used anywhere an `IconElement` is expected, enabling one `IconSource` resource to be reused across multiple UI locations. No corresponding `IconSource` form (N/A). |

## Notes

- `IconElement` is a `FrameworkElement` — usable directly in the object tree, but cannot be stored in a `ResourceDictionary` and reused. `IconSource` is not a `FrameworkElement` — cannot stand alone in UI, but can be shared as a resource and wrapped in `IconSourceElement` wherever an `IconElement` is needed.
- Properties named with a `Source` suffix (e.g. `SwipeItem.IconSource`, `TabViewItem.IconSource`, `InfoBar.IconSource`, `TeachingTip.IconSource`, `XamlUICommand.IconSource`) take an `IconSource`; properties without it (e.g. `AppBarButton.Icon`, `NavigationViewItem.Icon`, `SelectorBarItem.Icon`, `MenuFlyoutItem.Icon`, `AutoSuggestBox.QueryIcon`) take an `IconElement`.
- Only `SymbolIcon`/`Symbol` names can be set via shortened XAML attribute syntax (`Icon="Send"`); all other icon types require the longer property-element syntax shown above.
- Bitmap-based icons (`BitmapIcon`, `ImageIcon`) are not recommended when a font, path, or animated alternative is available, since they can blur or pixelate when scaled.
- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3 / Windows App SDK).

## Related

- [AnimatedIcon](./animated-icon.md)
