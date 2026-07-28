# Color

Windows apps use color to create visual hierarchy, indicate interactivity, and reflect personalization through the user's chosen accent color and light/dark theme.

## Signature / Usage

```xaml
<!-- App.xaml: override the system accent color -->
<Application.Resources>
    <ResourceDictionary>
        <Color x:Key="SystemAccentColor">#107C10</Color>
    </ResourceDictionary>
</Application.Resources>

<!-- Page.xaml: use accent color shades for interaction states -->
<Page.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="ButtonBackground" Color="{ThemeResource SystemAccentColor}"/>
                <SolidColorBrush x:Key="ButtonBackgroundPointerOver" Color="{ThemeResource SystemAccentColorLight1}"/>
                <SolidColorBrush x:Key="ButtonBackgroundPressed" Color="{ThemeResource SystemAccentColorDark1}"/>
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Page.Resources>
```

```xaml
<!-- App.xaml: force a theme instead of following the system setting -->
<Application RequestedTheme="Dark"> ... </Application>
```

```csharp
// Custom color from ARGB and use as a solid brush
Color LightBlue = Color.FromArgb(255, 54, 192, 255);
```

## Options / Props

| Resource | Description |
|------|-------------|
| `SystemAccentColor` | The user's selected accent color (or an app-overridden value). Used sparingly to highlight important, interactive elements. |
| `SystemAccentColorLight3` / `Light2` / `Light1` | Lighter shades of the accent color, generated automatically by the Windows shell algorithm. |
| `SystemAccentColorDark1` / `Dark2` / `Dark3` | Darker shades of the accent color, generated automatically by the Windows shell algorithm. |
| `RequestedTheme` (Application property) | Forces `Light` or `Dark` theme for the app; omit to follow the user's system/device theme. |
| **Colors** class (`Microsoft.UI.Colors`) | Predefined named colors usable directly on XAML color properties (e.g. `Background="MediumSlateBlue"`). |
| **Color** struct (`Windows.UI.Color`) | Create custom colors from ARGB/hex; use `ColorHelper.FromArgb` in C++. |

## Notes

- Package: `Microsoft.UI.Xaml.Media` / `Microsoft.UI.Colors` / `Windows.UI.Color` (WinUI 3 / Windows App SDK). Distinct from `System.Windows.Media.Color` (WPF), CSS `color`, and the JS `@ark-ui/react` / `@chakra-ui/react` color token systems.
- Windows supports two color modes (themes): light and dark. Common controls automatically adjust via theme brushes; use `{ThemeResource ...}` rather than hard-coded colors so custom templates adapt to theme changes.
- The user can also select the **high contrast** theme, which overrides `RequestedTheme`.
- When placing colored text on a colored (e.g. accent-tinted) background, verify contrast — see Accessible color contrast.
- Accent color shades (`Light1-3` / `Dark1-3`) are also available programmatically via `UISettings.GetColorValue` and the `UIColorType` enum.

## Related

- [Accessible color contrast](./accessible-color-contrast.md)
- [Materials overview](./materials-overview.md)
