# ArrangementView

A view that arranges primary and secondary content using an adaptive layout that responds to the environment.

## Signature / Usage

```swift
ArrangementView {
    NowPlayingView()
} secondary: {
    LyricsView()
}
.arrangementViewStyle(.split)
```

```swift
nonisolated struct ArrangementView<Primary, Secondary> where Primary : View, Secondary : View

nonisolated init(@ContentBuilder primary: () -> Primary, @ContentBuilder secondary: () -> Secondary)
nonisolated init(_ configuration: ArrangementViewStyleConfiguration)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `primary` | `() -> Primary` | The view to display as the primary content in the arrangement |
| `secondary` | `() -> Secondary` | The view to display as the secondary content in the arrangement |
| `configuration` (`init(_:)`) | `ArrangementViewStyleConfiguration` | Creates an arrangement view from a style configuration |

## Notes

- Available: iOS 27.1+, iPadOS 27.1+, Mac Catalyst 27.1+, macOS 27.1+, tvOS 27.1+, visionOS 27.1+, watchOS 27.1+
- Conforms to `View`
- The layout is computed from the presentation context: available size, size class, and hardware features
- Choose the layout with `arrangementViewStyle(_:)`. Default is `AutomaticArrangementViewStyle`, which resolves to a split arrangement. Other built-in styles: `OverlayArrangementViewStyle`, `SplitArrangementViewStyle`
- Overlay arrangement layers the primary view over the secondary view in z-order (e.g. playback controls over a video surface). When the environment changes, such as a foldable device being folded, it can transition to a side-by-side layout; use `axes(_:)` to control supported axes
- Split arrangement places the two views side by side along one or more axes and adapts the axis to available size and size class

```swift
ArrangementView {
    PlayerControls()
} secondary: {
    VideoPlayer()
}
.arrangementViewStyle(.overlay)
```

## Related

- [ArrangementViewStyle](./arrangementviewstyle.md)
- [Split arrangement layout modifiers](./split-arrangement-layout.md)
- [Overlay arrangement modifiers](./overlay-arrangement.md)
- [ReservedRegion](./reservedregion.md)
