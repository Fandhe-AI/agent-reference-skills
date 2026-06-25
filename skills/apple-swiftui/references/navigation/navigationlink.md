# NavigationLink

A view that controls a navigation presentation.

## Signature / Usage

```swift
// Label string + destination view (eager)
NavigationLink("Work Folder") {
    FolderDetail(id: workFolder.id)
}

// Value-based (lazy — preferred with NavigationStack)
NavigationStack {
    List {
        NavigationLink("Mint", value: Color.mint)
        NavigationLink("Pink", value: Color.pink)
        NavigationLink("Teal", value: Color.teal)
    }
    .navigationDestination(for: Color.self) { color in
        ColorDetail(color: color)
    }
    .navigationTitle("Colors")
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(_ label: String, destination: () -> Destination)` | Eager destination — view is created immediately. |
| `init(destination: () -> Destination, label: () -> Label)` | Eager destination with custom label view. |
| `init(_ label: String, value: V)` | Value-based; destination resolved by `navigationDestination(for:)`. |
| `init(value: V, label: () -> Label)` | Value-based with custom label view. |

Modifier: `isDetailLink(_ isDetail: Bool) -> some View` — presents destination as the detail column in a split view.

## Notes

- Available: iOS 13+, iPadOS 13+, macOS 10.15+, tvOS 13+, watchOS 6+, visionOS 1+
- Prefer value-based initializers inside `NavigationStack` / `NavigationSplitView` for programmatic navigation and state serialization.
- Eager-destination links create the destination view immediately, even before the user taps; value-based links defer creation.

## Related

- [NavigationStack](./navigationstack.md)
- [NavigationSplitView](./navigationsplitview.md)
- [navigationDestination](./navigationdestination.md)
