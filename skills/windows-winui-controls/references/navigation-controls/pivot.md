# Pivot

Enables touch-swiping between a small set of content sections, each represented by a `PivotItem`.

## Signature / Usage

```xaml
<Pivot x:Name="rootPivot" Title="Category Title">
    <PivotItem Header="Section 1">
        <TextBlock Text="Content of section 1."/>
    </PivotItem>
    <PivotItem Header="Section 2">
        <TextBlock Text="Content of section 2."/>
    </PivotItem>
</Pivot>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Title` | `object` | Title shown above the pivot headers. |
| `Items` | `IList<object>` | Pivot content (inherited `ItemsControl`); items not explicitly `PivotItem` are auto-wrapped. |
| `ItemsSource` | `object` | Data-bound alternative to `Items`; requires `ItemTemplate`/`HeaderTemplate` for non-`PivotItem` data. |
| `SelectedItem` | `object` | Gets/sets the active `PivotItem`. |
| `SelectedIndex` | `int` | Gets/sets the index of the active item. |
| `LeftHeader` / `RightHeader` | `UIElement` | Additional controls placed at either end of the pivot header row (e.g. a `CommandBar`). |
| `PivotItem.Header` | `object` | Label for a single pivot section. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).
- **Not recommended for Windows 11 design patterns.** Official guidance recommends `SelectorBar`, `NavigationView`, or `TabView` instead; the docs page includes an example of converting a Pivot layout to `NavigationView`.
- Overflowing headers carousel (loop) rather than showing a dropdown menu, unlike `NavigationView`.

## Related

- [NavigationView](./navigationview.md)
- [TabView](./tabview.md)
