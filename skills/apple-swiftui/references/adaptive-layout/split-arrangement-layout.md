# splitArrangementLayoutRatio / splitArrangementLayoutSize / splitArrangementFixedLayoutSize

View modifiers that customize a child's size within an `ArrangementView` using the split style, plus the `splitArrangementAxis` environment value.

## Signature / Usage

```swift
ArrangementView {
    ConversationView()
        .splitArrangementLayoutRatio(0.3)
} secondary: {
    PhotosView()
}
.arrangementViewStyle(.split.axes(.horizontal))
```

```swift
nonisolated func splitArrangementLayoutRatio(_ ratio: CGFloat?) -> some View

nonisolated func splitArrangementLayoutRatio(minHorizontal: CGFloat? = nil, idealHorizontal: CGFloat? = nil, maxHorizontal: CGFloat? = nil, minVertical: CGFloat? = nil, idealVertical: CGFloat? = nil, maxVertical: CGFloat? = nil) -> some View

nonisolated func splitArrangementLayoutSize(minWidth: CGFloat? = nil, idealWidth: CGFloat? = nil, maxWidth: CGFloat? = nil, minHeight: CGFloat? = nil, idealHeight: CGFloat? = nil, maxHeight: CGFloat? = nil) -> some View

nonisolated func splitArrangementFixedLayoutSize(horizontal: Bool = true, vertical: Bool = true) -> some View

var splitArrangementAxis: Axis? { get set }   // EnvironmentValues
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ratio` | `CGFloat?` | The ratio the view uses for its preferred size |
| `minHorizontal` / `idealHorizontal` / `maxHorizontal` | `CGFloat?` | Minimum / ideal / maximum ratio for horizontal splits |
| `minVertical` / `idealVertical` / `maxVertical` | `CGFloat?` | Minimum / ideal / maximum ratio for vertical splits |
| `minWidth` / `idealWidth` / `maxWidth` | `CGFloat?` | Minimum / ideal / maximum width for horizontal splits |
| `minHeight` / `idealHeight` / `maxHeight` | `CGFloat?` | Minimum / ideal / maximum height for vertical splits |
| `horizontal` | `Bool` | Whether to prefer a fixed width in a horizontal split (default `true`) |
| `vertical` | `Bool` | Whether to prefer a fixed height in a vertical split (default `true`) |

## Notes

- Available: iOS 27.1+ (and iPadOS, Mac Catalyst, macOS, tvOS, visionOS, watchOS 27.1+)
- Ratio: the view with the highest `layoutPriority` is sized first using its ratio. A ratio larger than the remaining container size uses the remaining size. If ratios leave the container unfilled, the highest priority view fills the remainder
- Size: views with higher `layoutPriority` are sized first using their ideal size, clamped to min and max. Width constraints apply to horizontal arrangements, height constraints to vertical arrangements
- `splitArrangementFixedLayoutSize` sets the preferred size to the view's ideal size within its container; the view may still shrink depending on its priority
- `splitArrangementAxis` is `nil` when the view is not inside a split arrangement view; read it to adapt layout to horizontal vs vertical split
- `SplitArrangementViewStyle.axes(_:)` limits the supported split axes (e.g. `.split.axes(.vertical)`)

```swift
struct DetailsView: View {
    @Environment(\.splitArrangementAxis) var axis

    var body: some View {
        let layout: AnyLayout = axis == .horizontal
            ? AnyLayout(VStackLayout())
            : AnyLayout(HStackLayout())
        layout {
            Artwork()
            Metadata()
        }
    }
}
```
- Source: https://developer.apple.com/documentation/swiftui/splitarrangementviewstyle

## Related

- [ArrangementView](./arrangementview.md)
- [ArrangementViewStyle](./arrangementviewstyle.md)
- [Overlay arrangement modifiers](./overlay-arrangement.md)
