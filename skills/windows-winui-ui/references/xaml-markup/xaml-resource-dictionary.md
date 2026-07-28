# ResourceDictionary and XAML resource references

Explains how to define a `ResourceDictionary` and keyed resources, and how resources are looked up, merged, and theme-switched.

## Signature / Usage

```xaml
<Page ...>
    <Page.Resources>
        <x:String x:Key="greeting">Hello world</x:String>
        <SolidColorBrush x:Key="myFavoriteColor" Color="green"/>
    </Page.Resources>
    <TextBlock Text="{StaticResource greeting}"/>
</Page>
```

```xaml
<!-- Merged dictionaries -->
<Page.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="Dictionary1.xaml"/>
            <ResourceDictionary Source="Dictionary2.xaml"/>
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Page.Resources>
```

```xaml
<!-- Theme dictionaries -->
<Page.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <ResourceDictionary Source="Dictionary1.xaml" x:Key="Light"/>
            <ResourceDictionary Source="Dictionary2.xaml" x:Key="Dark"/>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Page.Resources>
```

## Notes

- Every resource needs a key: `x:Key`, or (for `Style`/`ControlTemplate`/`DataTemplate` with `TargetType`) an implicit key equal to the `TargetType`, or `x:Name` (less efficient — also generates a code-behind field).
- **Lookup order**: the requesting element's own `Resources` → each parent `FrameworkElement.Resources` up to the page root → `Application.Resources` → theme dictionaries (for control templates) → platform resources. First match wins; the search stops there.
- Forward references within a dictionary are not resolved — a resource must be defined lexically before anything that references it, including app-level resources referencing page-level ones (not possible).
- Only shareable objects can be resources: `Style`/`FrameworkTemplate` subclasses, `Brush`/`Color`, animation types (`Storyboard`), transforms, `Matrix`/`Matrix3D`, `Point`, `Thickness`/`CornerRadius`, XAML intrinsic types, and custom types with a default constructor that don't derive from `UIElement`.
- Code lookup (`this.Resources["key"]`, `Application.Current.Resources`) does **not** fall back from page to app resources the way `{StaticResource}` does in XAML — it only checks the dictionary you query.
- `MergedDictionaries` entries are checked in inverse declaration order (last-declared wins on duplicate keys); key uniqueness is enforced only within a single `ResourceDictionary`, not across merged files.
- `ThemeDictionaries` entries are keyed by theme name (`"Default"`, `"Light"`, `"Dark"`, `"HighContrast"`) and looked up dynamically by [ThemeResource](./themeresource-markup-extension.md) references on theme change.
- `XamlReader.Load` parses XAML in a context unaware of any other `ResourceDictionary`, including `Application.Resources`; don't use `{ThemeResource}` in XAML submitted to `XamlReader.Load`.
- A `UserControl` has both a definition scope (cannot access app resources) and a usage scope (can access app resources through the normal parent-chain lookup).
- Package: `Microsoft.UI.Xaml.ResourceDictionary` (WinUI 3) / `Windows.UI.Xaml.ResourceDictionary` (UWP). Distinct from Ark UI/Chakra UI theme tokens and CSS custom properties.

## Related

- [StaticResource markup extension](./staticresource-markup-extension.md)
- [ThemeResource markup extension](./themeresource-markup-extension.md)
- [x:Key attribute](./x-key-attribute.md)
- [XamlReader.Load](./xamlreader-load.md)
