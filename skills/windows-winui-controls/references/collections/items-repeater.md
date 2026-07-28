# ItemsRepeater

A low-level, virtualizing, data-driven panel used as a building block for custom collection controls. Unlike `ListView`/`GridView`, it provides no built-in UI, focus, selection, or interaction policy — you attach whatever policy you need.

## Signature / Usage

```xaml
<!-- xmlns:muxc="using:Microsoft.UI.Xaml.Controls" -->
<ScrollViewer>
    <muxc:ItemsRepeater ItemsSource="{x:Bind Items}" ItemTemplate="{StaticResource MyTemplate}">
        <muxc:ItemsRepeater.Layout>
            <muxc:UniformGridLayout MinItemWidth="200" MinColumnSpacing="28"/>
        </muxc:ItemsRepeater.Layout>
    </muxc:ItemsRepeater>
</ScrollViewer>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | Any `IEnumerable`/`IIterable`; richer interfaces unlock more functionality (see Notes). |
| `ItemTemplate` | `DataTemplate` / `DataTemplateSelector` / `IElementFactory` | Defines the visual for each item. No implicit item-container wrapper is added — include your own container (e.g., `ListViewItem`) if you want default margins/selection visuals. |
| `Layout` | `Layout` | Arranges child elements and enables UI virtualization when hosted in a scrollable container. |
| `ElementPrepared` / `ElementClearing` / `ElementIndexChanged` | events | Lifecycle events for virtualized elements — use instead of `Loaded`/`Unloaded`, which aren't reliable under virtualization/recycling. |

### Layout options

| Layout | Key properties | Notes |
|--------|-----------------|-------|
| `StackLayout` (default, vertical) | `Orientation`, `Spacing` | Single line, horizontal or vertical. |
| `UniformGridLayout` | `Orientation`, `MinItemWidth`/`MinItemHeight`, `MinColumnSpacing`/`MinRowSpacing`, `ItemsStretch` (`None`/`Fill`/`Uniform`), `ItemsJustification` (`Start`/`Center`/`End`/`SpaceAround`/`SpaceBetween`/`SpaceEvenly`) | Every item sized equally; `ItemsStretch` affects measure, `ItemsJustification` affects arrange. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from Jetpack Compose `LazyColumn`/`LazyRow` and the JS `@ark-ui/react` primitives.
- `ItemsRepeater` does not derive from `Control` and has no control template, so it has **no built-in scrolling** — always wrap it in a `ScrollViewer` (or `ScrollView`).
- Prefer `ItemsRepeater` over the older `ItemsControl` when you need virtualization: `ItemsControl` does not virtualize its layout, `ItemsRepeater` does.
- **Data virtualization / change notification**: `ItemsSource` interface support determines behavior — `IEnumerable`/`IIterable` forces an internal copy; `IReadOnlyList`/`IVectorView` and `IList`/`IVector` allow indexed access without copying but changes are invisible to the UI unless the source also implements `INotifyCollectionChanged` (or `IObservableVector`, which additionally lacks support for a `Move` action — use `INotifyCollectionChanged` if move semantics matter). Implementing `IKeyIndexMapping` lets `ItemsRepeater` efficiently recover existing UI after a `Reset` action instead of rebuilding everything from scroll position 0.
- `ISupportIncrementalLoading`, `IItemsRangeInfo`, and `ISelectionInfo` — used by ListView/GridView for incremental loading, ranged item info, and selection — currently have **no effect** on `ItemsRepeater`; implement incremental loading manually by observing the hosting `ScrollViewer`'s `ViewChanged` event and the viewport-to-extent distance instead.
- Nesting `ItemsRepeater` inside another `ItemsRepeater`'s `ItemTemplate` creates virtualized grouped/hierarchical layouts efficiently.

## Related

- [ItemsView](./items-view.md)
- [ItemsControl](./items-control.md)
- [ScrollView](./scroll-view.md)
