# CollectionViewSource

Sealed `DependencyObject` class that provides a data source adding grouping and current-item support to collection classes, sitting between an items control and the raw binding source.

## Signature / Usage

```csharp
public sealed class CollectionViewSource : DependencyObject
```

```xaml
<Grid.Resources>
    <CollectionViewSource
        x:Name="AuthorHasACollectionOfBookSku"
        Source="{x:Bind ViewModel.Authors}"
        IsSourceGrouped="true"
        ItemsPath="BookSkus"/>
</Grid.Resources>

<GridView ItemsSource="{x:Bind AuthorHasACollectionOfBookSku}">
    <GridView.GroupStyle>
        <GroupStyle HeaderTemplate="{StaticResource AuthorGroupHeaderTemplateWide}" />
    </GridView.GroupStyle>
</GridView>
```

```csharp
// "is-a-group" pattern using LINQ (group class not required)
var genres = from book in bookSkus
             group book by book.genre into grp
             orderby grp.Key
             select grp;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Source | object | The collection object from which to create the view. Cannot itself be another `CollectionViewSource`. |
| IsSourceGrouped | bool | Set `true` to activate grouping. |
| ItemsPath | property path | Name of the property that holds each group's items, required for the "has-a-group" pattern (group object has a collection property). Not needed for the "is-a-group" pattern (group object derives from a collection type, e.g. `List<T>`, or is a LINQ `IGrouping<TKey,T>`). |
| View | `ICollectionView` | The generated view; access the synchronized current item via `View.CurrentItem`. |

## Notes

- Chain multiple `CollectionViewSource` instances (each bound to the previous one's items) to build hierarchical master/details views, one per level.
- Any controls bound to the same `CollectionViewSource` share the same current item — useful for keeping a list and a details view in sync without explicit `SelectedItem` wiring.
- Binding an items control directly to a `CollectionViewSource` implicitly binds to the current item for paths not found on the collection itself; `CurrentItem` can be specified explicitly if there's ambiguity.
- Grouped item templates for `{x:Bind}` need `x:DataType`; if the group type is generic (e.g. `IGrouping<string, BookSku>`), use `{Binding}` instead in the `GroupStyle.HeaderTemplate` since generics can't be expressed in `x:DataType`.
- Pair with `SemanticZoom` for zoomed-in/zoomed-out navigation of the same grouped `CollectionViewSource`.

## Related

- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [{Binding} markup extension](./binding-markup-extension.md)
- [ItemsSource binding](./itemssource-binding.md)
