# Optimize ListView and GridView performance (UI virtualization)

UI virtualization, element reduction per item, progressive rendering (`x:Phase`, `ContainerContentChanging`), and container recycling for `ListView`/`GridView` in WinUI.

## Signature / Usage

```xaml
<GridView ItemsSource="{x:Bind ViewModel.ExampleItems}">
  <GridView.ItemTemplate>
    <DataTemplate x:DataType="local:ExampleItem">
      <StackPanel Height="100" Width="100">
        <TextBlock Text="{x:Bind Title}"/>
        <TextBlock Text="{x:Bind Subtitle}" x:Phase="1"/>
        <TextBlock Text="{x:Bind Description}" x:Phase="2"/>
      </StackPanel>
    </DataTemplate>
  </GridView.ItemTemplate>
</GridView>
```

## Options / Props

| API / Attribute | Purpose |
|------------------|---------|
| `ItemsWrapGrid` / `ItemsStackPanel` (as `ItemsPanel`) | Virtualizing panels — required for UI virtualization; `VariableSizedWrapGrid`, `WrapGrid`, `StackPanel` disable it |
| `ListViewItemPresenter` | Optimized single element for item visuals (focus/selection states); customize via ~25 properties (e.g. `SelectionCheckMarkVisualEnabled`, `SelectedBackground`) instead of a full custom `ControlTemplate` |
| `x:Phase` (with `{x:Bind}`) | Progressively bind/render template elements across scroll passes (phase 0 default, higher phases render later) |
| `ListViewBase.ContainerContentChanging` | Lower-level progressive rendering; use `Opacity` to hide not-yet-updated elements and `args.RegisterUpdateCallback` to chain phases |
| `ListViewBase.ShowsScrollingPlaceholders` | Default-on placeholder visuals during fast scroll; disable if implementing `x:Phase`/`ContainerContentChanging` explicitly |
| `ListViewBase.ChoosingItemContainer` / `ChoosingGroupHeaderContainer` | Higher-performance alternative to `DataTemplateSelector` for heterogeneous item collections; enables container recycling per data-item type |

## Notes

- Set an explicit width/height on an `ItemsControl` placed inside an unbounded panel (e.g. `ScrollViewer`, auto-sized `Grid`) — otherwise the control expands to fit all items and virtualization is defeated.
- `ChoosingItemContainer`/`ChoosingGroupHeaderContainer` events fire only when using `ItemsWrapGrid` or `ItemsStackPanel`.
- For custom virtualizing layouts in Windows App SDK, implement `VirtualizingLayout` (modern equivalent of a custom virtualizing panel).
- `ItemsRepeater` is the lower-level, more customizable virtualizing control referenced elsewhere in WinUI docs for advanced layout scenarios; this page's virtualization guidance (viewport sizing, element reduction) applies equally to `ItemsRepeater`-based UI.

## Related

- [ListView and GridView data virtualization](./listview-and-gridview-data-optimization.md)
- [Optimize XAML loading](./optimize-xaml-loading.md)
- [Best practices for startup performance](./app-startup-performance.md)
