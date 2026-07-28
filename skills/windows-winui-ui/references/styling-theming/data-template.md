# DataTemplate

Describes the visual structure used to render a data object, typically bound via `{Binding}` or `{x:Bind}` for elements inside the template. Used as the value of `ItemsControl.ItemTemplate`, `ContentControl.ContentTemplate`, and various `HeaderTemplate`/`FooterTemplate` properties.

## Signature / Usage

```xaml
<ListView ItemsSource="{StaticResource customers}">
    <ListView.ItemTemplate>
        <DataTemplate x:DataType="local:Customer">
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="{Binding FirstName}" />
                <TextBlock Text="{Binding LastName}" />
            </StackPanel>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| (content) | element tree | The visual structure rendered for each bound data item; typically contains `{Binding}`/`{x:Bind}` expressions. |
| x:DataType | `TypeName` | Declares the compile-time type of the bound data for `{x:Bind}` (compiled bindings). |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3, `DataTemplate`). Distinct from `System.Windows.DataTemplate` (WPF) and Jetpack Compose's `LazyColumn` item content lambdas.
- Can be declared inline as a property-element child of `ItemTemplate` (used once) or as a keyed/implicit resource in a `ResourceDictionary` for reuse across multiple controls or pages.
- Without an `ItemTemplate`, an `ItemsControl` displays only the string representation (`ToString()`) of each bound object.
- For `ContentControl.ContentTemplate`, the data context is the single object the template is applied to — there is no per-item concept as with `ItemsControl`.
- For per-item conditional templates (choosing between multiple `DataTemplate`s), use a `DataTemplateSelector` rather than complex triggers inside one template.

## Related

- [DataTemplateSelector](./data-template-selector.md)
- [ItemContainerStyle](./item-container-style.md)
- [ControlTemplate](./control-template.md)
