# Brushes (SolidColorBrush, LinearGradientBrush, AcrylicBrush, RevealBrush)

`Brush` and its subclasses paint UI surfaces (`Background`, `Foreground`, `Fill`, `BorderBrush`, etc.). `SolidColorBrush` fills with one color; `LinearGradientBrush` fills with a multi-stop gradient; `AcrylicBrush` fills with the translucent Acrylic material; `RevealBrush` (WinUI 2 for UWP only) implemented the pointer-lighting "Reveal" effect and is no longer recommended.

## Signature / Usage

```xaml
<!-- SolidColorBrush -->
<ResourceDictionary>
    <SolidColorBrush x:Key="BlockBackgroundBrush" Color="#FF557EB9"/>
</ResourceDictionary>
<Border Background="{StaticResource BlockBackgroundBrush}" Width="80" Height="80"/>
```

```xaml
<!-- LinearGradientBrush -->
<Rectangle Width="200" Height="100">
  <Rectangle.Fill>
    <LinearGradientBrush StartPoint="0.5,0" EndPoint="0.5,1">
      <GradientStop Color="Yellow" Offset="0.0" />
      <GradientStop Color="Red" Offset="0.25" />
      <GradientStop Color="Blue" Offset="0.75" />
      <GradientStop Color="LimeGreen" Offset="1.0" />
    </LinearGradientBrush>
  </Rectangle.Fill>
</Rectangle>
```

```csharp
SolidColorBrush greenBrush = new SolidColorBrush(Colors.Green);
SolidColorBrush custom = new SolidColorBrush(Color.FromArgb(255, 20, 20, 90));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| SolidColorBrush.Color | `Color` | The fill color; XAML content property, so `<SolidColorBrush>colorString</SolidColorBrush>` is also valid. |
| LinearGradientBrush.StartPoint / EndPoint | `Point` | Relative coordinates (0–1) defining the gradient axis (horizontal/vertical/diagonal). |
| LinearGradientBrush.GradientStops | `GradientStopCollection` | Ordered `GradientStop` (`Color` + `Offset` 0–1) values along the axis. |
| LinearGradientBrush.MappingMode | `BrushMappingMode` | Whether `StartPoint`/`EndPoint` are relative to the output area or absolute. |
| Brush.Opacity | `double` | Opacity of the brush itself, independent of element `Opacity` (both are cumulative). |

## Notes

- Package: `Microsoft.UI.Xaml.Media` (WinUI 3, `SolidColorBrush`/`LinearGradientBrush`/`AcrylicBrush`), `Microsoft.UI.Xaml.Media` WinUI 2 for UWP (`RevealBrush`). Distinct from `System.Windows.Media.Brush` (WPF) and CSS `background`/`linear-gradient()` in `ark-ui`/`chakra-ui`.
- All `Brush` subtypes (`SolidColorBrush`, `LinearGradientBrush`, `ImageBrush`, `AcrylicBrush`) are shareable objects, so they are typically declared once as a keyed `ResourceDictionary` resource and referenced via `{StaticResource}`/`{ThemeResource}` rather than duplicated inline.
- A `null` `Brush` property (e.g. `Background="{x:Null}"`) makes that region non-hit-testable; a `SolidColorBrush` with `Colors.Transparent` is visually invisible but still receives pointer/hit-test events — useful for creating invisible overlay hit-test regions.
- Animate a brush's color via property targeting on `.(SolidColorBrush.Color)` / `.(GradientStop.Color)` in a `Storyboard.TargetProperty`, not by animating the whole `Brush` object.
- `RevealBrush` (and its derived `RevealBackgroundBrush`/`RevealBorderBrush`) is WinUI 2 for UWP only and explicitly **not recommended** by Microsoft — it may be altered or removed in future versions; prefer Mica/Acrylic materials in WinUI 3 apps instead.
- For the Acrylic-specific brush (`AcrylicBrush`) properties (`TintColor`, `TintOpacity`, `TintLuminosityOpacity`), see the dedicated Acrylic Material page.

## Related

- [Acrylic Material](./acrylic-material.md)
- [Mica Material](./mica-material.md)
- [Style, Setter, BasedOn](./style-setter.md)
- [ResourceDictionary](./resource-dictionary.md)
