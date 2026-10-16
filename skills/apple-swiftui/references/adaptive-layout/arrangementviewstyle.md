# ArrangementViewStyle / arrangementViewStyle(_:)

A style that configures an `ArrangementView` with an arrangement. The `arrangementViewStyle(_:)` modifier sets the style for arrangement views within a view.

## Signature / Usage

```swift
ArrangementView {
    PrimaryContent()
} secondary: {
    SecondaryContent()
}
.arrangementViewStyle(.split)
```

```swift
@MainActor @preconcurrency protocol ArrangementViewStyle

nonisolated func arrangementViewStyle(_ style: some ArrangementViewStyle) -> some View

@ContentBuilder @MainActor @preconcurrency func makeBody(configuration: Self.Configuration) -> Self.Body

// Built-in styles
@export(implementation) nonisolated static var split: SplitArrangementViewStyle { get }
@export(implementation) nonisolated static var overlay: OverlayArrangementViewStyle { get }

// SplitArrangementViewStyle / OverlayArrangementViewStyle
nonisolated func axes(_ axes: Axis.Set) -> SplitArrangementViewStyle
nonisolated func axes(_ axes: Axis.Set) -> OverlayArrangementViewStyle
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `automatic` | `AutomaticArrangementViewStyle` | Default style; resolves to a split arrangement |
| `split` | `SplitArrangementViewStyle` | Places primary and secondary views side by side along one or more axes |
| `overlay` | `OverlayArrangementViewStyle` | Layers the primary view over the secondary view in z-order |
| `axes(_:)` | `Axis.Set` | Supported axes. Split: "Creates a split arrangement that supports the given axes". Overlay: "Creates an overlay arrangement that supports laying out its views along the given axes" |
| `ArrangementViewStyleConfiguration.primary` | `ArrangementViewStyleConfiguration.Primary` | The primary view of the arrangement |
| `ArrangementViewStyleConfiguration.secondary` | `ArrangementViewStyleConfiguration.Secondary` | The secondary view of the arrangement |

## Notes

- Available: iOS 27.1+ (and iPadOS, Mac Catalyst, macOS, tvOS, visionOS, watchOS 27.1+)
- Conforming types: `AutomaticArrangementViewStyle`, `OverlayArrangementViewStyle`, `SplitArrangementViewStyle` (each has `init()` and `axes(_:)` for the latter two)
- `ArrangementViewStyleConfiguration` ("The properties of an arrangement view used to create its custom style") exposes nested `Primary` / `Secondary` types and the `primary` / `secondary` properties; `ArrangementView.init(_:)` creates a view from it
- Split arrangement example: `.arrangementViewStyle(.split.axes(.vertical))` splits only into a vertical layout
- `automatic` (`AutomaticArrangementViewStyle`) is the default style and resolves to a split arrangement
- Source: https://developer.apple.com/documentation/swiftui/arrangementviewstyle

## Related

- [ArrangementView](./arrangementview.md)
- [Split arrangement layout modifiers](./split-arrangement-layout.md)
- [Overlay arrangement modifiers](./overlay-arrangement.md)
