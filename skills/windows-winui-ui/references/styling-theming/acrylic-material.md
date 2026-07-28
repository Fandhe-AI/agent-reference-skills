# Acrylic Material

Acrylic is a translucent `Brush` that adds physical texture (blur, noise, tint) and depth to app surfaces. It has two blend types: background acrylic (reveals the desktop/other windows behind the app) and in-app acrylic (adds depth within the app frame).

## Signature / Usage

```xaml
<!-- Desktop (background) acrylic as a window/flyout backdrop -->
<Flyout.SystemBackdrop>
    <DesktopAcrylicBackdrop/>
</Flyout.SystemBackdrop>
```

```xaml
<!-- In-app acrylic applied directly as a Brush -->
<Border Background="{ThemeResource AcrylicInAppFillColorDefaultBrush}"/>
```

```csharp
var brush = new AcrylicBrush
{
    TintColor = Colors.White,
    TintOpacity = 0.6,
    TintLuminosityOpacity = 0.9
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| AcrylicBrush.TintColor | `Color` | Color tint blended into the semi-transparent material. |
| AcrylicBrush.TintOpacity | `double` | Opacity of the color tint. |
| AcrylicBrush.TintLuminosityOpacity | `double` | Opacity of the color's luminosity tint (affects perceived brightness independent of tint). |
| AcrylicBrush.TintTransitionDuration | `TimeSpan` | Duration of the automatic transition animation played when `TintColor` changes. |
| AcrylicBrush.AlwaysUseFallback | `bool` | Forces the brush to render as its solid `FallbackColor` instead of the acrylic effect. |

## Notes

- Package: `Microsoft.UI.Xaml.Media` (WinUI 3, `AcrylicBrush`, inherits `XamlCompositionBrushBase` → `Brush`). Distinct from CSS `backdrop-filter: blur()` used in `ark-ui`/`chakra-ui`, and unrelated to macOS `NSVisualEffectView` (`apple-appkit`).
- Use **background acrylic** for transient, light-dismiss surfaces (context menus, flyouts, `ComboBox`/`AutoSuggestBox` popups) — many controls draw it by default while open. Use **in-app acrylic** for supporting UI like navigation panes that may overlap scrolled content.
- Avoid placing multiple acrylic panes edge-to-edge (visible seam) or layering multiple background-acrylic surfaces (distracting optical illusions); avoid accent-colored text or hyperlinks over acrylic (contrast issues).
- Rendering acrylic is GPU-intensive; it's automatically disabled/replaced by a solid fallback color in Battery Saver mode, when the device is low-end, when *Transparency effects* is off in Settings, in High Contrast mode, or (background acrylic only) when the window deactivates or the app runs on Xbox/HoloLens/tablet mode.
- For the window-level material (rather than a `Brush` applied to one element), see `SystemBackdrop`/`DesktopAcrylicBackdrop`.

## Related

- [System Backdrops (SystemBackdrop, MicaBackdrop, DesktopAcrylicBackdrop)](./system-backdrops.md)
- [Mica Material](./mica-material.md)
- [Brushes (SolidColorBrush, LinearGradientBrush, AcrylicBrush, RevealBrush)](./brushes.md)
