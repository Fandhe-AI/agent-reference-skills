# In-app acrylic

Apply in-app acrylic to app surfaces with a XAML `AcrylicBrush` or the predefined `AcrylicBrush` theme resources.

## Signature / Usage

```xaml
<Grid Background="{ThemeResource AcrylicInAppFillColorDefaultBrush}">
```

Custom brush defined per theme:

```xaml
<ResourceDictionary.ThemeDictionaries>
    <ResourceDictionary x:Key="Default">
        <AcrylicBrush x:Key="MyAcrylicBrush"
            TintColor="#FFFF0000"
            TintOpacity="0.8"
            TintLuminosityOpacity="0.5"
            FallbackColor="#FF7F0000"/>
    </ResourceDictionary>

    <ResourceDictionary x:Key="HighContrast">
        <SolidColorBrush x:Key="MyAcrylicBrush"
            Color="{ThemeResource SystemColorWindowColor}"/>
    </ResourceDictionary>

    <ResourceDictionary x:Key="Light">
        <AcrylicBrush x:Key="MyAcrylicBrush"
            TintColor="#FFFF0000"
            TintOpacity="0.8"
            TintLuminosityOpacity="0.5"
            FallbackColor="#FFFF7F7F"/>
    </ResourceDictionary>
</ResourceDictionary.ThemeDictionaries>
```

In code:

```csharp
AcrylicBrush myBrush = new AcrylicBrush();
myBrush.TintColor = Color.FromArgb(255, 202, 24, 37);
myBrush.FallbackColor = Color.FromArgb(255, 202, 24, 37);
myBrush.TintOpacity = 0.6;

grid.Background = myBrush;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| TintColor | `Color` | The color/tint overlay layer. |
| TintOpacity | `double` | The opacity of the tint layer. |
| TintLuminosityOpacity | `double` | Controls the amount of saturation allowed through the acrylic surface from the background. If unspecified, the system adjusts it based on `TintColor` and `TintOpacity`. |
| FallbackColor | `Color` | Solid color that replaces acrylic when the effect cannot be rendered (Battery Saver, *Transparency effects* off in Settings > Personalization > Colors, low-end hardware). |

## Notes

- Source: https://learn.microsoft.com/en-us/windows/apps/develop/ui/in-app-acrylic
- In WinUI 3, `AcrylicBrush` provides in-app acrylic only: it blurs and tints XAML content within the app window, not the desktop behind it. The UWP `BackgroundSource` property (`HostBackdrop`) is not available in WinUI 3.
- For window-level acrylic that shows the desktop, set `Window.SystemBackdrop` to a `DesktopAcrylicBackdrop`. To apply Mica or Acrylic from the OS compositor to a specific element, use `SystemBackdropElement`.
- Define the brush for dark, light, and high contrast themes. In high contrast, use a `SolidColorBrush` with the same `x:Key` as the dark/light `AcrylicBrush`.
- Predefined brush theme resources live in `AcrylicBrush_19h1_themeresources.xaml` in the microsoft-ui-xaml repo.
- Source page last updated 2026-07-17 (en-us). Distinct from CSS `backdrop-filter` in `ark-ui` / `chakra-ui`.

## Related

- [Acrylic Material](./acrylic-material.md)
- [Materials in Windows apps](./materials-overview.md)
- [System Backdrops](./system-backdrops.md)
- [Brushes](./brushes.md)
- [Theme Resources](./theme-resources.md)
