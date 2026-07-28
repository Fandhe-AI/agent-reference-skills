# Contrast Themes (HighContrast)

Windows contrast themes (`Aquatic`, `Desert`, `Dusk`, `Night sky`, or user-customized) use a constrained, high-ratio color palette for accessibility. Apps participate via the `"HighContrast"` key in `ResourceDictionary.ThemeDictionaries`, mapping semantic brushes to dynamic `SystemColor*` resources.

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
            <!-- HighContrast is used for all four built-in contrast themes -->
            <ResourceDictionary x:Key="HighContrast">
                <SolidColorBrush x:Key="BrandedPageBackgroundBrush" Color="{ThemeResource SystemColorWindowColor}" />
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Application.Resources>

<Grid Background="{ThemeResource BrandedPageBackgroundBrush}">
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| SystemColorWindowColor / SystemColorWindowTextColor | theme color resource | Page/pane/window background and its paired foreground text. |
| SystemColorHotlightColor | theme color resource | Hyperlinks. |
| SystemColorGrayTextColor | theme color resource | Inactive/disabled UI only. |
| SystemColorHighlightColor / SystemColorHighlightTextColor | theme color resource | Selected/hover/pressed background and its paired foreground. |
| SystemColorButtonFaceColor / SystemColorButtonTextColor | theme color resource | Interactable control background and its paired foreground. |
| UIElement.HighContrastAdjustment | property | Defaults to forcing white-on-black text; set to `None` once correct system-aware brushes are used so intended contrast-theme styling flows through. |
| Microsoft.UI.System.ThemeSettings.HighContrast | property | Programmatically detect whether a contrast theme is active. |

## Notes

- Package: `Microsoft.UI.Xaml` / `Microsoft.UI.System` (WinUI 3, `ThemeDictionaries` `"HighContrast"` key, `ThemeSettings`). Distinct from `System.Windows.SystemColors` (WPF) and OS-level high-contrast APIs in other platforms.
- Contrast themes are not the same as Dark theme — they use a smaller, high-ratio (typically ≥7:1) palette specifically for legibility, toggled via Settings > Accessibility > Contrast themes (or Left Alt+Left Shift+PrtScn).
- Never hard-code colors for contrast-theme-relevant UI; always route through `SystemColor*` resources via `{ThemeResource}` so runtime theme switches apply. Two-stage `{ThemeResource}` chaining (a semantic brush pointing to a `SystemColor*` resource) is the recommended pattern.
- Don't mix incompatible foreground/background pairs (e.g. don't use `SystemColorGrayTextColor` for anything but disabled content, or `SystemColorHotlightColor` for anything but hyperlinks).
- In `ListView`/`GridView` item templates, avoid setting `TextBlock.Foreground` explicitly — `ListViewItem` sets `Foreground` for state transitions (hover/pressed/selected) and nested `TextBlock`s should inherit it; explicit overrides break the contrast-theme text-color inversion for selected rows.
- Add borders (recommend 2px) where two adjacent surfaces would otherwise share `SystemColorWindowColor` and lose visual separation in contrast mode.

## Related

- [ThemeResource and Theme Dictionaries](./theme-resources.md)
- [ElementTheme and RequestedTheme](./element-theme.md)
