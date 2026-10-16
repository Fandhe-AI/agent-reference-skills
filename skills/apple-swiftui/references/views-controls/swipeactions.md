# swipeActions / swipeActionsContainer()

Adds custom swipe actions to a row, optionally reports when they are revealed or dismissed, and coordinates swipe actions across rows in custom containers.

## Signature / Usage

```swift
// Existing overload (iOS 15.0+)
nonisolated func swipeActions<T>(
    edge: HorizontalEdge = .trailing,
    allowsFullSwipe: Bool = true,
    @ContentBuilder content: () -> T
) -> some View where T : View

// New overload (27.0+)
nonisolated func swipeActions(
    edge: HorizontalEdge = .trailing,
    allowsFullSwipe: Bool = true,
    @ContentBuilder content: () -> some View,
    onPresentationChanged: @escaping (Bool) -> Void
) -> some View

// New (27.0+)
nonisolated func swipeActionsContainer() -> some View
```

```swift
@State private var isSwiped = false

MessageRow(message)
    .opacity(isSwiped ? 0.5 : 1.0)
    .swipeActions(edge: .trailing) {
        Button(role: .destructive) {
            store.delete(message)
        } label: {
            Label("Delete", systemImage: "trash")
        }
    } onPresentationChanged: {
        isSwiped = $0
    }
```

```swift
ScrollView {
    LazyVStack {
        ForEach(items) { item in
            ItemRow(item)
                .swipeActions {
                    Button("Delete", role: .destructive) {
                        delete(item)
                    }
                }
        }
    }
}
.swipeActionsContainer()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| edge | `HorizontalEdge` | The edge of the view to associate the swipe actions with. Default `.trailing` |
| allowsFullSwipe | `Bool` | Whether a full swipe automatically performs the first action. Default `true` |
| content | `@ContentBuilder () -> some View` | The content of the swipe actions |
| onPresentationChanged | `(Bool) -> Void` | Called with `true` when the swipe actions become visible and `false` when dismissed (27.0+ overload only) |

## Notes

- `swipeActions(edge:allowsFullSwipe:content:)`: iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 12.0+, visionOS 1.0+, watchOS 8.0+. The `content` parameter is now declared with `@ContentBuilder`.
- `swipeActions(edge:allowsFullSwipe:content:onPresentationChanged:)` and `swipeActionsContainer()`: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Actions appear in the order listed, starting from the swipe's originating edge. Labels and images in swipe actions automatically get the `fill` symbol variant.
- By default the first action for a swipe direction runs on a full swipe; set `allowsFullSwipe: false` to opt out for an edge.
- A button role styles the action (`.destructive` is red); use `tint(_:)` for another color.
- Adding swipe actions stops SwiftUI from synthesizing the Delete action for `ForEach` `onDelete(perform:)`; you must provide a Delete action yourself.
- Actions accumulate for a given edge if the modifier is called multiple times on the same row.
- `swipeActionsContainer()` ensures only one row's actions are revealed at a time, scrolling dismisses open actions, and tapping outside the active row dismisses its actions.
- `List` already provides this coordination; applying `swipeActionsContainer()` to a `List` is a no-op. Use it for custom row layouts built with `ScrollView`, `LazyVStack`, or similar.
- Source: https://developer.apple.com/documentation/swiftui/view/swipeactions(edge:allowsfullswipe:content:onpresentationchanged:)

## Related

- [List](./list.md)
- [ForEach](./foreach.md)
- [Button](./button.md)
- [ContentBuilder](./contentbuilder.md)
