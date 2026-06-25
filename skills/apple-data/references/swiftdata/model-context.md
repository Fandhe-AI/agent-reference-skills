# ModelContext

Handles fetching, inserting, deleting, and saving persistent models. Changes exist in memory until explicitly saved or autosave fires.

## Signature / Usage

```swift
class ModelContext: Equatable
```

```swift
// Access from SwiftUI environment
struct AddItemView: View {
    @Environment(\.modelContext) private var context

    func addItem() {
        let item = Item(name: "New")
        context.insert(item)
        try? context.save()
    }
}

// Manual creation
let context = ModelContext(container)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `container` | `ModelContainer` | The owning model container |
| `autosaveEnabled` | `Bool` | Auto-saves pending changes when `true` (default) |
| `hasChanges` | `Bool` | Whether there are unsaved changes |
| `insertedModelsArray` | `[any PersistentModel]` | Models inserted since last save |
| `changedModelsArray` | `[any PersistentModel]` | Modified models awaiting save |
| `deletedModelsArray` | `[any PersistentModel]` | Models queued for deletion |
| `undoManager` | `UndoManager?` | Undo/redo support |
| `author` | `String?` | Optional author tag for change tracking |

### Core methods

| Method | Description |
|--------|-------------|
| `insert(_ model:)` | Registers a new model for the next save |
| `delete(_ model:)` | Marks a model for deletion |
| `delete(model:where:includeSubclasses:) throws` | Batch delete with predicate |
| `fetch(_ descriptor:) throws -> [T]` | Fetches matching models |
| `fetchCount(_ descriptor:) throws -> Int` | Returns count without loading objects |
| `save() throws` | Persists all pending changes |
| `rollback()` | Discards all unsaved changes |
| `transaction(block:) throws` | Executes a block as a single transaction |

### Notifications

```swift
static let willSave: Notification.Name
static let didSave: Notification.Name
```

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Specify `object: context` when observing notifications to avoid receiving notifications from other contexts
- Related model graphs only need the root model inserted; the context handles related objects automatically

## Related

- [ModelContainer](./model-container.md)
- [FetchDescriptor](./fetch-descriptor.md)
- [@Query](./query-macro.md)
