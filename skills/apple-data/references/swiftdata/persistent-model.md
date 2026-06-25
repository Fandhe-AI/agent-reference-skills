# PersistentModel

Protocol that enables SwiftData to manage a Swift class as a stored model. Synthesized automatically by `@Model`; rarely implemented manually.

## Signature / Usage

```swift
protocol PersistentModel: AnyObject, Observable, Hashable, Identifiable, SendableMetatype
```

```swift
@Model
final class Book {          // conforms to PersistentModel via @Model
    var title: String
    var author: String

    init(title: String, author: String) {
        self.title = title
        self.author = author
    }
}

// Runtime inspection
let id = book.persistentModelID
let hasUnsaved = book.hasChanges
let deleted = book.isDeleted
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `persistentModelID` | `PersistentIdentifier` | Stable unique identifier for the instance |
| `persistentBackingData` | `BackingData<Self>` | Internal backing store |
| `schemaMetadata` | `[Schema.PropertyMetadata]` | Static schema metadata (static) |
| `modelContext` | `ModelContext?` | Context currently managing this instance |
| `hasChanges` | `Bool` | Whether the instance has unsaved changes |
| `isDeleted` | `Bool` | Whether the instance is marked for deletion |

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Do not implement the protocol requirements manually; use `@Model` instead

## Related

- [@Model](./model-macro.md)
- [ModelContext](./model-context.md)
