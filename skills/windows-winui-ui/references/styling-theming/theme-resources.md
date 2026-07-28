# ThemeResource and Theme Dictionaries

`{ThemeResource}` is a markup extension, similar to `{StaticResource}`, that re-evaluates its resource lookup whenever the active system theme changes (app load and every subsequent theme switch). Theme dictionaries (`ResourceDictionary.ThemeDictionaries`) hold the per-theme resource sets — `"Light"`, `"Dark"`, and `"HighContrast"` — that `{ThemeResource}` resolves against.

## Signature / Usage

```xaml
<TextBlock Text="hello world" Foreground="{ThemeResource FocusVisualWhiteStrokeThemeBrush}"/>
```

```xaml
<ResourceDictionary>
  <ResourceDictionary.ThemeDictionaries>
    <ResourceDictionary x:Key="Light">
      <SolidColorBrush x:Key="myBrush" Color="{StaticResource ControlFillColorDefault}"/>
    </ResourceDictionary>
    <ResourceDictionary x:Key="Dark">
      <SolidColorBrush x:Key="myBrush" Color="{StaticResource ControlFillColorDefault}"/>
    </ResourceDictionary>
    <ResourceDictionary x:Key="HighContrast">
      <SolidColorBrush x:Key="myBrush" Color="{ThemeResource SystemColorButtonFaceColor}"/>
    </ResourceDictionary>
  </ResourceDictionary.ThemeDictionaries>
</ResourceDictionary>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ThemeDictionaries | `IMap<object, ResourceDictionary>` | Per-theme resource sets, each keyed by theme name (`"Light"`, `"Dark"`, `"HighContrast"`, or `"Default"`). |
| {ThemeResource key} | markup extension | Resolves `key` against the active theme dictionary; reevaluated on theme change. |
| {StaticResource key} | markup extension | Resolves `key` once at load time; does not react to theme changes. |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3, theme resources / `{ThemeResource}`). Distinct from `System.Windows.ThemeResource` (WPF) usage, and unrelated to CSS custom properties in `ark-ui`/`chakra-ui`.
- Always define both `"Light"` and `"Dark"` dictionaries in addition to `"HighContrast"` — prefer explicit `"Light"`/`"Dark"` over a single `"Default"` key.
- Inside `ThemeDictionaries`, use `{StaticResource}` for resource definitions, not `{ThemeResource}` — the exception is referencing theme-agnostic system resources like `SystemAccentColor` or `SystemColor*` keys, which may use `{ThemeResource}`.
- Violating this guideline causes shared-brush "bleed" between differently-themed sub-trees (e.g. a light-themed flyout altering a dark-themed page) because brush resources are shared objects, not copied per usage.
- `SystemAccentColor` reflects the user's Windows personalization accent color at runtime; `SystemColor[name]Color` keys map to Windows' high-contrast palette — respect these rather than overriding them.
- The type ramp (`CaptionTextBlockStyle`, `BodyTextBlockStyle`, `TitleTextBlockStyle`, etc.) and named button styles (`NavigationBackButtonNormalStyle`) are also defined in the theme resources file (`themeresources.xaml`) alongside color/brush resources.

## Related

- [ResourceDictionary](./resource-dictionary.md)
- [ElementTheme and RequestedTheme](./element-theme.md)
- [Contrast Themes (HighContrast)](./high-contrast-themes.md)
