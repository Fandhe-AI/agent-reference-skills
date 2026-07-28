# XamlControlsResources

Resource dictionary that supplies the default styles, templates, and theme resources for WinUI controls. Must be merged into `Application.Resources` for WinUI 3 controls to render with their intended look.

## Signature / Usage

```xaml
<Application
    x:Class="App1.App"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <XamlControlsResources xmlns="using:Microsoft.UI.Xaml.Controls" />
                <!-- App-specific resource dictionaries go after XamlControlsResources -->
                <ResourceDictionary Source="Styles/AppStyles.xaml"/>
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Application.Resources>
</Application>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ControlsResourcesVersion | `ControlsResourcesVersion` | Selects which generation of default control resources to use; defaults to `Version2` (current WinUI look). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3, `XamlControlsResources`). Distinct from `System.Windows.Controls` default styles (WPF), which don't require an equivalent explicit merge.
- Must be added as the **first** entry in `Application.Resources`' `MergedDictionaries`, because it overrides many default resource keys — placing custom app resources after it lets them win the lookup instead of being silently overridden.
- Without `XamlControlsResources` merged in, WinUI 3 controls fall back to bare/unstyled visuals since their default styles/templates come from this dictionary.
- This is a WinUI-3-specific merge step; UWP apps using the OS-shipped `Windows.UI.Xaml.Controls` types get default styles from the platform automatically and don't need it.

## Related

- [ResourceDictionary](./resource-dictionary.md)
- [Style, Setter, BasedOn](./style-setter.md)
- [ThemeResource and Theme Dictionaries](./theme-resources.md)
