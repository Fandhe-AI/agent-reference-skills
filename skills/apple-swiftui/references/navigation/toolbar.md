# toolbar

Populates the toolbar or navigation bar with the specified items.

## Signature / Usage

```swift
// Basic usage with ToolbarItem
.toolbar {
    ToolbarItem(placement: .primaryAction) {
        Button("Save") { save() }
    }
}

// Grouped items
.toolbar {
    ToolbarItemGroup(placement: .bottomBar) {
        Slider(value: $fontSize, in: 8...120) {
            Text("Font Size")
        }
        .frame(width: 150)
        Toggle(isOn: $bold) { Image(systemName: "bold") }
        Toggle(isOn: $italic) { Image(systemName: "italic") }
    }
}

// Customizable toolbar (requires id:)
.toolbar(id: "editor") {
    ToolbarItem(id: "share", placement: .primaryAction) {
        ShareLink(item: document)
    }
}
```

## Options / Props

| Variant | Signature | Description |
|---------|-----------|-------------|
| `toolbar(content:)` | `<Content>(@ContentBuilder content: () -> Content) -> some View where Content : ToolbarContent` | Basic toolbar population. Earlier docs declared this with `@ToolbarContentBuilder`; `ToolbarContentBuilder` itself is not deprecated. |
| `toolbar(id:content:)` | `(String, @ToolbarContentBuilder () -> C) -> some View` | User-customizable toolbar with a stable `id`. |
| `toolbar(_:for:)` | `(Visibility, ToolbarPlacement...) -> some View` | Sets visibility of a toolbar. |
| `toolbar(removing:)` | `(ToolbarDefaultItemKind?) -> some View` | Removes a default system toolbar item (e.g., `.sidebarToggle`). |
| `toolbarMinimizationBehavior(_:for:)` | `(ToolbarMinimizationBehavior, ToolbarPlacement...) -> some View` | Enables toolbar minimization in response to scrolling (iOS 27.0+). Supported placement is `.navigationBar`; an integrated top tab bar minimizes with it. |
| `toolbarOverflowMenu(content:)` | `<C>(content: () -> C) -> some View` | Configures the overflow menu of a toolbar (iOS / iPadOS / Mac Catalyst / visionOS 27.0+). |

## Notes

- Available: iOS 14+, iPadOS 14+, macOS 11+, tvOS 14+, watchOS 7+, visionOS 1+
- Wrap related items in `ToolbarItemGroup` for correct spacing and platform-specific layout.
- Style the toolbar background with `toolbarBackground(_:for:)` and color scheme with `toolbarColorScheme(_:for:)`.
- iOS 26 / macOS 26 (WWDC25): toolbar items automatically render on a Liquid Glass surface that floats above content and adapts to what's beneath it; no code change is required to opt in when building with Xcode 26. Custom items are grouped separately from system-provided items (e.g. the back button) by default.
- Use `ToolbarSpacer` inside the toolbar content builder to split items into distinct Liquid Glass groups (fixed or flexible spacing), signalling that separated actions are unrelated while items left together read as one grouped action.
- `ContentBuilder` (a type alias for `ViewBuilder`, available iOS 13.0+) is the unified replacement for type-specific builders such as `ToolbarContentBuilder` and `CommandsBuilder`; the Xcode 27 SDK declares `toolbar(content:)` with it.
- `visibilityPriority(_:)` on toolbar content: when space is limited, lower-priority items move into the overflow menu before higher-priority ones (default `.automatic`). Example: `ToolbarItem { PrimaryControl() }.visibilityPriority(.high)`.
- `toolbarMinimizationBehavior(_:for:)` example: `.toolbarMinimizationBehavior(.onScrollDown, for: .navigationBar)`; the safe area adjusts by default, customizable with `toolbarMinimizationSafeAreaAdjustment(_:for:)`.
- Vertical-axis toolbars (iOS 27.1+) are covered in [toolbar-vertical](./toolbar-vertical.md); overflow menu APIs (`ToolbarOverflowMenu`, `toolbarOverflowMenu(content:)`) are in [toolbar-overflow](./toolbar-overflow.md).

## Related

- [ToolbarItem](./toolbaritem.md)
- [toolbar-vertical](./toolbar-vertical.md)
- [toolbar-overflow](./toolbar-overflow.md)
- [ContentBuilder](../views-controls/contentbuilder.md)
