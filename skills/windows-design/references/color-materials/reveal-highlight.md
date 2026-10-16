# Reveal highlight

Reveal is a lighting effect that adds depth and focus to interactive elements by revealing pieces of the element's border/background around the pointer or focus rectangle as it moves over hero (focal) content. It is implemented on top of the `CompositionLight` / `XamlLight` pipeline. The pointer-hover Reveal highlight guide has been removed from the official docs (deprecated; see Notes). **Reveal Focus**, a 10-foot (TV/gamepad) focus-visual lighting effect, is a related feature that remains only in the UWP docs (ms.date 2022-03-25).

## Signature / Usage

```csharp
// Reveal Focus: enable the 10-foot lighting focus visual on Xbox
// (in the App class, e.g. its constructor; `this` is the Application, so this sets Application.FocusVisualKind)
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
| `XamlLight` / `CompositionLight` | General-purpose composition lighting APIs that apply lights to UIElements/Brushes (not a recommended way to recreate the deprecated Reveal highlight). |

## Notes

- Package: `Microsoft.UI.Xaml.Application.FocusVisualKind` and `Microsoft.UI.Xaml.Media.XamlLight` / `Microsoft.UI.Composition.CompositionLight` (WinUI 3 / Windows App SDK); legacy UWP APIs live under `Windows.UI.Xaml.*`. Distinct from CSS hover effects and any JS/Compose ripple or hover-highlight component.
- Deprecated/removed: the pointer-hover "Reveal highlight" guide (introduced in Fluent Design for Windows 10) has been removed from the docs. `/windows/apps/design/style/reveal` returns 404, and `.openpublishing.redirection.json` sends the old `uwp/design/style/reveal.md` and `uwp/style/reveal.md` to `/windows/apps/design` (the Fluent overview) with no replacement page. Do not use Reveal highlight in new WinUI 3 designs; current official coverage is the `XamlLight`/`CompositionLight` composition-lighting APIs plus **Reveal Focus**, which targets keyboard/gamepad focus rather than pointer hover.
- The Reveal Focus guide now exists only in the UWP docs (`/windows/uwp/ui-input/reveal-focus`, ms.date 2022-03-25, `keywords: windows 10, uwp`; API links point to `Windows.UI.Xaml.*` and examples use the WinUI 2 Gallery). The former hub path `hub/apps/design/style/reveal-focus.md` redirects there. The WinUI 3 equivalents remain in the Windows App SDK API reference: `Microsoft.UI.Xaml.Application.FocusVisualKind` and the `Microsoft.UI.Xaml.FocusVisualKind` enum with a `Reveal` value.
- Reveal Focus increases the visual size of focus indicators, which can affect layout — evaluate impact before enabling broadly, and prefer scoping it to Xbox/10-foot device families.
- For general composition lighting (independent of the deprecated Reveal highlight), a `CompositionLight` (e.g. `PointLight`) is paired with a `XamlLight` subclass that targets the relevant `UIElement`/`Brush`.

## Related

- [Materials overview](./materials-overview.md)
- [Color](./color.md)
