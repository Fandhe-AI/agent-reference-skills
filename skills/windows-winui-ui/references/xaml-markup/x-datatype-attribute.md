# x:DataType attribute

Declares the type that a `DataTemplate` (or other `{x:Bind}` scope) binds to, so that `{x:Bind}` compiled bindings can resolve member types at compile time.

## Signature / Usage

```xaml
<DataTemplate x:Key="SimpleItemTemplate" x:DataType="data:SampleDataGroup">
  <StackPanel Orientation="Vertical" Height="50">
    <TextBlock Text="{x:Bind Title}"/>
    <TextBlock Text="{x:Bind Description}"/>
  </StackPanel>
</DataTemplate>
```

```xaml
<Page ... xmlns:local="using:AppSample">
  <ListView ItemsSource="{x:Bind Songs}">
    <ListView.ItemTemplate>
      <DataTemplate x:DataType="local:SongItem">
        <TextBlock Text="{x:Bind TrackName}" />
      </DataTemplate>
    </ListView.ItemTemplate>
  </ListView>
</Page>
```

## Notes

- Required whenever `{x:Bind}` is used inside a `DataTemplate`, because `{x:Bind}` needs type information at compile time and cannot use `DataContext` (which is of type `Object` and only resolved at runtime).
- The value can be set to an interface or base class type; use casts within `{x:Bind}` expressions when the concrete type is needed.
- On a `ControlTemplate`, the analogous requirement is the `TargetType` property (required, not optional, when using `{x:Bind}` in a `ControlTemplate` — available since Windows 10 version 1809 / SDK 17763).
- Uses the `using:` namespace mapping convention for custom types, e.g. `xmlns:data="using:MyApp.Models"` then `x:DataType="data:SampleDataGroup"`.
- Package: `Microsoft.UI.Xaml` (WinUI 3) / `Windows.UI.Xaml` (UWP) XAML language namespace, used specifically with `{x:Bind}`.

## Related

- [x:Bind markup extension](./x-bind-markup-extension.md)
- [TemplateBinding markup extension](./templatebinding-markup-extension.md)
- [XAML namespaces and namespace mapping](./xaml-namespaces-and-namespace-mapping.md)
