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
| `toolbar(content:)` | `(@ToolbarContentBuilder () -> C) -> some View` | Basic toolbar population. |
| `toolbar(id:content:)` | `(String, @ToolbarContentBuilder () -> C) -> some View` | User-customizable toolbar with a stable `id`. |
| `toolbar(_:for:)` | `(Visibility, ToolbarPlacement...) -> some View` | Sets visibility of a toolbar. |
| `toolbar(removing:)` | `(ToolbarDefaultItemKind?) -> some View` | Removes a default system toolbar item (e.g., `.sidebarToggle`). |

## Notes

- Available: iOS 14+, iPadOS 14+, macOS 11+, tvOS 14+, watchOS 7+, visionOS 1+
- Wrap related items in `ToolbarItemGroup` for correct spacing and platform-specific layout.
- Style the toolbar background with `toolbarBackground(_:for:)` and color scheme with `toolbarColorScheme(_:for:)`.

## Related

- [ToolbarItem](./toolbaritem.md)
