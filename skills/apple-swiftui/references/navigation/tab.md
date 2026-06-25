# Tab

A structure that represents the content for a tab and its associated tab item in a `TabView`.

## Signature / Usage

```swift
// String label + SF Symbol
Tab("Received", systemImage: "tray.and.arrow.down.fill") {
    ReceivedView()
}

// With value for programmatic selection
Tab("Sent", systemImage: "tray.and.arrow.up.fill", value: 1) {
    SentView()
}

// With TabRole
Tab(role: .search) {
    SearchView()
}

// Custom label
Tab(value: "profile") {
    ProfileView()
} label: {
    Label("Profile", systemImage: "person.circle")
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `_` (title) | `String` | Localized tab label text. |
| `systemImage` | `String` | SF Symbol name for the tab icon. |
| `image` | `String` | Asset catalog image name (alternative to `systemImage`). |
| `value` | `Value: Hashable` | Selection value used with `TabView(selection:)`. |
| `role` | `TabRole?` | Semantic role (e.g., `.search`). Optional. |
| `content` | `() -> Content` | The tab's body view. |
| `label` | `() -> Label` | Custom label view (overrides title + image params). |

## Notes

- Available: iOS 18+, iPadOS 18+, macOS 15+, tvOS 18+, watchOS 11+, visionOS 2+
- Replaces the deprecated `.tabItem(_:)` modifier.
- Conforms to `TabContent`, allowing it to be used inside `TabContentBuilder`.
- Add `.customizationID(_:)` to participate in `TabViewCustomization`.

## Related

- [TabView](./tabview.md)
