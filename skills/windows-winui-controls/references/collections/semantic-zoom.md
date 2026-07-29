# SemanticZoom

A control that lets users pinch-zoom between two synchronized views of the same data — a detailed `ZoomedInView` and a higher-level `ZoomedOutView` (e.g. group headers). Both views must be controls implementing `ISemanticZoomInformation`, such as `ListView` or `GridView`.

## Signature / Usage

```xaml
<SemanticZoom>
    <SemanticZoom.ZoomedInView>
        <GridView ItemsSource="{x:Bind ItemsCollectionViewSource.View}" ScrollViewer.IsHorizontalScrollChainingEnabled="False"/>
    </SemanticZoom.ZoomedInView>
    <SemanticZoom.ZoomedOutView>
        <GridView ItemsSource="{x:Bind ItemsCollectionViewSource.View.CollectionGroups}"/>
    </SemanticZoom.ZoomedOutView>
</SemanticZoom>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ZoomedInView` | `object` (content property) | The detailed view; must implement `ISemanticZoomInformation` (`ListView`, `GridView`). |
| `ZoomedOutView` | `object` | The grouped/overview view; must also implement `ISemanticZoomInformation`. |
| `IsZoomedInViewActive` | `bool` | Gets or sets which view is currently displayed; settable to switch views programmatically. |
| `IsZoomOutButtonEnabled` | `bool` | Default `true`; shows a button on the zoomed-in view to activate the zoomed-out view. |
| `CanChangeViews` | `bool` | Whether the control allows switching between views at all. |

## Methods

| Name | Description |
|------|-------------|
| `ToggleActiveView()` | Switches from the current active view to the other. |

## Events

| Name | Description |
|------|-------------|
| `ViewChangeStarted` | Raised when a view change is requested (`SemanticZoomViewChangedEventArgs`); use `args.SourceItem`/`args.DestinationItem` to sync selection if not using a shared `CollectionViewSource`. |
| `ViewChangeCompleted` | Raised once the new view is displayed (`SemanticZoomViewChangedEventArgs`). |

## Notes

- Namespace: `Microsoft.UI.Xaml.Controls` (WinUI 3, Windows App SDK, `defaultMoniker` 2.0).
- Both views should share the same `CollectionViewSource` (binding to `.View` and `.View.CollectionGroups`) so selection stays synchronized automatically; otherwise sync manually in `ViewChangeStarted`.
- When the zoomed-in view is a `GridView`, set `ScrollViewer.IsHorizontalScrollChainingEnabled="False"` on it; for `ListView`, set `ScrollViewer.IsVerticalScrollChainingEnabled="False"`, to prevent scroll chaining conflicts with the pinch gesture.
- Users switch views via pinch-in/pinch-out touch gestures, or via the zoom-out button on the zoomed-in view.

## Related

- [ListView](./list-view.md)
- [GridView](./grid-view.md)
