# BreadcrumbBar

Displays the direct path of pages or folders to the current location, collapsing overflow nodes into an ellipsis flyout when space is limited.

## Signature / Usage

```xaml
<BreadcrumbBar x:Name="BreadcrumbBar1" ItemClicked="BreadcrumbBar1_ItemClicked"/>
```

```csharp
BreadcrumbBar1.ItemsSource =
    new string[] { "Home", "Documents", "Design", "Northwind" };

private void BreadcrumbBar1_ItemClicked(BreadcrumbBar sender, BreadcrumbBarItemClickedEventArgs args)
{
    if (args.Index < Breadcrumbs.Count - 1)
    {
        var crumb = (Crumb)args.Item;
        Frame.Navigate((Type)crumb.Data);
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | The only way to populate breadcrumbs (there is no `Items` property); bind to a collection of any data type. |
| `ItemTemplate` | `DataTemplate` | Defines how each breadcrumb item is displayed; by default the item's `ToString()` is shown. |

## Events

- `ItemClicked` — raised when the user clicks a node; `args.Index` and `args.Item` identify which node. The last item (current location) is typically excluded from navigation logic.

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).
- Use when the navigation path itself is relevant (e.g. file explorers); for only 2 levels, prefer simple back navigation.
- Supports lightweight styling via theme resources for custom appearance.

## Related

- [NavigationView](./navigationview.md)
- [Frame](./frame.md)
