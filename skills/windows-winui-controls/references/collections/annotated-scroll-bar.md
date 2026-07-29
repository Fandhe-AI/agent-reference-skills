# AnnotatedScrollBar

A vertical scrollbar replacement that shows category labels and a tooltip along the rail to help users navigate a large scrollable collection. Connects to a scrolling container (typically `ItemsView` or `ScrollView`) through the `IScrollController` interface rather than by direct data binding.

## Signature / Usage

```xaml
<Grid ColumnDefinitions="*,Auto">
    <ItemsView VerticalScrollController="{x:Bind annotatedScrollBar.ScrollController}"/>
    <AnnotatedScrollBar x:Name="annotatedScrollBar" Grid.Column="1"
        DetailLabelRequested="AnnotatedScrollBar_DetailLabelRequested"/>
</Grid>
```

```csharp
private void AnnotatedScrollBar_DetailLabelRequested(AnnotatedScrollBar sender, AnnotatedScrollBarDetailLabelRequestedEventArgs args)
{
    args.Content = GetLabelForOffset(args.ScrollOffset);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Labels` | `IVector<AnnotatedScrollBarLabel>` | Collection of always-visible category labels; each `AnnotatedScrollBarLabel` needs `Content` (displayed text) and `ScrollOffset` (position it marks). Labels that collide with each other are clipped except the first. |
| `ScrollController` | `IScrollController` (read-only) | The control's own `IScrollController` implementation; bind a container's `VerticalScrollController` (e.g. `ItemsView.VerticalScrollController`, or `ScrollView.ScrollPresenter.VerticalScrollController`) to it. |
| `SmallChange` | `double` | Amount the top/bottom arrow buttons scroll the content per click. |

## Events

| Name | Description |
|------|-------------|
| `DetailLabelRequested` | Raised to populate the hover/drag tooltip (`AnnotatedScrollBarDetailLabelRequestedEventArgs`); handler reads `args.ScrollOffset` and sets `args.Content`. |
| `Scrolling` | Raised as the user scrolls (`AnnotatedScrollBarScrollingEventArgs`); `args.Cancel` can veto the scroll action. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3, Windows App SDK).
- Unlike `ScrollBar`, the thumb is a non-interactive, fixed-height position indicator only — it can't be dragged directly; users drag anywhere on the rail instead.
- For `ScrollView`, wire up via `scrollView.ScrollPresenter.VerticalScrollController = annotatedScrollBar.ScrollController` (code-behind) since `ScrollView` doesn't expose `VerticalScrollController` directly as a settable XAML property the way `ItemsView` does.
- Recommended for large collections needing quick navigation; for short lists, prefer a default scrollbar.

## Related

- [ItemsView](./items-view.md)
- [ScrollView](./scroll-view.md)
