# ModelDocument

A document type that uses SwiftData to manage its storage, for building document-based apps around a `@Model` schema.

## Signature / Usage

```swift
struct ModelDocument
```

```swift
@main
struct JournalApp: App {
    var body: some Scene {
        DocumentGroup(editing: JournalEntry.self, contentType: .journalDocument) {
            ContentView()
        }
    }
}
```

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, visionOS 1.0+
- Don't create instances of `ModelDocument` directly; use one of the `DocumentGroup` initializers designed for SwiftData models
- Pairs with `DocumentGroup(editing:contentType:)` to build a document-based app whose storage is backed by SwiftData

## Related

- [ModelContainer](./model-container.md)
- [DataStore / DataStoreBatching](./data-store-protocol.md)
