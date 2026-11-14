---
source: https://developer.apple.com/documentation/appintents/appentitycollectionvalue
---

# AppEntityCollectionValue

An intent value that holds multiple app entities of the same type.

## Signature / Usage

```swift
protocol AppEntityCollectionValue : _IntentValue
```

Use with a delete intent target (from the `DeleteIntent.target` page):

```swift
struct DeleteNotesIntent: DeleteIntent {
    static let title: LocalizedStringResource = "Delete Notes"

    @Parameter(title: "Notes")
    var target: EntityCollection<NoteEntity>

    func perform() async throws -> some IntentResult {
        try await NoteStore.shared.delete(target.identifiers)
        return .result()
    }
}
```

## Options / Props

| Conforming type | Notes |
| --- | --- |
| Arrays and sets of entities | Conform to the protocol. |
| `EntityCollection` | Conforms; delivers entity identifiers without resolving each to an entity. |

## Notes

- iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, tvOS 27.3+, visionOS 27.3+, watchOS 27.3+
- Use the protocol to accept any of an array, a set or an `EntityCollection`, such as for the target of a delete intent. `DeleteIntent` declares `associatedtype Target : AppEntityCollectionValue = [Self.Entity]`.
- Source: https://developer.apple.com/documentation/appintents/appentitycollectionvalue and https://developer.apple.com/documentation/appintents/deleteintent/target-1cesv (fetched 2026-11-14)

## Related

- [EntityCollection](./entitycollection.md)
- [DeleteIntent](../intent-types/deleteintent.md)
