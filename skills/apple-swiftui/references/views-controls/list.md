# List

A container that presents rows of data arranged in a single column, optionally providing the ability to select one or more members.

## Signature / Usage

```swift
nonisolated struct List<SelectionValue, Content> where SelectionValue : Hashable, Content : View
```

```swift
// Static content
List {
    Text("Apples")
    Text("Bananas")
}

// Dynamic identifiable data
List(fruits) { fruit in
    Text(fruit.name)
}

// With sections and selection
@State private var selection: Set<Fruit.ID> = []

List(fruits, selection: $selection) { fruit in
    Label(fruit.name, systemImage: fruit.icon)
}
.listStyle(.insetGrouped)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(content:)` | Static content view builder |
| `init(selection:content:)` | Static content + single-row selection |
| `init(_:rowContent:)` | `Identifiable` collection + row builder |
| `init(_:selection:rowContent:)` | Collection + selection binding |
| `init(_:id:rowContent:)` | Collection + key path for ID |
| `init(_:children:rowContent:)` | Hierarchical/tree data |
| `init(_:editActions:rowContent:)` | Editable collection (delete, move) |

### Key modifiers

| Modifier | Description |
|---|---|
| `listStyle(_:)` | `.automatic`, `.plain`, `.grouped`, `.insetGrouped`, `.inset`, `.sidebar` |
| `listRowSeparator(_:edges:)` | Show/hide row separators |
| `listRowBackground(_:)` | Custom row background |
| `refreshable(action:)` | Pull-to-refresh |
| `swipeActions(edge:allowsFullSwipe:content:)` | Swipe-action buttons |
| `swipeActions(edge:allowsFullSwipe:content:onPresentationChanged:)` | iOS 27.0+. Same, plus `onPresentationChanged: (Bool) -> Void` called with `true` when the actions are revealed and `false` when dismissed. See [swipeactions](./swipeactions.md). |
| `swipeActionsContainer()` | iOS 27.0+. Coordinates swipe-action dismissal and mutual exclusion across rows in a `ScrollView` / `LazyVStack` or similar container; a no-op on `List`, which already does this. |
| `reorderable()` / `reorderContainer(for:isEnabled:move:)` | iOS 27.0+. Drag-and-drop reordering for list, stack, grid, or custom layout containers. See [reorderable](./reorderable.md). |
| `onDelete(perform:)` | Delete handler for `ForEach` rows |
| `onMove(perform:)` | Move handler for `ForEach` rows |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- For editable rows (delete/move), wrap dynamic content in `ForEach` and attach `.onDelete`/`.onMove`.
- Selection type is `Set<SelectionValue.ID>` for multi-select; `SelectionValue.ID?` for single-select.
- Use `Section` to group rows within a `List`.

## Related

- [Section](./section.md)
- [ForEach](./foreach.md)
- [Form](./form.md)
