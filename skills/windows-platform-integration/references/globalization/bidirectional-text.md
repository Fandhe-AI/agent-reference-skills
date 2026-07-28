# Bidirectional text and RTL (FlowDirection)

Guidance and API for supporting right-to-left (RTL) reading order — for languages such as Arabic and Hebrew — via the `FrameworkElement.FlowDirection` property, plus mirroring of images and layouts.

Namespace: `Microsoft.UI.Xaml` (WinUI 3) — `FrameworkElement.FlowDirection`. Distinct from web/CSS `direction`/`dir` and from other UI frameworks' own flow-direction concepts.

## Signature / Usage

```csharp
this.languageTag = Windows.Globalization.ApplicationLanguages.Languages[0];

// Determine flow direction for the root layout panel and all contained UI.
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

```xaml
<!-- en-US\localized.xaml -->
<Image ... FlowDirection="LeftToRight" />

<!-- ar-SA\localized.xaml -->
<Image ... FlowDirection="RightToLeft" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| FrameworkElement.FlowDirection | `FlowDirection` (`LeftToRight` \| `RightToLeft`) | Set on a root layout panel, Frame, or Page; inherited by contained controls. Panels such as `Grid` scale and flip automatically. |
| Language.LayoutDirection | `LanguageLayoutDirection` | Content layout direction most appropriate for a given `Language`. |
| `layoutdirection` resource qualifier | `ltr` \| `rtl` (via `ResourceContext.QualifierValues["LayoutDirection"]`) | Drives selection of qualifier-tagged assets (e.g. `file.layoutdir-rtl.png`) for images that need more than a simple flip. |

## Notes

- `FlowDirection` is **not** set automatically from the user's Windows display-language setting and does not change dynamically when the user switches languages — the app must set it explicitly for the language currently being displayed.
- For images that can simply be mirrored, set `FlowDirection` directly on the `Image`. For images where only part of the content should flip, use the `layoutdirection` resource qualifier instead.
- Use the `LanguageFont` class (`Windows.Globalization.Fonts.LanguageFont`) for the recommended font family/size/weight/style per language and content category (UI headers, notifications, body text, etc.).
- Avoid baking absolute positioning or fixed widths/heights into layout, since translated text length varies significantly by language; prefer dynamic (content-driven) sizing.

## Related

- [resource-qualifiers](./resource-qualifiers.md)
- [Language](./language.md)
