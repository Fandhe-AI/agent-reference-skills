# DataTemplateSelector

Base class that enables custom logic for choosing which `DataTemplate` to use per item in a collection, based on item type or property values. You subclass it and override `SelectTemplateCore`.

## Signature / Usage

```csharp
public class MyDataTemplateSelector : DataTemplateSelector
{
    public DataTemplate Normal { get; set; }
    public DataTemplate Accent { get; set; }

    protected override DataTemplate SelectTemplateCore(object item)
    {
        return (int)item % 2 == 0 ? Normal : Accent;
    }
}
```

```xaml
<Page.Resources>
    <DataTemplate x:Key="NormalItemTemplate" x:DataType="x:Int32">
        <TextBlock Text="{x:Bind}" />
    </DataTemplate>
    <DataTemplate x:Key="AccentItemTemplate" x:DataType="x:Int32">
        <TextBlock Text="{x:Bind}" Foreground="{ThemeResource SystemAccentColor}"/>
    </DataTemplate>

    <local:MyDataTemplateSelector x:Key="MySelector"
        Normal="{StaticResource NormalItemTemplate}"
        Accent="{StaticResource AccentItemTemplate}"/>
</Page.Resources>

<ListView ItemsSource="{x:Bind NumbersList}"
          ItemTemplateSelector="{StaticResource MySelector}"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| SelectTemplateCore(object item) | method (override) | Returns the `DataTemplate` to use for the given item. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3, `DataTemplateSelector`). Distinct from `System.Windows.Controls.DataTemplateSelector` (WPF).
- Bind via `ItemTemplateSelector` on `ItemsControl`-derived controls (`ListView`, `GridView`); `ItemsRepeater` has no `ItemTemplateSelector` — bind the selector to its `ItemTemplate` property instead.
- Avoid giving every item in a large `ListView`/`GridView` a completely different template — this hurts scroll/pan performance. Prefer binding a single template's properties (e.g. an icon source) when possible.
- For high-performance heterogeneous collections, consider the `ChoosingItemContainer` event instead of a template selector.

## Related

- [DataTemplate](./data-template.md)
- [ItemContainerStyle](./item-container-style.md)
