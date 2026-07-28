# NavigationViewItem

A single navigation entry hosted inside a `NavigationView` pane. Supports icons, nested items (hierarchical navigation), and separators/headers as sibling elements.

## Signature / Usage

```xaml
<NavigationView.MenuItems>
    <NavigationViewItem Content="Collections" Icon="Keyboard">
        <NavigationViewItem.MenuItems>
            <NavigationViewItem Content="Notes" Icon="Page"/>
            <NavigationViewItem Content="Mail" Icon="Mail"/>
        </NavigationViewItem.MenuItems>
    </NavigationViewItem>
</NavigationView.MenuItems>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Content` | `object` | Label content shown for the item. |
| `Icon` | `IconElement` | Icon shown next to the content (also settable via the shorthand `Icon="Home"`). |
| `Tag` | `object` | Free-form data, commonly used to store the page type/name to navigate to. |
| `MenuItems` | `IList<object>` | Nested `NavigationViewItem` children for hierarchical navigation. |
| `MenuItemsSource` | `object` | Data-bound alternative to `MenuItems` for the next level of hierarchy. |
| `SelectsOnInvoked` | `bool` | Whether invoking the item also selects it. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Sibling types `NavigationViewItemSeparator` and `NavigationViewItemHeader` are used for grouping items in the pane.
- Two levels of nesting is the recommended maximum for usability.
- Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` menu item primitives and Jetpack Compose `NavigationDrawerItem`.

## Related

- [NavigationView](./navigationview.md)
