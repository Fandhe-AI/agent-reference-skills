# ElementTheme and RequestedTheme

`ElementTheme` is the enum (`Default`, `Light`, `Dark`) used by `FrameworkElement.RequestedTheme` to force a light/dark theme on a specific element subtree, independent of `Application.RequestedTheme`.

## Signature / Usage

```xaml
<!-- App.xaml: request an app-wide theme -->
<Application RequestedTheme="Dark"> ... </Application>
```

```xaml
<!-- Force one subtree to Light regardless of the app-wide theme -->
<StackPanel RequestedTheme="Light">
    <TextBlock Text="Always light"/>
</StackPanel>
```

```csharp
string state = (Window.Current.Bounds.Width > 768) ? "DefaultLayout" : "Below768Layout";
// e.g. toggle at runtime
rootGrid.RequestedTheme = ElementTheme.Dark;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ElementTheme.Default | enum member (0) | Use `Application.RequestedTheme`'s value for this element. |
| ElementTheme.Light | enum member (1) | Force the Light theme for this element and its children. |
| ElementTheme.Dark | enum member (2) | Force the Dark theme for this element and its children. |
| FrameworkElement.RequestedTheme | `ElementTheme` | Per-element theme override; can be changed at runtime. |
| Application.RequestedTheme | `ApplicationTheme` | App-wide theme; can only be set once at startup (in `App.xaml` or before window activation), not changed while running. |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3, `ElementTheme`/`RequestedTheme`). Distinct from `System.Windows.ElementTheme` (does not exist in WPF) and unrelated to `apple-swiftui`'s `.preferredColorScheme` or CSS `prefers-color-scheme` used by `ark-ui`/`chakra-ui`.
- Omitting `Application.RequestedTheme` makes the app follow the user's system Light/Dark setting; test both explicitly if you don't set it.
- If the user selects a High Contrast theme in Windows Settings, the system overrides `RequestedTheme` regardless of what the app requests.
- `FrameworkElement.RequestedTheme` (unlike `Application.RequestedTheme`) can be changed at runtime and applies to that element and its descendants.
- App-wide accent color can be overridden by redefining the `SystemAccentColor` resource key in `Application.Resources`; accent shades (`SystemAccentColorLight1`/`Dark1`/etc.) are exposed as theme resources.

## Related

- [ThemeResource and Theme Dictionaries](./theme-resources.md)
- [Contrast Themes (HighContrast)](./high-contrast-themes.md)
