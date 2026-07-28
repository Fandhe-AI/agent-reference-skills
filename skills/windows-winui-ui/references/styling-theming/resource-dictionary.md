# ResourceDictionary

Container for shareable XAML resources (styles, templates, brushes, colors, strings). Resources are looked up by key via `{StaticResource}` or `{ThemeResource}`, and can be combined across files with `MergedDictionaries` or varied per-theme with `ThemeDictionaries`.

## Signature / Usage

```xaml
<Page.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="Dictionary1.xaml"/>
        </ResourceDictionary.MergedDictionaries>

        <x:String x:Key="greeting">Hello world</x:String>
    </ResourceDictionary>
</Page.Resources>

<TextBlock Text="{StaticResource greeting}"/>
```

```xaml
<!-- Theme dictionaries: one ResourceDictionary per theme, keyed by theme name -->
<ResourceDictionary.ThemeDictionaries>
    <ResourceDictionary x:Key="Light">
        <SolidColorBrush x:Key="ButtonBackground" Color="Transparent"/>
    </ResourceDictionary>
    <ResourceDictionary x:Key="Dark">
        <SolidColorBrush x:Key="ButtonBackground" Color="#333333"/>
    </ResourceDictionary>
</ResourceDictionary.ThemeDictionaries>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| MergedDictionaries | `IVector<ResourceDictionary>` | Combines other dictionaries into this one. Later entries are checked first when keys collide. |
| ThemeDictionaries | `IMap<object, ResourceDictionary>` | Per-theme resource sets keyed by `"Default"`, `"Light"`, `"Dark"`, or `"HighContrast"`. Looked up dynamically by `{ThemeResource}` references. |
| Source | `Uri` | Points a merged/theme dictionary entry at a separate XAML file. |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3, `ResourceDictionary`). Distinct from `System.Windows.ResourceDictionary` (WPF).
- Every `FrameworkElement` has a `Resources` property, so any element (`Page`, `Border`, `Application`, a single `CheckBox`) can host a local `ResourceDictionary` — lookup walks up from the element, to its parents, to `Application.Resources`, to theme dictionaries, then to platform resources.
- `Style` / `ControlTemplate` / `DataTemplate` use their `TargetType` as an implicit key when `x:Key` is omitted; `{StaticResource}` can only retrieve resources by string key (`x:Key`/`x:Name`), not by implicit type key — implicit styles are found by the framework automatically during control style resolution.
- `XamlControlsResources` overrides many default resource keys and must be added to `Application.Resources` first so it doesn't override custom app resources declared after it.
- Resource lookups in code (`this.Resources["key"]`) only check the immediate dictionary — unlike `{StaticResource}`, they do not fall back to `Application.Resources`.
- XAML resource references must reference a key already defined earlier in the same dictionary; forward references fail to resolve.

## Related

- [ThemeResource and Theme Dictionaries](./theme-resources.md)
- [Style, Setter, BasedOn](./style-setter.md)
- [XamlControlsResources](./xaml-controls-resources.md)
