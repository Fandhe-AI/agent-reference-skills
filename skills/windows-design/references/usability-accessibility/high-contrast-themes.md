# Contrast themes

Contrast themes use a constrained color palette (contrast ratios typically at or above 7:1) to improve legibility, reduce visual fatigue, and support users who need high visual separation between foreground and background content.

## Signature / Usage

Define theme-specific resources via `ResourceDictionary.ThemeDictionaries`, mapping each resource to a dynamic `SystemColor` value in the `HighContrast` dictionary:

```xaml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <ResourceDictionary x:Key="Default">
                <SolidColorBrush x:Key="BrandedPageBackgroundBrush" Color="#E6E6E6" />
            </ResourceDictionary>
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="BrandedPageBackgroundBrush" Color="#E6E6E6" />
            </ResourceDictionary>
            <ResourceDictionary x:Key="HighContrast">
                <SolidColorBrush x:Key="BrandedPageBackgroundBrush" Color="{ThemeResource SystemColorWindowColor}" />
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Application.Resources>

<Grid Background="{ThemeResource BrandedPageBackgroundBrush}">
```

Detect contrast mode programmatically with `Microsoft.UI.System.ThemeSettings.HighContrast`.

## Options / Props

| SystemColor resource | Usage |
|------|-------------|
| `SystemColorWindowColor` | Background of pages, panes, popups, and windows. Pair with `SystemColorWindowTextColor` |
| `SystemColorWindowTextColor` | Headings, body copy, lists, placeholder text, borders, non-interactive UI. Pair with `SystemColorWindowColor` |
| `SystemColorHotlightColor` | Hyperlinks only. Pair with `SystemColorWindowColor` |
| `SystemColorGrayTextColor` | Inactive/disabled UI only — do not use for secondary body or hint text. Pair with `SystemColorWindowColor` |
| `SystemColorHighlightTextColor` / `SystemColorHighlightColor` | Foreground/background of selected, hovered, pressed, or in-progress UI |
| `SystemColorButtonTextColor` / `SystemColorButtonFaceColor` | Foreground/background of buttons and interactive UI |

## Notes

- Windows enables `HighContrastAdjustment` by default, which forces white-on-black text. Set it to `None` once your app correctly uses system-aware theme brushes.
- Four built-in contrast themes: **Aquatic** (default), **Desert**, **Dusk**, **Night sky**. Toggle quickly with Left Alt + Left Shift + Print Screen.
- Do not hard-code colors in `HighContrast` dictionaries, mix incompatible foreground/background pairs, or choose resources purely for aesthetics — users can and do customize theme colors.
- In `ListView` item templates, avoid setting `TextBlock.Foreground` explicitly inside a `DataTemplate`; `ListViewItem` manages `Foreground` for selection/hover/press states and nested `TextBlock`s should inherit it. Omit the `Foreground` setter in the `HighContrast` dictionary to restore correct inversion.
- Recommended border width for transitory surfaces (flyouts, dialogs) that need a contrast-theme-only boundary: 2px.
- **Contrast themes** are distinct from light/dark themes, which use broader palettes and are not optimized for maximum contrast.
- `Grid`, `ResourceDictionary`, `ListView`, `TextBlock`, `Style`, `Color` referenced here are `Microsoft.UI.Xaml` (WinUI 3) types, distinct from `System.Windows` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.

## Related

- [Accessibility overview](./accessibility-overview.md)
- [Designing inclusive software](./designing-inclusive-software.md)
- [Accessible text requirements](./accessible-text-requirements.md)
