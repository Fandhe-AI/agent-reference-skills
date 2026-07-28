# ScrollView

Provides scroll, pan, and zoom support for a single content element. The modern counterpart to `ScrollViewer`, built on `InteractionTracker` with animation-driven view changes, designed for full compatibility with `ItemsRepeater`. `ItemsView` hosts a `ScrollView` internally (exposed via `ItemsView.ScrollView`).

## Signature / Usage

```xaml
<ScrollView Width="500" Height="400" ContentOrientation="Horizontal" ZoomMode="Enabled">
    <StackPanel Orientation="Horizontal">
        <Button Width="200" Content="Button 1"/>
        <Button Width="200" Content="Button 2"/>
    </StackPanel>
</ScrollView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Content` | `UIElement` | Single child to scroll; can be a layout panel containing any number of elements. |
| `ContentOrientation` | `ScrollingContentOrientation` | `Vertical` (default), `Horizontal`, `Both`, `None` — controls which axis the content is allowed to grow beyond the viewport. No effect if `Height`/`Width` are explicitly set on the content. |
| `HorizontalScrollBarVisibility` / `VerticalScrollBarVisibility` | `ScrollingScrollBarVisibility` | `Auto` (default for both), `Hidden`, `Visible`. Unlike `ScrollViewer`, these control **only** scrollbar visibility, not whether scrolling is allowed. |
| `ZoomMode` | `ScrollingZoomMode` | `Disabled` (default) / `Enabled`; enables pinch/stretch and Ctrl+wheel zoom. |
| `MinZoomFactor` / `MaxZoomFactor` | `float` | Zoom bounds; defaults `0.1` / `10.0`. |
| `HorizontalOffset` / `VerticalOffset` | `double` (read-only) | Current scroll position. |
| `ScrollableHeight` / `ScrollableWidth` | `double` (read-only) | Extent size minus viewport size. |
| `ScrollTo` / `ScrollBy` | methods | Programmatic scrolling to an absolute offset or by a delta. |
| `ZoomTo` / `ZoomBy` | methods | Programmatic zoom to an absolute factor or by a delta. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). WinUI 3 also ships the older `ScrollViewer` control (`Microsoft.UI.Xaml.Controls.ScrollViewer`) — the two are not interchangeable in configuration API (`ContentOrientation` vs. `HorizontalScrollBarVisibility="Disabled"`/`VerticalScrollBarVisibility="Disabled"`), though both are referred to generically as "scroll viewer controls." `ListView`/`GridView`/`TextBox`/`RichEditBox` templates still use `ScrollViewer`; `ItemsView` uses `ScrollView`.
- A `ScrollView` (or `ScrollViewer`) should wrap exactly one object — use a panel as that one object to host multiple children.
- To handle pointer events on a `UIElement` inside a `ScrollView`, call `UIElement.CancelDirectManipulations` to disable manipulation-event capture, and `UIElement.TryStartDirectManipulation` to re-enable it.
- To constrain zoomable content (e.g., an `Image`) to the viewport on initial load while still allowing scroll-when-zoomed, set `ContentOrientation="None"` with `ZoomMode="Enabled"` (no `Viewbox` workaround needed, unlike `ScrollViewer`).

## Related

- [ItemsView](./items-view.md)
- [ItemsRepeater](./items-repeater.md)
