# toolbarVerticalBehavior / toolbarVerticalEdge / axisBehavior / toolbarVerticalCompressionBehavior

Controls for the vertical bar (iPhone Duo): opt out with `toolbarVerticalBehavior`, read the preferred edge from `toolbarVerticalEdge`, restrict items per axis with `axisBehavior`, and choose what compresses first with `toolbarVerticalCompressionBehavior`.

## Signature / Usage

```swift
TabView {
    Tab("Home", systemImage: "house") {
        HomeView()
    }
}
.toolbarVerticalBehavior(.disabled)
```

```swift
nonisolated func toolbarVerticalBehavior(_ behavior: ToolbarVerticalBehavior) -> some View
nonisolated func toolbarVerticalCompressionBehavior(_ behavior: ToolbarVerticalCompressionBehavior) -> some View
var toolbarVerticalEdge: HorizontalEdge? { get }   // EnvironmentValues
nonisolated func axisBehavior(_ behavior: ToolbarItemAxisBehavior) -> some ToolbarContent
nonisolated func axisBehavior(_ behavior: ToolbarItemAxisBehavior) -> some CustomizableToolbarContent
```

```swift
// Restrict an item to horizontal bars
.toolbar {
    ToolbarItem(placement: .primaryAction) {
        Toggle(isOn: $isOn) { ... }
    }
    .axisBehavior(.horizontalOnly)
}
```

```swift
// Read the preferred vertical-bar edge
struct ContentView: View {
    @Environment(\.toolbarVerticalEdge) var toolbarVerticalEdge

    var body: some View {
        FloatingToolPalette()
            .frame(maxWidth: .infinity,
                   alignment: toolbarVerticalEdge == .trailing
                       ? .trailing : .leading)
    }
}
```

```swift
// Prefer toolbar items over the tab bar when space is constrained
TabView {
    Tab("Recents") {
        NavigationStack {
            RootView()
                .toolbar {
                    Button("Up", systemImage: "chevron.up") { }
                    Button("Down", systemImage: "chevron.down") { }
                }
                .toolbarVerticalCompressionBehavior(.prefersToolbarItems)
        }
    }
}
```

## Options / Props

| Type | Values | Description |
|------|--------|-------------|
| `ToolbarVerticalBehavior` | `.automatic`, `.disabled` | Whether the vertical bar is used. `.disabled` falls back to the standard horizontal top and bottom toolbars. |
| `ToolbarVerticalCompressionBehavior` | `.automatic`, `.prefersTabBar`, `.prefersToolbarItems` | Which bars compress first when different bar types are hosted together and space is constrained. |
| `ToolbarItemAxisBehavior` | `.automatic`, `.horizontalOnly`, `.verticalPreferred` | Which bar axes a toolbar item can appear in. |

All three structs conform to `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.

## Notes

- Available: iOS 27.1+, iPadOS 27.1+, Mac Catalyst 27.1+, macOS 27.1+, tvOS 27.1+, visionOS 27.1+, watchOS 27.1+ (platform list per Apple's metadata).
- By default the system decides whether a vertical bar is rendered from device and app state. Disable it only for UIs better served by horizontal bars (e.g. a fullscreen video player, a non-scrolling calculator). Treat it as a stable choice; do not toggle it frequently or as a function of one view's state. To hide bars on a screen, use `toolbarVisibility(_:for:)` instead.
- The behavior is resolved by the window or presentation (sheet / form). `NavigationStack` uses the top-most view, `TabView` the selected view, `NavigationSplitView` the view in the trailing-most column.
- When the value changes the system animates the transition: content reflows to or from the horizontal bars, the status bar changes axis, and the vertical bar's leading or trailing safe area inset is added or removed.
- `toolbarVerticalEdge` is read-only, determined from locale and device, reflects the preferred edge whether or not a vertical bar is visible, and is `nil` where the system never places a vertical bar.
- With both horizontal and vertical bars present, an item marked `.verticalPreferred` is preferred in the vertical bar.
- Source: https://developer.apple.com/documentation/swiftui/toolbarverticalbehavior

## Related

- [toolbar](./toolbar.md)
- [toolbaritem](./toolbaritem.md)
- [toolbar-overflow](./toolbar-overflow.md)
