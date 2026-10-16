# overlayArrangementEdge / overlayArrangementZIndex

Modifier and environment value for views inside an `ArrangementView` using the overlay style.

## Signature / Usage

```swift
var body: some View {
    ArrangementView {
        ControlsView()
            .overlayArrangementEdge(.trailing)
    } secondary: {
        ContentView()
    }
    .arrangementViewStyle(.overlay)
}
```

```swift
nonisolated func overlayArrangementEdge(_ edge: HorizontalEdge?) -> some View

var overlayArrangementZIndex: Int { get set }   // EnvironmentValues

nonisolated func axes(_ axes: Axis.Set) -> OverlayArrangementViewStyle   // OverlayArrangementViewStyle
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `edge` | `HorizontalEdge?` | The horizontal edge to position the view at when the overlay transitions to a horizontal layout |
| `overlayArrangementZIndex` | `Int` | Z-index of a view within an overlay arrangement; higher values render on top |
| `axes(_:)` | `Axis.Set` | Creates an overlay arrangement that supports laying out its views along the given axes |

## Notes

- Available: iOS 27.1+ (and iPadOS, Mac Catalyst, macOS, tvOS, visionOS, watchOS 27.1+)
- `overlayArrangementEdge` anchors the view when the overlay layout transitions into a horizontal layout, e.g. `.trailing` moves it to the trailing side
- The Apple example omits the style; the default automatic style resolves to a split arrangement, so apply `.arrangementViewStyle(.overlay)` for overlay behavior (added above).
- Example of reading `overlayArrangementZIndex`:

```swift
struct PlayerView: View {
    @Environment(\.overlayArrangementZIndex) var zIndex

    var body: some View {
        VideoPlayerControls()
            .opacity(zIndex == 0 ? 1.0 : 0.5)
    }
}
```
- Source: https://developer.apple.com/documentation/swiftui/overlayarrangementviewstyle

## Related

- [ArrangementView](./arrangementview.md)
- [ArrangementViewStyle](./arrangementviewstyle.md)
- [Split arrangement layout modifiers](./split-arrangement-layout.md)
