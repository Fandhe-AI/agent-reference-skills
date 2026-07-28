# {Binding} markup extension

Runtime data binding markup extension, converted at XAML load time into an instance of the `Binding` class. More flexible but less performant than `{x:Bind}`.

## Signature / Usage

```xaml
<object property="{Binding}" .../>
<object property="{Binding propertyPath}" .../>
<object property="{Binding propertyPath, bindingProperties}" .../>
```

```xaml
<!-- binding a UI element to a view model -->
<Page ... >
    <Page.DataContext>
        <local:BookstoreViewModel/>
    </Page.DataContext>
    <GridView ItemsSource="{Binding BookSkus}" SelectedItem="{Binding SelectedBookSku, Mode=TwoWay}" ... />
</Page>
```

```xaml
<!-- binding a UI element to another UI element -->
<Slider x:Name="sliderValueConverter" ... />
<TextBox Text="{Binding Path=Value, ElementName=sliderValueConverter,
    Mode=OneWay, Converter={StaticResource GradeConverter}}"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Path | property path string | Property path evaluated against the source (positional: `{Binding EmployeeID}` or `Path=EmployeeID`). Supports dot delimiters and collection indexers (`Teams[0].Players`). |
| Source | object reference | Explicit data source, typically a `{StaticResource}` reference. If unset, the acting `DataContext` supplies the source. |
| ElementName | string | Binds to another named element (`Name` / `x:Name`) in the same XAML tree. |
| RelativeSource | `{RelativeSource}` extension | Specifies the source relative to the binding target's position (e.g. `Self`, `TemplatedParent`). Used most often inside control templates. |
| Converter | `IValueConverter` instance | Converter called by the binding engine. |
| ConverterLanguage | string | Culture identifier used by the converter. |
| ConverterParameter | object | Parameter passed to converter logic. |
| FallbackValue | object | Value shown when the source/path cannot be resolved. |
| TargetNullValue | object | Value shown when the source resolves but is explicitly `null`. |
| Mode | `OneTime` \| `OneWay` \| `TwoWay` | Binding mode. Default is `OneWay` (differs from `{x:Bind}`'s default of `OneTime`). |
| UpdateSourceTrigger | `Default` \| `LostFocus` \| `PropertyChanged` \| `Explicit` | Timing of source updates for TwoWay bindings. |

## Notes

- Package: `Microsoft.UI.Xaml.Data` (WinUI 3, Windows App SDK). Distinct from WPF's `System.Windows.Data.Binding`.
- `Source`, `RelativeSource`, and `ElementName` are mutually exclusive.
- Target property of a binding must be a `DependencyProperty`.
- In C++/WinRT, the runtime class you bind to needs the `[Bindable]` (`BindableAttribute`) attribute, or must implement `ICustomPropertyProvider` / `ICustomProperty`.
- Bindings can also be created imperatively: `new Binding { Path = new PropertyPath("Brush1") }` then `FrameworkElement.SetBinding(...)`. This is the only way to programmatically construct bindings — `{x:Bind}` has no code-behind equivalent.
- Binding errors surface at runtime in Visual Studio's **Output** and **XAML Binding Failures** windows (no compile-time validation, unlike `{x:Bind}`).

## Related

- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [DataContext](./datacontext.md)
- [IValueConverter](./ivalueconverter.md)
- [CollectionViewSource](./collectionviewsource.md)
