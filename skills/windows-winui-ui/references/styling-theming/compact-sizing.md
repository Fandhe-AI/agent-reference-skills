# Compact sizing for controls

WinUI 3 controls default to touch-optimized spacing. Merging the `Compact.xaml` density dictionary reduces control height and padding for mouse/keyboard desktop apps so more content fits on screen.

## Signature / Usage

```xaml
<Page.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="ms-appx:///Microsoft.UI.Xaml/DensityStyles/Compact.xaml" />
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Page.Resources>
```

App-wide (in `App.xaml`):

```xaml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <XamlControlsResources xmlns="using:Microsoft.UI.Xaml.Controls" />
            <ResourceDictionary Source="ms-appx:///Microsoft.UI.Xaml/DensityStyles/Compact.xaml" />
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

Runtime toggle:

```csharp
// Apply compact sizing
var compactDict = new ResourceDictionary
{
    Source = new Uri("ms-appx:///Microsoft.UI.Xaml/DensityStyles/Compact.xaml")
};
MyPanel.Resources.MergedDictionaries.Add(compactDict);

// Remove compact sizing (restore default sizing)
MyPanel.Resources.MergedDictionaries.Remove(compactDict);
```

## Options / Props

| Scenario | Recommendation |
|----------|----------------|
| Productivity or data-entry apps (tables, forms, settings) | Compact sizing |
| Consumer apps or apps designed for touch input | Default sizing |
| Mixed apps with a settings panel | Apply compact sizing scoped to the settings panel only |

## Notes

- Applies to common interactive controls such as `Button`, `CheckBox`, `ComboBox`, `TextBox`, `Slider`, and others.
- Placing the dictionary in a page's `Resources` affects all controls on the page; placing it in a panel's `Resources` scopes it to that panel.
- In `App.xaml`, merge the compact dictionary after `XamlControlsResources` so it correctly overrides the default size values.
- WinUI 3 provides only two density levels: default and compact. There is no API to set an arbitrary density value.
- Source page last updated 2026-07-07 (en-us). Distinct from CSS/Compose density settings in `ark-ui`, `chakra-ui`, and `android-compose-ui`.

## Related

- [Theme Resources](./theme-resources.md)
- [Resource Dictionary](./resource-dictionary.md)
- [XAML Controls Resources](./xaml-controls-resources.md)
