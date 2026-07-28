# Contrast themes

Contrast themes use a constrained, high-separation color palette (contrast ratios typically 7:1 or above) to improve legibility for users who need strong visual separation between foreground and background content. They are distinct from ordinary light/dark themes.

## Signature / Usage

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
            <!-- HighContrast is used in all high contrast themes -->
            <ResourceDictionary x:Key="HighContrast">
                <SolidColorBrush x:Key="BrandedPageBackgroundBrush"
                                  Color="{ThemeResource SystemColorWindowColor}" />
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Application.Resources>

<Grid Background="{ThemeResource BrandedPageBackgroundBrush}"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UIElement.HighContrastAdjustment` | `ElementHighContrastAdjustment` | Enabled by default; forces white foreground text on a black highlight background to guarantee readability. Set to `None` once your app defines correct system-aware theme brushes so intended contrast-theme styling flows through instead. |
| `Microsoft.UI.System.ThemeSettings.HighContrast` | `bool` (property) | Programmatically detect whether a contrast theme is currently active. |
| `ResourceDictionary.ThemeDictionaries` | dictionary of `ResourceDictionary` | Keyed by `Default`, `Light`, `HighContrast` (etc.); lets you define theme-specific resource values that resolve automatically via `{ThemeResource}` and update live on theme switch. |
| `SystemColorWindowColor` / `SystemColorWindowTextColor` | `Color` / brush theme resources | Background of pages/panes/popups/windows, paired with the text color for headings/body/lists/borders. |
| `SystemColorHotlightColor` | theme resource | Hyperlink color only — don't reuse for other purposes. |
| `SystemColorGrayTextColor` | theme resource | Inactive/disabled UI only — don't reuse for secondary/hint body text. |
| `SystemColorHighlightColor` / `SystemColorHighlightTextColor` | theme resource pair | Background/foreground for selected, hovered, pressed, or in-progress UI. |
| `SystemColorButtonFaceColor` / `SystemColorButtonTextColor` | theme resource pair | Background/foreground for buttons and other interactable UI. |

## Notes

- Applies to WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml.UIElement.HighContrastAdjustment`, `Microsoft.UI.System.ThemeSettings`, `Microsoft.UI.Xaml.ResourceDictionary.ThemeDictionaries`). Do not confuse `HighContrastAdjustment` (a per-element WinUI property) with the general "high contrast" / "contrast theme" OS feature.
- Toggle contrast themes quickly with Left Alt + Left Shift + Print Screen, or via **Settings > Accessibility > Contrast themes** (four built-in themes: Aquatic, Desert, Dusk, Night sky).
- Never hard-code colors inside a `HighContrast` theme dictionary entry — always reference `SystemColor*` resources so user-customized theme colors are respected.
- `TextBlock.Foreground` set explicitly inside a `ListView` `DataTemplate` breaks selection-state color inheritance in contrast themes; omit the `Foreground` setter in the `HighContrast` dictionary variant so inherited state-driven color applies.
- Test in all four built-in contrast themes while the app is actually running, not just via static review.

## Related

- [Accessible text requirements](./accessible-text-requirements.md)
- [Focus visuals](./focus-visuals.md)
- [Accessibility checklist](./accessibility-checklist.md)
