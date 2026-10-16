# reorderable() / reorderContainer(for:isEnabled:move:)

Drag-to-reorder for lists, stacks, grids, and custom layouts: `reorderContainer` defines the reorderable container, and `reorderable()` on the `DynamicViewContent` inside it makes the items draggable.

## Signature / Usage

```swift
// DynamicViewContent
nonisolated func reorderable() -> some DynamicViewContent<Self.Data>

// View
nonisolated func reorderContainer<Item>(
    for item: Item.Type,
    isEnabled: Bool = true,
    move: @escaping (ReorderDifference<Item.ID, ReorderableSingleCollectionIdentifier>) -> ()
) -> some View where Item : Identifiable, Item.ID : Sendable
```

```swift
struct ContentView: View {
    @State private var landmarks: [Landmark] = []

    var body: some View {
        VStack {
            ForEach(landmarks) { landmark in
                LandmarkView(landmark)
            }
            .reorderable()
        }
        .reorderContainer(for: Landmark.self) { difference in
            apply(difference: difference)
        }
    }
}
```

## Options / Props

`reorderContainer(for:isEnabled:move:)` parameters:

| Name | Type | Description |
|------|------|-------------|
| item (`for`) | `Item.Type` | The type of reorderable items in the container |
| isEnabled | `Bool` (default `true`) | Whether the container allows reordering |
| move | `(ReorderDifference<Item.ID, ReorderableSingleCollectionIdentifier>) -> ()` | A closure that provides the change at the end of a session |

## Notes

- Available on iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+ (no tvOS).
- Declare `reorderContainer` on your list, stack, grid, or custom layout; then apply `reorderable()` to the `DynamicViewContent` (for example `ForEach`) inside it.
- A person lifts a view with a drag gesture; the system puts a placeholder in its place and updates the placeholder position as the item moves through the container. On drop, the system calls `move` with the change.
- The change is a `ReorderDifference`: the identifiers of the items to move, in the order the person selected them, plus a destination value indicating where to insert them.
- This overload is for a container with a single collection. For multiple collections of reorderable views, use `reorderContainer(for:in:isEnabled:move:)` with a type for collection identifiers and `reorderable(collectionID:)` on the content.
- Related overloads listed in the same topic group: `reorderContainer(for:itemID:isEnabled:move:)` (key path to identify items), `reorderContainer(for:itemID:in:isEnabled:move:)`, and `DropSession.reorderDestination(for:in:)` / `reorderDestination(for:itemID:in:)`.
- Official article: "Reordering items in lists, stacks, grids, and custom layouts".
- Source: https://developer.apple.com/documentation/swiftui/dynamicviewcontent/reorderable()

## Related

- [ForEach](./foreach.md)
- [List](./list.md)
