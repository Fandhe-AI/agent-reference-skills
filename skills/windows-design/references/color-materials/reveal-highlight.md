# Reveal highlight

Reveal is a lighting effect that adds depth and focus to interactive elements by revealing pieces of the element's border/background around the pointer or focus rectangle as it moves over hero (focal) content. It is implemented on top of the `CompositionLight` / `XamlLight` pipeline. A related, currently-documented variant is **Reveal Focus**, a 10-foot (TV/gamepad) focus-visual lighting effect.

## Signature / Usage

```csharp
// Reveal Focus: enable the 10-foot lighting focus visual on Xbox
if (AnalyticsInfo.VersionInfo.DeviceFamily == "Windows.Xbox")
{
    this.FocusVisualKind = FocusVisualKind.Reveal;
}
```

```xaml
<!-- Reveal Focus: customize color via theme resources -->
<Button
    FocusVisualPrimaryBrush="{ThemeResource SystemBaseHighColor}"
    FocusVisualSecondaryBrush="{ThemeResource SystemAccentColor}"/>
```

## Options / Props

| API | Description |
|------|-------------|
| `Application.FocusVisualKind` / `FocusVisualKind.Reveal` | Enables the Reveal Focus lighting effect for keyboard/gamepad focus visuals (off by default; intended for Xbox/10-foot experiences). |
| `Control.UseSystemFocusVisuals` | Whether a control uses the system-provided focus visual (default `true` for most controls); required for Reveal Focus to apply automatically. |
| `FocusVisualPrimaryThickness` / `FocusVisualSecondaryThickness` | Thickness of the primary (outer, with glow) and secondary (inner) focus-visual borders. |
| `FocusVisualPrimaryBrush` / `FocusVisualSecondaryBrush` | Colors of the primary/secondary focus-visual borders; default to `SystemControlRevealFocusVisualBrush` (`SystemAccentColor`) and `SystemControlFocusVisualSecondaryBrush` (`SystemAltMediumColor`). |
| `XamlLight` / `CompositionLight` | Lower-level composition APIs used to build custom Reveal-style pointer-hover lighting on UIElements/Brushes. |

## Notes

- Package: `Microsoft.UI.Xaml.Application.FocusVisualKind` and `Microsoft.UI.Xaml.Media.XamlLight` / `Microsoft.UI.Composition.CompositionLight` (WinUI 3 / Windows App SDK); legacy UWP APIs live under `Windows.UI.Xaml.*`. Distinct from CSS hover effects and any JS/Compose ripple or hover-highlight component.
- The classic pointer-hover "Reveal highlight" (as originally introduced in Fluent Design for Windows 10) is no longer documented as a standalone style guide page; current official coverage is the `XamlLight`/`CompositionLight` composition-lighting APIs plus **Reveal Focus**, which targets keyboard/gamepad focus rather than pointer hover.
- Reveal Focus increases the visual size of focus indicators, which can affect layout — evaluate impact before enabling broadly, and prefer scoping it to Xbox/10-foot device families.
- To build custom pointer-hover reveal lighting, pair a `CompositionLight` (e.g. `PointLight`) with a `XamlLight` subclass and target the relevant `UIElement`/`Brush`.

## Related

- [Materials overview](./materials-overview.md)
- [Color](./color.md)
