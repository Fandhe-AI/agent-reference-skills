# Adjust layout and fonts, and support RTL

Design an app's layouts and fonts to support multiple languages, including right-to-left (RTL) flow direction.

## Signature / Usage

Set `FlowDirection` on the root layout panel (or `Page`) so contained controls inherit it. `Grid` and other layout panels scale and flip automatically with `FlowDirection`.

```csharp
this.languageTag = Windows.Globalization.ApplicationLanguages.Languages[0];

// For bidirectional languages, determine flow direction for the root layout panel, and all contained UI.
var flowDirectionSetting = Windows.ApplicationModel.Resources.Core.ResourceContext.GetForCurrentView().QualifierValues["LayoutDirection"];
if (flowDirectionSetting == "LTR")
{
    this.layoutRoot.FlowDirection = Microsoft.UI.Xaml.FlowDirection.LeftToRight;
}
else
{
    this.layoutRoot.FlowDirection = Microsoft.UI.Xaml.FlowDirection.RightToLeft;
}
```

Mirroring individual images per language:

```xaml
<!-- en-US\localized.xaml -->
<Image ... FlowDirection="LeftToRight" />

<!-- ar-SA\localized.xaml -->
<Image ... FlowDirection="RightToLeft" />
```

## Options / Props

| Property / API | Description |
|------|-------------|
| `FrameworkElement.FlowDirection` | `LeftToRight` or `RightToLeft`; set on the root layout panel or `Page` for inheritance by contained controls |
| `LanguageFont` (`Windows.Globalization.Fonts`) | Programmatic access to the recommended font family, size, weight, and style per language and content category (UI headers, notifications, body text, document body) |
| `LayoutDirection` resource qualifier | Resource-system qualifier (e.g. `file.layoutdir-rtl.png`) for supplying a distinct mirrored image asset per flow direction |

## Notes

- `FlowDirection` is **not** set automatically from the user's Windows display-language setting and does not change dynamically when the user switches languages — the app must set it explicitly.
- Avoid baking absolute positioning or fixed widths/heights into layout; rely on dynamic layout (content controls, items controls, layout panels resize/reflow by default) since translated text length varies significantly by language.
- `FrameworkElement`, `Grid`, `Page`, `Image` referenced here are `Microsoft.UI.Xaml` (WinUI 3) types, distinct from `System.Windows` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.

## Related

- [Design your app for bidirectional text](./bidirectional-text.md)
- [Globalization and localization](./globalization-localization.md)
